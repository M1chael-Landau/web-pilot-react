// Umami analytics, guarded so the app stays fully inert until it is configured.
//
// Paste a real Umami website-id into UMAMI_WEBSITE_ID below to switch analytics on.
// While the id is empty: no <script> is injected, no network requests are made,
// and nothing is written to the console.

export const UMAMI_WEBSITE_ID = "bfc67b6e-19d2-4ede-9f9e-3da89734b764";

const UMAMI_SCRIPT_URL = "https://cloud.umami.is/script.js";

type UmamiData = Record<string, unknown>;

interface UmamiTracker {
  track: (name: string, data?: UmamiData) => void;
}

declare global {
  interface Window {
    umami?: UmamiTracker;
  }
}

let scriptInjected = false;

/** Injects the Umami script once, but only when a website-id is configured. */
export function initAnalytics(): void {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  if (UMAMI_WEBSITE_ID.trim().length === 0) return;
  if (scriptInjected) return;

  const script = document.createElement("script");
  script.defer = true;
  script.src = UMAMI_SCRIPT_URL;
  script.setAttribute("data-website-id", UMAMI_WEBSITE_ID);
  document.head.appendChild(script);

  scriptInjected = true;
}

/** Sends a custom event when Umami is present; a safe no-op otherwise. */
export function track(name: string, data?: UmamiData): void {
  if (typeof window === "undefined") return;
  const umami = window.umami;
  if (umami && typeof umami.track === "function") {
    umami.track(name, data);
  }
}
