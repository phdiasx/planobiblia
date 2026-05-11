"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function useFadeIn() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

function BookIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 6c0-1.1.9-2 2-2h7a2 2 0 0 1 2 2v13H4a2 2 0 0 1-2-2V6Z"/>
      <path d="M13 6c0-1.1.9-2 2-2h5a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-7V6Z"/>
      <path d="M13 19v-6"/>
    </svg>
  );
}

const STEPS = [
  {
    num: "01",
    title: "Escolha os livros",
    desc: "Selecione qualquer combinação — de um único livro a toda a Bíblia. Protestante (66) ou Católica (73 livros).",
  },
  {
    num: "02",
    title: "Configure o ritmo",
    desc: "Defina quantos capítulos ler por dia, a data de início e personalize dias específicos da semana.",
  },
  {
    num: "03",
    title: "Baixe o PDF",
    desc: "Gere um cronograma bonito com 4 modelos visuais, pronto para imprimir e usar no dia a dia.",
  },
];

const FEATURES = [
  {
    title: "Você escolhe o que ler",
    desc: "Nenhum plano engessado. Selecione exatamente os livros que quer percorrer — desde um Evangelho até toda a Bíblia, na ordem que preferir.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
        <path d="M2 6c0-1.1.9-2 2-2h7a2 2 0 0 1 2 2v13H4a2 2 0 0 1-2-2V6Z"/>
        <path d="M13 6c0-1.1.9-2 2-2h5a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-7V6Z"/>
        <path d="M13 19v-6"/>
      </svg>
    ),
  },
  {
    title: "Você define o ritmo",
    desc: "De 1 capítulo a 10 ou mais por dia. Configure cada dia da semana individualmente. O plano se molda à sua rotina.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
        <line x1="4" y1="6" x2="20" y2="6"/>
        <circle cx="8" cy="6" r="2" fill="currentColor" stroke="none"/>
        <line x1="4" y1="12" x2="20" y2="12"/>
        <circle cx="16" cy="12" r="2" fill="currentColor" stroke="none"/>
        <line x1="4" y1="18" x2="20" y2="18"/>
        <circle cx="10" cy="18" r="2" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    title: "PDF pronto para imprimir",
    desc: "4 modelos visuais diferentes. Cada página traz a data, os capítulos e um checkbox para marcar o progresso diário.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z"/>
        <polyline points="14,2 14,8 20,8"/>
        <line x1="9" y1="13" x2="9" y2="17"/>
        <path d="M9 13h2a1.5 1.5 0 0 1 0 3H9"/>
        <line x1="13" y1="13" x2="13" y2="17"/>
        <path d="M13 13h1.5a1.5 1.5 0 0 1 0 3H13"/>
        <path d="M17 13v4m0-2h1.5"/>
      </svg>
    ),
  },
];

const PLANS = [
  { icon: "📖", name: "Bíblia Completa", meta: "66 livros · ~10 meses" },
  { icon: "✝", name: "Novo Testamento", meta: "27 livros · ~3 meses" },
  { icon: "📜", name: "Antigo Testamento", meta: "39 livros · ~10 meses" },
  { icon: "🐟", name: "Evangelhos & Atos", meta: "5 livros · ~55 dias" },
  { icon: "🕐", name: "Leitura Cronológica", meta: "Ordem histórica · ~1 ano" },
  { icon: "↩", name: "NT → Antigo Testamento", meta: "NT primeiro · ~1 ano" },
  { icon: "✦", name: "Salmos em 30 dias", meta: "150 capítulos · 5 cap/dia" },
  { icon: "📿", name: "Sabedoria", meta: "Jó · Salmos · Pv · Ec · Ct" },
];

const MOCKUP_ROWS = [
  { day: "01", date: "01/06", reading: "Gênesis 1–3" },
  { day: "02", date: "02/06", reading: "Gênesis 4–6" },
  { day: "03", date: "03/06", reading: "Gênesis 7–9" },
  { day: "04", date: "04/06", reading: "Gênesis 10–12" },
  { day: "05", date: "05/06", reading: "Gênesis 13–15" },
];

function ArrowRight() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  );
}

export default function LandingPage({ onStart, dark, onToggleDark }) {
  const [heroVisible, setHeroVisible] = useState(false);
  const [stepsRef, stepsVisible] = useFadeIn();
  const [featuresRef, featuresVisible] = useFadeIn();
  const [plansRef, plansVisible] = useFadeIn();
  const [ctaRef, ctaVisible] = useFadeIn();

  useEffect(() => {
    const t = requestAnimationFrame(() => setHeroVisible(true));
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <div className="lp">

      {/* ── Nav ── */}
      <nav className="lp-nav">
        <div className="lp-nav-inner">
          <div className="lp-logo">
            <BookIcon size={18} />
            <span>Plano Bíblico</span>
          </div>
          <div className="lp-nav-right">
            <Link href="/sobre" className="lp-nav-link">Sobre</Link>
            <Link href="/faq" className="lp-nav-link">FAQ</Link>
            <button className="lp-theme-btn" onClick={onToggleDark} title={dark ? "Modo claro" : "Modo escuro"}>
              {dark ? <SunIcon /> : <MoonIcon />}
            </button>
            <button className="lp-nav-cta" onClick={onStart}>Criar plano</button>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className={`lp-hero ${heroVisible ? "lp-hero-in" : ""}`}>
        <div className="lp-hero-orb lp-orb-1" aria-hidden="true" />
        <div className="lp-hero-orb lp-orb-2" aria-hidden="true" />
        <div className="lp-container lp-hero-inner">

          <div className="lp-hero-text">
            <p className="lp-eyebrow lp-anim-0">por um engenheiro de dados apaixonado por teologia</p>
            <h1 className="lp-h1 lp-anim-1">
              A ferramenta que<br />
              <span className="lp-h1-accent">eu precisava<br />não existia.</span>
            </h1>
            <p className="lp-hero-desc lp-anim-2">
              Escolha os livros, defina seu ritmo e gere um PDF organizado para
              imprimir. Sem planos prontos que não se encaixam na sua rotina.
              Grátis, sem cadastro.
            </p>
            <div className="lp-hero-btns lp-anim-3">
              <button className="lp-btn-primary" onClick={onStart}>
                Criar meu plano <ArrowRight />
              </button>
              <a href="#como-funciona" className="lp-btn-ghost">Como funciona</a>
            </div>
            <div className="lp-hero-pills lp-anim-4">
              <span className="lp-pill">66 livros</span>
              <span className="lp-pill">1.189 capítulos</span>
              <span className="lp-pill">4 modelos PDF</span>
              <span className="lp-pill">Protestante + Católica</span>
            </div>
          </div>

          <div className="lp-hero-visual lp-anim-2" aria-hidden="true">
            <div className="lp-mockup">
              <div className="lp-mockup-topbar">
                <div className="lp-mockup-dots">
                  <span /><span /><span />
                </div>
                <span className="lp-mockup-title">Bíblia em 1 Ano</span>
                <span className="lp-mockup-badge">66 livros</span>
              </div>
              <div className="lp-mockup-header">
                <span>Dia</span>
                <span>Data</span>
                <span>Leitura</span>
                <span>✓</span>
              </div>
              {MOCKUP_ROWS.map((r, i) => (
                <div key={i} className={`lp-mockup-row ${i % 2 === 0 ? "lp-mockup-row-alt" : ""}`}>
                  <span className="lp-mr-day">{r.day}</span>
                  <span className="lp-mr-date">{r.date}</span>
                  <span className="lp-mr-reading">{r.reading}</span>
                  <span className="lp-mr-check">□</span>
                </div>
              ))}
              <div className="lp-mockup-footer">
                365 dias &bull; 3 cap/dia &bull; início 01/06/2025
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Steps ── */}
      <section id="como-funciona" className="lp-section lp-section-alt" ref={stepsRef}>
        <div className={`lp-container ${stepsVisible ? "lp-in" : ""}`}>
          <div className="lp-steps-wrap">
            <div className="lp-steps-label lp-child">
              <p className="lp-section-eye">Como funciona</p>
              <h2 className="lp-h2">Simples.<br />Direto.</h2>
            </div>
            <div className="lp-steps-list">
              {STEPS.map((s, i) => (
                <div key={s.num} className="lp-child lp-step-row" style={{ transitionDelay: `${i * 100}ms` }}>
                  <span className="lp-step-num">{s.num}</span>
                  <div className="lp-step-body">
                    <h3 className="lp-step-title">{s.title}</h3>
                    <p className="lp-step-desc">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="lp-section lp-section-alt" ref={featuresRef}>
        <div className={`lp-container ${featuresVisible ? "lp-in" : ""}`}>
          <div className="lp-section-header lp-child">
            <p className="lp-section-eye">Diferencial</p>
            <h2 className="lp-h2">Personalização total.</h2>
            <p className="lp-section-sub">
              Não existe um plano para todos. Cada pessoa lê de um jeito — o app se adapta à sua rotina.
            </p>
          </div>
          <div className="lp-features-grid">
            {FEATURES.map((f, i) => (
              <div key={i} className="lp-child lp-feature-card" style={{ transitionDelay: `${i * 120}ms` }}>
                <div className="lp-feature-icon">{f.icon}</div>
                <h3 className="lp-feature-title">{f.title}</h3>
                <p className="lp-feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Plans ── */}
      <section className="lp-section" ref={plansRef}>
        <div className={`lp-container ${plansVisible ? "lp-in" : ""}`}>
          <div className="lp-section-header lp-child">
            <p className="lp-section-eye">Planos prontos</p>
            <h2 className="lp-h2">Ou comece com um preset.</h2>
            <p className="lp-section-sub">
              Escolha um plano pronto e ajuste à sua maneira — ou monte do zero selecionando os livros que quiser.
            </p>
          </div>
          <div className="lp-plans-grid">
            {PLANS.map((p, i) => (
              <button
                key={i}
                className="lp-child lp-plan-card"
                style={{ transitionDelay: `${i * 50}ms` }}
                onClick={onStart}
              >
                <span className="lp-plan-icon">{p.icon}</span>
                <div className="lp-plan-info">
                  <p className="lp-plan-name">{p.name}</p>
                  <p className="lp-plan-meta">{p.meta}</p>
                </div>
                <ArrowRight />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Author note ── */}
      <section className="lp-author-section">
        <div className="lp-container">
          <div className="lp-author-card">
            <p className="lp-author-quote">
              "Procurei uma ferramenta que me deixasse escolher os livros,
              definir o ritmo e gerar um PDF. Não encontrei. Então construí."
            </p>
            <div className="lp-author-info">
              <span className="lp-author-name">Paulo Henrique Dias</span>
              <span className="lp-author-role">Engenheiro de dados · apaixonado por teologia</span>
            </div>
            <Link href="/sobre" className="lp-author-link">Ler mais sobre o projeto →</Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="lp-cta-section" ref={ctaRef}>
        <div className={`lp-container ${ctaVisible ? "lp-in" : ""}`}>
          <div className="lp-cta-box lp-child">
            <div className="lp-cta-orb" aria-hidden="true" />
            <p className="lp-section-eye" style={{ color: "rgba(255,255,255,0.7)" }}>Pronto para começar?</p>
            <h2 className="lp-cta-h2">A Bíblia inteira.<br />No seu tempo.</h2>
            <p className="lp-cta-sub">Crie seu plano em menos de 2 minutos. Grátis, sem cadastro.</p>
            <button className="lp-cta-btn" onClick={onStart}>
              Criar meu plano agora <ArrowRight />
            </button>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="lp-footer">
        <div className="lp-container lp-footer-inner">
          <div className="lp-logo">
            <BookIcon size={16} />
            <span>Plano Bíblico</span>
          </div>
          <nav className="lp-footer-links">
            <Link href="/sobre">Sobre</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/plano-biblia-1-ano">Bíblia em 1 ano</Link>
          </nav>
        </div>
      </footer>

    </div>
  );
}
