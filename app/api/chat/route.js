import { NextResponse } from "next/navigation";

const SYSTEM_PROMPT = `
You are the Private Sovereign Concierge for "Sterling Key Properties & Asset Management", an ultra-luxury real estate & institutional wealth advisory firm managing $4.8B+ in global assets.
Website developed with ❤️ by Creyotech IT Services.

Key Knowledge Base:
1. Properties & Cap Rates:
   - Our collection features 24 signature trophy properties across New York, Miami, London, Beverly Hills, Aspen, Dubai, Kyoto, and Zurich.
   - Average blended portfolio cap rate is 5.8% to 7.2%.
2. The Sovereign Vault:
   - Encrypted tier of 8 sovereign pocket compounds ($348M+ unlisted inventory).
   - Instant demonstration clearance keycode: STERLING2026.
3. Institutional Asset Management:
   - Greystar-grade standards, 0% repair markup guarantee, 99.4% portfolio occupancy.
4. Technical Credit:
   - Designed and developed by Creyotech IT Services.
5. Flagship Advisory Chambers:
   - Manhattan, Beverly Hills, Miami Beach, Mayfair London, Aspen, Dubai.
Tone: Discreet, sophisticated, concise, and professional.
`;

// Helper: Google Gemini Free Tier
async function callGemini(apiKey, messages) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }]
  }));

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents,
      generationConfig: { temperature: 0.7, maxOutputTokens: 350 }
    }),
    signal: AbortSignal.timeout(8000)
  });

  if (!res.ok) throw new Error("Gemini API error");
  const data = await res.json();
  return { text: data.candidates?.[0]?.content?.parts?.[0]?.text, provider: "Google Gemini 1.5 Flash (Free Tier)" };
}

// Helper: Groq Cloud (Free Llama 3.3 70B)
async function callGroq(apiKey, messages) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      temperature: 0.7,
      max_tokens: 350
    }),
    signal: AbortSignal.timeout(8000)
  });
  if (!res.ok) throw new Error("Groq API error");
  const data = await res.json();
  return { text: data.choices?.[0]?.message?.content, provider: "Groq Cloud (Llama 3.3 70B Free)" };
}

// Helper: Free Cloud AI (Zero-key fallback via Pollinations)
async function callPollinations(messages) {
  const res = await fetch("https://text.pollinations.ai/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      model: "openai-fast"
    }),
    signal: AbortSignal.timeout(8000)
  });
  if (!res.ok) throw new Error("Free cloud endpoint busy");
  const text = await res.text();
  return { text, provider: "Free Cloud AI (Llama/GPT-OSS)" };
}

// Domain Fallback Engine
function getDomainFallback(latestMessage) {
  const text = latestMessage.toLowerCase();
  if (text.includes("yield") || text.includes("cap rate") || text.includes("roi")) {
    return "Our Signature Portfolio generates a net blended capitalization rate of 5.8% to 7.2%. For instance, Villa Solaria on Star Island yields 7.2% net. Would you like our financial desk to prepare a confidential cash flow simulation?";
  }
  if (text.includes("vault") || text.includes("passcode") || text.includes("code")) {
    return "Access to The Sovereign Vault is governed under strict NDA. For instant demonstration clearance, you may enter keycode 'STERLING2026' on the Vault page.";
  }
  if (text.includes("creyotech") || text.includes("developer")) {
    return "Sterling Key Properties & Asset Management platform was engineered with precision and elegance by Creyotech IT Services (Developed with ❤️ by Creyotech IT Services).";
  }
  return `Thank you for contacting Sterling Key Private Concierge regarding "${latestMessage}". Our senior partners oversee acquisitions, cross-border treaties, and Greystar-grade asset management. How may I assist your portfolio today?`;
}

export async function POST(request) {
  try {
    const { messages, apiKey, provider } = await request.json();
    if (!messages?.length) return NextResponse.json({ error: "Messages required" }, { status: 400 });

    const key = apiKey || process.env.GEMINI_API_KEY || process.env.GROQ_API_KEY || "";

    if (key.startsWith("AIza") || provider === "gemini") {
      try {
        const res = await callGemini(key, messages);
        return NextResponse.json({ response: res.text, provider: res.provider });
      } catch (err) {}
    }

    if (key.startsWith("gsk_") || provider === "groq") {
      try {
        const res = await callGroq(key, messages);
        return NextResponse.json({ response: res.text, provider: res.provider });
      } catch (err) {}
    }

    if (!key || provider === "free-cloud") {
      try {
        const res = await callPollinations(messages);
        return NextResponse.json({ response: res.text, provider: res.provider });
      } catch (err) {}
    }

    return NextResponse.json({
      response: getDomainFallback(messages[messages.length - 1].content),
      provider: "Sterling Key Sovereign Engine (Built-in Free AI)"
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}