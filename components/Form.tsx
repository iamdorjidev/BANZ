"use client";

import { useActionState, useEffect, useId, useState } from "react";
import type { FormState } from "@/app/[lang]/actions";
import { tr, type Locale, type Localized } from "@/lib/i18n";
import { ui } from "@/content/ui";
import { site } from "@/content/site";
import { buttonMaroon } from "./ui";

type Field = {
  name: string;
  label: Localized;
  type?: "text" | "email" | "tel" | "textarea" | "date" | "select" | "radio";
  options?: readonly string[];
  /** Shown but not editable or submitted (e.g. the Member ID). */
  fixed?: string;
  note?: Localized;
  max?: string;
  /** Only shown once this other (select) field has a value. */
  showWhen?: string;
  suggest?: string[];
  required?: boolean;
  autoComplete?: string;
};

/** Text input that suggests matches as people type; anything typed is still accepted. */
function SuggestInput({
  suggestions,
  defaultValue,
  ...props
}: { suggestions: string[]; defaultValue: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  const [value, setValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const q = value.trim().toLowerCase();
  const [remote, setRemote] = useState<string[]>([]);

  // Live NZ place search (Photon / OpenStreetMap); the built-in list is the fallback.
  useEffect(() => {
    if (q.length < 3) return;
    const ctrl = new AbortController();
    const t = setTimeout(async () => {
      try {
        const r = await fetch(
          `https://photon.komoot.io/api/?q=${encodeURIComponent(value.trim())}&limit=8&lang=en&bbox=166,-47.5,178.7,-34`,
          { signal: ctrl.signal },
        );
        const data = await r.json();
        const names = (data.features ?? [])
          .filter((f: { properties: { countrycode?: string } }) => f.properties.countrycode === "NZ")
          .map((f: { properties: { name?: string; housenumber?: string; street?: string; district?: string; locality?: string; city?: string; postcode?: string } }) => {
            const p = f.properties;
            const street = p.street ? `${p.housenumber ? `${p.housenumber} ` : ""}${p.street}` : p.name;
            return [street, p.district ?? p.locality, p.city, p.postcode]
              .filter((v, i, arr) => v && arr.indexOf(v) === i)
              .join(", ");
          })
          .filter(Boolean);
        setRemote([...new Set<string>(names)]);
      } catch {
        /* offline or blocked: keep local suggestions */
      }
    }, 250);
    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, [q, value]);

  const local = q
    ? suggestions
        .filter((p) => p.toLowerCase().includes(q))
        .sort((a, b) => Number(b.toLowerCase().startsWith(q)) - Number(a.toLowerCase().startsWith(q)))
    : [];
  const matches = [...new Set([...(q.length >= 3 ? remote : []), ...local])]
    .filter((p) => p.toLowerCase() !== q)
    .slice(0, 7);
  const show = open && matches.length > 0;
  const listId = `${props.id}-list`;
  const pick = (v: string) => {
    setValue(v);
    setOpen(false);
    setActive(-1);
  };

  return (
    <div className="relative">
      <input
        {...props}
        value={value}
        role="combobox"
        aria-expanded={show}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={show && active >= 0 ? `${listId}-${active}` : undefined}
        autoComplete="off"
        onChange={(e) => {
          setValue(e.target.value);
          setOpen(true);
          setActive(-1);
        }}
        onBlur={() => setOpen(false)}
        onKeyDown={(e) => {
          if (!show) return;
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setActive((active + 1) % matches.length);
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActive((active - 1 + matches.length) % matches.length);
          } else if (e.key === "Enter" && active >= 0) {
            e.preventDefault();
            pick(matches[active]);
          } else if (e.key === "Escape") setOpen(false);
        }}
      />
      {show && (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-20 mt-1 w-full overflow-hidden rounded-xl border border-ink-soft bg-cream shadow-xl"
        >
          {matches.map((m, i) => (
            <li
              key={m}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={i === active}
              onMouseDown={(e) => {
                e.preventDefault();
                pick(m);
              }}
              className={`cursor-pointer px-5 py-3 text-[1.0625rem] ${i === active ? "bg-sand text-heading" : "hover:bg-sand"}`}
            >
              {m}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

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
  const [chosen, setChosen] = useState<Record<string, string>>({});

  if (state.status === "sent" || state.status === "registered" || state.status === "registered-no-email") {
    return (
      <div role="status">
        <p className="font-display text-[1.75rem] leading-snug text-heading">{tr(success, lang)}</p>
        {state.memberNo && (
          <p className="mt-4 text-[1.125rem]">
            {tr(ui.forms.memberNo, lang)}: <strong className="text-heading">{state.memberNo}</strong>
          </p>
        )}
        {state.status === "registered-no-email" && (
          <p className="mt-3 text-ink-soft">{tr(ui.forms.noConfirmation, lang)}</p>
        )}
      </div>
    );
  }

  const input =
    "mt-2 block w-full rounded-xl border border-ink-soft bg-cream px-5 py-3.5 text-[1.125rem] text-ink transition-colors hover:border-ink focus:border-saffron aria-invalid:border-maroon";

  return (
    <form action={formAction} noValidate className="space-y-7">
      {fields.map((f) => {
        if (f.showWhen && !(chosen[f.showWhen] ?? state.values?.[f.showWhen])) return null;
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
            <label id={`${fid}-label`} htmlFor={fid} className="block text-[1rem] font-medium">
              {tr(f.label, lang)}
            </label>
            {f.fixed !== undefined ? (
              <>
                <input id={fid} readOnly value={f.fixed} aria-describedby={`${fid}-note`} className={`${input} cursor-not-allowed bg-sand font-semibold text-heading`} />
                {f.note && (
                  <p id={`${fid}-note`} className="mt-2 text-[0.9375rem] text-ink-soft">
                    {tr(f.note, lang)}
                  </p>
                )}
              </>
            ) : f.type === "radio" ? (
              <div role="radiogroup" id={fid} aria-labelledby={`${fid}-label`} aria-describedby={invalid ? `${fid}-err` : undefined} className="mt-3 flex flex-wrap gap-3">
                {f.options?.map((o) => (
                  <label
                    key={o}
                    className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border bg-cream px-5 py-2 text-[1.0625rem] hover:border-ink ${invalid ? "border-maroon" : "border-ink-soft"}`}
                  >
                    <input
                      type="radio"
                      name={f.name}
                      value={o}
                      required={f.required}
                      defaultChecked={state.values?.[f.name] === o}
                      onChange={() => setChosen((c) => ({ ...c, [f.name]: o }))}
                      className="h-5 w-5 accent-maroon"
                    />
                    {o}
                  </label>
                ))}
              </div>
            ) : f.type === "select" ? (
              <select {...common} onChange={(e) => setChosen((c) => ({ ...c, [f.name]: e.target.value }))} className={`${input} appearance-auto`}>
                <option value="">{tr(ui.forms.choose, lang)}</option>
                {f.options?.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            ) : f.type === "textarea" ? (
              <textarea {...common} rows={6} />
            ) : f.suggest ? (
              <SuggestInput {...common} defaultValue={common.defaultValue} suggestions={f.suggest} />
            ) : (
              <input {...common} type={f.type ?? "text"} max={f.max} />
            )}
            {f.fixed === undefined && f.note && (
              <p className="mt-2 text-[0.9375rem] text-ink-soft">{tr(f.note, lang)}</p>
            )}
            {f.fixed === undefined && invalid && (
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
        {state.status === "duplicate" && (
          <p className="font-semibold text-heading">{tr(ui.forms.duplicate, lang)}</p>
        )}
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
