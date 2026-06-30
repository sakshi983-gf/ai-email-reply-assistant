const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const MODEL = "llama-3.1-8b-instant";

const cleanJson = (text) => {
  return text.replace(/```json/g, "").replace(/```/g, "").trim();
};

const generateReplyOptions = async ({ receivedEmail, subject, purpose }) => {
  const response = await groq.chat.completions.create({
    model: MODEL,
    messages: [
      {
        role: "user",
        content: `
Generate 3 email reply options.

Return only valid JSON:
{
  "options": [
    { "tone": "Professional", "reply": "..." },
    { "tone": "Formal", "reply": "..." },
    { "tone": "Friendly", "reply": "..." }
  ]
}

Received Email:
${receivedEmail}

Subject:
${subject}

Purpose:
${purpose}
`,
      },
    ],
    temperature: 0.7,
    max_tokens: 1800,
  });

  const text = response.choices[0].message.content;
  return JSON.parse(cleanJson(text));
};

module.exports = {
  generateReplyOptions,
};