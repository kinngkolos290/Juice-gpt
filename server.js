// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Ta clé dans .env
});
const openai = new OpenAIApi(configuration);

app.post("/ask", async (req, res) => {
  const question = req.body.question;

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: question }],
    });

    const answer = response.data.choices[0].message.content;
    res.json({ answer });
  } catch (err) {
    res.status(500).json({ error: "Erreur API", details: err.message });
  }
});

app.listen(3000, () => {
  console.log("JuiceGPT API running on http://localhost:3000");
});
