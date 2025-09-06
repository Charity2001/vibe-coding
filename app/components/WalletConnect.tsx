"use client";

import { useState, useEffect } from "react";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum?: any;
  }
}

interface WalletConnectProps {
  setWalletAddress: (address: string | null) => void;
}

export default function WalletConnect({
  setWalletAddress,
}: WalletConnectProps) {
  const [address, setAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = accounts[0];
        setAddress(account);
        setWalletAddress(account);
      } catch (error) {
        console.error("Error connecting to MetaMask", error);
      }
    } else {
      alert("Please install MetaMask to use this feature.");
    }
  };

  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          if (accounts.length > 0) {
            const account = accounts[0];
            setAddress(account);
            setWalletAddress(account);
          }
        } catch (error) {
          console.error("Error checking wallet connection", error);
        }
      }
    };
    checkConnection();
  }, [setWalletAddress]);

  return (
    <div className="flex justify-end">
      {address ? (
        <p className="text-sm text-gray-400">
          Connected: {address.substring(0, 6)}...{address.substring(38)}
        </p>
      ) : (
        <button
          onClick={connectWallet}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}