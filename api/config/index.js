// api/config/index.js
module.exports = async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Content-Type', 'application/json');

    // Handle preflight request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only allow GET requests
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const apiKey = process.env.HUGGING_FACE_API_KEY;
        if (!apiKey) {
            console.warn('Warning: HUGGING_FACE_API_KEY is not set in environment variables');
        }

        return res.status(200).json({
            HUGGING_FACE_API_KEY: apiKey || ''
        });
    } catch (error) {
        console.error('Error in /api/config:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
