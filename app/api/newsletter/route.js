import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { email } = body;

    // Validate email
    if (!email || typeof email !== "string" || !email.includes("@") || !email.includes(".")) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Please provide a valid private email address." 
        },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const timestamp = new Date().toISOString();
    const dossierId = `SK-DOSSIER-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    // Log prominent dispatch entry in server console
    console.log("\n========================================================");
    console.log("📬 [STERLING KEY] NEW PRIVATE INTELLIGENCE DISPATCH");
    console.log(`📧 Recipient: ${cleanEmail}`);
    console.log(`📄 Dossier ID: ${dossierId}`);
    console.log("💼 Access Tier: Sovereign Family Office & Private Capital");
    console.log(`🕒 Timestamp: ${timestamp}`);
    console.log("========================================================\n");

    let deliveryStatus = "GENERATED_FOR_VIEW";
    let emailSent = false;
    let providerUsed = "None (Simulated / Local Dispatch)";

    // 1. Check for Resend API Key (Optional Free Email Delivery)
    if (process.env.RESEND_API_KEY) {
      try {
        const resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            from: process.env.EMAIL_FROM || "Sterling Key Intelligence <onboarding@resend.dev>",
            to: [cleanEmail],
            subject: "Confidential: Q1 2026 Sovereign Portfolio Intelligence Dossier",
            html: `
              <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #FAF8F5; padding: 40px 30px; border: 1px solid #E4DCD0; color: #0A192F;">
                <div style="border-bottom: 2px solid #C5A880; padding-bottom: 20px; margin-bottom: 30px;">
                  <span style="font-family: monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #C5A880; font-weight: bold;">Sterling Key Properties & Asset Management</span>
                  <h1 style="font-size: 26px; margin: 10px 0 5px 0; color: #0A192F;">Confidential Sovereign Intelligence Dossier</h1>
                  <p style="font-size: 13px; color: #545B65; margin: 0;">Reference ID: ${dossierId} · Q1 2026 Off-Market Placement</p>
                </div>
                
                <p style="font-size: 15px; line-height: 1.6; color: #1A1D20;">
                  Thank you for subscribing with <strong>${cleanEmail}</strong>. Your institutional access credentials have been registered in our private advisory registry.
                </p>

                <div style="background: #0A192F; color: #FAF8F5; border-radius: 12px; padding: 24px; margin: 25px 0; border: 1px solid #C5A880;">
                  <h3 style="color: #C5A880; margin-top: 0; font-size: 18px; text-transform: uppercase; letter-spacing: 1px;">Q1 2026 Featured Pocket Offerings:</h3>
                  <ul style="padding-left: 20px; font-size: 14px; line-height: 1.8;">
                    <li><strong>The Bel-Air Promontory Estate</strong> – Bel-Air, Los Angeles ($115,000,000)</li>
                    <li><strong>The Palm Crown Royal Villa</strong> – Palm Jumeirah, Dubai ($75,000,000)</li>
                    <li><strong>The Sky Penthouse at 111 W 57th</strong> – Billionaires' Row, New York ($49,000,000)</li>
                    <li><strong>The Carlton House Terrace Residence</strong> – St. James's, London (£48,000,000)</li>
                  </ul>
                </div>

                <p style="font-size: 13px; color: #747D88; line-height: 1.6;">
                  For off-market acquisitions, private sovereign mandates, or confidential advisory consultations, reply directly to this communication or contact our Mayfair or Fifth Avenue advisory chambers.
                </p>

                <div style="border-top: 1px solid #E4DCD0; margin-top: 35px; padding-top: 20px; font-size: 11px; color: #747D88; text-align: center;">
                  © ${new Date().getFullYear()} Sterling Key Properties & Asset Management LLC.<br/>
                  New York · Beverly Hills · Miami Beach · London · Aspen · Dubai
                </div>
              </div>
            `
          })
        });

        if (resendRes.ok) {
          deliveryStatus = "SENT_TO_INBOX";
          emailSent = true;
          providerUsed = "Resend API";
          console.log(`[RESEND SUCCESS] Real email delivered to ${cleanEmail}`);
        } else {
          const errData = await resendRes.json();
          console.warn("[RESEND WARNING]", errData);
        }
      } catch (emailErr) {
        console.warn("[EMAIL SEND ERROR]", emailErr.message);
      }
    }

    // Return rich confidential dossier payload
    return NextResponse.json({
      success: true,
      email: cleanEmail,
      dossierId,
      timestamp,
      deliveryStatus,
      emailSent,
      providerUsed,
      message: emailSent 
        ? `Confidential Q1 2026 intelligence dossier delivered to ${cleanEmail}.` 
        : `Private intelligence dossier generated and registered for ${cleanEmail}.`,
      dossier: {
        id: dossierId,
        title: "Q1 2026 Sovereign Portfolio & Off-Market Pocket Intelligence",
        classification: "CONFIDENTIAL / SOVEREIGN FAMILY OFFICE TIER",
        issuedDate: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
        recipient: cleanEmail,
        executiveSummary: "Curated overview of off-market private treaty transactions, institutional yield metrics, and ultra-prime residential opportunities across London, New York, Dubai, Los Angeles, and the Swiss Alps.",
        featuredOfferings: [
          {
            title: "The Bel-Air Promontory Estate",
            location: "Bel-Air, Los Angeles, California",
            valuation: "$115,000,000",
            capRate: "6.8% Projected",
            specs: "8 Beds · 14 Baths · 24,000 SF",
            status: "Off-Market Pocket Treaty"
          },
          {
            title: "The Palm Crown Royal Villa",
            location: "Palm Jumeirah, Dubai, UAE",
            valuation: "$75,000,000 (AED 275M)",
            capRate: "7.8% High-Yield",
            specs: "7 Beds · 10 Baths · 18,500 SF",
            status: "Sovereign Waterfront Compound"
          },
          {
            title: "The Sky Penthouse at 111 West 57th",
            location: "Billionaires' Row, Manhattan, New York",
            valuation: "$49,000,000",
            capRate: "4.9% Capital Preservation",
            specs: "5 Beds · 6.5 Baths · 7,130 SF",
            status: "Trophy Architectural Tower"
          },
          {
            title: "The Carlton House Terrace Residence",
            location: "St. James's, London, United Kingdom",
            valuation: "£48,000,000",
            capRate: "4.6% Prime Central London",
            specs: "6 Beds · 8 Baths · 11,400 SF",
            status: "Crown Estate Heritage Asset"
          }
        ]
      }
    });

  } catch (error) {
    console.error("[NEWSLETTER API ERROR]", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred while processing your subscription." },
      { status: 500 }
    );
  }
}
