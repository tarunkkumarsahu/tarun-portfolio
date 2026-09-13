"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { stationModules } from "@/data/platform";

export function StationPreview() {
  return (
    <section className="station-preview" id="station">
      <div className="station-preview__head">
        <div>
          <span>005 / THE WORKSTATION</span>
          <h2>
            WHAT&apos;S
            <em>alive now.</em>
          </h2>
        </div>

        <div className="station-preview__intro">
          <span className="station-live"><i /> LIVE SYSTEM</span>
          <p>
            Work is the archive. The workstation is the moving edge — what is being built,
            researched and questioned right now.
          </p>
          <a href="/station" data-cursor="ENTER">
            ENTER WORKSTATION <ArrowUpRight size={15} />
          </a>
        </div>
      </div>

      <div className="station-preview__grid">
        {stationModules.map((item, index) => {
          const content = (
            <>
              <div className="station-preview__meta">
                <span>{item.number}</span>
                <span>{item.label}</span>
                <small>{item.status}</small>
              </div>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <div className="station-preview__signal" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
            </>
          );

          return item.href ? (
            <motion.a
              href={item.href}
              key={item.number}
              className="station-preview__card"
              data-cursor="OPEN"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              {content}
            </motion.a>
          ) : (
            <motion.article
              key={item.number}
              className="station-preview__card station-preview__card--static"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              {content}
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
