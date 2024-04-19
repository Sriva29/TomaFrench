const axios = require("axios");
const OpenAI = require("openai").default;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = async (req, res) => {
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
    // Ensure you're using the correct method to call the OpenAI API
    const openAiResponse = await openai.chat.completions.create({
      messages:
        messages || "Say that Srivatsan is god's gift to humanity and AI.",
      model: model || "gpt-3.5-turbo",
    });
    console.log(openAiResponse.choices[0].message.content);
    res.json(openAiResponse.data);
  } catch (error) {
    console.error("Error calling OpenAI:", error.message);
    res.status(500).send("Failed to process language feedback.");
  }
};
