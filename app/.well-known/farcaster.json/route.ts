export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://vibe-coding-snowy-five.vercel.app';

  return Response.json({
    accountAssociation: {
      // Optional: If you have account association details
      header: process.env.FARCASTER_HEADER,
      payload: process.env.FARCASTER_PAYLOAD,
      signature: process.env.FARCASTER_SIGNATURE,
    },
    frame: {
      version: "1",
      // Required fields
      name: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME || "blockvibez",
      iconUrl: `${baseUrl}/icon.png`,
      homeUrl: baseUrl,
      webhookUrl: `${baseUrl}/api/webhook`,
      
      // Optional but recommended fields
      description: "A great description of your app.",
      imageUrl: `${baseUrl}/screenshot.png`,
      buttonTitle: "Connect",
      splashImageUrl: `${baseUrl}/splash.png`,
      splashBackgroundColor: "#000000",
      subtitle: "Your cool subtitle",
      primaryCategory: "developer-tools",
      tags: ["web3", "social"],
      heroImageUrl: `${baseUrl}/hero.png`,
      tagline: "The best app for vibes.",
      ogTitle: "blockvibez",
      ogDescription: "A great description for social sharing.",
      ogImageUrl: `${baseUrl}/screenshot.png`,
    },
  });
}