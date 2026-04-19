"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const CONSENT_KEY = "cookie-consent";

/**
 * Loads Google Analytics 4 only after the user has granted cookie consent.
 * Reads the GA measurement ID from NEXT_PUBLIC_GA_MEASUREMENT_ID.
 * Listens for the `cookie-consent-changed` window event to react to consent updates.
 */
export function Analytics() {
  const [hasConsent, setHasConsent] = useState(false);
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  useEffect(() => {
    const checkConsent = () => {
      try {
        setHasConsent(
          window.localStorage.getItem(CONSENT_KEY) === "accepted"
        );
      } catch {
        setHasConsent(false);
      }
    };

    checkConsent();
    window.addEventListener("cookie-consent-changed", checkConsent);
    window.addEventListener("storage", checkConsent);

    return () => {
      window.removeEventListener("cookie-consent-changed", checkConsent);
      window.removeEventListener("storage", checkConsent);
    };
  }, []);

  if (!hasConsent || !measurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            anonymize_ip: true,
            cookie_flags: 'SameSite=None;Secure'
          });
        `}
      </Script>
    </>
  );
}
