const axios = require("axios");

module.exports = function (app) {

  const LyricsAI = {
    base: "https://lyricsgenerator.com/api/completion",

    headers: {
      "accept": "*/*",
      "content-type": "text/plain;charset=UTF-8",
      "origin": "https://lyricsgenerator.com",
      "referer": "https://lyricsgenerator.com",
      "user-agent":
        "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
    },

    /**
     * generate lyrics
     */
    chat: async ({ text }) => {
      if (!text) throw new Error("Text wajib diisi");

      const payload = {
        prompt: text
      };

      const { data } = await axios.post(
        LyricsAI.base,
        JSON.stringify(payload),
        {
          headers: LyricsAI.headers,
          responseType: "text"
        }
      );

      return data;
    }
  };

  app.get("/ai/lirikgenerator", async (req, res) => {
    try {
      const { text } = req.query;

      const result = await LyricsAI.chat({ text });

      res.json({
        status: true,
        source: "lyricsgenerator.com",
        result
      });

    } catch (err) {
      res.status(500).json({
        status: false,
        error: err.message
      });
    }
  });
};