/**
 * Headless Chrome smoke test for TIGER GROW.
 * Requires puppeteer-core installed in /tmp/tg-smoke and system Chrome.
 *   mkdir -p /tmp/tg-smoke && npm install --prefix /tmp/tg-smoke puppeteer-core
 *   node smoke.mjs
 */
import { createRequire } from 'node:module';

const require = createRequire('/tmp/tg-smoke/package.json');
const puppeteer = require('puppeteer-core');

const pageUrl = new URL('./index.html', import.meta.url).href;
const chrome = process.env.CHROME || '/usr/bin/google-chrome';
const failures = [];
function check(cond, msg) {
  if (!cond) failures.push(msg);
  else console.log('  ok', msg);
}

const browser = await puppeteer.launch({
  executablePath: chrome,
  headless: 'new',
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--allow-file-access-from-files']
});
const page = await browser.newPage();
await page.setViewport({ width: 1920, height: 1080 });
const errors = [];
page.on('pageerror', err => errors.push(String(err)));

try {
  await page.goto(pageUrl, { waitUntil: 'load' });
  await page.evaluate(() => window.TIGERGROW.ready);

  const old = {
    v: 1, activeClassId: 'c_old',
    settings: { pin: '1234', showStars: false, dailyCap: 7 },
    classes: [{
      id: 'c_old', name: '4A', weeklyGoal: 33,
      students: [{ id: 's_old', name: 'Ada', xp: 10, peak: 4, g: 'K' }]
    }]
  };
  await page.evaluate(payload => localStorage.setItem('tigergrow.v1', JSON.stringify(payload)), old);
  await page.reload({ waitUntil: 'load' });
  await page.evaluate(() => window.TIGERGROW.ready);

  const migrated = await page.evaluate(() => {
    const s = window.TIGERGROW.state;
    const c = s.classes.find(x => x.id === 'c_old');
    const st = c.students[0];
    window.TIGERGROW.refresh();
    const raw = JSON.parse(localStorage.getItem(window.TIGERGROW.LS_KEY));
    return {
      key: window.TIGERGROW.LS_KEY,
      v: s.v,
      pin: s.settings.pin,
      showStars: s.settings.showStars,
      showPoints: s.settings.showPoints,
      dailyCap: s.settings.dailyCap,
      genderDeco: s.settings.genderDeco,
      levels: s.settings.levels,
      peak: st.peak,
      xp: st.xp,
      goal: c.weeklyGoal,
      storedPeak: raw.classes[0].students[0].peak,
      storedLevels: raw.settings.levels,
      storedCap: raw.settings.dailyCap
    };
  });
  check(migrated.key === 'tigergrow.v1', 'localStorage key stays tigergrow.v1');
  check(migrated.v === 1, 'schema version stays 1');
  check(migrated.pin === '1234' && migrated.showStars === false, 'old settings survive migration');
  check(migrated.showPoints === true && migrated.genderDeco === true, 'missing flags get defaults');
  check(migrated.dailyCap === 7, 'saved daily cap is kept');
  check(JSON.stringify(migrated.levels) === JSON.stringify([0, 15, 40, 80, 140]), 'missing thresholds default to 0/15/40/80/140');
  check(migrated.peak === 4 && migrated.xp === 10 && migrated.storedPeak === 4, 'peak 4 is not shrunk when xp is only 10');
  check(migrated.goal === 33, 'weekly goal is preserved');
  check(Array.isArray(migrated.storedLevels) && migrated.storedLevels[4] === 140 && migrated.storedCap === 7, 'refresh writes thresholds back without dropping the cap');

  await page.evaluate(() => {
    window.TIGERGROW.state.settings.pin = '';
    window.TIGERGROW.refresh();
    window.TIGERGROW.dismiss();
    window.TIGERGROW.loadDemo();
    window.TIGERGROW.dismiss();
  });
  const demo = await page.evaluate(() => {
    const c = window.TIGERGROW.state.classes.find(x => x.isDemo);
    const lv = Object.fromEntries(c.students.map(s => [s.name, s.peak]));
    const kerem = c.students.find(s => s.name === 'Kerem');
    const others = c.students.filter(s => s.name !== 'Kerem');
    return {
      n: c.students.length,
      name: c.name,
      lv,
      levels: [...new Set(c.students.map(s => s.peak))].sort((a, b) => a - b),
      kerem: window.TIGERGROW.needsAttention(kerem),
      calm: others.some(s => !window.TIGERGROW.needsAttention(s)),
      rewards: c.rewards.slice(),
      goal: c.weeklyGoal,
      goalText: document.querySelector('#goalNum').textContent,
      nag: document.body.innerText.includes('Yedek hatırlatması')
    };
  });
  check(demo.n === 10 && demo.name === 'Demo 5-A', 'demo class has 10 students');
  check(JSON.stringify(demo.levels) === JSON.stringify([1, 2, 3, 4, 5]), 'demo represents all five levels');
  check(demo.lv.Ada === 1 && demo.lv.Deniz === 2 && demo.lv.Can === 3 && demo.lv.Defne === 4 && demo.lv.Ayşe === 5, 'demo level examples match the thresholds');
  check(demo.kerem === true && demo.calm === true, 'Kerem trips the 7-day reminder and others do not all trip it');
  check(demo.rewards.includes('flowers') && demo.rewards.includes('tree') && demo.rewards.length === 2, 'demo opens two rewards');
  check(demo.goal === 30 && demo.goalText.startsWith('23 / 30'), 'demo weekly goal is about 75% full (23/30)');
  check(demo.nag === false, 'backup reminder is not on the habitat');

  const undo = await page.evaluate(() => {
    const c = window.TIGERGROW.state.classes.find(x => x.isDemo);
    const ada = c.students.find(s => s.name === 'Ada');
    window.TIGERGROW.feed([ada.id], 0, 3);
    window.TIGERGROW.feed([ada.id], 0, 3);
    const peak = ada.peak, xp = ada.xp;
    window.TIGERGROW.undo();
    return { peak, after: ada.peak, xp, xpAfter: ada.xp, grew: peak >= 2 };
  });
  check(undo.grew && undo.after === undo.peak && undo.xpAfter < undo.xp, 'undo lowers food but not peak');

  const thresholds = await page.evaluate(() => {
    const demoCls = window.TIGERGROW.state.classes.find(x => x.isDemo);
    const kerem = demoCls.students.find(s => s.name === 'Kerem');
    const before = Object.fromEntries(demoCls.students.map(s => [s.id, s.peak]));
    window.TIGERGROW.setLevels([0, 80, 120, 200, 400]);
    const afterRaise = demoCls.students.every(s => s.peak === before[s.id]);
    window.TIGERGROW.setLevels([0, 5, 10, 20, 40]);
    const noShrink = demoCls.students.every(s => s.peak >= before[s.id]);
    const keremUp = kerem.peak > before[kerem.id];
    const lifted = kerem.peak;
    window.TIGERGROW.setLevels([0, 90, 130, 250, 500]);
    const kept = kerem.peak === lifted;
    const back = window.TIGERGROW.setLevels([0, 15, 40, 80, 140]);
    return { afterRaise, noShrink, keremUp, kept, defaults: back.levels.join(',') };
  });
  check(thresholds.afterRaise, 'raising thresholds does not shrink any tiger');
  check(thresholds.noShrink && thresholds.keremUp, 'lowering thresholds can raise peak and never lowers it');
  check(thresholds.kept && thresholds.defaults === '0,15,40,80,140', 'returning to defaults keeps the new peak');

  const pace = await page.evaluate(() => window.TIGERGROW.paceStats(window.TIGERGROW.state.classes.find(x => x.isDemo), '4w'));
  check(pace.students === 10 && pace.weeks === 4 && pace.avg > 0 && pace.l3 === 40 && pace.l5 === 140, 'pacing view uses the class average and current thresholds');
  check(['altında', 'içinde', 'üstünde'].includes(pace.band), 'pacing band is compared with the 4–5 assumption');

  const goalAuto = await page.evaluate(() => {
    const c = window.TIGERGROW.createClass('Pilot', ['Ali', 'Ayşe', 'Can', 'Deniz', 'Ege', 'Elif']);
    return { auto: c.goalAuto, goal: c.weeklyGoal };
  });
  check(goalAuto.auto === true && goalAuto.goal === 18, 'new classes track student count × 3 until the teacher edits the goal');

  await page.evaluate(async () => {
    window.TIGERGROW.state.settings.pin = '';
    await window.TIGERGROW.openPanel();
    window.TIGERGROW.panelState.tab = 'feed';
    window.TIGERGROW.renderPanel();
  });
  const targets = await page.evaluate(() => ({
    seg: parseFloat(getComputedStyle(document.querySelector('.seg button')).minHeight),
    info: parseFloat(getComputedStyle(document.querySelector('.scard .info')).height)
  }));
  check(targets.seg >= 64 && targets.info >= 64, 'teacher tab and student info targets are at least 64px at 1920px');

  await page.evaluate(() => { window.TIGERGROW.panelState.tab = 'data'; window.TIGERGROW.renderPanel(); });
  const dataText = await page.evaluate(() => ({
    panel: document.querySelector('#panel').innerText,
    habitat: document.querySelector('#habitat').innerText
  }));
  check(dataText.panel.includes('Yedek hatırlatması') && dataText.panel.includes('Son yedek:') && dataText.panel.includes('Seviye eşikleri') && dataText.panel.includes('Günlük mama sınırı'), 'Sınıf ve Veri shows backup status, the 7-day reminder, thresholds and the daily cap');
  check(!dataText.habitat.includes('Yedek hatırlatması'), 'the reminder is not painted on the habitat');

  await page.evaluate(() => { window.TIGERGROW.panelState.tab = 'reports'; window.TIGERGROW.renderPanel(); });
  const paceUi = await page.evaluate(() => document.querySelector('#panel').innerText);
  check(paceUi.includes('Tempo') && paceUi.includes('mama / öğrenci / hafta'), 'Raporlar shows the pacing card');

  const blocked = await page.evaluate(() => {
    const c = window.TIGERGROW.state.classes.find(x => x.isDemo);
    window.TIGERGROW.switchClass(c.id);
    const s = c.students.find(x => x.name === 'Kerem');
    const xp = s.xp;
    window.TIGERGROW.state.settings.dailyCap = 2;
    window.TIGERGROW.feed([s.id], 0, 3, { board: true });
    const same = s.xp === xp;
    window.TIGERGROW.state.settings.dailyCap = 10;
    return same;
  });
  check(blocked, 'student board feed respects the daily cap');

  const backup = await page.evaluate(async () => {
    const files = new Map();
    for (let i = 1; i <= 16; i++) files.set('tigergrow-yedek-2020-01-' + String(i).padStart(2, '0') + '.json', '{}');
    const dir = {
      name: 'Siniflar',
      async queryPermission() { return 'granted'; },
      async requestPermission() { return 'granted'; },
      async getFileHandle(name, opts = {}) {
        if (!files.has(name)) {
          if (!opts.create) throw new Error('NotFound');
          files.set(name, '');
        }
        return {
          async getFile() {
            const text = files.get(name);
            return { name, lastModified: Date.now(), async text() { return text; } };
          },
          async createWritable() {
            let buf = '';
            return {
              async write(data) {
                if (typeof data === 'string') buf += data;
                else if (data && typeof data.text === 'function') buf += await data.text();
                else buf += String(data);
              },
              async close() { files.set(name, buf); }
            };
          }
        };
      },
      async *entries() { for (const name of [...files.keys()]) yield [name, {}]; },
      async removeEntry(name) { files.delete(name); }
    };
    window.TIGERGROW.installBackupHandle(dir);
    const wrote = await window.TIGERGROW.runBackup({ manual: true });
    const names = [...files.keys()];
    const latest = files.get('tigergrow-yedek.json') || '';
    let students = 0;
    try { students = JSON.parse(latest).classes.reduce((n, c) => n + (c.students ? c.students.length : 0), 0); } catch (e) {}
    const dated = names.filter(n => /^tigergrow-yedek-\d{4}-\d{2}-\d{2}\.json$/.test(n));
    document.querySelector('#toasts').innerHTML = '';
    await window.TIGERGROW.runBackup({ auto: true });
    const quiet = document.querySelector('#toasts').innerText.trim();
    const snapshot = files.get('tigergrow-yedek.json');
    const empty = window.TIGERGROW.simulateWipe();
    const refused = await window.TIGERGROW.runBackup({ manual: true });
    return {
      wrote, hasLatest: names.includes('tigergrow-yedek.json'), dated: dated.length, students, quiet,
      sameAfterWipe: snapshot === files.get('tigergrow-yedek.json'), empty, refused
    };
  });
  check(backup.wrote && backup.hasLatest && backup.students > 0, 'folder backup writes tigergrow-yedek.json with the class data');
  check(backup.dated === 14, 'dated copies rotate down to 14');
  check(backup.quiet === '', 'a second automatic backup does not toast');
  check(backup.empty === false && backup.refused === false && backup.sameAfterWipe, 'wiping an empty board does not overwrite the backup file');

  const restored = await page.evaluate(async () => {
    const files = new Map();
    files.set('tigergrow-yedek.json', JSON.stringify({
      v: 1, activeClassId: 'c_r', settings: {},
      classes: [{ id: 'c_r', name: '5B', weeklyGoal: 21, students: [{ id: 's_r', name: 'Deniz', xp: 40, peak: 5 }] }]
    }));
    const dir = {
      name: 'Siniflar',
      async queryPermission() { return 'granted'; },
      async requestPermission() { return 'granted'; },
      async getFileHandle(name, opts = {}) {
        if (!files.has(name)) {
          if (!opts.create) throw new Error('NotFound');
          files.set(name, '');
        }
        return {
          async getFile() { const text = files.get(name); return { async text() { return text; } }; },
          async createWritable() {
            let buf = '';
            return {
              async write(data) { buf += data && data.text ? await data.text() : String(data); },
              async close() { files.set(name, buf); }
            };
          }
        };
      },
      async *entries() { for (const name of [...files.keys()]) yield [name, {}]; },
      async removeEntry(name) { files.delete(name); }
    };
    window.TIGERGROW.installBackupHandle(dir);
    const ok = await window.TIGERGROW.restoreFromFolder({ confirm: false });
    const s = window.TIGERGROW.state.classes.find(c => c.name === '5B').students[0];
    return { ok, name: s.name, xp: s.xp, peak: s.peak };
  });
  check(restored.ok && restored.name === 'Deniz' && restored.xp === 40 && restored.peak === 5, 'restore keeps a saved peak even when current food is below that level');

  check(errors.length === 0, 'no page errors (' + (errors[0] || 'none') + ')');
} finally {
  await browser.close();
}

if (failures.length) {
  console.error('\nFAILED');
  failures.forEach(f => console.error(' -', f));
  process.exit(1);
}
console.log('\nAll smoke checks passed.');
