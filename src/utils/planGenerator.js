export function generatePlan({ selectedBooks, chaptersPerDay, startDate, dayOverrides = {} }) {
  const allChapters = [];
  for (const book of selectedBooks) {
    for (let ch = 1; ch <= book.chapters; ch++) {
      allChapters.push({ bookName: book.name, abbr: book.abbr, chapter: ch });
    }
  }

  const days = [];
  let i = 0;
  let dayIndex = 0;
  const start = new Date(startDate + "T00:00:00");

  while (i < allChapters.length) {
    const date = new Date(start);
    date.setDate(start.getDate() + dayIndex);

    const dow = date.getDay();
    const caps = dayOverrides[dow] !== undefined ? dayOverrides[dow] : chaptersPerDay;

    const readings = allChapters.slice(i, i + caps);
    days.push({ date, dayNumber: days.length + 1, readings });

    i += caps;
    dayIndex++;
  }

  return days;
}

export function formatDate(date) {
  return date.toLocaleDateString("pt-BR", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function formatReadings(readings, { useAbbr = false } = {}) {
  if (!readings.length) return "";

  const groups = [];
  let current = { bookName: readings[0].bookName, abbr: readings[0].abbr, start: readings[0].chapter, end: readings[0].chapter };

  for (let i = 1; i < readings.length; i++) {
    const r = readings[i];
    if (r.bookName === current.bookName && r.chapter === current.end + 1) {
      current.end = r.chapter;
    } else {
      groups.push(current);
      current = { bookName: r.bookName, abbr: r.abbr, start: r.chapter, end: r.chapter };
    }
  }
  groups.push(current);

  return groups
    .map(g => {
      const label = useAbbr ? g.abbr : g.bookName;
      return g.start === g.end ? `${label} ${g.start}` : `${label} ${g.start}-${g.end}`;
    })
    .join("; ");
}
