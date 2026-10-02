"use client";

import { FormEvent, useMemo, useState } from "react";
import { FlipLinks } from "@/components/ui/flip-links";
import { EditorialButton } from "@/components/ui/editorial-button";

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
      // Clipboard may be blocked.
    }
    window.setTimeout(() => setStatus("ready"), 560);
  };

  const reopenProjects = () => {
    document.getElementById("workstation")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    window.setTimeout(() => window.dispatchEvent(new Event("open-projects")), 620);
  };

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
          <EditorialButton type="submit">
            {status === "packing"
              ? "PACKING TRACE"
              : status === "ready"
                ? "TRACE READY"
                : "SUBMIT TRACE"}
          </EditorialButton>
          <small>
            {status === "ready"
              ? "COPIED TO CLIPBOARD — SEND IT THROUGH ANY OPEN CHANNEL."
              : "NOTHING IS SILENTLY STORED."}
          </small>
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
              href: "https://www.linkedin.com/in/tarunnsahuu/",
              meta: "/in/tarunnsahuu",
            },
            {
              label: "INSTAGRAM",
              href: "https://www.instagram.com/tarunnsahuu/",
              meta: "@tarunnsahuu",
            },
          ]}
        />
      </div>

      {status === "ready" ? (
        <div className="traceRecorded" role="status">
          TRACE READY.
        </div>
      ) : null}
    </section>
  );
}
