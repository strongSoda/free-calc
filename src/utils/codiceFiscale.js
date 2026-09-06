// src/utils/codiceFiscale.js
// Calcolo, decodifica e verifica del codice fiscale italiano.
// Algoritmo: D.M. 23 dicembre 1976 (Ministero delle Finanze).

export const VOCALI = "AEIOU";
export const MESI = "ABCDEHLMPRST"; // gennaio → dicembre
export const NOMI_MESI = [
  "gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno",
  "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre",
];

/** Toglie accenti, apostrofi, spazi e tutto ciò che non è una lettera A-Z. */
export const normalizza = (testo) =>
  String(testo || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toUpperCase()
    .replace(/[^A-Z]/g, "");

const consonanti = (s) => s.split("").filter((c) => !VOCALI.includes(c)).join("");
const vocali = (s) => s.split("").filter((c) => VOCALI.includes(c)).join("");

/**
 * Cognome: prima le consonanti, poi le vocali, si prendono i primi 3
 * caratteri. Se non bastano si completa con la X.
 */
export const codificaCognome = (cognome) => {
  const s = normalizza(cognome);
  if (!s) throw new Error("Il cognome è obbligatorio");
  return (consonanti(s) + vocali(s) + "XXX").slice(0, 3);
};

/**
 * Nome: se ci sono almeno 4 consonanti si usano la 1ª, la 3ª e la 4ª,
 * altrimenti si procede come per il cognome.
 */
export const codificaNome = (nome) => {
  const s = normalizza(nome);
  if (!s) throw new Error("Il nome è obbligatorio");
  const cons = consonanti(s);
  if (cons.length >= 4) return cons[0] + cons[2] + cons[3];
  return (cons + vocali(s) + "XXX").slice(0, 3);
};

/**
 * Data e sesso: due cifre di anno, una lettera di mese, due cifre di giorno
 * (al giorno si sommano 40 per le donne).
 */
export const codificaDataSesso = (data, sesso) => {
  const d = data instanceof Date ? data : new Date(`${data}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) throw new Error("Data di nascita non valida");
  const sessoNorm = String(sesso || "").toUpperCase().charAt(0);
  if (sessoNorm !== "M" && sessoNorm !== "F") throw new Error("Indicare il sesso (M o F)");

  const anno = String(d.getUTCFullYear()).slice(-2);
  const mese = MESI[d.getUTCMonth()];
  const giorno = d.getUTCDate() + (sessoNorm === "F" ? 40 : 0);
  return { anno, mese, giorno: String(giorno).padStart(2, "0"), sesso: sessoNorm };
};

/* ------------------------------------------------------------------ *
 * Carattere di controllo
 * ------------------------------------------------------------------ */
const VALORI_PARI = {};
"0123456789".split("").forEach((c, i) => { VALORI_PARI[c] = i; });
"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach((c, i) => { VALORI_PARI[c] = i; });

const VALORI_DISPARI = {
  0: 1, 1: 0, 2: 5, 3: 7, 4: 9, 5: 13, 6: 15, 7: 17, 8: 19, 9: 21,
  A: 1, B: 0, C: 5, D: 7, E: 9, F: 13, G: 15, H: 17, I: 19, J: 21,
  K: 2, L: 4, M: 18, N: 20, O: 11, P: 3, Q: 6, R: 8, S: 12, T: 14,
  U: 16, V: 10, W: 22, X: 25, Y: 24, Z: 23,
};

/** Calcola il 16° carattere a partire dai primi 15. */
export const carattereControllo = (primi15) => {
  const s = String(primi15).toUpperCase();
  if (s.length !== 15) throw new Error("Servono esattamente 15 caratteri per il codice di controllo");
  let somma = 0;
  for (let i = 0; i < 15; i++) {
    const c = s[i];
    // Le posizioni si contano da 1: la 1ª è dispari.
    const valore = (i + 1) % 2 === 1 ? VALORI_DISPARI[c] : VALORI_PARI[c];
    if (valore === undefined) throw new Error(`Carattere non valido nel codice fiscale: "${c}"`);
    somma += valore;
  }
  return String.fromCharCode(65 + (somma % 26));
};

/* ------------------------------------------------------------------ *
 * Omocodia: quando due persone otterrebbero lo stesso codice, l'Agenzia
 * delle Entrate sostituisce le cifre (da destra) con lettere.
 * ------------------------------------------------------------------ */
export const SOSTITUZIONI_OMOCODIA = {
  0: "L", 1: "M", 2: "N", 3: "P", 4: "Q", 5: "R", 6: "S", 7: "T", 8: "U", 9: "V",
};
export const OMOCODIA_INVERSA = Object.fromEntries(
  Object.entries(SOSTITUZIONI_OMOCODIA).map(([cifra, lettera]) => [lettera, cifra])
);

// Le sole posizioni che nel codice base contengono cifre.
const POSIZIONI_NUMERICHE = [6, 7, 9, 10, 12, 13, 14];

/** Riporta un codice con omocodia alla sua forma numerica di base. */
export const rimuoviOmocodia = (cf) => {
  const chars = cf.toUpperCase().split("");
  let sostituzioni = 0;
  for (const pos of POSIZIONI_NUMERICHE) {
    const c = chars[pos];
    if (c && OMOCODIA_INVERSA[c] !== undefined) {
      chars[pos] = OMOCODIA_INVERSA[c];
      sostituzioni++;
    }
  }
  return { base: chars.join(""), sostituzioni };
};

/** Genera la variante di omocodia di livello n (1 = prima variante). */
export const applicaOmocodia = (cf, livello) => {
  if (!livello) return cf;
  const chars = cf.toUpperCase().split("");
  // Si sostituisce a partire dalla cifra più a destra.
  const daSostituire = [...POSIZIONI_NUMERICHE].reverse().slice(0, livello);
  for (const pos of daSostituire) {
    const c = chars[pos];
    if (SOSTITUZIONI_OMOCODIA[c] !== undefined) chars[pos] = SOSTITUZIONI_OMOCODIA[c];
  }
  return chars.slice(0, 15).join("") + carattereControllo(chars.slice(0, 15).join(""));
};

/* ------------------------------------------------------------------ *
 * Calcolo completo
 * ------------------------------------------------------------------ */
/**
 * @param {{cognome:string, nome:string, sesso:"M"|"F", dataNascita:string,
 *          codiceCatastale:string, nomeLuogo?:string}} dati
 */
export const calcolaCodiceFiscale = (dati) => {
  const { cognome, nome, sesso, dataNascita, codiceCatastale, nomeLuogo } = dati;

  const codice = String(codiceCatastale || "").toUpperCase().trim();
  if (!/^[A-Z]\d{3}$/.test(codice)) {
    throw new Error("Selezionare il comune o lo Stato estero di nascita");
  }

  const cCognome = codificaCognome(cognome);
  const cNome = codificaNome(nome);
  const { anno, mese, giorno, sesso: sessoNorm } = codificaDataSesso(dataNascita, sesso);

  const primi15 = `${cCognome}${cNome}${anno}${mese}${giorno}${codice}`;
  const controllo = carattereControllo(primi15);
  const cf = primi15 + controllo;

  const d = new Date(`${dataNascita}T00:00:00Z`);
  const passaggi = [
    {
      titolo: "Cognome",
      valore: cCognome,
      spiegazione: `Da "${cognome}" si prendono prima le consonanti, poi le vocali, fermandosi a tre caratteri.`,
    },
    {
      titolo: "Nome",
      valore: cNome,
      spiegazione:
        consonanti(normalizza(nome)).length >= 4
          ? `"${nome}" ha almeno quattro consonanti, quindi si usano la prima, la terza e la quarta.`
          : `"${nome}" ha meno di quattro consonanti, quindi si procede come per il cognome: consonanti e poi vocali.`,
    },
    {
      titolo: "Anno di nascita",
      valore: anno,
      spiegazione: `Le ultime due cifre dell'anno ${d.getUTCFullYear()}.`,
    },
    {
      titolo: "Mese di nascita",
      valore: mese,
      spiegazione: `A ogni mese corrisponde una lettera: ${NOMI_MESI[d.getUTCMonth()]} → ${mese}.`,
    },
    {
      titolo: "Giorno e sesso",
      valore: giorno,
      spiegazione:
        sessoNorm === "F"
          ? `Per le donne al giorno di nascita (${d.getUTCDate()}) si sommano 40, quindi ${giorno}.`
          : `Per gli uomini si indica il giorno di nascita così com'è: ${giorno}.`,
    },
    {
      titolo: "Luogo di nascita",
      valore: codice,
      spiegazione: `Codice catastale (Belfiore) di ${nomeLuogo || "il luogo selezionato"}.`,
    },
    {
      titolo: "Carattere di controllo",
      valore: controllo,
      spiegazione:
        "Si sommano i valori dei primi 15 caratteri usando due tabelle diverse per le posizioni dispari e pari; il resto della divisione per 26 dà la lettera finale.",
    },
  ];

  return { codiceFiscale: cf, primi15, controllo, passaggi, parti: { cCognome, cNome, anno, mese, giorno, codice, controllo } };
};

/* ------------------------------------------------------------------ *
 * Verifica
 * ------------------------------------------------------------------ */
const FORMATO = /^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/;
const FORMATO_OMOCODIA = /^[A-Z]{6}[\dLMNPQRSTUV]{2}[A-Z][\dLMNPQRSTUV]{2}[A-Z][\dLMNPQRSTUV]{3}[A-Z]$/;

/**
 * Controlla lunghezza, formato e carattere di controllo.
 * @returns {{valido:boolean, errori:string[], omocodia:boolean, atteso?:string}}
 */
export const verificaCodiceFiscale = (input) => {
  const cf = String(input || "").toUpperCase().replace(/\s/g, "");
  const errori = [];

  if (!cf) return { valido: false, errori: ["Inserire un codice fiscale."], omocodia: false, cf };
  if (cf.length !== 16) {
    errori.push(`Il codice fiscale deve avere 16 caratteri: questo ne ha ${cf.length}.`);
    return { valido: false, errori, omocodia: false, cf };
  }
  if (/[^A-Z0-9]/.test(cf)) {
    errori.push("Il codice fiscale può contenere solo lettere e cifre.");
    return { valido: false, errori, omocodia: false, cf };
  }

  const omocodia = !FORMATO.test(cf) && FORMATO_OMOCODIA.test(cf);
  if (!FORMATO.test(cf) && !omocodia) {
    errori.push(
      "Il formato non è corretto: servono 6 lettere, 2 cifre, 1 lettera, 2 cifre, 1 lettera, 3 cifre e 1 lettera finale."
    );
    return { valido: false, errori, omocodia: false, cf };
  }

  // Prima i controlli di merito, che danno messaggi più utili, poi il
  // carattere di controllo.
  const { base } = rimuoviOmocodia(cf);
  const meseIdx = MESI.indexOf(base[8]);
  if (meseIdx === -1) {
    errori.push(
      `"${base[8]}" non è una lettera di mese valida: i mesi si scrivono con ${MESI.split("").join(", ")}.`
    );
  }
  const giorno = parseInt(base.slice(9, 11), 10);
  const giornoReale = giorno > 40 ? giorno - 40 : giorno;
  if (!Number.isFinite(giornoReale) || giornoReale < 1 || giornoReale > 31) {
    errori.push(`Il giorno di nascita indicato (${giornoReale}) non è valido.`);
  }

  let atteso;
  try {
    atteso = carattereControllo(cf.slice(0, 15));
  } catch (e) {
    errori.push(e.message);
    return { valido: false, errori, omocodia, cf };
  }

  if (atteso !== cf[15]) {
    errori.push(
      `Il carattere di controllo non corrisponde: l'ultimo carattere dovrebbe essere "${atteso}" e non "${cf[15]}".`
    );
  }

  return { valido: errori.length === 0, errori, omocodia, cf, atteso };
};

/* ------------------------------------------------------------------ *
 * Codice fiscale inverso
 * ------------------------------------------------------------------ */
/**
 * Estrae dal codice fiscale tutto ciò che vi è codificato.
 * @param {string} input codice fiscale
 * @param {(codice:string)=>({nome:string,provincia:string,attivo:boolean}|null)} [cercaLuogo]
 */
export const decodificaCodiceFiscale = (input, cercaLuogo) => {
  const verifica = verificaCodiceFiscale(input);
  const cf = verifica.cf;
  if (!cf || cf.length !== 16) return { verifica, dati: null };

  const { base, sostituzioni } = rimuoviOmocodia(cf);

  const meseIdx = MESI.indexOf(base[8]);
  const giornoRaw = parseInt(base.slice(9, 11), 10);
  const femmina = giornoRaw > 40;
  const giorno = femmina ? giornoRaw - 40 : giornoRaw;
  const annoDue = parseInt(base.slice(6, 8), 10);

  // Il codice porta solo due cifre di anno: si sceglie il secolo che dà una
  // data non futura, che è l'interpretazione corretta nella pratica.
  const annoCorrente = new Date().getUTCFullYear();
  let anno = 1900 + annoDue;
  if (anno + 100 <= annoCorrente) anno += 100;
  else if (anno > annoCorrente) anno -= 100;

  const codiceLuogo = base.slice(11, 15);
  const luogo = typeof cercaLuogo === "function" ? cercaLuogo(codiceLuogo) : null;

  const dataValida =
    meseIdx >= 0 &&
    giorno >= 1 &&
    giorno <= 31 &&
    new Date(Date.UTC(anno, meseIdx, giorno)).getUTCDate() === giorno;

  return {
    verifica,
    dati: {
      cognome: base.slice(0, 3),
      nome: base.slice(3, 6),
      anno,
      mese: meseIdx >= 0 ? meseIdx + 1 : null,
      nomeMese: meseIdx >= 0 ? NOMI_MESI[meseIdx] : null,
      giorno,
      dataNascita: dataValida
        ? `${anno}-${String(meseIdx + 1).padStart(2, "0")}-${String(giorno).padStart(2, "0")}`
        : null,
      dataValida,
      sesso: femmina ? "F" : "M",
      codiceLuogo,
      luogo,
      estero: codiceLuogo[0] === "Z",
      omocodia: sostituzioni > 0,
      sostituzioniOmocodia: sostituzioni,
      carattereControllo: cf[15],
    },
  };
};
