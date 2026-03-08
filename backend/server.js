require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const Url = require("./models/Url");

const app = express();

// connect database
connectDB();

app.use(cors());
app.use(express.json());

// API routes
app.use("/api/url", require("./routes/urlRoutes"));

app.get("/", (req, res) => {
  res.send("URL Shortener API running");
});

// redirect route
app.get("/:shortId", async (req, res) => {
  try {
    const { shortId } = req.params;

    const url = await Url.findOne({ shortId });

    if (url) {
      url.clicks = url.clicks + 1;
      await url.save();

      return res.redirect(url.originalUrl);
    }

    res.status(404).send("URL not found");

  } catch (error) {
    res.status(500).send("Server error");
  }
});

// start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});