"use client";

import { useState, useEffect } from "react";
import WalletConnect from "./components/WalletConnect";
import EmojiButton from "./components/EmojiButton";

type Vibe = {
  user: string;
  message: string;
  timestamp: number;
};

type User = {
  name: string;
  points: number;
  lastLogin: number;
};

export default function Page() {
  const [vibes, setVibes] = useState<Vibe[]>([]);
  const [, setIsReady] = useState(false);
  const [user, setUser] = useState<User>({
    name: "DemoUser",
    points: 100, // Starting points
    lastLogin: Date.now()
  });
  const [showPointsModal, setShowPointsModal] = useState(false);

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
    
    // Check for daily login bonus
    const lastLogin = localStorage.getItem('lastLogin');
    const today = new Date().toDateString();
    
    if (lastLogin !== today) {
      // Daily login bonus
      setUser(prev => ({
        ...prev,
        points: prev.points + 50,
        lastLogin: Date.now()
      }));
      localStorage.setItem('lastLogin', today);
      localStorage.setItem('userPoints', (user.points + 50).toString());
    } else {
      // Load saved points
      const savedPoints = localStorage.getItem('userPoints');
      if (savedPoints) {
        setUser(prev => ({ ...prev, points: parseInt(savedPoints) }));
      }
    }
    
    setIsReady(true);
  }, [user.points]);

  const handleVibeSent = (emoji: string) => {
    const vibeCost = 10; // Cost in points to send a vibe
    
    if (user.points >= vibeCost) {
      const newVibe: Vibe = {
        user: user.name,
        message: emoji,
        timestamp: Date.now(),
      };
      setVibes((prevVibes) => [newVibe, ...prevVibes]);
      
      // Deduct points
      const newPoints = user.points - vibeCost;
      setUser(prev => ({ ...prev, points: newPoints }));
      localStorage.setItem('userPoints', newPoints.toString());
      
      alert(`Vibe "${emoji}" sent! Cost: ${vibeCost} points. Remaining: ${newPoints} points`);
    } else {
      alert(`Not enough points! You need ${vibeCost} points to send a vibe. You have ${user.points} points.`);
    }
  };

  const earnPoints = (amount: number) => {
    const newPoints = user.points + amount;
    setUser(prev => ({ ...prev, points: newPoints }));
    localStorage.setItem('userPoints', newPoints.toString());
    alert(`Earned ${amount} points! Total: ${newPoints} points`);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-black text-white">
      <div className="w-full max-w-md mx-auto">
        <WalletConnect />

        {/* Points Display */}
        <div className="mt-4 flex justify-between items-center bg-gray-800 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">💎</span>
            <div>
              <p className="text-sm text-gray-400">Points</p>
              <p className="text-xl font-bold text-yellow-400">{user.points}</p>
            </div>
          </div>
          <button
            onClick={() => setShowPointsModal(true)}
            className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm font-medium"
          >
            Earn Points
          </button>
        </div>

        <div className="mt-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            blockvibez
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            Send your vibes. With Points. Everywhere.
          </p>
        </div>

        <div className="mt-8 text-center">
          <p className="text-green-400 font-bold">🎮 FREE TO PLAY - Use Points!</p>
          <p className="text-sm text-gray-400 mt-2">
            Each vibe costs 10 points. Earn points daily!
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

        {/* Points Earning Modal */}
        {showPointsModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-6 max-w-sm w-full mx-4">
              <h3 className="text-xl font-bold text-white mb-4">💎 Earn Points</h3>
              
              <div className="space-y-3">
                <button
                  onClick={() => {
                    earnPoints(25);
                    setShowPointsModal(false);
                  }}
                  className="w-full bg-green-600 hover:bg-green-700 p-3 rounded-lg text-white font-medium flex items-center justify-between"
                >
                  <span>🎯 Watch Ad (25 points)</span>
                  <span className="text-sm">+25</span>
                </button>
                
                <button
                  onClick={() => {
                    earnPoints(50);
                    setShowPointsModal(false);
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg text-white font-medium flex items-center justify-between"
                >
                  <span>📱 Share App (50 points)</span>
                  <span className="text-sm">+50</span>
                </button>
                
                <button
                  onClick={() => {
                    earnPoints(100);
                    setShowPointsModal(false);
                  }}
                  className="w-full bg-purple-600 hover:bg-purple-700 p-3 rounded-lg text-white font-medium flex items-center justify-between"
                >
                  <span>⭐ Rate App (100 points)</span>
                  <span className="text-sm">+100</span>
                </button>
                
                <button
                  onClick={() => {
                    earnPoints(20);
                    setShowPointsModal(false);
                  }}
                  className="w-full bg-yellow-600 hover:bg-yellow-700 p-3 rounded-lg text-white font-medium flex items-center justify-between"
                >
                  <span>🎮 Play Mini Game (20 points)</span>
                  <span className="text-sm">+20</span>
                </button>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
                <p className="text-sm text-gray-400 text-center">
                  💡 Daily login bonus: +50 points
                </p>
              </div>
              
              <button
                onClick={() => setShowPointsModal(false)}
                className="w-full mt-4 bg-gray-600 hover:bg-gray-700 p-2 rounded text-white"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}