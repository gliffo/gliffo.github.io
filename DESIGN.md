---
name: Gliffo Suite · Laboratorio vettoriale
description: Estensione della home Gliffo; feedback conserva il sistema operativo esistente.
colors:
  background: "#24262A"
  home-night: "#15131E"
  home-hero-highlight: "#FF8F83"
  home-glass: "#241D3C66"
  surface: "#2C3036"
  ink: "#F4F4F2"
  muted: "#B9C0CA"
  coral: "#EA5C53"
  home-line: "#4B515A"
  feedback-line: "#505761"
  feedback-field: "#363B42"
  action-ink: "#1B1D20"
  primary-hover: "#F6776D"
  preview: "#1D1F23"
  hero-extrusion: "#353C69"
  hero-badge-active: "#343944"
  nesso: "#7C86C1"
  trama: "#40B497"
  modulo: "#E9AD41"
  tono: "#D85E9F"
  tipo: "#B7D050"
  soglia: "#EC682D"
  capsula: "#43A6DE"
  scena: "#E7DCC8"
typography:
  display:
    fontFamily: "Bricolage, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "clamp(64px, 6.55vw, 96px)"
    fontWeight: 650
    lineHeight: 0.99
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Bricolage, sans-serif"
    fontSize: "clamp(42px, 4.2vw, 62px)"
    fontWeight: 650
    lineHeight: 1.03
  body:
    fontFamily: "Bricolage, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "16px"
    lineHeight: 1.6
  label:
    fontFamily: "Bricolage, sans-serif"
    fontSize: "14px"
    fontWeight: 500
  feedback-body:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "16px"
    lineHeight: 1.6
rounded:
  action: "6px"
  tool: "7px"
  download: "9px"
  screenshot: "12px"
  preview: "16px"
spacing:
  home-gutter: "48px"
  home-mobile-gutter: "24px"
  section: "110px"
  section-mobile: "70px"
components:
  button-primary:
    backgroundColor: "{colors.coral}"
    textColor: "{colors.action-ink}"
    rounded: "{rounded.action}"
    padding: "14px 20px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  download-enabled:
    backgroundColor: "{colors.action-ink}"
    textColor: "{colors.ink}"
    rounded: "{rounded.download}"
    padding: "21px 23px"
---

# Design System: Gliffo Suite

## Overview

**Creative North Star: "Laboratorio vettoriale"**

La home estende il fondo scuro e i marchi originali Gliffo con tipografia espressiva, guide vettoriali e accenti propri delle app. Il segno centrale è una composizione interattiva del sito, non una simulazione operativa di Illustrator. Il feedback conserva il suo linguaggio operativo esistente.

**Key Characteristics:**
- Marchi SVG originali e accenti riconoscibili per app.
- Gerarchia editoriale, sfumature liquide e vetro nel primo viewport.
- Interazione limitata e rispettosa del movimento ridotto.

## Colors

### Primary
Il corallo guida azioni, focus e accenti editoriali. Il testo delle azioni usa l’inchiostro scuro dedicato.

### Secondary
Gli otto colori app seguono i marchi originali: Nesso, Trama, Modulo, Tono, Tipo, Soglia, Capsula e Scena. L’avorio Scena sostiene anche il pannello editoriale chiaro.

### Neutral
Fondo carbone, testo chiaro e secondario freddo mantengono continuità con la Suite. La home ha una linea divisoria propria; feedback conserva i suoi bordi e campi definiti nel frontmatter.

**The Separate Surfaces Rule.** L’estensione home non modifica i token o il CSS del feedback.

## Typography

La home usa Bricolage Grotesque variabile locale, con licenza OFL allegata. Titoli compatti e ampi, corpo leggibile; i titoli usano assi opsz 72 e wdth 98. Il titolo hero varia ai breakpoint (fino a 58px nella fascia più stretta); non estendere la misura desktop a ogni schermo. Il feedback conserva font di sistema e gerarchia precedente.

## Layout

Home: contenitore massimo 1440px, margine interno desktop 48px; hero su due colonne, sezioni con respiro verticale 110px. A 1100px si riducono spazi e misure; a 760px hero, racconto, explorer, download e FAQ passano in colonna, con margine 24px e sezioni 70px. A 390px alcuni margini diventano 20px. Il laboratorio è una tavola 640×620 scalata nella sua area. La preview app è sticky desktop e relativa mobile, con area immagine scorrevole.

Feedback preservato: shell 880px con 824px interni, margine desktop 28px e mobile 20px sotto 540px; header logo e badge BETA TEST. Tally trasparente sul fondo Gliffo, senza altezza CSS fissa o clipping del contenitore; non applicare il layout home al modulo.

## Elevation & Depth

Prevalgono linee e campiture. Il laboratorio hero ora usa piani sovrapposti menta, corallo e viola derivati dagli accenti app, con ombre direzionali; sei sagome della g originale formano un’estrusione viola scura. Le targhe app hanno ombre più definite e inclinazioni individuali; la finestra Suite resta diritta per preservare la nitidezza dei testi. La preview app usa una superficie scura distinta. Il movimento del laboratorio è limitato al puntatore; focus e selezione funzionano anche da tastiera. Animazioni introduttive solo desktop con movimento consentito; reduced-motion disattiva animazioni, transizioni e inclinazioni.

## Shapes

Azioni con angoli compatti; targhe app, download e preview seguono i raggi del frontmatter. Cerchi, punti di ancoraggio e maniglie appartengono al laboratorio vettoriale. I piani colorati hanno raggio 16px; la profondità della g è una maschera del marchio originale, non una nuova versione del logo. I disclosure delle app e FAQ sono righe separate da bordi, non una griglia di card equivalenti.

## Components

- **Azioni:** pulsante primario corallo; hover più chiaro con spostamento di 2px. Variante outline per invito feedback; focus di 2px, offset 7px nella home: corallo sulle superfici scure e inchiostro scuro nelle sezioni download e racconto avorio.
- **Navigazione:** logo originale e link testuali; sotto 760px scompaiono i link secondari marcati wide-link, resta l’accesso alle azioni principali.
- **Targhe laboratorio:** otto link con SVG originali; hover/focus selezionano accento e descrizione, clic apre la relativa app nell’explorer. Le targhe usano superficie scura, ombra direzionale e bordo inferiore interno nel colore dello strumento attivo.
- **Explorer app:** disclosure esclusivi e preview corrente; liste e immagini descrivono funzioni concrete della Beta. Il ruolo nell’intestazione aperta usa il testo chiaro principale; l’accento app resta nella freccia e negli elementi grafici.
- **Accesso Beta:** la sezione corallo della home contiene il modulo Tally trasparente 2jXzv9, titolo nascosto, altezza dinamica e fallback diretto; iframe con src nativo e titolo accessibile. L’editor Tally controlla i campi, non CSS locale. L’esito provider atteso porta a /beta/download/.
- **Download:** link HTML statici Mac e Windows solo nella pagina separata /beta/download/, disponibili senza JavaScript. Questa pagina noindex resta pubblica. downloads.json registra URL e hash, senza fetch runtime.
- **Feedback esistente:** modulo gestito da Tally, link diretto sopra iframe, recupero email, footer copyright e focus corallo. Conservare queste definizioni.

## Do's and Don'ts

### Do:
- Do mantenere separati landing.css e styles.css del feedback.
- Do usare gli accenti app per selezione, guide e riconoscimento.
- Do etichettare le anteprime come interfacce con dati dimostrativi.

### Don'ts:
- Don’t applicare Bricolage o le nuove misure home al feedback implicitamente.
- Don’t presentare guide della landing o mock CEP come esecuzione nativa Illustrator.
- Don’t sostituire gli SVG originali con marchi ricreati.

## Aggiornamento: sfumature, vetro e liquido

Richiesta esplicita: landing colorata con sfumature, vetro ed effetti liquidi. Il primo viewport usa `liquid.js`, un campo cromatico WebGL procedurale con distorsione e rifrazione geometrica, controllato lentamente dal tempo e dal puntatore. Non è una simulazione fluidodinamica fisica. La lente CSS traslucida e le targhe app usano backdrop-filter su questo sfondo reale; gli SVG restano originali. Nessun asset raster generato.

La home usa un fondo notturno #15131E e accento hero #FF8F83. Il vetro app ha fondo #241D3C66, blur 24px (14px mobile), bordi #FFFFFF50 e ombre morbide. La lente usa blur 7px, saturazione 1.45 e riflessi sfumati. Bianco e corallo restano colori di testo pieni, senza testo a gradiente. Le altre sezioni introducono sfumature lilla, rosa e turchese senza alterare i contenuti.

WebGL è limitato a circa 30 fotogrammi al secondo e 1,4 milioni di pixel. Il rendering si ferma fuori viewport, in schede nascoste e con movimento ridotto. In quest’ultimo caso resta una composizione statica. Se WebGL manca o il contesto si perde, resta lo sfondo CSS; testi e link funzionano. I token feedback e styles.css rimangono invariati.

## Modulo email nativo

Richiesta utente: box bianco con email e pulsante nero affiancato. .email-shell: #FFFFFF, raggio13px, padding6px, gap6px, ombra0 12px 28px #501D1D18. Input trasparente, testo#1B1D20, placeholder#62656B. Pulsante#111111/testo#FFFFFF, raggio8px e padding14px 18px, sempre affiancato; sotto450px riduce padding e label per restare su una riga. Etichetta email reale, input typeemail obbligatorio e autocompleteemail. Focus scuro visibile sul gruppo bianco. La validazione è quella nativa del browser; il POST e il ritorno ai download sono gestiti da Formspree. Non viene più caricato Tally nella sezione Beta. Nessun successo finto nel frontend e nessuna chiave segreta. Il feedback continua a usare il suo Tally originale.

## Stati di invio email

Il box bianco e il pulsante nero restano invariati. Invio: pulsante disabilitato con testo Invio… e form aria-busy. Errore: messaggio14px/lineheight1.5 inchiostro#1B1D20 sotto il box, role=status/aria-livepolite; campo email conservato e pulsante riabilitato. Successo: messaggio breve seguito dai download soltanto dopo conferma del provider. Timeout12secondi e nessun trasferimento dell’email tramite URL o localStorage.

## Gerarchia e copy semplificati

Hero: Meno clic. Più tempo.; descrizione apre con 8strumenti perAdobeIllustrator, poi griglie/colori/presentazioni/export. ProvalaBeta è l’azione primaria verso#download, Scoprileapp la secondaria. Compatibilità e prova15giorni sono visibili subito. Le panoramiche duplicate e lo statement intermedio sono rimossi; resta un racconto con screenshot, tre vantaggi concreti e CTA. Ogni app ha titolo funzionale e una frase; le vecchie liste sono rimosse. FAQbrevi, invito feedback diretto. Logo, font, colori, glass e shader invariati.

## Conferma iscrizione con link nella posta

Dopo successo, messaggio inline role=status: controllare la posta, attesa indicativa5minuti, ricerca del benvenuto precedente per chi è già iscritto e Spam. Nessuna navigazione o URL download esposta dalla conferma. Il form si svuota e torna disponibile per correggere un eventuale indirizzo; campo email required e pulsante evitano invii doppi accidentali. Il box bianco/nero resta invariato.


## Anteprime ad alta risoluzione

Suite e otto app ricatturate a 4× dal payload firmato Beta 1.0.0, WebP senza perdita (circa 1,05 MB complessivi, caricati su richiesta). Nessun ingrandimento delle vecchie immagini. Pulsante Ingrandisci con dialogo, scorrimento interno per Scena, chiusura con Escape e ritorno del focus. Screenshot Suite diritto. Verificati tutti gli otto strumenti su desktop 1440 e mobile 390 a densità 2×, senza overflow orizzontale o errori JavaScript. Formspree, marker Gmail e feedback preservati. Interfacce HTML con dati dimostrativi, non esecuzione nativa Illustrator.


## Header — scultura liquida

Direzione approvata: amplificare il laboratorio vettoriale con una composizione sperimentale. Il marchio originale diventa una scultura cromata WebGL: alpha derivato dallo SVG originale, estrusione in shader, riflessi viola/corallo/menta e lente rifrangente che segue il puntatore con inerzia. Le otto targhe SVG restano link reali, rispondono a hover e focus e aprono la relativa app; il colore selezionato cambia i riflessi. Titolo HTML invariato, secondo rigo su una campitura acida inclinata (#D5FB58). Nessun effetto sul testo o sul modulo.

Implementazione isolata in experiment.css e liquid.js: nessuna dipendenza esterna. Rendering limitato a circa 30fps e 1,2 milioni di pixel, pausa fuori schermo e a scheda nascosta. Movimento ridotto con frame statico; senza WebGL rimangono marchio SVG, sfumature CSS e tutti i link. Verificati Chromium desktop 1440, tablet 768 e mobile 390, texture WebGL, assenza di overflow, focus e navigazione delle app; fallback senza WebGL e movimento ridotto. Nessuna prova su dispositivo fisico dichiarata. Accesso Beta, screenshot 4×, feedback e installer preservati.
