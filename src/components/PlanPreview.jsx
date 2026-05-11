"use client";

import { useState } from "react";
import { formatDate, formatReadings } from "@/utils/planGenerator";
import { exportToPDF, PDF_THEMES } from "@/utils/pdfGenerator";
import { BOOKS } from "@/data/bible";

const PAGE_SIZE = 60;

export default function PlanPreview({ days, config, selectedIds, shareUrl }) {
  const [page, setPage] = useState(0);
  const [exporting, setExporting] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  // PDF options
  const [theme, setTheme] = useState("classico");
  const [columns, setColumns] = useState(2);
  const [rowSpacing, setRowSpacing] = useState("normal");
  const [weekDividers, setWeekDividers] = useState(true);
  const [showStats, setShowStats] = useState(true);

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
    const r = chapterRanges[id];
    return s + ((r?.end ?? book.chapters) - (r?.start ?? 1) + 1);
  }, 0);

  const handleExport = async () => {
    setExporting(true);
    try {
      await exportToPDF({
        planName: config.planName || "Plano de Leitura Bíblica",
        days,
        chaptersPerDay: config.chaptersPerDay,
        totalChapters,
        theme,
        columns,
        rowSpacing,
        weekDividers,
        showStats,
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

      {/* ── Opções do PDF ── */}
      <div className="pdf-opts">
        <p className="pdf-opts-title">Personalizar PDF</p>

        <div className="pdf-opts-grid">
          {/* Tema */}
          <div className="pdf-opt-group">
            <span className="pdf-opt-label">Tema</span>
            <div className="pdf-theme-selector">
              {Object.entries(PDF_THEMES).map(([key, t]) => (
                <button
                  key={key}
                  className={`pdf-theme-card ${theme === key ? "active" : ""}`}
                  onClick={() => setTheme(key)}
                >
                  <div className="pdf-theme-swatches">
                    {t.swatches.map(c => (
                      <span key={c} className="pdf-swatch" style={{ background: c }} />
                    ))}
                  </div>
                  <span className="pdf-theme-name">{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Colunas */}
          <div className="pdf-opt-group">
            <span className="pdf-opt-label">Colunas</span>
            <div className="pdf-opt-pills">
              <button
                className={`pdf-opt-pill ${columns === 2 ? "active" : ""}`}
                onClick={() => setColumns(2)}
              >
                <ColsIcon2 /> 2 colunas
              </button>
              <button
                className={`pdf-opt-pill ${columns === 1 ? "active" : ""}`}
                onClick={() => setColumns(1)}
              >
                <ColsIcon1 /> 1 coluna
              </button>
            </div>
          </div>

          {/* Espaçamento */}
          <div className="pdf-opt-group">
            <span className="pdf-opt-label">Espaçamento</span>
            <div className="pdf-opt-pills">
              <button
                className={`pdf-opt-pill ${rowSpacing === "normal" ? "active" : ""}`}
                onClick={() => setRowSpacing("normal")}
              >
                <SpacingIconNormal /> Normal
              </button>
              <button
                className={`pdf-opt-pill ${rowSpacing === "spacious" ? "active" : ""}`}
                onClick={() => setRowSpacing("spacious")}
              >
                <SpacingIconSpacious /> Espaçoso
              </button>
            </div>
          </div>

          {/* Toggles */}
          <div className="pdf-opt-group">
            <span className="pdf-opt-label">Extras</span>
            <div className="pdf-opt-toggles">
              <label className="pdf-toggle">
                <input
                  type="checkbox"
                  checked={weekDividers}
                  onChange={e => setWeekDividers(e.target.checked)}
                />
                <span className="pdf-toggle-box" />
                <span>Separadores de semana</span>
              </label>
              <label className="pdf-toggle">
                <input
                  type="checkbox"
                  checked={showStats}
                  onChange={e => setShowStats(e.target.checked)}
                />
                <span className="pdf-toggle-box" />
                <span>Estatísticas na capa</span>
              </label>
            </div>
          </div>
        </div>
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

function ColsIcon2() {
  return (
    <svg width="14" height="12" viewBox="0 0 14 12" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="0.75" y="0.75" width="5.5" height="10.5" rx="1"/>
      <rect x="7.75" y="0.75" width="5.5" height="10.5" rx="1"/>
    </svg>
  );
}

function ColsIcon1() {
  return (
    <svg width="14" height="12" viewBox="0 0 14 12" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="1.75" y="0.75" width="10.5" height="10.5" rx="1"/>
    </svg>
  );
}

function SpacingIconNormal() {
  return (
    <svg width="14" height="12" viewBox="0 0 14 12" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="1" y1="2" x2="13" y2="2"/>
      <line x1="1" y1="5" x2="13" y2="5"/>
      <line x1="1" y1="8" x2="13" y2="8"/>
      <line x1="1" y1="11" x2="13" y2="11"/>
    </svg>
  );
}

function SpacingIconSpacious() {
  return (
    <svg width="14" height="12" viewBox="0 0 14 12" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="1" y1="2" x2="13" y2="2"/>
      <line x1="1" y1="6.5" x2="13" y2="6.5"/>
      <line x1="1" y1="11" x2="13" y2="11"/>
    </svg>
  );
}
