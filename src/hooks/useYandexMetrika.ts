// src/hooks/useYandexMetrika.ts
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export function useYandexMetrika() {
  const location = useLocation();
  const prevHrefRef = useRef<string | null>(null);

  useEffect(() => {
    const ym = (window as any).ym as ((...a: any[]) => void) | undefined;
    if (!ym) return;

    const href = window.location.href;
    const referer = prevHrefRef.current || document.referrer || undefined;

    ym(104110268, "hit", href, { referer });
    prevHrefRef.current = href;
  }, [location]); // fires on every route change (and first load)
}
