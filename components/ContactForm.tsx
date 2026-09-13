"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { inquiryTypes } from "@/data/platform";
import { TurnstileField } from "@/components/TurnstileField";

type State = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setMessage("");

    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) throw new Error(data.error || "Could not send the message.");

      event.currentTarget.reset();
      setState("success");
      setMessage("Signal received. I’ll review it from the control desk.");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Could not send the message.");
    }
  }

  return (
    <form className="platform-form" onSubmit={submit}>
      <div className="platform-form__honeypot" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <fieldset className="platform-form__intent">
        <legend>WHY ARE YOU HERE?</legend>
        {inquiryTypes.map((item, index) => (
          <label key={item.value}>
            <input type="radio" name="type" value={item.value} defaultChecked={index === 0} />
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{item.label}</strong>
          </label>
        ))}
      </fieldset>

      <div className="platform-form__grid">
        <label>
          <span>YOUR NAME</span>
          <input name="name" required minLength={2} maxLength={80} placeholder="Name" />
        </label>
        <label>
          <span>EMAIL</span>
          <input name="email" type="email" required maxLength={180} placeholder="you@example.com" />
        </label>
      </div>

      <label className="platform-form__message">
        <span>MESSAGE</span>
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={3000}
          rows={8}
          placeholder="Tell me what you are thinking about."
        />
      </label>

      <TurnstileField />

      <div className="platform-form__submit">
        <p>Messages are private and are never published automatically.</p>
        <button type="submit" disabled={state === "sending"}>
          {state === "sending" ? "SENDING…" : "SEND SIGNAL"}
          <ArrowUpRight size={16} />
        </button>
      </div>

      {message ? <p className={`platform-form__response is-${state}`} role="status">{message}</p> : null}
    </form>
  );
}
