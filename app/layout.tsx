import "./theme.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "blockvibez",
  description: "Send your vibes. With Points. Everywhere.",
  openGraph: {
    title: "blockvibez",
    description: "Send your vibes. With Points. Everywhere.",
    images: ["https://vibe-coding-charity2001.vercel.app/screenshot.png"],
  },
  other: {
    "fc:frame": '{"version":"next","imageUrl":"https://vibe-coding-charity2001.vercel.app/hero.png","button":{"title":"Send Vibe","action":{"type":"launch_frame","name":"blockvibez","url":"https://vibe-coding-charity2001.vercel.app","splashImageUrl":"https://vibe-coding-charity2001.vercel.app/splash.png","splashBackgroundColor":"#000000"}}}',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}