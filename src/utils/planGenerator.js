export function generatePlan({ selectedBooks, chaptersPerDay, startDate }) {
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

    const readings = allChapters.slice(i, i + chaptersPerDay);
    days.push({ date, dayNumber: dayIndex + 1, readings });

    i += chaptersPerDay;
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

export function formatReadings(readings) {
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
    .map(g => g.start === g.end ? `${g.bookName} ${g.start}` : `${g.bookName} ${g.start}-${g.end}`)
    .join("; ");
}
