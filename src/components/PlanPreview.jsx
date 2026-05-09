"use client";

import { useState } from "react";
import { formatDate, formatReadings } from "@/utils/planGenerator";
import { exportToPDF, PDF_THEMES } from "@/utils/pdfGenerator";
import { BOOKS } from "@/data/bible";

const PAGE_SIZE = 60;
const PIX_KEY = "planobiblia0@gmail.com";

export default function PlanPreview({ days, config, selectedIds, shareUrl }) {
  const [page, setPage] = useState(0);
  const [exporting, setExporting] = useState(false);
  const [theme, setTheme] = useState("classico");
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(PIX_KEY);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(shareUrl || window.location.href);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2500);
  };

  const totalPages = Math.ceil(days.length / PAGE_SIZE);
  const visible = days.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const totalChapters = BOOKS.filter(b => selectedIds.includes(b.id))
    .reduce((s, b) => s + b.chapters, 0);

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

      <div className="pix-card">
        <div className="pix-header">
          <svg className="pix-heart" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
          </svg>
          <div>
            <p className="pix-title">Gostou do app? Contribua</p>
            <p className="pix-subtitle">Qualquer valor ajuda a manter o projeto no ar</p>
          </div>
        </div>
        <div className="pix-body">
          <img src="/qr-code-pix.jpeg" alt="QR Code PIX" className="pix-qr" width="110" height="110" loading="lazy" decoding="async" />
          <div className="pix-right">
            <p className="pix-scan-hint">Escaneie o QR Code ou copie a chave abaixo</p>
            <button className="pix-copy" onClick={handleCopy}>
              <span className="pix-key">{PIX_KEY}</span>
              <span className={`pix-action ${copied ? "pix-copied" : ""}`}>
                {copied ? "✓ Copiado!" : "Copiar chave PIX"}
              </span>
            </button>
          </div>
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
