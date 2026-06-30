const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const MODEL = "llama-3.1-8b-instant";

const generateSubject = async (email) => {
  const response = await groq.chat.completions.create({
    model: MODEL,
    messages: [
      {
        role: "user",
        content: `
Generate one short professional email subject.

Rules:
- Maximum 8 words
- No quotes
- Return only subject

Email:
${email}
`,
      },
    ],
    temperature: 0.4,
    max_tokens: 40,
  });

  return response.choices[0].message.content.trim();
};

module.exports = {
  generateSubject,
};