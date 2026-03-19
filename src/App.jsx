import { useState, useEffect, useRef } from "react";
import "./App.css";

const NAV_LINKS = [
  { id: "hero", label: "Home" },
  { id: "biography", label: "Biography" },
  { id: "works", label: "Works" },
  { id: "legacy", label: "Legacy" },
  { id: "timeline", label: "Timeline" },
  { id: "quotes", label: "Quotes" },
];

const TIMELINE = [
  { year: "1861", title: "Born in Calamba", desc: "José Protasio Rizal Mercado y Alonso Realonda born on June 19 in Calamba, Laguna." },
  { year: "1872", title: "Execution of GOMBURZA", desc: "Deeply affected by the martyrdom of three Filipino priests, shaping his nationalist views." },
  { year: "1877", title: "Ateneo de Manila", desc: "Graduated as Bachelor of Arts with highest honors from Ateneo Municipal de Manila." },
  { year: "1882", title: "Voyage to Europe", desc: "Secretly departed for Spain to study medicine at Universidad Central de Madrid." },
  { year: "1887", title: "Noli Me Tángere", desc: "Published his landmark novel in Berlin, exposing Spanish colonial abuses in the Philippines." },
  { year: "1891", title: "El Filibusterismo", desc: "Published the darker sequel novel in Ghent, Belgium, igniting the revolutionary spirit." },
  { year: "1892", title: "La Liga Filipina", desc: "Founded the civic organization upon returning to Manila; arrested and exiled to Dapitan days later." },
  { year: "1896", title: "Martyrdom", desc: "Executed by firing squad at Bagumbayan (now Luneta Park) on December 30, at age 35." },
];

const WORKS = [
  {
    title: "Noli Me Tángere",
    year: "1887",
    type: "Novel",
    desc: "\"Touch Me Not\" — a social cancer novel depicting the suffering of Filipinos under Spanish colonial rule through the story of Juan Crisostomo Ibarra.",
    color: "#8B1A1A",
  },
  {
    title: "El Filibusterismo",
    year: "1891",
    type: "Novel",
    desc: "\"The Filibuster\" — the dark sequel following Simoun, who plots a violent revolution against the colonial establishment.",
    color: "#1A3A5C",
  },
  {
    title: "Mi Último Adiós",
    year: "1896",
    type: "Poem",
    desc: "\"My Last Farewell\" — an untitled farewell poem written the night before his execution, found hidden in his alcohol lamp.",
    color: "#2D5016",
  },
  {
    title: "Annotations on Morga",
    year: "1890",
    type: "Historical Work",
    desc: "Rizal's annotated edition of Antonio de Morga's Sucesos de las Islas Filipinas, proving pre-colonial Philippine civilization.",
    color: "#4A2C00",
  },
  {
    title: "Sa Aking mga Kabata",
    year: "1869",
    type: "Poem",
    desc: "\"To My Fellow Youth\" — attributed to Rizal at age 8, urging Filipino youth to love and embrace their native language.",
    color: "#1A2D4A",
  },
  {
    title: "La Solidaridad Articles",
    year: "1889–1895",
    type: "Essays",
    desc: "Contributed numerous essays to the reformist newspaper, advocating for equality and representation under Spanish rule.",
    color: "#3D1A4A",
  },
];

const QUOTES = [
  { text: "He who does not know how to look back at where he came from will never get to his destination.", context: "On remembering one's roots" },
  { text: "The youth is the hope of our future.", context: "On the power of the next generation" },
  { text: "It is enough for the good man to do nothing for evil to triumph.", context: "On moral responsibility" },
  { text: "I would like the Filipinos to be brilliant, enlightened, intelligent and progressive.", context: "On national aspiration" },
  { text: "I have to believe much in God because I have lost my faith in man.", context: "On disillusionment and faith" },
];

function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={`fade-in ${inView ? "visible" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function Nav({ active }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };
  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner">
        <span className="nav-brand" onClick={() => scrollTo("hero")}>RIZAL</span>
        <button className="hamburger" onClick={() => setOpen(!open)} aria-label="menu">
          <span /><span /><span />
        </button>
        <ul className={`nav-links ${open ? "open" : ""}`}>
          {NAV_LINKS.map(({ id, label }) => (
            <li key={id}>
              <button className={active === id ? "active" : ""} onClick={() => scrollTo(id)}>{label}</button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-bg">
        <div className="hero-grain" />
        <div className="hero-vignette" />
      </div>
      <div className="hero-content">
        <FadeIn delay={0}>
          <p className="hero-overline">1861 — 1896</p>
        </FadeIn>
        <FadeIn delay={150}>
          <h1 className="hero-name">José Rizal</h1>
        </FadeIn>
        <FadeIn delay={300}>
          <p className="hero-subtitle">National Hero of the Philippines</p>
        </FadeIn>
        <FadeIn delay={450}>
          <p className="hero-desc">
            Novelist. Poet. Ophthalmologist. Sculptor. Painter. Polyglot.
            <br />
            The man who moved a nation with his pen.
          </p>
        </FadeIn>
        <FadeIn delay={600}>
          <button className="hero-cta" onClick={() => document.getElementById("biography")?.scrollIntoView({ behavior: "smooth" })}>
            Discover His Story
          </button>
        </FadeIn>
      </div>
      <div className="hero-scroll-hint">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}

function Biography() {
  return (
    <section id="biography" className="section bio-section">
      <div className="container">
        <FadeIn>
          <span className="section-label">Biography</span>
          <h2 className="section-title">A Life of Extraordinary Breadth</h2>
        </FadeIn>
        <div className="bio-grid">
          <FadeIn delay={100} className="bio-portrait-col">
            <div className="bio-portrait">
              <div className="portrait-placeholder">
                <svg viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="200" height="240" fill="#1a1208"/>
                  <ellipse cx="100" cy="85" rx="42" ry="48" fill="#2d1f0e"/>
                  <ellipse cx="100" cy="85" rx="36" ry="42" fill="#3d2a12"/>
                  <path d="M58 180 Q100 155 142 180 L148 240 H52 Z" fill="#2d1f0e"/>
                  <ellipse cx="100" cy="82" rx="28" ry="32" fill="#4a3318"/>
                  <text x="100" y="220" textAnchor="middle" fill="#8b6914" fontSize="11" fontFamily="Georgia, serif" letterSpacing="2">JOSE RIZAL</text>
                  <text x="100" y="235" textAnchor="middle" fill="#5a4410" fontSize="8" fontFamily="Georgia, serif" letterSpacing="1">1861 — 1896</text>
                </svg>
              </div>
              <div className="portrait-caption">Illustrated portrait · National Hero</div>
            </div>
            <div className="bio-stats">
              <div className="stat"><span className="stat-num">22</span><span className="stat-label">Languages spoken</span></div>
              <div className="stat"><span className="stat-num">35</span><span className="stat-label">Years of life</span></div>
              <div className="stat"><span className="stat-num">2</span><span className="stat-label">Landmark novels</span></div>
            </div>
          </FadeIn>
          <FadeIn delay={200} className="bio-text-col">
            <p className="bio-lead">
              José Protasio Rizal Mercado y Alonso Realonda was born on June 19, 1861, in Calamba, Laguna — the seventh of eleven children in a prosperous ilustrado family.
            </p>
            <p>
              From an early age, his intellectual gifts were undeniable. By age 3 he could read; by 8, he had written a poem. He excelled at Ateneo de Manila before traveling secretly to Europe in 1882, where he earned degrees in medicine, philosophy, and letters from Spanish and German universities.
            </p>
            <p>
              In Europe, Rizal moved among the most enlightened minds of his era, mastering science, art, and literature — all while channeling his gifts toward one burning purpose: awakening Filipino national consciousness. He wrote, sculpted, sketched, and corresponded tirelessly, building a vision of a sovereign and dignified Philippines.
            </p>
            <p>
              His novels — <em>Noli Me Tángere</em> (1887) and <em>El Filibusterismo</em> (1891) — ignited a revolutionary movement. The colonial authorities feared his pen more than any weapon. Exiled to Dapitan in Mindanao, he continued to practice medicine, teach the youth, and conduct scientific research.
            </p>
            <p>
              Falsely accused of sedition when the revolution broke out, he was executed by firing squad on December 30, 1896 — becoming the martyr whose death unified the Filipino people and made independence inevitable.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function Works() {
  const [active, setActive] = useState(0);
  return (
    <section id="works" className="section works-section">
      <div className="container">
        <FadeIn>
          <span className="section-label">Literary and Scholarly Works</span>
          <h2 className="section-title">The Written Revolution</h2>
        </FadeIn>
        <div className="works-grid">
          {WORKS.map((w, i) => (
            <FadeIn key={i} delay={i * 80}>
              <div
                className={`work-card ${active === i ? "work-card--active" : ""}`}
                onClick={() => setActive(i)}
                style={{ "--accent": w.color }}
              >
                <div className="work-card-top">
                  <span className="work-type">{w.type}</span>
                  <span className="work-year">{w.year}</span>
                </div>
                <h3 className="work-title">{w.title}</h3>
                <p className="work-desc">{w.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Legacy() {
  const items = [
    { icon: "⚖", title: "National Hero", desc: "Officially proclaimed the national hero of the Philippines by the American colonial administration in 1901 — a status cemented in the Filipino identity forever." },
    { icon: "📚", title: "Education Reform", desc: "His advocacy for universal education and the use of native languages in schooling laid the philosophical groundwork for the modern Philippine education system." },
    { icon: "🏛", title: "Rizal Law (1956)", desc: "Republic Act No. 1425 mandates the teaching of Rizal's life and works in all Philippine schools — ensuring his thought lives in every generation." },
    { icon: "🌍", title: "Global Recognition", desc: "Monuments of Rizal stand in cities worldwide — from Madrid to Chicago to Tokyo — honoring him as one of Asia's greatest intellectuals and freedom fighters." },
    { icon: "🔬", title: "Man of Science", desc: "As a practicing ophthalmologist, he restored sight to his own mother. He also conducted ethnological and zoological research, with species named after him." },
    { icon: "✍", title: "Literary Influence", desc: "His novels catalyzed the Propaganda Movement, inspired Andres Bonifacio's revolution, and remain among the most important texts in Southeast Asian literature." },
  ];
  return (
    <section id="legacy" className="section legacy-section">
      <div className="container">
        <FadeIn>
          <span className="section-label">Enduring Impact</span>
          <h2 className="section-title">A Legacy That Outlived an Empire</h2>
        </FadeIn>
        <div className="legacy-grid">
          {items.map((item, i) => (
            <FadeIn key={i} delay={i * 70}>
              <div className="legacy-card">
                <span className="legacy-icon">{item.icon}</span>
                <h3 className="legacy-card-title">{item.title}</h3>
                <p className="legacy-card-desc">{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Timeline() {
  return (
    <section id="timeline" className="section timeline-section">
      <div className="container">
        <FadeIn>
          <span className="section-label">Chronology</span>
          <h2 className="section-title">A Life in Time</h2>
        </FadeIn>
        <div className="timeline">
          {TIMELINE.map((item, i) => (
            <FadeIn key={i} delay={i * 90}>
              <div className={`tl-item ${i % 2 === 0 ? "tl-left" : "tl-right"}`}>
                <div className="tl-content">
                  <span className="tl-year">{item.year}</span>
                  <h3 className="tl-title">{item.title}</h3>
                  <p className="tl-desc">{item.desc}</p>
                </div>
                <div className="tl-dot" />
              </div>
            </FadeIn>
          ))}
          <div className="tl-line" />
        </div>
      </div>
    </section>
  );
}

function Quotes() {
  const [current, setCurrent] = useState(0);
  const next = () => setCurrent((c) => (c + 1) % QUOTES.length);
  const prev = () => setCurrent((c) => (c - 1 + QUOTES.length) % QUOTES.length);
  const q = QUOTES[current];
  return (
    <section id="quotes" className="section quotes-section">
      <div className="container">
        <FadeIn>
          <span className="section-label">In His Own Words</span>
          <h2 className="section-title">Quotes</h2>
        </FadeIn>
        <FadeIn delay={100}>
          <div className="quotes-carousel">
            <button className="q-btn q-btn--prev" onClick={prev} aria-label="previous">&#8249;</button>
            <div className="quote-display">
              <div className="quote-mark">&ldquo;</div>
              <blockquote key={current} className="quote-text">{q.text}</blockquote>
              <p className="quote-context">— {q.context}</p>
              <div className="quote-dots">
                {QUOTES.map((_, i) => (
                  <button key={i} className={`qdot ${i === current ? "qdot--active" : ""}`} onClick={() => setCurrent(i)} />
                ))}
              </div>
            </div>
            <button className="q-btn q-btn--next" onClick={next} aria-label="next">&#8250;</button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer-name">José Rizal</p>
        <p className="footer-dates">June 19, 1861 — December 30, 1896</p>
        <p className="footer-motto">"Ang hindi marunong lumingon sa pinanggalingan ay hindi makararating sa paroroonan."</p>
        <p className="footer-credit">A tribute site · Built with React</p>
      </div>
    </footer>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const sections = NAV_LINKS.map(({ id }) => document.getElementById(id)).filter(Boolean);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { threshold: 0.4 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <Nav active={activeSection} />
      <main>
        <Hero />
        <Biography />
        <Works />
        <Legacy />
        <Timeline />
        <Quotes />
      </main>
      <Footer />
    </>
  );
}
