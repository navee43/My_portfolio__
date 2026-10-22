"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * Shows the path that wasn't found, in the style of a request log line.
 * The 404 page is prerendered once, so the path is read in the browser only.
 */
export function RequestPath() {
  const pathname = useSyncExternalStore(
    subscribe,
    () => window.location.pathname,
    () => null,
  );
  return (
    <p className="min-h-5 font-mono text-[0.8125rem] text-faint">
      {pathname && (
        <>
          <span className="text-muted">GET</span> {pathname} <span className="text-fail">404</span>
        </>
      )}
    </p>
  );
}
