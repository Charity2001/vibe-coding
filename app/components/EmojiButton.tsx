"use client";

import { Transaction, TransactionButton } from "@coinbase/onchainkit/transaction";
import { contractAddress, contractABI } from "../../lib/contract";
import { encodeFunctionData } from "viem";

interface EmojiButtonProps {
  emoji: string;
}

export default function EmojiButton({
  emoji,
}: EmojiButtonProps) {
  // Encode the function call data
  const data = encodeFunctionData({
    abi: contractABI,
    functionName: "sendVibe",
    args: [emoji],
  });

  const calls = [
    {
      to: contractAddress,
      value: BigInt(0),
      data: data,
    },
  ];

  return (
    <Transaction
      calls={calls}
      onSuccess={() => {
        alert(`Vibe "${emoji}" sent successfully!`);
      }}
      onError={(error) => {
        console.error("Failed to send vibe:", error);
        alert("Failed to send vibe. See console for details.");
      }}
    >
      <TransactionButton
        className="text-4xl p-4 rounded-full hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        text={emoji}
      />
    </Transaction>
  );
}