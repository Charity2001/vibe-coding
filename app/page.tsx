"use client";

import { useState, useEffect } from "react";
import { createPublicClient, http } from "viem";
import { base } from "wagmi/chains";
import WalletConnect from "./components/WalletConnect";
import EmojiButton from "./components/EmojiButton";
import { contractAddress, contractABI } from "../lib/contract";
import { sdk } from "@farcaster/miniapp-sdk";

type Vibe = {
  user: string;
  message: string;
  timestamp: number;
};

export default function Page() {
  const [vibes, setVibes] = useState<Vibe[]>([]);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    sdk.actions.ready();
    setIsReady(true);
  }, []);

  // Watch for new vibe events using viem directly
  useEffect(() => {
    const publicClient = createPublicClient({
      chain: base,
      transport: http(),
    });

    const unwatch = publicClient.watchContractEvent({
      address: contractAddress,
      abi: contractABI,
      eventName: "NewVibe",
      onLogs(logs) {
        logs.forEach((log) => {
          const { sender, emoji, timestamp } = log.args;
          if (sender && emoji && timestamp) {
            setVibes((prevVibes) => [
              ...prevVibes,
              {
                user: sender,
                message: emoji,
                timestamp: Number(timestamp),
              },
            ]);
          }
        });
      },
    });

    return () => {
      unwatch();
    };
  }, []);

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
          <p>Farcaster SDK Ready: {isReady ? "Yes" : "No"}</p>
          {!isReady && (
            <button
              onClick={() => {
                sdk.actions.ready();
                setIsReady(true);
              }}
              className="mt-4 px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
            >
              Manually Set Ready
            </button>
          )}
        </div>

        <div className="flex justify-center mt-8 space-x-4">
          <EmojiButton emoji="🔥" />
          <EmojiButton emoji="🚀" />
          <EmojiButton emoji="🎉" />
          <EmojiButton emoji="💯" />
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