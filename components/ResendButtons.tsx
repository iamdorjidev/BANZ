"use client";

import { useActionState } from "react";
import { resendAll, resendOne, type ResendState } from "@/app/admin/actions";

/** "Resend" for one member. Shows the reason if it fails again. */
export function ResendOne({ id, name, label }: { id: number; name: string; label: string }) {
  const [state, action, pending] = useActionState<ResendState, FormData>(resendOne, {});
  return (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
      <button
        disabled={pending}
        aria-label={`${label} to ${name}`}
        className="text-[0.9375rem] font-semibold text-heading underline decoration-saffron decoration-2 underline-offset-4 disabled:opacity-50"
      >
        {pending ? "Sending…" : label}
      </button>
      <p role="status" aria-live="polite" className={`mt-1 max-w-64 text-[0.8125rem] ${state.error ? "text-heading" : "text-ink-soft"}`}>
        {state.error ?? state.message}
      </p>
    </form>
  );
}

/** "Send to everyone who has not been emailed yet." */
export function ResendAll({ pending: count }: { pending: number }) {
  const [state, action, busy] = useActionState<ResendState>(resendAll, {});
  return (
    <form action={action} className="flex flex-wrap items-center gap-4">
      <button
        disabled={busy || count === 0}
        className="rounded-full border-[1.5px] border-maroon px-5 py-3 font-semibold text-heading hover:bg-maroon hover:text-on-dark disabled:opacity-50"
      >
        {busy ? "Sending…" : `Email the ${count} member${count === 1 ? "" : "s"} not yet confirmed`}
      </button>
      <p role="status" aria-live="polite" className="max-w-xl font-semibold text-heading">
        {state.error ?? state.message}
      </p>
    </form>
  );
}
