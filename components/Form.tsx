"use client";

import { useActionState, useId } from "react";
import type { FormState } from "@/app/[lang]/actions";
import { tr, type Locale, type Localized } from "@/lib/i18n";
import { ui } from "@/content/ui";
import { site } from "@/content/site";
import { buttonMaroon } from "./ui";

type Field = {
  name: string;
  label: Localized;
  type?: "text" | "email" | "tel" | "textarea";
  required?: boolean;
  autoComplete?: string;
};

/**
 * Accessible form: visible labels, errors tied to fields, a live status
 * region, and a hidden honeypot field for spam.
 */
export function Form({
  action,
  fields,
  submit,
  success,
  lang,
}: {
  action: (prev: FormState, data: FormData) => Promise<FormState>;
  fields: Field[];
  submit: Localized;
  success: Localized;
  lang: Locale;
}) {
  const [state, formAction, pending] = useActionState(action, { status: "idle" });
  const id = useId();

  if (state.status === "sent") {
    return (
      <p role="status" className="font-display text-[1.75rem] leading-snug text-heading">
        {tr(success, lang)}
      </p>
    );
  }

  const input =
    "mt-2 block w-full rounded-xl border border-ink-soft bg-cream px-5 py-3.5 text-[1.125rem] text-ink transition-colors hover:border-ink focus:border-saffron aria-invalid:border-maroon";

  return (
    <form action={formAction} noValidate className="space-y-7">
      {fields.map((f) => {
        const fid = `${id}-${f.name}`;
        const invalid = !!state.errors?.[f.name];
        const common = {
          id: fid,
          name: f.name,
          required: f.required,
          autoComplete: f.autoComplete,
          defaultValue: state.values?.[f.name] ?? "",
          "aria-invalid": invalid || undefined,
          "aria-describedby": invalid ? `${fid}-err` : undefined,
          className: input,
        };
        return (
          <div key={f.name}>
            <label htmlFor={fid} className="block text-[1rem] font-medium">
              {tr(f.label, lang)}
            </label>
            {f.type === "textarea" ? (
              <textarea {...common} rows={6} />
            ) : (
              <input {...common} type={f.type ?? "text"} />
            )}
            {invalid && (
              <p id={`${fid}-err`} className="mt-2 text-[1rem] font-semibold text-heading">
                {tr(ui.forms.required, lang)}
              </p>
            )}
          </div>
        );
      })}

      {/* Honeypot: hidden from people and screen readers. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Company <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div role="status" aria-live="polite">
        {(state.status === "not-configured" || state.status === "error") && (
          <p className="font-semibold text-heading">
            {tr(state.status === "error" ? ui.forms.error : ui.forms.notConnected, lang)}{" "}
            <a href={`mailto:${site.email}`} className="underline">
              {site.email}
            </a>
            .
          </p>
        )}
      </div>

      <button type="submit" disabled={pending} className={`${buttonMaroon} disabled:opacity-60`}>
        {tr(pending ? ui.forms.sending : submit, lang)}
      </button>
    </form>
  );
}
