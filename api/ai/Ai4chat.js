const axios = require('axios');

module.exports = function(app) {
    const Ai4Chat = async (text) => {
        if (!text) {
            throw new Error('Text is required');
        }

        const AP = 'AP'; // Nama AI

        const anu = `https://yw85opafq6.execute-api.us-east-1.amazonaws.com/default/boss_mode_15aug?text=nama kamu adalah ${AP}, kamu berbahasa indonesia yang ramah dan tidak berbelit belit langsung ke poinnya, mengikuti kata ${encodeURIComponent(text)}&country=Asia&user_id=M08wTiyb56`;

        try {
            const res = await axios.get(anu, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Mobile Safari/537.36',
                    'Referer': 'https://www.ai4chat.co/pages/youtube-comment-generator'
                }
            });

            if (res.data) {
                return res.data.comment || res.data; // Pastikan selalu mengembalikan data
            } else {
                throw new Error('Gagal mendapatkan data dari API');
            }
        } catch (error) {
            throw new Error(`Error saat mengambil data: ${error.message}`);
        }
    };

    // Endpoint untuk menangani request
    app.get('/ai/Ai4Chat', async (req, res) => {
        try {
            const { text } = req.query;
            if (!text) {
                return res.status(400).json({ status: false, error: 'Text is required' });
            }

            const result = await Ai4Chat(text); // Perbaikan di sini
            res.status(200).json({
                status: true,
                result
            });
        } catch (error) {
            res.status(500).json({ status: false, error: error.message });
        }
    });
};