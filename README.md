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

## Vercel üzerinde özel alan adını bağlama

Vercel projesini Hostinger üzerinden satın aldığınız **savukyapi.com** alan adıyla eşlemek için aşağıdaki adımları izleyin:

1. Vercel CLI ile projeyi açtığınız klasörde oturum açın ve alan adını ekleyin:

   ```bash
   npx vercel login
   npx vercel link
   npx vercel domains add savukyapi.com
   ```

   Alternatif olarak aynı işlemi Vercel kontrol panelinde, proje ayarları altındaki **Domains** sekmesinden de yapabilirsiniz.

2. Hostinger DNS yönetiminde şu kayıtları tanımlayın:

   | Kayıt | Ad (Host) | Değer | TTL |
   |-------|-----------|-------|-----|
   | A | `@` | `76.76.21.21` | 600 sn veya varsayılan |
   | CNAME | `www` | `cname.vercel-dns.com` | 600 sn veya varsayılan |

   Eğer farklı alt alanlar yönlendirmek isterseniz (ör. `iletisim.savukyapi.com`), Vercel panelinden alt alanı ekleyip Hostinger üzerinde karşılık gelen CNAME kaydını oluşturun.

3. DNS yayılımı tamamlandıktan sonra Vercel panelindeki domain doğrulaması otomatik olarak başarılı olur ve siteyi `https://savukyapi.com` ve `https://www.savukyapi.com` adreslerinden erişebilirsiniz.

4. SSL sertifikası Vercel tarafından otomatik sağlanır. Yayılım tamamlandığında siteyi test ederek ana alan adı üzerinden çalıştığını doğrulayın.
