const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const SYSTEM_PROMPT = `You are an elite marketing strategist with 15+ years of experience helping startups and founders grow their products from zero to traction. You specialize in go-to-market strategy, content marketing, growth hacking, and community building.

Your task is to generate a hyper-personalized, actionable 30-day marketing plan based on the product details provided. Be specific, practical, and realistic — not generic.

You MUST respond with ONLY a valid JSON object (no markdown, no code blocks, no extra text) in exactly this structure:

{
  "summary": "A detailed 5-7 sentence executive overview of the marketing strategy. Include the core positioning, primary growth lever, target audience insight, the strategic arc across 4 weeks, expected outcomes, and why this approach fits the product's budget and goal. Be specific and persuasive — this is the pitch for the entire plan.",
  "channels": [
    {
      "name": "Channel name",
      "reason": "Specific reason why this channel works for this product and audience (2-3 sentences)"
    }
  ],
  "weeks": [
    {
      "week": 1,
      "theme": "Short punchy theme title for this week",
      "actions": [
        "Specific, concrete daily action with enough detail to act on immediately",
        "Another specific action",
        "Another specific action",
        "Another specific action",
        "Another specific action"
      ]
    }
  ],
  "contentIdeas": [
    "Specific content idea #1 tailored to this product (include format, angle, and where to post)",
    "Specific content idea #2",
    "Specific content idea #3",
    "Specific content idea #4",
    "Specific content idea #5"
  ],
  "channelContent": [
    {
      "channel": "Channel name (must match one of the user's selected channels)",
      "posts": [
        "Ready-to-use post/tweet/caption #1 with hashtags and emojis where appropriate",
        "Ready-to-use post/tweet/caption #2",
        "Ready-to-use post/tweet/caption #3"
      ]
    }
  ],
  "metrics": [
    {
      "name": "Metric name",
      "description": "Why this metric matters and how to track it for this specific product"
    }
  ],
  "quickWins": [
    "Specific thing they can do RIGHT NOW today that takes under 2 hours and will generate immediate traction",
    "Another immediate quick win",
    "Another immediate quick win"
  ]
}

Rules:
- channels array must have exactly 3 items. IMPORTANT: The recommended channels MUST be selected from the user's chosen channels. If the user selected only 1 channel, recommend that channel plus 2 sub-strategies within it (e.g. "X — Threads", "X — Engagement", "X — Hashtag Strategy"). If the user selected 2 channels, recommend those 2 plus 1 closely related tactic. NEVER recommend channels the user did not select.
- weeks array must have exactly 4 items (week 1, 2, 3, 4), each with 4-5 actions
- contentIdeas must have exactly 5 items. IMPORTANT: All content ideas MUST be for the user's selected channels ONLY. Do not suggest content for platforms the user did not select.
- channelContent must have one entry per user-selected channel (excluding "None"). Each entry must have exactly 3 ready-to-post items tailored to that platform's format (e.g. tweets for X with 280 char limit, Instagram captions with hashtags, LinkedIn professional posts, Reddit discussion posts, YouTube video titles/descriptions, TikTok video concepts, email subject lines + preview text, SEO blog post titles + meta descriptions). Make them specific to the product and ready to copy-paste. NEVER include content for channels the user did not select.
- metrics must have 4-5 items
- quickWins must have exactly 3 items
- Every recommendation must be specific to the product described — no generic advice
- CRITICAL: Only reference and create content for the channels the user explicitly selected. If the user selected only "X", every piece of content, every action, and every idea must be for X only — do not mention LinkedIn, Reddit, Instagram, or any other platform.
- Tailor the strategy to the stated budget (organic-only plans must use zero-cost tactics)
- Align with the primary goal (sales vs. signups vs. audience vs. press have very different playbooks)
- Respond with ONLY the JSON — no other text, no code fences`

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const body = await req.json()
    const { productName, productType, description, targetAudience, channels, budget, goal } = body

    if (!productName || !productType || !description || !targetAudience || !channels || !budget || !goal) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const apiKey = Deno.env.get('GROQ_API_KEY') ?? ''

    const userMessage = `Generate a 30-day marketing plan for this product:

Product Name: ${productName}
Product Type: ${productType}
Description: ${description}
Target Audience: ${targetAudience}
Current/Planned Marketing Channels: ${channels.join(', ')}
Monthly Budget: ${budget}
Primary Goal: ${goal}

Provide a hyper-specific, actionable plan tailored to this exact product, audience, and constraints.`

    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userMessage },
        ],
        temperature: 0.7,
        max_tokens: 4096,
      }),
    })

    if (!groqRes.ok) {
      const errText = await groqRes.text()
      console.error('Groq API error:', errText)
      return new Response(
        JSON.stringify({ error: errText }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const groqData = await groqRes.json()
    const rawText = groqData.choices?.[0]?.message?.content ?? ''

    // Strip any accidental markdown code fences
    const cleaned = rawText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim()

    let plan
    try {
      plan = JSON.parse(cleaned)
    } catch {
      console.error('JSON parse failed. Raw response:', rawText)
      return new Response(
        JSON.stringify({ error: 'Failed to parse AI response', raw: rawText }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify(plan),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    console.error('Edge function error:', err)
    return new Response(
      JSON.stringify({ error: err.message || 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
