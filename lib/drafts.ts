/**
 * Placeholder content (marked `draft: true` in /content) is shown on local
 * and preview builds so the committee can see the layout, and hidden on the
 * live site so an invented number or quote can never be published by accident.
 *
 * Set SHOW_DRAFTS=1 on a preview deployment to show drafts there too.
 */
export const showDrafts =
  process.env.NODE_ENV !== "production" ||
  process.env.SHOW_DRAFTS === "1" ||
  process.env.VERCEL_ENV === "preview";

export function visible<T extends { draft?: boolean }>(items: T[]): T[] {
  return showDrafts ? items : items.filter((i) => !i.draft);
}
