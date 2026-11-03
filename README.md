# Gliffo · sito pubblico Beta

Sito statico GitHub Pages già attivo da `main`, cartella radice. Home «Laboratorio vettoriale» con catalogo di otto app e download Beta; pagina feedback operativa separata. Nessun backend proprio, sorgente Suite o certificato privato pubblicato.

- Home: https://gliffo.github.io/
- Feedback: https://gliffo.github.io/feedback/
- Tally fornito dal titolare: https://tally.so/r/jeZYO9
- Email: gliffosuite@gmail.com

## Home e risorse

`index.html`, `landing.css` e `landing.js` implementano la home; `apps.json` descrive il catalogo. `styles.css` e `feedback/` conservano il sistema operativo del modulo. Il merge documentale non autorizza modifiche visive implicite al feedback. Direzione e confini: `.impeccable/briefs/home.md`; token effettivi: `DESIGN.md`, estensioni e componenti: `.impeccable/design.json`.

SVG originali e screenshot correnti della Beta in `assets/`. Le immagini mostrano UI HTML reale con CEP simulato e dati dimostrativi: non sono catture native Illustrator. Provenienza in `assets/PROVENIENZA.md`. Bricolage Grotesque è locale, con licenza SIL OFL in `assets/fonts/Bricolage-OFL.txt`.

## Installer Beta 1.0.0

I pacchetti correnti sono `downloads/Gliffo Suite Beta.dmg` e `downloads/Gliffo Suite Beta.exe`; `downloads.json` contiene URL pubblici e SHA-256. La home contiene link HTML statici ai due installer, con versione e istruzioni corrette: i download funzionano anche senza JavaScript. Non esiste fetch runtime di downloads.json; il manifest conserva URL e hash. Non usare vecchi archivi o ZIP sorgente come installer.

Il DMG è fornito dal titolare, estratto e controllato senza modificarlo. L’EXE è compilato con NSIS dal medesimo ZXP con firma Adobe verificata; il rapporto conferma che le 57 voci ZXP estratte dall’EXE sono identiche byte per byte al payload verificato. `downloads/VERIFICA.json` registra hash, payload, prova di 15 giorni dal primo avvio e progressione minima di 2500 ms. Non è stata verificata l’esecuzione nativa qui; firme OS degli installer assenti (nessuna Authenticode Windows). La verifica della firma Adobe riguarda il payload, non una firma OS degli installer.

Chiudere Illustrator prima dell’installazione; poi Finestra → Estensioni → Gliffo Suite PRO. Requisito dichiarato: Illustrator 2024 o successivo. Dopo 15 giorni gli strumenti Beta vengono disattivati; file e salvataggio progetto dalla home Suite restano disponibili.

## Tally: configurazione e funzionamento

L’utente ha confermato che il feedback è corretto e gli invii funzionano. Le notifiche email non sono state verificate o modificate da Codex: in Tally Settings → Email notifications → Self email notifications si gestiscono gli avvisi all’email dell’account. Il modulo gratuito conserva il marchio Tally; i campi si modificano nel relativo editor. Il sito non richiede un account ai tester.

Lo snippet fornito usa `alignLeft=1`, `hideTitle=1`, `transparentBackground=1`, altezza iniziale 1354 e bootstrap ufficiale. L’integrazione aggiunge `dynamicHeight=1`; 1354 è una dimensione iniziale, senza altezza CSS fissa o clipping del contenitore. Lo scroll interno viene soppresso dopo una modifica di altezza da parte del fornitore; senza SDK resta disponibile. Link diretto sopra il modulo, recupero nativo e noscript restano presenti; nessun watchdog personalizzato.

I parametri `app`, `version`, `os`, `illustrator` sono inoltrati; Tally deve avere i relativi campi nascosti configurati per registrarli. Non viene promesso il popolamento di campi non configurati. Tema: sfondo #24262A, testo #F4F4F2, secondario #B9C0CA, pulsante #EA5C53, testo pulsante #1B1D20, campi #363B42, bordi #505761. Questa guida non modifica automaticamente il tema Tally.

Documentazione ufficiale: https://developers.tally.so/widgets/embeds e https://tally.so/help/embed-your-form.

## Verifica

`node tests/embed.cjs` copre l’integrazione Tally con SDK simulato: opzioni, altezze 2600/900px, scroll e fallback; non verifica invii o rendering live. I limiti browser/proxy del precedente lavoro Tally non annullano la conferma d’uso fornita dall’utente. Per la nuova home sono disponibili catture HTML desktop 1440 e mobile 390 nella review locale; la revisione finale ha confermato risolti tutti e tre i rilievi e ha dato esito favorevole alla pubblicazione nell’ambito della lista di correzioni. Questo esito non estende le verifiche all’esecuzione nativa degli installer. Verificare su OS reali gli installer resta un controllo distinto dalle prove statiche e dal payload firmato.
