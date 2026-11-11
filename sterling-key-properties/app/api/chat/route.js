import { NextResponse } from "next/navigation";

const SYSTEM_PROMPT = `
You are the Private Sovereign Concierge for "Sterling Key Properties & Asset Management", an ultra-luxury real estate & institutional wealth advisory firm managing $4.8B+ in global assets.
Website developed with ❤️ by Creyotech IT Services.

Key Knowledge Base:
1. Properties & Cap Rates:
   - Our collection features 24 signature trophy properties across New York (Bel-Air, Tribeca Penthouse, Central Park Tower), Miami (Star Island Villa at $45M yielding 7.2% cap rate), London (Mayfair Townhouse at £28M, Belgravia), Beverly Hills, Aspen, Dubai (Palm Jumeirah Crown), Kyoto, and Zurich.
   - Average blended portfolio cap rate is 5.8% to 7.2%.

2. The Sovereign Vault:
   - An encrypted tier of 8 sovereign pocket compounds ($348M+ unlisted inventory) including private archipelagos, Monaco penthouses, and Swiss alpine compounds.
   - For demo/confidential access, clients may decrypt the vault using keycode: STERLING2026.

3. Institutional Asset Management:
   - Operating under Greystar-grade standards with a strict 0% repair markup guarantee and 99.4% portfolio occupancy.
   - Tiers: Essential Oversight (4.5% gross), Sovereign Stewardship (7.0% gross with 24/7 dedicated dispatch and biometric tenant screening).

4. Developer & Technical Credit:
   - Website designed and developed by Creyotech IT Services.

5. Flagship Advisory Chambers:
   - Manhattan: 767 Fifth Avenue, PH 50 (+1 212-791-8840)
   - Beverly Hills: 9601 Wilshire Blvd (+1 310-849-2910)
   - Miami Beach: 1100 Brickell Ave, Suite 3200 (+1 305-912-4411)
   - London: 25 Berkeley Square, Mayfair (+44 20 7946 0912)
   - Aspen: 400 East Cooper Ave (+1 970-925-1020)

Tone & Style:
- Professional, discreet, refined, concise, and highly articulate.
- Keep answers succinct (under 3-4 sentences unless detailed analysis is requested).
- Direct clients to schedule private showings or consult the valuation suite when relevant.
`;

// Helper: Call Google Gemini Free Tier
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
      system_instruction: {
        parts: [{ text: SYSTEM_PROMPT }]
      },
      contents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 350
      }
    }),
    signal: AbortSignal.timeout(8000)
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini API error: ${res.status} ${err}`);
  }

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Empty response from Gemini");
  return { text, provider: "Google Gemini 1.5 Flash (Free Tier)" };
}

// Helper: Call Groq Free Tier (Llama 3.3 70B / 3.1 8B)
async function callGroq(apiKey, messages) {
  const url = "https://api.groq.com/openai/v1/chat/completions";
  
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 350
    }),
    signal: AbortSignal.timeout(8000)
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Groq API error: ${res.status} ${err}`);
  }

  const data = await res.json();
  const text = data.choices?.[0]?.message?.content;
  if (!text) throw new Error("Empty response from Groq");
  return { text, provider: "Groq Cloud (Llama 3.3 70B Free)" };
}

// Helper: Call OpenRouter Free Tier
async function callOpenRouter(apiKey, messages) {
  const url = "https://openrouter.ai/api/v1/chat/completions";
  
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "HTTP-Referer": "http://localhost:3000",
      "X-Title": "Sterling Key Properties",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "meta-llama/llama-3.2-3b-instruct:free",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 350
    }),
    signal: AbortSignal.timeout(8000)
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenRouter API error: ${res.status} ${err}`);
  }

  const data = await res.json();
  const text = data.choices?.[0]?.message?.content;
  if (!text) throw new Error("Empty response from OpenRouter");
  return { text, provider: "OpenRouter (Llama 3.2 3B Free)" };
}

// Helper: Call Local Ollama (Free offline local LLM)
async function callOllama(messages) {
  const url = "http://localhost:11434/api/chat";
  
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "llama3",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages
      ],
      stream: false
    }),
    signal: AbortSignal.timeout(6000)
  });

  if (!res.ok) throw new Error("Local Ollama not available");
  const data = await res.json();
  return { text: data.message?.content, provider: "Local Ollama LLM (Offline)" };
}

// Helper: Call Pollinations Free Cloud AI (Zero API key needed)
async function callPollinations(messages) {
  const url = "https://text.pollinations.ai/";
  
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages
      ],
      model: "openai-fast"
    }),
    signal: AbortSignal.timeout(8000)
  });

  if (!res.ok) throw new Error("Pollinations free cloud endpoint busy");
  const text = await res.text();
  if (!text || text.startsWith("{\"status\":") || text.includes("error")) {
    throw new Error("Invalid response from free cloud LLM");
  }
  return { text, provider: "Free Cloud AI (Llama/GPT-OSS)" };
}

// Domain Real Estate Engine (Instant offline fallback)
function getDomainFallback(latestMessage) {
  const textLower = latestMessage.toLowerCase();

  if (textLower.includes("yield") || textLower.includes("cap rate") || textLower.includes("roi") || textLower.includes("returns")) {
    return "Our Signature Portfolio generates a net blended capitalization rate of 5.8% to 7.2%. For instance, Villa Solaria on Star Island yields 7.2% net, while Central London townhouses in Belgravia average 4.5% with sovereign capital appreciation. Would you like our financial desk to prepare a confidential cash flow simulation?";
  }
  if (textLower.includes("vault") || textLower.includes("code") || textLower.includes("passcode") || textLower.includes("secret") || textLower.includes("off-market")) {
    return "Access to The Sovereign Vault is governed under strict non-disclosure protocol. For instant demonstration clearance, you may enter keycode 'STERLING2026' on the Vault page. This unlocks unlisted private islands, sovereign mega-compounds, and off-market pocket listings representing $348M+ in unadvertised inventory.";
  }
  if (textLower.includes("management") || textLower.includes("greystar") || textLower.includes("fee") || textLower.includes("tenant")) {
    return "Sterling Key Institutional Management operates under a strict 0% repair markup policy and maintains a 99.4% portfolio occupancy benchmark. Our management tiers range from Essential Oversight (4.5% gross) to Full Sovereign Stewardship (7.0% gross) with 24/7 dedicated dispatch and biometric tenant screening.";
  }
  if (textLower.includes("creyotech") || textLower.includes("who built") || textLower.includes("developer")) {
    return "Sterling Key Properties & Asset Management platform was engineered with precision and elegance by Creyotech IT Services (Developed with ❤️ by Creyotech IT Services).";
  }
  if (textLower.includes("schedule") || textLower.includes("tour") || textLower.includes("showing") || textLower.includes("visit")) {
    return "Private viewings are arranged with discreet security protocols. You can click 'Schedule Showing' on any property dossier to reserve an armored private transport or helicopter transfer to the estate grounds.";
  }
  if (textLower.includes("bel-air") || textLower.includes("manhattan") || textLower.includes("london") || textLower.includes("miami") || textLower.includes("aspen") || textLower.includes("dubai")) {
    return "We maintain flagship advisory chambers across Manhattan (767 5th Ave), Beverly Hills (9601 Wilshire), Miami Beach (1100 Brickell), Mayfair London (25 Berkeley Sq), Aspen, and Dubai. All transactions are settled through FDIC-insured escrow partners under strict FINCEN anti-money laundering compliance.";
  }
  if (textLower.includes("price") || textLower.includes("cost") || textLower.includes("how much") || textLower.includes("buy")) {
    return "Our curated collection spans from $14.5M urban penthouses to $115M sovereign estates. You can explore full pricing, floor plans, and projected NOI on the Collection and Destinations pages, or test scenarios using our Financial Valuation suite.";
  }
  return `Thank you for contacting Sterling Key Private Concierge regarding "${latestMessage}". Our senior partners oversee sovereign acquisitions, cross-border capital treaty structuring, and Greystar-grade institutional property management. How may I assist your portfolio today?`;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { messages, apiKey, provider: requestedProvider } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Messages array required" }, { status: 400 });
    }

    const latestMessage = messages[messages.length - 1].content;
    const key = apiKey || process.env.FREE_LLM_API_KEY || process.env.GEMINI_API_KEY || process.env.GROQ_API_KEY || process.env.OPENROUTER_API_KEY || "";

    // 1. Google Gemini (Free API Key from Google AI Studio)
    if (key.startsWith("AIza") || requestedProvider === "gemini" || process.env.GEMINI_API_KEY) {
      const activeKey = key || process.env.GEMINI_API_KEY;
      try {
        const result = await callGemini(activeKey, messages);
        return NextResponse.json({ response: result.text, provider: result.provider });
      } catch (err) {
        console.warn("Gemini error:", err.message);
      }
    }

    // 2. Groq Cloud (Free API Key from console.groq.com)
    if (key.startsWith("gsk_") || requestedProvider === "groq" || process.env.GROQ_API_KEY) {
      const activeKey = key || process.env.GROQ_API_KEY;
      try {
        const result = await callGroq(activeKey, messages);
        return NextResponse.json({ response: result.text, provider: result.provider });
      } catch (err) {
        console.warn("Groq error:", err.message);
      }
    }

    // 3. OpenRouter Free Tier (Free key with :free models)
    if (key.startsWith("sk-or-") || requestedProvider === "openrouter" || process.env.OPENROUTER_API_KEY) {
      const activeKey = key || process.env.OPENROUTER_API_KEY;
      try {
        const result = await callOpenRouter(activeKey, messages);
        return NextResponse.json({ response: result.text, provider: result.provider });
      } catch (err) {
        console.warn("OpenRouter error:", err.message);
      }
    }

    // 4. Local Ollama (if requested or running locally)
    if (requestedProvider === "ollama") {
      try {
        const result = await callOllama(messages);
        return NextResponse.json({ response: result.text, provider: result.provider });
      } catch (err) {
        console.warn("Ollama error:", err.message);
      }
    }

    // 5. Zero-Key Free Cloud AI (Pollinations Free Tier)
    if (!key || requestedProvider === "free-cloud") {
      try {
        const result = await callPollinations(messages);
        return NextResponse.json({ response: result.text, provider: result.provider });
      } catch (err) {
        console.warn("Free Cloud LLM busy/offline, falling back to Domain Engine:", err.message);
      }
    }

    // 6. High-Performance Real Estate Domain Engine (Instant Fallback)
    const reply = getDomainFallback(latestMessage);
    return NextResponse.json({
      response: reply,
      provider: "Sterling Key Sovereign Engine (Built-in Free AI)"
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
