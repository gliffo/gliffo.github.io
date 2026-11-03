# Gliffo · sito pubblico Beta

Sito statico GitHub Pages già attivo da `main`, cartella radice. Home «Laboratorio vettoriale» con catalogo di otto app e registrazione Beta; pagina feedback operativa separata. Nessun backend proprio, sorgente Suite o certificato privato pubblicato.

- Home: https://gliffo.github.io/
- Feedback: https://gliffo.github.io/feedback/
- Tally fornito dal titolare: https://tally.so/r/jeZYO9
- Email: gliffosuite@gmail.com

## Home e risorse

`index.html`, `landing.css` e `landing.js` implementano la home; `apps.json` descrive il catalogo. `styles.css` e `feedback/` conservano il sistema operativo del modulo. Il merge documentale non autorizza modifiche visive implicite al feedback. Direzione e confini: `.impeccable/briefs/home.md`; token effettivi: `DESIGN.md`, estensioni e componenti: `.impeccable/design.json`.

SVG originali e screenshot correnti della Beta in `assets/`. Le immagini mostrano UI HTML reale con CEP simulato e dati dimostrativi: non sono catture native Illustrator. Provenienza in `assets/PROVENIENZA.md`. Bricolage Grotesque è locale, con licenza SIL OFL in `assets/fonts/Bricolage-OFL.txt`.

## Installer Beta 1.0.0

I pacchetti correnti sono `downloads/Gliffo Suite Beta.dmg` e `downloads/Gliffo Suite Beta.exe`; `downloads.json` contiene URL pubblici e SHA-256. La pagina separata /beta/download/ contiene link HTML statici ai due installer, con versione e istruzioni corrette: i download funzionano anche senza JavaScript. La home contiene invece il modulo di accesso. Non esiste fetch runtime di downloads.json; il manifest conserva URL e hash. Non usare vecchi archivi o ZIP sorgente come installer.

Il DMG è fornito dal titolare, estratto e controllato senza modificarlo. L’EXE è compilato con NSIS dal medesimo ZXP con firma Adobe verificata; il rapporto conferma che le 57 voci ZXP estratte dall’EXE sono identiche byte per byte al payload verificato. `downloads/VERIFICA.json` registra hash, payload, prova di 15 giorni dal primo avvio e progressione minima di 2500 ms. Non è stata verificata l’esecuzione nativa qui; firme OS degli installer assenti (nessuna Authenticode Windows). La verifica della firma Adobe riguarda il payload, non una firma OS degli installer.

Chiudere Illustrator prima dell’installazione; poi Finestra → Estensioni → Gliffo Suite PRO. Requisito dichiarato: Illustrator 2024 o successivo. Dopo 15 giorni gli strumenti Beta vengono disattivati; file e salvataggio progetto dalla home Suite restano disponibili.

## Tally: configurazione e funzionamento

L’utente ha confermato che il feedback è corretto e gli invii funzionano. Le notifiche email non sono state verificate o modificate da Codex: in Tally Settings → Email notifications → Self email notifications si gestiscono gli avvisi all’email dell’account. Il modulo gratuito conserva il marchio Tally; i campi si modificano nel relativo editor. Il sito non richiede un account ai tester.

Lo snippet fornito usa `alignLeft=1`, `hideTitle=1`, `transparentBackground=1`, altezza iniziale 1354 e bootstrap ufficiale. L’integrazione aggiunge `dynamicHeight=1`; 1354 è una dimensione iniziale, senza altezza CSS fissa o clipping del contenitore. Lo scroll interno viene soppresso dopo una modifica di altezza da parte del fornitore; senza SDK resta disponibile. Link diretto sopra il modulo, recupero nativo e noscript restano presenti; nessun watchdog personalizzato.

I parametri `app`, `version`, `os`, `illustrator` sono inoltrati; Tally deve avere i relativi campi nascosti configurati per registrarli. Non viene promesso il popolamento di campi non configurati. Tema: sfondo #24262A, testo #F4F4F2, secondario #B9C0CA, pulsante #EA5C53, testo pulsante #1B1D20, campi #363B42, bordi #505761. Questa guida non modifica automaticamente il tema Tally.

Documentazione ufficiale: https://developers.tally.so/widgets/embeds e https://tally.so/help/embed-your-form.

## Verifica

`node tests/embed.cjs` copre l’integrazione Tally con SDK simulato: opzioni, altezze 2600/900px, scroll e fallback; non verifica invii o rendering live. I limiti browser/proxy del precedente lavoro Tally non annullano la conferma d’uso fornita dall’utente. Per la nuova home sono disponibili catture HTML desktop 1440 e mobile 390 nella review locale; la revisione finale ha confermato risolti tutti e tre i rilievi e ha dato esito favorevole alla pubblicazione nell’ambito della lista di correzioni. Questo esito non estende le verifiche all’esecuzione nativa degli installer. Verificare su OS reali gli installer resta un controllo distinto dalle prove statiche e dal payload firmato.

## Accesso Beta corrente: Formspree

Il box email HTML nativo punta a https://formspree.io/f/mgaarvej, endpoint fornito dall’autore. Il layout bianco/nero resta nel sito; solo il feedback usa ancora Tally jeZYO9. FormSubmit è stato ritirato dopo HTTP522: non è più necessaria la sua attivazione.

beta-email.js invia con Accept application/json; solo una conferma ok=true apre /beta/download/. Il redirect è fisso e non trasporta email. ErroriHTTP522/429, rete,JSONerrato, rifiuti e timeout12s lasciano il visitatore nel sito, conservano il campo e permettono retry. Nessuna email in localStorage e nessun successo simulato nel codice di produzione.

Per cambiare endpoint usare scripts/configure-formspree.py con il nuovo URL reale dell’account. Non usare scripts/configure-beta.py o beta-access.js: appartengono alla precedente integrazione Tally Beta, non caricata dalla home. Il piano gratuito Formspree verificato consente50invii/mese; quota e notifiche si gestiscono nell’account dell’autore. Documentazione: https://help.formspree.io/articles/building-your-form/submit-forms-with-javascript-ajax e https://formspree.io/plans/.

Verifica: node tests/beta-email.cjs copre522,rete,timeout,429,HTML/JSONerrato,falsoconferme,doppiinvii e successoconfermato. Browserdesktop1440/mobile390 con tutte le richieste provider intercettate: email preservata dopo522, retrye redirectsolo dopo confermasimulata. Nessun invio reale eseguito. Prima dei tester l’autore deve inviare una prova dal sito, verificarla in Formspree e controllare l’apertura dei download.

## Effetto liquido della home

liquid.js disegna uno sfondo WebGL interattivo con fallback CSS, movimento ridotto e pausa fuori viewport/scheda nascosta. Nessuna libreria esterna. Renderdesktop1440/mobile390 controllato in Chromium/WebGL software. Feedback e installer invariati.

## Benvenuto gratuito da Gmail

Il pacchetto automation/gmail/Gliffo_Benvenuto_Gmail.zip contiene Code.gs, istruzioni e anteprima email. Google Apps Script va creato e autorizzato personalmente in gliffosuite@gmail.com. Non è ancora installato o attivo da questo ambiente e non sono state inviate email reali. Controllo ogni5minuti delle notifiche Formspree autenticate con markerGLIFFO_BETA_mgaarvej e destinatarioReply-To; solo nuove notifiche dopo attivazione, dedup perindirizzo, quoteGoogle e blocco invii incerti. Le istruzioni guidano verifica, prova esclusivamente alla casella proprietaria, attivazione e disattivazione. node tests/gmail-welcome.cjs usa mock Google e non verifica intestazioni reali o consegna. Il sito aggiunge soltanto un campo nascosto alla richiesta Formspree, senza cambiare il flusso già confermato funzionante dall’utente.
