"use client";

import { type ReactNode } from "react";

export function Providers(props: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white">
      {props.children}
    </div>
  );
}
