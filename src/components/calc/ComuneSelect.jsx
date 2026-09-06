// src/components/calc/ComuneSelect.jsx
// Ricerca del comune o dello Stato estero di nascita.
// L'elenco completo (oltre 10.000 voci, compresi i comuni soppressi) pesa
// troppo per essere incluso nel bundle: si carica al primo utilizzo.
import React, { useState, useEffect, useRef, useMemo } from "react";

let cache = null;
let inflight = null;

export const caricaComuni = () => {
  if (cache) return Promise.resolve(cache);
  if (!inflight) {
    inflight = fetch("/data/comuni-cf.json")
      .then((r) => {
        if (!r.ok) throw new Error("Elenco dei comuni non disponibile");
        return r.json();
      })
      .then((data) => {
        cache = data.rows.map(([codice, nome, provincia, attivo, popolazione]) => ({
          codice,
          nome,
          provincia,
          attivo: attivo === 1,
          popolazione,
          ricerca: nome
            .toUpperCase()
            .normalize("NFD")
            .replace(/[̀-ͯ]/g, ""),
        }));
        return cache;
      })
      .finally(() => {
        inflight = null;
      });
  }
  return inflight;
};

const normalizzaRicerca = (s) =>
  String(s).toUpperCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

const ComuneSelect = ({ value, onChange, label = "Comune o Stato estero di nascita", id = "comune" }) => {
  const [query, setQuery] = useState(value ? value.nome : "");
  const [lista, setLista] = useState(cache);
  const [aperto, setAperto] = useState(false);
  const [caricamento, setCaricamento] = useState(false);
  const [errore, setErrore] = useState("");
  const [evidenziato, setEvidenziato] = useState(0);
  const boxRef = useRef(null);

  useEffect(() => {
    if (value && value.nome !== query) setQuery(value.nome);
    // Si aggiorna solo quando cambia la selezione dall'esterno.
  }, [value && value.codice]);

  const assicuraDati = () => {
    if (lista || caricamento) return;
    setCaricamento(true);
    caricaComuni()
      .then((rows) => {
        setLista(rows);
        setErrore("");
      })
      .catch((e) => setErrore(e.message || "Impossibile caricare l'elenco dei comuni"))
      .finally(() => setCaricamento(false));
  };

  useEffect(() => {
    const fuori = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) setAperto(false);
    };
    document.addEventListener("mousedown", fuori);
    return () => document.removeEventListener("mousedown", fuori);
  }, []);

  const risultati = useMemo(() => {
    if (!lista || query.trim().length < 2) return [];
    const q = normalizzaRicerca(query.trim());
    const iniziano = [];
    const contengono = [];
    for (const c of lista) {
      if (c.ricerca.startsWith(q)) iniziano.push(c);
      else if (c.ricerca.includes(q)) contengono.push(c);
      if (iniziano.length > 60) break;
    }
    const ordina = (a, b) =>
      Number(b.attivo) - Number(a.attivo) ||
      b.popolazione - a.popolazione ||
      a.nome.localeCompare(b.nome, "it");
    return [...iniziano.sort(ordina), ...contengono.sort(ordina)].slice(0, 12);
  }, [lista, query]);

  const scegli = (c) => {
    onChange(c);
    setQuery(c.nome);
    setAperto(false);
  };

  const suTasto = (e) => {
    if (!aperto || !risultati.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setEvidenziato((i) => Math.min(i + 1, risultati.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setEvidenziato((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      scegli(risultati[evidenziato] || risultati[0]);
    } else if (e.key === "Escape") {
      setAperto(false);
    }
  };

  return (
    <div ref={boxRef} className="relative">
      <label htmlFor={id} className="block text-sm font-medium mb-1.5">
        {label}
      </label>
      <input
        id={id}
        type="text"
        autoComplete="off"
        role="combobox"
        aria-expanded={aperto}
        aria-controls={`${id}-lista`}
        value={query}
        placeholder="Es. Roma, Milano, Germania…"
        onFocus={() => {
          assicuraDati();
          setAperto(true);
        }}
        onChange={(e) => {
          setQuery(e.target.value);
          setEvidenziato(0);
          assicuraDati();
          setAperto(true);
          if (value) onChange(null);
        }}
        onKeyDown={suTasto}
        className="w-full px-3 py-2 rounded-lg border border-gray-200/40 dark:border-gray-700/60 bg-surface-light dark:bg-surface-dark text-content-light dark:text-content-dark focus:outline-none focus:ring-2 focus:ring-accent-primary/50"
      />

      {value && (
        <p className="mt-1 text-xs text-accent-success">
          Selezionato: {value.nome} ({value.provincia}) — codice catastale {value.codice}
        </p>
      )}
      {errore && <p className="mt-1 text-xs text-accent-error">{errore}</p>}
      {caricamento && !lista && (
        <p className="mt-1 text-xs text-content-light-dimmed dark:text-content-dark-dimmed">
          Caricamento dell'elenco dei comuni…
        </p>
      )}
      {aperto && lista && query.trim().length >= 2 && risultati.length === 0 && (
        <p className="mt-1 text-xs text-content-light-dimmed dark:text-content-dark-dimmed">
          Nessun comune trovato. Provare con il nome ufficiale, oppure con lo Stato estero di nascita.
        </p>
      )}

      {aperto && risultati.length > 0 && (
        <ul
          id={`${id}-lista`}
          role="listbox"
          className="absolute z-30 mt-1 w-full max-h-72 overflow-auto rounded-lg border border-gray-200/40 dark:border-gray-700/60 bg-surface-light dark:bg-surface-dark shadow-xl"
        >
          {risultati.map((c, i) => (
            <li key={`${c.codice}-${c.nome}`} role="option" aria-selected={i === evidenziato}>
              <button
                type="button"
                onMouseEnter={() => setEvidenziato(i)}
                onClick={() => scegli(c)}
                className={`w-full text-left px-3 py-2 flex items-center justify-between gap-3 ${
                  i === evidenziato ? "bg-accent-primary/10" : ""
                }`}
              >
                <span>
                  <span className="font-medium">{c.nome}</span>
                  <span className="ml-2 text-xs text-content-light-dimmed dark:text-content-dark-dimmed">
                    {c.codice[0] === "Z" ? "Stato estero" : `prov. ${c.provincia}`}
                    {!c.attivo && " · soppresso"}
                  </span>
                </span>
                <span className="font-mono text-xs text-accent-primary">{c.codice}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ComuneSelect;
