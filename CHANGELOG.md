# CHANGELOG — HEX Dokumenty v4.0

Format: `[DATA] Sesja N — opis`

---

## [2026-05-17] Sesja 1 — Rdzeń i architektura

### Dodano
- `index.html` — shell aplikacji: header, zakładki (Sprzedaż, Kupno, Najem, Ankieta, Aneksy, Inne), placeholdery dla CRM Esti i Autenti, spinner, toast, kolejność ładowania skryptów
- `css/core.css` — kompletny design system: zmienne CSS, header, zakładki, karty, formularze, przyciski, podpisy, spinner, toast, ankieta, responsive
- `js/core.js` — rdzeń aplikacji:
  - `HEX.registerModule(id, { onActivate })` — rejestracja modułów
  - `HEX.switchTab(id)` — router zakładek
  - `HEX.loadFirmaData()` / `HEX.saveFirmaData()` — dane biura z localStorage
  - `HEX.buildFirmaPochodne(F)` — pomocnicze pola firmy
  - `HEX.showSpinner()` / `HEX.hideSpinner()` — spinner PDF
  - `HEX.toast(msg)` — powiadomienia
  - `HEX.getText(key, data, lang)` — delegat do texts.js
  - `HEX.initSig(id)` / `HEX.clearSig(id)` / `HEX.getSig(id)` — podpisy canvas
  - `HEX.fmtDate(iso)` / `HEX.fmtDateL(iso)` — formatowanie dat
  - Globalne aliasy dla kompatybilności: `loadFirmaData`, `buildFirmaPochodne`, `getText`, `FIRMA`
- `js/logo.js` — placeholder na `LOGO_PDF_B64` (do uzupełnienia)
- `README.md` — opis projektu, architektura, roadmap
- `.gitignore`
- `STAN.md` — aktualny stan projektu
- `CHANGELOG.md` — ten plik

### Decyzje architektoniczne
- Języki: tylko `pl` i `en` — usunięto `ua` i `by`
- Moduły izolowane — komunikacja tylko przez `HEX.*`
- `LOGO_PDF_B64` przeniesiony do `logo.js` (przy refaktorze sprzedaz.js)
- `slownie()` zostanie przeniesiona do `core.js` jako `HEX.slownie()` (przy refaktorze rez.js)

### Repo
- Nowe repo: https://github.com/coldmayster/Hex_panel
- Stare repo (backup): https://github.com/coldmayster/hex-dokumenty

---

## [NASTĘPNA SESJA] Sesja 2 — ax.js

### Do zrobienia
- Refaktor `ax.js` do nowej architektury
- Rejestracja: `HEX.registerModule('aneksy', { onActivate: axInit })`
- Zamiana globalnych `loadFirmaData()` → `HEX.loadFirmaData()`
- Zamiana globalnych `getText()` → `HEX.getText()`
- Usunięcie kluczy `ua`/`by` z `texts.js` dla sekcji `ax.*` i `pr.*`
- Test lokalny w przeglądarce

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
