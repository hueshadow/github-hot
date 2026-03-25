/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface Window {
  PagefindUI?: new (opts: Record<string, unknown>) => unknown;
}
