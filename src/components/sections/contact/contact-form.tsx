"use client";

import * as m from "motion/react-m";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { CONTACT_LIMITS, submitContact, validateContact } from "@/lib/contact";
import { cn } from "@/lib/utils";
import type { ContactFormErrors, ContactFormValues } from "@/types";

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success"; message: string }
  | { state: "error"; message: string };

const initialValues: ContactFormValues = { name: "", email: "", subject: "", message: "" };

export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactFormValues, boolean>>>({});
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [honeypot, setHoneypot] = useState("");

  const update = (field: keyof ContactFormValues, value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);
    if (touched[field]) setErrors((prev) => ({ ...prev, [field]: validateContact(next)[field] }));
    if (status.state === "error" || status.state === "success") setStatus({ state: "idle" });
  };

  const blur = (field: keyof ContactFormValues) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateContact(values)[field] }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validateContact(values);
    setErrors(validation);
    setTouched({ name: true, email: true, subject: true, message: true });

    const firstInvalid = (Object.keys(validation) as (keyof ContactFormValues)[])[0];
    if (firstInvalid) {
      event.currentTarget.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setStatus({ state: "submitting" });

    // Bots fill hidden fields; pretend success without contacting the API.
    if (honeypot) {
      setStatus({ state: "success", message: "Thanks! Your message has been sent." });
      return;
    }

    const result = await submitContact(values);
    if (result.ok) {
      setStatus({ state: "success", message: result.message });
      setValues(initialValues);
      setTouched({});
      setErrors({});
    } else {
      setStatus({ state: "error", message: result.message });
      if (result.fieldErrors) setErrors(result.fieldErrors);
    }
  };

  const submitting = status.state === "submitting";

  return (
    <form noValidate onSubmit={handleSubmit} className="relative grid gap-5" aria-busy={submitting}>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Name"
          name="name"
          autoComplete="name"
          value={values.name}
          error={errors.name}
          maxLength={CONTACT_LIMITS.name.max}
          onChange={update}
          onBlur={blur}
          placeholder="Jane Doe"
        />
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          value={values.email}
          error={errors.email}
          maxLength={CONTACT_LIMITS.email.max}
          onChange={update}
          onBlur={blur}
          placeholder="jane@company.com"
        />
      </div>
      <Field
        label="Subject"
        name="subject"
        value={values.subject}
        error={errors.subject}
        maxLength={CONTACT_LIMITS.subject.max}
        onChange={update}
        onBlur={blur}
        placeholder="Let's build something together"
      />
      <Field
        label="Message"
        name="message"
        multiline
        value={values.message}
        error={errors.message}
        maxLength={CONTACT_LIMITS.message.max}
        onChange={update}
        onBlur={blur}
        placeholder="Tell me about your project, team, or role…"
        hint={`${values.message.trim().length}/${CONTACT_LIMITS.message.max}`}
      />

      {/* Honeypot: hidden from people and assistive tech. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Company
          <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
        </label>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" disabled={submitting} className="sm:min-w-44">
          {submitting ? (
            <>
              <Loader2 aria-hidden className="size-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send Message
              <Send aria-hidden className="size-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </>
          )}
        </Button>

        <div aria-live="polite" className="min-h-6">
          {status.state === "success" || status.state === "error" ? (
            <m.p
              key={`${status.state}-${status.message}`}
              role={status.state === "error" ? "alert" : "status"}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex items-start gap-2 text-sm",
                status.state === "success" ? "text-accent-emerald" : "text-red-500 dark:text-red-400",
              )}
            >
              {status.state === "success" ? (
                <CheckCircle2 aria-hidden className="mt-0.5 size-4 shrink-0" />
              ) : (
                <AlertCircle aria-hidden className="mt-0.5 size-4 shrink-0" />
              )}
              {status.message}
            </m.p>
          ) : null}
        </div>
      </div>
    </form>
  );
}

interface FieldProps {
  label: string;
  name: keyof ContactFormValues;
  value: string;
  error?: string;
  hint?: string;
  multiline?: boolean;
  type?: "text" | "email";
  autoComplete?: string;
  inputMode?: "email" | "text";
  placeholder?: string;
  maxLength: number;
  onChange: (field: keyof ContactFormValues, value: string) => void;
  onBlur: (field: keyof ContactFormValues) => void;
}

function Field({ label, name, value, error, hint, multiline, onChange, onBlur, ...inputProps }: FieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const className = cn(
    "w-full rounded-xl border bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-subtle/70",
    "transition-[border-color,box-shadow] duration-200 outline-none",
    "focus:border-accent-blue/60 focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--accent-blue)_15%,transparent)]",
    error ? "border-red-500/60" : "border-border hover:border-border-strong",
  );
  const shared = {
    id,
    name,
    value,
    required: true,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
    onBlur: () => onBlur(name),
    className,
  };

  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}
        </label>
        {hint ? <span className="font-mono text-[0.7rem] text-subtle">{hint}</span> : null}
      </div>
      {multiline ? (
        <textarea
          {...shared}
          rows={6}
          placeholder={inputProps.placeholder}
          maxLength={inputProps.maxLength}
          onChange={(event) => onChange(name, event.target.value)}
          className={cn(className, "resize-y")}
        />
      ) : (
        <input {...shared} {...inputProps} type={inputProps.type ?? "text"} onChange={(event) => onChange(name, event.target.value)} />
      )}
      {error ? (
        <p id={errorId} className="mt-1.5 text-xs text-red-500 dark:text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}
