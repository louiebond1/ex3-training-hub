import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { processTitle, comment } = await req.json()

  const apiKey = process.env.RESEND_API_KEY
  const emailTo = process.env.FEEDBACK_EMAIL || 'lbondboy@hotmail.co.uk'

  console.log(`[Feedback] "${processTitle}": ${comment}`)

  if (apiKey) {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'EX3 Training Hub <onboarding@resend.dev>',
        to: [emailTo],
        subject: `Training Hub: Issue reported — ${processTitle}`,
        text: `A user flagged an issue with the video for "${processTitle}":\n\n"${comment}"\n\n— EX3 Training Hub`,
      }),
    })
  }

  return NextResponse.json({ ok: true })
}
