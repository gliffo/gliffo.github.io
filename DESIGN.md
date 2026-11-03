---
name: Gliffo Suite · Laboratorio vettoriale
description: Estensione della home Gliffo; feedback conserva il sistema operativo esistente.
colors:
  background: "#24262A"
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
- Gerarchia editoriale e superfici prevalentemente piatte.
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

Prevalgono linee e campiture. Il laboratorio hero ora usa piani sovrapposti menta, corallo e viola derivati dagli accenti app, con ombre direzionali; sei sagome della g originale formano un’estrusione viola scura. Le targhe app hanno ombre più definite e inclinazioni individuali; la finestra Suite ruotata ha ombra più ampia. La preview app usa una superficie scura distinta. Il movimento del laboratorio è limitato al puntatore; focus e selezione funzionano anche da tastiera. Animazioni introduttive solo desktop con movimento consentito; reduced-motion disattiva animazioni, transizioni e inclinazioni.

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
