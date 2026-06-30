const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const MODEL = "llama-3.1-8b-instant";

const extractJson = (text) => {
  const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  return cleaned.substring(start, end + 1);
};

const analyzeReplyQuality = async (reply) => {
  const response = await groq.chat.completions.create({
    model: MODEL,
    messages: [
      {
        role: "user",
        content: `
Analyze email quality.

Return only valid JSON:
{
  "grammar": 95,
  "professionalism": 94,
  "clarity": 96,
  "confidence": 90,
  "overall": 94,
  "suggestions": [
    "Suggestion 1",
    "Suggestion 2",
    "Suggestion 3"
  ]
}

Scores must be 0 to 100.

Email Reply:
${reply}
`,
      },
    ],
    temperature: 0.2,
    max_tokens: 600,
  });

  const text = response.choices[0].message.content;
  return JSON.parse(extractJson(text));
};

module.exports = {
  analyzeReplyQuality,
};