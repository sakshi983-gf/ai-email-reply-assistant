const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const MODEL = "llama-3.1-8b-instant";

const improveGrammar = async (reply) => {
  const response = await groq.chat.completions.create({
    model: MODEL,
    messages: [
      {
        role: "user",
        content: `
Improve grammar, clarity, and professionalism.
Do not change meaning.
Return only improved email.

${reply}
`,
      },
    ],
    temperature: 0.4,
    max_tokens: 800,
  });

  return response.choices[0].message.content;
};

module.exports = improveGrammar;