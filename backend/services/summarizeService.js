const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const MODEL = "llama-3.1-8b-instant";

const summarizeEmail = async (email) => {
  const response = await groq.chat.completions.create({
    model: MODEL,
    messages: [
      {
        role: "user",
        content: `
Summarize this email in maximum 6 bullet points.

Mention:
- Main purpose
- Important dates
- Deadlines
- Required actions
- Attachments if mentioned

Return only bullet points.

Email:
${email}
`,
      },
    ],
    temperature: 0.3,
    max_tokens: 500,
  });

  return response.choices[0].message.content;
};

module.exports = {
  summarizeEmail,
};