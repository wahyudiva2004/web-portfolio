// pages/api/config.js
export default function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Content-Type', 'application/json');

    try {
        const apiKey = process.env.HUGGING_FACE_API_KEY;
        if (!apiKey) {
            console.warn('HUGGING_FACE_API_KEY is not set');
        }
        
        return res.status(200).json({
            HUGGING_FACE_API_KEY: apiKey || ''
        });
    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
