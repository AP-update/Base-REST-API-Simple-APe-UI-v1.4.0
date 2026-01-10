const axios = require('axios');

module.exports = function (app) {
  app.get('/maker/brat', async (req, res) => {
    try {
      const { text } = req.query;
      if (!text) return res.status(400).json({ status: false, error: 'Parameter text diperlukan' });

      const response = await axios.get(`https://brat.siputzx.my.id/image?text=${encodeURIComponent(text)}`, {
        responseType: 'arraybuffer',
        timeout: 15000,
        headers: { 'User-Agent': 'Mozilla/5.0' }
      });

      res.set('Content-Type', 'image/png');
      res.send(Buffer.from(response.data));
    } catch (error) {
      res.status(500).json({ status: false, error: "Gagal mengambil gambar dari sumber" });
    }
  });
};
