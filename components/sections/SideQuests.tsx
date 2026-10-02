const INTERESTS = [
  ["01", "3D / BLENDER", "FORM / LIGHT / SPACE", "Characters, hero assets and spatial scenes for the web."],
  ["02", "PHOTOGRAPHY", "FRAME / LIGHT / MOMENT", "Finding structure, mood and small details inside ordinary scenes."],
  ["03", "SKETCHING", "LINE / SHAPE / IDEA", "A fast way to think visually before an idea becomes pixels or code."],
  ["04", "EDITING", "RHYTHM / CUT / STORY", "Shaping raw visuals into something with pace, emphasis and intent."],
  ["05", "GAMING", "SYSTEMS / STRATEGY / WORLD", "I notice mechanics, progression, economies and how worlds reward curiosity."],
  ["06", "WEB MOTION", "TYPE / SHADER / INTERACTION", "Making interfaces feel less like documents and more like responsive spaces."],
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
        {INTERESTS.map(([id, title, tag, note], index) => (
          <article
            className="interestTile"
            key={title}
            style={{ "--interest-index": index } as React.CSSProperties}
            data-cursor-hot
          >
            <span>{id}</span>
            <small>{tag}</small>
            <h3>{title}</h3>
            <p>{note}</p>
            <i aria-hidden="true">↗</i>
          </article>
        ))}
      </div>
    </section>
  );
}
