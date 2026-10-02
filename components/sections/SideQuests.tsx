const INTERESTS = [
  {
    id: "01",
    title: "3D / BLENDER",
    tag: "FORM / LIGHT / SPACE",
    note: "Characters, hero assets and spatial scenes for the web.",
    kind: "blender",
  },
  {
    id: "02",
    title: "PHOTOGRAPHY",
    tag: "FRAME / LIGHT / MOMENT",
    note: "Finding structure, mood and small details inside ordinary scenes.",
    kind: "photo",
  },
  {
    id: "03",
    title: "SKETCHING",
    tag: "LINE / SHAPE / IDEA",
    note: "A fast way to think visually before an idea becomes pixels or code.",
    kind: "sketch",
  },
  {
    id: "04",
    title: "EDITING",
    tag: "RHYTHM / CUT / STORY",
    note: "Shaping raw visuals into something with pace, emphasis and intent.",
    kind: "edit",
  },
  {
    id: "05",
    title: "GAMING",
    tag: "SYSTEMS / STRATEGY / WORLD",
    note: "I notice mechanics, progression, economies and how worlds reward curiosity.",
    kind: "gaming",
  },
  {
    id: "06",
    title: "WEB MOTION",
    tag: "TYPE / SHADER / INTERACTION",
    note: "Making interfaces feel less like documents and more like responsive spaces.",
    kind: "motion",
  },
] as const;

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
          >
            <div
              className={`interestVisual interestVisual-${interest.kind}`}
              aria-hidden="true"
            >
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
            </div>
          </article>
        ))}
      </div>

      <div className="interestAssetNote">
        <span>PERSONAL MEDIA LAYER</span>
        <p>
          Photography, sketches, edits and Blender renders can drop into these
          frames later without changing the layout.
        </p>
      </div>
    </section>
  );
}
