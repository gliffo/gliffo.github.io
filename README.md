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

L’utente ha scelto un solo scroll della pagina esterna con modulo intero. Il codice originale fornito dall’utente contiene alignLeft=1, hideTitle=1, transparentBackground=1, altezza iniziale1354 e bootstrap ufficiale Tally; non contiene dynamicHeight=1. L’integrazione conserva tali opzioni e aggiunge dynamicHeight=1 per ridimensionare il contenuto. La misura1354 rimane un attributo iniziale, mai un’altezza CSS fissa.

Il bootstrap segue lo snippet ufficiale con loadEmbeds e recupero nativo onload/onerror. È incorporato nell’HTML per evitare una vecchia versione di JS in cache; non ci sono watchdog personalizzati. La pagina non contiene contenitori con altezza massima o overflow nascosto. Il form trasparente poggia sul fondo Gliffo scuro, coerente con il tema configurato dall’utente in Tally. Lo scroll interno viene soppresso solo quando il fornitore modifica l’altezza; senza SDK rimane disponibile per non rendere i campi irraggiungibili. Il link diretto sopra il modulo e il fallback noscript restano presenti.

Documentazione ufficiale: https://developers.tally.so/widgets/embeds e https://tally.so/help/embed-your-form. `node tests/embed.cjs` verifica opzioni del codice fornito, ridimensionamento2600 e riduzione900, assenza di soppressione prematura dello scroll, SDK fallito e caricamento inline. SDK simulato: il test non prova il rendering Tally reale. Il modulo diretto è confermato funzionante dall’utente; l’embed non è raggiungibile dai tool browser di questo ambiente.

Colori Tally: sfondo #24262A; testo #F4F4F2; testo secondario #B9C0CA; pulsante #EA5C53; testo pulsante #1B1D20; campi #363B42; bordi #505761. La guida non modifica il tema del modulo.
