# Gliffo Suite Beta · sito pubblico

Sito statico GitHub Pages di Gliffo per designer di identità che lavorano in Adobe Illustrator. La home presenta la Suite e gli otto strumenti Nesso, Trama, Modulo, Tono, Tipo, Soglia, Capsula e Scena; accompagna alla registrazione per la Beta e al feedback. Direzione scelta dall’utente: «Laboratorio vettoriale». Nessun cliente, risultato, prezzo o riconoscimento inventato.

La Beta 1.0.0 include tutti gli otto strumenti, richiede Illustrator 2024 o successivo e dura 15 giorni dal primo avvio. I progetti sono locali; la Suite non usa AI. La home descrive le funzioni confermate in `apps.json` e mostra interfacce reali HTML con bridge CEP simulato e dati dimostrativi, non catture native di Illustrator.

Gli installer Mac DMG e Windows EXE sono disponibili in `downloads/`, con URL e hash in `downloads.json`. Il DMG corrente è stato fornito dal titolare ed estratto per verifica; l’EXE è compilato dal medesimo payload ZXP con firma Adobe verificata. Il rapporto `downloads/VERIFICA.json` registra prova di 15 giorni e progressione minima di 2500 ms. L’esecuzione nativa non è stata verificata qui; non sono presenti firme OS degli installer. La firma del payload Adobe non equivale alla firma OS. Nessun sorgente Suite o certificato privato è pubblicato.

`/feedback/` resta una superficie operativa separata, senza backend proprio né account richiesto dal sito. Usa il modulo Tally `jeZYO9`, con link diretto e email di recupero. L’utente ha confermato che la pagina è corretta e gli invii funzionano; questa conferma non costituisce una verifica automatizzata delle notifiche Tally. Il redesign home preserva implementazione e sistema visivo feedback.

## Accesso Beta corrente

La home usa un modulo HTML nativo: email obbligatoria in un box bianco e pulsante nero affiancato, con invio POST a FormSubmit verso gliffosuite@gmail.com. L’utente ha autorizzato un servizio diverso da Tally per raccogliere soltanto le email. Il provider richiede un’attivazione da parte del titolare della casella dopo il primo invio; non è stata inviata una prova reale da questo ambiente e l’attivazione non è confermata.

Dopo un invio gestito correttamente dal provider, il parametro _next porta alla pagina pubblica /beta/download/, che contiene gli stessi installer Mac/Windows ed è marcata noindex. Il sito non conserva email in localStorage o parametri URL. Il provider gestisce invio, controlli antispam e reindirizzamento; il sito non mostra successi simulati. Questo è un percorso di registrazione, non autenticazione dei download pubblici.

Il feedback resta sul modulo Tally jeZYO9. Il vecchio modulo Beta Tally 2jXzv9 non è più incorporato nella home; non viene eliminato o alterato dall’account dell’utente.

## Direzione visiva richiesta dall’utente

La home conserva il laboratorio vettoriale e i marchi originali, reinterpretati con sfumature colorate, sfondo liquido interattivo WebGL e superfici in vetro. La richiesta esplicita sostituisce il precedente trattamento a piani piatti. Percorso Tally, raccolta email e installer restano invariati.

## Errore provider e sostituzione in preparazione

L’utente ha riscontrato HTTP522 su FormSubmit. Ora beta-email.js gestisce l’invio nel sito: stato in corso, timeout12s, erroriHTTP/rete/JSON/attivazione, valore email preservato e retry. Solo conferma esplicita del provider apre i download. Nessun invio reale verificato. Formspree è supportato dal codice; il vero endpoint dell’account dell’autore è stato richiesto e non è ancora disponibile. Il form continua temporaneamente a puntare a FormSubmit: la gestione errori non ripristina il servizio remoto.
