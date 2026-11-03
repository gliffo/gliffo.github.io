# Email di benvenuto Gliffo — attivazione gratuita

L’automazione gira su Google Apps Script nell’account **gliffosuite@gmail.com**. Il sito e Formspree rimangono come sono: le notifiche ricevute in Gmail attivano un benvenuto entro circa cinque minuti. Il momento rilevato è l’iscrizione alla Beta, non il download effettivo del file.

**Stato: codice preparato e verificato con servizi Google simulati. Non è ancora installato o autorizzato nel tuo account; nessuna email è stata inviata da Codex.**

## 1. Crea il progetto

1. Accedi a Google con **gliffosuite@gmail.com** e apri https://script.google.com/home/start.
2. Crea **Nuovo progetto** e chiamalo **Gliffo — Benvenuto Beta**.
3. Apri `Code.gs`, cancella il contenuto iniziale e incolla tutto il file `Code.gs` incluso in questo pacchetto. Salva.
4. Non serve pubblicare un’app web, inserire chiavi, attivare un abbonamento o impostare variabili. Il mittente configurato è la casella Gliffo.

## 2. Verifica il collegamento a Formspree

1. Dal sito https://gliffo.github.io invia una nuova iscrizione con la tua email. Questa notifica deve essere successiva alla pubblicazione del nuovo campo nascosto del sito.
2. Controlla che la notifica Formspree arrivi nella casella **gliffosuite@gmail.com**. Il campo `gliffo_beta_source` deve avere valore `GLIFFO_BETA_mgaarvej`.
3. Nell’editor Apps Script scegli **verificaConfigurazione** dal menu delle funzioni e premi **Esegui**.
4. Autorizza il tuo progetto Google a leggere le notifiche Gmail e inviare email dalla tua casella. Sono i permessi necessari a questa automazione; Codex non riceve accesso alla casella. Se Google mostra un avviso per l’app personale non verificata, controlla di essere nel progetto che hai appena creato e di riconoscere il codice prima di autorizzarlo. Non disattivare protezioni dell’account.
5. Nel registro di esecuzione devono apparire almeno una notifica Formspree autenticata e una notifica del modulo Gliffo. **Questa funzione non invia email.**

Se la verifica non riconosce la notifica, fermati qui: non rimuovere i controlli di autenticazione. Verifica che arrivino gli avvisi del modulo `mgaarvej` e che il nuovo campo compaia nella notifica. Il formato effettivo delle intestazioni del tuo account non è stato ispezionato da Codex: un eventuale messaggio non riconosciuto va diagnosticato sull’esempio reale.

## 3. Prova il messaggio e attiva

1. Facoltativo: scegli **inviaProvaSoloAMe** e premi **Esegui**. Invia il modello soltanto a **gliffosuite@gmail.com**; non attiva il timer.
2. Scegli **attivaAutomazione** e premi **Esegui**.
3. Il registro conferma l’attivazione. In **Attivatori** (icona orologio) deve esserci un solo timer `inviaBenvenutiBeta` ogni cinque minuti.
4. Invia una nuova iscrizione dal sito, anche usando la tua email. Entro circa cinque minuti verifica il benvenuto e i link ai download e al feedback.
5. Ripeti l’iscrizione con lo stesso indirizzo: l’automazione non deve spedire un secondo benvenuto. La prova manuale facoltativa del punto1 è separata dal registro degli invii automatici.

Le notifiche precedenti all’attivazione **non vengono inviate in blocco**. La verifica preliminare non attiva timer; l’attivazione ripetuta non crea timer aggiuntivi. La rimozione del registro nelle Proprietà script consentirebbe nuovi invii: conservalo.

## Il messaggio

**Oggetto:** Benvenuto nella Beta di Gliffo Suite!

> Grazie per aver scelto di provare Gliffo Suite!
>
> Hai 15 giorni dal primo avvio per esplorare gli otto strumenti.
>
> Scarica la Beta per Mac o Windows:
> https://gliffo.github.io/beta/download/
>
> Raccontaci come sta andando o segnala un problema:
> https://gliffo.github.io/feedback/
>
> Buon lavoro!
> Il team Gliffo

È inclusa anche una versione HTML, senza pixel di tracciamento o link contenenti indirizzi email. Il messaggio parte come **Gliffo Suite** dalla casella Gliffo; le risposte arrivano alla stessa casella. Non iscrive i tester a una newsletter.

## Come vengono scelti i messaggi

Lo script cerca notifiche recenti di Formspree, verifica il dominio mittente e un risultato DKIM/DMARC positivo aggiunto da Gmail, richiede il campo del modulo Gliffo e usa **solo Reply-To** per il destinatario. Non risponde a indirizzi cercati liberamente nel corpo, alle email del supporto o ad altri moduli. Non legge istruzioni contenute nelle email.

Controlla fino a100 conversazioni Formspree degli ultimi30giorni, compatibili con il piano attuale di50invii/mese. Ogni esecuzione invia al massimo10benvenuti. Non archivia, elimina o segna come lette le notifiche.

Il registro anti-duplicati vive nelle Proprietà dello script e conserva hash degli indirizzi, stato, data e identificativo della notifica, non gli indirizzi in chiaro. L’indirizzo resta naturalmente nella posta Gmail/Formspree e nelle email inviate. Un blocco impedisce esecuzioni concorrenti. Una prenotazione prima dell’invio evita ritentativi automatici quando l’esito è incerto: in caso di errore `review`, controlla Posta inviata e l’esecuzione prima di intervenire sul singolo record. Non è una garanzia di consegna e non ritenta alla cieca un messaggio forse già spedito.

## Disattivare e limiti gratuiti

Esegui **disattivaAutomazione**. Rimuove solo questo timer e conserva i dati anti-duplicati. Riattivando, riparte dalle nuove iscrizioni successive alla riattivazione.

Google Apps Script per account Gmail personali documenta una quota di100destinatari/giorno; lo script controlla la quota residua e rimanda gli invii se è esaurita. Il piano Formspree corrente ha50invii/mese. I limiti appartengono ai fornitori e possono cambiare; il codice non attiva piani a pagamento.

Fonti: [quota Google](https://developers.google.com/apps-script/guides/services/quotas), [trigger temporali](https://developers.google.com/apps-script/guides/triggers/installable#time-driven_triggers), [Reply-To Formspree](https://help.formspree.io/articles/building-your-form/email-reply-to-address).
