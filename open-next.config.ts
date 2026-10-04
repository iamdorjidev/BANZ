// Cloudflare adapter configuration (OpenNext for Cloudflare).
// See https://opennext.js.org/cloudflare
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

const config = defineCloudflareConfig({
  // Every page is built ahead of time, so the cache can simply be read from
  // the deployed files — no R2 bucket or KV namespace to set up.
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});

// `npm run build` runs the adapter, and the adapter runs the plain Next.js build.
config.buildCommand = "npx next build";

export default config;
