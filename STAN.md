# STAN PROJEKTU — HEX Dokumenty v4.0
> Aktualizuj ten plik na początku i końcu każdej sesji roboczej.

## 📍 Aktualna sesja
- **Data:** 2026-06-10
- **Etap:** Sesja 5 → 5c ✅ (sprzedaz v4 + najem v4 + firma globalnie + poprawki layoutu/bugów)
- **Następny krok:** Sesja 6 — kupno.js + ankieta.js (puste zakładki do zbudowania w v4)

## 🎨 Sesja 5b (2026-06-10)
- **najem.js layout** — klasy CSS w `render()` zmapowane na istniejące w `core.css` (rozjechany układ naprawiony). Zweryfikowane wizualnie.
- **Logo na belce** — `core.js HEX.init()` ustawia `#hex-logo.src = LOGO_PDF_B64`.
- **Ustawienia firmy globalnie** — panel + 8 funkcji przeniesione ze `sprzedaz.js` do `core.js` + headera `index.html`. Dostępne ze wszystkich zakładek. Funkcje języka umowy zostają w `sprzedaz.js`.

## 🏢 Sesja 5d (2026-06-12)
- **Panel firmy: dowolny podmiot** — selektor „Forma prawna" (JDG/Spółka, domyślnie neutralny), osobne pola REGON i KRS (KRS tylko dla spółki). `FIRMA.ceidg` w `core.js` dobiera klauzulę: spółka → KRS, JDG → CEIDG.
- **Domyślne dane firmy = PUSTE** (nieuzupełnione — każdy wpisuje swoje); zostaje tylko `rok` (auto). Select „Stanowisko" ma neutralną opcję „— wybierz —".

## 🎨 Sesja 5c (2026-06-10)
- **najem.js `.container`** — `render()` opakowany w `<div class="container">` (max-width 820, środkowanie). Wcześniej treść rozlewała się na całą szerokość na szerokim ekranie. Teraz spójny ze Sprzedaż.
- **Bug „dwa Dalej" (sprzedaz)** — osierocony `</div>` w bloku języka page2 (pozostałość po usunięciu UA/BY w sesji 5) domykał `page2` za wcześnie → `nav-row` z Dalej wypadała poza stronę. Usunięty; page2 zbilansowane (43/43); widoczny tylko 1 Dalej.
- **Aneksy (ax.js)** — sprawdzone: już spójne (container 820 + poprawne klasy), bez zmian.
- **kupno.js / inne.js** — nie istnieją; zakładki puste do zbudowania (sesja 6+).

## 🩹 Hotfix (2026-06-09, po sesji 5)
- **SyntaxError `getText`** — usunięty globalny alias `const getText` z `core.js` (kolidował z `function getText` w `texts.js` → `HEX` nie powstawał → „HEX is not defined"). Apka znów się uruchamia.
- **`rez.js`** — dodany do repo (istniał lokalnie po sesji 3, nigdy nie wypchnięty → 404). ✅
- **`index.html`** — zakomentowane `<script>` dla `kupno.js`/`ankieta.js`/`inne.js` (jeszcze nie istnieją).
- **`gitignore` → `.gitignore`** — poprawiona nazwa.

---

## ✅ Co zostało zrobione (v4.0)

### Sesja 1 — Rdzeń i architektura
- [x] `index.html` — czysty shell z zakładkami, spinner, toast, kolejność skryptów
- [x] `css/core.css` — pełny design system (~400 linii)
- [x] `js/core.js` — router `HEX.*`, firma, spinner, toast, getText, podpisy, daty
- [x] `js/logo.js` — placeholder na base64 logo
- [x] `README.md`, `.gitignore`, `STAN.md`, `CHANGELOG.md`

### Sesja 2 — ax.js + texts.js
- [x] `js/ax.js` — refaktor do architektury v4
- [x] `js/texts.js` — usunięto 296 linii kluczy `ua:` i `by:` (1492 → 1196 linii)

### Sesja 3 — rez.js
- [x] `js/rez.js` — refaktor do architektury v4

### Sesja 4 — najem.js ✅ ZAKOŃCZONA
- [x] `js/najem.js` — scalenie `generator-najem/logic.js` + `generator-najem/pdf.js` → jeden plik
- [x] Architektura v4: `const NAJEM = (() => { ... })()`
- [x] Rejestracja: `HEX.registerModule('najem', { onActivate: init })`
- [x] HTML modułu wstrzykiwany przez `render()` do `#najem-root`
- [x] Wszystkie helpery → `HEX.*`
- [x] Public API: `NAJEM.*` wywoływane z onclick w HTML
- [x] Logika polisy OC (domyślna załadowana, przycisk usuń, walidacja PNG/JPG)
- [x] `index.html` — potwierdzono że `najem-root` i script tag już były (brak zmian)

### Poza sesjami — Claude Code
- [x] `js/sprzedaz.js` — refaktor tekstów: przeniesiono ~411 linii inline PL do `texts.js`
  - Usunięto obiekt `const T` i `const TR`
  - Wprowadzono helpery `g()` i `gpl()` delegujące do `getText()`
  - Plik skrócony z 2048 do ~1630 linii
  - Zero polskich inline-stringów prawnych w logice PDF

---

## 🔄 Do zrobienia (kolejne sesje)

### Sesja 6 — kupno.js + ankieta.js
- [ ] Refaktor lub implementacja od zera w architekturze v4
- [ ] Rozważyć Claude Design → Claude Code workflow dla UI

### Sesja 7 — inne.js

### Sesja 8 — PWA
- [ ] `manifest.json` (nazwa, ikony, kolory navy/gold)
- [ ] Service Worker (cache, offline)
- [ ] Meta tagi w `index.html`
- [ ] Ikony PNG (logo Home Experts) — potrzebne przed implementacją

### Przyszłe moduły
- [ ] `modules/auth/` — konta użytkowników
- [ ] `modules/crm-esti/` — integracja CRM Esti
- [ ] `modules/autenti/` — e-podpis Autenti (SIGNIUS Biznes PRO)
- [ ] `modules/mailer/` — wysyłka email

---

## 🏗 Architektura

```
Hex_panel/
├── index.html                ✅ (bez zmian)
├── css/
│   └── core.css              ✅
├── js/
│   ├── core.js               ✅
│   ├── texts.js              ✅ (pl/en, bez ua/by)
│   ├── logo.js               ✅ (placeholder)
│   ├── ax.js                 ✅
│   ├── rez.js                ✅
│   ├── najem.js              ✅ sesja 4
│   ├── sprzedaz.js           ✅ sesja 5 (architektura v4, panel firmy+profile, PL+EN)
│   ├── kupno.js              ⏳ sesja 6
│   ├── ankieta.js            ⏳ sesja 6
│   └── inne.js               ⏳ sesja 7
└── modules/
    ├── auth/
    ├── crm-esti/
    ├── autenti/
    └── mailer/
```

## 🎨 Design system
- Navy: `#1a2b5e` · Gold: `#b8922a` · Cream: `#f8f6f1`
- Fonty: Playfair Display (nagłówki), DM Sans (treść)

## 🌐 Języki
- Polski (`pl`) ✅ · Angielski (`en`) ✅
- Ukraiński (`ua`) ❌ usunięty · Białoruski (`by`) ❌ usunięty

## 🔧 Zasady architektury
- Każdy moduł: `const MODUL = (() => { ... })()`
- Rejestracja: `HEX.registerModule('id', { onActivate })`
- HTML wstrzykiwany przez `MODUL.render()` do `#id-root`
- Kolejność skryptów: `texts.js` → `logo.js` → `core.js` → moduły

## 🔧 Zalecany workflow
- **Claude Design** — prototypy UI nowych modułów
- **Claude Code** — implementacja kodu, refaktory dużych plików
- **Chat Claude** — planowanie, architektura, STAN.md

## 📦 Repo
- **v4:** https://github.com/coldmayster/Hex_panel
- **v3 (backup):** https://github.com/coldmayster/hex-dokumenty
- **Live (v3):** https://hexdokumenty.netlify.app

## ⚠️ Ważne uwagi
- `LOGO_PDF_B64` + `DEFAULT_POLISA_B64` — ✅ przeniesione do `logo.js` (globalne, współdzielone przez sprzedaz+najem)
- `core.js` — rozszerzony model firmy: pola bazowe `skrot/agent(kod)/rok/agent_email/agent_tel/wlasciciel`; pochodne `adres/krótka/ceidg` liczone w `buildFirmaPochodne` (teraz ZWRACA F). Addytywne — najem/rez/ax bez zmian. UWAGA: tekst `ceidg` mówi „CEIDG" — zweryfikować dla sp. z o.o. (KRS)
- `sprzedaz.js` — panel ustawień firmy + profile zachowane (localStorage `hex_firma_profiles`); podpisy przez `HEX.initSig/clearSig/getSig`; języki PL+EN (layout dwukolumnowy tylko dla EN); `prefillAnkietaFromGenerator` to stub do czasu sesji 6
- `slownie()` — pozostaje w `rez.js` (nie globalizujemy)
- Polisa OC — zaimplementowana w `najem.js` ✅
- PWA — wymaga ikon PNG przed implementacją
- **Na start każdej sesji:** wgraj `STAN.md` + `CHANGELOG.md`
