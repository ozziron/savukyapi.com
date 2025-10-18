# Savuk Yapı Kurumsal Web Sitesi

Savuk Yapı'nın Samsun merkezli inşaat ve yapı hizmetlerini tanıtmak için hazırlanan tek sayfalı kurumsal web sitesi.

## İçerik

- Kahraman bölümünde marka mesajı ve hızlı aksiyon butonları
- Hakkımızda, hizmetler, çalışma modeli ve referans bölümleri
- Öne çıkan projeler listesi
- İletişim formu ve iletişim bilgileri

## Yerel geliştirme ve canlı önizleme

Projeyi yerelde canlı olarak test edebilmek için depoda basit bir Node.js statik sunucusu bulunur.

1. [Node.js](https://nodejs.org/) 18 veya üzeri bir sürümü kurun.
2. Depo dizininde aşağıdaki komutu çalıştırarak sunucuyu başlatın:

   ```bash
   npm run dev
   ```

3. Tarayıcınızdan `http://localhost:4173` adresine giderek siteyi canlı olarak görüntüleyin.

Sunucu `HOST` ve `PORT` ortam değişkenlerini okuyarak farklı bağlantı noktaları üzerinden de çalıştırılabilir. Log çıktısı üzerinden aktif adres bilgisi paylaşılır.

## Dosya yapısı

- `index.html`: Ana sayfa içeriği
- `assets/css/styles.css`: Stil dosyaları
- `assets/js/main.js`: Etkileşimli davranışlar
- `server.js`: Yerel geliştirme için kullanılan basit Node.js statik sunucusu

Değişiklik yapmak için ilgili dosyaları güncellemeniz yeterlidir.
