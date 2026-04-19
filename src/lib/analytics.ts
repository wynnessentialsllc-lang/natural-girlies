/**
 * Analytics event tracking utilities for Natural Girlies Magazine.
 *
 * All functions are no-ops unless:
 *   - the user has accepted cookies (localStorage `cookie-consent` === "accepted")
 *   - window.gtag is available (loaded by <Analytics />)
 *
 * This keeps tracking strictly opt-in and consent-gated.
 */

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "set" | "consent",
      action: string,
      params?: Record<string, unknown>
    ) => void;
    dataLayer?: unknown[];
  }
}

const CONSENT_KEY = "cookie-consent";

export function hasAnalyticsConsent(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(CONSENT_KEY) === "accepted";
  } catch {
    return false;
  }
}

function canTrack(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.gtag === "function" &&
    hasAnalyticsConsent()
  );
}

export function trackPageView(url: string, title?: string): void {
  if (!canTrack()) return;
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!measurementId) return;
  window.gtag!("config", measurementId, {
    page_path: url,
    page_title: title,
  });
}

export function trackEvent(
  category: string,
  action: string,
  label?: string,
  value?: number
): void {
  if (!canTrack()) return;
  window.gtag!("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
}

export function trackSearch(query: string, resultsCount: number): void {
  trackEvent("search", "site_search", query, resultsCount);
}

export function trackArticleRead(slug: string, percentage: number): void {
  trackEvent("engagement", "article_read", slug, percentage);
}

export function trackNewsletterSignup(source: string): void {
  trackEvent("conversion", "newsletter_signup", source);
}

export function trackCommentSubmit(articleSlug: string): void {
  trackEvent("engagement", "comment_submit", articleSlug);
}

export function trackBookmark(
  articleSlug: string,
  action: "add" | "remove"
): void {
  trackEvent("engagement", `bookmark_${action}`, articleSlug);
}

export function trackShare(articleSlug: string, channel: string): void {
  trackEvent("engagement", "share", `${articleSlug}:${channel}`);
}
