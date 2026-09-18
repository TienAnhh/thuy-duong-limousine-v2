"use client";

import type { AnchorHTMLAttributes } from "react";
import { trackClick } from "@/lib/track-click";

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "target" | "rel">;

export function CallLink({ onClick, ...props }: LinkProps) {
  return (
    <a
      {...props}
      href="tel:0912415045"
      onClick={(e) => {
        trackClick("call");
        onClick?.(e);
      }}
    />
  );
}

export function ZaloLink({ onClick, ...props }: LinkProps) {
  return (
    <a
      {...props}
      href="https://zalo.me/0912415045"
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        trackClick("zalo");
        onClick?.(e);
      }}
    />
  );
}
