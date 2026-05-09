"use client";

import { AT_BOOKS, NT_BOOKS, DEUTERO_BOOKS } from "@/data/bible";

const GROUPS = [
  { label: "Pentateuco",           ids: [1, 2, 3, 4, 5] },
  { label: "Históricos",           ids: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17] },
  { label: "Poéticos",             ids: [18, 19, 20, 21, 22] },
  { label: "Proféticos Maiores",   ids: [23, 24, 25, 26, 27] },
  { label: "Proféticos Menores",   ids: [28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39] },
  { label: "Evangelhos & Atos",    ids: [40, 41, 42, 43, 44] },
  { label: "Paulinas",             ids: [45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57] },
  { label: "Gerais & Apocalipse",  ids: [58, 59, 60, 61, 62, 63, 64, 65, 66] },
];

const DEUTERO_GROUP = { label: "Deuterocanônicos", ids: [67, 68, 69, 70, 71, 72, 73] };

function BookGroup({ group, allBooks, selectedIds, onChange }) {
  const books = allBooks.filter(b => group.ids.includes(b.id));
  const allSelected = books.every(b => selectedIds.includes(b.id));
  const someSelected = books.some(b => selectedIds.includes(b.id));

  const toggleGroup = () => {
    if (allSelected) {
      onChange(selectedIds.filter(id => !group.ids.includes(id)));
    } else {
      onChange([...new Set([...selectedIds, ...group.ids])]);
    }
  };

  const toggle = (id) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter(x => x !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  return (
    <div className="book-group">
      <div className="group-header" onClick={toggleGroup}>
        <span className={`group-check ${allSelected ? "checked" : someSelected ? "partial" : ""}`} />
        <span className="group-label">{group.label}</span>
        <span className="group-count">{books.length} livros</span>
      </div>
      <div className="books-grid">
        {books.map(book => (
          <label key={book.id} className={`book-chip ${selectedIds.includes(book.id) ? "selected" : ""}`}>
            <input type="checkbox" checked={selectedIds.includes(book.id)} onChange={() => toggle(book.id)} />
            <span className="chip-abbr">{book.abbr}</span>
            <span className="chip-name">{book.name}</span>
            <span className="chip-chapters">{book.chapters}c</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default function BookSelector({ selectedIds, onChange, edition, onEditionChange }) {
  const allBooks = edition === "catolica"
    ? [...AT_BOOKS, ...DEUTERO_BOOKS, ...NT_BOOKS]
    : [...AT_BOOKS, ...NT_BOOKS];

  const totalChapters = allBooks
    .filter(b => selectedIds.includes(b.id))
    .reduce((s, b) => s + b.chapters, 0);

  const selectAll = () => onChange(allBooks.map(b => b.id));
  const clearAll  = () => onChange([]);
  const selectAT  = () => {
    const ntIds = NT_BOOKS.map(b => b.id).filter(id => selectedIds.includes(id));
    const atBase = AT_BOOKS.map(b => b.id);
    const deuteroIds = edition === "catolica" ? DEUTERO_BOOKS.map(b => b.id) : [];
    onChange([...atBase, ...deuteroIds, ...ntIds]);
  };
  const selectNT  = () => {
    const atIds = allBooks.filter(b => b.testament === "AT").map(b => b.id).filter(id => selectedIds.includes(id));
    onChange([...atIds, ...NT_BOOKS.map(b => b.id)]);
  };

  return (
    <div className="book-selector">
      <div className="edition-selector">
        <button
          className={`edition-btn ${edition === "protestante" ? "active" : ""}`}
          onClick={() => onEditionChange("protestante")}
        >
          Protestante
          <span className="edition-count">66 livros</span>
        </button>
        <button
          className={`edition-btn ${edition === "catolica" ? "active" : ""}`}
          onClick={() => onEditionChange("catolica")}
        >
          Católica
          <span className="edition-count">73 livros</span>
        </button>
      </div>

      <div className="quick-btns">
        <button className="btn-outline" onClick={selectAll}>Bíblia Completa</button>
        <button className="btn-outline" onClick={selectAT}>Antigo Testamento</button>
        <button className="btn-outline" onClick={selectNT}>Novo Testamento</button>
        <button className="btn-outline btn-clear" onClick={clearAll}>Limpar</button>
      </div>

      <div className="selection-info">
        {selectedIds.length} livro{selectedIds.length !== 1 ? "s" : ""} selecionado{selectedIds.length !== 1 ? "s" : ""}
        {selectedIds.length > 0 && <span> — {totalChapters} capítulos</span>}
      </div>

      {GROUPS.map(group => (
        <BookGroup key={group.label} group={group} allBooks={allBooks} selectedIds={selectedIds} onChange={onChange} />
      ))}

      {edition === "catolica" && (
        <BookGroup group={DEUTERO_GROUP} allBooks={allBooks} selectedIds={selectedIds} onChange={onChange} />
      )}
    </div>
  );
}
