"use client";

import { ConnectWallet } from "@coinbase/onchainkit/wallet";

export default function WalletConnect() {
  return (
    <div className="flex justify-end">
      <ConnectWallet />
    </div>
  );
}
