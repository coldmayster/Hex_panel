# HEX Dokumenty v4.0

Generator dokumentów dla agentów nieruchomości — Home Experts.

## Stack

- Vanilla JS (bez frameworków)
- pdfMake — generowanie PDF
- Design system: navy `#1a2b5e` · gold `#b8922a` · cream `#f8f6f1`
- Fonty: Playfair Display · DM Sans

## Architektura

```
Hex_panel/
├── index.html          ← shell: header, zakładki, spinner, toast
├── css/
│   └── core.css        ← design system, wszystkie zmienne i komponenty
├── js/
│   ├── core.js         ← router HEX.*, firma, shared utils
│   ├── texts.js        ← centralne repozytorium tekstów prawnych (pl/en)
│   ├── logo.js         ← base64 logo (wspólne dla wszystkich PDF)
│   ├── sprzedaz.js     ← moduł: umowa pośrednictwa sprzedaży
│   ├── kupno.js        ← moduł: umowa pośrednictwa kupna
│   ├── najem.js        ← moduł: umowa pośrednictwa w najmie
│   ├── ankieta.js      ← moduł: ankieta klienta
│   ├── ax.js           ← moduł: aneksy + protokół prezentacji
│   ├── rez.js          ← moduł: umowa rezerwacyjna
│   └── inne.js         ← moduł: generator promptów AI i inne narzędzia
└── modules/            ← przyszłe moduły
    ├── auth/           ← konta użytkowników
    ├── crm-esti/       ← integracja CRM Esti
    ├── autenti/        ← e-podpis Autenti
    └── mailer/         ← wysyłka email
```

## Zasady architektury

- Każdy moduł jest izolowany — nie zna innych modułów
- `core.js` jest jedynym miejscem gdzie żyje router i dane firmy
- Nowy moduł = nowy plik w `js/` + nowa zakładka w `index.html`
- `texts.js` — tylko `pl` i `en` (bez `ua` i `by`)
- Rejestracja modułu: `HEX.registerModule('id', { onActivate })`

## Kolejność ładowania skryptów

```html
<script src="js/texts.js"></script>   <!-- 1. dane -->
<script src="js/logo.js"></script>    <!-- 2. logo base64 -->
<script src="js/core.js"></script>    <!-- 3. rdzeń -->
<script src="js/sprzedaz.js"></script><!-- 4. moduły -->
<!-- ... -->
```

## Roadmap

- [x] Rdzeń + router
- [x] Design system (core.css)
- [ ] Moduł sprzedaży
- [ ] Moduł kupna
- [ ] Moduł najmu
- [ ] Ankieta klienta
- [ ] Aneksy + protokół
- [ ] Umowa rezerwacyjna
- [ ] Inne (generator promptów AI)
- [ ] Auth — konta użytkowników
- [ ] Integracja CRM Esti
- [ ] E-podpis Autenti
- [ ] Wysyłka email (mailto)

## Licencja

Projekt prywatny — Home Experts / Zimnowodzki Nieruchomości
