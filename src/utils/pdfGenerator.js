import { formatReadings } from "./planGenerator";

// ─── Dimensões A4 ─────────────────────────────────────────────
const PW = 210, PH = 297;
const ML = 11, MR = 11;
const CGAP = 6;
const COLS = 2;
const CW = (PW - ML - MR - CGAP) / COLS;

const HDR_H  = 20;
const STAT_H = 12;
const CHDR_H = 7;
const WEEK_H = 6;
const ROW_H  = 7.5;
const FTR_H  = 9;

const BODY_Y0_P1 = HDR_H + STAT_H + CHDR_H;
const BODY_Y0_PN = HDR_H + CHDR_H;
const BODY_Y1    = PH - FTR_H;

const WHT = [255, 255, 255];

// ─── Temas ────────────────────────────────────────────────────
export const PDF_THEMES = {
  classico: {
    label:    "Clássico",
    swatches: ["#1f4e79", "#be9623", "#f2f7fd"],
    hdr:    [31,  78, 121],
    hdr2:   [46, 117, 182],
    hdrL:   [218, 232, 246],
    hdrXL:  [242, 247, 253],
    hdrSub: [185, 210, 236],
    acc:    [190, 150,  35],
    drk:    [20,  25,  40],
    mid:    [100, 110, 125],
    lit:    [165, 175, 188],
    bdr:    [205, 213, 222],
    evn:    [247, 250, 254],
    wkg:    [235, 244, 253],
  },
  minimalista: {
    label:    "Minimalista",
    swatches: ["#1e1e1e", "#555555", "#f5f5f5"],
    hdr:    [30,  30,  30],
    hdr2:   [80,  80,  80],
    hdrL:   [200, 200, 200],
    hdrXL:  [245, 245, 245],
    hdrSub: [180, 180, 180],
    acc:    [80,  80,  80],
    drk:    [20,  20,  20],
    mid:    [100, 100, 100],
    lit:    [160, 160, 160],
    bdr:    [210, 210, 210],
    evn:    [248, 248, 248],
    wkg:    [235, 235, 235],
  },
  sepia: {
    label:    "Sépia",
    swatches: ["#73604d", "#c07a35", "#f7f2ed"],
    hdr:    [115,  96,  77],
    hdr2:   [156, 143, 137],
    hdrL:   [216, 191, 171],
    hdrXL:  [247, 242, 237],
    hdrSub: [200, 175, 155],
    acc:    [192, 122,  53],
    drk:    [44,  35,  25],
    mid:    [120, 100,  80],
    lit:    [180, 160, 140],
    bdr:    [210, 195, 180],
    evn:    [252, 247, 242],
    wkg:    [240, 228, 215],
  },
  floresta: {
    label:    "Floresta",
    swatches: ["#2c5530", "#8a7a28", "#f0f8f0"],
    hdr:    [44,  85,  48],
    hdr2:   [76, 120,  80],
    hdrL:   [180, 215, 182],
    hdrXL:  [240, 248, 240],
    hdrSub: [160, 200, 162],
    acc:    [138, 122,  40],
    drk:    [20,  35,  20],
    mid:    [80, 110,  80],
    lit:    [140, 170, 140],
    bdr:    [195, 220, 195],
    evn:    [244, 250, 244],
    wkg:    [225, 242, 225],
  },
};

// ─── Helpers ──────────────────────────────────────────────────
const colX = (c) => ML + c * (CW + CGAP);
function fi(doc, arr) { doc.setFillColor(...arr); }
function dr(doc, arr) { doc.setDrawColor(...arr); }
function tx(doc, arr) { doc.setTextColor(...arr); }
function sa(str) { return str.normalize("NFD").replace(/[̀-ͯ]/g, ""); }

// ─── Pré-cálculo de páginas ───────────────────────────────────
function calcTotalPages(items) {
  let page = 1, col = 0, y = 0;
  for (const item of items) {
    const h = item.type === "week" ? WEEK_H : ROW_H;
    const bh = page === 1 ? BODY_Y1 - BODY_Y0_P1 : BODY_Y1 - BODY_Y0_PN;
    if (y + h > bh) {
      y = 0; col++;
      if (col >= COLS) { col = 0; page++; }
    }
    y += h;
  }
  return page;
}

// ─── Cabeçalho da página ──────────────────────────────────────
function drawPageHeader(doc, name, pageNum, totalPages, pal) {
  fi(doc, pal.hdr);
  doc.rect(0, 0, PW, HDR_H, "F");

  fi(doc, pal.acc);
  doc.rect(0, 0, 3.5, HDR_H, "F");

  tx(doc, WHT);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text(name, ML + 5, 9);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  tx(doc, pal.hdrSub);
  doc.text("Plano de Leitura Biblica", ML + 5, 16);

  tx(doc, WHT);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text(`${pageNum} / ${totalPages}`, PW - MR, 10.5, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  tx(doc, pal.hdrSub);
  doc.text("pagina", PW - MR, 17, { align: "right" });
}

// ─── Barra de estatísticas (1ª página) ───────────────────────
function drawStatsBar(doc, days, chapPerDay, totalCap, pal) {
  const y = HDR_H;
  fi(doc, pal.hdrXL);
  doc.rect(0, y, PW, STAT_H, "F");
  dr(doc, pal.bdr);
  doc.setLineWidth(0.35);
  doc.line(0, y + STAT_H, PW, y + STAT_H);

  const fmt = (d) => d?.toLocaleDateString("pt-BR", {
    day: "2-digit", month: "2-digit", year: "numeric",
  }) ?? "";

  const stats = [
    { v: fmt(days[0]?.date),               l: "INICIO"    },
    { v: fmt(days[days.length - 1]?.date), l: "TERMINO"   },
    { v: String(days.length),              l: "DIAS"      },
    { v: `${chapPerDay}x`,                l: "CAP./DIA"  },
    { v: String(totalCap),               l: "CAPITULOS" },
  ];

  const sw = PW / stats.length;
  stats.forEach(({ v, l }, i) => {
    const cx = i * sw + sw / 2;
    tx(doc, pal.hdr);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.text(v, cx, y + 5.5, { align: "center" });
    tx(doc, pal.mid);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(5.8);
    doc.text(l, cx, y + 9.5, { align: "center" });
  });

  dr(doc, pal.hdrL);
  doc.setLineWidth(0.3);
  for (let i = 1; i < stats.length; i++) {
    doc.line(i * sw, y + 2.5, i * sw, y + STAT_H - 2.5);
  }
}

// ─── Cabeçalho de uma coluna ─────────────────────────────────
function drawColHeader(doc, y, c, pal) {
  const x = colX(c);
  fi(doc, pal.hdrL);
  doc.rect(x, y, CW, CHDR_H, "F");
  dr(doc, pal.hdr2);
  doc.setLineWidth(0.5);
  doc.line(x, y + CHDR_H, x + CW, y + CHDR_H);

  tx(doc, pal.hdr);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(6);
  doc.text("DIA",     x + 6,  y + 4.7);
  doc.text("DATA",    x + 19, y + 4.7);
  doc.text("LEITURA", x + 34, y + 4.7);
}

// ─── Divisória vertical entre colunas ────────────────────────
function drawColDivider(doc, bodyY0, pal) {
  const x = ML + CW + CGAP / 2;
  dr(doc, pal.bdr);
  doc.setLineWidth(0.2);
  doc.line(x, bodyY0 - CHDR_H, x, BODY_Y1);
}

// ─── Rodapé ───────────────────────────────────────────────────
function drawFooter(doc, name, fromDay, toDay, totalDays, pal) {
  const y = BODY_Y1;
  dr(doc, pal.bdr);
  doc.setLineWidth(0.3);
  doc.line(ML, y + 1.5, PW - MR, y + 1.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  tx(doc, pal.lit);
  doc.text(name, ML, y + 6);
  doc.text(`Dias ${fromDay}–${toDay} de ${totalDays}`, PW / 2, y + 6, { align: "center" });
  doc.text("gerado por Plano Biblico", PW - MR, y + 6, { align: "right" });
}

// ─── Separador de semana ──────────────────────────────────────
function drawWeekRow(doc, x, y, num, pal) {
  fi(doc, pal.wkg);
  doc.rect(x, y, CW, WEEK_H, "F");
  dr(doc, pal.hdrL);
  doc.setLineWidth(0.2);
  doc.line(x, y + WEEK_H, x + CW, y + WEEK_H);

  const mid = y + WEEK_H / 2;
  const lx1 = x + 4,           lx2 = x + CW / 2 - 14;
  const lx3 = x + CW / 2 + 14, lx4 = x + CW - 4;
  dr(doc, pal.hdr2);
  doc.setLineWidth(0.3);
  doc.line(lx1, mid, lx2, mid);
  doc.line(lx3, mid, lx4, mid);

  tx(doc, pal.hdr2);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(6.5);
  doc.text(`SEMANA ${num}`, x + CW / 2, y + 4.1, { align: "center" });
}

// ─── Linha de dia ─────────────────────────────────────────────
function drawDayRow(doc, x, y, day, isEven, pal) {
  if (isEven) {
    fi(doc, pal.evn);
    doc.rect(x, y, CW, ROW_H, "F");
  }
  dr(doc, pal.bdr);
  doc.setLineWidth(0.12);
  doc.line(x, y + ROW_H, x + CW, y + ROW_H);

  dr(doc, pal.hdr2);
  doc.setLineWidth(0.45);
  const cbSz = 3.6;
  doc.roundedRect(x + 1.5, y + (ROW_H - cbSz) / 2, cbSz, cbSz, 0.5, 0.5);

  const vc = y + ROW_H * 0.47;
  const vs = y + ROW_H * 0.82;

  tx(doc, pal.hdr);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.text(String(day.dayNumber), x + 16, vc, { align: "right" });

  tx(doc, pal.mid);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.8);
  const dt = day.date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
  doc.text(dt, x + 18, vc);

  tx(doc, pal.lit);
  doc.setFontSize(5.5);
  const wd = day.date.toLocaleDateString("pt-BR", { weekday: "short" }).replace(".", "").slice(0, 3);
  doc.text(wd, x + 18, vs);

  tx(doc, pal.drk);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(6.8);
  const txt = sa(formatReadings(day.readings, { useAbbr: true }));
  const maxW = CW - 35;
  const lines = doc.splitTextToSize(txt, maxW);
  doc.text(lines[0] || "", x + 34, vc);
  if (lines.length > 1) {
    tx(doc, pal.mid);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(5.8);
    doc.text(lines[1], x + 34, vs);
  }
}

// ─── Exportar ─────────────────────────────────────────────────
export async function exportToPDF({ planName, days, chaptersPerDay, totalChapters, theme = "classico" }) {
  const { jsPDF } = await import("jspdf");
  const pal  = PDF_THEMES[theme] ?? PDF_THEMES.classico;
  const name = sa(planName || "Plano de Leitura Biblica");

  const items = [];
  for (let i = 0; i < days.length; i++) {
    if (i % 7 === 0) items.push({ type: "week", num: Math.floor(i / 7) + 1 });
    items.push({ type: "day", day: days[i], idx: i });
  }

  const totalPages = calcTotalPages(items);
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  doc.setFont("helvetica");

  let pageNum = 1, col = 0;
  let bodyY0 = BODY_Y0_P1;
  let curY   = bodyY0;
  let firstDay = days[0]?.dayNumber ?? 1;
  let lastDay  = firstDay;
  let firstDaySet = false;
  let col1HeaderDrawn = false;

  const chdrYForPage = () => pageNum === 1 ? HDR_H + STAT_H : HDR_H;

  const startPage = () => {
    drawPageHeader(doc, name, pageNum, totalPages, pal);
    if (pageNum === 1) drawStatsBar(doc, days, chaptersPerDay, totalChapters, pal);
    drawColHeader(doc, chdrYForPage(), 0, pal);
    col1HeaderDrawn = false;
  };

  const endPage = () => drawFooter(doc, name, firstDay, lastDay, days.length, pal);

  startPage();

  for (const item of items) {
    const h = item.type === "week" ? WEEK_H : ROW_H;

    if (curY + h > BODY_Y1) {
      if (col === 0) {
        col = 1;
        curY = bodyY0;
        if (!col1HeaderDrawn) {
          drawColHeader(doc, chdrYForPage(), 1, pal);
          drawColDivider(doc, chdrYForPage() + CHDR_H, pal);
          col1HeaderDrawn = true;
        }
      } else {
        endPage();
        doc.addPage();
        pageNum++;
        col = 0;
        bodyY0 = BODY_Y0_PN;
        curY   = bodyY0;
        firstDaySet = false;
        col1HeaderDrawn = false;
        startPage();
      }
    }

    const x = colX(col);

    if (item.type === "week") {
      drawWeekRow(doc, x, curY, item.num, pal);
    } else {
      if (!firstDaySet) { firstDay = item.day.dayNumber; firstDaySet = true; }
      lastDay = item.day.dayNumber;
      drawDayRow(doc, x, curY, item.day, item.idx % 2 === 0, pal);
    }

    curY += h;
  }

  endPage();
  doc.save(`${name.replace(/\s+/g, "-").toLowerCase()}.pdf`);
}
