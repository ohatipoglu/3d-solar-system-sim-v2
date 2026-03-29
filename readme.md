# 🌍 3D Astronomi Simülasyonu – Dünya, Ay ve Güneş

Bu proje, Dünya'nın Güneş etrafındaki yörüngesini ve Ay'ın Dünya etrafındaki yörüngesini **gerçek zamanlı**, **3 boyutlu** ve **etkileşimli** olarak görselleştiren web tabanlı bir simülasyondur. ES6 modül yapısı ve Three.js (r128) kullanılarak geliştirilmiştir.

## 🚀 Özellikler

### Astronomik Doğruluk
* **Gerçekçi Periyotlar:** Dünya'nın yıllık yörüngesi ve Ay'ın 27.3 günlük yörünge döngüsü matematiksel olarak modellenmiştir.
* **Fiziksel Detaylar:** Dünya'nın 23.44° eksen eğikliği ve buna bağlı mevsim değişimleri hesaplanmaktadır.
* **Dinamik Veriler:** Vektörel açılar kullanılarak Ay'ın fazı (Yeni Ay, Dolunay, vb.) ve Dünya-Güneş/Ay mesafeleri anlık olarak hesaplanır.

### Görsel Kalite
* **Gelişmiş Kaplamalar:** Yüksek çözünürlüklü diffuse, specular ve normal haritaları ile Dünya yüzeyi ve bulut katmanları.
* **Post-Processing:** `UnrealBloomPass` kullanılarak Güneş çevresinde gerçekçi parlama (korona) efekti.
* **Derin Uzay:** 4000 adet parçacıktan (particle) oluşan dinamik yıldız alanı.

### Etkileşimli Kontroller (HUD & UI)
* **Zaman Yönetimi:** Simülasyonu duraklatma, ileri/geri sarma ve 0.1x ile 1.000.000x arasında logaritmik hız ayarı.
* **Ölçeklendirme:** Göze hitap eden "Görsel Ölçek" ile mesafelerin doğru yansıtıldığı "Gerçek Ölçek" arasında geçiş.
* **Kamera Hedefleri:** Yörünge kontrolleri (OrbitControls) ile kamerayı Serbest, Güneş, Dünya veya Ay'a kilitleme.
* **Tarih Atlama:** İstenilen bir tarihe, Apollo 11 inişine (20 Temmuz 1969) veya yaz gündönümüne anında geçiş.

## 📁 Proje Yapısı

Proje, temiz bir kod mimarisi için modüllere ayrılmıştır:

* `index.html`: Ana arayüz, HUD ve kontrollerin bulunduğu giriş dosyası.
* `src/main.js`: Three.js sahne kurulumu, render döngüsü ve animasyonların yönetildiği ana modül.
* `src/celestial.js`: Güneş, Dünya, Ay ve bulut mesh'lerinin, materyallerinin ve kaplamalarının oluşturulduğu modül.
* `src/constants.js`: Simülasyonda kullanılan astronomik ve matematiksel sabitler (AU, periyotlar, ölçekler).
* `src/ui.js`: Kullanıcı arayüzü güncellemeleri, buton dinleyicileri ve klavye kısayollarının yönetimi.
* `src/utils.js`: Ay fazı hesaplama ve mevsim belirleme gibi yardımcı matematiksel fonksiyonlar.

## 🖥️ Nasıl Çalıştırılır?

Proje ES6 modülleri (`type="module"`) kullandığı için, güvenlik (CORS) politikaları gereği dosyayı tarayıcıda doğrudan çift tıklayarak (`file://`) açtığınızda kaplamalar yüklenmeyebilir. 

Sorunsuz çalıştırmak için yerel bir web sunucusu kullanmalısınız:

**Seçenek 1: VS Code (Önerilen)**
1. Projeyi VS Code ile açın.
2. `Live Server` eklentisini kurun.
3. `index.html` dosyasına sağ tıklayıp "Open with Live Server" seçeneğine tıklayın.

**Seçenek 2: Python / Node.js**
Terminalinizi proje dizininde açıp aşağıdaki komutlardan birini çalıştırın:
```bash
# Python 3 için
python -m http.server 8000

# Node.js için
npx serve