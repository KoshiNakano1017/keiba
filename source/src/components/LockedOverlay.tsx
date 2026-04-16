"use client";

import type { ReactNode } from "react";

interface Props {
  locked: boolean;
  message?: string;
  onCtaClick?: () => void;
  ctaLabel?: string;
  children: ReactNode;
}

export function LockedOverlay({
  locked,
  message = "この情報を見るにはログインが必要です",
  onCtaClick,
  ctaLabel = "ログインして見る",
  children,
}: Props) {
  if (!locked) return <>{children}</>;

  return (
    <div className="relative">
      <div className="pointer-events-none select-none blur-sm" aria-hidden>
        {children}
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-lg bg-white/70 backdrop-blur-[2px]">
        <svg
          className="h-6 w-6 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
        <p className="text-sm text-gray-600">{message}</p>
        {onCtaClick && (
          <button
            onClick={onCtaClick}
            data-testid="locked-cta"
            className="rounded-lg bg-brand-primary px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-700 transition"
          >
            {ctaLabel}
          </button>
        )}
      </div>
    </div>
  );
}
