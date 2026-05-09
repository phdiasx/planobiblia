"use client";

import { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import BookSelector from "@/components/BookSelector";
import PlanConfig from "@/components/PlanConfig";
import { generatePlan } from "@/utils/planGenerator";

const PlanPreview = dynamic(() => import("@/components/PlanPreview"), { ssr: false });
import { BOOKS, DEUTERO_IDS, AT_BOOKS, NT_BOOKS } from "@/data/bible";
import {
  IconBook, IconCross, IconScroll, IconNote, IconFish, IconCandle,
  IconLibrary, IconSliders, IconFilePdf, IconSpeech,
} from "@/components/Icons";
import { DEUTERO_BOOKS } from "@/data/bible";

const today = new Date().toISOString().slice(0, 10);
const STEPS = ["Livros", "Configurar", "Visualizar"];

const PLAN_PRESETS = [
  {
    id: "biblia-completa",
    icon: <IconBook />,
    label: "Bíblia Completa",
    meta: "66 livros · ~10 meses",
    metaCatolica: "73 livros · ~10 meses",
    bookIds: [...AT_BOOKS, ...NT_BOOKS].map(b => b.id),
    bookIdsCatolica: [...AT_BOOKS, ...DEUTERO_BOOKS, ...NT_BOOKS].map(b => b.id),
    chaptersPerDay: 4,
  },
  {
    id: "nt-3-meses",
    icon: <IconCross />,
    label: "Novo Testamento",
    meta: "27 livros · ~3 meses",
    bookIds: NT_BOOKS.map(b => b.id),
    chaptersPerDay: 3,
  },
  {
    id: "at-1-ano",
    icon: <IconScroll />,
    label: "Antigo Testamento",
    meta: "39 livros · ~10 meses",
    metaCatolica: "46 livros · ~10 meses",
    bookIds: AT_BOOKS.map(b => b.id),
    bookIdsCatolica: [...AT_BOOKS, ...DEUTERO_BOOKS].map(b => b.id),
    chaptersPerDay: 3,
  },
  {
    id: "salmos-30",
    icon: <IconNote />,
    label: "Salmos em 30 dias",
    meta: "150 capítulos · 5 cap/dia",
    bookIds: [19],
    chaptersPerDay: 5,
  },
  {
    id: "evangelhos",
    icon: <IconFish />,
    label: "Evangelhos & Atos",
    meta: "5 livros · 2 cap/dia · ~55 dias",
    bookIds: [40, 41, 42, 43, 44],
    chaptersPerDay: 2,
  },
  {
    id: "proverbios-sabedoria",
    icon: <IconCandle />,
    label: "Sabedoria",
    meta: "Jó · Salmos · Pv · Ec · Ct",
    bookIds: [18, 19, 20, 21, 22],
    chaptersPerDay: 3,
  },
  {
    id: "parabolas",
    icon: <IconSpeech />,
    label: "Parábolas de Jesus",
    meta: "Mateus · Marcos · Lucas · ~5 semanas",
    bookIds: [40, 41, 42],
    chaptersPerDay: 2,
  },
];

function PlanPresets({ onSelect, edition, onEditionChange }) {
  return (
    <div className="presets-section">
      <div className="presets-top">
        <p className="presets-label">Planos prontos</p>
        <div className="edition-pills">
          <button
            className={`edition-pill ${edition === "protestante" ? "active" : ""}`}
            onClick={() => onEditionChange("protestante")}
          >
            Protestante <span className="edition-pill-count">66</span>
          </button>
          <button
            className={`edition-pill ${edition === "catolica" ? "active" : ""}`}
            onClick={() => onEditionChange("catolica")}
          >
            Católica <span className="edition-pill-count">73</span>
          </button>
        </div>
      </div>
      <div className="presets-grid">
        {PLAN_PRESETS.map(p => (
          <button key={p.id} className="preset-card" onClick={() => onSelect(p, edition)}>
            <span className="preset-card-icon">{p.icon}</span>
            <span className="preset-card-label">{p.label}</span>
            <span className="preset-card-meta">
              {edition === "catolica" && p.metaCatolica ? p.metaCatolica : p.meta}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

const FEATURES = [
  { icon: <IconLibrary />, title: "66 ou 73 livros", desc: "Protestante ou Católica" },
  { icon: <IconSliders />, title: "Seu ritmo", desc: "De 1 a 10+ caps/dia" },
  { icon: <IconFilePdf />, title: "Pronto para imprimir", desc: "4 modelos de PDF" },
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
        else setValue(target);
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
          <IconBook className="intro-logo-icon" />
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
            <span className="intro-stat-num">100%</span>
            <span className="intro-stat-label">gratuito</span>
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

        <a href="/sobre" className="intro-credit intro-anim-5">criado por Paulo Henrique Dias</a>
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
  const [stepDir, setStepDir] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);
  const [config, setConfig] = useState({
    planName: "",
    chaptersPerDay: 3,
    startDate: today,
    dayOverrides: {},
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

  // Lê parâmetros da URL ao carregar — pula intro e vai direto ao plano
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const livros = params.get("livros");
    if (!livros) return;
    const ids = livros.split(",").map(Number).filter(Boolean);
    if (ids.length === 0) return;
    const edicao = params.get("edicao") || "protestante";
    const ritmo = Number(params.get("ritmo")) || 3;
    const inicio = params.get("inicio") || today;
    const nome = params.get("nome") ? decodeURIComponent(params.get("nome")) : "";
    setEdition(edicao);
    setSelectedIds(ids);
    setConfig({ planName: nome, chaptersPerDay: ritmo, startDate: inicio });
    setShowIntro(false);
    setStep(2);
  }, []);

  // Atualiza a URL quando chega no passo 3
  useEffect(() => {
    if (step === 2 && selectedIds.length > 0) {
      const params = new URLSearchParams();
      params.set("livros", selectedIds.join(","));
      params.set("ritmo", config.chaptersPerDay);
      params.set("inicio", config.startDate);
      if (config.planName) params.set("nome", encodeURIComponent(config.planName));
      if (edition === "catolica") params.set("edicao", "catolica");
      window.history.replaceState(null, "", `?${params.toString()}`);
    } else if (step < 2) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, [step, selectedIds, config, edition]);

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
      dayOverrides: config.dayOverrides || {},
    });
  }, [selectedBooks, config.chaptersPerDay, config.startDate, config.dayOverrides]);

  const goToStep = (next) => {
    setStepDir(next > step ? 1 : -1);
    setStep(next);
  };

  const handlePresetSelect = (preset, ed) => {
    const ids = ed === "catolica" && preset.bookIdsCatolica
      ? preset.bookIdsCatolica
      : preset.bookIds;
    setSelectedIds(ids);
    setConfig(c => ({ ...c, planName: preset.label }));
    goToStep(1);
  };

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
          <IconBook className="logo-icon" />
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
                  onClick={() => i < step && goToStep(i)}
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

        <div className="step-content" key={step} data-dir={stepDir}>
          {step === 0 && (
            <>
              <h2>Selecione os livros</h2>
              <p className="step-hint">Escolha um plano pronto ou monte o seu abaixo.</p>
              <PlanPresets onSelect={handlePresetSelect} edition={edition} onEditionChange={handleEditionChange} />
              <BookSelector
                selectedIds={selectedIds}
                onChange={setSelectedIds}
                edition={edition}
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
              <PlanPreview days={days} config={config} selectedIds={selectedIds} shareUrl={typeof window !== "undefined" ? window.location.href : ""} />
            </>
          )}
        </div>
      </main>

      <nav className="step-nav">
        <div className="nav-left">
          {step > 0 ? (
            <button className="btn-secondary" onClick={() => goToStep(step - 1)}>
              ← Voltar
            </button>
          ) : (
            <div />
          )}
        </div>
        <a href="/sobre" className="nav-credit">criado por Paulo Henrique Dias</a>

        <div className="nav-right">
          {step < STEPS.length - 1 && (
            canNext() ? (
              <button className="btn-primary" onClick={() => goToStep(step + 1)}>
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
