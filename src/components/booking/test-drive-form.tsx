"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import type { ModelCatalogueEntry } from "@/types/vehicle";

const fieldClass =
  "min-h-12 w-full border border-white/20 bg-[#0c0f11] px-4 text-sm text-white outline-none transition-colors placeholder:text-white/40 hover:border-white/35 focus:border-jetour-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-jetour-accent";

export function TestDriveForm({
  models,
  selectedSlug,
}: {
  models: Pick<ModelCatalogueEntry, "name" | "slug">[];
  selectedSlug?: string;
}) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit} className="border border-white/12 bg-[#101316] p-6 sm:p-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium sm:col-span-2">
          Model
          <select name="model" defaultValue={selectedSlug ?? ""} required className={fieldClass}>
            <option value="" disabled>Select a Jetour model</option>
            {models.map((model) => <option key={model.slug} value={model.slug}>{model.name}</option>)}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Full name
          <input name="fullName" type="text" autoComplete="name" required className={fieldClass} />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Phone number
          <input name="phone" type="tel" inputMode="tel" autoComplete="tel" required className={fieldClass} />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Email
          <input name="email" type="email" autoComplete="email" required className={fieldClass} />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Preferred contact method
          <select name="contactMethod" defaultValue="" required className={fieldClass}>
            <option value="" disabled>Select a contact method</option>
            <option value="phone">Phone</option>
            <option value="email">Email</option>
            <option value="whatsapp">WhatsApp</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-medium sm:col-span-2">
          Message <span className="text-xs font-normal text-white/65">(optional)</span>
          <textarea name="message" rows={5} className={`${fieldClass} resize-y py-3`} />
        </label>
      </div>
      <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <button type="submit" className="min-h-12 border border-jetour-accent bg-jetour-accent px-6 text-xs font-semibold tracking-[.09em] text-[#15100a] uppercase transition-colors hover:border-[#e3c58f] hover:bg-[#e3c58f] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-jetour-accent">
          Continue request
        </button>
        <p className="max-w-xl text-xs leading-5 text-white/65">
          Demonstration form only. Submission is not connected to Jetour Kuwait yet.
        </p>
      </div>
      {submitted ? <p role="status" tabIndex={-1} className="mt-5 border-l-2 border-jetour-accent pl-4 text-sm leading-6 text-white/80">
        Your details are complete, but no request has been sent. A booking service must be connected before submissions can be delivered.
      </p> : null}
    </form>
  );
}
