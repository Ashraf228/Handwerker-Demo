import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LeadForm from "./LeadForm.jsx";
import "./App.css";

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=80", // Handwerker/Service
  service1: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=80", // Werkzeug/Arbeit
  service2: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=1400&q=80",
  service3: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80", // Haus/Modern
};


function LandingPage() {
  return (
    <div className="page">
      <Topbar />
      <Hero />
      <Services />
      <HowItWorks />
      <EmbedBlockSection />
      <Footer />
      <FloatingCTA />
    </div>
  );
}

function AnfragePage() {
  return (
    <div className="page">
      <Topbar />
      <main className="container section">
        <h1 className="h1">Anfrage stellen</h1>
        <p className="muted">
          Bitte kurz ausfüllen – wir melden uns zeitnah zurück.
        </p>
        <div className="card" style={{ padding: 18 }}>
          <LeadForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/anfrage" element={<AnfragePage />} />
      </Routes>
    </BrowserRouter>
  );
}

/* ---------- Layout Sections ---------- */

function Topbar() {
  return (
    <header className="topbar">
      <div className="container topbarInner">
        <div className="brand">
          <div className="logoMark" />
          <div>
            <div className="brandName">Müller Heizung & Sanitär</div>
            <div className="brandSub">Meisterbetrieb · Limburg a. d. Lahn</div>
          </div>
        </div>

        <nav className="nav">
          <a href="#leistungen">Leistungen</a>
          <a href="#ablauf">Ablauf</a>
          <a href="#kontakt">Kontakt</a>
          <Link className="btn btnPrimary" to="/anfrage">
            Anfrage
          </Link>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="container heroGrid">
        <div>
          <h1 className="h1">
            Heizung, Sanitär & Wartung – sauber geplant, schnell erledigt.
          </h1>
          <p className="lead">
            Zuverlässige Reparaturen, Modernisierung und Service.
            Für Limburg und Umgebung.
          </p>

          <div className="heroCtas">
            <Link className="btn btnPrimary" to="/anfrage">
              Anfrage in 1 Minute
            </Link>
            <DemoModalCTA />
            <a className="btn btnGhost" href="tel:+496431000000">
              Sofort anrufen
            </a>
          </div>

          <div className="trustRow">
            <div className="trustItem">⏱️ Rückmeldung meist am selben Tag</div>
            <div className="trustItem">🛠️ Meisterbetrieb</div>
            <div className="trustItem">📍 Regional</div>
          </div>
        </div>

        <div className="heroVisual card">
          {/* KORREKTUR: className statt clasName */}
          <img 
            src={IMAGES.hero} 
            alt="Installateur bei der Arbeit an einer modernen Heizungsanlage" 
            className="heroVisualImg"
          />
          <div className="heroVisualOverlay">
            <div className="badge">24/7 Anfrage möglich</div>
            <div className="mutedSmall">Limburg + 30 km</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="leistungen" className="section">
      <div className="container">
        <h2 className="h2">Leistungen</h2>
        <p className="muted">
          Typische Aufträge, die wir täglich umsetzen.
        </p>

        <div className="grid3">
          <div className="card serviceCard">
            <img 
              src={IMAGES.service1} 
              alt="Installateur repariert eine Heizungspumpe" 
              loading="lazy"
              className="serviceCardImg"
            />
            <div className="pad">
              <h3 className="h3">Reparatur & Störung</h3>
              <p className="muted">
                Heizung kalt, Druckverlust, tropfende Armaturen, Verstopfungen.
              </p>
            </div>
          </div>

          <div className="card serviceCard">
            <img 
              src={IMAGES.service2} 
              alt="Wartungscheck an einem modernen Heizkessel" 
              loading="lazy"
              className="serviceCardImg"
            />
            <div className="pad">
              <h3 className="h3">Wartung</h3>
              <p className="muted">
                Regelmäßige Wartung verlängert die Lebensdauer und spart Kosten.
              </p>
            </div>
          </div>

          <div className="card serviceCard">
            <img 
              src={IMAGES.service3} 
              alt="Neues modernes Badezimmer nach Sanierung" 
              loading="lazy"
              className="serviceCardImg"
            />
            <div className="pad">
              <h3 className="h3">Modernisierung</h3>
              <p className="muted">
                Badumbau, neue Heizungsanlage, Sanitär-Installation, Beratung.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="ablauf" className="section alt">
      <div className="container">
        <h2 className="h2">So läuft’s ab</h2>
        <div className="steps">
          <div className="step card pad">
            <div className="stepNo">1</div>
            <h3 className="h3">Anfrage stellen</h3>
            <p className="muted">
              Kurz Problem, Dringlichkeit, Ort und Kontaktdaten angeben.
            </p>
          </div>
          <div className="step card pad">
            <div className="stepNo">2</div>
            <h3 className="h3">Rückmeldung</h3>
            <p className="muted">
              Wir prüfen und melden uns mit Termin/Rückfrage.
            </p>
          </div>
          <div className="step card pad">
            <div className="stepNo">3</div>
            <h3 className="h3">Umsetzung</h3>
            <p className="muted">
              Saubere Ausführung – transparent und nachvollziehbar.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 3 Einbau-Optionen Demonstration ---------- */

function EmbedBlockSection() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="h2">3 Einbau-Optionen für die Anfrage</h2>
        <p className="muted">
          So könnte das System auf Ihrer Website integriert werden.
        </p>

        <div className="grid3">
          <div className="card pad">
            <h3 className="h3">Option 1: Eigene Seite</h3>
            <p className="muted">
              Sauberer Ablauf über <code>/anfrage</code>. Ideal für Navigation
              und Weiterleitung.
            </p>
            <Link className="btn btnPrimary" to="/anfrage">
              Seite öffnen
            </Link>
          </div>

          <div className="card pad">
            <h3 className="h3">Option 2: Eingebettet</h3>
            <p className="muted">
              Formular als Abschnitt auf der Start-/Kontaktseite.
              Sehr niedrigschwellig.
            </p>
            <a className="btn btnGhost" href="#eingebettet">
              Zum Abschnitt
            </a>
          </div>

          <div className="card pad">
            <h3 className="h3">Option 3: Popup</h3>
            <p className="muted">
              Button öffnet ein Modal mit Formular. Gut, wenn man die Seite
              schlank halten will.
            </p>
            <DemoModalCTA buttonText="Popup testen" />
          </div>
        </div>

        {/* OPTION 2: Embedded Form Block */}
        <div id="eingebettet" className="embedWrap">
          <div className="embedLeft">
            <h3 className="h3">Eingebettete Anfrage</h3>
            <p className="muted">
              Beispiel: Kunde bleibt auf der Seite und füllt direkt aus.
            </p>
            <ul className="list">
              <li>Weniger Telefon-Pingpong</li>
              <li>Vorqualifizierte Infos (Ort, Dringlichkeit, Problem)</li>
              <li>Sofort als Mail/Ticket beim Betrieb</li>
            </ul>
          </div>
          <div className="embedRight card pad">
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Modal (Option 3) ---------- */

function DemoModalCTA({ buttonText = "Anfrage als Popup" }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="btn btnGhost" onClick={() => setOpen(true)}>
        {buttonText}
      </button>

      {open && (
        <div className="modalOverlay" onMouseDown={() => setOpen(false)}>
          <div className="modalCard" onMouseDown={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <div>
                <div className="modalTitle">Anfrage</div>
                <div className="mutedSmall">
                  Kurze Angaben – wir melden uns zeitnah.
                </div>
              </div>
              <button className="iconBtn" onClick={() => setOpen(false)}>
                ✕
              </button>
            </div>
            <div className="modalBody">
              <LeadForm />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ---------- Floating CTA (optional, wirkt sehr real) ---------- */

function FloatingCTA() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="floatingBtn" onClick={() => setOpen(true)}>
        Anfrage
      </button>

      {open && (
        <div className="modalOverlay" onMouseDown={() => setOpen(false)}>
          <div className="modalCard" onMouseDown={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <div>
                <div className="modalTitle">Schnellanfrage</div>
                <div className="mutedSmall">In 60 Sekunden erledigt.</div>
              </div>
              <button className="iconBtn" onClick={() => setOpen(false)}>
                ✕
              </button>
            </div>
            <div className="modalBody">
              <LeadForm />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Footer() {
  return (
    <footer id="kontakt" className="footer">
      <div className="container footerGrid">
        <div>
          <div className="brandName">Müller Heizung & Sanitär</div>
          <div className="mutedSmall">Meisterbetrieb · Limburg a. d. Lahn</div>
        </div>
        <div>
          <div className="footerTitle">Kontakt</div>
          <div className="mutedSmall">Telefon: 06431 000000</div>
          <div className="mutedSmall">E-Mail: info@mueller-demo.de</div>
        </div>
        <div>
          <div className="footerTitle">Hinweis</div>
          <div className="mutedSmall">
            Demo-Seite. Daten werden nur zur Bearbeitung der Anfrage verarbeitet.
          </div>
        </div>
      </div>
    </footer>
  );
}
