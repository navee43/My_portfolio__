import { cacheLife } from "next/cache";

/**
 * The current year for the copyright line. Reading the clock is only allowed
 * inside a cached scope with Cache Components, so the value is cached and
 * refreshed daily rather than computed on every request.
 */
export async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
