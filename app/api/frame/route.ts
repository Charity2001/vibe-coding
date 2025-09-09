import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    await request.json(); // Parse body but don't use it for now
    
    // Simple frame response for Farcaster
    const frameResponse = {
      type: "frame",
      version: "vNext",
      image: "https://vibe-coding-charity2001.vercel.app/hero.png",
      buttons: [
        {
          label: "Send Vibe 🔥",
          action: "link",
          target: "https://vibe-coding-charity2001.vercel.app"
        },
        {
          label: "Earn Points 💎",
          action: "link", 
          target: "https://vibe-coding-charity2001.vercel.app"
        }
      ],
      postUrl: "https://vibe-coding-charity2001.vercel.app/api/frame"
    };

    return NextResponse.json(frameResponse);
  } catch (error) {
    console.error('Frame API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  // Return a simple HTML frame for GET requests
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="https://vibe-coding-charity2001.vercel.app/hero.png" />
        <meta property="fc:frame:button:1" content="Send Vibe 🔥" />
        <meta property="fc:frame:button:1:action" content="link" />
        <meta property="fc:frame:button:1:target" content="https://vibe-coding-charity2001.vercel.app" />
        <meta property="fc:frame:button:2" content="Earn Points 💎" />
        <meta property="fc:frame:button:2:action" content="link" />
        <meta property="fc:frame:button:2:target" content="https://vibe-coding-charity2001.vercel.app" />
        <title>blockvibez</title>
      </head>
      <body>
        <h1>blockvibez - Send your vibes with points!</h1>
        <p>Visit <a href="https://vibe-coding-charity2001.vercel.app">https://vibe-coding-charity2001.vercel.app</a> to start sending vibes!</p>
      </body>
    </html>
  `;

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}
