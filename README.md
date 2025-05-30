# Portfolio Website with AI Chatbot

Personal portfolio website featuring an AI-powered chatbot using the Hugging Face API.

## 🌟 Features

- Modern and responsive design
- AI Chatbot powered by Hugging Face
- Dynamic typing animations
- Dark mode support
- Contact form

## 🚀 Live Demo

Visit the live website: [https://wahyu-diva.vercel.app](https://wahyu-diva.vercel.app)

## 💻 Local Development

There are several ways to run this project locally:

### Method 1: Using Live Server (Recommended for VS Code users)

1. Create `js/config.js` with your API key:
```javascript
const HUGGING_FACE_API_KEY = "your_api_key_here"; // Replace with your API key
```

2. Make sure your `index.html` has these script tags:
```html
<script src="js/config.js"></script>
<script src="js/chatbot.js"></script>
```

3. Right-click on `index.html` -> "Open with Live Server"

Benefits:
- No additional setup needed
- Just needs VS Code + Live Server extension
- Automatic hot reload
- Runs on port 5500 by default

### Method 2: Using XAMPP

1. Create `js/config.js` as shown above
2. Add script tags to `index.html` as shown above
3. Place project in `xampp/htdocs/portfolio`
4. Start Apache in XAMPP Control Panel
5. Visit `http://localhost/portfolio`

Benefits:
- No Node.js required
- No CLI tools needed
- Uses existing XAMPP setup

### Method 3: Using Vercel CLI (For production-like environment)

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```
HUGGING_FACE_API_KEY=your_api_key_here
```

3. Run development server:
```bash
vercel dev
```

## ⚙️ Environment Variables

For production (Vercel):
- Set `HUGGING_FACE_API_KEY` in Vercel project settings

For local development:
- Create `js/config.js` (for Live Server/XAMPP)
- Create `.env` (for Vercel CLI)

## 🔒 Important Security Notes

- Never commit `config.js` or `.env` to Git
- Add these files to `.gitignore`
- Use environment variables in production
- Keep your API keys private

## 📦 Dependencies

- @vercel/node: ^3.0.0
- @vercel/analytics: ^1.1.1
- Typed.js: ^2.0.12

## 🤝 Contributing

Feel free to:
- Open issues
- Submit pull requests
- Suggest improvements

## 📝 License

This project is open source and available under the [MIT License](LICENSE).


---

# Website Portfolio dengan Chatbot AI

Website portfolio pribadi yang dilengkapi dengan chatbot AI menggunakan API Hugging Face.

## 🌟 Fitur

- Desain modern dan responsif
- Chatbot AI yang didukung oleh Hugging Face
- Animasi pengetikan dinamis
- Mendukung mode gelap
- Formulir kontak

## 🚀 Demo Langsung

Kunjungi website: [https://wahyu-diva.vercel.app](https://wahyu-diva.vercel.app)

## 💻 Pengembangan Lokal

Ada beberapa cara untuk menjalankan project ini secara lokal:

### Cara 1: Menggunakan Live Server (Direkomendasikan untuk pengguna VS Code)

1. Buat file `js/config.js` dengan API key Anda:
```javascript
const HUGGING_FACE_API_KEY = "your_api_key_here"; // Ganti dengan API key Anda
```

2. Pastikan `index.html` memiliki script tag berikut:
```html
<script src="js/config.js"></script>
<script src="js/chatbot.js"></script>
```

3. Klik kanan pada `index.html` -> "Open with Live Server"

Keuntungan:
- Tidak perlu setup tambahan
- Hanya butuh VS Code + ekstensi Live Server
- Auto reload otomatis
- Berjalan di port 5500 secara default

### Cara 2: Menggunakan XAMPP

1. Buat `js/config.js` seperti di atas
2. Tambahkan script tag ke `index.html` seperti di atas
3. Letakkan project di `xampp/htdocs/portfolio`
4. Jalankan Apache di XAMPP Control Panel
5. Buka `http://localhost/portfolio`

Keuntungan:
- Tidak perlu Node.js
- Tidak perlu tools CLI
- Menggunakan XAMPP yang sudah ada

### Cara 3: Menggunakan Vercel CLI (Untuk lingkungan mirip production)

1. Install dependencies:
```bash
npm install
```

2. Buat file `.env`:
```
HUGGING_FACE_API_KEY=your_api_key_here
```

3. Jalankan server development:
```bash
vercel dev
```

## ⚙️ Variabel Lingkungan

Untuk production (Vercel):
- Set `HUGGING_FACE_API_KEY` di pengaturan project Vercel

Untuk pengembangan lokal:
- Buat `js/config.js` (untuk Live Server/XAMPP)
- Buat `.env` (untuk Vercel CLI)

## 🔒 Catatan Keamanan Penting

- Jangan pernah commit `config.js` atau `.env` ke Git
- Tambahkan file-file tersebut ke `.gitignore`
- Gunakan environment variables di production
- Jaga kerahasiaan API key Anda

## 📦 Dependencies

- @vercel/node: ^3.0.0
- @vercel/analytics: ^1.1.1
- Typed.js: ^2.0.12

## 🤝 Kontribusi

Anda bisa:
- Membuka issues
- Mengirim pull request
- Menyarankan perbaikan

## 📝 Lisensi

Project ini bersifat open source dan tersedia di bawah [Lisensi MIT](LICENSE).
