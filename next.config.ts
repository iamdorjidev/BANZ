import type { NextConfig } from "next";

const securityHeaders = [
  // HTTPS only. Browsers remember this for two years.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
];

const nextConfig: NextConfig = {
  turbopack: { root: __dirname },
  poweredByHeader: false,
  // Inline the (small, Tailwind) stylesheet so text paints without waiting
  // for a separate CSS request — matters most on slow mobile connections.
  experimental: { inlineCss: true },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },

  /*
   * Pages live under app/[lang]/ but the site is English only, so visitors
   * see clean URLs: /about is served from /en/about. Old /en/… and /dz/…
   * links redirect to the clean URL. (Standard rewrites — no middleware.)
   */
  async redirects() {
    return [
      { source: "/:lang(en|dz)", destination: "/", permanent: true },
      { source: "/:lang(en|dz)/:path*", destination: "/:path*", permanent: true },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [],
      // After real files and fixed routes, before the dynamic [lang] route.
      afterFiles: [
        { source: "/", destination: "/en" },
        // Any path that is not a file (no extension) gets the /en prefix.
        { source: "/:path((?!.*\\.[a-zA-Z0-9]+$).+)", destination: "/en/:path" },
      ],
      fallback: [],
    };
  },
};

export default nextConfig;
