"use client";

import { useState } from "react";

interface EmojiButtonProps {
  emoji: string;
  onVibeSent?: (emoji: string) => void;
  cost?: number;
}

export default function EmojiButton({
  emoji,
  onVibeSent,
  cost = 10,
}: EmojiButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    
    // Simulate a blockchain transaction delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Call the callback to add the vibe to the local state
    if (onVibeSent) {
      onVibeSent(emoji);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleClick}
        disabled={isLoading}
        className="text-4xl p-4 rounded-full hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-gray-800 border border-gray-600 relative"
      >
        {isLoading ? "⏳" : emoji}
      </button>
      <span className="text-xs text-gray-400 mt-1">{cost} pts</span>
    </div>
  );
}