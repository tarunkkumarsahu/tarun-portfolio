export default function Home() {
  return (
    <main>
      <section className="hero" id="top">
        <header className="nav wrap">
          <a className="brand" href="#top">TS<span>26</span></a>
          <nav>
            <a href="#work">WORK</a>
            <a href="#station">STATION</a>
            <a href="#lab">LAB</a>
            <a href="#contact">CONTACT</a>
          </nav>
          <span className="status">INDIA / BUILDING</span>
        </header>

        <div className="heroStage wrap">
          <p className="eyebrow">SOFTWARE ENGINEER · AI & BACKEND DEVELOPER</p>
          <h1>
            <span>TARUN</span>
            <em>KUMAR SAHU</em>
          </h1>
          <div className="heroBottom">
            <div><small>THE TARUN / 01</small><p>I build systems that think, connect and act.</p></div>
            <div><strong>NOT ONE ROLE.</strong><p>Software → intelligence → machines → experiments.</p></div>
            <a href="#manifesto">ENTER ↘</a>
          </div>
        </div>
      </section>

      <section className="manifesto dark" id="manifesto">
        <div className="wrap manifestoGrid">
          <span className="index">001 / MANIFESTO</span>
          <div>
            <p className="micro">I&apos;M INTERESTED IN THE POINT WHERE</p>
            <h2>SOFTWARE<br/>STOPS<br/>BEING <em>just software.</em></h2>
          </div>
          <p className="aside">The interface matters. The architecture matters more. I care about the point where code becomes a real system.</p>
        </div>
      </section>

      <section className="work dark" id="work">
        <div className="wrap">
          <div className="sectionHead">
            <span className="index">002 / SELECTED SYSTEMS</span>
            <h2>Work in <em>motion.</em></h2>
            <p>Four systems. Different problems. One obsession: making ideas behave in the real world.</p>
          </div>

          <div className="projects">
            <article><span>01</span><div><small>PERSONAL AI SYSTEM</small><h3>JARVIS OS</h3><p>Agents, context and tool execution inside a personal AI environment.</p></div><b>J</b><a href="#contact">↗</a></article>
            <article><span>02</span><div><small>AGRI ROBOTICS</small><h3>WEED REMOVAL ROBOT</h3><p>Perception, navigation and mechanical action for precision weed removal.</p></div><b>W</b><a href="#contact">↗</a></article>
            <article><span>03</span><div><small>SENSOR FUSION</small><h3>FRESHFUSION</h3><p>Image, gas and environmental sensing combined into one quality decision layer.</p></div><b>F</b><a href="#contact">↗</a></article>
            <article><span>04</span><div><small>CONNECTED SAFETY</small><h3>SMART SAFETY WRISTBAND</h3><p>Emergency signalling, location and response in a connected wearable system.</p></div><b>S</b><a href="#contact">↗</a></article>
          </div>
        </div>
      </section>

      <section className="station" id="station">
        <div className="wrap stationGrid">
          <div><span className="index">003 / WORKSTATION</span><h2>Still<br/><em>building.</em></h2></div>
          <div className="board">
            <p><span>NOW BUILDING</span><strong>JARVIS OS</strong></p>
            <p><span>RESEARCHING</span><strong>PRECISION WEED REMOVAL</strong></p>
            <p><span>EXPLORING</span><strong>AGENTIC AI SYSTEMS</strong></p>
            <p><span>STATUS</span><strong>BUILDING</strong></p>
          </div>
        </div>
      </section>

      <section className="lab dark" id="lab">
        <div className="wrap">
          <div className="sectionHead">
            <span className="index">004 / THE LAB</span>
            <h2>Small ideas.<br/><em>Strange tests.</em></h2>
            <p>Not everything needs to become a product. Some things exist to answer a question.</p>
          </div>
          <div className="labList">
            <p><span>01</span><strong>MOTION CONTROLLER</strong><small>EXPERIMENT</small><b>↗</b></p>
            <p><span>02</span><strong>PLAY WITH YOUR MIND</strong><small>EXPERIMENT</small><b>↗</b></p>
            <p><span>03</span><strong>RAMADAN PEN</strong><small>EXPERIMENT</small><b>↗</b></p>
            <p><span>04</span><strong>EMBEDDED LAB</strong><small>EXPERIMENT</small><b>↗</b></p>
          </div>
        </div>
      </section>

      <section className="contact dark" id="contact">
        <div className="wrap">
          <span className="index">005 / OPEN CHANNEL</span>
          <h2>LET&apos;S BUILD<br/><em>SOMETHING AMBITIOUS.</em></h2>
          <footer>
            <p>Open to collaborations, technical conversations and interesting engineering problems.</p>
            <div>
              <a href="https://github.com/tarunkkumarsahu">GITHUB ↗</a>
              <a href="https://www.linkedin.com/in/tarunnsahuu/">LINKEDIN ↗</a>
            </div>
          </footer>
        </div>
      </section>
    </main>
  );
}
