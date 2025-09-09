"use client";

import { type ReactNode } from "react";
import { base } from "wagmi/chains";
import { http, createConfig } from "wagmi";
import { coinbaseWallet } from "wagmi/connectors";
import { WagmiProvider } from "wagmi";
import { OnchainKitProvider } from "@coinbase/onchainkit";

const config = createConfig({
  chains: [base],
  connectors: [
    coinbaseWallet({
      appName: "blockvibez",
      preference: "all",
      version: "4",
    }),
  ],
  transports: {
    [base.id]: http(),
  },
});

export function Providers(props: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <OnchainKitProvider
        apiKey="demo_key"
        chain={base}
        config={{
          appearance: {
            mode: "auto",
            theme: "mini-app-theme",
            name: "blockvibez",
            logo: "/icon.png",
          },
        }}
      >
        {props.children}
      </OnchainKitProvider>
    </WagmiProvider>
  );
}
