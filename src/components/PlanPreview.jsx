"use client";

import { useState } from "react";
import { formatDate, formatReadings } from "@/utils/planGenerator";
import { exportToPDF, PDF_THEMES, buildCustomPalette } from "@/utils/pdfGenerator";
import { BOOKS } from "@/data/bible";

const PAGE_SIZE = 60;

export default function PlanPreview({ days, config, selectedIds, shareUrl }) {
  const [page, setPage] = useState(0);
  const [exporting, setExporting] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const [pdfTab, setPdfTab] = useState("estilo");
  const [theme, setTheme] = useState("classico");
  const [columns, setColumns] = useState(2);
  const [rowSpacing, setRowSpacing] = useState("normal");
  const [checkStyle, setCheckStyle] = useState("square");
  const [weekDividers, setWeekDividers] = useState(true);
  const [showStats, setShowStats] = useState(true);
  const [showDates, setShowDates] = useState(true);
  const [customColor1, setCustomColor1] = useState("#1B4B82");
  const [customColor2, setCustomColor2] = useState("#C49A1C");

  const customPal = buildCustomPalette(customColor1, customColor2);

  const themeEntries = [
    ...Object.entries(PDF_THEMES),
    ["personalizado", { ...customPal, label: "Personalizado" }],
  ];

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(shareUrl || window.location.href);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2500);
  };

  const totalPages = Math.ceil(days.length / PAGE_SIZE);
  const visible = days.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const chapterRanges = config.chapterRanges || {};
  const totalChapters = selectedIds.reduce((s, id) => {
    const book = BOOKS.find(b => b.id === id);
    if (!book) return s;
    const sel = chapterRanges[id];
    return s + (sel ? sel.length : book.chapters);
  }, 0);

  const handleExport = async () => {
    setExporting(true);
    try {
      const customPalette = theme === "personalizado" ? customPal : null;
      await exportToPDF({
        planName: config.planName || "Plano de Leitura Bíblica",
        days,
        chaptersPerDay: config.chaptersPerDay,
        totalChapters,
        theme: theme === "personalizado" ? "classico" : theme,
        customPalette,
        columns,
        rowSpacing,
        checkStyle,
        weekDividers,
        showStats,
        showDates,
      });
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "download_pdf", {
          plan_name: config.planName || "Plano de Leitura Bíblica",
          total_days: days.length,
          total_chapters: totalChapters,
          theme,
          columns,
          row_spacing: rowSpacing,
        });
      }
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="plan-preview">
      <div className="preview-toolbar">
        <div className="preview-info">
          <strong>{days.length}</strong> dias &bull; <strong>{totalChapters}</strong> capítulos
        </div>
        <div className="toolbar-actions">
          <button className="btn-outline share-btn" onClick={handleCopyLink}>
            {linkCopied ? "✓ Link copiado!" : "🔗 Compartilhar"}
          </button>
          <button className="btn-primary export-btn" onClick={handleExport} disabled={exporting}>
            {exporting ? "Gerando PDF..." : "Baixar PDF"}
          </button>
        </div>
      </div>

      {/* ── Personalizar PDF ── */}
      <div className="pdf-opts">
        <div className="pdf-tabs">
          {[["estilo", "Estilo"], ["layout", "Layout"], ["conteudo", "Conteúdo"]].map(([key, label]) => (
            <button
              key={key}
              className={`pdf-tab ${pdfTab === key ? "active" : ""}`}
              onClick={() => setPdfTab(key)}
            >
              {label}
            </button>
          ))}
        </div>

        {pdfTab === "estilo" && (
          <div className="pdf-tab-panel">
            <div className="pdf-theme-grid">
              {themeEntries.map(([key, pal]) => (
                <ThemeCard
                  key={key}
                  palette={pal}
                  isActive={theme === key}
                  onClick={() => setTheme(key)}
                />
              ))}
            </div>
            {theme === "personalizado" && (
              <div className="pdf-color-pickers">
                <label className="pdf-color-field">
                  <span>Cor principal</span>
                  <input
                    type="color"
                    value={customColor1}
                    onChange={e => setCustomColor1(e.target.value)}
                  />
                </label>
                <label className="pdf-color-field">
                  <span>Destaque</span>
                  <input
                    type="color"
                    value={customColor2}
                    onChange={e => setCustomColor2(e.target.value)}
                  />
                </label>
              </div>
            )}
          </div>
        )}

        {pdfTab === "layout" && (
          <div className="pdf-tab-panel">
            <div className="pdf-opt-group">
              <span className="pdf-opt-label">Colunas</span>
              <div className="pdf-opt-pills">
                <button className={`pdf-opt-pill ${columns === 2 ? "active" : ""}`} onClick={() => setColumns(2)}>
                  <ColsIcon2 /> 2 colunas
                </button>
                <button className={`pdf-opt-pill ${columns === 1 ? "active" : ""}`} onClick={() => setColumns(1)}>
                  <ColsIcon1 /> 1 coluna
                </button>
              </div>
            </div>
            <div className="pdf-opt-group">
              <span className="pdf-opt-label">Espaçamento de linha</span>
              <div className="pdf-opt-pills">
                <button className={`pdf-opt-pill ${rowSpacing === "normal" ? "active" : ""}`} onClick={() => setRowSpacing("normal")}>
                  <SpacingIconNormal /> Normal
                </button>
                <button className={`pdf-opt-pill ${rowSpacing === "spacious" ? "active" : ""}`} onClick={() => setRowSpacing("spacious")}>
                  <SpacingIconSpacious /> Espaçoso
                </button>
              </div>
            </div>
            <div className="pdf-opt-group">
              <span className="pdf-opt-label">Caixa de seleção</span>
              <div className="pdf-opt-pills">
                <button className={`pdf-opt-pill ${checkStyle === "square" ? "active" : ""}`} onClick={() => setCheckStyle("square")}>
                  <CheckIconSquare /> Quadrado
                </button>
                <button className={`pdf-opt-pill ${checkStyle === "circle" ? "active" : ""}`} onClick={() => setCheckStyle("circle")}>
                  <CheckIconCircle /> Círculo
                </button>
                <button className={`pdf-opt-pill ${checkStyle === "none" ? "active" : ""}`} onClick={() => setCheckStyle("none")}>
                  Nenhum
                </button>
              </div>
            </div>
          </div>
        )}

        {pdfTab === "conteudo" && (
          <div className="pdf-tab-panel">
            <div className="pdf-opt-toggles">
              <label className="pdf-toggle">
                <input type="checkbox" checked={showDates} onChange={e => setShowDates(e.target.checked)} />
                <span className="pdf-toggle-box" />
                <span>Mostrar datas</span>
              </label>
              <label className="pdf-toggle">
                <input type="checkbox" checked={weekDividers} onChange={e => setWeekDividers(e.target.checked)} />
                <span className="pdf-toggle-box" />
                <span>Separadores de semana</span>
              </label>
              <label className="pdf-toggle">
                <input type="checkbox" checked={showStats} onChange={e => setShowStats(e.target.checked)} />
                <span className="pdf-toggle-box" />
                <span>Estatísticas na capa</span>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* ── Tabela de dias ── */}
      <div className="days-table">
        <div className="table-header">
          <span className="col-day">Dia</span>
          <span className="col-date">Data</span>
          <span className="col-reading">Leitura</span>
          <span className="col-check">✓</span>
        </div>
        {visible.map((day) => (
          <div key={day.dayNumber} className={`table-row ${day.dayNumber % 2 === 0 ? "even" : ""}`}>
            <span className="col-day">{day.dayNumber}</span>
            <span className="col-date">{formatDate(day.date)}</span>
            <span className="col-reading">{formatReadings(day.readings)}</span>
            <span className="col-check"><span className="checkbox" /></span>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => setPage(0)} disabled={page === 0}>«</button>
          <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}>‹</button>
          <span>Página {page + 1} de {totalPages}</span>
          <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page === totalPages - 1}>›</button>
          <button onClick={() => setPage(totalPages - 1)} disabled={page === totalPages - 1}>»</button>
        </div>
      )}
    </div>
  );
}

function ThemeCard({ palette, isActive, onClick }) {
  const r = c => `rgb(${c[0]},${c[1]},${c[2]})`;
  return (
    <button className={`pdf-theme-card ${isActive ? "active" : ""}`} onClick={onClick}>
      <div className="ptm-page">
        <div className="ptm-hdr" style={{ background: r(palette.hdr) }}>
          <div className="ptm-acc" style={{ background: r(palette.acc) }} />
        </div>
        <div className="ptm-stat" style={{ background: r(palette.hdrXL) }} />
        <div className="ptm-rows">
          {[0, 1, 2, 3].map(i => (
            <div
              key={i}
              className="ptm-row"
              style={i % 2 ? { background: r(palette.evn) } : undefined}
            >
              <span className="ptm-cb" style={{ borderColor: r(palette.hdr2) }} />
              <span className="ptm-ln" style={{ background: r(palette.mid) }} />
            </div>
          ))}
        </div>
      </div>
      <span className="pdf-theme-name">{palette.label}</span>
    </button>
  );
}

function CheckIconSquare() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="0.75" y="0.75" width="11.5" height="11.5" rx="1.5" />
    </svg>
  );
}

function CheckIconCircle() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="6.5" cy="6.5" r="5.75" />
    </svg>
  );
}

function ColsIcon2() {
  return (
    <svg width="14" height="12" viewBox="0 0 14 12" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="0.75" y="0.75" width="5.5" height="10.5" rx="1" />
      <rect x="7.75" y="0.75" width="5.5" height="10.5" rx="1" />
    </svg>
  );
}

function ColsIcon1() {
  return (
    <svg width="14" height="12" viewBox="0 0 14 12" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="1.75" y="0.75" width="10.5" height="10.5" rx="1" />
    </svg>
  );
}

function SpacingIconNormal() {
  return (
    <svg width="14" height="12" viewBox="0 0 14 12" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="1" y1="2" x2="13" y2="2" />
      <line x1="1" y1="5" x2="13" y2="5" />
      <line x1="1" y1="8" x2="13" y2="8" />
      <line x1="1" y1="11" x2="13" y2="11" />
    </svg>
  );
}

function SpacingIconSpacious() {
  return (
    <svg width="14" height="12" viewBox="0 0 14 12" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="1" y1="2" x2="13" y2="2" />
      <line x1="1" y1="6.5" x2="13" y2="6.5" />
      <line x1="1" y1="11" x2="13" y2="11" />
    </svg>
  );
}
