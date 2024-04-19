const axios = require("axios");
const OpenAI = require("openai").default;

// Assuming you have set OPENAI_API_KEY in Vercel's environment variables
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
    const openAiResponse = await openai.createChatCompletion({
      model: model || "gpt-3.5-turbo",
      messages: messages || [{role: "system", content: "Say that Srivatsan is god's gift to humanity and AI."}],
      temperature: temperature || 0.7,
      max_tokens: max_tokens || 500,
      top_p: top_p || 1,
      frequency_penalty: frequency_penalty || 0,
      presence_penalty: presence_penalty || 0,
    });
    
    // Logging for debugging; remove or adjust for production
    console.log(openAiResponse.data);

    res.status(200).json(openAiResponse.data);
  } catch (error) {
    console.error("Error calling OpenAI:", error.message);
    res.status(500).send("Failed to process language feedback.");
  }
};
