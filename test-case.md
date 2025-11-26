### Proje Özeti:

Kullanıcının yazdığı cümleleri AI ile analiz eden veya AI'den yanıt alan bir mobil uygulama
geliştirilecektir. Uygulama, metin tabanlı bir 'akıllı asistan' deneyimi sunacak şekilde tasarlanmalı, ancak
her şey ücretsiz servislerle çalışmalıdır.

### Proje Konusu: "AI Günlük Asistanım"

Kullanıcı her gün uygulamaya bir cümle veya duygu yazısı girecek (örneğin: "Bugün motive hissediyorum
ama biraz yorgunum.").

Uygulama bu cümleyi ücretsiz bir AI API'sine gönderip analiz edecek ve şu çıktıları verecek:

- Duygu analizi: pozitif / nötr / negatif
- Basit özet: (ör. "Bugün genel olarak olumlu bir gün geçirmişsin.")
- Öneri: (ör. "Kendine 10 dakikalık bir mola verebilirsin.")

Tüm geçmiş girdiler lokal olarak saklanacak ve kullanıcı isterse 'haftalık özet' sayfasında bu sonuçları
görebilecek.

Teknolojiler
**Mobil Platform**: React Native CLI (JavaScript)
**State Yönetimi**: Context API veya Redux Toolkit
**AI Entegrasyonu**: Hugging Face free endpoint (ör. distilbert-base-uncased sentiment analysis)
**Veri Saklama**: AsyncStorage (lokal)
**UI Kütüphanesi**: React Native Paper veya Native Base (isteğe bağlı)

### Özellikler (MVP)

1. Günlük Girdi Ekranı
   Kullanıcı bir cümle yazar, 'Analiz Et' butonuna tıklar. AI API çağrısı yapılır, sentiment sonucu ve öneri
   gösterilir.
2. Geçmiş Ekranı
   AsyncStorage'da saklanan girdiler listelenir. Her girdinin duygu rengi (emoji ya da renk kodu) ile
   gösterilir.
3. Basit UI / UX
   Duygu durumuna göre arka plan rengi değişimi (ör. negatif = gri, pozitif = sarı).
4. AI Araç Kullanım Dokümantasyonu
   Eğer kodun bir kısmı Cursor / Claude Code gibi araçlarla yazılmışsa README'de belirtilmelidir.

### Teslim Gereksinimleri

GitHub Repository

- Proje React Native CLI formatında olmalı
- README'de kurulum ve çalıştırma adımları açık bir şekilde belirtilmeli
- Kullanılan AI modeli ve API açıklaması eklenmelidir

Çalışır Demo:

- Uygulamanın ekran görüntüleri veya kısa ekran videosu (Analiz Et ve Geçmiş ekranları)

Offline Çalışma:

- İnternet yokken önceki analizler görüntülenebilmelidir

### Notlar

- Proje süresi: 3 gün
- Tüm servisler ücretsiz olmalıdır
- Kod kalitesi ve dokümantasyon önemlidir
- AI araç kullanımı şeffaf bir şekilde belirtilmelidir
