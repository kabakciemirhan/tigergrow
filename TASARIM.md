# TIGER GROW — Oyun Tasarım Belgesi (v3)

Akıllı tahtada çalışan, oyunlaştırma temelli sınıf uygulaması. Her öğrencinin U-Tigers maskotundan esinlenen (altın kürk, mor çizgi) bir kaplan yavrusu vardır; olumlu davranışlarla beslenen kaplan büyür. Referans: "Sınıf/Ödev Akvaryumu". Akvaryumun yerini savana habitatı, balıkların yerini kaplanlar alır.

## 1. Ekranlar

| Ekran | Kim kullanır | İçerik |
|---|---|---|
| **Habitat (ana ekran)** | Tüm sınıf | Tam ekran animasyonlu savana. Kaplanlar dolaşır; her kaplanın altında ad, seviye yıldızı ve 🍖 puan görünür. Habitattaki tabelada ve logoda U-Tigers arması yer alır. 🔓/🔒 düğmesi öğrenci beslemesini açar ya da kapatır. Üst bantta maskot alanı, sınıf menüsü, haftalık sınıf hedefi ilerleme çubuğu ve sıradaki ödül yer alır. Bir kaplana dokununca kendi seviyesi ve bir sonraki seviyeye kalan mama gösterilir. |
| **Kaplan Kartı** | Öğrenci | Öğrenci kendi kaplanına (ya da adına) dokunur. Kartta puan, seviye ilerlemesi ve 4 kategori × Az/Orta/Çok besleme düğmesi bulunur. Günlük mama sınırı (varsayılan 10) ve öğretmen kilidi geçerlidir. |
| **Kaplanımı Süsle** | Öğrenci | 6 yuva sekmesi vardır: Kıyafet, Kafa, Yüz, Boyun, Sırt, Eşya. Kıyafet ve aksesuarlar seviyeyle açılır; seçim puan vermez. Kız ve erkek öğrencilere özel parçalar vardır (bkz. 2b). "Seviyeye göre otomatik" seçeneği cinsiyete göre varsayılan görünüme döner. |
| **Öğretmen Paneli** (isteğe bağlı PIN) | Öğretmen | Sağdan açılır, habitatın solu görünür kalır. Beslenen kaplan görünür alana koşar. 5 sekme vardır: **Besle**, **Öğrenciler**, **Öz Değerlendirme**, **Raporlar**, **Sınıf ve Veri**. |
| Besle | Öğretmen | Öğrenci kartları çoklu seçilebilir, "Tümünü seç" ile toplu besleme yapılır. Alt bantta 4 kategori × Az/Orta/Çok (+1/+2/+3) düğmesi, 30 adımlık **Geri Al** ve 🔔 gizli hatırlatma bulunur. |
| Öğrenci detayı | Öğretmen | Seviye ilerlemesi, son 8 haftanın **yalnızca kendi** grafiği, kategori toplamları ve öz değerlendirme–öğretmen karşılaştırması. |
| **Öz Değerlendirme** | Öğrenci | Öğrenci kendi kaplanını seçer ve 3 soruyu 5'li emoji ölçeğiyle yanıtlar. Bu yanıtlar puan vermez. |
| Raporlar | Öğretmen | Sınıf (4A/5A/5B) ve dönem (bu hafta, son 4 hafta, son 8 hafta, bu dönem, tüm zamanlar) seçilir. **Sınıf raporu**, **sınıf + tüm öğrenci raporları** ve **tüm sınıfların raporları** tek PDF olarak; her öğrencinin 1 sayfalık raporu ayrı PDF olarak indirilir. Öğrenci ayrıntısında da "📄 PDF rapor" düğmesi vardır. |
| Öğrenciler (Excel bağlı sınıf) | Öğretmen | Excel bağlantı durumu, "🔄 Şimdi güncelle", öğrenci listesi (👧/👦) ve **Arşiv**: Excel'den silinen öğrenciler. Arşivdeki kayıt "🔗 Verisini aktar" ile yeni ada taşınır ya da kalıcı silinir. Ad/cinsiyet düzenleme ve silme Excel'den yapılır. |
| Öz Değerlendirme raporu | Öğretmen | Haftalara göre öğrencinin kendi yanıtı ile öğretmen puanı yan yana gösterilir. Büyük farklarda 💬 "konuşma fırsatı" işareti çıkar. |
| Kutlama | Tüm sınıf | Seviye atlamada tam ekran büyüme animasyonu, konfeti ve ses oynar. Sınıf hedefi tamamlanınca ödül kutlaması gösterilir. |

## 2. Puan – Seviye Tablosu

| Seviye | Ad | Gereken toplam mama | Boyut | Görsel değişim |
|---|---|---|---|---|
| 1 | Yavru | 0 | %62 | Büyük kafa, iri gözler, tek alın çizgisi |
| 2 | Meraklı Yavru | 15 | %74 | Başta yaprak filizi, gövde çizgileri başlar |
| 3 | Genç Kaplan | 40 | %86 | Bej fular, yanak tüyleri, yanak çizgileri |
| 4 | Güçlü Kaplan | 80 | %100 | Bandana ve madalya, tam çizgi deseni |
| 5 | Efsane Tiger | 140 | %112 | Taç, pelerin, altın aura ve parıltılar |

**Besleme:** 📚 Ödev · ✋ Katılım · 🤝 Yardımlaşma · ⭐ Olumlu Davranış. Her kategori Az +1, Orta +2 ya da Çok +3 verir.
**Tempo varsayımı:** Öğrenci başına haftada yaklaşık 4–5 mama düşer. Buna göre Seviye 3'e yaklaşık 9 haftada, Seviye 5'e dönem sonunda (~30 hafta) ulaşılır.
**Haftalık sınıf hedefi:** Varsayılan değer öğrenci sayısı × 3'tür ve öğretmen değiştirebilir. Hafta Pazartesi başlar.
**Ödül sırası:** 🌼 Çiçek Bahçesi → 🌳 Dev Ağaç → 💧 Şelale → 🦋 Kelebekler → 🌙 Gece Modu → 🌈 Gökkuşağı. Açılan ödül kalıcıdır, geri alınmaz.

## 2b. Kıyafet ve Aksesuar Kataloğu (açıldığı seviye)

👧 = yalnızca kız, 👦 = yalnızca erkek öğrencilere görünür; işaretsizler ortaktır. Öğrencinin cinsiyeti boşsa ya da "Cinsiyete özel kıyafetler" ayarı kapalıysa herkes hepsini görür.

| Yuva | Sv1 | Sv2 | Sv3 | Sv4 | Sv5 |
|---|---|---|---|---|---|
| Kıyafet | U-Tigers Tişörtü, 👧 Çiçekli Elbise, 👦 Salopet | 👧 Tütü Etek, 👦 Futbol Forması | Kapüşonlu Sweat, Bilim Önlüğü | 👧 Prenses Elbisesi, 👦 Smokin | — |
| Kafa | Fiyonk, 👧 Çiçek Tacı, 👦 Beyzbol Şapkası | Yaprak, U-Tigers Kepi | Mezuniyet Kepi, 👧 Prenses Tacı, 👦 Korsan Şapkası | Bandana | Taç |
| Yüz | Gözlük | 👧 Kalp Gözlük, 👦 Kahraman Maskesi | Güneş Gözlüğü | — | — |
| Boyun | Papyon | 👧 İnci Kolye, 👦 Kravat | Fular | Madalya | — |
| Sırt | — | Sırt Çantası | 👧 Peri Kanatları, 👦 Roket Çantası | Pelerin | Altın Kanatlar |
| Eşya | Kitap, 👧 El Çantası, 👦 Futbol Topu | Balon, 👧 Sihirli Değnek | 👦 Kaykay | Kupa | — |

**Otomatik görünüm (seviyeye göre):** Ortak: — · Yaprak · Fular · Bandana+Madalya · Taç+Pelerin. 👧: Fiyonk · Çiçek Tacı+Elbise · Çiçek Tacı+İnci Kolye+Tütü · Prenses Tacı+Madalya+Elbise · Taç+Peri Kanatları+Prenses Elbisesi. 👦: Beyzbol Şapkası · Şapka+Tişört · Fular+Forma · Bandana+Madalya+Forma · Taç+Pelerin+Smokin.

## 2c. Excel Sınıf Listesi (`sinif-listesi.xlsx`)

- Her sayfa bir sınıftır; sayfa adı sınıf adıdır (4A, 5A, 5B). İlk satırda **Ad** ve **Cinsiyet (K/E)** başlıkları bulunur. Başlığında "Ad" olmayan sayfalar (ör. "Nasıl Kullanılır") atlanır.
- Uygulama sınıfları adla eşler ("5-A" = "5A"); olmayan sınıfı oluşturur. Öğrenciler adla eşlenir (büyük/küçük harf ve boşluk duyarsız).
- Yeni ad → eklenir. Listeden çıkan ad → **arşive** alınır (veri korunur). Arşivdeki ad geri yazılırsa arşivden döner. Aynı ad iki kez yazılırsa ikincisi alınmaz ve uyarı çıkar.
- Haftalık hedefe öğretmen dokunmadıysa hedef öğrenci sayısı × 3 olarak güncellenir.
- Chrome/Edge: dosya bir kez "bağlanır" (File System Access API), tutamak IndexedDB'de saklanır; uygulama açılışta, pencere odağında ve dakikada bir dosyanın değişme zamanını kontrol eder. Tarayıcı yeniden başlatılınca izin isteyebilir (tek dokunuş). Diğer tarayıcılarda dosya her güncellemede elle seçilir.
- .xlsx okuyucu kütüphanesizdir (ZIP + `DecompressionStream` + XML).

## 2d. PDF Raporları

- Kütüphanesiz: her sayfa tuvale (≈200 dpi) çizilir, JPEG'e çevrilir ve PDF'e gömülür. Sayfa numaraları vektör metindir. Biten sayfa hemen JPEG'e çevrilir; uzun raporlarda bellek şişmez.
- **Sınıf raporu (2+ sayfa):** özet kutuları, haftalık sınıf toplamı (kategori yığılmış + hedef çizgisi), kategori ve seviye dağılımı, ödüller, öz değerlendirme katılımı, 🔔 7+ gün ve 💬 konuşma fırsatı listeleri, ada göre sıralı öğrenci tablosu.
- **Öğrenci raporu (1 sayfa):** kaplanın kendi kıyafetleriyle görüntüsü, seviye ve ilerleme, dönem kutuları (yalnızca kendi rekoru), haftalık gelişim grafiği, kategoriler, kaplan dolabı (açık ve sıradaki parçalar), öz değerlendirme–öğretmen tablosu, öğretmen görüşü alanı.

## 3. Pedagojik Kurallar (kodda nasıl uygulandı)

- **Asla küçülmez:** Seviye `peak` alanında tutulur ve yalnızca artar. Geri Al ile puan düşse bile kaplan küçülmez. Açlık, hastalık ve ölüm mekaniği yoktur.
- **Sıralama yok:** Liste puana göre değil, ada göre sıralanır. Puanlar okul kararıyla tahtada görünür; ayarlardan kapatılabilir. Grafikler yalnızca öğrencinin kendi haftalarını gösterir.
- **Öğrenci beslemesi:** Öğrenciler kendi kaplanlarını kendileri besler. Kötüye kullanıma karşı iki önlem vardır: öğretmen kilidi (🔒, PIN ile açılır) ve günlük mama sınırı. Öğretmen paneli bu sınırlara takılmaz.
- **7 gün kuralı:** 7+ gündür beslenmeyen öğrenciler yalnızca 🔔 düğmesine dokunulunca, nötr bir dille listelenir. Bu bilgi habitatta hiç görünmez.

## 4. Veri Modeli (localStorage: `tigergrow.v1`)

```js
{
  v: 1,
  activeClassId: "c_x1",
  settings: { pin: "", showStars: true, showPoints: true, sound: true, mascot: null /* null = U-Tigers logosu */, boardFeed: true, dailyCap: 10,
              genderDeco: true, excel: { name, mtime, at, live } | null },
  classes: [{
    id, name: "5A", weeklyGoal: 90,
    src: "excel" | null,                // excel = liste sinif-listesi.xlsx'ten gelir
    goalAuto: true,                     // hedef öğrenci sayısıyla güncellenir
    archived: [ /* öğrenci kayıtları + archivedAt */ ],
    rewards: ["flowers","tree"],        // açılan ödüller (kalıcı)
    goalWeeks: ["2026-10-05"],          // hedefin tamamlandığı haftalar
    nightOn: false,
    students: [{
      id, name: "Ayşe",                 // yalnızca ad / takma ad
      g: "K" | "E" | "",                // yalnızca kıyafet seçeneklerini belirler
      xp: 47, peak: 3,                  // peak: ulaşılan en yüksek seviye
      tone: 0..3,                       // kürk tonu (ayırt edicilik)
      createdAt, lastFedAt,
      weeks: { "2026-10-12": [hw, part, help, beh] }, // haftalık kategori toplamları
      deco: { body:"tee", head:"cap", face:"glasses", neck:"none", back:"bag", item:"book" } | null, // null = seviyeye göre otomatik
      day: { d:"2026-10-15", n:3 }        // tahtadan bugünkü besleme (günlük sınır)
    }],
    self: { "2026-10-12": { [studentId]: [q1,q2,q3] } }, // 1–5, puan vermez
    log: [{ id, ts, sids:[...], cat, amt }]             // son 200 işlem
  }]
}
```

Tek tek olay yerine **haftalık toplamlar** tutulur. Böylece 10 sınıf × 45 öğrenci × 1 yıl veri, localStorage'ın 5 MB sınırının çok altında kalır.

## 5. KVKK ve Gizlilik

- Hesap, sunucu, analitik ve dış istek yoktur. Uygulama çevrimdışı çalışan tek bir HTML dosyasıdır.
- Yalnızca ad veya takma ad girilir. CSV yapıştırmada varsayılan olarak "yalnızca ilk kelime" alınır; ikinci sütun (soyad) hiç okunmaz.
- Excel'de yalnızca ad/takma ad ve cinsiyet (K/E) tutulur. Cinsiyet yalnızca kıyafet seçeneklerini belirler; öğretmen raporlarında görünür, habitatta görünmez.
- PDF raporların her sayfasında "yalnızca öğretmen ve veli paylaşımı içindir" notu bulunur.
- Cihaz değiştirmek için JSON olarak dışa ve içe aktarma yapılır. **Tarayıcı verisi temizlenirse kayıtlar silinir; haftalık JSON yedeği önerilir.**

## 6. Teknik

- Tek dosya `index.html`: vanilla JS, inline SVG, CDN yok. Yanında `sinif-listesi.xlsx` (öğrenci listesi) durur.
- Habitat statik bir SVG sahnedir. Kaplanlar DOM + SVG olarak çizilir ve `requestAnimationFrame` ile yalnızca `transform` güncellenir. 45 kaplanda kare başına yaklaşık 90 stil yazımı yapılır.
- Arayüz ölçüsü `rem` cinsindendir ve 1920 px genişlikte 1 rem = 16 px olur. Dokunma hedefleri en az 4 rem (64 px) büyüklüğündedir.
- Maskot alanı: Sınıf ve Veri sekmesinden görsel yüklenir. Görsel, üst banttaki logoda ve habitattaki tabelada görünür.

## 7. Demo Modu

"Demo sınıfı yükle" düğmesi 10 öğrencili **Demo 5-A** sınıfını oluşturur: 5 seviyenin hepsi temsil edilir, son 8 haftalık geçmiş vardır, haftalık hedef yaklaşık %75 doludur, 2 ödül açıktır, öz değerlendirme yanıtları ve 7 günlük hatırlatmayı göstermek için bir öğrenci (Kerem) bulunur. Demo sınıfı silinebilir.
