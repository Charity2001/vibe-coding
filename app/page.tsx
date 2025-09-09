"use client";

import { useState, useEffect } from "react";
import WalletConnect from "./components/WalletConnect";
import EmojiButton from "./components/EmojiButton";

type Vibe = {
  user: string;
  message: string;
  timestamp: number;
};

export default function Page() {
  const [vibes, setVibes] = useState<Vibe[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [demoUser, setDemoUser] = useState("DemoUser");

  useEffect(() => {
    // Initialize with some demo vibes
    const demoVibes: Vibe[] = [
      {
        user: "0x1234...5678",
        message: "🔥",
        timestamp: Date.now() - 300000,
      },
      {
        user: "0x9876...5432",
        message: "😍",
        timestamp: Date.now() - 250000,
      },
      {
        user: "0xABCD...EFGH",
        message: "🎉",
        timestamp: Date.now() - 200000,
      },
      {
        user: "0xWXYZ...1234",
        message: "🤯",
        timestamp: Date.now() - 150000,
      },
      {
        user: "0x5678...9ABC",
        message: "😎",
        timestamp: Date.now() - 100000,
      },
    ];
    setVibes(demoVibes);
    setIsReady(true);
  }, []);

  const handleVibeSent = (emoji: string) => {
    const newVibe: Vibe = {
      user: demoUser,
      message: emoji,
      timestamp: Date.now(),
    };
    setVibes((prevVibes) => [newVibe, ...prevVibes]);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-black text-white">
      <div className="w-full max-w-md mx-auto">
        <WalletConnect />

        <div className="mt-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            blockvibez
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            Send your vibes. Onchain. Everywhere.
          </p>
        </div>

        <div className="mt-8 text-center">
          <p className="text-green-400 font-bold">🎮 DEMO MODE - No Money Required!</p>
          <p className="text-sm text-gray-400 mt-2">
            Click any emoji to send a vibe instantly!
          </p>
        </div>

        <div className="flex justify-center mt-8 space-x-2 flex-wrap gap-2">
          <EmojiButton emoji="🔥" onVibeSent={handleVibeSent} />
          <EmojiButton emoji="🚀" onVibeSent={handleVibeSent} />
          <EmojiButton emoji="🎉" onVibeSent={handleVibeSent} />
          <EmojiButton emoji="💯" onVibeSent={handleVibeSent} />
          <EmojiButton emoji="😀" onVibeSent={handleVibeSent} />
          <EmojiButton emoji="😍" onVibeSent={handleVibeSent} />
          <EmojiButton emoji="🤔" onVibeSent={handleVibeSent} />
          <EmojiButton emoji="😎" onVibeSent={handleVibeSent} />
          <EmojiButton emoji="🥳" onVibeSent={handleVibeSent} />
          <EmojiButton emoji="🤯" onVibeSent={handleVibeSent} />
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center text-white">
            Live Vibe Board
          </h2>
          <div className="mt-4 space-y-4">
            {vibes
              .sort((a, b) => b.timestamp - a.timestamp)
              .map((vibe, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-700 rounded-lg bg-gray-900"
                >
                  <p className="text-xl">{vibe.message}</p>
                  <p className="text-sm text-gray-500">
                    From: {vibe.user.substring(0, 6)}...
                    {vibe.user.substring(38)}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}