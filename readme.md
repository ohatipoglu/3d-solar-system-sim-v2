# 🌍 3D Astronomi Simülasyonu – Dünya, Ay ve Güneş

Bu proje, Dünya'nın Güneş etrafındaki yörüngesini ve Ay'ın Dünya etrafındaki yörüngesini **gerçek zamanlı**, **3 boyutlu** ve **etkileşimli** olarak görselleştiren bir web tabanlı simülasyondur. Tamamen Three.js kütüphanesi ile geliştirilmiş olup, modern bir tarayıcıda ek bir kurulum gerektirmeden çalışır.

![Simülasyon Ekran Görüntüsü](https://via.placeholder.com/800x400?text=3D+Astronomy+Simulation)

## 🚀 Özellikler

### Astronomik Doğruluk
- Dünya'nın Güneş etrafındaki yıllık yörüngesi (gerçek hız ve dönem)
- Ay'ın Dünya etrafındaki aylık yörüngesi (27.3 gün)
- Dünya'nın 23.44° eksen eğikliği ile mevsimlerin oluşumu
- Ay'ın tidal lock (eşzamanlı dönüş) efekti
- Gerçek zamanlı Ay fazı hesaplaması

### Görsel Kalite
- Yüksek çözünürlüklü NASA dokuları (Dünya, Ay, bulutlar)
- Dinamik gölgelendirme ve ışıklandırma (Güneş tek ışık kaynağı)
- Bloom (parlama) efekti ve Güneş etrafında korona
- Derin uzay yıldız alanı ve sarmal nebula efekti
- Yarı saydam yörünge çizgileri (Dünya yörüngesi mavi, Ay yörüngesi altın sarısı)

### Kullanıcı Kontrolleri
- **Zaman kontrolü:** Oynat/Duraklat, geri sar, ileri sar, anlık zamana dön
- **Hız ayarı:** 0.1x'ten 1.000.000x'e kadar kaydırıcı ve hazır butonlar
- **Ölçek modları:** Görsel ölçek (estetik) / Gerçek fiziksel ölçek (doğru oranlar)
- **Kamera kontrolü:** Fare ile orbit, zoom, pan
- **Klavye kısayolları:** Space (oynat/duraklat), R (sıfırla), C (kamera hedefi), 1-9 (hız preset)

### Bilgi Paneli (HUD)
- Simüle edilen tarih ve saat (UTC ve İstanbul)
- Mevsim ve Ay fazı (emoji + metin)
- Dünya-Güneş mesafesi (AU ve km)
- Dünya-Ay mesafesi (km)
- Anlık simülasyon hızı

### Ekstra Özellikler
- Tarihe atlama (takvim seçici veya özel tarihler: Apollo 11 inişi, 21 Haziran yaz gündönümü)
- Zoom seviyesine göre otomatik detay modu (Güneş’e yaklaşınca korona, Dünya’ya yaklaşınca bulutlar ve atmosfer)
- Ekliptik düzlem grid’ini açıp kapama

## 📦 Gereksinimler

- Modern bir web tarayıcısı (Chrome, Firefox, Edge, Safari)
- İnternet bağlantısı (dokular ve kütüphaneler CDN üzerinden yüklenir)
- WebGL desteği (neredeyse tüm modern cihazlarda mevcuttur)

## 🖥️ Nasıl Çalıştırılır

1. **Tek dosya:** Proje `index.html` adlı tek bir dosyadan oluşur.
2. Dosyayı bilgisayarınıza indirin.
3. Herhangi bir web tarayıcısında dosyayı çift tıklayarak açın.
   > Not: Bazı tarayıcılar yerel dosyalarda WebGL kısıtlaması uygulayabilir. Bu durumda basit bir HTTP sunucusu kullanabilirsiniz:
   > ```bash
   > # Python ile
   > python -m http.server 8000
   > # veya
   > npx serve
   > ```
4. Simülasyon otomatik olarak başlayacaktır.

## 🎮 Kullanım Kılavuzu

### Temel Kontroller
| Eylem | Fare / Dokunmatik | Klavye |
|-------|------------------|--------|
| Döndürme | Sol tık + sürükle | - |
| Yakınlaştır / Uzaklaştır | Sağ tık + sürükle veya kaydırma | - |
| Kaydırma (pan) | Orta tık + sürükle | - |
| Oynat / Duraklat | - | `Space` |
| Şimdiki zamana dön | - | `R` |
| Kamera hedefi (Güneş/Dünya/Ay/Serbest) | - | `C` |
| Hız presetleri | - | `1` (0.1x) … `9` (10M x) |

### Alt Panel Butonları
- **⏸️ Duraklat / ▶️ Başlat** : Simülasyon zamanını durdurur veya devam ettirir.
- **🔄 Şimdiki Zamana Dön** : Simülasyonu gerçek ana sıfırlar.
- **⏪ Geri Sar (1sn)** : Simülasyon zamanını 1 saniye geri alır.
- **⏩ İleri Sar (1sn)** : Simülasyon zamanını 1 saniye ileri alır.
- **🌐 Görsel Ölçek / ⚛️ Gerçek Ölçek** : Cisim boyutlarını ve yörünge mesafelerini değiştirir.
- **📐 Ekliptik Izgara** : Yörünge düzlemindeki referans grid’ini gösterir/kapatır.

### Hız Ayarları
- **Kaydırıcı** ile logaritmik olarak 0.1x ile 1.000.000x arası hassas ayar.
- **Preset butonlar** ile sık kullanılan hızlara tek tıkla geçiş.

### Tarih Atlama
- Takvim seçiciden herhangi bir tarih seçip "Enter" yaparak atlayabilirsiniz.
- Özel butonlar ile Apollo 11 iniş anına veya 21 Haziran 2025 yaz gündönümüne ışınlanabilirsiniz.

## 🛠️ Teknik Detaylar

- **3D Motor:** Three.js (r128)
- **Post-processing:** EffectComposer + UnrealBloomPass
- **Gölgelendirme:** PointLight (Güneş) + ShadowMap
- **Dokular:** NASA'nın Blue Marble ve Ay yüzeyi dokuları (üçüncü parti CDN'lerden yüklenir)
- **Zaman Yönetimi:** Gerçek Unix timestamp tabanlı, astronomik periyotlar saniye cinsinden modellenmiştir.
- **Yörünge Mekaniği:** Kepler yasaları basitleştirilmiş (dairesel yörüngeler, sabit hız). Eksantriklik ve pertürbasyonlar göz ardı edilmiştir (görsel simülasyon için yeterlidir).

## 🌟 Gelecek Geliştirmeler

- [ ] Gezegenler (Merkür, Venüs, Mars, Jüpiter, Satürn) eklenmesi
- [ ] Tutulma simülasyonları (Güneş ve Ay tutulmaları)
- [ ] Gerçek yıldız haritası (HIP kataloğu) ile arka plan
- [ ] Mobil cihazlar için dokunmatik iyileştirmeleri
- [ ] Sesli anlatım ve eğitici mod

## 📜 Lisans

Bu proje MIT lisansı ile lisanslanmıştır. Kullanım, kopyalama, değiştirme ve dağıtım serbesttir. Katkıda bulunmak isterseniz lütfen iletişime geçin.

## 👨‍💻 Katkıda Bulunanlar

- Tasarım ve geliştirme: [Simülasyon Uzmanı - AI asistanı]
- Three.js topluluğu ve NASA dokuları için teşekkürler.

---

**İyi seyirler!** 🚀🌕🌞