"use client";

import { FormEvent, useMemo, useState } from "react";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";

const FALLING = ["01", "{}", "<>", "&&", "!=", "//", "API", "SIG", "101", "[]", "=>", "CV"];

export function TraceResponse() {
  const [status, setStatus] = useState<"idle" | "packing" | "ready">("idle");
  const [form, setForm] = useState({ name: "", response: "", link: "" });

  const payload = useMemo(
    () =>
      [
        `FROM: ${form.name || "ANONYMOUS"}`,
        form.response,
        form.link ? `LINK: ${form.link}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
    [form],
  );

  const submit = async (event?: FormEvent) => {
    event?.preventDefault();
    if (!form.response.trim() || status === "packing") return;

    setStatus("packing");

    try {
      await navigator.clipboard.writeText(payload);
    } catch {
      // Clipboard can be blocked; the visual flow still completes.
    }

    window.setTimeout(() => setStatus("ready"), 780);
  };

  return (
    <section className="traceResponse" id="response" data-chapter>
      <div className="pageChrome lightChrome">
        <span>06 / RESPONSE</span>
        <span>LEAVE SOMETHING BEHIND</span>
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
        <span className="kicker">YOU&apos;VE SEEN THE SYSTEM</span>
        <h2>LEAVE<br />YOUR TRACE.</h2>
        <p>Leave a thought, critique, idea or link behind.</p>
      </div>

      <form
        className={`traceForm ${status !== "idle" ? `is-${status}` : ""}`}
        onSubmit={submit}
        data-liquid-exclude
      >
        <label>
          <span>YOUR NAME</span>
          <input
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            placeholder="Optional"
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
          />
        </label>

        <label>
          <span>LINK / OPTIONAL</span>
          <input
            value={form.link}
            onChange={(event) => setForm({ ...form, link: event.target.value })}
            placeholder="https://"
            inputMode="url"
          />
        </label>

        <div className="traceSubmit">
          <LiquidMetalButton
            label={status === "packing" ? "PACKING..." : status === "ready" ? "TRACE READY" : "SUBMIT RESPONSE"}
            onClick={() => void submit()}
          />
          <small>
            {status === "ready"
              ? "TRACE COPIED TO CLIPBOARD — SEND IT THROUGH ANY OPEN CHANNEL."
              : "SUBMISSION IS PACKED LOCALLY; NO PRIVATE DATA IS SILENTLY STORED."}
          </small>
        </div>

        <div className="tracePacket" aria-hidden="true">
          <span>[ TRACE ]</span>
        </div>
      </form>

      {status === "ready" ? (
        <div className="traceRecorded" role="status">
          TRACE READY.
        </div>
      ) : null}
    </section>
  );
}
