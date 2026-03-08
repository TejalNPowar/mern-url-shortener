const express = require("express");
const router = express.Router();
const Url = require("../models/Url");
const { nanoid } = require("nanoid");

router.post("/shorten", async (req, res) => {
  try {
    const { originalUrl } = req.body;

    const shortId = nanoid(6);

    const newUrl = new Url({
      originalUrl,
      shortId
    });

    await newUrl.save();

    res.json({
      shortUrl: `http://localhost:5000/${shortId}`
    });

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;