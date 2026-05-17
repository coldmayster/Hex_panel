# STAN PROJEKTU — HEX Dokumenty v4.0
> Aktualizuj ten plik na początku i końcu każdej sesji roboczej.

## 📍 Aktualna sesja
- **Data:** 2026-05-17
- **Etap:** Sesja 1 — rdzeń i architektura ✅ ZAKOŃCZONA
- **Następny krok:** Sesja 2 — refaktor `ax.js` do nowej architektury

---

## ✅ Co zostało zrobione (v4.0)

### Sesja 1 — Rdzeń i architektura
- [x] Zaprojektowana nowa architektura modułowa
- [x] `index.html` — czysty shell z zakładkami, spinner, toast, kolejność skryptów
- [x] `css/core.css` — pełny design system wyciągnięty z index.html (~400 linii)
- [x] `js/core.js` — router (`HEX.switchTab`), firma, spinner, toast, getText, podpisy, daty
- [x] `js/logo.js` — placeholder na base64 logo (do uzupełnienia z sprzedaz.js)
- [x] `README.md` — opis architektury i roadmap
- [x] `.gitignore`

---

## 🔄 Do zrobienia (kolejne sesje)

### Sesja 2 — ax.js
- [ ] Refaktor `ax.js` do nowej architektury (`HEX.*`, rejestracja modułu)
- [ ] Usunięcie `ua` i `by` z kluczy w `ax.*` w `texts.js`
- [ ] Test lokalny

### Sesja 3 — rez.js
- [ ] Refaktor `rez.js` (umowa rezerwacyjna)
- [ ] Przeniesienie `slownie()` do `core.js` jako `HEX.slownie()`

### Sesja 4 — najem.js
- [ ] Refaktor modułu najmu (wynajmujący + najemca)

### Sesja 5 — sprzedaz.js
- [ ] Refaktor największego modułu
- [ ] Przeniesienie `LOGO_PDF_B64` do `logo.js`

### Sesja 6 — kupno.js + ankieta.js
- [ ] Refaktor kupno i ankieta

### Sesja 7 — inne.js
- [ ] Refaktor generatora promptów AI

### Przyszłe moduły
- [ ] `modules/auth/` — konta użytkowników
- [ ] `modules/crm-esti/` — integracja CRM Esti
- [ ] `modules/autenti/` — e-podpis Autenti
- [ ] `modules/mailer/` — wysyłka email (mailto + załącznik PDF)

---

## 🏗 Architektura

```
Hex_panel/
├── index.html          ← shell
├── css/
│   └── core.css        ← design system
├── js/
│   ├── core.js         ← router HEX.*, firma, utils
│   ├── texts.js        ← teksty prawne pl/en (kopiowany bez zmian)
│   ├── logo.js         ← base64 logo
│   ├── sprzedaz.js     ← moduł sprzedaży
│   ├── kupno.js        ← moduł kupna
│   ├── najem.js        ← moduł najmu
│   ├── ankieta.js      ← ankieta klienta
│   ├── ax.js           ← aneksy + protokół
│   ├── rez.js          ← umowa rezerwacyjna
│   └── inne.js         ← generator promptów AI
└── modules/            ← przyszłe moduły
    ├── auth/
    ├── crm-esti/
    ├── autenti/
    └── mailer/
```

## 🎨 Design system
- Navy: `#1a2b5e`
- Gold: `#b8922a`
- Cream: `#f8f6f1`
- Fonty: Playfair Display (nagłówki), DM Sans (treść)

## 🌐 Języki
- Polski (`pl`) ✅
- Angielski (`en`) ✅
- Ukraiński (`ua`) ❌ usunięty
- Białoruski (`by`) ❌ usunięty

## 🔧 Zasady architektury
- Każdy moduł izolowany — nie zna innych modułów
- `core.js` — jedyne miejsce routera i danych firmy
- Rejestracja modułu: `HEX.registerModule('id', { onActivate })`
- Globalne aliasy zachowane dla kompatybilności: `loadFirmaData`, `buildFirmaPochodne`, `getText`, `FIRMA`
- Kolejność skryptów: `texts.js` → `logo.js` → `core.js` → moduły

## 📦 Repo
- **Nowe repo (v4):** https://github.com/coldmayster/Hex_panel
- **Stare repo (v3, backup):** https://github.com/coldmayster/hex-dokumenty
- **Live (stara wersja):** https://hexdokumenty.netlify.app

---

## ⚠️ Ważne uwagi
- `LOGO_PDF_B64` — przenieść ze `sprzedaz.js` do `logo.js` przy refaktorze sprzedaz.js
- `slownie()` — przenieść do `core.js` jako `HEX.slownie()` przy refaktorze rez.js
- `texts.js` — kopiować bez zmian z hex-dokumenty, usuwać tylko klucze `ua`/`by`
- Przy każdej sesji: wgraj `STAN.md` + `CHANGELOG.md` na start żeby Claude miał kontekst
