const axios = require('axios');

async function searchLyrics(title) {
  try {
    const { data } = await axios.get(
      `https://lrclib.net/api/search?q=${encodeURIComponent(title)}`,
      {
        headers: {
          referer: `https://lrclib.net/search/${encodeURIComponent(title)}`,
          "user-agent":
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36",
        },
        timeout: 15000,
      }
    );
    return data;
  } catch (error) {
    console.error("❌ Error:", error.message);
    return null;
  }
}

module.exports = function (app) {
  app.get("/search/lirik", async (req, res) => {
    try {
      const { q } = req.query;
      if (!q) return res.json({ status: false, error: "Query is required" });

      const results = await searchLyrics(q); 
      res.status(200).json({
        status: true,
        result: results,
      });
    } catch (error) {
      res.status(500).send(`Error: ${error.message}`);
    }
  });
};