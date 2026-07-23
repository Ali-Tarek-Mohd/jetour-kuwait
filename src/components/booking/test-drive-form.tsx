"use client";

import { useRef, useState } from "react";
import type { FormEvent } from "react";
import type { ModelCatalogueEntry } from "@/types/vehicle";

const fieldClass =
  "min-h-12 w-full border border-white/20 bg-[#0c0f11] px-4 text-sm text-white outline-none transition-colors placeholder:text-white/40 hover:border-white/35 focus:border-jetour-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-jetour-accent";
const errorClass = "border-l-2 border-red-300 pl-2 text-xs leading-5 text-red-100";

type FieldName = "model" | "fullName" | "phone" | "email" | "contactMethod" | "message";
type FormErrors = Partial<Record<FieldName, string>>;

function fieldValue(formData: FormData, name: FieldName) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function isValidName(value: string) {
  const meaningfulCharacters = value.match(/\p{L}/gu)?.length ?? 0;
  return value.length <= 80
    && meaningfulCharacters >= 2
    && /^[\p{L}\p{M}][\p{L}\p{M}\s'’-]*$/u.test(value);
}

function isValidKuwaitPhone(value: string) {
  const normalized = value.replace(/[\s\-()]/g, "");
  return /^(?:\+965)?\d{8}$/.test(normalized);
}

export function TestDriveForm({
  models,
  selectedSlug,
}: {
  models: Pick<ModelCatalogueEntry, "name" | "slug">[];
  selectedSlug?: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const values = {
      model: fieldValue(formData, "model"),
      fullName: fieldValue(formData, "fullName"),
      phone: fieldValue(formData, "phone"),
      email: fieldValue(formData, "email"),
      contactMethod: fieldValue(formData, "contactMethod"),
      message: fieldValue(formData, "message"),
    };
    const nextErrors: FormErrors = {};
    const fullNameInput = form.elements.namedItem("fullName");
    const emailInput = form.elements.namedItem("email");
    const messageInput = form.elements.namedItem("message");

    if (fullNameInput instanceof HTMLInputElement) fullNameInput.value = values.fullName;
    if (emailInput instanceof HTMLInputElement) emailInput.value = values.email;
    if (messageInput instanceof HTMLTextAreaElement) messageInput.value = values.message;

    if (!models.some((model) => model.slug === values.model)) nextErrors.model = "Select a Jetour model.";
    if (!isValidName(values.fullName)) nextErrors.fullName = "Enter a valid full name.";
    if (!isValidKuwaitPhone(values.phone)) nextErrors.phone = "Enter a valid Kuwait phone number.";

    if (!(emailInput instanceof HTMLInputElement) || !values.email || !emailInput.validity.valid) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!values.contactMethod) nextErrors.contactMethod = "Select a preferred contact method.";
    if (values.message.length > 1000) nextErrors.message = "Keep your message within 1,000 characters.";

    setErrors(nextErrors);
    setSubmitted(false);

    const firstInvalid = (Object.keys(nextErrors) as FieldName[])[0];
    if (firstInvalid) {
      requestAnimationFrame(() => {
        const field = formRef.current?.elements.namedItem(firstInvalid);
        if (field instanceof HTMLElement) field.focus();
      });
      return;
    }

    setSubmitted(true);
  }

  function errorProps(name: FieldName) {
    return {
      "aria-invalid": errors[name] ? true : undefined,
      "aria-describedby": errors[name] ? `${name}-error` : undefined,
    };
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="border border-white/12 bg-[#101316] p-6 sm:p-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium sm:col-span-2">
          Model
          <select name="model" defaultValue={selectedSlug ?? ""} required className={fieldClass} {...errorProps("model")}>
            <option value="" disabled>Select a Jetour model</option>
            {models.map((model) => <option key={model.slug} value={model.slug}>{model.name}</option>)}
          </select>
          {errors.model ? <span id="model-error" className={errorClass}>{errors.model}</span> : null}
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Full name
          <input name="fullName" type="text" autoComplete="name" required maxLength={80} className={fieldClass} {...errorProps("fullName")} />
          {errors.fullName ? <span id="fullName-error" className={errorClass}>{errors.fullName}</span> : null}
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Phone number
          <input name="phone" type="tel" inputMode="tel" autoComplete="tel" required className={fieldClass} {...errorProps("phone")} />
          {errors.phone ? <span id="phone-error" className={errorClass}>{errors.phone}</span> : null}
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Email
          <input name="email" type="email" autoComplete="email" required className={fieldClass} {...errorProps("email")} />
          {errors.email ? <span id="email-error" className={errorClass}>{errors.email}</span> : null}
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Preferred contact method
          <select name="contactMethod" defaultValue="" required className={fieldClass} {...errorProps("contactMethod")}>
            <option value="" disabled>Select a contact method</option>
            <option value="phone">Phone</option>
            <option value="email">Email</option>
            <option value="whatsapp">WhatsApp</option>
          </select>
          {errors.contactMethod ? <span id="contactMethod-error" className={errorClass}>{errors.contactMethod}</span> : null}
        </label>
        <label className="grid gap-2 text-sm font-medium sm:col-span-2">
          Message <span className="text-xs font-normal text-white/65">(optional)</span>
          <textarea name="message" rows={5} maxLength={1000} className={`${fieldClass} resize-y py-3`} {...errorProps("message")} />
          {errors.message ? <span id="message-error" className={errorClass}>{errors.message}</span> : null}
        </label>
      </div>
      <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <button type="submit" className="min-h-12 border border-jetour-accent bg-jetour-accent px-6 text-xs font-semibold tracking-[.09em] text-[#15100a] uppercase transition-colors hover:border-[#e3c58f] hover:bg-[#e3c58f] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-jetour-accent">
          Review request
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
