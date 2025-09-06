"use client";

import { getContract } from "../../lib/contract";

interface EmojiButtonProps {
  emoji: string;
  walletAddress: string | null;
}

export default function EmojiButton({
  emoji,
  walletAddress,
}: EmojiButtonProps) {
  const sendVibe = async () => {
    if (!walletAddress) {
      alert("Please connect your wallet first.");
      return;
    }

    try {
      const contract = await getContract();
      if (!contract) {
        alert("Failed to get contract. Is MetaMask installed and connected?");
        return;
      }
      const tx = await contract.sendVibe(emoji);
      await tx.wait();
      alert(`Vibe "${emoji}" sent!`);
    } catch (error) {
      console.error("Failed to send vibe:", error);
      alert("Failed to send vibe. See console for details.");
    }
  };

  return (
    <button
      onClick={sendVibe}
      disabled={!walletAddress}
      className="text-4xl p-4 rounded-full hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {emoji}
    </button>
  );
}