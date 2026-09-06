// src/data/codiceFiscaleLinks.js
// Le pagine della sezione italiana, usate per i link interni e i breadcrumb.
export const CF_PAGES = {
  calcola: {
    url: "/it/codice-fiscale",
    title: "Calcolo Codice Fiscale",
    description: "Calcola il codice fiscale dai tuoi dati anagrafici, passo per passo",
  },
  inverso: {
    url: "/it/codice-fiscale/inverso",
    title: "Codice Fiscale Inverso",
    description: "Risali a data di nascita, sesso e comune partendo dal codice",
  },
  verifica: {
    url: "/it/codice-fiscale/verifica",
    title: "Verifica Codice Fiscale",
    description: "Controlla se un codice fiscale è formalmente corretto",
  },
  estero: {
    url: "/it/codice-fiscale/estero",
    title: "Codice Fiscale per Nati all'Estero",
    description: "Come funziona il codice fiscale per chi è nato fuori dall'Italia",
  },
  trova: {
    url: "/it/codice-fiscale/trova",
    title: "Come Trovare il Proprio Codice Fiscale",
    description: "Dove recuperare il tuo codice fiscale e cosa dice la legge",
  },
};

export const cfCorrelati = (...chiavi) => chiavi.map((k) => CF_PAGES[k]).filter(Boolean);
