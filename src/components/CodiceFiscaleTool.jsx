// src/components/CodiceFiscaleTool.jsx
// Un solo strumento con tre modalità: calcolo, calcolo inverso e verifica.
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Card, Button, Field, TextInput, Select, ErrorNote, ResultBanner, StepList, CopyButton } from "./calc/ui.jsx";
import ComuneSelect, { caricaComuni } from "./calc/ComuneSelect.jsx";
import {
  calcolaCodiceFiscale, verificaCodiceFiscale, decodificaCodiceFiscale, applicaOmocodia,
} from "../utils/codiceFiscale.js";

const MODI = {
  calcola: { azione: "Calcola il codice fiscale" },
  inverso: { azione: "Decodifica il codice fiscale" },
  verifica: { azione: "Verifica il codice fiscale" },
};

const CodiceFiscaleTool = ({
  modo = "calcola",
  comunePredefinito = null,
  datiPredefiniti = null,
  codicePredefinito = "",
  mostraSchede = true,
}) => {
  const [modoAttivo, setModoAttivo] = useState(modo);

  /* ---------------- calcolo ---------------- */
  const [dati, setDati] = useState({
    cognome: "", nome: "", sesso: "M", dataNascita: "",
    ...(datiPredefiniti || {}),
  });
  const [comune, setComune] = useState(comunePredefinito);
  const [risultato, setRisultato] = useState(null);
  const [errore, setErrore] = useState("");
  const [mostraOmocodie, setMostraOmocodie] = useState(false);

  /* ---------------- inverso / verifica ---------------- */
  const [codice, setCodice] = useState(codicePredefinito);
  const [luoghi, setLuoghi] = useState(null);

  useEffect(() => {
    if (modoAttivo === "calcola") return;
    // Serve la tabella dei codici catastali per dire dov'è nata la persona.
    caricaComuni()
      .then((rows) => {
        const mappa = new Map();
        for (const r of rows) if (!mappa.has(r.codice)) mappa.set(r.codice, r);
        setLuoghi(mappa);
      })
      .catch(() => setLuoghi(new Map()));
  }, [modoAttivo]);

  const cercaLuogo = useCallback(
    (cod) => {
      if (!luoghi) return null;
      const hit = luoghi.get(cod);
      return hit ? { nome: hit.nome, provincia: hit.provincia, attivo: hit.attivo } : null;
    },
    [luoghi]
  );

  const aggiorna = (chiave, valore) => setDati((d) => ({ ...d, [chiave]: valore }));

  const calcola = useCallback(() => {
    setErrore("");
    try {
      if (!dati.cognome || !dati.nome || !dati.dataNascita || !comune) {
        setRisultato(null);
        return;
      }
      setRisultato(
        calcolaCodiceFiscale({
          ...dati,
          codiceCatastale: comune.codice,
          nomeLuogo: `${comune.nome}${comune.codice[0] === "Z" ? "" : ` (${comune.provincia})`}`,
        })
      );
    } catch (e) {
      setRisultato(null);
      setErrore(e.message || "Non è stato possibile calcolare il codice fiscale.");
    }
  }, [dati, comune]);

  useEffect(() => {
    if (modoAttivo === "calcola") calcola();
  }, [calcola, modoAttivo]);

  const decodifica = useMemo(() => {
    if (modoAttivo === "calcola" || !codice.trim()) return null;
    return decodificaCodiceFiscale(codice, cercaLuogo);
  }, [codice, cercaLuogo, modoAttivo]);

  const verifica = useMemo(() => {
    if (modoAttivo !== "verifica" || !codice.trim()) return null;
    return verificaCodiceFiscale(codice);
  }, [codice, modoAttivo]);

  const omocodie = useMemo(() => {
    if (!risultato) return [];
    const out = [];
    for (let livello = 1; livello <= 3; livello++) {
      try {
        out.push(applicaOmocodia(risultato.codiceFiscale, livello));
      } catch {
        break;
      }
    }
    return out;
  }, [risultato]);

  return (
    <div className="space-y-6">
      {mostraSchede && (
        <div className="inline-flex flex-wrap rounded-lg border border-gray-200/20 dark:border-gray-800/40 p-1 bg-surface-light-hover dark:bg-surface-dark">
          {[
            { id: "calcola", label: "Calcola" },
            { id: "inverso", label: "Codice fiscale inverso" },
            { id: "verifica", label: "Verifica" },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setModoAttivo(t.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                modoAttivo === t.id
                  ? "bg-gradient-to-r from-accent-primary to-accent-secondary text-white"
                  : "text-content-light-dimmed dark:text-content-dark-dimmed"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}

      {modoAttivo === "calcola" ? (
        <>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Cognome">
              <TextInput
                value={dati.cognome}
                onChange={(e) => aggiorna("cognome", e.target.value)}
                placeholder="Rossi"
                autoComplete="family-name"
              />
            </Field>
            <Field label="Nome">
              <TextInput
                value={dati.nome}
                onChange={(e) => aggiorna("nome", e.target.value)}
                placeholder="Mario"
                autoComplete="given-name"
              />
            </Field>
            <Field label="Sesso">
              <Select value={dati.sesso} onChange={(e) => aggiorna("sesso", e.target.value)}>
                <option value="M">Maschile</option>
                <option value="F">Femminile</option>
              </Select>
            </Field>
            <Field label="Data di nascita">
              <TextInput
                type="date"
                value={dati.dataNascita}
                onChange={(e) => aggiorna("dataNascita", e.target.value)}
                max="2099-12-31"
              />
            </Field>
          </div>

          <ComuneSelect value={comune} onChange={setComune} />

          <ErrorNote>{errore}</ErrorNote>

          {risultato ? (
            <>
              <ResultBanner label="Il tuo codice fiscale" value={risultato.codiceFiscale}>
                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    [risultato.parti.cCognome, "cognome"],
                    [risultato.parti.cNome, "nome"],
                    [risultato.parti.anno, "anno"],
                    [risultato.parti.mese, "mese"],
                    [risultato.parti.giorno, "giorno e sesso"],
                    [risultato.parti.codice, "luogo"],
                    [risultato.parti.controllo, "controllo"],
                  ].map(([valore, etichetta]) => (
                    <span
                      key={etichetta}
                      className="px-3 py-1.5 rounded-lg bg-surface-light dark:bg-surface-dark border border-gray-200/20 dark:border-gray-800/40 text-center"
                    >
                      <span className="block font-mono font-bold text-accent-primary">{valore}</span>
                      <span className="block text-[11px] text-content-light-dimmed dark:text-content-dark-dimmed">
                        {etichetta}
                      </span>
                    </span>
                  ))}
                </div>
              </ResultBanner>

              <StepList
                title="Come si ottiene, passo per passo"
                steps={risultato.passaggi}
                renderStep={(p) => (
                  <div>
                    <div className="font-semibold mb-1">
                      {p.titolo}: <span className="font-mono text-accent-primary">{p.valore}</span>
                    </div>
                    <p className="text-sm text-content-light-dimmed dark:text-content-dark-dimmed">{p.spiegazione}</p>
                  </div>
                )}
              />

              <div className="flex flex-wrap items-center justify-between gap-3">
                <Button variant="secondary" onClick={() => setMostraOmocodie((v) => !v)}>
                  {mostraOmocodie ? "Nascondi le omocodie" : "Mostra le varianti di omocodia"}
                </Button>
                <CopyButton text={risultato.codiceFiscale} label="Copia il codice fiscale" />
              </div>

              {mostraOmocodie && (
                <Card
                  title="Varianti di omocodia"
                  subtitle="Se due persone otterrebbero lo stesso codice, l'Agenzia delle Entrate sostituisce le cifre con lettere, partendo da destra."
                >
                  <ul className="space-y-1 font-mono">
                    {omocodie.map((o, i) => (
                      <li key={o}>
                        <span className="text-content-light-dimmed dark:text-content-dark-dimmed text-sm mr-2">
                          {i + 1}ª variante
                        </span>
                        {o}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-sm text-content-light-dimmed dark:text-content-dark-dimmed">
                    Solo l'Agenzia delle Entrate può assegnare una variante: queste sono indicate a titolo
                    informativo, per riconoscerle quando si incontrano.
                  </p>
                </Card>
              )}
            </>
          ) : (
            <p className="text-sm text-content-light-dimmed dark:text-content-dark-dimmed">
              Compilare cognome, nome, data di nascita e luogo di nascita per ottenere il codice fiscale.
            </p>
          )}
        </>
      ) : (
        <>
          <Field
            label="Codice fiscale"
            hint="16 caratteri. Maiuscole e minuscole sono equivalenti."
          >
            <TextInput
              value={codice}
              onChange={(e) => setCodice(e.target.value.toUpperCase())}
              placeholder="RSSMRA85M01H501Q"
              maxLength={16}
              className="tracking-widest uppercase"
            />
          </Field>

          {modoAttivo === "verifica" && verifica && (
            <Card
              tone={verifica.valido ? "success" : "warning"}
              title={verifica.valido ? "Codice fiscale formalmente corretto" : "Codice fiscale non valido"}
            >
              {verifica.valido ? (
                <p className="text-sm">
                  La struttura e il carattere di controllo sono corretti.
                  {verifica.omocodia && " Il codice contiene una sostituzione di omocodia."}
                </p>
              ) : (
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {verifica.errori.map((e, i) => (
                    <li key={i}>{e}</li>
                  ))}
                </ul>
              )}
              <p className="mt-3 text-xs text-content-light-dimmed dark:text-content-dark-dimmed">
                Questo controllo è puramente matematico: dice se il codice è ben formato, non se è realmente
                attribuito a qualcuno. Solo l'Agenzia delle Entrate può confermarlo.
              </p>
            </Card>
          )}

          {decodifica && decodifica.dati && (
            <>
              {decodifica.verifica.valido ? null : (
                <Card tone="warning" title="Attenzione">
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {decodifica.verifica.errori.map((e, i) => (
                      <li key={i}>{e}</li>
                    ))}
                  </ul>
                  <p className="mt-2 text-sm">I dati qui sotto sono comunque estratti dal codice inserito.</p>
                </Card>
              )}

              <Card title="Dati contenuti nel codice fiscale">
                <dl className="grid sm:grid-cols-2 gap-4">
                  {[
                    ["Data di nascita", decodifica.dati.dataNascita
                      ? `${decodifica.dati.giorno} ${decodifica.dati.nomeMese} ${decodifica.dati.anno}`
                      : "non ricavabile"],
                    ["Sesso", decodifica.dati.sesso === "F" ? "femminile" : "maschile"],
                    [
                      "Luogo di nascita",
                      decodifica.dati.luogo
                        ? `${decodifica.dati.luogo.nome}${
                            decodifica.dati.estero ? " (Stato estero)" : ` (${decodifica.dati.luogo.provincia})`
                          }${decodifica.dati.luogo.attivo ? "" : " — comune soppresso"}`
                        : luoghi
                        ? `codice ${decodifica.dati.codiceLuogo} non trovato in elenco`
                        : "caricamento…",
                    ],
                    ["Codice catastale", decodifica.dati.codiceLuogo],
                    ["Iniziali del cognome", decodifica.dati.cognome],
                    ["Iniziali del nome", decodifica.dati.nome],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-xs uppercase tracking-wide text-content-light-dimmed dark:text-content-dark-dimmed">
                        {k}
                      </dt>
                      <dd className="font-medium">{v}</dd>
                    </div>
                  ))}
                </dl>

                {decodifica.dati.omocodia && (
                  <p className="mt-4 text-sm text-accent-warning">
                    Il codice contiene {decodifica.dati.sostituzioniOmocodia} sostituzione
                    {decodifica.dati.sostituzioniOmocodia === 1 ? "" : "i"} di omocodia: alcune cifre sono state
                    sostituite da lettere e sono state riconvertite per leggere la data.
                  </p>
                )}

                <p className="mt-4 text-sm text-content-light-dimmed dark:text-content-dark-dimmed">
                  Dal codice fiscale non si possono ricavare il nome e il cognome per esteso: le sei lettere
                  iniziali sono un'abbreviazione e moltissimi nomi diversi producono le stesse tre lettere.
                </p>
              </Card>

              <div className="flex justify-end">
                <CopyButton
                  text={[
                    `Codice fiscale: ${decodifica.verifica.cf}`,
                    `Data di nascita: ${decodifica.dati.dataNascita || "n.d."}`,
                    `Sesso: ${decodifica.dati.sesso}`,
                    `Luogo: ${decodifica.dati.luogo ? decodifica.dati.luogo.nome : decodifica.dati.codiceLuogo}`,
                  ].join("\n")}
                  label="Copia i dati"
                />
              </div>
            </>
          )}

          {codice.trim() && !decodifica?.dati && (
            <ErrorNote>{decodifica?.verifica?.errori?.join(" ") || "Codice fiscale non leggibile."}</ErrorNote>
          )}
        </>
      )}
    </div>
  );
};

export default CodiceFiscaleTool;
