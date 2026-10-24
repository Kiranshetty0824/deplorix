// Project Advisor — turns a plain-language project description into a tailored
// division recommendation and short project brief using Lovable AI Gateway.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const CATALOGUE = `
tech | Deplorix Tech | Websites, Apps & Software — Built and Shipped
  - Websites & Landing Pages
  - Web Applications & Internal Tools
  - Mobile App Development
  - Custom Software & Integrations
  - Maintenance & Feature Development

digital | Deplorix Digital | Marketing & Personal Branding That Gets Noticed
  - Social Media Management
  - Personal Branding for Founders
  - Performance Marketing
  - Brand Identity Design
  - Content Creation

projects | Deplorix Projects | Practical Project Delivery for Students (final-year and academic projects)
  - Final-Year Project Development
  - Documentation & Reports
  - One-on-One Mentorship
  - Viva & Review Preparation

bps | Deplorix Business Process Solutions | Dedicated Support Teams, Managed End-to-End
  - Customer Support
  - Technical Support
  - Sales Support
  - Back-Office & Data Processes
  - Dedicated Managed Seats

training | Deplorix Training | Building the Workforce Our Other Divisions Run On
  - Job-Readiness & Communication
  - Process & Tools Upskilling
  - Certification Pathways
  - Corporate Training
`;

const SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: [
    "divisionId",
    "divisionReason",
    "recommendedServices",
    "goals",
    "scope",
    "phases",
    "timeline",
    "nextStep",
    "briefText",
  ],
  properties: {
    divisionId: { type: "string", enum: ["tech", "digital", "projects", "bps", "training"] },
    divisionReason: { type: "string" },
    recommendedServices: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["title", "why"],
        properties: { title: { type: "string" }, why: { type: "string" } },
      },
    },
    goals: { type: "array", items: { type: "string" } },
    scope: { type: "array", items: { type: "string" } },
    phases: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["name", "detail", "duration"],
        properties: {
          name: { type: "string" },
          detail: { type: "string" },
          duration: { type: "string" },
        },
      },
    },
    timeline: { type: "string" },
    nextStep: { type: "string" },
    briefText: { type: "string" },
  },
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) {
      return Response.json(
        { error: "The advisor is not configured yet. Please try again later." },
        { status: 500, headers: corsHeaders },
      );
    }

    const { description = "", audience = "", budget = "", timeline = "" } = await req.json();
    if (typeof description !== "string" || description.trim().length < 20) {
      return Response.json(
        { error: "Please describe your project in at least 20 characters." },
        { status: 400, headers: corsHeaders },
      );
    }

    const runId = req.headers.get("X-Lovable-AIG-Run-ID")?.trim();

    const instructions = `You are the project advisor for DeploriX Technologies, a software and digital services company in Bangalore, India.
Recommend ONLY from this catalogue of divisions and sub-services; never invent a service:
${CATALOGUE}
Pick exactly one best-fit division id and 2-4 sub-services copied verbatim from that division's list.
Write in plain, warm, confident British-Indian business English. Be concrete and short: goals and scope as 3-5 crisp bullet lines each, 3-4 phases with realistic durations, one overall timeline estimate (e.g. "6-8 weeks").
briefText is a clean plain-text project brief the client can send to us by email, no markdown symbols.
Never quote prices.`;

    const userInput = [
      `Project description: ${description.trim()}`,
      audience ? `Who they are: ${audience}` : "",
      budget ? `Budget range: ${budget}` : "",
      timeline ? `Desired timeline: ${timeline}` : "",
      "Respond with the structured json brief.",
    ]
      .filter(Boolean)
      .join("\n");

    const res = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": apiKey,
        "X-Lovable-AIG-SDK": "fetch",
        ...(runId ? { "X-Lovable-AIG-Run-ID": runId } : {}),
      },
      body: JSON.stringify({
        model: "openai/gpt-6-astra",
        instructions,
        input: userInput,
        stream: true,
        store: false,
        reasoning: { effort: "low", summary: "auto" },
        text: {
          format: {
            type: "json_schema",
            name: "project_brief",
            strict: true,
            schema: SCHEMA,
          },
        },
      }),
    });

    if (!res.ok || !res.body) {
      const detail = await res.text().catch(() => "");
      console.error("gateway error", res.status, detail);
      const message =
        res.status === 429
          ? "Our advisor is busy right now. Please try again in a moment."
          : res.status === 402 || res.status === 403
            ? "The advisor is temporarily unavailable. Please use the enquiry form below and we'll reply personally."
            : "We couldn't generate your brief just now. Please try again.";
      return Response.json({ error: message }, { status: res.status, headers: corsHeaders });
    }

    // Read the SSE stream and accumulate the output text.
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let text = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";
      for (const line of lines) {
        if (!line.startsWith("data:")) continue;
        const payload = line.slice(5).trim();
        if (!payload || payload === "[DONE]") continue;
        try {
          const evt = JSON.parse(payload);
          if (evt.type === "response.output_text.delta" && typeof evt.delta === "string") {
            text += evt.delta;
          } else if (evt.type === "response.completed" && !text) {
            text = evt.response?.output_text ?? "";
          }
        } catch {
          // ignore keep-alive / partial frames
        }
      }
    }

    if (!text.trim()) {
      return Response.json(
        { error: "The advisor returned an empty answer. Please try rephrasing your description." },
        { status: 502, headers: corsHeaders },
      );
    }

    let brief;
    try {
      brief = JSON.parse(text);
    } catch {
      return Response.json(
        { error: "We couldn't read the generated brief. Please try again." },
        { status: 502, headers: corsHeaders },
      );
    }

    return Response.json({ brief }, { headers: corsHeaders });
  } catch (err) {
    console.error("project-advisor failed", err);
    return Response.json(
      { error: "Something went wrong generating your brief. Please try again." },
      { status: 500, headers: corsHeaders },
    );
  }
});
