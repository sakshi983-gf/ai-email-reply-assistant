const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const MODEL = "llama-3.1-8b-instant";

const trimLongText = (text, maxLength = 6000) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;

  return `
START OF EMAIL:
${text.slice(0, 3000)}

END OF EMAIL:
${text.slice(-3000)}
`;
};

const askGroq = async (prompt) => {
  const response = await groq.chat.completions.create({
    model: MODEL,
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 900,
  });

  return response.choices[0].message.content;
};

const generateAIReply = async ({ receivedEmail, purpose, tone, subject }) => {
  const safeEmail = trimLongText(receivedEmail);

  const prompt = `
You are an AI Email Reply Assistant.

Write a professional email reply.

Received Email:
${safeEmail}

Subject:
${subject}

Reply Purpose:
${purpose}

Tone:
${tone}

Rules:
- Add greeting and closing.
- Do not add fake information.
- Keep it clear and ready to send.
`;

  return await askGroq(prompt);
};

const rewriteReply = async ({ reply, tone }) => {
  const prompt = `
Rewrite this email reply in a ${tone} tone.
Keep the meaning same.
Return only the rewritten email.

${reply}
`;

  return await askGroq(prompt);
};

module.exports = {
  generateAIReply,
  rewriteReply,
};