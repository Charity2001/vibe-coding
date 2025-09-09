"use client";

import { useState } from "react";

interface EmojiButtonProps {
  emoji: string;
  onVibeSent?: (emoji: string) => void;
}

export default function EmojiButton({
  emoji,
  onVibeSent,
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
    alert(`Vibe "${emoji}" sent successfully! (Demo Mode)`);
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="text-4xl p-4 rounded-full hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-gray-800 border border-gray-600"
    >
      {isLoading ? "⏳" : emoji}
    </button>
  );
}