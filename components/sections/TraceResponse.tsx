"use client";

import { FormEvent, useMemo, useState } from "react";
import { FlipLinks } from "@/components/ui/flip-links";
import { EditorialButton } from "@/components/ui/editorial-button";

const FALLING = ["01", "{}", "<>", "&&", "!=", "//", "API", "SIG", "101", "[]", "=>", "CV"];

type Status = "idle" | "sending" | "sent" | "fallback" | "error";

type TraceFormState = {
  name: string;
  response: string;
  link: string;
  website: string;
};

export function TraceResponse() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState<TraceFormState>({
    name: "",
    response: "",
    link: "",
    website: "",
  });

  const payload = useMemo(
    () =>
      [
        `FROM: ${form.name || "ANONYMOUS"}`,
        form.response,
        form.link ? `LINK: ${form.link}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
    [form.name, form.response, form.link],
  );

  const copyFallback = async () => {
    try {
      if (!navigator.clipboard?.writeText) {
        setStatus("error");
        return false;
      }
      await navigator.clipboard.writeText(payload);
      setStatus("fallback");
      return true;
    } catch {
      setStatus("error");
      return false;
    }
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!form.response.trim() || status === "sending") return;

    setStatus("sending");

    try {
      const response = await fetch("/api/trace", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = (await response.json().catch(() => null)) as
        | { delivered?: boolean; fallback?: string }
        | null;

      if (response.ok && result?.delivered) {
        setStatus("sent");
        return;
      }

      await copyFallback();
    } catch {
      await copyFallback();
    }
  };

  const reopenProjects = () => {
    document.getElementById("workstation")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    window.setTimeout(() => window.dispatchEvent(new Event("open-projects")), 620);
  };

  const statusCopy =
    status === "sent"
      ? "DELIVERED."
      : status === "fallback"
        ? "DELIVERY CHANNEL IS NOT CONFIGURED YET — TRACE COPIED TO CLIPBOARD."
        : status === "error"
          ? "TRACE COULD NOT BE DELIVERED OR COPIED. YOUR TEXT IS STILL HERE."
          : "NOTHING IS SILENTLY STORED.";

  return (
    <section className="traceResponse traceFinal" id="response" data-chapter>
      <div className="pageChrome lightChrome">
        <span>07 / FINAL TRACE</span>
        <span>THE SYSTEM ENDS. THE CONNECTION DOESN&apos;T.</span>
      </div>

      <div className="traceRain" aria-hidden="true">
        {FALLING.map((item, index) => (
          <span
            key={`${item}-${index}`}
            style={{
              "--fall-x": `${4 + ((index * 83) % 91)}%`,
              "--fall-delay": `${-((index * 1.37) % 9)}s`,
              "--fall-duration": `${7 + (index % 5) * 1.15}s`,
              "--fall-rotate": `${-12 + (index % 7) * 5}deg`,
            } as React.CSSProperties}
          >
            {item}
          </span>
        ))}
      </div>

      <div className="traceCopy">
        <span className="kicker">ONE LAST SIGNAL</span>
        <h2>
          LEAVE YOUR
          <br />
          <em>TRACE.</em>
        </h2>
        <p>
          A critique. A collaboration. A weird idea at 2AM. If it is worth
          sending, send it.
        </p>
      </div>

      <form
        className={`traceForm ${status !== "idle" ? `is-${status}` : ""}`}
        onSubmit={submit}
        data-liquid-exclude
      >
        <input
          className="traceHoneypot"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          name="website"
          value={form.website}
          onChange={(event) => setForm({ ...form, website: event.target.value })}
        />

        <label>
          <span>YOUR NAME</span>
          <input
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            placeholder="Optional"
            maxLength={120}
          />
        </label>

        <label>
          <span>YOUR RESPONSE</span>
          <textarea
            required
            value={form.response}
            onChange={(event) => setForm({ ...form, response: event.target.value })}
            placeholder="What stayed with you?"
            rows={4}
            maxLength={3000}
          />
        </label>

        <label>
          <span>LINK / OPTIONAL</span>
          <input
            value={form.link}
            onChange={(event) => setForm({ ...form, link: event.target.value })}
            placeholder="https://"
            inputMode="url"
            maxLength={500}
          />
        </label>

        <div className="traceSubmit">
          <EditorialButton type="submit" disabled={status === "sending"}>
            {status === "sending"
              ? "SENDING TRACE"
              : status === "sent"
                ? "TRACE SENT"
                : status === "fallback"
                  ? "TRACE READY"
                  : "SUBMIT TRACE"}
          </EditorialButton>
          <small>{statusCopy}</small>
        </div>

        <div className="tracePacket" aria-hidden="true">
          <span>[ TRACE ]</span>
        </div>
      </form>

      <div className="traceChannels">
        <div className="traceChannelsHead">
          <span>KEEP THE CHANNEL OPEN</span>
          <EditorialButton type="button" onClick={reopenProjects}>
            PROJECTS
          </EditorialButton>
        </div>

        <FlipLinks
          items={[
            {
              label: "GITHUB",
              href: "https://github.com/tarunkkumarsahu",
              meta: "@tarunkkumarsahu",
            },
            {
              label: "LINKEDIN",
              href: "https://www.linkedin.com/in/tarunkkumarsahu/",
              meta: "/in/tarunkkumarsahu",
            },
            {
              label: "INSTAGRAM",
              href: "https://www.instagram.com/tarunnsahuu/",
              meta: "@tarunnsahuu",
            },
          ]}
        />
      </div>

      {(status === "sent" || status === "fallback") ? (
        <div className="traceRecorded" role="status">
          {status === "sent" ? "TRACE DELIVERED." : "TRACE PACKED."}
        </div>
      ) : null}

      <footer className="finalSignoff">
        <span>DESIGNED + BUILT BY TARUN KUMAR SAHU</span>
        <span>INDIA / 2026</span>
      </footer>
    </section>
  );
}
