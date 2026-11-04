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


## Header — scultura liquida

Direzione approvata: amplificare il laboratorio vettoriale con una composizione sperimentale. Il marchio originale diventa una scultura cromata WebGL: alpha derivato dallo SVG originale, estrusione in shader, riflessi viola/corallo/menta e lente rifrangente che segue il puntatore con inerzia. Le otto targhe SVG restano link reali, rispondono a hover e focus e aprono la relativa app; il colore selezionato cambia i riflessi. Titolo HTML invariato, secondo rigo su una campitura acida inclinata (#D5FB58). Nessun effetto sul testo o sul modulo.

Implementazione isolata in experiment.css e liquid.js: nessuna dipendenza esterna. Rendering limitato a circa 30fps e 1,2 milioni di pixel, pausa fuori schermo e a scheda nascosta. Movimento ridotto con frame statico; senza WebGL rimangono marchio SVG, sfumature CSS e tutti i link. Verificati Chromium desktop 1440, tablet 768 e mobile 390, texture WebGL, assenza di overflow, focus e navigazione delle app; fallback senza WebGL e movimento ridotto. Nessuna prova su dispositivo fisico dichiarata. Accesso Beta, screenshot 4×, feedback e installer preservati.


## Risultati prima delle interfacce

Richiesta approvata: il risultato conta più dei loghi delle app. Le otto anteprime principali e le targhe hero usano ora SVG illustrativi originali in assets/results, basati sul medesimo brand Gliffo. Titoli funzionali grandi, nome app piccolo come attribuzione. Presentazione editoriale al posto della finestra Suite nella panoramica; link secondario per vedere l’interfaccia reale. Desktop con anteprima vettoriale ingrandibile; mobile con esempio dentro ogni sezione aperta.

Questi esempi sono costruzioni editoriali per spiegare le funzioni, NON esportazioni verificate delle app in Illustrator. La pagina li etichetta come illustrativi, il dialogo esplicita la distinzione. Trama usa il tracciato originale con guide illustrative; Modulo una composizione su griglia; Tono palette e applicazioni; Tipo campionario Arial; Capsula un esempio dei formati; Scena un montaggio editoriale di sei tavole. Non si dichiarano tempi, misure fisiche o esiti generati dalle app. Verificati tutti gli otto SVG, cambio app, zoom desktop e immagini mobili, assenza di overflow o errori JS a 1440 e 390px. Modulo email, feedback e installer preservati.


## Assistenza nella pagina download

/beta/download/ mostra un avviso visibile sullo stato delle firme degli installer e quattro FAQ native details/summary: autorizzazione macOS per sviluppatore non verificato, SmartScreen Windows, Suite assente dal menu e uscita completa da Illustrator. Distinti gli avvisi malware/file danneggiato, per cui non si invita a forzare l’apertura. Link feedback e due LEGGIMI conservati. CSS limitato alla route in beta/download/help.css. Verificati 1440/390px senza JavaScript, tastiera e assenza di overflow; nessuna esecuzione nativa installer o modifica ai binari.


## Impaginazione download per piattaforma

Pagina /beta/download/ riorganizzata in una superficie chiara per download e primi passi, seguita da assistenza scura. Due colonne Mac/Windows su desktop, una su mobile; ciascuna con pulsante, tre passaggi e LEGGIMI. Percorso di apertura Illustrator separato e visibile. FAQ raggruppate Mac/Windows/Illustrator, collegamenti diretti con apertura e focus al summary; risposte già approvate conservate. Nessun rilevamento OS, invio dati o download automatico. helper JS opzionale, details nativi funzionano senza JS. CSS limitato a help.css. Verificati 1440/768/390px, no overflow o errori JS, navigazione/focus/tastiera e fallback senza JS. Link e hash installer invariati.


## Caso reale Onda — immagini fornite dall’autore

Sostituiti gli esempi SVG Gliffo per Nesso, Trama, Modulo, Tono, Capsula e Scena con sei catture reali fornite in Archivio.zip. Scena apre il racconto; le app hanno piccoli loghi come firma, il risultato domina. Ritagli solo CSS, apertura della cattura completa, nessun ritocco dei pixel. Tono appare anche in una sezione ampia nel contesto nativo di Illustrator. Capsula mostra la cartella dei file esportati; esclusa la cattura con percorso personale. Tipo e Soglia restano interfacce HTML con dati dimostrativi, etichettate come tali nel contenuto e nel dialogo.

WebP lossless, risoluzione originale e identità RGB verificata rispetto ai PNG; totale circa1,87MB per sei risorse, caricamento lazy. Verificati 1440/390px: otto loghi, selezione, ritagli desktop/mobile, apertura/focus/chiusura dialogo, distinzione nativo/demo, nessun overflow o errore JS. Modulo email e marker Gmail preservati; download/feedback non modificati. Provenienza dettagliata in assets/onda/PROVENIENZA.md.


Aggiornamento: ricevuto tipo e soglia.zip. Tutte le otto app ora mostrano catture native fornite dall’autore: campionario Fixel Variable per Tipo e tavola di riduzione Onda per Soglia. Rimosse le due anteprime demo HTML dalla home. WebP lossless, pixel identici ai PNG, cattura completa disponibile.


## Slideshow delle catture native

La sezione Dentro Illustrator usa ora una galleria manuale con otto selettori-logo, frecce cicliche, contatore, tasti sinistra/destra e gesture touch orizzontali. Nessun autoplay. Frame stabile con object-fit contain, immagini originali senza tagli; Ingrandisci segue la slide selezionata. I caricamenti conservano l’immagine precedente fino al successo, gestiscono errore/retry e scartano risposte superate. Nessuna nuova immagine o modifica ai download. Senza JavaScript rimangono Tono e otto link diretti. Verificati desktop1440/mobile390, selezione di tutte le app, ciclo, tastiera, richieste rapide, focus dopo zoom, altezza stabile e assenza di overflow/errori.
