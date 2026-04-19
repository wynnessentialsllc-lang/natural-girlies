"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const CONSENT_KEY = "cookie-consent";

/**
 * Cookie consent banner. Hidden until the user explicitly accepts or declines.
 * Stores the choice in localStorage and dispatches `cookie-consent-changed`
 * so other components (like <Analytics />) can react.
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = window.localStorage.getItem(CONSENT_KEY);
      if (!stored) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const handleChoice = (choice: "accepted" | "declined") => {
    try {
      window.localStorage.setItem(CONSENT_KEY, choice);
      window.dispatchEvent(new Event("cookie-consent-changed"));
    } catch {
      // Storage unavailable — still hide banner for this session
    }
    setVisible(false);
  };

  useEffect(() => {
    if (!visible) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleChoice("declined");
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [visible]);

  if (!mounted || !visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
      className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 sm:px-6 sm:pb-6 print:hidden"
    >
      <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-cream/95 p-5 shadow-2xl backdrop-blur-sm sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <h2
              id="cookie-consent-title"
              className="font-serif text-lg text-espresso"
            >
              A small note about cookies
            </h2>
            <p
              id="cookie-consent-description"
              className="mt-1 text-sm text-warmBrown"
            >
              We use cookies to understand how readers engage with our work and
              to make the magazine better. Your data is yours — read our{" "}
              <Link
                href="/privacy"
                className="underline decoration-coral underline-offset-2 hover:text-espresso"
              >
                privacy policy
              </Link>
              .
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => handleChoice("declined")}
              className="rounded-full border border-border px-5 py-2 text-sm font-medium text-warmBrown transition-colors hover:bg-cream hover:text-espresso focus:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2"
            >
              Decline
            </button>
            <button
              type="button"
              onClick={() => handleChoice("accepted")}
              className="rounded-full bg-coral px-5 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-coral/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
