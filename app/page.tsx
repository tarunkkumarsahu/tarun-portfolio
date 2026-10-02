import { IntroExperience } from "@/components/IntroExperience";
import { IntroducingTarun } from "@/components/sections/IntroducingTarun";
import { LivingSystem } from "@/components/sections/LivingSystem";
import { TechCursor } from "@/components/TechCursor";

export default function Home() {
  return (
    <main className="portfolioRoot">
      <TechCursor />
      <aside className="siteRail" aria-label="Portfolio navigation" data-liquid-exclude>
        <a href="#about">01</a>
        <a href="#system">02</a>
        <a href="#method">03</a>
        <a href="#side-quests">04</a>
        <a href="#resume">05</a>
        <a href="#response">06</a>
        <a href="#workstation">WS</a>
      </aside>

      <IntroExperience />
      <IntroducingTarun />
      <LivingSystem />

      <section className="chapterPlaceholder methodChapter" id="method" data-chapter>
        <div className="pageChrome">
          <span>03 / METHOD</span>
          <span>RESEARCH → BUILD → BREAK → REBUILD</span>
        </div>
        <div className="placeholderInner">
          <p className="kicker">NEXT CHAPTER / STRUCTURE LOCKED</p>
          <h2>I DON&apos;T START<br />WITH CODE.</h2>
          <h3>I START WITH A PROBLEM.</h3>
          <div className="methodRail" aria-hidden="true">
            {["PROBLEM", "OBSERVE", "RESEARCH", "PROTOTYPE", "TEST", "REBUILD", "SYSTEM"].map((item, index) => (
              <span key={item}><i>{String(index + 1).padStart(2, "0")}</i>{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="chapterPlaceholder sideQuestChapter" id="side-quests" data-chapter>
        <div className="pageChrome">
          <span>04 / SIDE QUESTS</span>
          <span>CURIOSITY OUTSIDE THE MAIN THREAD</span>
        </div>
        <div className="placeholderInner">
          <p className="kicker">PERSONAL CREATIVE SYSTEM / CONTENT TO FINALISE</p>
          <h2>SIDE<br /><em>QUESTS.</em></h2>
          <p className="placeholderCopy">
            A spatial playground for the things that do not need to become products.
          </p>
        </div>
      </section>

      <section className="chapterPlaceholder resumeChapter" id="resume" data-chapter>
        <div className="pageChrome">
          <span>05 / SYSTEM FILE</span>
          <span>RESUME / FACTS PENDING</span>
        </div>
        <div className="resumeBoard">
          <div className="paper paperHero"><small>FILE / TS-26</small><h2>RESUME</h2><p>ABOUT ME / SYSTEM FILE</p></div>
          <div className="paper paperEducation"><small>EDUCATION</small><strong>CONTENT SLOT</strong></div>
          <div className="paper paperExperience"><small>EXPERIENCE</small><strong>CONTENT SLOT</strong></div>
          <div className="paper paperSkills"><small>SYSTEMS / SKILLS</small><strong>CONTENT SLOT</strong></div>
        </div>
      </section>

      <section className="chapterPlaceholder responseChapter" id="response" data-chapter>
        <div className="codeCeiling" aria-hidden="true">
          <span>01</span><span>&amp;&amp;</span><span>{"{}"}</span><span>!=</span><span>101</span><span>&lt;/&gt;</span>
        </div>
        <div className="responsePanel" data-liquid-exclude>
          <span className="kicker">06 / RESPONSE</span>
          <h2>LEAVE YOUR<br />TRACE.</h2>
          <p>You&apos;ve seen the system. Leave a thought, critique, idea or link behind.</p>
          <div className="responseMock">
            <span>NAME / RESPONSE / LINK</span>
            <button type="button">SUBMIT RESPONSE ↗</button>
          </div>
        </div>
      </section>

      <section className="workstationChapter" id="workstation" data-chapter>
        <div className="pageChrome lightChrome">
          <span>WORKSTATION / ONLINE</span>
          <span>PROJECT INDEX / NEXT BUILD PASS</span>
        </div>
        <div className="workstationTitle">
          <span>ENTER</span>
          <h2>WORKSTATION</h2>
          <p>Main systems will open here through the 3D Works Wheel. Lab experiments sit behind it as a second layer.</p>
        </div>
      </section>
    </main>
  );
}
