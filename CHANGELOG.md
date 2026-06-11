# CHANGELOG — HEX Dokumenty v4.0

Format: `[DATA] Sesja N — opis`

---

## [2026-05-17] Sesja 1 — Rdzeń i architektura

### Dodano
- `index.html` — shell aplikacji: header, zakładki (Sprzedaż, Kupno, Najem, Ankieta, Aneksy, Inne), placeholdery dla CRM Esti i Autenti, spinner, toast, kolejność ładowania skryptów
- `css/core.css` — kompletny design system: zmienne CSS, header, zakładki, karty, formularze, przyciski, podpisy, spinner, toast, ankieta, responsive
- `js/core.js` — rdzeń aplikacji: `HEX.registerModule`, `HEX.switchTab`, `HEX.loadFirmaData`, `HEX.saveFirmaData`, `HEX.buildFirmaPochodne`, `HEX.showSpinner`, `HEX.hideSpinner`, `HEX.toast`, `HEX.getText`, `HEX.initSig`, `HEX.clearSig`, `HEX.getSig`, `HEX.fmtDate`, `HEX.fmtDateL`. Globalne aliasy dla kompatybilności.
- `js/logo.js` — placeholder na `LOGO_PDF_B64`
- `README.md`, `.gitignore`, `STAN.md`, `CHANGELOG.md`

### Decyzje
- Języki: tylko `pl` i `en` — usunięto `ua` i `by`
- Moduły izolowane — komunikacja tylko przez `HEX.*`
- Repo: https://github.com/coldmayster/Hex_panel

---

## [2026-05-17] Sesja 2 — ax.js + texts.js

### Zmieniono
- `js/ax.js` — pełny refaktor do architektury v4
- `js/texts.js` — usunięto wszystkie klucze `ua:` i `by:` (1492 → 1196 linii)

---

## [2026-05-17] Sesja 3 — rez.js

### Zmieniono
- `js/rez.js` — pełny refaktor do architektury v4
  - Namespace `const REZ = (() => { ... })()`
  - `slownie()` pozostała w module (używana tylko tu)

### Decyzje
- `slownie()` NIE przeniesiona do `core.js`

---

## [2026-06-09] Poza sesjami — sprzedaz.js refaktor tekstów (Claude Code)

### Zmieniono
- `js/sprzedaz.js` — przeniesiono wszystkie polskie teksty prawne do `texts.js`
  - Usunięto obiekt `const T` (~411 linii) i `const TR`
  - Wprowadzono lokalne helpery `g()` i `gpl()` delegujące do `HEX.getText()`
  - Dodano 130+ kluczy `sprzedaz.*` w `texts.js` (§1–§12, załączniki, PEP, RODO)
  - Plik skrócony z 2048 do ~1630 linii

### Decyzje
- Do `texts.js` trafia każdy tekst widoczny w PDF; dane konfiguracyjne FIRMA i komunikaty UI pozostają inline
- Wzorzec dwujęzyczny: `gpl('klucz')` dla PL, `isBilingual ? g('klucz') : null` dla tłumaczenia
- Parametryzacja kluczy: statyczne jako plain string, dynamiczne jako arrow function z named destructuring

---

## [2026-06-09] Sesja 4 — najem.js

### Dodano
- `js/najem.js` — scalenie `generator-najem/logic.js` + `generator-najem/pdf.js` → jeden plik w architekturze v4:
  - Namespace `const NAJEM = (() => { ... })()`
  - Rejestracja: `HEX.registerModule('najem', { onActivate: init })`
  - HTML modułu wstrzykiwany przez `render()` do `#najem-root`
  - Stan modułu jako zmienne lokalne: `selectedType`, `currentPage`, `prowizjaTyp`, `s5Wariant`, `ocImageData`
  - Wszystkie helpery → `HEX.*`
  - Public API: `NAJEM.selectType`, `goNext`, `goBack`, `setKlientTyp`, `togglePelnom`, `setProwizjaTyp`, `selectS5`, `updateBadge`, `clearSig`, `deletePolisa`, `handleOCFile`, `generatePDF`, `reset`
  - Obsługa dwóch typów umowy: najemca / wynajmujący
  - Logika polisy OC: domyślna z `DEFAULT_POLISA_B64`, upload PNG/JPG, przycisk usuń
  - 6-krokowy formularz ze stepperem
  - Generowanie PDF przez pdfMake (nagłówek z logo, paragrafy, załączniki, podpisy canvas)

### Sprawdzono
- `index.html` — `<div id="najem-root"></div>` i `<script src="js/najem.js"></script>` już były obecne, brak zmian

### Decyzje
- `getSigCanvas(id)` pobiera canvas z DOM na żądanie (zamiast globalnych zmiennych canvas)
- `startAddRecent` zachowane z guard `typeof === 'function'` (opcjonalna zależność)

---

## [2026-06-09] Sesja 5 — sprzedaz.js (Claude Code)

### Dodano
- `js/sprzedaz.js` — pełny refaktor do architektury v4 (z `Downloads/github/sprzedaz.js`):
  - Namespace `const SPRZEDAZ = (() => { ... })()`
  - Rejestracja: `HEX.registerModule('sprzedaz', { onActivate: init })`
  - HTML wstrzykiwany przez `render()` do `#sprzedaz-root` (zachowane klasy github — wszystkie 44 są już w `core.css`)
  - Stan modułu jako zmienne lokalne w IIFE
  - Public API: `SPRZEDAZ.*` (23 funkcje wołane z onclick)
  - Helpery → `HEX.*`: `showSpinner/hideSpinner`, `toast`, `getText`, `initSig/clearSig/getSig`, `loadFirmaData/saveFirmaData/buildFirmaPochodne`
  - Panel ustawień firmy + profile (localStorage `hex_firma_profiles`) zachowane
  - Numeracja umów `nr/skrot/agent/rok`
  - Załączniki: Z1–Z8 (RODO, OC, PEP, zgody, karty prezentacji)
  - 2117 linii

### Zmieniono
- `js/core.js` — rozszerzony model firmy (addytywnie):
  - `FIRMA_DOMYSLNE`: dodane `skrot`, `agent` (KOD do numeracji), `rok`, `agent_email`, `agent_tel`, `wlasciciel` (imię — wcześniej w `agent`)
  - `buildFirmaPochodne(F)` liczy pochodne `adres`, `krótka`, `ceidg` i **ZWRACA F** (wcześniej `undefined` — naprawia też najem.js `const FIRMA = buildFirmaPochodne(...)`)
- `js/logo.js` — wstawiono `LOGO_PDF_B64` (z prefiksem) + `DEFAULT_POLISA_B64` (surowy base64) zamiast placeholdera

### Decyzje
- Wariant B (modyfikowany): zachowano panel firmy + profile + numerację; języki tylko **PL + EN** (UA/BY świadomie pominięte — decyzja v4 sesja 1); layout dwukolumnowy zostaje dla EN
- Podpisy migrowane na `HEX.initSig/getSig` (rezygnacja z lokalnego `sigState`)
- `index.html` bez zmian (`#sprzedaz-root` i `<script src="js/sprzedaz.js">` już były)

### Do weryfikacji
- `ceidg` w `core.js` zawiera frazę „Centralnej Ewidencji Działalności Gospodarczej" — dla Home Experts sp. z o.o. (KRS) może wymagać korekty na „Rejestru Przedsiębiorców KRS"
- Test w przeglądarce (brak runtime JS lokalnie — walidacja statyczna: balans, API, klucze texts, ID, brak undefined-calls — wszystko ✓)

---

## [2026-06-09] Hotfix — SyntaxError getText + brakujący rez.js (Claude Code)

### Naprawiono
- `js/core.js` — usunięty globalny alias `const getText = (key,data,lang) => HEX.getText(...)`.
  Kolidował z `function getText` z `texts.js` (oba w zakresie globalnym) → `Uncaught SyntaxError:
  Identifier 'getText' has already been declared` → `HEX` nie powstawał → wszystkie moduły rzucały
  „HEX is not defined" (apka martwa). `HEX.getText` czyta obiekt `texts` bezpośrednio, więc usunięcie
  aliasu jest bezpieczne; moduły wołające bezprefiksowe `getText()` (ax.js) korzystają z funkcji z `texts.js`.
  Aliasy `loadFirmaData`, `buildFirmaPochodne`, `FIRMA` pozostawione bez zmian.

### Dodano
- `js/rez.js` — wypchnięty na GitHub (istniał lokalnie po sesji 3, ale **nigdy nie był na repo** →
  `<script src="js/rez.js">` zwracał 404). Naprawia 404.

### Zmieniono
- `index.html` — zakomentowane `<script>` dla `kupno.js`, `ankieta.js`, `inne.js` (pliki jeszcze nie
  istnieją → eliminuje 404). Odkomentować przy sesji 6/7.
- `gitignore` → `.gitignore` (poprawna nazwa — wcześniej plik był ignorowany przez Git jako zwykły)

### Zweryfikowano
- Kolejność w `index.html`: `texts.js → logo.js → core.js → moduły` (core.js wewnętrznie używa obiektu `texts`)
- Brak innych globalnych kolizji nazw (`FIRMA`/`loadFirmaData`/`buildFirmaPochodne`/`getText`) w żadnym module

---

## [2026-06-10] Sesja 5b — najem layout, logo, ustawienia firmy globalnie (Claude Code)

### Naprawiono
- `js/najem.js` — `render()` używał nazw klas CSS nieistniejących w `core.css` → rozjechany layout.
  Zmapowano na klasy z `core.css` (te z sprzedaz): `stepper→steps`, `step-lbl→step-label`,
  `najem-page→page`, `section-card→card`, `section-title→card-title`, `subsection-title→section-label`,
  `contract-label→contract-name`, `contract-sub→contract-desc`, `form-field→field`, `btn-row→nav-row`,
  `btn-toggle→lang-btn`, `btn-group-inline→lang-strip`, `btn-primary→btn btn-primary`,
  `btn-secondary/btn-ghost/btn-upload→btn btn-ghost`, podpisy→`sig-canvas`+`sig-actions`+`sig-clear-btn`+`sig-hint`.
  `showPage()` selektor `.najem-page`→`#najem-root .page` (scope). Logika nietknięta.

### Dodano
- Logo na granatowej belce — `core.js` `HEX.init()` ustawia `<img id="hex-logo">.src = LOGO_PDF_B64`
- Panel „Ustawienia firmy" **globalny** — przeniesiony z zakładki Sprzedaż do headera (dostępny ze wszystkich zakładek)

### Zmieniono
- `core.js` — 8 funkcji panelu firmy (`toggleFirmaPanel`, `initFirmaPanel`, `applyFirmaSettings`,
  `resetFirmaToDefault`, `renderFirmaProfiles`, `loadSelectedProfile`, `saveFirmaProfil`, `loadFirmaProfile`)
  przeniesione ze `sprzedaz.js` jako globalne; `Boot` wywołuje `initFirmaPanel()`; `initFirmaPanel`
  rozprzęgnięte od `langFeatureEnabled` (czyta `localStorage 'hex_lang_enabled'`)
- `index.html` — przycisk „⚙️ Ustawienia firmy" w `.hex-header-actions` + globalny `#firma-settings-panel`
- `sprzedaz.js` — usunięty panel firmy + 8 funkcji z `render()`/IIFE i z API; funkcje **języka umowy**
  (`selectContractLang`, `toggleLangFeature`, `initLangState`, `applyLangFeatureVisibility`) zostają (sprzedaz-specific)

### Zweryfikowano (preview, zrzuty)
- najem: stepper poziomy, karty z tłem, toggle `lang-btn`, podpisy — jak w Sprzedaż
- logo widoczne; panel firmy otwiera się z każdej zakładki (test z Najem), pola wypełnione z `HEX.loadFirmaData()`,
  1 panel (bez duplikatu), zero błędów w konsoli

---

## [2026-06-10] Sesja 5c — najem .container + bug „dwa Dalej" w sprzedaz (Claude Code)

### Naprawiono
- `js/najem.js` — `render()` nie był opakowany w `<div class="container">` → treść rozlewała się na całą
  szerokość ekranu (na wąskim viewport niewidoczne). Dodano wrapper `.container` (max-width 820px, środkowanie)
  jak w sprzedaz/ax/rez. Teraz najem wizualnie spójny ze Sprzedaż (marginesy, szerokość, środkowanie).
- `js/sprzedaz.js` — **bug „dwa przyciski Dalej, jeden martwy"**: w bloku języka (page 2) został osierocony
  `</div>` po usunięciu opcji UA/BY (sesja 5) → `page2` domykała się za wcześnie, a jej `nav-row`
  (Wstecz/Dalej) wypadała poza stronę do `.container` i była zawsze widoczna. Usunięto nadmiarowy `</div>`
  (page2 div-balance 43/43). `nav-row` wróciła do `#page2`; widoczny tylko 1 Dalej (aktywnej strony).

### Zweryfikowano (preview 1400px)
- najem i sprzedaz wyśrodkowane, identyczna szerokość/marginesy; aneksy (ax.js) już spójne (container 820)
- sprzedaz: 1 widoczny „Dalej" (`goNext(2)` z powrotem w `#page2`)
- kupno.js / inne.js — nie istnieją jeszcze (powstaną w architekturze v4 = automatycznie spójne)

---

## Wzorzec wpisu (kopiuj na start każdej sesji)

```
## [YYYY-MM-DD] Sesja N — krótki opis

### Dodano
- ...

### Zmieniono
- ...

### Naprawiono
- ...

### Decyzje
- ...
```
