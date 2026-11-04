# Home Gliffo Suite · Laboratorio vettoriale

Direzione scelta dall’utente: «un grande segno Gliffo, punti e guide che reagiscono al mouse e svelano le otto app». Pubblico: designer di identità in Adobe Illustrator. Obiettivo: capire la Suite, esplorare gli strumenti e registrarsi per la Beta e raggiungere i download Mac/Windows.

Il concept helper non era disponibile (uscita 127); la scelta è stata raccolta con domanda strutturata. Implementazione direttamente in codice per l’interazione reale; nessun comp visivo approvato dichiarato. La scelta della direzione non equivale a una validazione finale della pagina.

Prima vista: logo originale, titolo «Più spazio alle tue idee.», descrizione concreta Illustrator e CTA Beta; laboratorio con grande segno Gliffo, guide/ancore e otto app. Puntatore produce inclinazione limitata; focus seleziona lo strumento; reduced-motion conserva composizione e contenuto senza effetti animati.

Sequenza realizzata: spiegazione Suite, quattro fasi di lavoro, pannello avorio con home Suite, explorer di otto disclosure con preview corrente, accesso email Beta, FAQ e invito feedback. Nessun cliente, prezzo, metrica o risultato inventato. Implementazione: index.html, landing.css, landing.js; catalogo apps.json. Il sistema visivo operativo e il codice feedback restano separati.

Blocco installer risolto: DMG Beta corrente fornito dal titolare; EXE compilato dallo stesso ZXP con firma Adobe verificata. Entrambi sono in downloads/, collegati da downloads.json; Beta 1.0.0, prova di 15 giorni dal primo avvio. Dettagli e hash in downloads/VERIFICA.json. Esecuzione nativa non verificata; firme OS assenti. Nessun sorgente Suite o certificato privato pubblicato.

Asset: SVG originali delle otto app; Bricolage Grotesque locale con OFL; screenshot WebP della UI HTML Beta corrente con CEP simulato e dati demo, non catture native Illustrator. Provenienza in assets/PROVENIENZA.md. Screenshot di verifica HTML della home disponibili nella review desktop 1440 e mobile 390; revisione finale separata conclusa con tutti e tre i rilievi risolti ed esito favorevole alla pubblicazione entro tale ambito. I download sono ora link HTML statici in /beta/download/, utilizzabili senza JavaScript; il manifest registra URL e hash. L’utente ha già confermato feedback corretto e invii funzionanti.

## Aggiornamento circoscritto autorizzato

Più profondità, colore e creatività nel solo header: piani negli accenti esistenti, estrusione del marchio originale, ombre e targhe app; interazione puntatore preservata. Il resto della pagina e il feedback mantengono il sistema esistente.

La home presenta ora l’accesso Beta tramite il nuovo modulo Tally `2jXzv9` (https://tally.so/r/2jXzv9), distinto dal feedback `jeZYO9`. I link installer sono nella pagina pubblica `/beta/download/`, marcata noindex/nofollow: la registrazione è un percorso UI su GitHub Pages, non autenticazione o protezione dei file.

Il provider non è renderizzabile da questo ambiente: campo email effettivo, obbligatorietà e invio reale del nuovo modulo non sono verificati. È stato chiesto all’utente di impostare Email obbligatoria e redirect di completamento del modulo standalone a https://gliffo.github.io/beta/download/; conferma ancora in attesa. Nessuna verifica end-to-end completa è dichiarata. La revisione finale approva il raffinamento visivo; ricatturare il provider quando raggiungibile.

Ultima revisione utente: più creatività con sfumature, glass e liquido. Implementazione WebGL in liquid.js; lente e targhe backdrop-filter, resa statica con reduced-motion e fallback CSS. Test browser desktop1440 e mobile390 sul renderer reale, zero overflow ed errori JS, link app e modulo Tally preservati. Nuova richiesta di email nativa + pulsante nero affiancato ancora in valutazione con l’utente: nessun cambio di provider o invio finto pubblicato.

Scelta successiva confermata: usare un altro servizio purché raccolga email. Implementato modulo HTML nativo/FormSubmit senza nuovo account, box bianco e pulsante nero affiancato. TallyBeta sostituito soltanto nella home; feedback invariato. L’attivazione email del provider richiede intervento del titolare; non è verificata.

Correzione provider: FormSubmit ha restituito522all’utente; sostituito da Formspree mgaarvej fornito dall’autore. beta-email.js gestisce errori, timeout12s e retry, e apre i download solo per risposta ok=true. Test1440/390 con risposte intercettate e unitari completati; nessuna email reale inviata. Aspetto invariato.

Ultima richiesta: meno testo e comprensione immediata di Illustrator, tempo risparmiato e provaBeta. Hero Meno clic. Più tempo., AdobeIllustrator nella prima riga descrittiva, CTAprimariaProvalaBeta; rimosse panoramiche ripetute, ogniappuna frase. Testo773→386parole. Aspetto glass/liquido e tutte le funzionalità preservati.


## Caso reale Onda — immagini fornite dall’autore

Sostituiti gli esempi SVG Gliffo per Nesso, Trama, Modulo, Tono, Capsula e Scena con sei catture reali fornite in Archivio.zip. Scena apre il racconto; le app hanno piccoli loghi come firma, il risultato domina. Ritagli solo CSS, apertura della cattura completa, nessun ritocco dei pixel. Tono appare anche in una sezione ampia nel contesto nativo di Illustrator. Capsula mostra la cartella dei file esportati; esclusa la cattura con percorso personale. Tipo e Soglia restano interfacce HTML con dati dimostrativi, etichettate come tali nel contenuto e nel dialogo.

WebP lossless, risoluzione originale e identità RGB verificata rispetto ai PNG; totale circa1,87MB per sei risorse, caricamento lazy. Verificati 1440/390px: otto loghi, selezione, ritagli desktop/mobile, apertura/focus/chiusura dialogo, distinzione nativo/demo, nessun overflow o errore JS. Modulo email e marker Gmail preservati; download/feedback non modificati. Provenienza dettagliata in assets/onda/PROVENIENZA.md.


Aggiornamento: ricevuto tipo e soglia.zip. Tutte le otto app ora mostrano catture native fornite dall’autore: campionario Fixel Variable per Tipo e tavola di riduzione Onda per Soglia. Rimosse le due anteprime demo HTML dalla home. WebP lossless, pixel identici ai PNG, cattura completa disponibile.
