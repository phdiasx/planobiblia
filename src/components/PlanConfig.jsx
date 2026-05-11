"use client";

import { useState } from "react";
import { BOOKS } from "@/data/bible";

const PRESETS = [
  { label: "1 cap/dia", value: 1 },
  { label: "2 cap/dia", value: 2 },
  { label: "3 cap/dia", value: 3 },
  { label: "4 cap/dia", value: 4 },
  { label: "5 cap/dia", value: 5 },
  { label: "6 cap/dia", value: 6 },
  { label: "10 cap/dia", value: 10 },
];

const DAYS = [
  { key: 0, label: "Dom" },
  { key: 1, label: "Seg" },
  { key: 2, label: "Ter" },
  { key: 3, label: "Qua" },
  { key: 4, label: "Qui" },
  { key: 5, label: "Sex" },
  { key: 6, label: "Sáb" },
];

export default function PlanConfig({ config, onChange, selectedIds }) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showChapterRanges, setShowChapterRanges] = useState(false);

  const chapterRanges = config.chapterRanges || {};
  const selectedBooks = BOOKS.filter(b => selectedIds.includes(b.id));
  const hasCustomRanges = Object.keys(chapterRanges).length > 0;

  const totalChapters = selectedBooks.reduce((s, b) => {
    const r = chapterRanges[b.id];
    return s + ((r?.end ?? b.chapters) - (r?.start ?? 1) + 1);
  }, 0);

  const setRange = (bookId, field, raw) => {
    const book = BOOKS.find(b => b.id === bookId);
    const cur = chapterRanges[bookId] || { start: 1, end: book.chapters };
    let val = Math.max(1, Math.min(book.chapters, Number(raw) || 1));
    const next = { ...cur, [field]: val };
    if (next.start > next.end) {
      if (field === "start") next.end = next.start;
      else next.start = next.end;
    }
    const isDefault = next.start === 1 && next.end === book.chapters;
    if (isDefault) {
      const ranges = { ...chapterRanges };
      delete ranges[bookId];
      onChange({ ...config, chapterRanges: ranges });
    } else {
      onChange({ ...config, chapterRanges: { ...chapterRanges, [bookId]: next } });
    }
  };

  const overrides = config.dayOverrides || {};

  const toggleDay = (key) => {
    if (overrides[key] !== undefined) {
      const next = { ...overrides };
      delete next[key];
      onChange({ ...config, dayOverrides: next });
    } else {
      onChange({ ...config, dayOverrides: { ...overrides, [key]: config.chaptersPerDay } });
    }
  };

  const setDayOverride = (key, value) => {
    onChange({ ...config, dayOverrides: { ...overrides, [key]: Math.max(1, value) } });
  };

  const hasOverrides = Object.keys(overrides).length > 0;

  const totalDays = (() => {
    if (!config.startDate || totalChapters === 0) return 0;
    const start = new Date(config.startDate + "T00:00:00");
    let remaining = totalChapters;
    let dayIndex = 0;
    while (remaining > 0) {
      const date = new Date(start);
      date.setDate(start.getDate() + dayIndex);
      const dow = date.getDay();
      const caps = overrides[dow] !== undefined ? overrides[dow] : config.chaptersPerDay;
      remaining -= caps;
      dayIndex++;
    }
    return dayIndex;
  })();

  const endDate = (() => {
    if (!config.startDate || totalDays === 0) return null;
    const d = new Date(config.startDate + "T00:00:00");
    d.setDate(d.getDate() + totalDays - 1);
    return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
  })();

  const months = totalDays > 0 ? `~${Math.round(totalDays / 30)}` : 0;

  return (
    <div className="plan-config">
      <div className="config-field">
        <label htmlFor="plan-name">Nome do plano</label>
        <input
          id="plan-name"
          type="text"
          placeholder="Ex: Meu Plano 2025"
          value={config.planName}
          onChange={e => onChange({ ...config, planName: e.target.value })}
          maxLength={60}
        />
      </div>

      <div className="config-field">
        <label>Capítulos por dia</label>
        <div className="presets-row">
          {PRESETS.map(p => (
            <button
              key={p.value}
              className={`preset-btn ${config.chaptersPerDay === p.value ? "active" : ""}`}
              onClick={() => onChange({ ...config, chaptersPerDay: p.value })}
            >
              {p.label}
            </button>
          ))}
        </div>
        <div className="custom-chapters">
          <label htmlFor="custom-ch">Ou digite um valor:</label>
          <input
            id="custom-ch"
            type="number"
            min={1}
            max={50}
            value={config.chaptersPerDay}
            onChange={e => onChange({ ...config, chaptersPerDay: Math.max(1, Number(e.target.value)) })}
          />
          <span>cap/dia</span>
        </div>
      </div>

      <div className="config-field">
        <label htmlFor="start-date">Data de início</label>
        <input
          id="start-date"
          type="date"
          value={config.startDate}
          onChange={e => onChange({ ...config, startDate: e.target.value })}
        />
      </div>

      <div className="advanced-section">
        <button
          className={`advanced-toggle ${showAdvanced ? "open" : ""} ${hasOverrides ? "has-overrides" : ""}`}
          onClick={() => setShowAdvanced(v => !v)}
        >
          <span>Personalização avançada</span>
          <span className="advanced-toggle-meta">
            {hasOverrides && !showAdvanced && `${Object.keys(overrides).length} dia${Object.keys(overrides).length > 1 ? "s" : ""} personalizado${Object.keys(overrides).length > 1 ? "s" : ""}`}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="advanced-chevron">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </button>

        {showAdvanced && (
          <div className="advanced-body">
            <p className="advanced-hint">
              Clique em um dia para definir um ritmo diferente. Os demais usam o padrão de <strong>{config.chaptersPerDay} cap/dia</strong>.
            </p>
            <div className="day-overrides-grid">
              {DAYS.map(d => {
                const isActive = overrides[d.key] !== undefined;
                return (
                  <div key={d.key} className={`day-override-card ${isActive ? "active" : ""}`}>
                    <button className="day-label" onClick={() => toggleDay(d.key)}>
                      {d.label}
                    </button>
                    {isActive ? (
                      <input
                        type="number"
                        min={1}
                        max={50}
                        value={overrides[d.key]}
                        onChange={e => setDayOverride(d.key, Number(e.target.value))}
                        className="day-input"
                        onClick={e => e.stopPropagation()}
                      />
                    ) : (
                      <span className="day-default">{config.chaptersPerDay}</span>
                    )}
                  </div>
                );
              })}
            </div>
            {hasOverrides && (
              <button
                className="advanced-clear"
                onClick={() => onChange({ ...config, dayOverrides: {} })}
              >
                Remover personalizações
              </button>
            )}
          </div>
        )}
      </div>

      <div className="advanced-section">
        <button
          className={`advanced-toggle ${showChapterRanges ? "open" : ""} ${hasCustomRanges ? "has-overrides" : ""}`}
          onClick={() => setShowChapterRanges(v => !v)}
        >
          <span>Capítulos por livro</span>
          <span className="advanced-toggle-meta">
            {hasCustomRanges && !showChapterRanges && `${Object.keys(chapterRanges).length} livro${Object.keys(chapterRanges).length > 1 ? "s" : ""} personalizado${Object.keys(chapterRanges).length > 1 ? "s" : ""}`}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="advanced-chevron">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </button>

        {showChapterRanges && (
          <div className="advanced-body">
            <p className="advanced-hint">
              Defina o intervalo de capítulos a ler em cada livro. Por padrão, todos os capítulos são incluídos.
            </p>
            <div className="chapter-ranges-list">
              {selectedBooks.map(book => {
                const r = chapterRanges[book.id];
                const from = r?.start ?? 1;
                const to = r?.end ?? book.chapters;
                const isCustom = !!r;
                return (
                  <div key={book.id} className={`chapter-range-row ${isCustom ? "active" : ""}`}>
                    <span className="chapter-range-book">
                      {book.name}
                      <span className="chapter-range-total">{book.chapters} caps</span>
                    </span>
                    <div className="chapter-range-inputs">
                      <label>do</label>
                      <input
                        type="number"
                        min={1}
                        max={book.chapters}
                        value={from}
                        disabled={book.chapters === 1}
                        onChange={e => setRange(book.id, "start", e.target.value)}
                        className="chapter-range-input"
                      />
                      <label>até</label>
                      <input
                        type="number"
                        min={1}
                        max={book.chapters}
                        value={to}
                        disabled={book.chapters === 1}
                        onChange={e => setRange(book.id, "end", e.target.value)}
                        className="chapter-range-input"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            {hasCustomRanges && (
              <button
                className="advanced-clear"
                onClick={() => onChange({ ...config, chapterRanges: {} })}
              >
                Restaurar todos os capítulos
              </button>
            )}
          </div>
        )}
      </div>

      {totalChapters > 0 && config.chaptersPerDay > 0 && (
        <div className="plan-summary">
          <div className="summary-item">
            <span className="summary-value">{totalChapters}</span>
            <span className="summary-label">capítulos</span>
          </div>
          <div className="summary-divider" />
          <div className="summary-item">
            <span className="summary-value">{totalDays}</span>
            <span className="summary-label">dias</span>
          </div>
          <div className="summary-divider" />
          <div className="summary-item">
            <span className="summary-value">{months}</span>
            <span className="summary-label">{Math.round(totalDays / 30) === 1 ? "mês" : "meses"}</span>
          </div>
          {endDate && (
            <>
              <div className="summary-divider" />
              <div className="summary-item">
                <span className="summary-value">{endDate}</span>
                <span className="summary-label">conclusão</span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
