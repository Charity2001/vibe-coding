"use client";

import { useState, useEffect } from "react";
import WalletConnect from "./components/WalletConnect";
import EmojiButton from "./components/EmojiButton";
import { getContract } from "../lib/contract";

type Vibe = {
  user: string;
  message: string;
  timestamp: number;
};

export default function Page() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [vibes, setVibes] = useState<Vibe[]>([]);

  useEffect(() => {
    const init = async () => {
      const contract = await getContract();
      if (contract) {
        const vibeFilter = contract.filters.NewVibe();

        const handleNewVibe = (
          user: string,
          message: string,
          timestamp: bigint,
        ) => {
          setVibes((prevVibes) => [
            ...prevVibes,
            {
              user,
              message,
              timestamp: Number(timestamp),
            },
          ]);
        };

        contract.on(vibeFilter, handleNewVibe);

        return () => {
          contract.off(vibeFilter, handleNewVibe);
        };
      }
    };

    init();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-black text-white">
      <div className="w-full max-w-md mx-auto">
        <WalletConnect setWalletAddress={setWalletAddress} />

        <div className="mt-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            blockvibez
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            Send your vibes. Onchain. Everywhere.
          </p>
        </div>

        <div className="flex justify-center mt-8 space-x-4">
          <EmojiButton emoji="🔥" walletAddress={walletAddress} />
          <EmojiButton emoji="🚀" walletAddress={walletAddress} />
          <EmojiButton emoji="🎉" walletAddress={walletAddress} />
          <EmojiButton emoji="💯" walletAddress={walletAddress} />
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