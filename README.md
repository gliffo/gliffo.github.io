# Gliffo · sito pubblico Beta

Sito statico gratuito GitHub Pages. Contiene soltanto pagine pubbliche e SVG originali: nessun sorgente della Suite, certificato, account o dato dei tester.

- Home: https://gliffo.github.io/
- Feedback: https://gliffo.github.io/feedback/
- Modulo Tally fornito dall’autore: https://tally.so/r/jeZYO9
- Email del progetto: gliffosuite@gmail.com

## Attivare GitHub Pages

Repository Settings → Pages → Build and deployment → Deploy from a branch → main → / (root) → Save. L’attivazione richiede l’amministrazione della repository, non disponibile nel connettore GitHub corrente. Dopo il deploy GitHub mostra l’URL pubblico. Non è necessario un dominio acquistato.

Il modulo Tally rimane nel piano gratuito e conserva il marchio Tally. Le modifiche ai campi si fanno in Tally e appaiono anche qui. Attivare in Tally Settings → Email notifications → Self email notifications per ricevere avvisi all’email dell’account. Non sono state cambiate impostazioni o inviate email da Codex.

L’embed usa lo script ufficiale Tally per l’altezza dinamica; il link diretto funziona anche se lo script o l’incorporamento sono bloccati. App/version/os/illustrator possono passare come parametri; per registrarli nel modulo bisogna aggiungere i relativi campi nascosti in Tally. Non viene promesso il popolamento di campi non configurati.

## Verifica prima dei tester

L’ambiente cloud non raggiunge tally.so: il proxy rifiuta la connessione. Il link è quello fornito dall’autore; non è stata verificata la struttura effettiva del modulo né inviata una risposta di prova. Dal browser normale aprire /feedback/, controllare il modulo su desktop/mobile e inviare una segnalazione identificata come prova; verificare che arrivi nell’account Tally corretto. Non attivare richieste di accesso per i tester.

## Altezza e caricamento del modulo

L’iframe contiene sempre il suo src HTML: il modulo si carica anche con JavaScript disabilitato o SDK bloccato. Lo script ufficiale Tally migliora il ridimensionamento; non è una condizione per mostrare il form. Il CSS non impone un’altezza fissa. Parametri app/version/os/illustrator sono preparati all’avvio; non si ricarica il modulo senza un cambiamento di contesto. Il link diretto rimane sopra il modulo. Gli URL dei file CSS e JS sono versionati per evitare una pagina nuova con loader vecchio in cache.

Il test `node tests/embed.cjs` verifica il caricamento nativo presente nel markup, l’assenza di occultamento senza JS, gli errori SDK senza svuotamento o ricaricamento del modulo, e i parametri ammessi. SDK simulato: non è un collaudo dell’invio reale o della disponibilità del modulo Tally.

Colori da applicare nell’editor Tally, nei controlli disponibili: sfondo #24262A; testo #F4F4F2; testo secondario #B9C0CA; pulsante #EA5C53; testo pulsante #1B1D20; campi #363B42; bordi #505761. Questi valori sono una guida: non modificano automaticamente il tema Tally.
