import React, { useEffect, useMemo, useState } from "react";
import { ArrowRight, Check, Mail, MapPin, Menu, Phone, Printer, Ruler, X } from "lucide-react";
import { ConceptWidget, StudioCredit } from "./concept.jsx";
import logo from "./assets/pf-logo.png";

// ---------------------------------------------------------------- Content (all facts from premierflexipac.com)
const COMPANY = "Premier Flexipac";
const ABBR = "pf";
const END_DATE = "2026-12-12T23:59:59-06:00";
const PHONE = "903-581-5405";
const PHONE_HREF = "tel:+19035815405";
const FAX = "903-581-5436";
const EMAIL = "bob@premierflexipac.com";
const ADDRESS = ["2160 Deerbrook Dr.", "Tyler, TX 75703"];
const MAP_URL = "https://www.google.com/maps/search/?api=1&query=2160+Deerbrook+Dr+Tyler+TX+75703";
const MAX_W = 60;
const MAX_L = 250;

const REASONS = [
  ["Experience", "In business since the '70s, so we'll be here for you as your business grows."],
  ["Innovation", "We keep up with your changing industry by developing new types of packaging."],
  ["Any order size", "Large and small companies alike. We fill orders from a few pieces to truckloads every month."],
  ["National & international", "Distributors throughout the US and abroad, as well as direct to the customer."],
  ["Low cost", "Flexible packaging at a cost below major competitors. Streamlined operations keep the final cost down."],
];

const PRODUCTS = [
  { id: "pallet", name: "Pallet Guards", aka: "Slip sheets", text: "Slip sheets laid down on a pallet to protect your product from damage caused by the pallet itself." },
  { id: "bumper", name: "Bumper Wraps", aka: "Bumper bags · bumper pads", text: "Laminated sheets of paper, plastic, fabric and/or foam that wrap automotive bumpers and other body parts for storage and shipping." },
  { id: "furniture", name: "Furniture Pads", aka: "Transit pads", text: "Laminated sheets of different substrates that protect furniture while it's in transit." },
  { id: "pipe", name: "Pipe Wrap", aka: "Scratch protection", text: "Keeps pipe scratch-free in transport, which is hard to do when the pipe's own weight works against you." },
  { id: "machine", name: "Machine Wraps", aka: "Any shape", text: "Protects machinery from dents, scratches and abrasion on its way to the customer or store, whatever shape the equipment is." },
  { id: "grille", name: "Grille Guard Wraps", aka: "Heavy & bulky", text: "A package built for heavy, bulky truck grille guards so they arrive undamaged from storage and shipping." },
  { id: "bag", name: "Bags & Pouches", aka: "Multi-wall · up to 60\" × 250\"", text: "Multi-wall bags and pouches for hoods, fenders, sheet metal and headlights, with protective linings." },
];

const LININGS = ["Valeron", "Tyvek", "Non-woven fabric", "Plastic film"];
const LAYERS = [
  ["Paper", "kraft"],
  ["Plastic film", "film"],
  ["Fabric", "fabric"],
  ["Foam", "foam"],
];

// ---------------------------------------------------------------- Product line icons (die-line style)
function DieIcon({ id }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
  const cut = { ...common, strokeDasharray: "5 4" };
  const shapes = {
    pallet: (<><rect x="10" y="40" width="60" height="8" {...common} /><path d="M14 48v10M40 48v10M66 48v10M10 58h60" {...common} /><path d="M8 34h64" {...cut} /><rect x="22" y="14" width="36" height="20" {...common} /></>),
    bumper: (<><path d="M8 44c0-12 10-20 32-20s32 8 32 20" {...common} /><path d="M8 44h64v6H8z" {...common} /><path d="M4 40c2-18 16-26 36-26s34 8 36 26" {...cut} /></>),
    furniture: (<><path d="M16 26h48v20H16zM12 46h56v8H12zM18 54v8M62 54v8" {...common} /><path d="M10 22h60v34H10z" {...cut} /></>),
    pipe: (<><ellipse cx="16" cy="40" rx="8" ry="12" {...common} /><path d="M16 28h50M16 52h50" {...common} /><ellipse cx="66" cy="40" rx="8" ry="12" {...common} /><path d="M28 24v32M42 24v32M56 24v32" {...cut} /></>),
    machine: (<><rect x="14" y="22" width="34" height="32" {...common} /><circle cx="31" cy="38" r="8" {...common} /><path d="M48 30h16v24H48M20 54v6M42 54v6" {...common} /><path d="M8 16h62v48H8z" {...cut} /></>),
    grille: (<><path d="M14 20h52v30c0 6-6 10-12 10H26c-6 0-12-4-12-10z" {...common} /><path d="M26 20v40M40 20v40M54 20v40" {...common} /><path d="M8 14h64v52H8z" {...cut} /></>),
    bag: (<><path d="M18 14h44v52H18z" {...common} /><path d="M18 22h44" {...cut} /><path d="M24 30h32M24 38h32M24 46h20" {...common} opacity=".5" /></>),
  };
  return <svg viewBox="0 0 80 76" aria-hidden="true" className="die-icon">{shapes[id]}</svg>;
}

// ---------------------------------------------------------------- Sections
function Header() {
  const [open, setOpen] = useState(false);
  const links = [["#products", "Products"], ["#sizer", "Bag sizes"], ["#why", "Why us"], ["#about", "About"], ["#quote", "Request a quote"]];
  return (
    <header className="site-header">
      <div className="wrap header-row">
        <a href="#top" className="brand" aria-label="Premier Flexipac home">
          <img src={logo} alt="" width="40" height="44" />
          <span className="brand-word">PREMIER<br />FLEXIPAC</span>
        </a>
        <nav className={`nav${open ? " is-open" : ""}`} aria-label="Main">
          {links.map(([href, label]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
          <a className="nav-phone" href={PHONE_HREF}><Phone size={16} /> {PHONE}</a>
        </nav>
        <button className="menu-btn" type="button" onClick={() => setOpen((v) => !v)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}

function LayerStack() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive((i) => (i + 1) % LAYERS.length), 2200);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="stack" aria-label="A laminated sheet built from paper, plastic film, fabric and foam">
      <div className="stack-layers">
        {LAYERS.map(([name, cls], i) => (
          <div key={name} className={`layer layer-${cls}${i === active ? " is-active" : ""}`} style={{ "--i": i }} />
        ))}
      </div>
      <ol className="stack-legend">
        {LAYERS.map(([name, cls], i) => (
          <li key={name} className={i === active ? "is-active" : ""}><i className={`sw layer-${cls}`} />{String(i + 1).padStart(2, "0")} {name}</li>
        ))}
      </ol>
      <p className="stack-cap">Laminated to the job: paper, plastic, fabric and/or foam</p>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="tag">Flexible packaging converter · Tyler, Texas</p>
          <h1>Packaging that <em>wraps</em> to the shape of what you ship.</h1>
          <p className="lede">Premier Flexipac converts paper, plastic film, fabric and foam into pallet guards, bumper wraps, furniture pads, machine wraps and custom bags. A few pieces or a truckload a month, priced below the majors.</p>
          <div className="hero-actions">
            <a className="btn btn-cyan" href="#quote">Request a quote <ArrowRight size={18} /></a>
            <a className="btn btn-line" href={PHONE_HREF}><Phone size={18} /> {PHONE}</a>
          </div>
          <dl className="hero-stats">
            <div><dt>'70s</dt><dd>family-run since</dd></div>
            <div><dt>7</dt><dd>product lines</dd></div>
            <div><dt>60″×250″</dt><dd>max bag size</dd></div>
          </dl>
        </div>
        <LayerStack />
      </div>
      <div className="perf" aria-hidden="true" />
    </section>
  );
}

function Products() {
  const [sel, setSel] = useState(PRODUCTS[0].id);
  const current = PRODUCTS.find((p) => p.id === sel);
  return (
    <section className="products" id="products">
      <div className="wrap">
        <div className="sec-head">
          <p className="tag">What we make</p>
          <h2>Seven ways to keep a part from getting scratched.</h2>
          <p>Most of our work grew up in automotive packaging: bumpers, hoods, fenders, grille guards. The same laminates protect furniture, pipe and machinery.</p>
        </div>
        <div className="prod-layout">
          <ul className="prod-list" role="tablist" aria-label="Products">
            {PRODUCTS.map((p, i) => (
              <li key={p.id}>
                <button type="button" role="tab" aria-selected={sel === p.id} className={sel === p.id ? "is-on" : ""} onClick={() => setSel(p.id)}>
                  <span className="num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="pname">{p.name}</span>
                  <ArrowRight size={16} />
                </button>
              </li>
            ))}
          </ul>
          <article className="prod-card" role="tabpanel" aria-live="polite">
            <div className="crop" aria-hidden="true"><i /><i /><i /><i /></div>
            <DieIcon id={current.id} />
            <p className="aka">{current.aka}</p>
            <h3>{current.name}</h3>
            <p>{current.text}</p>
            {current.id === "bag" && (
              <ul className="linings">{LININGS.map((l) => <li key={l}><Check size={15} /> {l} lining</li>)}</ul>
            )}
            <a className="text-link" href="#quote" onClick={() => document.dispatchEvent(new CustomEvent("pf-product", { detail: current.name }))}>Quote {current.name.toLowerCase()} <ArrowRight size={16} /></a>
          </article>
        </div>
      </div>
    </section>
  );
}

function Sizer() {
  const [w, setW] = useState(24);
  const [l, setL] = useState(48);
  const fits = w > 0 && l > 0 && w <= MAX_W && l <= MAX_L;
  const scale = useMemo(() => ({ w: Math.min(w, MAX_W) / MAX_W, l: Math.min(l, MAX_L) / MAX_L }), [w, l]);
  return (
    <section className="sizer" id="sizer">
      <div className="wrap sizer-grid">
        <div>
          <p className="tag tag-light">Bags &amp; pouches</p>
          <h2>Will it fit in one of our bags?</h2>
          <p>Every bag and pouch can be made up to <strong>60″ wide by 250″ long</strong>. Put in your part's measurements to check.</p>
          <div className="sizer-inputs">
            <label>Width (in)<input type="number" min="1" max="400" value={w} onChange={(e) => setW(Number(e.target.value))} /></label>
            <span aria-hidden="true">×</span>
            <label>Length (in)<input type="number" min="1" max="600" value={l} onChange={(e) => setL(Number(e.target.value))} /></label>
          </div>
          <p className={`verdict${fits ? " ok" : " no"}`} role="status">
            {fits ? <>Yes, a {w}″ × {l}″ bag is within our range.</> : <>That's past 60″ × 250″. Call us; a custom wrap may be the answer.</>}
          </p>
        </div>
        <div className="sizer-viz" aria-hidden="true">
          <div className="max-box">
            <span className="dim dim-w">60″</span>
            <span className="dim dim-l">250″</span>
            <div className={`your-box${fits ? "" : " over"}`} style={{ width: `${Math.max(scale.l * 100, 3)}%`, height: `${Math.max(scale.w * 100, 6)}%` }}>
              <span>{w}″ × {l}″</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Why() {
  return (
    <section className="why" id="why">
      <div className="wrap">
        <div className="sec-head">
          <p className="tag">Why us</p>
          <h2>Five reasons to make us your primary flexible packaging supplier.</h2>
        </div>
        <ol className="reasons">
          {REASONS.map(([title, text], i) => (
            <li key={title}><span className="rnum">{i + 1}</span><h3>{title}</h3><p>{text}</p></li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="about" id="about">
      <div className="wrap about-grid">
        <div className="about-mark"><img src={logo} alt="Premier Flexipac logo" width="250" height="275" loading="lazy" /></div>
        <div>
          <p className="tag">Who we are</p>
          <h2>A family-owned converter with a long history in automotive packaging.</h2>
          <p>Premier Flexipac is owned and operated by Bob and Judy Schmoker as a small business. As demand for better packing grows, we keep investing in new equipment, expanding into new markets and improving our stocking and delivery service.</p>
          <p>No matter what equipment a company has, if the team isn't committed to producing the best product, it won't succeed. We take pride in development and in meeting our customers' needs, and we give back to our community and support local and national organizations.</p>
          <div className="people">
            <div><h3>Bob Schmoker</h3><p className="role">President</p><p>Started Premier Flexipac in the '70s and runs daily operations.</p></div>
            <div><h3>Judy Schmoker</h3><p className="role">Vice President</p><p>Handles the accounting side of the business.</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Quote() {
  const [status, setStatus] = useState("idle");
  const [form, setForm] = useState({ name: "", company: "", phone: "", email: "", product: "", quantity: "", size: "", notes: "", website: "" });
  useEffect(() => {
    const h = (e) => setForm((f) => ({ ...f, product: e.detail }));
    document.addEventListener("pf-product", h);
    return () => document.removeEventListener("pf-product", h);
  }, []);
  const up = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  async function submit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const d = await r.json().catch(() => ({}));
      setStatus(d.success ? (d.demo ? "demo" : "sent") : "error");
    } catch { setStatus("demo"); }
  }
  return (
    <section className="quote" id="quote">
      <div className="wrap quote-grid">
        <div className="quote-info">
          <p className="tag tag-light">Request a quote</p>
          <h2>Tell us what you ship.</h2>
          <p>Send the part, the size and how many you need. Bob will get back to you with options and pricing.</p>
          <ul className="contact-list">
            <li><Phone size={18} /><a href={PHONE_HREF}>{PHONE}</a></li>
            <li><Printer size={18} /><span>Fax {FAX}</span></li>
            <li><Mail size={18} /><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
            <li><MapPin size={18} /><a href={MAP_URL} target="_blank" rel="noopener noreferrer">{ADDRESS.join(", ")}</a></li>
          </ul>
        </div>
        {status === "sent" || status === "demo" ? (
          <div className="quote-form done" role="status">
            <Check size={36} />
            <h3>{status === "sent" ? "Thanks, your request is in." : "Thanks!"}</h3>
            <p>{status === "demo" ? `This concept's form isn't connected yet. Please call ${PHONE} or email ${EMAIL}.` : "We'll be in touch shortly."}</p>
          </div>
        ) : (
          <form className="quote-form" onSubmit={submit}>
            <div className="row2">
              <label>Name *<input required value={form.name} onChange={(e) => up("name", e.target.value)} autoComplete="name" /></label>
              <label>Company<input value={form.company} onChange={(e) => up("company", e.target.value)} autoComplete="organization" /></label>
            </div>
            <div className="row2">
              <label>Phone *<input required type="tel" value={form.phone} onChange={(e) => up("phone", e.target.value)} autoComplete="tel" /></label>
              <label>Email<input type="email" value={form.email} onChange={(e) => up("email", e.target.value)} autoComplete="email" /></label>
            </div>
            <label>Product
              <select value={form.product} onChange={(e) => up("product", e.target.value)}>
                <option value="">Choose one...</option>
                {PRODUCTS.map((p) => <option key={p.id}>{p.name}</option>)}
                <option>Something custom</option>
              </select>
            </label>
            <div className="row2">
              <label>Quantity<select value={form.quantity} onChange={(e) => up("quantity", e.target.value)}>
                <option value="">Choose...</option><option>A few pieces</option><option>Hundreds</option><option>Thousands</option><option>Truckload / monthly</option>
              </select></label>
              <label>Part size<input value={form.size} onChange={(e) => up("size", e.target.value)} placeholder='e.g. 24" × 72"' /></label>
            </div>
            <label>Notes<textarea rows={3} value={form.notes} onChange={(e) => up("notes", e.target.value)} placeholder="Substrate, lining, how it ships..." /></label>
            <div className="hp" aria-hidden="true"><label>Website<input tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => up("website", e.target.value)} /></label></div>
            {status === "error" && <p className="err" role="alert">That didn't send. Please call {PHONE}.</p>}
            <button className="btn btn-cyan" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending..." : "Send quote request"} <Ruler size={18} /></button>
          </form>
        )}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap foot-grid">
        <div className="foot-brand">
          <span className="logo-plate"><img src={logo} alt="Premier Flexipac" width="44" height="48" loading="lazy" /></span>
          <p><strong>Premier Flexipac</strong><br />Flexible packaging solutions</p>
        </div>
        <div><h4>Visit</h4><p>{ADDRESS[0]}<br />{ADDRESS[1]}</p></div>
        <div><h4>Call</h4><p><a href={PHONE_HREF}>{PHONE}</a><br />Fax {FAX}</p></div>
        <div><h4>Email</h4><p><a href={`mailto:${EMAIL}`}>{EMAIL}</a></p></div>
      </div>
      <div className="wrap foot-base">
        <span>© {new Date().getFullYear()} Premier Flexipac · Independent concept, not for official use</span>
        <StudioCredit />
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Products />
        <Sizer />
        <Why />
        <About />
        <Quote />
      </main>
      <Footer />
      <ConceptWidget company={COMPANY} abbr={ABBR} endDate={END_DATE} />
    </>
  );
}
