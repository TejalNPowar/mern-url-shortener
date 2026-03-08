import { useState } from "react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const generateShortUrl = async () => {
    try {
      const res = await axios.post(
        "https://mern-url-shortener-6hbv.onrender.com/api/url/shorten",
        { originalUrl: url }
      );

      setShortUrl(res.data.shortUrl);
    } catch (err) {
      console.error("Error creating short URL", err);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>MERN URL Shortener</h1>

      <input
        type="text"
        placeholder="Paste your URL here"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: "350px", padding: "10px" }}
      />

      <br /><br />

      <button
        onClick={generateShortUrl}
        style={{ padding: "10px 20px", cursor: "pointer" }}
      >
        Shorten URL
      </button>

      <br /><br />

      {shortUrl && (
        <div>
          <h3>Your Short Link:</h3>
          <a href={shortUrl} target="_blank" rel="noreferrer">
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
}

export default App;