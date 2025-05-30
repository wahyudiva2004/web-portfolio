class Chatbot {
    constructor() {
        this.toggle = document.querySelector('.chatbot-toggle');
        this.container = document.querySelector('.chatbot-container');
        this.closeBtn = document.querySelector('.close-chat');
        this.input = document.querySelector('#chatInput');
        this.sendBtn = document.querySelector('.send-message');
        this.messagesContainer = document.querySelector('.chatbot-messages');
        
        this.initEventListeners();
        this.apiEndpoint = 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2';
        this.apiKey = '';
        this.initApiKey();
        
        this.systemPrompt = `Kamu adalah asisten AI portfolio Wahyu Diva. WAJIB menggunakan Bahasa Indonesia yang baik dan benar dalam setiap jawaban. PENTING: Berikan jawaban yang LENGKAP dan TIDAK TERPOTONG.

        PERAN UTAMA:
        1. Memberikan informasi lengkap tentang Wahyu Diva
        2. Menjelaskan dengan bahasa yang sederhana
        3. Menggunakan contoh yang relevan
        4. Menjawab sesuai konteks pertanyaan
        5. Pastikan setiap jawaban tuntas dan tidak terpotong

        DATA PROFIL:
        Nama: I Putu Wahyu Diva Kumuda (Wahyu/Yudip)
        Status: Mahasiswa Teknik Informatika & Junior Fullstack Dev
        Lahir: 15 Juni 2004
        Pengalaman: 2+ tahun, 50+ proyek, 30+ klien puas
        
        KEAHLIAN:
        Frontend:
        - HTML/CSS (90%)
        - JavaScript (85%)
        - React (45%)
        
        Backend:
        - Node.js (50%)
        - PHP (80%)
        
        Database & Tools:
        - MySQL (75%)
        - SQL Server (60%)
        - Git & GitHub (85%)
        
        PROYEK UNGGULAN:
        1. FlashPlay
           - Platform streaming trailer film
           - Teknologi: TMDB API, YouTube player
        
        2. FlashBot
           - Chatbot AI pintar
           - Teknologi: Vue.js, Cohere AI, Weather API
        
        3. Portfolio Website
           - Desain cyberpunk modern
           - Fitur: Animasi responsif

        CARA MENJAWAB:
        1. Untuk pertanyaan tentang WAHYU:
           - Gunakan data profil di atas
           - Fokus pada informasi yang ditanya
           - Berikan jawaban yang lengkap dalam 2-3 kalimat
           - Hindari jawaban yang terlalu panjang

        2. Untuk pertanyaan TEKNOLOGI:
           - Jelaskan dengan bahasa sederhana
           - Berikan contoh yang mudah dipahami
           - Kaitkan dengan pengalaman Wahyu jika relevan
           - Pastikan penjelasan tuntas dalam 2-3 kalimat

        CONTOH JAWABAN YANG BAIK:
        T: "Apa keahlian utama Wahyu?"
        J: "Wahyu memiliki keahlian utama di bidang frontend dengan penguasaan HTML/CSS 90% dan JavaScript 85%. Di sisi backend, dia menguasai PHP 80% dan juga berpengalaman dengan database MySQL 75% serta Git & GitHub 85%."

        T: "Apa itu JavaScript?"
        J: "JavaScript adalah bahasa pemrograman yang membuat website menjadi interaktif dan dinamis. Seperti yang digunakan Wahyu dalam proyeknya dengan tingkat keahlian 85%, JavaScript memungkinkan pembuatan fitur seperti animasi dan pembaruan konten tanpa reload halaman."

        ATURAN PENTING:
        - SELALU gunakan Bahasa Indonesia yang baik
        - Jawaban harus informatif tapi ringkas (2-3 kalimat)
        - Pastikan setiap jawaban LENGKAP dan TIDAK TERPOTONG
        - Jika tidak yakin: "Mohon maaf, saya perlu mencari informasi lebih lanjut tentang hal tersebut."`;

        this.conversationHistory = [];
    }

    initEventListeners() {
        this.toggle.addEventListener('click', () => this.toggleChat());
        this.closeBtn.addEventListener('click', () => this.toggleChat());
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        this.addMessage("Halo! Saya asisten AI portfolio Wahyu Diva. Silakan tanyakan tentang pengalaman, proyek, atau keahlian teknis Wahyu. Saya juga bisa membantu menjawab pertanyaan seputar teknologi pengembangan web!", 'bot');
    }

    async initApiKey() {
        try {
            const response = await fetch('/api/config');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this.apiKey = data.HUGGING_FACE_API_KEY;
            if (!this.apiKey) {
                console.warn('API key is empty');
            } else {
                console.log('API key loaded successfully');
            }
        } catch (error) {
            console.error('Failed to load API key:', error);
        }
    }

    toggleChat() {
        this.container.classList.toggle('active');
    }

    addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${type}-message`);
        messageDiv.textContent = text;
        this.messagesContainer.appendChild(messageDiv);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        return messageDiv;
    }

    addTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.classList.add('typing-indicator');
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('span');
            indicator.appendChild(dot);
        }
        this.messagesContainer.appendChild(indicator);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        return indicator;
    }

    async sendMessage() {
        const message = this.input.value.trim();
        if (!message) return;

        this.addMessage(message, 'user');
        this.input.value = '';
        const typingIndicator = this.addTypingIndicator();

        try {
            if (!this.apiKey) {
                const defaultResponses = [
                    "Wahyu Diva adalah web developer dengan keahlian di HTML, CSS, JavaScript dan framework modern.",
                    "Lihat proyek-proyek Wahyu di bagian Projects di atas.",
                    "Wahyu spesialis dalam UI/UX dan pengembangan web full-stack.",
                    "Portfolio ini menampilkan kemampuan Wahyu dalam web development.",
                ];
                const randomResponse = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
                setTimeout(() => {
                    this.messagesContainer.removeChild(typingIndicator);
                    this.addMessage(randomResponse, 'bot');
                }, 1000);
                return;
            }

            this.conversationHistory.push({ role: 'user', content: message });
            const response = await this.getAIResponse(message);
            this.messagesContainer.removeChild(typingIndicator);
            this.addMessage(response, 'bot');
            this.conversationHistory.push({ role: 'assistant', content: response });

            if (this.conversationHistory.length > 6) {
                this.conversationHistory = this.conversationHistory.slice(-6);
            }
        } catch (error) {
            this.messagesContainer.removeChild(typingIndicator);
            this.addMessage('Maaf, terjadi kesalahan. Silakan coba lagi.', 'bot');
            console.error('Error:', error);
        }
    }

    async getAIResponse(message) {
        try {
            const conversationContext = this.conversationHistory
                .slice(-2)
                .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
                .join('\n');

            const fullPrompt = `<s>[INST] ${this.systemPrompt}\n\nRiwayat:\n${conversationContext}\n\nUser: ${message} [/INST]`;

            const response = await fetch(this.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    inputs: fullPrompt,
                    parameters: {
                        max_new_tokens: 500,
                        temperature: 0.7,
                        top_p: 0.95,
                        return_full_text: false,
                        do_sample: true,
                        top_k: 40
                    }
                })
            });

            if (!response.ok) {
                throw new Error('API request failed');
            }

            const data = await response.json();
            return data[0].generated_text.trim();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Chatbot();
});
