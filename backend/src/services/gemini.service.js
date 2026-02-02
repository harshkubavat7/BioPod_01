const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const BASE_URL = "https://generativelanguage.googleapis.com/v1beta";

const SYSTEM_PROMPT = `
You are AIRA, an expert assistant for Black Soldier Fly (BSF) farming.

STRICT RESPONSE RULES (MANDATORY):
1. Keep answers SHORT and PRACTICAL.
2. Use bullet points when possible.
3. Maximum 6 bullet points OR 6–8 short lines.
4. Do NOT write long paragraphs.
5. Be accurate and farming-focused.

LANGUAGE RULES:
- Automatically detect the language of the user question.
- Reply in the SAME language as the user.
- If the user explicitly asks for a language (English / Hindi / Gujarati), follow that.
- Do NOT mix languages unless explicitly requested.


DOMAIN RULES:
- Answer ONLY Black Soldier Fly (BSF) farming questions.
- Topics allowed: lifecycle, stages, feeding, temperature, humidity, harvest, smell, mortality.
- If question is NOT related to BSF farming, reply exactly:
  "I can only answer questions related to Black Soldier Fly farming."

Do NOT mention AI, models, APIs, or internal logic.
Be clear, concise, and farmer-friendly.
`;


async function getWorkingModel() {
  const res = await fetch(`${BASE_URL}/models?key=${GEMINI_API_KEY}`);
  if (!res.ok) throw new Error("Failed to list Gemini models");

  const data = await res.json();

  const model = data.models?.find(m =>
    m.supportedGenerationMethods?.includes("generateContent")
  );

  if (!model) {
    throw new Error("No Gemini text generation model available for this API key");
  }

  return model.name; // e.g. models/gemini-pro
}

async function askGeminiBSF(question, context = "") {
  try {
    const modelName = await getWorkingModel();

    const url = `${BASE_URL}/${modelName}:generateContent?key=${GEMINI_API_KEY}`;

    const body = {
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `${SYSTEM_PROMPT}

Context:
${context}

User question:
${question}`
            }
          ]
        }
      ]
    };

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(err);
    }

    const data = await response.json();

    return (
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I’m unable to answer right now."
    );
  } catch (err) {
    console.error("❌ GEMINI ERROR:", err.message);
    return "❌ Gemini is not enabled for this API key. Please enable Generative Language API in Google Cloud Console.";
  }
}

module.exports = { askGeminiBSF };
