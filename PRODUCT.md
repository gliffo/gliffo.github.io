# Gliffo Suite Beta · sito pubblico

Sito statico GitHub Pages di Gliffo per designer di identità che lavorano in Adobe Illustrator. La home presenta la Suite e gli otto strumenti Nesso, Trama, Modulo, Tono, Tipo, Soglia, Capsula e Scena; accompagna alla registrazione per la Beta e al feedback. Direzione scelta dall’utente: «Laboratorio vettoriale». Nessun cliente, risultato, prezzo o riconoscimento inventato.

La Beta 1.0.0 include tutti gli otto strumenti, richiede Illustrator 2024 o successivo e dura 15 giorni dal primo avvio. I progetti sono locali; la Suite non usa AI. La home descrive le funzioni confermate in `apps.json` e mostra interfacce reali HTML con bridge CEP simulato e dati dimostrativi, non catture native di Illustrator.

Gli installer Mac DMG e Windows EXE sono disponibili in `downloads/`, con URL e hash in `downloads.json`. Il DMG corrente è stato fornito dal titolare ed estratto per verifica; l’EXE è compilato dal medesimo payload ZXP con firma Adobe verificata. Il rapporto `downloads/VERIFICA.json` registra prova di 15 giorni e progressione minima di 2500 ms. L’esecuzione nativa non è stata verificata qui; non sono presenti firme OS degli installer. La firma del payload Adobe non equivale alla firma OS. Nessun sorgente Suite o certificato privato è pubblicato.

`/feedback/` resta una superficie operativa separata, senza backend proprio né account richiesto dal sito. Usa il modulo Tally `jeZYO9`, con link diretto e email di recupero. L’utente ha confermato che la pagina è corretta e gli invii funzionano; questa conferma non costituisce una verifica automatizzata delle notifiche Tally. Il redesign home preserva implementazione e sistema visivo feedback.

## Accesso Beta corrente

La home usa un modulo HTML nativo: email obbligatoria in un box bianco e pulsante nero affiancato. Il modulo è collegato all’endpoint Formspree https://formspree.io/f/mgaarvej fornito dall’utente. FormSubmit è stato sostituito dopo un errore HTTP522 riscontrato dal titolare. Non servono più le precedenti istruzioni di attivazione FormSubmit.

beta-email.js invia via AJAX, mostra stato in corso e gestisce erroriHTTP/rete/risposta/timeout12secondi senza lasciare il sito. Conserva l’email nel campo e permette retry. Solo una conferma JSON ok=true mostra la conferma dell’iscrizione: il sito non reindirizza ai download, che si raggiungono dal messaggio Gmail. Nessuna email viene memorizzata in localStorage o inserita negli URL. I download restano pubblici: è registrazione, non autenticazione.

Il piano gratuito Formspree verificato consente50invii/mese. I test browser e unitari usano risposte provider simulate/intercettate: ricezione reale nel nuovo account ancora da confermare dall’utente. Il feedback resta su Tally jeZYO9; i vecchi moduli Beta non sono più incorporati nella home.

## Direzione visiva richiesta dall’utente

La home conserva il laboratorio vettoriale e i marchi originali, reinterpretati con sfumature colorate, sfondo liquido interattivo WebGL e superfici in vetro. La richiesta esplicita sostituisce il precedente trattamento a piani piatti. Feedback Tally e installer restano separati; la raccolta Beta usa ora Formspree.


## Email di benvenuto Gmail — preparata, non attivata

L’utente ha autorizzato l’automazione gratuita Gmail. Il progetto Apps Script in automation/gmail usa le notifiche del modulo Formspree e invia il testo approvato con download e feedback. Il proprietario deve creare/autorizzare il progetto Google e attivare il timer. Codice verificato con servizi simulati; nessuna email reale inviata o automazione attivata qui. La notifica scatta all’iscrizione, non alla verifica di download effettivo. Nessun nuovo abbonamento o servizio è stato attivato.

## Chiarezza della landing

Priorità richiesta dall’utente: far capire subito che Gliffo è per Adobe Illustrator, riduce i passaggi ripetitivi e si può provare gratuitamente. Hero Meno clic. Più tempo., prima riga 8strumenti perAdobeIllustrator, CTAprincipale ProvalaBeta. Testi dimezzati (773→386parole incluse le descrizioni espandibili), panoramiche ripetute unite, ogniappspiegata con una funzione concreta. Nessun tempo risparmiato quantificato o risultato inventato. Effetti glass/liquidi, moduloFormspree, markerGmail e risorseinstaller preservati. L’utente ha già confermato che invio e accesso ai download funzionano; l’automazioneGmail resta da attivare personalmente.

## Accesso tramite email confermato dall’utente

L’utente ha confermato che il timer Gmail è attivo e che l’email di benvenuto arriva. La consegna del link avviene ora tramite quell’email, dopo la richiesta Formspree; il sito non apre direttamente i download. Il campo viene svuotato dopo conferma. I contatti già accolti vengono invitati a recuperare il precedente benvenuto, senza promettere un reinvio che lo script anti-duplicati non esegue. Link statici condivisibili: nessuna autenticazione del download dichiarata.


## Anteprime ad alta risoluzione

Suite e otto app ricatturate a 4× dal payload firmato Beta 1.0.0, WebP senza perdita (circa 1,05 MB complessivi, caricati su richiesta). Nessun ingrandimento delle vecchie immagini. Pulsante Ingrandisci con dialogo, scorrimento interno per Scena, chiusura con Escape e ritorno del focus. Screenshot Suite diritto. Verificati tutti gli otto strumenti su desktop 1440 e mobile 390 a densità 2×, senza overflow orizzontale o errori JavaScript. Formspree, marker Gmail e feedback preservati. Interfacce HTML con dati dimostrativi, non esecuzione nativa Illustrator.
