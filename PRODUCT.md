# Gliffo Suite Beta · sito pubblico

Sito statico GitHub Pages di Gliffo per designer di identità che lavorano in Adobe Illustrator. La home presenta la Suite e gli otto strumenti Nesso, Trama, Modulo, Tono, Tipo, Soglia, Capsula e Scena; accompagna alla registrazione per la Beta e al feedback. Direzione scelta dall’utente: «Laboratorio vettoriale». Nessun cliente, risultato, prezzo o riconoscimento inventato.

La Beta 1.0.0 include tutti gli otto strumenti, richiede Illustrator 2024 o successivo e dura 15 giorni dal primo avvio. I progetti sono locali; la Suite non usa AI. La home descrive le funzioni confermate in `apps.json` e mostra interfacce reali HTML con bridge CEP simulato e dati dimostrativi, non catture native di Illustrator.

Gli installer Mac DMG e Windows EXE sono disponibili in `downloads/`, con URL e hash in `downloads.json`. Il DMG corrente è stato fornito dal titolare ed estratto per verifica; l’EXE è compilato dal medesimo payload ZXP con firma Adobe verificata. Il rapporto `downloads/VERIFICA.json` registra prova di 15 giorni e progressione minima di 2500 ms. L’esecuzione nativa non è stata verificata qui; non sono presenti firme OS degli installer. La firma del payload Adobe non equivale alla firma OS. Nessun sorgente Suite o certificato privato è pubblicato.

`/feedback/` resta una superficie operativa separata, senza backend proprio né account richiesto dal sito. Usa il modulo Tally `jeZYO9`, con link diretto e email di recupero. L’utente ha confermato che la pagina è corretta e gli invii funzionano; questa conferma non costituisce una verifica automatizzata delle notifiche Tally. Il redesign home preserva implementazione e sistema visivo feedback.

## Accesso Beta corrente

La home presenta ora l’accesso Beta tramite il nuovo modulo Tally `2jXzv9` (https://tally.so/r/2jXzv9), distinto dal feedback `jeZYO9`. I link installer sono nella pagina pubblica `/beta/download/`, marcata noindex/nofollow: la registrazione è un percorso UI su GitHub Pages, non autenticazione o protezione dei file.

Il sito non conserva o inoltra email: le risposte sono gestite da Tally. Il listener locale accetta soltanto eventi di invio con origine, finestra iframe, formId e identificatore risposta attesi e naviga alla pagina download. I binari restano invariati.

Il provider non è renderizzabile da questo ambiente: campo email effettivo, obbligatorietà e invio reale del nuovo modulo non sono verificati. È stato chiesto all’utente di impostare Email obbligatoria e redirect di completamento del modulo standalone a https://gliffo.github.io/beta/download/; conferma ancora in attesa. Nessuna verifica end-to-end completa è dichiarata.
