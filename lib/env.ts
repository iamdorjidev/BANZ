import "server-only";
import { getCloudflareContext } from "@opennextjs/cloudflare";

/** A minimal view of Cloudflare's D1 database — all this site needs. */
export interface D1Statement {
  bind(...values: unknown[]): D1Statement;
  run(): Promise<{ meta: { changes?: number; last_row_id?: number } }>;
  all<T = Record<string, unknown>>(): Promise<{ results: T[] }>;
  first<T = Record<string, unknown>>(): Promise<T | null>;
}
export interface D1Database {
  prepare(sql: string): D1Statement;
}

type Bindings = Record<string, unknown> & { DB?: D1Database };

function bindings(): Bindings {
  try {
    return getCloudflareContext().env as Bindings;
  } catch {
    return {};
  }
}

/** Secret or variable: from the Cloudflare Worker settings, else the environment. */
export function envVar(name: string): string | undefined {
  const v = bindings()[name];
  return typeof v === "string" && v ? v : process.env[name] || undefined;
}

/** The members database (Cloudflare D1), or null when it is not connected. */
export function database(): D1Database | null {
  return bindings().DB ?? null;
}
