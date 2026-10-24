"use client";

import { useActionState } from "react";
import { login } from "../actions";

const input = "mt-2 block w-full rounded-xl border border-ink-soft bg-cream px-4 py-3 text-[1.125rem] focus:border-saffron";

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, {});
  return (
    <div className="mx-auto max-w-md py-10">
      <h1 className="h2">Committee sign-in</h1>
      <p className="mt-3 text-ink-soft">See everyone who has registered as a member. Use your own name — it is shown at the top of the page.</p>
      <form action={action} className="mt-10 space-y-6">
        <div>
          <label htmlFor="name" className="block font-semibold">Your name</label>
          <input id="name" name="name" autoComplete="name" required defaultValue={state.name ?? ""} key={state.name ?? ""} className={input} />
        </div>
        <div>
          <label htmlFor="password" className="block font-semibold">Password</label>
          <input id="password" name="password" type="password" autoComplete="current-password" required className={input} />
        </div>
        {state.error && <p role="alert" className="font-semibold text-heading">{state.error}</p>}
        <button disabled={pending} className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-maroon px-6 text-[1.125rem] font-semibold text-on-dark hover:bg-maroon-deep disabled:opacity-60">
          {pending ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
