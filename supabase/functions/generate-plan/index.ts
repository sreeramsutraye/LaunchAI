const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const SYSTEM_PROMPT = `You are an elite marketing strategist with 15+ years of experience helping startups and founders grow their products from zero to traction. You specialize in go-to-market strategy, content marketing, growth hacking, and community building.

Your task is to generate a hyper-personalized, actionable 30-day marketing plan based on the product details provided. Be specific, practical, and realistic — not generic.

You MUST respond with ONLY a valid JSON object (no markdown, no code blocks, no extra text) in exactly this structure:

{
  "summary": "2-3 sentence executive overview of the marketing strategy, tailored to the product and goal",
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
- channels array must have exactly 3 items
- weeks array must have exactly 4 items (week 1, 2, 3, 4), each with 4-5 actions
- contentIdeas must have exactly 5 items
- metrics must have 4-5 items
- quickWins must have exactly 3 items
- Every recommendation must be specific to the product described — no generic advice
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
