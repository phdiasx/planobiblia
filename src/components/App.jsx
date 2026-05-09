"use client";

import { useState, useMemo, useEffect } from "react";
import BookSelector from "@/components/BookSelector";
import PlanConfig from "@/components/PlanConfig";
import PlanPreview from "@/components/PlanPreview";
import { generatePlan } from "@/utils/planGenerator";
import { BOOKS, DEUTERO_IDS } from "@/data/bible";

const today = new Date().toISOString().slice(0, 10);
const STEPS = ["Livros", "Configurar", "Visualizar"];

const FEATURES = [
  { icon: "📚", title: "66 ou 73 livros", desc: "Protestante ou Católica" },
  { icon: "🎯", title: "Seu ritmo", desc: "De 1 a 10+ caps/dia" },
  { icon: "📄", title: "PDF bonito", desc: "4 modelos para imprimir" },
];

function useCountUp(target, duration = 1200, delay = 0) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start;
    let frame;
    const timeout = setTimeout(() => {
      const step = (ts) => {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.floor(eased * target));
        if (progress < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    }, delay);
    return () => { clearTimeout(timeout); cancelAnimationFrame(frame); };
  }, [target, duration, delay]);
  return value;
}

function IntroScreen({ onStart, dark, onToggleDark }) {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const books = useCountUp(66, 900, 400);
  const chapters = useCountUp(1189, 1400, 600);

  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const handleStart = () => {
    setLeaving(true);
    setTimeout(onStart, 420);
  };

  return (
    <div className={`intro-screen ${visible ? "intro-visible" : ""} ${leaving ? "intro-leaving" : ""}`}>
      <div className="intro-bg-orb intro-orb-1" />
      <div className="intro-bg-orb intro-orb-2" />

      <div className="intro-actions">
        <button className="intro-theme-toggle" onClick={onToggleDark} title={dark ? "Modo claro" : "Modo escuro"}>
          {dark ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>

      <div className="intro-content">
        <div className="intro-logo-wrap intro-anim-0">
          <span className="intro-logo-icon">📖</span>
          <div className="intro-logo-ring" />
        </div>

        <h1 className="intro-title intro-anim-1">
          Plano de Leitura<br /><span className="intro-title-accent">Bíblica</span>
        </h1>

        <p className="intro-desc intro-anim-2">
          Organize sua jornada pela Palavra de Deus. Escolha os livros, defina seu ritmo e baixe um plano personalizado em PDF.
        </p>

        <div className="intro-stats intro-anim-3">
          <div className="intro-stat">
            <span className="intro-stat-num">{books}</span>
            <span className="intro-stat-label">livros</span>
          </div>
          <div className="intro-stat-divider" />
          <div className="intro-stat">
            <span className="intro-stat-num">{chapters}</span>
            <span className="intro-stat-label">capítulos</span>
          </div>
          <div className="intro-stat-divider" />
          <div className="intro-stat">
            <span className="intro-stat-num">∞</span>
            <span className="intro-stat-label">possibilidades</span>
          </div>
        </div>

        <div className="intro-features intro-anim-4">
          {FEATURES.map((f, i) => (
            <div key={i} className="intro-feature-card">
              <span className="intro-feature-icon">{f.icon}</span>
              <div>
                <p className="intro-feature-title">{f.title}</p>
                <p className="intro-feature-desc">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="intro-btn intro-anim-5" onClick={handleStart}>
          <span>Criar meu plano</span>
          <span className="intro-btn-arrow">→</span>
        </button>

        <p className="intro-credit intro-anim-5">criado por Paulo Henrique Dias</p>
      </div>
    </div>
  );
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

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [step, setStep] = useState(0);
  const [selectedIds, setSelectedIds] = useState([]);
  const [config, setConfig] = useState({
    planName: "",
    chaptersPerDay: 3,
    startDate: today,
  });
  const [dark, setDark] = useState(false);
  const [edition, setEdition] = useState("protestante");

  const handleEditionChange = (next) => {
    setEdition(next);
    if (next === "protestante") {
      setSelectedIds(ids => ids.filter(id => !DEUTERO_IDS.includes(id)));
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(saved ? saved === "dark" : prefersDark);
  }, []);

  useEffect(() => {
    const theme = dark ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [dark]);

  const selectedBooks = useMemo(
    () => BOOKS.filter(b => selectedIds.includes(b.id)),
    [selectedIds]
  );

  const days = useMemo(() => {
    if (selectedBooks.length === 0 || !config.startDate) return [];
    return generatePlan({
      selectedBooks,
      chaptersPerDay: config.chaptersPerDay,
      startDate: config.startDate,
    });
  }, [selectedBooks, config.chaptersPerDay, config.startDate]);

  const canNext = () => {
    if (step === 0) return selectedIds.length > 0;
    if (step === 1) return config.chaptersPerDay > 0 && config.startDate;
    return false;
  };

  if (showIntro) {
    return (
      <IntroScreen
        onStart={() => setShowIntro(false)}
        dark={dark}
        onToggleDark={() => setDark(d => !d)}
      />
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <span className="logo-icon">📖</span>
          <span className="logo-text">Plano de Leitura Bíblica</span>
        </div>
        <div className="header-actions">
          <button
            className="theme-toggle"
            onClick={() => setDark(d => !d)}
            title={dark ? "Modo claro" : "Modo escuro"}
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>
          <div className="header-step">{step + 1}/{STEPS.length}</div>
        </div>
      </header>

      <main className="app-main">
        <div className="stepper">
          {STEPS.map((label, i) => (
            <div key={label} className="step-wrapper">
              <div className={`step ${i === step ? "active" : i < step ? "done" : ""}`}>
                <div
                  className="step-circle"
                  onClick={() => i < step && setStep(i)}
                  style={{ cursor: i < step ? "pointer" : "default" }}
                >
                  {i < step ? "✓" : i + 1}
                </div>
                <span className="step-label">{label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`step-line ${i < step ? "done" : ""}`} />
              )}
            </div>
          ))}
        </div>

        <div className="step-content">
          {step === 0 && (
            <>
              <h2>Selecione os livros</h2>
              <p className="step-hint">Escolha quais livros farão parte do seu plano.</p>
              <BookSelector
                selectedIds={selectedIds}
                onChange={setSelectedIds}
                edition={edition}
                onEditionChange={handleEditionChange}
              />
            </>
          )}
          {step === 1 && (
            <>
              <h2>Configure o plano</h2>
              <p className="step-hint">Defina o ritmo de leitura e a data de início.</p>
              <PlanConfig config={config} onChange={setConfig} selectedIds={selectedIds} />
            </>
          )}
          {step === 2 && (
            <>
              <h2>{config.planName || "Meu Plano de Leitura"}</h2>
              <p className="step-hint">Confira o plano e baixe o PDF para impressão.</p>
              <PlanPreview days={days} config={config} selectedIds={selectedIds} />
            </>
          )}
        </div>
      </main>

      <nav className="step-nav">
        <div className="nav-left">
          {step > 0 ? (
            <button className="btn-secondary" onClick={() => setStep(s => s - 1)}>
              ← Voltar
            </button>
          ) : (
            <div />
          )}
        </div>
        <span className="nav-credit">criado por Paulo Henrique Dias</span>

        <div className="nav-right">
          {step < STEPS.length - 1 && (
            canNext() ? (
              <button className="btn-primary" onClick={() => setStep(s => s + 1)}>
                Próximo →
              </button>
            ) : (
              <span className="nav-hint">
                {step === 0 ? "Selecione ao menos um livro" : "Preencha os campos"}
              </span>
            )
          )}
        </div>
      </nav>
    </div>
  );
}
