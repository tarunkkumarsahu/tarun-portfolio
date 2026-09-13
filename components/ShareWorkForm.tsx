"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { workCategories } from "@/data/platform";

type State = "idle" | "sending" | "success" | "error";

export function ShareWorkForm() {
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setMessage("");

    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const response = await fetch("/api/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) throw new Error(data.error || "Could not submit the work.");

      event.currentTarget.reset();
      setState("success");
      setMessage("Submission received. It will stay private until it has been reviewed.");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Could not submit the work.");
    }
  }

  return (
    <form className="platform-form share-work-form" onSubmit={submit}>
      <div className="platform-form__honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

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

      <div className="platform-form__grid">
        <label>
          <span>PROJECT NAME</span>
          <input name="title" required minLength={2} maxLength={120} placeholder="What did you build?" />
        </label>
        <label>
          <span>CATEGORY</span>
          <select name="category" defaultValue={workCategories[0]}>
            {workCategories.map((category) => <option key={category}>{category}</option>)}
          </select>
        </label>
      </div>

      <label className="platform-form__message">
        <span>WHAT DID YOU BUILD?</span>
        <textarea
          name="description"
          required
          minLength={20}
          maxLength={3500}
          rows={7}
          placeholder="Explain the project, system or experiment in your own words."
        />
      </label>

      <label className="platform-form__message">
        <span>WHY ARE YOU SHARING IT?</span>
        <textarea
          name="whyShare"
          required
          minLength={10}
          maxLength={1800}
          rows={5}
          placeholder="What would you like feedback, discussion or visibility on?"
        />
      </label>

      <div className="platform-form__grid">
        <label>
          <span>PROJECT URL · OPTIONAL</span>
          <input name="projectUrl" type="url" maxLength={500} placeholder="https://" />
        </label>
        <label>
          <span>GITHUB URL · OPTIONAL</span>
          <input name="githubUrl" type="url" maxLength={500} placeholder="https://github.com/…" />
        </label>
      </div>

      <div className="platform-form__submit">
        <p>Nothing is published automatically. Every submission stays pending until reviewed.</p>
        <button type="submit" disabled={state === "sending"}>
          {state === "sending" ? "SENDING…" : "SEND YOUR WORK"}
          <ArrowUpRight size={16} />
        </button>
      </div>

      {message ? <p className={`platform-form__response is-${state}`} role="status">{message}</p> : null}
    </form>
  );
}
