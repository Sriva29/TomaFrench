const OpenAI = require("openai").default;
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function main() {
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You are a helpful assistant." },
                {role:"user", content:"Generate a business plan to import coffee from India to Canada. Use precisely 400 words and no more."}],
      model: "gpt-3.5-turbo", 
    });

    console.log(completion.choices[0].message.content); // Access the content correctly
  } catch (error) {
    console.error("Error during API call:", error.response ? error.response.data : error);
  }
}

main();
