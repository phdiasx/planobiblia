"use client";

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

export default function PlanConfig({ config, onChange, selectedIds }) {
  const totalChapters = BOOKS.filter(b => selectedIds.includes(b.id))
    .reduce((s, b) => s + b.chapters, 0);

  const totalDays = config.chaptersPerDay > 0
    ? Math.ceil(totalChapters / config.chaptersPerDay)
    : 0;

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
