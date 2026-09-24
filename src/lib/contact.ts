import { profile } from "@/data/profile";
import type { ContactFormErrors, ContactFormValues } from "@/types";

export const CONTACT_LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  subject: { min: 3, max: 150 },
  message: { min: 10, max: 5000 },
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Formspree form that emails submissions to profile.email. The endpoint is
 * public by design (browsers post to it directly), so it lives in code; set
 * NEXT_PUBLIC_CONTACT_ENDPOINT to override it, or to "" to fall back to
 * opening the visitor's email app. The site stays 100% static either way.
 */
const DEFAULT_CONTACT_ENDPOINT = "https://formspree.io/f/xzezgqqw";
const CONTACT_ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? DEFAULT_CONTACT_ENDPOINT;

export function validateContact(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const subject = values.subject.trim();
  const message = values.message.trim();

  if (name.length < CONTACT_LIMITS.name.min) errors.name = "Please enter your name.";
  else if (name.length > CONTACT_LIMITS.name.max) errors.name = `Name must be at most ${CONTACT_LIMITS.name.max} characters.`;

  if (!email) errors.email = "Please enter your email address.";
  else if (email.length > CONTACT_LIMITS.email.max || !EMAIL_PATTERN.test(email))
    errors.email = "Please enter a valid email address.";

  if (subject.length < CONTACT_LIMITS.subject.min) errors.subject = "Please add a short subject.";
  else if (subject.length > CONTACT_LIMITS.subject.max)
    errors.subject = `Subject must be at most ${CONTACT_LIMITS.subject.max} characters.`;

  if (message.length < CONTACT_LIMITS.message.min)
    errors.message = `Message must be at least ${CONTACT_LIMITS.message.min} characters.`;
  else if (message.length > CONTACT_LIMITS.message.max)
    errors.message = `Message must be at most ${CONTACT_LIMITS.message.max} characters.`;

  return errors;
}

export type SubmitResult =
  | { ok: true; message: string }
  | { ok: false; message: string; fieldErrors?: ContactFormErrors };

/** Formspree-style error body: `{ errors: [{ field, message }] }`. */
interface EndpointError {
  errors?: { field?: string; message?: string }[];
}

function trimmed(values: ContactFormValues): ContactFormValues {
  return {
    name: values.name.trim(),
    email: values.email.trim(),
    subject: values.subject.trim(),
    message: values.message.trim(),
  };
}

function openEmailApp(values: ContactFormValues): SubmitResult {
  const body = `${values.message}\n\n— ${values.name} (${values.email})`;
  const href = `mailto:${profile.email}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = href;
  return {
    ok: true,
    message: `Your email app should open with the message ready — just press send. Or write to ${profile.email}.`,
  };
}

async function postToEndpoint(values: ContactFormValues): Promise<SubmitResult> {
  try {
    const response = await fetch(CONTACT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      // Formspree: `email` becomes the reply-to address, `_subject` the email subject.
      body: JSON.stringify({ ...values, _subject: `[Portfolio] ${values.subject}` }),
      signal: AbortSignal.timeout(10000),
    });
    if (response.ok) return { ok: true, message: "Thanks for reaching out! I'll get back to you soon." };

    const body = (await response.json().catch(() => null)) as EndpointError | null;
    const fieldErrors: ContactFormErrors = {};
    for (const error of body?.errors ?? []) {
      if (error.field && error.field in values) fieldErrors[error.field as keyof ContactFormValues] = error.message;
    }
    return {
      ok: false,
      message: body?.errors?.[0]?.message ?? "Couldn't send your message. Please try again or email me directly.",
      fieldErrors,
    };
  } catch {
    return { ok: false, message: `Couldn't reach the server. Please email me directly at ${profile.email}.` };
  }
}

export async function submitContact(values: ContactFormValues): Promise<SubmitResult> {
  const clean = trimmed(values);
  return CONTACT_ENDPOINT ? postToEndpoint(clean) : openEmailApp(clean);
}
