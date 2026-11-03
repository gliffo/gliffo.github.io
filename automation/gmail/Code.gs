/**
 * Gliffo Suite — benvenuto Beta gratuito con Google Apps Script.
 * Incollare in un progetto dell'account gliffosuite@gmail.com.
 * Nessun dato delle iscrizioni o chiave va inserito in questo file.
 */
var GLIFFO = Object.freeze({
  mailbox: 'gliffosuite@gmail.com',
  marker: 'GLIFFO_BETA_mgaarvej',
  query: 'newer_than:30d from:(formspree.io) -in:spam -in:trash',
  download: 'https://gliffo.github.io/beta/download/',
  feedback: 'https://gliffo.github.io/feedback/',
  subject: 'Benvenuto nella Beta di Gliffo Suite!',
  handler: 'inviaBenvenutiBeta',
  batchLimit: 10
});

/** PASSO 1: verifica senza inviare email e senza attivare il timer. */
function verificaConfigurazione() {
  verificaAccount_();
  var counts = analizzaNotifiche_();
  console.log('Notifiche Formspree autenticate: ' + counts.authenticated);
  console.log('Notifiche del modulo Gliffo Beta: ' + counts.gliffo);
  console.log('Per la prova, usa una nuova iscrizione dal sito: anche la tua email va bene.');
  if (!counts.gliffo) {
    throw new Error('Nessuna notifica Gliffo riconosciuta. Fai un nuovo invio dal sito e controlla che la notifica Formspree arrivi in questa casella. Non è stata inviata alcuna email.');
  }
  console.log('OK. Puoi eseguire inviaProvaSoloAMe e poi attivaAutomazione.');
  return counts;
}

/** PASSO 2 FACOLTATIVO: invia la bozza SOLO alla casella proprietaria. */
function inviaProvaSoloAMe() {
  verificaAccount_();
  if (MailApp.getRemainingDailyQuota() < 1) throw new Error('Quota Google esaurita: riprova domani.');
  spedisceBenvenuto_(GLIFFO.mailbox);
  console.log('Email di prova inviata soltanto alla casella Gliffo. Automazione non attivata da questa funzione.');
}

/** PASSO 3: attiva il timer; solo nuove notifiche ricevute dopo questa attivazione. */
function attivaAutomazione() {
  verificaAccount_();
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) throw new Error('Un’altra operazione è in corso. Riprova tra poco.');
  try {
    var props = PropertiesService.getScriptProperties();
    var existing = ScriptApp.getProjectTriggers().filter(function(t) { return t.getHandlerFunction() === GLIFFO.handler; });
    if (props.getProperty('gliffo_enabled') === 'true' && existing.length) {
      console.log('Automazione già attiva. Non sono stati creati altri timer.');
      return;
    }
    if (!analizzaNotifiche_().gliffo) {
      throw new Error('Prima esegui verificaConfigurazione con una nuova notifica del sito. Nessun timer attivato.');
    }
    props.setProperty('gliffo_enabled', 'false');
    existing.forEach(function(t) { ScriptApp.deleteTrigger(t); });
    var started = String(Date.now());
    ScriptApp.newTrigger(GLIFFO.handler).timeBased().everyMinutes(5).create();
    props.setProperty('gliffo_started', started);
    props.setProperty('gliffo_enabled', 'true');
    console.log('Attiva: controllo ogni circa 5 minuti, solo iscrizioni successive ad ora. Gli indirizzi già contattati restano esclusi.');
  } finally { lock.releaseLock(); }
}

/** Disattiva SOLO questo timer. Non cancella messaggi o il registro anti-duplicati. */
function disattivaAutomazione() {
  verificaAccount_();
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) throw new Error('Un invio è in corso. Riprova tra poco.');
  try {
    PropertiesService.getScriptProperties().setProperty('gliffo_enabled', 'false');
    ScriptApp.getProjectTriggers().filter(function(t) { return t.getHandlerFunction() === GLIFFO.handler; }).forEach(function(t) { ScriptApp.deleteTrigger(t); });
    console.log('Automazione disattivata. Registro invii conservato.');
  } finally { lock.releaseLock(); }
}

/** Funzione eseguita dal timer. Non eseguirla per inviare alle vecchie iscrizioni. */
function inviaBenvenutiBeta() {
  verificaAccount_();
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(1000)) return;
  try {
    var props = PropertiesService.getScriptProperties();
    if (props.getProperty('gliffo_enabled') !== 'true') return;
    var started = Number(props.getProperty('gliffo_started'));
    if (!Number.isFinite(started) || started <= 0) return;
    var limit = Math.min(GLIFFO.batchLimit, MailApp.getRemainingDailyQuota());
    if (limit < 1) { console.log('Quota Google esaurita. Le notifiche restano in attesa.'); return; }
    var sent = 0, records = props.getProperties();
    var messages = cercaNotifiche_().sort(function(a,b) { return a.getDate().getTime() - b.getDate().getTime(); });
    for (var i=0; i<messages.length && sent<limit; i++) {
      var message = messages[i];
      if (message.getDate().getTime() < started) continue;
      var recipient = destinatarioNotifica_(message);
      if (!recipient) continue;
      var key = chiaveIndirizzo_(recipient);
      // Comprende invii riusciti E invii dall'esito incerto: non ritenta alla cieca.
      if (records[key] || props.getProperty(key)) continue;
      var record = { state:'sending', messageId:message.getId(), at:new Date().toISOString() };
      props.setProperty(key, JSON.stringify(record));
      records[key] = JSON.stringify(record);
      try {
        spedisceBenvenuto_(recipient);
        record.state = 'sent';
        props.setProperty(key, JSON.stringify(record));
        records[key] = JSON.stringify(record);
        sent++;
      } catch (_) {
        record.state = 'review';
        props.setProperty(key, JSON.stringify(record));
        console.log('Un invio richiede verifica nella Posta inviata. Nessun nuovo tentativo automatico per questo indirizzo; nessun altro invio in questa esecuzione.');
        break;
      }
    }
    console.log('Benvenuti inviati in questa esecuzione: ' + sent);
  } finally { lock.releaseLock(); }
}

function verificaAccount_() {
  var account = String(Session.getEffectiveUser().getEmail() || '').toLowerCase();
  if (account !== GLIFFO.mailbox) throw new Error('Apri questo progetto con l’account gliffosuite@gmail.com. Nessuna operazione eseguita.');
}

function cercaNotifiche_() {
  // Il piano corrente Formspree ha 50 invii/mese; 100 conversazioni coprono anche gli avvisi dell’account.
  var threads = GmailApp.search(GLIFFO.query, 0, 100), messages = [];
  threads.forEach(function(thread) { thread.getMessages().forEach(function(message) { messages.push(message); }); });
  return messages;
}

function analizzaNotifiche_() {
  var result = { authenticated:0, gliffo:0 };
  cercaNotifiche_().forEach(function(message) {
    if (!notificaAutenticata_(message)) return;
    result.authenticated++;
    if (contieneMarca_(message)) result.gliffo++;
  });
  return result;
}

function indirizzoSingolo_(header) {
  var text = String(header || '').trim();
  if (/[\r\n;]/.test(text)) return null;
  var match = text.match(/^[^<>]*<([^<>]+)>$/);
  var address = (match ? match[1] : text).trim().toLowerCase();
  if (address.length > 254 || !/^[a-z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/i.test(address)) return null;
  return address;
}

function dominioFormspree_(domain) {
  return /^(?:[a-z0-9-]+\.)*formspree\.io$/i.test(domain);
}

function notificaAutenticata_(message) {
  var from = indirizzoSingolo_(message.getFrom());
  if (!from || !dominioFormspree_(from.split('@')[1])) return false;
  // Usa il risultato aggiunto da Gmail, non un'intestazione costruita nel corpo del messaggio.
  var auth = String(message.getHeader('Authentication-Results') || '');
  if (!/^\s*mx\.google\.com\s*;/i.test(auth)) return false;
  var alignedDkim = /(?:^|;)\s*dkim=pass\b[^;]*\bheader\.(?:d|i)=@?(?:[a-z0-9-]+\.)*formspree\.io(?=[\s;()]|$)/i.test(auth);
  var alignedDmarc = /(?:^|;)\s*dmarc=pass\b[^;]*\bheader\.from=(?:[a-z0-9-]+\.)*formspree\.io(?=[\s;()]|$)/i.test(auth);
  return alignedDkim || alignedDmarc;
}

function contieneMarca_(message) {
  // Campo nascosto inserito nel sito: evita risposte a supporto, attivazioni o altri moduli.
  return String(message.getPlainBody()).indexOf(GLIFFO.marker) !== -1 || String(message.getBody()).indexOf(GLIFFO.marker) !== -1;
}

function destinatarioNotifica_(message) {
  if (!notificaAutenticata_(message) || !contieneMarca_(message)) return null;
  // Non cerca email nel testo e non risponde al mittente tecnico Formspree.
  var recipient = indirizzoSingolo_(message.getReplyTo());
  if (!recipient || dominioFormspree_(recipient.split('@')[1])) return null;
  return recipient;
}

function chiaveIndirizzo_(address) {
  var hash = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, address.toLowerCase(), Utilities.Charset.UTF_8);
  return 'gliffo_sent_' + Utilities.base64EncodeWebSafe(hash).replace(/=+$/, '');
}

function testoBenvenuto_() {
  return 'Grazie per aver scelto di provare Gliffo Suite!\n\n' +
    'Hai 15 giorni dal primo avvio per esplorare gli otto strumenti.\n\n' +
    'Scarica la Beta per Mac o Windows:\n' + GLIFFO.download + '\n\n' +
    'Raccontaci come sta andando o segnala un problema:\n' + GLIFFO.feedback + '\n\n' +
    'Buon lavoro!\nIl team Gliffo\n\n' +
    'Ricevi questa email perché hai richiesto l’accesso alla Beta di Gliffo Suite.';
}

function htmlBenvenuto_() {
  return '<!doctype html><html lang="it"><body style="margin:0;background:#f0edef;color:#24262a;font-family:Arial,Helvetica,sans-serif">' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:32px 16px">' +
    '<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="width:100%;max-width:560px;background:#fff;border-radius:16px">' +
    '<tr><td style="padding:26px 32px;background:#24262a;color:#f4f4f2;border-radius:16px 16px 0 0;font-size:28px;font-weight:bold">gliffo<span style="color:#ea5c53">.</span></td></tr>' +
    '<tr><td style="padding:32px;font-size:16px;line-height:1.6"><h1 style="font-size:28px;line-height:1.15;margin:0 0 22px">Benvenuto nella Beta!</h1>' +
    '<p>Grazie per aver scelto di provare Gliffo Suite!</p><p>Hai <strong>15 giorni dal primo avvio</strong> per esplorare gli otto strumenti.</p>' +
    '<p style="margin:28px 0"><a href="' + GLIFFO.download + '" style="display:inline-block;padding:14px 22px;background:#24262a;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold">Scarica Gliffo Suite Beta</a></p>' +
    '<p>Raccontaci come sta andando o segnala un problema dal <a href="' + GLIFFO.feedback + '" style="color:#8f302b;text-decoration:underline">modulo feedback</a>.</p>' +
    '<p>Buon lavoro!<br>Il team Gliffo</p><p style="margin-top:28px;font-size:12px;color:#60646b">Ricevi questa email perché hai richiesto l’accesso alla Beta di Gliffo Suite.</p>' +
    '</td></tr></table></td></tr></table></body></html>';
}

function spedisceBenvenuto_(recipient) {
  MailApp.sendEmail({ to:recipient, subject:GLIFFO.subject, body:testoBenvenuto_(), htmlBody:htmlBenvenuto_(), name:'Gliffo Suite', replyTo:GLIFFO.mailbox });
}
