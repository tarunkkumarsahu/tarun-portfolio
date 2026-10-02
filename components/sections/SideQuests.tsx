const INTERESTS = [
  {
    id: "01",
    title: "3D / BLENDER",
    note: "Characters, hero assets and spatial scenes for the web. I like making interfaces feel less flat.",
    tag: "FORM / LIGHT / SPACE",
  },
  {
    id: "02",
    title: "GAMING",
    note: "Systems, economies, progression and worlds — the part of games that makes me think beyond a single screen.",
    tag: "SYSTEMS / STRATEGY",
  },
  {
    id: "03",
    title: "WEB MOTION",
    note: "Shaders, transitions, cursor behaviour and small interaction experiments that make a page feel alive.",
    tag: "MOTION / INTERACTION",
  },
] as const;

export function SideQuests() {
  return (
    <section className="sideQuestWorld interestsV3" id="side-quests" data-chapter>
      <div className="pageChrome lightChrome">
        <span>04 / OFF THE CLOCK</span>
        <span>INTERESTS OUTSIDE THE MAIN BUILD</span>
      </div>

      <header className="interestsHeader">
        <span className="kicker">EXTRA INTERESTS</span>
        <h2>
          OFF THE
          <br />
          <em>CLOCK.</em>
        </h2>
        <p>Things I explore because they are interesting, not because they need to ship.</p>
      </header>

      <div className="interestList">
        {INTERESTS.map((interest) => (
          <article className="interestRow" key={interest.title} data-cursor-hot>
            <span>{interest.id}</span>
            <h3>{interest.title}</h3>
            <small>{interest.tag}</small>
            <p>{interest.note}</p>
            <i aria-hidden="true">↗</i>
          </article>
        ))}
      </div>
    </section>
  );
}
