require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/url", require("./routes/urlRoutes"));

app.get("/", (req, res) => {
  res.send("URL Shortener API running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


const Url = require("./models/Url");

app.get("/:shortId", async (req, res) => {
  try {
    const { shortId } = req.params;

    const url = await Url.findOne({ shortId });

    if (url) {

      // increase click count
      url.clicks=url.clicks+1;

      await url.save();

      // redirect user
      return res.redirect(url.originalUrl);
    }

    res.status(404).send("URL not found");

  } catch (error) {
    res.status(500).send("Server error");
  }
});