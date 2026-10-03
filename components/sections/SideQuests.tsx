import type { CSSProperties } from "react";
import { interestCover } from "@/lib/portfolio-media";

const INTERESTS = [
  {
    id: "01",
    title: "3D / BLENDER",
    tag: "FORM / LIGHT / SPACE",
    note: "Characters, hero assets and spatial scenes for the web.",
    thought: "I like turning flat ideas into spaces you can almost enter.",
    action: "EXPLORE",
    kind: "blender",
    image: interestCover("blender"),
  },
  {
    id: "02",
    title: "PHOTOGRAPHY",
    tag: "FRAME / LIGHT / MOMENT",
    note: "Finding structure, mood and small details inside ordinary scenes.",
    thought: "I notice light before I notice the subject.",
    action: "VIEW",
    kind: "photo",
    image: interestCover("photo"),
  },
  {
    id: "03",
    title: "SKETCHING",
    tag: "LINE / SHAPE / IDEA",
    note: "A fast way to think visually before an idea becomes pixels or code.",
    thought: "Where ideas exist before they need to make sense.",
    action: "VIEW",
    kind: "sketch",
    image: interestCover("sketch"),
  },
  {
    id: "04",
    title: "EDITING",
    tag: "RHYTHM / CUT / STORY",
    note: "Shaping raw visuals into something with pace, emphasis and intent.",
    thought: "Finding rhythm inside raw footage.",
    action: "PLAY",
    kind: "edit",
    image: interestCover("edit"),
  },
  {
    id: "05",
    title: "GAMING",
    tag: "SYSTEMS / STRATEGY / WORLD",
    note: "I notice mechanics, progression, economies and how worlds reward curiosity.",
    thought: "I study systems even when I am supposed to be playing.",
    action: "EXPLORE",
    kind: "gaming",
    image: interestCover("gaming"),
  },
  {
    id: "06",
    title: "WEB MOTION",
    tag: "TYPE / SHADER / INTERACTION",
    note: "Making interfaces feel less like documents and more like responsive spaces.",
    thought: "Interfaces should respond, not just exist.",
    action: "PLAY",
    kind: "motion",
    image: interestCover("motion"),
  },
] as const;

const mediaStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  opacity: 0.84,
  filter: "brightness(.9) saturate(.95) contrast(1.08)",
  pointerEvents: "none",
  zIndex: 0,
};

export function SideQuests() {
  return (
    <section className="sideQuestWorld interestsV4" id="side-quests" data-chapter>
      <div className="pageChrome lightChrome">
        <span>04 / OFF THE CLOCK</span>
        <span>THINGS I DO WITHOUT A ROADMAP</span>
      </div>

      <header className="interestsHeader">
        <span className="kicker">EXTRA INTERESTS</span>
        <h2>
          OFF THE
          <br />
          <em>CLOCK.</em>
        </h2>
        <p>The stuff I keep returning to even when nobody asked for a deliverable.</p>
      </header>

      <div className="interestOrbit">
        {INTERESTS.map((interest, index) => (
          <article
            className="interestTile"
            key={interest.title}
            style={{ "--interest-index": index } as CSSProperties}
            data-cursor-hot
            data-cursor-label={interest.action}
          >
            <div
              className={`interestVisual interestVisual-${interest.kind}`}
              aria-hidden="true"
              style={{ overflow: "hidden" }}
            >
              <img
                src={interest.image}
                alt=""
                draggable={false}
                className="interestMediaImg"
                style={mediaStyle}
              />
              <span />
              <span />
              <span />
              <span />
            </div>

            <div className="interestTileCopy" style={{ position: "relative", zIndex: 4 }}>
              <span>{interest.id}</span>
              <small>{interest.tag}</small>
              <h3>{interest.title}</h3>
              <p>{interest.note}</p>
              <i aria-hidden="true">↗</i>
              <div className="interestThought" aria-hidden="true">
                <em>{interest.thought}</em>
                <b>{interest.action}</b>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="interestAssetNote">
        <span>PERSONAL MEDIA LAYER</span>
        <p>Things I make when nobody is waiting for a deliverable.</p>
      </div>
    </section>
  );
}
