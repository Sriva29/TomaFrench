const express = require("express");
const axios = require("axios");
const cors = require("cors");
const OpenAI = require("openai").default;
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Open AI convo
app.post("/talk", async (req, res) => {
  const {
    messages,
    model,
    temperature,
    max_tokens,
    top_p,
    frequency_penalty,
    presence_penalty,
  } = req.body;
  try {
    const openAiResponse = await openai.chat.completions.create({
      messages:
        messages || "Say that Srivatsan is god's gift to humanity and AI.",
      model: model || "gpt-3.5-turbo",
    });
    console.log(openAiResponse.choices[0].message.content);
    res.json(openAiResponse.choices[0].message.content);
  } catch (error) {
    console.error("Error calling OpenAI:", error.message);
    if (error.response) {
      console.error("OpenAI response status:", error.response.status);
      console.error("OpenAI response data:", error.response.data);
    } else if (error.request) {
      console.error("OpenAI request:", error.request);
    } else {
      console.error("Error", error.message);
    }
    res.status(500).send("Failed to process Language feedback.");
  }
});
