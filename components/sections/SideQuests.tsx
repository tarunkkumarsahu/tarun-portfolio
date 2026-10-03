const MEDIA_SPRITE = "/media/portfolio-media-sprite.webp";

const INTERESTS = [
  {
    id: "01",
    title: "3D / BLENDER",
    tag: "FORM / LIGHT / SPACE",
    note: "Characters, hero assets and spatial scenes for the web.",
    thought: "I like turning flat ideas into spaces you can almost enter.",
    action: "EXPLORE",
    kind: "blender",
    spriteIndex: 10,
  },
  {
    id: "02",
    title: "PHOTOGRAPHY",
    tag: "FRAME / LIGHT / MOMENT",
    note: "Finding structure, mood and small details inside ordinary scenes.",
    thought: "I notice light before I notice the subject.",
    action: "VIEW",
    kind: "photo",
    spriteIndex: 11,
  },
  {
    id: "03",
    title: "SKETCHING",
    tag: "LINE / SHAPE / IDEA",
    note: "A fast way to think visually before an idea becomes pixels or code.",
    thought: "Where ideas exist before they need to make sense.",
    action: "VIEW",
    kind: "sketch",
    spriteIndex: 12,
  },
  {
    id: "04",
    title: "EDITING",
    tag: "RHYTHM / CUT / STORY",
    note: "Shaping raw visuals into something with pace, emphasis and intent.",
    thought: "Finding rhythm inside raw footage.",
    action: "PLAY",
    kind: "edit",
    spriteIndex: 13,
  },
  {
    id: "05",
    title: "GAMING",
    tag: "SYSTEMS / STRATEGY / WORLD",
    note: "I notice mechanics, progression, economies and how worlds reward curiosity.",
    thought: "I study systems even when I am supposed to be playing.",
    action: "EXPLORE",
    kind: "gaming",
    spriteIndex: 14,
  },
  {
    id: "06",
    title: "WEB MOTION",
    tag: "TYPE / SHADER / INTERACTION",
    note: "Making interfaces feel less like documents and more like responsive spaces.",
    thought: "Interfaces should respond, not just exist.",
    action: "PLAY",
    kind: "motion",
    spriteIndex: 15,
  },
] as const;

function mediaStyle(index: number): React.CSSProperties {
  const col = index % 4;
  const row = Math.floor(index / 4);
  return {
    position: "absolute",
    inset: 0,
    backgroundImage: `linear-gradient(90deg, rgba(5,5,6,.18), rgba(5,5,6,.58)), url(${MEDIA_SPRITE})`,
    backgroundSize: "100% 100%, 400% 400%",
    backgroundPosition: `center, ${(col / 3) * 100}% ${(row / 3) * 100}%`,
    backgroundRepeat: "no-repeat",
    filter: "brightness(.72) saturate(.92) contrast(1.04)",
    zIndex: 0,
    pointerEvents: "none",
  };
}

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
        <p>
          The stuff I keep returning to even when nobody asked for a deliverable.
        </p>
      </header>

      <div className="interestOrbit">
        {INTERESTS.map((interest, index) => (
          <article
            className="interestTile"
            key={interest.title}
            style={{ "--interest-index": index } as React.CSSProperties}
            data-cursor-hot
            data-cursor-label={interest.action}
          >
            <div
              className={`interestVisual interestVisual-${interest.kind}`}
              aria-hidden="true"
            >
              <div className="interestMedia" style={mediaStyle(interest.spriteIndex)} />
              <span />
              <span />
              <span />
              <span />
            </div>

            <div className="interestTileCopy">
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
