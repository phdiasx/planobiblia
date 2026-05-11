"use client";

import { useState } from "react";
import { formatDate, formatReadings } from "@/utils/planGenerator";
import { exportToPDF, PDF_THEMES } from "@/utils/pdfGenerator";
import { BOOKS } from "@/data/bible";

const PAGE_SIZE = 60;

export default function PlanPreview({ days, config, selectedIds, shareUrl }) {
  const [page, setPage] = useState(0);
  const [exporting, setExporting] = useState(false);
  const [theme, setTheme] = useState("classico");
  const [linkCopied, setLinkCopied] = useState(false);

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
      });
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "download_pdf", {
          plan_name: config.planName || "Plano de Leitura Bíblica",
          total_days: days.length,
          total_chapters: totalChapters,
          theme,
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
          <strong>{days.length}</strong> dias de leitura &bull; <strong>{totalChapters}</strong> capítulos
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

      <div className="pdf-theme-row">
        <span className="pdf-theme-label">Modelo do PDF</span>
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
