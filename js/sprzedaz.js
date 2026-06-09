// ═══════════════════════════════════════════════════════════════════
// sprzedaz.js — HEX Dokumenty v4.0
// Generator umów pośrednictwa: Sprzedaż (ekskluzywna/otwarta) + Kupno
// Architektura: namespace SPRZEDAZ, rejestracja HEX.registerModule
// Zasoby PDF (LOGO_PDF_B64, DEFAULT_POLISA_B64) globalnie z logo.js
// ═══════════════════════════════════════════════════════════════════

const SPRZEDAZ = (() => {

  // ── Stan modułu (uzupełnienie; reszta deklarowana w ciele) ──
  let selectedContractLang = 'pl';   // 'pl' | 'en'

  // ── Render HTML do #sprzedaz-root ──
  function render() {
    const root = document.getElementById('sprzedaz-root');
    if (!root) return;
    root.innerHTML = `
<div class="container">

  <!-- PANEL USTAWIEŃ FIRMY -->
  <div style="margin-bottom:12px; text-align:right;">
    <button id="firma-panel-toggle-btn" onclick="SPRZEDAZ.toggleFirmaPanel()"
      style="background:transparent; border:1.5px solid var(--border); border-radius:8px; padding:8px 16px; font-size:12px; font-weight:600; color:var(--gray); cursor:pointer; transition:all 0.2s;"
      onmouseover="this.style.borderColor='var(--gold)';this.style.color='var(--navy)'"
      onmouseout="this.style.borderColor='var(--border)';this.style.color='var(--gray)'">
      ⚙️ Ustawienia firmy
    </button>
  </div>

  <div id="firma-settings-panel" style="display:none; margin-bottom:20px;">
    <div class="card" style="border:2px solid var(--gold);">
      <div class="card-title" style="display:flex; align-items:center; gap:10px;">
        <span>⚙️ Dane Pośrednika (Twojej firmy)</span>
        <span style="font-size:11px; font-weight:400; color:var(--gray); margin-left:auto;">Dane zapisywane lokalnie w przeglądarce</span>
      </div>
      <div class="card-sub" style="margin-bottom:16px;">Wypełnij i zapisz dane swojej firmy — będą automatycznie wstawiane do każdej umowy. Możesz przechowywać wiele profili.</div>

      <!-- Wybór zapisanego profilu -->
      <div class="field span2" style="margin-bottom:16px;">
        <label class="field-label">Wczytaj zapisany profil</label>
        <div style="display:flex; gap:8px; align-items:center;">
          <select id="fp_profile_select" class="field-input" style="flex:1;" onchange="SPRZEDAZ.loadSelectedProfile()">
            <option value="">— wybierz zapisany profil —</option>
          </select>
        </div>
      </div>

      <div class="form-grid two" style="grid-template-columns:1fr 1fr; gap:14px;">
        <div class="field span2">
          <label class="field-label">Nazwa firmy *</label>
          <input type="text" id="fp_nazwa" class="field-input" placeholder="np. Home Experts sp. z o.o.">
        </div>
        <div class="field">
          <label class="field-label">Imię i nazwisko agenta *</label>
          <input type="text" id="fp_wlasciciel" class="field-input" placeholder="np. Jan Kowalski">
        </div>
        <div class="field">
          <label class="field-label">Stanowisko reprezentanta *</label>
          <select id="fp_stanowisko" class="field-input">
            <option value="pełnomocnik zarządu" selected>pełnomocnik zarządu</option>
            <option value="właściciel firmy">właściciel firmy</option>
            <option value="członek zarządu">członek zarządu</option>
          </select>
        </div>

        <div class="field">
          <label class="field-label">NIP</label>
          <input type="text" id="fp_nip" class="field-input" placeholder="np. 1234567890">
        </div>
        <div class="field">
          <label class="field-label">REGON / KRS</label>
          <input type="text" id="fp_regon" class="field-input" placeholder="np. KRS 0001021278 / REGON 524568930">
        </div>
        <div class="field span2">
          <label class="field-label">Ulica i numer lokalu *</label>
          <input type="text" id="fp_ulica" class="field-input" placeholder="np. Romana Dmowskiego 12 lokal 201">
        </div>
        <div class="field">
          <label class="field-label">Kod pocztowy *</label>
          <input type="text" id="fp_kod" class="field-input" placeholder="np. 80-264">
        </div>
        <div class="field">
          <label class="field-label">Miasto *</label>
          <input type="text" id="fp_miasto" class="field-input" placeholder="np. Gdańsk">
        </div>
        <div class="field">
          <label class="field-label">E-mail biura</label>
          <input type="email" id="fp_email" class="field-input" placeholder="np. biuro@firma.pl">
        </div>
        <div class="field">
          <label class="field-label">Telefon biura</label>
          <input type="text" id="fp_tel" class="field-input" placeholder="np. 500 600 700">
        </div>
        <div class="field">
          <label class="field-label">E-mail agenta / pośrednika</label>
          <input type="email" id="fp_agent_email" class="field-input" placeholder="np. agent@homeexperts.pl">
        </div>
        <div class="field">
          <label class="field-label">Telefon agenta / pośrednika</label>
          <input type="text" id="fp_agent_tel" class="field-input" placeholder="np. 600 700 800">
        </div>
        <div class="field">
          <label class="field-label">Skrót firmy (np. HEX)</label>
          <input type="text" id="fp_skrot" class="field-input" placeholder="np. HEX" maxlength="8">
        </div>
        <div class="field">
          <label class="field-label">Kod agenta</label>
          <input type="text" id="fp_agent" class="field-input" placeholder="np. MAZI" maxlength="10">
        </div>
        <div class="field">
          <label class="field-label">Rok (do numeracji)</label>
          <input type="text" id="fp_rok" class="field-input" placeholder="np. 2026" maxlength="4">
        </div>
      </div>

      <div style="border-top:1px solid var(--border); margin-top:20px; padding-top:18px;">
        <div class="section-label" style="margin-bottom:10px;">Obsługa klientów zagranicznych</div>
        <label style="display:flex; align-items:flex-start; gap:12px; cursor:pointer; padding:12px 14px; border:1.5px solid var(--border); border-radius:8px; background:var(--cream);">
          <input type="checkbox" id="fp_lang_enabled" onchange="SPRZEDAZ.toggleLangFeature(this.checked)"
            style="width:18px; height:18px; margin-top:2px; accent-color:var(--gold); cursor:pointer; flex-shrink:0;">
          <div>
            <div style="font-size:13px; font-weight:700; color:var(--navy); margin-bottom:3px;">Włącz opcję tłumaczenia umowy</div>
            <div style="font-size:11px; color:var(--gray); line-height:1.5;">Gdy włączone — w sekcji „Dane klienta" pojawi się selektor języka umowy (EN / UA / BY). Umowa zostanie wygenerowana w układzie dwukolumnowym: <strong>PL po lewej, tłumaczenie po prawej</strong>. Domyślnie wyłączone.</div>
          </div>
        </label>
      </div>

      <div style="display:flex; gap:10px; flex-wrap:wrap;">
        <button class="btn btn-primary" onclick="SPRZEDAZ.applyFirmaSettings()">💾 Zapisz i zastosuj</button>
        <button class="btn" onclick="SPRZEDAZ.resetFirmaToDefault()" style="background:var(--cream); color:var(--gray); border:1.5px solid var(--border);">↺ Przywróć domyślne</button>
        <button class="btn" onclick="SPRZEDAZ.toggleFirmaPanel()" style="background:var(--cream); color:var(--gray); border:1.5px solid var(--border);">Anuluj</button>
      </div>
    </div>
  </div>

  <!-- Step indicator -->
  <div class="steps">
    <div class="step active" id="step1-ind"><div class="step-num">1</div><div class="step-label">Rodzaj umowy</div></div>
    <div class="step" id="step2-ind"><div class="step-num">2</div><div class="step-label">Dane klienta</div></div>
    <div class="step" id="step3-ind"><div class="step-num">3</div><div class="step-label">Nieruchomość</div></div>
    <div class="step" id="step4-ind"><div class="step-num">4</div><div class="step-label">PEP i RODO</div></div>
    <div class="step" id="step5-ind"><div class="step-num">5</div><div class="step-label">Podpisy i OC</div></div>
    <div class="step" id="step6-ind"><div class="step-num">6</div><div class="step-label">Podgląd i PDF</div></div>
  </div>

  <!-- PAGE 1: Wybór umowy -->
  <div class="page active" id="page1">
    <div class="card">
      <div class="card-title">Wybierz rodzaj umowy pośrednictwa</div>
      <div class="card-sub">Każdy rodzaj umowy generuje odpowiedni dokument z właściwymi klauzulami prawnymi.</div>
      <div class="contract-options">
        <div class="contract-option" id="opt-excl" onclick="SPRZEDAZ.selectContract('excl')">
          <div class="contract-icon">🔒</div>
          <div class="contract-name">Sprzedaż Ekskluzywna</div>
          <div class="contract-desc">Umowa na wyłączność – klient powierza sprzedaż tylko Tobie</div>
          <div class="contract-badge">3,57% brutto</div>
        </div>
        <div class="contract-option" id="opt-open" onclick="SPRZEDAZ.selectContract('open')">
          <div class="contract-icon">🔓</div>
          <div class="contract-name">Sprzedaż Otwarta</div>
          <div class="contract-desc">Umowa bez wyłączności – klient może korzystać z wielu biur</div>
          <div class="contract-badge">3,57% brutto</div>
        </div>
        <div class="contract-option" id="opt-kupno" onclick="SPRZEDAZ.selectContract('kupno')">
          <div class="contract-icon">🏠</div>
          <div class="contract-name">Pośrednictwo Kupna</div>
          <div class="contract-desc">Umowa na nabycie nieruchomości – klient szuka kupna</div>
          <div class="contract-badge">1,23% brutto</div>
        </div>
      </div>

      <div class="section-label" style="margin-top:28px">Warunki finansowe i czas trwania</div>
      <div class="form-grid three">
        <div class="field span2">
          <label>Wysokość prowizji <span class="req">*</span></label>
          <div style="display:flex; gap:0; border:1.5px solid var(--border); border-radius:8px; overflow:hidden; background:var(--cream);">
            <input type="text" id="prowizja" placeholder="np. 3,57 lub 5000" oninput="SPRZEDAZ.updateBadge()"
              style="border:none; border-radius:0; flex:1; background:transparent; padding:11px 14px;">
            <div style="display:flex; border-left:1.5px solid var(--border);">
              <button type="button" id="btn-pct" onclick="SPRZEDAZ.setProwizjaTyp('pct')"
                style="padding:0 14px; font-size:13px; font-weight:700; border:none; cursor:pointer; background:var(--navy); color:#fff; transition:all 0.15s;">%</button>
              <button type="button" id="btn-zl" onclick="SPRZEDAZ.setProwizjaTyp('zl')"
                style="padding:0 14px; font-size:13px; font-weight:700; border:none; border-left:1.5px solid var(--border); cursor:pointer; background:var(--cream); color:var(--gray); transition:all 0.15s;">zł</button>
            </div>
          </div>
          <span id="prowizja-hint" style="font-size:11px;color:var(--gray);margin-top:3px;">Wpisz wartość procentową, np. 3,57</span>
        </div>
        <div class="field" id="field-czas-trwania">
          <label>Czas trwania (miesiące)</label>
          <input type="number" id="czas_trwania" min="1" max="36" placeholder="np. 6" value="">
        </div>
        <div class="field" id="field-czas-info" style="display:none">
          <label>Czas trwania</label>
          <input type="text" value="Czas nieokreślony" disabled style="background:#f0ede8;color:var(--gray)">
        </div>
      </div>

      <div class="section-label" style="margin-top:20px" id="sec5-label">Wariant płatności wynagrodzenia (§5)</div>
      <div id="sec5-options" style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
        <div class="contract-option selected" id="opt-s5-dwie" onclick="SPRZEDAZ.selectS5('dwie')" style="padding:14px 16px; cursor:pointer;">
          <div style="font-size:12px; font-weight:700; color:var(--navy); margin-bottom:4px;">Dwie raty</div>
          <div style="font-size:11px; color:var(--gray); line-height:1.4;">50% po umowie przedwstępnej + 50% po przeniesieniu własności</div>
        </div>
        <div class="contract-option" id="opt-s5-jedna" onclick="SPRZEDAZ.selectS5('jedna')" style="padding:14px 16px; cursor:pointer;">
          <div style="font-size:12px; font-weight:700; color:var(--navy); margin-bottom:4px;">100% po umowie końcowej</div>
          <div style="font-size:11px; color:var(--gray); line-height:1.4;">Całość płatna wyłącznie po zawarciu umowy przenoszącej własność</div>
        </div>
      </div>
    </div>
    <div class="nav-row">
      <span></span>
      <button class="btn btn-primary" onclick="SPRZEDAZ.goNext(1)" id="next1" disabled><span>Dalej →</span></button>
    </div>
  </div>

  <!-- PAGE 2: Dane klienta -->
  <div class="page" id="page2">
    <div class="card">
      <div class="card-title">Dane klienta</div>
      <div class="card-sub">Uzupełnij dane osoby/podmiotu zawierającego umowę.</div>

      <div class="section-label">Typ klienta</div>
      <div style="display:flex; gap:0; border:1.5px solid var(--border); border-radius:8px; overflow:hidden; background:var(--cream); margin-bottom:20px; width:fit-content;">
        <button type="button" id="btn-klient-pryw" onclick="SPRZEDAZ.setKlientTyp('pryw')"
          style="padding:10px 24px; font-size:13px; font-weight:600; border:none; cursor:pointer; background:var(--navy); color:#fff; transition:all 0.15s;">
          👤 Klient prywatny
        </button>
        <button type="button" id="btn-klient-firma" onclick="SPRZEDAZ.setKlientTyp('firma')"
          style="padding:10px 24px; font-size:13px; font-weight:600; border:none; border-left:1.5px solid var(--border); cursor:pointer; background:var(--cream); color:var(--gray); transition:all 0.15s;">
          🏢 Firma
        </button>
      </div>

      <div class="section-label">Strona umowy</div>
      <div class="form-grid">
        <div class="field span2">
          <label id="lbl-imie">Imię i nazwisko <span class="req">*</span></label>
          <input type="text" id="klient_imie" placeholder="np. Jan Kowalski">
        </div>
        <div class="field span2">
          <label id="lbl-adres">Adres zamieszkania <span class="req">*</span></label>
          <input type="text" id="klient_adres" placeholder="np. ul. Główna 10, 80-001 Gdańsk">
        </div>
        <div class="field span2">
          <label>Adres do korespondencji <span style="font-weight:400;color:var(--gray)">(jeśli inny)</span></label>
          <input type="text" id="klient_korespondencja" placeholder="Pozostaw puste jeśli taki sam jak powyżej">
        </div>
        <div class="field">
          <label id="lbl-pesel">PESEL <span class="req">*</span></label>
          <input type="text" id="klient_pesel" placeholder="np. 80010112345">
        </div>
        <div class="field">
          <label id="lbl-dowod">Nr dokumentu tożsamości <span class="req">*</span></label>
          <input type="text" id="klient_dowod" placeholder="np. ABC 123456">
        </div>
        <div class="field">
          <label>E-mail <span class="req">*</span></label>
          <input type="email" id="klient_email" placeholder="jan.kowalski@email.pl" oninput="const f=document.getElementById('nieruch_faktura_email');if(f&&!f._touched)f.value=this.value;" onchange="const f=document.getElementById('nieruch_faktura_email');if(f&&!f._touched)f.value=this.value;">
        </div>
        <div class="field">
          <label>Numer telefonu <span class="req">*</span></label>
          <input type="text" id="klient_telefon" placeholder="np. 500 100 200">
        </div>
      </div>

      <div style="margin-top:24px; margin-bottom:16px;">
        <label class="check-opt" style="display:inline-flex; align-items:center; gap:10px; font-size:14px; font-weight:600; color:var(--navy); cursor:pointer; padding:12px 16px; border:1.5px solid var(--border); border-radius:8px; background:var(--cream); user-select:none;">
          <input type="checkbox" id="chk-pelnom" onchange="SPRZEDAZ.togglePelnom(this.checked)" style="width:16px;height:16px;accent-color:var(--gold);cursor:pointer;">
          Klient działa przez pełnomocnika
        </label>
      </div>

      <div id="pelnom-section" style="display:none;">
        <div class="section-label">Dane pełnomocnika</div>
        <div class="form-grid">
          <div class="field span2">
            <label>Imię i nazwisko pełnomocnika <span class="req">*</span></label>
            <input type="text" id="pelnom_imie" placeholder="np. Anna Kowalska">
          </div>
          <div class="field span2">
            <label>Adres zamieszkania pełnomocnika <span class="req">*</span></label>
            <input type="text" id="pelnom_adres" placeholder="np. ul. Kwiatowa 5, 80-200 Gdańsk">
          </div>
          <div class="field">
            <label>PESEL pełnomocnika</label>
            <input type="text" id="pelnom_pesel" placeholder="">
          </div>
          <div class="field">
            <label>Nr dokumentu tożsamości</label>
            <input type="text" id="pelnom_dowod" placeholder="">
          </div>
          <div class="field">
            <label>E-mail pełnomocnika</label>
            <input type="email" id="pelnom_email" placeholder="">
          </div>
          <div class="field">
            <label>Telefon pełnomocnika</label>
            <input type="text" id="pelnom_telefon" placeholder="">
          </div>
        </div>
      </div>

      <!-- LANG BLOCK: widoczny tylko gdy włączone w ustawieniach firmy -->
      <div id="lang-umowy-block" style="display:none; margin-top:24px;">
        <div class="section-label">Język umowy</div>
        <div style="display:grid; grid-template-columns:repeat(2,1fr); gap:8px; margin-bottom:10px;">
          <div class="contract-option selected" id="clang-pl" onclick="SPRZEDAZ.selectContractLang('pl')" style="padding:12px 8px; cursor:pointer; text-align:center;">
            <div style="font-size:20px; margin-bottom:3px;">🇵🇱</div>
            <div style="font-size:11px; font-weight:700;">Polski</div>
            <div style="font-size:10px; color:var(--gray);">tylko PL</div>
          </div>
          <div class="contract-option" id="clang-en" onclick="SPRZEDAZ.selectContractLang('en')" style="padding:12px 8px; cursor:pointer; text-align:center;">
            <div style="font-size:20px; margin-bottom:3px;">🇬🇧</div>
            <div style="font-size:11px; font-weight:700;">English</div>
            <div style="font-size:10px; color:var(--gray);">PL + EN</div>
          </div>
          </div>
        </div>
        <div class="info-note" id="lang-info-note" style="display:none; margin-bottom:0;">
          <span class="info-icon">🌐</span>
          <span>Umowa zostanie wydrukowana w układzie dwukolumnowym: <strong>PL po lewej</strong>, tłumaczenie po prawej.</span>
        </div>
      </div>

      <div class="section-label" style="margin-top:24px">Data i miejsce zawarcia umowy</div>
      <div class="form-grid">
        <div class="field">
          <label>Data zawarcia <span class="req">*</span></label>
          <input type="date" id="data_umowy">
        </div>
        <div class="field">
          <label>Miejscowość <span class="req">*</span></label>
          <input type="text" id="miejsce_umowy" placeholder="np. Gdańsk">
        </div>
        <div class="field">
          <label>Numer umowy <span class="req">*</span></label>
          <input type="text" id="nr_umowy" placeholder="np. 001">
        </div>
      </div>
    </div>
    <div class="nav-row">
      <button class="btn btn-ghost" onclick="SPRZEDAZ.goBack(2)"><span>← Wstecz</span></button>
      <button class="btn btn-primary" onclick="SPRZEDAZ.goNext(2)"><span>Dalej →</span></button>
    </div>
  </div>

  <!-- PAGE 3: Nieruchomość -->
  <div class="page" id="page3">
    <div class="card">
      <div class="card-title" id="nieruch-title">Dane nieruchomości</div>
      <div class="card-sub" id="nieruch-sub">Opisz nieruchomość będącą przedmiotem umowy.</div>

      <div id="sell-fields">
        <div class="section-label">Opis nieruchomości (sprzedaż)</div>
        <div class="form-grid">
          <div class="field span2">
            <label>Rodzaj nieruchomości <span class="req">*</span></label>
            <select id="nieruch_rodzaj">
              <option value="">— wybierz —</option>
              <option>prawo odrębnej własności lokalu</option>
              <option>spółdzielcze własnościowe prawo do lokalu mieszkalnego</option>
              <option>spółdzielcze własnościowe prawo do lokalu użytkowego</option>
              <option>prawo do domu jednorodzinnego w spółdzielni mieszkaniowej</option>
              <option>nieruchomość gruntowa</option>
              <option>prawo użytkowania wieczystego</option>
            </select>
          </div>
          <div class="field">
            <label>Nr Księgi Wieczystej</label>
            <input type="text" id="nieruch_kw" placeholder="np. GD1G/00123456/7">
          </div>
          <div class="field">
            <label>Powierzchnia <span class="req">*</span></label>
            <input type="text" id="nieruch_pow" placeholder="np. 62,5 m²">
          </div>
          <div class="field span2">
            <label>Położenie (adres) <span class="req">*</span></label>
            <input type="text" id="nieruch_polozenie" placeholder="np. ul. Morska 15/3, 80-500 Gdańsk">
          </div>
          <div class="field">
            <label>Proponowana cena nieruchomości <span class="req">*</span></label>
            <input type="text" id="nieruch_cena" placeholder="np. 450 000 zł">
          </div>
          <div class="field">
            <label>Adres e-mail do faktury VAT</label>
            <input type="email" id="nieruch_faktura_email" placeholder="np. jan@email.pl" oninput="this._touched=true;" oninput="" onfocus="if(!this.value)this.value=document.getElementById('klient_email')?.value||'';">
          </div>
        </div>
      </div>

      <div id="buy-fields" style="display:none">
        <div class="section-label">Dane dotyczące kupna</div>
        <div class="info-note">
          <span class="info-icon">ℹ️</span>
          <span>W umowie kupna nie opisujesz konkretnej nieruchomości – klient szuka dopiero odpowiedniej. Poniżej wpisz preferencje jeśli chcesz je zawrzeć w umowie.</span>
        </div>
        <div class="form-grid">
          <div class="field span2">
            <label>Preferowana lokalizacja / opis poszukiwanej nieruchomości</label>
            <textarea id="buy_opis" placeholder="np. mieszkanie 3-pokojowe, Gdańsk Wrzeszcz, do 500 000 zł"></textarea>
          </div>
          <div class="field">
            <label>Adres e-mail do faktury VAT</label>
            <input type="email" id="buy_faktura_email" placeholder="np. jan@email.pl">
          </div>
        </div>

        <div class="section-label" style="margin-top:24px">Karta prezentacji nieruchomości <span style="font-weight:400;color:var(--gray);font-size:11px;letter-spacing:0">(opcjonalnie – jeśli klient oglądał już konkretną nieruchomość)</span></div>
        <div class="info-note">
          <span class="info-icon">🏠</span>
          <span>Karta prezentacji zostanie dodana jako osobny załącznik do PDF. Możesz dodać wiele prezentacji klikając „+ Dodaj prezentację".</span>
        </div>
        <div id="prezentacje-list"></div>
        <button class="btn btn-ghost" onclick="SPRZEDAZ.addPrezentacja()" style="margin-top:8px; font-size:13px; padding:9px 18px;">+ Dodaj prezentację</button>
      </div>
    </div>
    <div class="nav-row">
      <button class="btn btn-ghost" onclick="SPRZEDAZ.goBack(3)"><span>← Wstecz</span></button>
      <button class="btn btn-primary" onclick="SPRZEDAZ.goNext(3)"><span>Dalej →</span></button>
    </div>
  </div>

  <!-- PAGE 4: PEP i RODO -->
  <div class="page" id="page4">
    <div class="card">
      <div class="card-title">Oświadczenie PEP</div>
      <div class="card-sub">Wypełnij razem z klientem – odpowiedzi trafią bezpośrednio do załącznika nr 6.</div>

      <div class="section-label">Dane klienta</div>
      <div class="form-grid">
        <div class="field span2">
          <label>Imię i nazwisko (wypełniane automatycznie)</label>
          <input type="text" id="pep_imie" readonly style="background:#f0ede8;color:var(--gray);">
        </div>
      </div>

      <div class="section-label" style="margin-top:20px">Pytania PEP <span style="font-weight:400;font-size:11px;letter-spacing:0;color:var(--gray)">* dotyczy ostatnich 12 miesięcy</span></div>

      <div class="pep-question">
        <div class="pep-q-text">Czy jest Pani/Pan osobą zajmującą eksponowane stanowiska polityczne? *</div>
        <div class="pep-q-options">
          <label class="radio-opt"><input type="radio" name="pep1" value="TAK" id="pep1_tak"> TAK</label>
          <label class="radio-opt"><input type="radio" name="pep1" value="NIE" id="pep1_nie" checked> NIE</label>
        </div>
      </div>
      <div class="pep-question">
        <div class="pep-q-text">Czy jest Pani/Pan członkiem rodziny osoby zajmującej eksponowane stanowiska polityczne? *</div>
        <div class="pep-q-options">
          <label class="radio-opt"><input type="radio" name="pep2" value="TAK" id="pep2_tak"> TAK</label>
          <label class="radio-opt"><input type="radio" name="pep2" value="NIE" id="pep2_nie" checked> NIE</label>
        </div>
      </div>
      <div class="pep-question">
        <div class="pep-q-text">Czy jest Pani/Pan osobą znaną jako bliski współpracownik osoby zajmującej eksponowane stanowiska polityczne? *</div>
        <div class="pep-q-options">
          <label class="radio-opt"><input type="radio" name="pep3" value="TAK" id="pep3_tak"> TAK</label>
          <label class="radio-opt"><input type="radio" name="pep3" value="NIE" id="pep3_nie" checked> NIE</label>
        </div>
      </div>

      <div id="pep-zrodlo-section" style="display:none">
        <div class="section-label" style="margin-top:20px">Źródło pochodzenia wartości majątkowych</div>
        <div class="info-note"><span class="info-icon">ℹ️</span><span>Odpowiedź twierdzącą udzielono na co najmniej jedno pytanie – proszę zaznaczyć źródło.</span></div>
        <div class="pep-sources">
          <label class="check-opt"><input type="checkbox" id="src_wynagrodzenie"> wynagrodzenie</label>
          <label class="check-opt"><input type="checkbox" id="src_dzialalnosc"> działalność gospodarcza</label>
          <label class="check-opt"><input type="checkbox" id="src_oszczednosci"> oszczędności</label>
          <label class="check-opt"><input type="checkbox" id="src_spadek"> spadek</label>
          <label class="check-opt"><input type="checkbox" id="src_inne"> inne</label>
          <label class="check-opt"><input type="checkbox" id="src_odmawiam"> odmawiam podania</label>
        </div>
      </div>
    </div>

    <div class="card" style="margin-top:0">
      <div class="card-title">Zgoda na przetwarzanie danych osobowych</div>
      <div class="card-sub">Załącznik nr 7 – wypełnij razem z klientem.</div>

      <div class="section-label">Zgoda ogólna</div>
      <div class="rodo-item">
        <div class="rodo-text">Wyrażam zgodę na przetwarzanie moich danych osobowych przez ${HEX.loadFirmaData().nazwa} w zakresie niezbędnym do oferowania produktów i usług w związku z wykonywanym pośrednictwem nieruchomościowym.</div>
        <div class="rodo-opts">
          <label class="radio-opt"><input type="radio" name="rodo0" value="TAK" id="rodo0_tak" checked> TAK</label>
          <label class="radio-opt"><input type="radio" name="rodo0" value="NIE" id="rodo0_nie"> NIE</label>
        </div>
      </div>

      <div class="section-label" style="margin-top:16px">Zgody szczegółowe</div>
      <div class="rodo-item">
        <div class="rodo-num">1.</div>
        <div class="rodo-text">W celu przesłania danych do wskazanej kancelarii notarialnej w celu przygotowania projektu aktu notarialnego (umowy przedwstępnej lub umowy sprzedaży).</div>
        <div class="rodo-opts">
          <label class="radio-opt"><input type="radio" name="rodo1" value="TAK" id="rodo1_tak" checked> TAK</label>
          <label class="radio-opt"><input type="radio" name="rodo1" value="NIE" id="rodo1_nie"> NIE</label>
        </div>
      </div>
      <div class="rodo-item">
        <div class="rodo-num">2.</div>
        <div class="rodo-text">W celu przekazania zainteresowanej stronie kupującej lub reprezentującemu ją pośrednikowi numeru księgi wieczystej nieruchomości będącej przedmiotem umowy.</div>
        <div class="rodo-opts">
          <label class="radio-opt"><input type="radio" name="rodo2" value="TAK" id="rodo2_tak" checked> TAK</label>
          <label class="radio-opt"><input type="radio" name="rodo2" value="NIE" id="rodo2_nie"> NIE</label>
        </div>
      </div>
      <div class="rodo-item">
        <div class="rodo-num">3.</div>
        <div class="rodo-text">W celu przesyłania informacji handlowych drogą elektroniczną (imię, nazwisko, telefon, e-mail).</div>
        <div class="rodo-opts">
          <label class="radio-opt"><input type="radio" name="rodo3" value="TAK" id="rodo3_tak"> TAK</label>
          <label class="radio-opt"><input type="radio" name="rodo3" value="NIE" id="rodo3_nie" checked> NIE</label>
        </div>
      </div>
      <div class="rodo-item">
        <div class="rodo-num">4.</div>
        <div class="rodo-text">W celach marketingowych (imię, nazwisko, telefon, e-mail).</div>
        <div class="rodo-opts">
          <label class="radio-opt"><input type="radio" name="rodo4" value="TAK" id="rodo4_tak"> TAK</label>
          <label class="radio-opt"><input type="radio" name="rodo4" value="NIE" id="rodo4_nie" checked> NIE</label>
        </div>
      </div>
    </div>

    <div class="card" style="margin-top:0; border:2px solid var(--gold);">
      <div class="card-title" style="font-size:16px;">Żądanie rozpoczęcia umowy</div>
      <div class="card-sub">Czy klient żąda rozpoczęcia świadczenia usługi przed upływem 14-dniowego terminu do odstąpienia od umowy?</div>
      <div style="display:flex; align-items:flex-start; gap:12px; padding:12px 0;">
        <label class="check-opt" style="font-size:14px; font-weight:600; display:flex; align-items:center; gap:8px; cursor:pointer;">
          <input type="checkbox" id="chk-zadanie-rozpoczecia" onchange="SPRZEDAZ.toggleZadanieRozpoczecia(this.checked)"
            style="width:20px; height:20px; accent-color:var(--gold); cursor:pointer;">
          <span>TAK – klient żąda natychmiastowego rozpoczęcia usługi</span>
        </label>
      </div>
      <div class="info-note" style="margin-top:0;">
        <span class="info-icon">⚠️</span>
        <span>Domyślnie: NIE. Zaznacz TAK tylko jeśli klient chce, abyśmy zaczęli działać przed upływem 14 dni i zrzeka się prawa do bezkosztowego odstąpienia w razie finalizacji transakcji. Załącznik Nr 3 zostanie wypełniony danymi klienta.</span>
      </div>
    </div>

    <div class="nav-row">
      <button class="btn btn-ghost" onclick="SPRZEDAZ.goBack(4)"><span>← Wstecz</span></button>
      <button class="btn btn-primary" onclick="SPRZEDAZ.goNext(4)"><span>Dalej →</span></button>
    </div>
  </div>

  <!-- PAGE 5: Podpisy i Polisa OC -->
  <div class="page" id="page5">

    <div class="card">
      <div class="card-title">Podpis klienta</div>
      <div class="card-sub">Klient składa podpis palcem lub rysikiem na ekranie.</div>
      <div class="sig-wrap">
        <canvas id="sig-klient" class="sig-canvas" width="700" height="200"></canvas>
        <div class="sig-actions">
          <button class="btn btn-ghost sig-clear-btn" onclick="SPRZEDAZ.clearSig('sig-klient')">✕ Wyczyść</button>
          <span class="sig-hint">← Podpisz tutaj</span>
        </div>
      </div>
    </div>

    <div class="card" style="margin-top:0">
      <div class="card-title">Podpis agenta / pośrednika</div>
      <div class="card-sub">Agent składa podpis palcem lub rysikiem na ekranie.</div>
      <div class="sig-wrap">
        <canvas id="sig-agent" class="sig-canvas" width="700" height="200"></canvas>
        <div class="sig-actions">
          <button class="btn btn-ghost sig-clear-btn" onclick="SPRZEDAZ.clearSig('sig-agent')">✕ Wyczyść</button>
          <span class="sig-hint">← Podpisz tutaj</span>
        </div>
      </div>
    </div>

    <div class="card" style="margin-top:0">
      <div class="card-title">Polisa OC – Załącznik Nr 5</div>
      <div class="card-sub">Domyślna polisa jest wczytana. Możesz ją usunąć i wgrać własną (PNG, JPG, JPEG).</div>

      <div id="oc-preview-wrap">
        <img id="oc-preview" src="" alt="Polisa OC" style="max-width:100%;border-radius:8px;border:1px solid var(--border);display:none;margin-bottom:12px;">
      </div>

      <button id="oc-delete-btn" type="button"
        onclick="SPRZEDAZ.ocDeletePolisa()"
        style="display:none;margin-bottom:14px;padding:8px 18px;background:transparent;border:1.5px solid #c0392b;color:#c0392b;border-radius:6px;cursor:pointer;font-size:13px;font-weight:500;">
        🗑 Usuń polisę OC
      </button>

      <div id="oc-upload-wrap" style="display:none;">
        <label style="display:block;margin-bottom:6px;font-size:13px;font-weight:500;color:var(--navy);">
          Wgraj nową polisę OC
          <span style="font-weight:400;color:var(--gray);font-size:11px">(PNG, JPG, JPEG)</span>
        </label>
        <input type="file" id="oc-file-input" accept="image/png,image/jpeg,.jpg,.jpeg"
          onchange="SPRZEDAZ.handleOCFile(this)"
          style="padding:8px;border:1.5px dashed var(--border);border-radius:8px;width:100%;cursor:pointer;">
      </div>
    </div>

    <div class="nav-row">
      <button class="btn btn-ghost" onclick="SPRZEDAZ.goBack(5)"><span>← Wstecz</span></button>
      <button class="btn btn-primary" onclick="SPRZEDAZ.goNext(5)"><span>Dalej →</span></button>
    </div>
  </div>

  <!-- PAGE 6: Podgląd i generowanie -->
  <div class="page" id="page6">
    <div class="card">
      <div class="card-title">Podsumowanie i generowanie dokumentu</div>
      <div class="card-sub">Sprawdź dane przed wygenerowaniem umowy.</div>

      <div class="summary-box" id="summary-box"></div>

      <div class="info-note">
        <span class="info-icon">📄</span>
        <span>Umowa zostanie wygenerowana jako plik PDF gotowy do wydruku i podpisania. Zawiera wszystkie wymagane paragrafy, podpisy, pouczenie o odstąpieniu, klauzule RODO i polisę OC.</span>
      </div>

      <div style="text-align:center; margin-top:24px">
        <button class="btn btn-gold" onclick="SPRZEDAZ.generatePDF()">
          <span class="icon">⬇</span> Pobierz umowę PDF
        </button>
      </div>
    </div>
    <div class="nav-row">
      <button class="btn btn-ghost" onclick="SPRZEDAZ.goBack(6)"><span>← Wstecz</span></button>
      <button class="btn btn-ghost" onclick="SPRZEDAZ.resetGenerator()"><span>🔄 Nowa umowa</span></button>
      <button class="btn-prefill-ankieta" onclick="SPRZEDAZ.prefillAnkietaFromGenerator()"><span>📋 Otwórz ankietę dla tej nieruchomości</span></button>
    </div>
  </div>

</div>`;
  }

  // ── Profile firmy (localStorage, lokalne dla modułu) ──
function saveFirmaProfil(data) {
  try {
    const key = 'hex_firma_profiles';
    let profiles = [];
    const saved = localStorage.getItem(key);
    if (saved) profiles = JSON.parse(saved);
    // Usuń duplikaty o tej samej nazwie
    profiles = profiles.filter(p => p.nazwa !== data.nazwa);
    profiles.unshift(data); // dodaj na początku
    if (profiles.length > 10) profiles = profiles.slice(0, 10);
    localStorage.setItem(key, JSON.stringify(profiles));
  } catch(e) {}
}

// Pobierz zapisane profile
function loadFirmaProfile() {
  try {
    const saved = localStorage.getItem('hex_firma_profiles');
    if (saved) return JSON.parse(saved);
  } catch(e) {}
  return [];
}

let selectedContract = null;
let prowizjaTyp = 'pct';   // 'pct' | 'zl'
let s5Wariant   = 'dwie';  // 'dwie' | 'jedna'
let klientTyp   = 'pryw';  // 'pryw' | 'firma'

function setKlientTyp(typ) {
  klientTyp = typ;
  // Toggle button styles
  const btnPryw  = document.getElementById('btn-klient-pryw');
  const btnFirma = document.getElementById('btn-klient-firma');
  btnPryw.style.background  = typ === 'pryw'  ? 'var(--navy)' : 'var(--cream)';
  btnPryw.style.color       = typ === 'pryw'  ? '#fff'        : 'var(--gray)';
  btnFirma.style.background = typ === 'firma' ? 'var(--navy)' : 'var(--cream)';
  btnFirma.style.color      = typ === 'firma' ? '#fff'        : 'var(--gray)';
  // Update field labels and placeholders
  if (typ === 'firma') {
    document.getElementById('lbl-imie').innerHTML  = 'Nazwa firmy <span class="req">*</span>';
    document.getElementById('lbl-adres').innerHTML = 'Adres zarejestrowania działalności <span class="req">*</span>';
    document.getElementById('lbl-pesel').innerHTML = 'NIP <span class="req">*</span>';
    document.getElementById('lbl-dowod').innerHTML = 'REGON / KRS <span class="req">*</span>';
    document.getElementById('klient_imie').placeholder  = 'np. ABC Sp. z o.o.';
    document.getElementById('klient_adres').placeholder = 'np. ul. Handlowa 1, 80-001 Gdańsk';
    document.getElementById('klient_pesel').placeholder = 'np. 1234567890';
    document.getElementById('klient_dowod').placeholder = 'np. 0000123456 / KRS 0000654321';
  } else {
    document.getElementById('lbl-imie').innerHTML  = 'Imię i nazwisko <span class="req">*</span>';
    document.getElementById('lbl-adres').innerHTML = 'Adres zamieszkania <span class="req">*</span>';
    document.getElementById('lbl-pesel').innerHTML = 'PESEL <span class="req">*</span>';
    document.getElementById('lbl-dowod').innerHTML = 'Nr dokumentu tożsamości <span class="req">*</span>';
    document.getElementById('klient_imie').placeholder  = 'np. Jan Kowalski';
    document.getElementById('klient_adres').placeholder = 'np. ul. Główna 10, 80-001 Gdańsk';
    document.getElementById('klient_pesel').placeholder = 'np. 80010112345';
    document.getElementById('klient_dowod').placeholder = 'np. ABC 123456';
  }
}

function togglePelnom(checked) {
  const sec = document.getElementById('pelnom-section');
  sec.style.display = checked ? 'block' : 'none';
  if (!checked) {
    // clear fields when hidden
    ['pelnom_imie','pelnom_adres','pelnom_pesel','pelnom_dowod','pelnom_email','pelnom_telefon']
      .forEach(id => { const el=document.getElementById(id); if(el) el.value=''; });
  }
}
let prezentacjeCount = 0;

function selectContract(type) {
  selectedContract = type;
  document.querySelectorAll('.contract-option').forEach(el => el.classList.remove('selected'));
  document.getElementById('opt-' + type).classList.add('selected');
  document.getElementById('next1').disabled = false;
  // set default prowizja
  const pEl = document.getElementById('prowizja');
  if (!pEl.value) pEl.value = type === 'kupno' ? '2,46' : '3,57';
  // update badge display
  updateBadge();
  // czas trwania: kupno = nieokreślony, sprzedaż = określony
  document.getElementById('field-czas-trwania').style.display = type === 'kupno' ? 'none' : 'block';
  document.getElementById('field-czas-info').style.display = type === 'kupno' ? 'block' : 'none';
  // §5 wariant — tylko dla sprzedaży
  const s5Block = document.getElementById('sec5-label');
  const s5Opts  = document.getElementById('sec5-options');
  if (s5Block) s5Block.style.display = 'block';
  if (s5Opts)  s5Opts.style.display  = 'grid';
  // show/hide fields on page 3
  if (type === 'kupno') {
    document.getElementById('sell-fields').style.display = 'none';
    document.getElementById('buy-fields').style.display = 'block';
    document.getElementById('nieruch-title').textContent = 'Preferencje kupna i prezentacje';
    document.getElementById('nieruch-sub').textContent = 'Opisz czego szuka klient. Możesz też dodać karty prezentacji oglądanych nieruchomości.';
  } else {
    document.getElementById('sell-fields').style.display = 'block';
    document.getElementById('buy-fields').style.display = 'none';
    document.getElementById('nieruch-title').textContent = 'Dane nieruchomości';
    document.getElementById('nieruch-sub').textContent = 'Opisz nieruchomość będącą przedmiotem umowy.';
  }
}

function setProwizjaTyp(typ) {
  prowizjaTyp = typ;
  document.getElementById('btn-pct').style.background = typ === 'pct' ? 'var(--navy)' : 'var(--cream)';
  document.getElementById('btn-pct').style.color      = typ === 'pct' ? '#fff' : 'var(--gray)';
  document.getElementById('btn-zl').style.background  = typ === 'zl'  ? 'var(--navy)' : 'var(--cream)';
  document.getElementById('btn-zl').style.color       = typ === 'zl'  ? '#fff' : 'var(--gray)';
  document.getElementById('prowizja-hint').textContent =
    typ === 'pct' ? 'Wpisz wartość procentową, np. 3,57' : 'Wpisz kwotę brutto w zł, np. 5000';
  document.getElementById('prowizja').placeholder = typ === 'pct' ? 'np. 3,57' : 'np. 5000';
  updateBadge();
}

function selectS5(wariant) {
  s5Wariant = wariant;
  document.getElementById('opt-s5-dwie').classList.toggle('selected', wariant === 'dwie');
  document.getElementById('opt-s5-jedna').classList.toggle('selected', wariant === 'jedna');
}


function updateBadge() {
  const p = document.getElementById('prowizja').value;
  if (!p || !selectedContract) return;
  const badge = prowizjaTyp === 'pct' ? p + '% brutto' : p + ' zł brutto';
  document.querySelectorAll('.contract-badge').forEach(b => {
    if (b.closest('#opt-' + selectedContract)) b.textContent = badge;
  });
}

let prezCount = 0;
function addPrezentacja() {
  prezCount++;
  const idx = prezCount;
  const container = document.getElementById('prezentacje-list');
  const card = document.createElement('div');
  card.className = 'prez-card';
  card.id = 'prez-' + idx;
  card.innerHTML = `
    <div class="prez-card-header">
      <span class="prez-card-title">Prezentacja nr ${idx}</span>
      <button class="btn-remove" onclick="SPRZEDAZ.removePrezentacja(${idx})" title="Usuń">×</button>
    </div>
    <div class="form-grid">
      <div class="field span2">
        <label>Adres nieruchomości</label>
        <input type="text" id="prez_${idx}_adres" placeholder="np. ul. Kwiatowa 5/2, 80-300 Gdańsk">
      </div>
      <div class="field">
        <label>Data prezentacji</label>
        <input type="date" id="prez_${idx}_data">
      </div>
      <div class="field">
        <label>Cena ofertowa</label>
        <input type="text" id="prez_${idx}_cena" placeholder="np. 380 000 zł">
      </div>
      <div class="field">
        <label>Powierzchnia</label>
        <input type="text" id="prez_${idx}_pow" placeholder="np. 55 m²">
      </div>
      <div class="field">
        <label>Rodzaj nieruchomości</label>
        <input type="text" id="prez_${idx}_rodzaj" placeholder="np. mieszkanie, dom, działka">
      </div>
      <div class="field span2">
        <label>Uwagi / notatki</label>
        <textarea id="prez_${idx}_uwagi" placeholder="np. stan do remontu, III piętro, brak windy..."></textarea>
      </div>
    </div>`;
  container.appendChild(card);
}

function removePrezentacja(idx) {
  const el = document.getElementById('prez-' + idx);
  if (el) el.remove();
}

function getPrezentacje() {
  const result = [];
  document.querySelectorAll('.prez-card').forEach(card => {
    const idx = card.id.replace('prez-', '');
    const adres = (document.getElementById('prez_'+idx+'_adres')||{}).value || '';
    if (!adres) return;
    result.push({
      idx: result.length + 1,
      adres,
      data: (document.getElementById('prez_'+idx+'_data')||{}).value || '',
      cena: (document.getElementById('prez_'+idx+'_cena')||{}).value || '',
      pow: (document.getElementById('prez_'+idx+'_pow')||{}).value || '',
      rodzaj: (document.getElementById('prez_'+idx+'_rodzaj')||{}).value || '',
      uwagi: (document.getElementById('prez_'+idx+'_uwagi')||{}).value || '',
    });
  });
  return result;
}

function goNext(from) {
  if (from === 1) {
    if (!document.getElementById('prowizja').value.trim()) {
      document.getElementById('prowizja').focus();
      document.getElementById('prowizja').style.borderColor = '#ef4444';
      setTimeout(()=>document.getElementById('prowizja').style.borderColor='',2000);
      alert('Proszę podać wysokość prowizji.');
      return;
    }
    showPage(2); updateStep(2); return;
  }
  if (from === 2) {
    const req = ['klient_imie','klient_adres','klient_pesel','klient_dowod','klient_email','klient_telefon','data_umowy','miejsce_umowy','nr_umowy'];
    for (let id of req) {
      if (!document.getElementById(id).value.trim()) {
        document.getElementById(id).focus();
        document.getElementById(id).style.borderColor = '#ef4444';
        setTimeout(()=>document.getElementById(id).style.borderColor='',2000);
        alert('Proszę wypełnić wszystkie wymagane pola (oznaczone *).');
        return;
      }
    }
    showPage(3); updateStep(3); return;
  }
  if (from === 3) {
    document.getElementById('pep_imie').value = document.getElementById('klient_imie').value;
    showPage(4); updateStep(4); return;
  }
  if (from === 4) {
    showPage(5); updateStep(5); return;
  }
  if (from === 5) {
    buildSummary();
    showPage(6); updateStep(6);
  }
}

function goBack(from) {
  if (from === 2) { showPage(1); updateStep(1); }
  if (from === 3) { showPage(2); updateStep(2); }
  if (from === 4) { showPage(3); updateStep(3); }
  if (from === 5) { showPage(4); updateStep(4); }
  if (from === 6) { showPage(5); updateStep(5); }
}

function showPage(n) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page'+n).classList.add('active');
  if (n === 5) { initSigPads(); initOCImage(); }
}

function updateStep(n) {
  for (let i=1; i<=6; i++) {
    const el = document.getElementById('step'+i+'-ind');
    el.classList.remove('active','done');
    if (i < n) el.classList.add('done');
    if (i === n) el.classList.add('active');
  }
}
function initSigPads() {
  HEX.initSig('sig-klient');
  HEX.initSig('sig-agent');
}

function clearSig(id) {
  HEX.clearSig(id);
  const c = document.getElementById(id);
  const w = c && c.closest('.sig-wrap');
  if (w) w.classList.remove('has-sig');
}

// ===== POLISA OC =====
let ocImageData = null; // holds base64 data URL of current polisa OC

function initOCImage() {
  if (!ocImageData) {
    ocImageData = 'data:image/png;base64,' + DEFAULT_POLISA_B64;
  }
  _ocRenderUI();
}

function _ocRenderUI() {
  const img    = document.getElementById('oc-preview');
  const btnDel = document.getElementById('oc-delete-btn');
  const upWrap = document.getElementById('oc-upload-wrap');
  if (!img || !btnDel || !upWrap) return;

  if (ocImageData) {
    img.src              = ocImageData;
    img.style.display    = 'block';
    btnDel.style.display = 'inline-block';
    upWrap.style.display = 'none';
    // reset file input so user can re-pick same file after delete
    const inp = document.getElementById('oc-file-input');
    if (inp) inp.value = '';
  } else {
    img.src              = '';
    img.style.display    = 'none';
    btnDel.style.display = 'none';
    upWrap.style.display = 'block';
  }
}

function ocDeletePolisa() {
  ocImageData = null;
  _ocRenderUI();
  HEX.toast('Polisa OC usunięta — wgraj nową');
}

function handleOCFile(input) {
  const file = input.files[0];
  if (!file) return;
  const allowed = ['image/png', 'image/jpeg'];
  if (!allowed.includes(file.type)) {
    HEX.toast('❌ Dozwolone formaty: PNG, JPG, JPEG');
    input.value = '';
    return;
  }
  const reader = new FileReader();
  reader.onload = function(e) {
    ocImageData = e.target.result;
    _ocRenderUI();
    HEX.toast('✓ Polisa OC wczytana');
  };
  reader.readAsDataURL(file);
}


document.addEventListener('change', function(e) {
  if (e.target.name && e.target.name.startsWith('pep')) {
    const anyTak = ['pep1','pep2','pep3'].some(n => {
      const el = document.querySelector(`input[name="${n}"]:checked`);
      return el && el.value === 'TAK';
    });
    document.getElementById('pep-zrodlo-section').style.display = anyTak ? 'block' : 'none';
  }
});

function v(id) { return (document.getElementById(id)||{}).value || ''; }

function contractLabel() {
  if (selectedContract === 'excl') return 'Umowa Ekskluzywna Pośrednictwa w Sprzedaży Nieruchomości';
  if (selectedContract === 'open') return 'Umowa Otwarta Pośrednictwa w Sprzedaży Nieruchomości';
  return 'Umowa Pośrednictwa Kupna Nieruchomości';
}

function getPepVal(name) {
  const el = document.querySelector(`input[name="${name}"]:checked`);
  return el ? el.value : '—';
}

function getRodoVal(name) {
  const el = document.querySelector(`input[name="${name}"]:checked`);
  return el ? el.value : '—';
}

function getPepSources() {
  const sources = [
    {id:'src_wynagrodzenie', label:'wynagrodzenie'},
    {id:'src_dzialalnosc',   label:'działalność gospodarcza'},
    {id:'src_oszczednosci',  label:'oszczędności'},
    {id:'src_spadek',        label:'spadek'},
    {id:'src_inne',          label:'inne'},
    {id:'src_odmawiam',      label:'odmawiam podania'},
  ];
  return sources.filter(s => document.getElementById(s.id) && document.getElementById(s.id).checked).map(s => s.label);
}

function buildSummary() {
  const prowizjaRaw = v('prowizja') || (selectedContract === 'kupno' ? '1,23' : '3,57');
  const prowizjaLabel = prowizjaTyp === 'pct' ? prowizjaRaw + '% brutto' : prowizjaRaw + ' zł brutto';
  const czasTrwania = selectedContract === 'kupno' ? 'czas nieokreślony' : (v('czas_trwania') ? v('czas_trwania') + ' miesięcy' : '6 miesięcy (domyślnie)');
  const s5Label = selectedContract === 'kupno' ? '100% po umowie końcowej' : (s5Wariant === 'jedna' ? '100% po umowie końcowej' : '50%+50% (dwie raty)');
  const rows = [
    ['Rodzaj umowy', contractLabel()],
    ['Data zawarcia', v('data_umowy') ? new Date(v('data_umowy')).toLocaleDateString('pl-PL') : '—'],
    ['Miejscowość', v('miejsce_umowy')],
    ['Nr umowy', v('nr_umowy') + '/' + FIRMA.skrot + '/' + FIRMA.agent + '/' + FIRMA.rok + '/HEX/MAZI/2026'],
    ['Prowizja', prowizjaLabel],
    ['Wariant płatności §5', s5Label],
    ['Czas trwania umowy', czasTrwania],
    ['Klient', v('klient_imie')],
    ['PESEL/NIP', v('klient_pesel')],
  ];
  if (selectedContract !== 'kupno') {
    rows.push(['Adres nieruchomości', v('nieruch_polozenie')]);
    rows.push(['Cena', v('nieruch_cena')]);
  }
  rows.push(['PEP – stan. polityczne', getPepVal('pep1')]);
  rows.push(['PEP – rodzina', getPepVal('pep2')]);
  rows.push(['PEP – współpracownik', getPepVal('pep3')]);
  rows.push(['RODO – zgoda ogólna', getRodoVal('rodo0')]);

  let html = '<h3>Dane do umowy</h3>';
  rows.forEach(([k,val])=>{
    const color = val === 'TAK' ? '#2e7d52' : val === 'NIE' ? '#374151' : '';
    html += `<div class="summary-row"><span class="summary-key">${k}</span><span class="summary-val" style="${color?'color:'+color+';font-weight:700':''}">${val || '—'}</span></div>`;
  });
  document.getElementById('summary-box').innerHTML = html;
}

// =====================================================
// PANEL USTAWIEŃ FIRMY
// =====================================================
function toggleFirmaPanel() {
  const panel = document.getElementById('firma-settings-panel');
  const btn   = document.getElementById('firma-panel-toggle-btn');
  const isOpen = panel.style.display !== 'none';
  panel.style.display = isOpen ? 'none' : 'block';
  btn.textContent = isOpen ? '⚙️ Ustawienia firmy' : '✕ Zamknij ustawienia';
}

function initFirmaPanel() {
  // Fill form fields from current FIRMA
  const fields = ['nazwa','wlasciciel','stanowisko','nip','regon',
                  'ulica','kod','miasto','email','tel','agent_email','agent_tel','skrot','agent','rok'];
  fields.forEach(f => {
    const el = document.getElementById('fp_' + f);
    if (el) el.value = HEX.loadFirmaData()[f] || '';
  });
  // Przywróć stan checkboxa języka
  const chk = document.getElementById('fp_lang_enabled');
  if (chk) chk.checked = langFeatureEnabled;
  renderFirmaProfiles();
}

function renderFirmaProfiles() {
  const profiles = loadFirmaProfile();
  const sel = document.getElementById('fp_profile_select');
  if (!sel) return;
  sel.innerHTML = '<option value="">— wybierz zapisany profil —</option>';
  profiles.forEach((p, i) => {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = p.nazwa + (p.nip ? ' (NIP: ' + p.nip + ')' : '');
    sel.appendChild(opt);
  });
}

function loadSelectedProfile() {
  const sel = document.getElementById('fp_profile_select');
  const idx = parseInt(sel.value);
  if (isNaN(idx)) return;
  const profiles = loadFirmaProfile();
  if (!profiles[idx]) return;
  const data = profiles[idx];
  const fields = ['nazwa','wlasciciel','stanowisko','nip','regon',
                  'ulica','kod','miasto','email','tel','agent_email','agent_tel','skrot','agent','rok'];
  fields.forEach(f => {
    const el = document.getElementById('fp_' + f);
    if (el) el.value = data[f] || '';
  });
}

function applyFirmaSettings() {
  const fields = ['nazwa','wlasciciel','stanowisko','nip','regon',
                  'ulica','kod','miasto','email','tel','agent_email','agent_tel','skrot','agent','rok'];
  const data = {};
  fields.forEach(f => {
    const el = document.getElementById('fp_' + f);
    data[f] = el ? el.value.trim() : '';
  });
  if (!data.nazwa || !data.ulica || !data.kod || !data.miasto) {
    alert('Wypełnij co najmniej: Nazwa firmy, Ulica, Kod pocztowy, Miasto.');
    return;
  }
  HEX.saveFirmaData(data);
  saveFirmaProfil(data);
  renderFirmaProfiles();
  alert('✅ Dane firmy zostały zapisane i będą użyte w kolejnych umowach.');
  toggleFirmaPanel();
}

function resetFirmaToDefault() {
  if (!confirm('Przywrócić domyślne dane firmy?')) return;
  const fields = ['nazwa','wlasciciel','stanowisko','nip','regon',
                  'ulica','kod','miasto','email','tel','agent_email','agent_tel','skrot','agent','rok'];
  fields.forEach(f => {
    const el = document.getElementById('fp_' + f);
    if (el) el.value = HEX.FIRMA[f] || '';
  });
}
// =====================================================

function toggleZadanieRozpoczecia(checked) {
  // just visual feedback; actual state read in PDF gen
}

// =====================================================
// WERSJA JĘZYKOWA UMOWY
// =====================================================
let langFeatureEnabled = false;   // kontrolowane przez checkbox w ustawieniach firmy

// Wczytaj stan z localStorage
function initLangState() {
  try {
    const saved = localStorage.getItem('hex_lang_enabled');
    langFeatureEnabled = saved === '1';
    const chk = document.getElementById('fp_lang_enabled');
    if (chk) chk.checked = langFeatureEnabled;
    applyLangFeatureVisibility();

    const savedLang = localStorage.getItem('hex_contract_lang') || 'pl';
    selectContractLang(savedLang);
  } catch(e) {}
}

// Włącz/wyłącz funkcję tłumaczenia (checkbox w ustawieniach firmy)
function toggleLangFeature(enabled) {
  langFeatureEnabled = enabled;
  try { localStorage.setItem('hex_lang_enabled', enabled ? '1' : '0'); } catch(e) {}
  applyLangFeatureVisibility();
  if (!enabled) {
    selectContractLang('pl'); // reset do PL gdy wyłączamy
  }
}

// Pokaż/ukryj blok języka na stronie 2
function applyLangFeatureVisibility() {
  const block = document.getElementById('lang-umowy-block');
  if (block) block.style.display = langFeatureEnabled ? 'block' : 'none';
}

function selectContractLang(lang) {
  selectedContractLang = lang;
  try { localStorage.setItem('hex_contract_lang', lang); } catch(e) {}
  ['pl','en'].forEach(l => {
    const el = document.getElementById('clang-' + l);
    if (el) el.classList.toggle('selected', l === lang);
  });
  const note = document.getElementById('lang-info-note');
  if (note) note.style.display = (langFeatureEnabled && lang !== 'pl') ? 'flex' : 'none';
}

function resetGenerator() {
  if (!confirm('Czy na pewno chcesz rozpocząć nową umowę? Wszystkie dane zostaną wyczyszczone.')) return;
  document.querySelectorAll('input:not([type=radio]):not([type=checkbox]), select, textarea').forEach(el => el.value = '');
  document.querySelectorAll('input[type=radio]').forEach(el => el.checked = false);
  document.querySelectorAll('input[type=checkbox]').forEach(el => el.checked = false);
  ['pep1_nie','pep2_nie','pep3_nie'].forEach(id => { const el=document.getElementById(id); if(el) el.checked=true; });
  document.getElementById('pep-zrodlo-section').style.display = 'none';
  clearSig('sig-klient');
  clearSig('sig-agent');
  ocImageData = null;
  prowizjaTyp = 'pct';
  s5Wariant = 'dwie';
  klientTyp = 'pryw';
  setProwizjaTyp('pct');
  selectS5('dwie');
  setKlientTyp('pryw');
  const chkZadanie = document.getElementById('chk-zadanie-rozpoczecia');
  if (chkZadanie) chkZadanie.checked = false;
  selectContractLang('pl'); // reset języka umowy do PL
  const chkPelnom = document.getElementById('chk-pelnom');
  if (chkPelnom) { chkPelnom.checked = false; togglePelnom(false); }
  selectedContract = null;
  document.querySelectorAll('.contract-option').forEach(el => el.classList.remove('selected'));
  document.getElementById('next1').disabled = true;
  showPage(1); updateStep(1);
}

// ======= PDF GENERATION (pdfmake) =======
async function generatePDF() {
  HEX.showSpinner();
  await new Promise(r => setTimeout(r, 200));

  try {
    const FIRMA = HEX.buildFirmaPochodne(HEX.loadFirmaData());
    // ——— Collect data ———
    const prowizjaRaw = v('prowizja') || (selectedContract === 'kupno' ? '1,23' : '3,57');
    const prowizjaTypVal = prowizjaTyp; // 'pct' | 'zl'
    const prowizjaVal = prowizjaTypVal === 'pct'
      ? prowizjaRaw + ' % brutto ceny transakcyjnej Nieruchomości brutto'
      : prowizjaRaw + ' zł brutto';
    const s5WariantVal = s5Wariant; // 'dwie' | 'jedna'
    const isFirma = klientTyp === 'firma';
    const hasPelnom = document.getElementById('chk-pelnom') && document.getElementById('chk-pelnom').checked;
    const czasTrwaniaVal = v('czas_trwania') ? parseInt(v('czas_trwania')) : 6;
    const czasTrwaniaSlowal = (() => {
      const n = czasTrwaniaVal;
      const map = {1:'jednego',2:'dwóch',3:'trzech',4:'czterech',5:'pięciu',6:'sześciu',7:'siedmiu',8:'ośmiu',9:'dziewięciu',10:'dziesięciu',11:'jedenastu',12:'dwunastu',18:'osiemnastu',24:'dwudziestu czterech',36:'trzydziestu sześciu'};
      return map[n] || String(n);
    })();
    const prezentacjeData = getPrezentacje();

    // helper: checked symbol
    function ck(val, opt) { return val === opt ? '[X]' : '[ ]'; }

    // Read PEP answers
    const pep1 = getPepVal('pep1');
    const pep2 = getPepVal('pep2');
    const pep3 = getPepVal('pep3');
    const pepSources = getPepSources();

    // Read RODO answers
    const rodo0 = getRodoVal('rodo0');
    const rodo1 = getRodoVal('rodo1');
    const rodo2 = getRodoVal('rodo2');
    const rodo3 = getRodoVal('rodo3');
    const rodo4 = getRodoVal('rodo4');

    const d = {
      type: selectedContract,
      nr: v('nr_umowy') + '/' + FIRMA.skrot + '/' + FIRMA.agent + '/' + FIRMA.rok,
      data: v('data_umowy') ? new Date(v('data_umowy')).toLocaleDateString('pl-PL',{day:'2-digit',month:'long',year:'numeric'}) : '.........................',
      miejsce: v('miejsce_umowy') || '.........................',
      imie: v('klient_imie') || '.........................',
      adres: v('klient_adres') || '.........................',
      koresp: v('klient_korespondencja') || 'jw.',
      pesel: v('klient_pesel') || '.........................',
      dowod: v('klient_dowod') || '.........................',
      email: v('klient_email') || '.........................',
      tel: v('klient_telefon') || '.........................',
      pelnom_imie: hasPelnom ? v('pelnom_imie') : '',
      pelnom_adres: hasPelnom ? v('pelnom_adres') : '',
      pelnom_pesel: hasPelnom ? v('pelnom_pesel') : '',
      pelnom_dowod: hasPelnom ? v('pelnom_dowod') : '',
      pelnom_email: hasPelnom ? v('pelnom_email') : '',
      pelnom_tel: hasPelnom ? v('pelnom_telefon') : '',
      nieruch_rodzaj: v('nieruch_rodzaj') || '.........................',
      nieruch_kw: v('nieruch_kw') || '.........................',
      nieruch_pow: v('nieruch_pow') || '.........................',
      nieruch_pol: v('nieruch_polozenie') || '.........................',
      nieruch_cena: v('nieruch_cena') || '.........................',
      faktura_email: v('nieruch_faktura_email') || v('buy_faktura_email') || v('klient_email') || '.........................',
      buy_opis: v('buy_opis'),
      prowizja: prowizjaVal,
      czas_trwania: czasTrwaniaVal,
      czas_trwania_slownie: czasTrwaniaSlowal,
      prezentacje: prezentacjeData,
      s5wariant: s5WariantVal,
      isFirma,
      hasPelnom,
      pep1, pep2, pep3, pepSources,
      rodo0, rodo1, rodo2, rodo3, rodo4,
      ck,
    };

    const isKupno = d.type === 'kupno';
    const isExcl  = d.type === 'excl';
    const isBilingual = selectedContractLang !== 'pl';
    const S  = isBilingual ? 8.5 : 10;
    const ST = isBilingual ? 8   : 9;
    const LH = 1.35;
    const PF = 'Roboto'; // font wersji polskiej
    const NAVY = '#1a2b5e';

    const styles = {
      title:   { font:PF, fontSize: isBilingual ? 9 : 10, bold:true, alignment:'center', margin:[0,0,0,3] },
      subtitle:{ font:PF, fontSize:8.5, alignment:'center', margin:[0,0,0,2] },
      nr:      { font:PF, fontSize:9, bold:true, alignment:'center', margin:[0,2,0,6] },
      section: { font:PF, fontSize: isBilingual ? 9 : 10, bold:true, alignment:'center', margin:[0,8,0,4] },
      body:    { font:PF, fontSize:S, lineHeight:LH, alignment:'justify' },
      small:   { font:PF, fontSize:8, lineHeight:LH },
      bold:    { font:PF, fontSize:S, bold:true, lineHeight:LH },
      label:   { font:PF, fontSize:8.5, bold:true, margin:[0,3,0,0] },
      value:   { font:PF, fontSize:8.5, margin:[4,0,0,3] },
      italic:  { font:PF, fontSize:8.5, italics:true },
    };

    const lang = selectedContractLang || 'pl';
    const g   = (key, data) => HEX.getText(key, data, lang);
    const gpl = (key, data) => HEX.getText(key, data, 'pl');

    // ---- POMOCNIKI DWUJĘZYCZNE (strona po stronie) ----
    // plContent = strona PL, trContent = strona tlumaczenia
    const plContent = [];
    const trContent = [];
    function bilCol(plEl, trEl) {
      // W trybie bilingual: pushuje tłumaczenie do trContent jako efekt uboczny,
      // zwraca tylko element PL (strona po stronie)
      if (isBilingual && trEl) {
        const trArr = Array.isArray(trEl) ? trEl : [trEl];
        trArr.forEach(e => trContent.push(e));
      }
      return Array.isArray(plEl) ? { stack: plEl } : (plEl || {text:''});
    }
    function bilPush(arr, plEl, trEl) {
      // Ignorujemy arr – piszemy do plContent i trContent
      const plArr = Array.isArray(plEl) ? plEl : (plEl ? [plEl] : []);
      const trArr = Array.isArray(trEl) ? trEl : (trEl ? [trEl] : []);
      plArr.forEach(e => plContent.push(e));
      if (isBilingual) trArr.forEach(e => trContent.push(e));
    }
    function tr(txt) { return {text:txt||'',font:'Roboto',fontSize:ST,italics:true,lineHeight:LH,color:'#2d5a8e',alignment:'justify'}; }
    function trBold(txt) { return {text:txt||'',font:'Roboto',fontSize:ST,bold:true,italics:true,lineHeight:LH,color:'#2d5a8e'}; }
    function trSec(n) { return {text:'§ '+n,font:'Roboto',fontSize:isBilingual?9:10,bold:true,color:NAVY,margin:[0,8,0,4]}; }
    function trNum(n,txt) { return {columns:[{text:n+'.',width:12,fontSize:ST,color:NAVY},{text:txt,fontSize:ST,lineHeight:LH,color:NAVY,alignment:'justify'}],columnGap:2,margin:[0,0,0,3]}; }
    function trLit(l,txt) { return {columns:[{text:l+')',width:12,fontSize:ST,color:NAVY},{text:txt,fontSize:ST,lineHeight:LH,color:NAVY,alignment:'justify'}],columnGap:2,margin:[0,0,0,2],marginLeft:10}; }
    function trField(lbl,val) { return [{text:lbl+':',fontSize:ST-0.5,bold:true,color:NAVY,margin:[0,2,0,0]},{text:val||'....',fontSize:ST-0.5,color:NAVY,margin:[3,0,0,2]}]; }
    function trFieldInline(lbl,val) { return {columns:[{text:lbl+':',fontSize:ST-0.5,bold:true,color:NAVY,width:'auto',margin:[0,0,3,0]},{text:val||'....',fontSize:ST-0.5,color:NAVY,width:'*'}],columnGap:1,margin:[0,1,0,1]}; }
    function trHr() { return {canvas:[{type:'line',x1:0,y1:1,x2:228,y2:1,lineWidth:0.4,lineColor:'#8899bb'}],margin:[0,3,0,4]}; }

    function field(lbl, val) {
      return [
        { text: lbl + ':', style:'label' },
        { text: val || '.....................................', style:'value' },
      ];
    }

    function num(n, txt) {
      return { columns:[
        { text: n+'.', width:14, style:'body' },
        { text: txt, style:'body', lineHeight:LH, alignment:'justify' },
      ], columnGap:2, margin:[0,0,0,4] };
    }

    function lit(l, txt) {
      return { columns:[
        { text: l+')', width:14, style:'body' },
        { text: txt, style:'body', lineHeight:LH, alignment:'justify' },
      ], columnGap:2, margin:[0,0,0,3], marginLeft:14 };
    }

    function sec(n) {
      return { text:'§ '+n, style:'section' };
    }

    function hr() {
      return { canvas:[{ type:'line', x1:0, y1:2, x2:495, y2:2, lineWidth:0.5, lineColor:'#aaa' }], margin:[0,4,0,6] };
    }

    // Collect signatures and OC
    const sigKlientData = HEX.getSig('sig-klient');
    const sigAgentData  = HEX.getSig('sig-agent');
    const ocData = ocImageData; // null = polisa usunięta przez użytkownika

    function sigRow(l1, l2) {
      const leftStack = [];
      if (sigKlientData) {
        leftStack.push({ image: sigKlientData, width:160, height:50, margin:[0,0,0,2] });
      }
      leftStack.push({ canvas:[{type:'line',x1:0,y1:0,x2:170,y2:0,lineWidth:0.8}] });
      leftStack.push({ text:l1, fontSize:8, bold:true, margin:[0,3,0,0] });

      const rightStack = [];
      if (sigAgentData) {
        rightStack.push({ image: sigAgentData, width:160, height:50, margin:[0,0,0,2], alignment:'right' });
      }
      rightStack.push({ canvas:[{type:'line',x1:0,y1:0,x2:170,y2:0,lineWidth:0.8}] });
      rightStack.push({ text:l2, fontSize:8, bold:true, margin:[0,3,0,0] });

      return { columns:[
        { stack: leftStack, width:'50%' },
        { stack: rightStack, width:'50%', alignment:'right' },
      ], margin:[0,16,0,0] };
    }

    function sigSingle(lbl) {
      const stack = [];
      if (sigKlientData) {
        stack.push({ image: sigKlientData, width:160, height:50, margin:[0,0,0,2] });
      }
      stack.push({ canvas:[{type:'line',x1:0,y1:0,x2:200,y2:0,lineWidth:0.8}] });
      stack.push({ text:lbl, fontSize:8, bold:true, margin:[0,3,0,0] });
      return { stack, margin:[0,14,0,0] };
    }

    // Specjalna funkcja dla załączników PEP i Zgoda:
    // lewa kolumna = DATA (wydrukowana data z umowy, bez pola na podpis),
    // prawa kolumna = PODPIS KLIENTA (z podpisem odręcznym)
    function sigRowDataKlient(dataVal) {
      const leftStack = [];
      leftStack.push({ text: dataVal || '.........................',
        fontSize: 11, margin:[0,8,0,6] });
      leftStack.push({ canvas:[{type:'line',x1:0,y1:0,x2:170,y2:0,lineWidth:0.8}] });
      leftStack.push({ text:'DATA', fontSize:8, bold:true, margin:[0,3,0,0] });

      const rightStack = [];
      if (sigKlientData) {
        rightStack.push({ image: sigKlientData, width:160, height:50, margin:[0,0,0,2], alignment:'right' });
      }
      rightStack.push({ canvas:[{type:'line',x1:0,y1:0,x2:170,y2:0,lineWidth:0.8}] });
      rightStack.push({ text:'PODPIS KLIENTA', fontSize:8, bold:true, margin:[0,3,0,0] });

      return { columns:[
        { stack: leftStack, width:'50%' },
        { stack: rightStack, width:'50%', alignment:'right' },
      ], margin:[0,16,0,0] };
    }

    function pb() { return { text:'', pageBreak:'after' }; }



    // content jest aliasem plContent – wszystkie content.push trafiają do strony PL
    const content = plContent;

    // ——— Kolumny językowe: flaga + kod ———
    const langFlag = { pl:'PL', en:'EN' };

    // ——— Tytuł umowy ———
    const contractTitlePL = isKupno
      ? gpl('sprzedaz.title.kupno')
      : isExcl
        ? gpl('sprzedaz.title.excl')
        : gpl('sprzedaz.title.open');
    const contractTitleTR = isBilingual ? (isKupno ? g('sprzedaz.title.kupno') : isExcl ? g('sprzedaz.title.excl') : g('sprzedaz.title.open')) : '';

    // Nagłówek: logo lewo + tytuł środek
    content.push({
      columns: [
        { image: LOGO_PDF_B64, width: 80, margin: [0, 0, 0, 0] },
        { stack: [
            { text: contractTitlePL, style: 'title', margin: [0, 0, 0, 2] },
            { text: '('+gpl('sprzedaz.subtitle')+')', style: 'subtitle' },
            { text: 'NR ' + d.nr, style: 'nr' },
          ], alignment: 'center', width: '*', margin: [0, 4, 0, 0] },
        { text: '', width: 80 },
      ],
      columnGap: 8,
      margin: [0, 0, 0, 6],
    });
    content.push({ canvas:[{type:'line',x1:0,y1:0,x2:495,y2:0,lineWidth:1,lineColor:'#b8922a'}], margin:[0,0,0,10] });
    if (isBilingual) {
      content.push({ text:`${isBilingual ? 'WERSJA POLSKA / POLISH VERSION' : 'WERSJA POLSKA'}`, fontSize:8.5, bold:true, color:'#333', margin:[0,2,0,4] });
      content.push({ canvas:[{type:'line',x1:0,y1:0,x2:495,y2:0,lineWidth:0.4,lineColor:'#b8c4d8'}], margin:[0,0,0,4] });
    }
    // (Nagłówek strony tłumaczenia dodawany jest na końcu przez trPageHeader)

    bilPush(content,
      { text: gpl('sprzedaz.zawarta', {dt:d.data, mj:d.miejsce}), style:'body', margin:[0,0,0,4] },
      isBilingual ? tr(g('sprzedaz.zawarta', {dt:d.data, mj:d.miejsce})) : null
    );
    content.push({ canvas:[{type:'line',x1:0,y1:2,x2:495,y2:2,lineWidth:0.5,lineColor:'#aaa'}], margin:[0,4,0,6] });

    // ——— Dane klienta ———
    function inlineField(label, value) {
      return { columns:[
        { text: label + ':', fontSize:8.5, bold:true, width:'auto', margin:[0,0,4,0] },
        { text: value || '.................................', fontSize:8.5, width:'*' },
      ], columnGap:2, margin:[0,1,0,2] };
    }
    function inlineFieldFull(label, value) {
      return { columns:[
        { text: label + ':', fontSize:8.5, bold:true, width:'auto', margin:[0,0,4,0] },
        { text: value || '.................................', fontSize:8.5, width:'*' },
      ], columnGap:2, margin:[0,1,0,2] };
    }

    // Imię/nazwisko — pełna szerokość
    bilPush(content,
      inlineFieldFull(d.isFirma ? 'Nazwa firmy' : 'Imię i nazwisko', d.imie),
      isBilingual ? trFieldInline(d.isFirma ? 'Company name' : 'Full name / Imię i nazwisko', d.imie) : null
    );
    bilPush(content,
      inlineFieldFull(d.isFirma ? 'Adres zarejestrowania działalności' : 'Adres zamieszkania', d.adres),
      isBilingual ? trFieldInline(d.isFirma ? 'Registered address' : 'Address / Adres', d.adres) : null
    );
    if (d.koresp && d.koresp !== 'jw.' && d.koresp.trim() !== '') {
      bilPush(content,
        inlineFieldFull('Adres do korespondencji', d.koresp),
        isBilingual ? trFieldInline('Correspondence address', d.koresp) : null
      );
    }

    bilPush(content,
      { columns:[
        { stack:[ inlineField(d.isFirma ? 'NIP' : 'PESEL', d.pesel) ], width:'50%' },
        { stack:[ inlineField(d.isFirma ? 'REGON / KRS' : 'Dowód tożsamości', d.dowod) ], width:'50%' },
      ], columnGap:8, margin:[0,0,0,2] },
      isBilingual ? { columns:[
        { stack:[ trFieldInline(d.isFirma ? 'TIN/NIP' : 'PESEL', d.pesel) ], width:'50%' },
        { stack:[ trFieldInline(d.isFirma ? 'REGON/KRS' : 'ID doc / Dowód', d.dowod) ], width:'50%' },
      ], columnGap:8, margin:[0,0,0,2] } : null
    );
    bilPush(content,
      { columns:[
        { stack:[ inlineField('E-mail', d.email) ], width:'50%' },
        { stack:[ inlineField('Telefon', d.tel) ], width:'50%' },
      ], columnGap:8, margin:[0,0,0,2] },
      isBilingual ? { columns:[
        { stack:[ trFieldInline('E-mail', d.email) ], width:'50%' },
        { stack:[ trFieldInline('Phone / Tel.', d.tel) ], width:'50%' },
      ], columnGap:8, margin:[0,0,0,2] } : null
    );

    if (d.hasPelnom && d.pelnom_imie) {
      bilPush(content,
        { text:'działającym na podstawie załączonego pełnomocnictwa w imieniu i na rzecz:', style:'bold', margin:[0,6,0,4] },
        isBilingual ? trBold('acting under an attached power of attorney on behalf of:') : null
      );
      const plPeln = [
        ...(field('Imię i nazwisko', d.pelnom_imie)),
        ...(d.pelnom_adres ? field('Adres zamieszkania', d.pelnom_adres) : []),
        ...(d.pelnom_pesel ? field('PESEL', d.pelnom_pesel) : []),
        ...(d.pelnom_dowod ? field('Nr dokumentu', d.pelnom_dowod) : []),
      ];
      bilPush(content, plPeln, isBilingual ? [
        ...trField('Full name', d.pelnom_imie),
        ...(d.pelnom_adres ? trField('Address', d.pelnom_adres) : []),
        ...(d.pelnom_pesel ? trField('PESEL', d.pelnom_pesel) : []),
        ...(d.pelnom_dowod ? trField('ID doc', d.pelnom_dowod) : []),
      ] : null);
    } else {
      bilPush(content,
        { text: d.isFirma ? 'reprezentowaną przez osobę uprawnioną do reprezentacji' : 'działającym w imieniu własnym* (* niepotrzebne skreślić)', style:'italic', margin:[0,6,0,4] },
        isBilingual ? tr(d.isFirma ? 'represented by an authorised person' : 'acting on own behalf (* delete as appropriate)') : null
      );
    }

    bilPush(content,
      { text: gpl('sprzedaz.klient'), style:'bold', margin:[0,6,0,4] },
      isBilingual ? trBold(g('sprzedaz.klient')) : null
    );
    bilPush(content,
      { text: gpl('sprzedaz.oraz'), style:'body', bold:true, alignment:'center', margin:[0,4,0,4] },
      isBilingual ? trBold(g('sprzedaz.oraz')) : null
    );
    bilPush(content,
      { text: FIRMA.ceidg, style:'body', margin:[0,0,0,4] },
      isBilingual ? tr(FIRMA.ceidg) : null
    );
    bilPush(content,
      { text: gpl('sprzedaz.posrednik'), style:'bold', margin:[0,0,0,6] },
      isBilingual ? trBold(g('sprzedaz.posrednik')) : null
    );
    content.push({ canvas:[{type:'line',x1:0,y1:2,x2:495,y2:2,lineWidth:0.5,lineColor:'#aaa'}], margin:[0,4,0,6] });

    // ——— Treść umowy §1-końcowy ———
    // bpush pushuje element PL do plContent, a opcjonalny tłumaczony do trContent
    const bodyItems = []; // nieużywane, zachowane dla kompatybilności
    function bpush(...args) {
      args.forEach(a => {
        if (!a) return;
        plContent.push(a._pl !== undefined ? a._pl : a);
        if (isBilingual && a._tr !== undefined && a._tr !== null) trContent.push(a._tr);
      });
    }

    // Zwraca obiekt z parą { _pl, _tr }
    function bsec(n) {
      return {
        _pl: { text:'§ '+n, style:'section' },
        _tr: trSec(n),
      };
    }
    function bnum(n, txt, trTxt) {
      return {
        _pl: { columns:[{text:n+'.',width:14,style:'body'},{text:txt,style:'body',lineHeight:LH,alignment:'justify'}],columnGap:2,margin:[0,0,0,3] },
        _tr: trTxt ? trNum(n, trTxt) : null,
      };
    }
    function blit(l, txt, trTxt) {
      return {
        _pl: { columns:[{text:l+')',width:14,style:'body'},{text:txt,style:'body',lineHeight:LH,alignment:'justify'}],columnGap:2,margin:[0,0,0,2],marginLeft:12 },
        _tr: trTxt ? trLit(l, trTxt) : null,
      };
    }
    function bfield(lbl, val) {
      return [
        { text:lbl+':', font:'Roboto', fontSize:8.5, bold:true, margin:[0,2,0,0] },
        { text:val||'.....................................', font:'Roboto', fontSize:8.5, margin:[4,0,0,3] },
      ];
    }
    function bfield2col(lbl1,val1,lbl2,val2,trLbl1,trLbl2) {
      return {
        _pl: { columns:[
          { stack:bfield(lbl1,val1), width:'50%' },
          { stack:bfield(lbl2,val2), width:'50%' },
        ], columnGap:8, margin:[0,0,0,2] },
        _tr: (trLbl1||trLbl2) ? { columns:[
          { stack:trField(trLbl1||lbl1, val1), width:'50%' },
          { stack:trField(trLbl2||lbl2, val2), width:'50%' },
        ], columnGap:8, margin:[0,0,0,2] } : null,
      };
    }
    function bfieldFull(lbl, val, trLbl) {
      return {
        _pl: { stack: bfield(lbl, val) },
        _tr: trLbl ? { stack: trField(trLbl, val) } : null,
      };
    }
    function bhr() {
      return { canvas:[{type:'line',x1:0,y1:1,x2:495,y2:1,lineWidth:0.4,lineColor:'#bbb'}],margin:[0,3,0,4] };
    }
    // Pogrubiony tekst z danymi (prowizja, okres, koordynator)
    function bBold(txt, trTxt) {
      return {
        _pl: { text: txt, font:'Roboto', fontSize:S, bold:true, lineHeight:LH, alignment:'justify', margin:[0,0,0,3] },
        _tr: trTxt ? { text: trTxt, font:'Roboto', fontSize:ST, bold:true, lineHeight:LH, color:NAVY, alignment:'justify', margin:[0,0,0,3] } : null,
      };
    }

    // §1
    bpush(bsec(1));
    bpush(bnum(1,
      gpl('sprzedaz.s1.t1') + (isKupno ? gpl('sprzedaz.s1.t1k') : '.'),
      isBilingual ? g('sprzedaz.s1.t1') + (isKupno ? g('sprzedaz.s1.t1k') : '.') : null
    ));
    if (!isKupno) {
      bpush(bnum(2,
        gpl('sprzedaz.s1.t2'),
        isBilingual ? g('sprzedaz.s1.t2') : null
      ));
      bpush(bnum(3, gpl('sprzedaz.s1.t3'), isBilingual ? g('sprzedaz.s1.t3') : null));
      // Dane nieruchomości — 2 kolumny
      bpush(bfield2col(gpl('sprzedaz.s1.f_rodzaj'), d.nieruch_rodzaj, g('sprzedaz.rodzajMap')?.[d.nieruch_rodzaj]||d.nieruch_rodzaj, gpl('sprzedaz.s1.f_kw'), d.nieruch_kw, isBilingual?g('sprzedaz.s1.f_rodzaj'):null, isBilingual?g('sprzedaz.s1.f_kw'):null));
      bpush(bfield2col(gpl('sprzedaz.s1.f_pow'), d.nieruch_pow, gpl('sprzedaz.s1.f_cena'), d.nieruch_cena, isBilingual?g('sprzedaz.s1.f_pow'):null, isBilingual?g('sprzedaz.s1.f_cena'):null));
      bpush(bfieldFull(gpl('sprzedaz.s1.f_pol'), d.nieruch_pol, isBilingual?g('sprzedaz.s1.f_pol'):null));
    } else {
      bpush(bnum(2,
        gpl('sprzedaz.s1.t2k'),
        isBilingual ? g('sprzedaz.s1.t2k') : null
      ));
      if (d.buy_opis) bpush(bnum(3, gpl('sprzedaz.s1.t3k', {opis:d.buy_opis}), isBilingual ? g('sprzedaz.s1.t3k', {opis:d.buy_opis}) : null));
    }

    // §2
    bpush(bsec(2));
    bpush(bnum(1,
      isKupno ? gpl('sprzedaz.s2.t1k') : gpl('sprzedaz.s2.t1'),
      isBilingual ? (isKupno ? g('sprzedaz.s2.t1k') : g('sprzedaz.s2.t1')) : null
    ));
    if (!isKupno) {
      bpush(bnum(2,gpl('sprzedaz.s2.t2'), isBilingual ? g('sprzedaz.s2.t2') : null));
      bpush(blit('a',gpl('sprzedaz.s2.a'), isBilingual?g('sprzedaz.s2.a'):null));
      bpush(blit('b',gpl('sprzedaz.s2.b'), isBilingual?g('sprzedaz.s2.b'):null));
      bpush(blit('c', isExcl ? gpl('sprzedaz.s2.c_excl') : gpl('sprzedaz.s2.c'), isBilingual?(isExcl?g('sprzedaz.s2.c_excl'):g('sprzedaz.s2.c')):null));
      bpush(blit('d',gpl('sprzedaz.s2.d'), isBilingual?g('sprzedaz.s2.d'):null));
      bpush(blit('e',gpl('sprzedaz.s2.e'), isBilingual?g('sprzedaz.s2.e'):null));
      bpush(blit('f',gpl('sprzedaz.s2.f'), isBilingual?g('sprzedaz.s2.f'):null));
      bpush(blit('g',gpl('sprzedaz.s2.g'), isBilingual?g('sprzedaz.s2.g'):null));
      if (isExcl) bpush(blit('h',gpl('sprzedaz.s2.h_excl'), isBilingual?g('sprzedaz.s2.h_excl'):null));
      bpush(blit(isExcl?'i':'h', gpl('sprzedaz.s2.i'), isBilingual?g('sprzedaz.s2.i'):null));
      bpush(blit(isExcl?'j':'i', gpl('sprzedaz.s2.j'), isBilingual?g('sprzedaz.s2.j'):null));
      bpush(blit(isExcl?'k':'j', gpl('sprzedaz.s2.k'), isBilingual?g('sprzedaz.s2.k'):null));
      bpush(blit(isExcl?'l':'k', gpl('sprzedaz.s2.l'), isBilingual?g('sprzedaz.s2.l'):null));
      bpush(bnum(3,gpl('sprzedaz.s2.t3'), isBilingual?g('sprzedaz.s2.t3'):null));
    }
    bpush(bnum(isKupno?2:4,gpl('sprzedaz.s2.t4'), isBilingual?g('sprzedaz.s2.t4'):null));
    if (isKupno) {
      bpush(bnum(3,gpl('sprzedaz.s2.t3k'), isBilingual?g('sprzedaz.s2.t3k'):null));
      bpush(bnum(4,gpl('sprzedaz.s2.t4k'), isBilingual?g('sprzedaz.s2.t4k'):null));
      bpush(bnum(5,gpl('sprzedaz.s2.t5k'), isBilingual?g('sprzedaz.s2.t5k'):null));
    } else {
      bpush(bnum(5,gpl('sprzedaz.s2.t5'), isBilingual?g('sprzedaz.s2.t5'):null));
    }

    // §3 ekskluzywa
    if (isExcl) {
      bpush(bsec(3));
      bpush(bnum(1,gpl('sprzedaz.s3.t1excl'), isBilingual?g('sprzedaz.s3.t1excl'):null));
      bpush(bnum(2,gpl('sprzedaz.s3.t2excl'), isBilingual?g('sprzedaz.s3.t2excl'):null));
    }

    // §wyn — wynagrodzenie (POGRUBIONE)
    const bWyn = isExcl ? 4 : 3;
    bpush(bsec(bWyn));
    bpush(bBold(
      gpl('sprzedaz.s4.wyn', {prow:d.prowizja}),
      isBilingual ? g('sprzedaz.s4.wyn', {prow:d.prowizja}) : null
    ));

    // §5 — płatność
    bpush(bsec(bWyn+1));
    if (!isKupno) {
      if (d.s5wariant === 'jedna') {
        bpush(bnum(1,gpl('sprzedaz.s5.t1_one'), isBilingual?g('sprzedaz.s5.t1_one'):null));
        bpush(bnum(2,gpl('sprzedaz.s5.t2_one'), isBilingual?g('sprzedaz.s5.t2_one'):null));
        bpush(bnum(3,gpl('sprzedaz.s5.t4'), isBilingual?g('sprzedaz.s5.t4'):null));
      } else {
        bpush(bnum(1,gpl('sprzedaz.s5.t1a'), isBilingual?g('sprzedaz.s5.t1a'):null));
        bpush(blit('a',gpl('sprzedaz.s5.a'), isBilingual?g('sprzedaz.s5.a'):null));
        bpush(blit('b',gpl('sprzedaz.s5.b'), isBilingual?g('sprzedaz.s5.b'):null));
        bpush(bnum(2,gpl('sprzedaz.s5.t2'), isBilingual?g('sprzedaz.s5.t2'):null));
        bpush(bnum(3,gpl('sprzedaz.s5.t3'), isBilingual?g('sprzedaz.s5.t3'):null));
        bpush(bnum(4,gpl('sprzedaz.s5.t4'), isBilingual?g('sprzedaz.s5.t4'):null));
      }
    } else {
      bpush(bnum(1,gpl('sprzedaz.s5.t1k'), isBilingual?g('sprzedaz.s5.t1k'):null));
      bpush(blit('a',gpl('sprzedaz.s5.ak'), isBilingual?g('sprzedaz.s5.ak'):null));
      bpush(bnum(2,gpl('sprzedaz.s5.t2k'), isBilingual?g('sprzedaz.s5.t2k'):null));
      bpush(bnum(3,gpl('sprzedaz.s5.t3k'), isBilingual?g('sprzedaz.s5.t3k'):null));
    }

    // §obowiązki
    const bObw = bWyn + 2;
    bpush(bsec(bObw));
    if (!isKupno) {
      bpush(bnum(1,gpl('sprzedaz.s6.ob1'), isBilingual?g('sprzedaz.s6.ob1'):null));
      bpush(bnum(2,gpl('sprzedaz.s6.ob2'), isBilingual?g('sprzedaz.s6.ob2'):null));
      if (isExcl) bpush(bnum(3,gpl('sprzedaz.s6.ob3excl'), isBilingual?g('sprzedaz.s6.ob3excl'):null));
      bpush(bnum(isExcl?4:3, gpl('sprzedaz.s6.ob_faktura', {email:d.faktura_email}), isBilingual?g('sprzedaz.s6.ob_faktura', {email:d.faktura_email}):null));
      bpush(bnum(isExcl?5:4,gpl('sprzedaz.s6.ob_peln'), isBilingual?g('sprzedaz.s6.ob_peln'):null));
      bpush(bnum(isExcl?6:5,gpl('sprzedaz.s6.ob_wpis'), isBilingual?g('sprzedaz.s6.ob_wpis'):null));
    } else {
      bpush(bnum(1,gpl('sprzedaz.s6.ob1k'), isBilingual?g('sprzedaz.s6.ob1k'):null));
      bpush(bnum(2, gpl('sprzedaz.s6.ob2k', {email:d.faktura_email}), isBilingual?g('sprzedaz.s6.ob2k', {email:d.faktura_email}):null));
    }

    bpush(bsec(bObw+1));
    if (!isKupno) {
      bpush(bnum(1,gpl('sprzedaz.s7.taj1'), isBilingual?g('sprzedaz.s7.taj1'):null));
      bpush(bnum(2,gpl('sprzedaz.s7.taj2'), isBilingual?g('sprzedaz.s7.taj2'):null));
    } else {
      bpush(bnum(1,gpl('sprzedaz.s7.tajk'), isBilingual?g('sprzedaz.s7.tajk'):null));
    }

    bpush(bsec(bObw+2));
    bpush(bnum(1,
      isKupno ? gpl('sprzedaz.s8.dod1k') : gpl('sprzedaz.s8.dod1'),
      isBilingual ? (isKupno ? g('sprzedaz.s8.dod1k') : g('sprzedaz.s8.dod1')) : null
    ));

    bpush(bsec(bObw+3));
    bpush(bnum(1,gpl('sprzedaz.s9.oc1'), isBilingual?g('sprzedaz.s9.oc1'):null));
    bpush(bnum(2,gpl('sprzedaz.s9.oc2'), isBilingual?g('sprzedaz.s9.oc2'):null));
    // Koordynator — POGRUBIONY
    bpush(bBold(gpl('sprzedaz.s9.oc3', {osoba:FIRMA.wlasciciel, tel:FIRMA.agent_tel||FIRMA.tel, email:FIRMA.agent_email||FIRMA.email}), isBilingual ? g('sprzedaz.s9.oc3', {osoba:FIRMA.wlasciciel, tel:FIRMA.agent_tel||FIRMA.tel, email:FIRMA.agent_email||FIRMA.email}) : null));
    bpush(bnum(4,gpl('sprzedaz.s9.oc4'), isBilingual?g('sprzedaz.s9.oc4'):null));

    bpush(bsec(bObw+4));
    bpush(bnum(1,gpl('sprzedaz.s10.rodo_par'), isBilingual?g('sprzedaz.s10.rodo_par'):null));

    // §czas trwania — POGRUBIONY okres
    bpush(bsec(bObw+5));
    if (isKupno) {
      bpush(bnum(1,gpl('sprzedaz.s11.czas1k'), isBilingual?g('sprzedaz.s11.czas1k'):null));
      bpush(bnum(2,gpl('sprzedaz.s11.czas2k'), isBilingual?g('sprzedaz.s11.czas2k'):null));
    } else {
      bpush(bBold(
        gpl('sprzedaz.s11.czas1', {n:d.czas_trwania, sl:d.czas_trwania_slownie}),
        isBilingual ? g('sprzedaz.s11.czas1', {n:d.czas_trwania, sl:d.czas_trwania_slownie}) : null
      ));
      bpush(bnum(2,gpl('sprzedaz.s11.czas2'), isBilingual?g('sprzedaz.s11.czas2'):null));
    }
    bpush(bnum(3,gpl('sprzedaz.s11.czas3'), isBilingual?g('sprzedaz.s11.czas3'):null));
    bpush(bnum(4,gpl('sprzedaz.s11.czas4'), isBilingual?g('sprzedaz.s11.czas4'):null));

    bpush(bsec(bObw+6));
    bpush(bnum(1,gpl('sprzedaz.s12.kons1'), isBilingual?g('sprzedaz.s12.kons1'):null));
    bpush(blit('a',gpl('sprzedaz.s12.konsa'), isBilingual?g('sprzedaz.s12.konsa'):null));
    bpush(blit('b',gpl('sprzedaz.s12.konsb'), isBilingual?g('sprzedaz.s12.konsb'):null));
    bpush(blit('c', gpl('sprzedaz.s12.konsc', {firma:FIRMA.nazwa}), isBilingual?g('sprzedaz.s12.konsc', {firma:FIRMA.nazwa}):null));
    bpush(bnum(2,
      isKupno ? gpl('sprzedaz.s12.kons2k') : gpl('sprzedaz.s12.kons2'),
      isBilingual ? (isKupno ? g('sprzedaz.s12.kons2k') : g('sprzedaz.s12.kons2')) : null
    ));
    bpush(bnum(3, gpl('sprzedaz.s12.kons3', {adres:FIRMA.krótka}), isBilingual?g('sprzedaz.s12.kons3', {adres:FIRMA.krótka}):null));

    bpush(bsec(bObw+7));
    bpush(bnum(1,gpl('sprzedaz.ostatni'), isBilingual?g('sprzedaz.ostatni'):null));

    // (plContent wypełniony bezpośrednio przez bpush/bilPush)

    // Podpisy
    const sigKlientLabel = isBilingual ? `PODPIS KLIENTA / ${g('sprzedaz.sig.klient')}` : gpl('sprzedaz.sig.klient');
    const sigAgentLabel  = isBilingual ? `PODPIS POŚREDNIKA / ${g('sprzedaz.sig.posrednik')}` : gpl('sprzedaz.sig.posrednik');
    content.push(sigRow(sigKlientLabel, sigAgentLabel));

    // ——— ZAŁĄCZNIKI ———
    function zalHeader(nr, tytulPL, podtytulPL, tytulTR, podtytulTR) {
      const items = [
        { canvas:[{type:'line',x1:0,y1:0,x2:495,y2:0,lineWidth:1,lineColor:'#1a2b5e'}], margin:[0,0,0,6] },
        { text:gpl('sprzedaz.zal.prefix')+nr + (isBilingual ? ' / '+g('sprzedaz.zal.prefix')+nr : ''), font:'Roboto', fontSize:10, bold:true, margin:[0,0,0,1] },
      ];
      if (isBilingual && tytulTR) {
        items.push(bilCol(
          { text:tytulPL, font:'Roboto', fontSize:9.5, bold:true, margin:[0,0,0,2] },
          { text:tytulTR, font:'Roboto', fontSize:9, bold:true, color:NAVY, margin:[0,0,0,2] }
        ));
        if (podtytulPL) items.push(bilCol(
          { text:podtytulPL, font:'Roboto', fontSize:8, italics:true, margin:[0,0,0,6] },
          podtytulTR ? { text:podtytulTR, font:'Roboto', fontSize:8, italics:true, color:NAVY, margin:[0,0,0,6] } : {text:'',margin:[0,0,0,6]}
        ));
        else items.push({ text:'', margin:[0,0,0,4] });
      } else {
        items.push({ text:tytulPL, font:'Roboto', fontSize:9.5, bold:true, margin:[0,0,0,2] });
        if (podtytulPL) items.push({ text:podtytulPL, font:'Roboto', fontSize:8, italics:true, margin:[0,0,0,6] });
        else items.push({ text:'', margin:[0,0,0,4] });
      }
      return items;
    }

    function sn(n,t,tTR) {
      const plEl = {columns:[{text:n+'.',width:12,fontSize:9},{text:t,fontSize:9,lineHeight:1.3,alignment:'justify'}],columnGap:2,margin:[0,0,0,3]};
      if (!isBilingual||!tTR) return plEl;
      return bilCol(plEl, {columns:[{text:n+'.',width:12,fontSize:ST,color:NAVY},{text:tTR,fontSize:ST,lineHeight:1.3,color:NAVY,alignment:'justify'}],columnGap:2,margin:[0,0,0,3]});
    }
    function sl(l,t,tTR) {
      const plEl = {columns:[{text:l+')',width:12,fontSize:9},{text:t,fontSize:9,lineHeight:1.3,alignment:'justify'}],columnGap:2,margin:[0,0,0,2],marginLeft:10};
      if (!isBilingual||!tTR) return plEl;
      return bilCol(plEl, {columns:[{text:l+')',width:12,fontSize:ST,color:NAVY},{text:tTR,fontSize:ST,lineHeight:1.3,color:NAVY,alignment:'justify'}],columnGap:2,margin:[0,0,0,2],marginLeft:10});
    }

    // ZAŁĄCZNIK 1
    content.push(pb());
    content.push(...zalHeader(1,
      gpl('sprzedaz.z1.title'),
      gpl('sprzedaz.z1.sub'),
      isBilingual ? g('sprzedaz.z1.title') : null,
      isBilingual ? g('sprzedaz.z1.sub') : null
    ));
    content.push(bilCol(
      { text: gpl('sprzedaz.z1.h1'), font:'Roboto', fontSize:9, bold:true, margin:[0,0,0,3] },
      isBilingual ? { text:g('sprzedaz.z1.h1'), font:'Roboto', fontSize:ST, bold:true, color:NAVY, margin:[0,0,0,3] } : null
    ));
    content.push(sn(1, gpl('sprzedaz.z1.s1'), isBilingual?g('sprzedaz.z1.s1'):null));
    content.push(sn(2, gpl('sprzedaz.z1.s2'), isBilingual?g('sprzedaz.z1.s2'):null));
    content.push(sn(3, gpl('sprzedaz.z1.s3', {firma:FIRMA.krótka, email:FIRMA.email}), isBilingual?g('sprzedaz.z1.s3', {firma:FIRMA.krótka, email:FIRMA.email}):null));
    content.push(sn(4, gpl('sprzedaz.z1.s4'), isBilingual?g('sprzedaz.z1.s4'):null));
    content.push(sn(5, gpl('sprzedaz.z1.s5'), isBilingual?g('sprzedaz.z1.s5'):null));
    content.push(bilCol(
      { text: gpl('sprzedaz.z1.h2'), font:'Roboto', fontSize:9, bold:true, margin:[0,4,0,3] },
      isBilingual ? { text:g('sprzedaz.z1.h2'), font:'Roboto', fontSize:ST, bold:true, color:NAVY, margin:[0,4,0,3] } : null
    ));
    content.push(sn(1, gpl('sprzedaz.z1.e1'), isBilingual?g('sprzedaz.z1.e1'):null));
    content.push(sn(2, gpl('sprzedaz.z1.e2'), isBilingual?g('sprzedaz.z1.e2'):null));
    content.push(sigRowDataKlient(d.data));

    // ZAŁĄCZNIK 2
    content.push({ text:'', margin:[0,14,0,0] });
    content.push(...zalHeader(2,
      gpl('sprzedaz.z2.title'),
      gpl('sprzedaz.z2.sub'),
      isBilingual ? g('sprzedaz.z2.title') : null,
      isBilingual ? g('sprzedaz.z2.sub') : null
    ));
    content.push(bilCol(
      { text: FIRMA.krótka, fontSize:9, margin:[0,0,0,6] },
      isBilingual ? tr(FIRMA.krótka) : null
    ));
    content.push(bilCol(
      { text: gpl('sprzedaz.z2.inf'), fontSize:9, margin:[0,0,0,8], alignment:'justify' },
      isBilingual ? tr(g('sprzedaz.z2.inf')) : null
    ));
    const z2fields = [
      [gpl('sprzedaz.z2.data'), isBilingual?g('sprzedaz.z2.data'):null],
      [gpl('sprzedaz.z2.imie'), isBilingual?g('sprzedaz.z2.imie'):null],
      [gpl('sprzedaz.z2.adres'), isBilingual?g('sprzedaz.z2.adres'):null],
    ];
    z2fields.forEach(([lbl,lTR]) => content.push(bilCol(
      [{text:lbl+':', fontSize:8.5, bold:true, margin:[0,2,0,0]},{text:'', fontSize:8.5, margin:[4,0,0,6]}],
      lTR ? [{text:lTR+':', fontSize:ST-0.5, bold:true, color:NAVY, margin:[0,2,0,0]},{text:'', fontSize:ST-0.5, margin:[4,0,0,6]}] : null
    )));
    content.push(bilCol(
      { stack:[{canvas:[{type:'line',x1:0,y1:0,x2:200,y2:0,lineWidth:0.8}]},{text:gpl('sprzedaz.z1.sig'),fontSize:8,bold:true,margin:[0,3,0,0]}], margin:[0,14,0,0] },
      isBilingual ? { stack:[{canvas:[{type:'line',x1:0,y1:0,x2:200,y2:0,lineWidth:0.8}]},{text:g('sprzedaz.z2.sig'),fontSize:ST-1,bold:true,color:NAVY,margin:[0,3,0,0]}], margin:[0,14,0,0] } : null
    ));
    content.push(bilCol(
      [{text:gpl('sprzedaz.z2.date')+':', fontSize:8.5, bold:true, margin:[0,4,0,0]},{text:'', fontSize:8.5, margin:[4,0,0,0]}],
      isBilingual ? [{text:(g('sprzedaz.z2.date')||'Date')+':', fontSize:ST-0.5, bold:true, color:NAVY, margin:[0,4,0,0]},{text:'', fontSize:ST-0.5, margin:[4,0,0,0]}] : null
    ));

    // ZAŁĄCZNIK 3
    const zadaRozpoczecia = document.getElementById('chk-zadanie-rozpoczecia') && document.getElementById('chk-zadanie-rozpoczecia').checked;
    content.push(pb());
    content.push(...zalHeader(3,
      gpl('sprzedaz.z3.title'),
      null,
      isBilingual ? g('sprzedaz.z3.title') : null,
      null
    ));
    const zal3Imie  = zadaRozpoczecia ? d.imie  : '.....................................';
    const zal3Adres = zadaRozpoczecia ? d.adres : 'ul. ......................., 00-00 .......................';
    const zal3Pesel = zadaRozpoczecia ? d.pesel : '.....';
    const zal3Dowod = zadaRozpoczecia ? d.dowod : '.........';
    const zal3textPL = [
      gpl('sprzedaz.z3.ja'), {text:zal3Imie,bold:true},
      gpl('sprzedaz.z3.zam'), {text:zal3Adres,bold:true},
      gpl('sprzedaz.z3.pesel_l'), {text:zal3Pesel,bold:true},
      gpl('sprzedaz.z3.leg'), {text:zal3Dowod,bold:true},
      gpl('sprzedaz.z3.tail', {firma:FIRMA.nazwa, nr:d.nr, data:d.data})
    ];
    content.push(bilCol(
      { text:zal3textPL, fontSize:9, lineHeight:1.35, margin:[0,0,0,10], alignment:'justify' },
      isBilingual ? { text: g('sprzedaz.z3.text', {imie:zal3Imie, adres:zal3Adres, pesel:zal3Pesel, dowod:zal3Dowod, firma:FIRMA.nazwa, nr:d.nr, data:d.data}), fontSize:ST, lineHeight:1.35, color:NAVY, margin:[0,0,0,10], alignment:'justify' } : null
    ));
    if (zadaRozpoczecia) {
      content.push(sigRowDataKlient(d.data));
    } else {
      content.push(bilCol(
        { stack:[{canvas:[{type:'line',x1:0,y1:0,x2:200,y2:0,lineWidth:0.8}]},{text:gpl('sprzedaz.z3.sig'),fontSize:8,bold:true,margin:[0,3,0,0]}], margin:[0,14,0,0] },
        isBilingual ? { stack:[{canvas:[{type:'line',x1:0,y1:0,x2:200,y2:0,lineWidth:0.8}]},{text:g('sprzedaz.z3.sig'),fontSize:ST-1,bold:true,color:NAVY,margin:[0,3,0,0]}], margin:[0,14,0,0] } : null
      ));
    }

    // ZAŁĄCZNIK 4 — RODO (tylko PL — dokument prawny)
    content.push({ canvas:[{type:'line',x1:0,y1:0,x2:495,y2:0,lineWidth:0.5,lineColor:'#aaa'}], margin:[0,10,0,8] });
    content.push(...zalHeader(4,
      gpl('sprzedaz.zal4.title'),
      gpl('sprzedaz.zal4.sub')
    ));
    content.push(sn(1, gpl('sprzedaz.zal4.ust1', {nazwa:FIRMA.nazwa, miasto:FIRMA.miasto, ulica:FIRMA.ulica, kod:FIRMA.kod})));
    content.push(sn(2, gpl('sprzedaz.zal4.ust2', {email:FIRMA.email, tel:FIRMA.tel})));
    content.push(sn(3, gpl('sprzedaz.zal4.ust3')));
    content.push({ text:gpl('sprzedaz.zal4.ust4head'), font:'Roboto', fontSize:S, lineHeight:LH, margin:[0,2,0,2], alignment:'justify' });
    content.push(sl('a', gpl('sprzedaz.zal4.ust4a')));
    content.push(sl('b', gpl('sprzedaz.zal4.ust4b')));
    content.push({ text:gpl('sprzedaz.zal4.ust4note'), font:'Roboto', fontSize:S, lineHeight:LH, margin:[0,3,0,3], alignment:'justify' });
    content.push({ text:gpl('sprzedaz.zal4.ust5head'), font:'Roboto', fontSize:S, lineHeight:LH, margin:[0,2,0,2] });
    content.push(sl('a', gpl('sprzedaz.zal4.ust5a')));
    content.push(sl('b', gpl('sprzedaz.zal4.ust5b')));
    content.push({ text:gpl('sprzedaz.zal4.ust6head'), font:'Roboto', fontSize:S, lineHeight:LH, margin:[0,2,0,2] });
    content.push(sl('a', gpl('sprzedaz.zal4.ust6a')));
    content.push(sl('b', gpl('sprzedaz.zal4.ust6b')));
    content.push(sl('c', gpl('sprzedaz.zal4.ust6c')));
    content.push(sl('d', gpl('sprzedaz.zal4.ust6d')));
    content.push(sl('e', gpl('sprzedaz.zal4.ust6e')));
    content.push(sn(7, gpl('sprzedaz.zal4.ust7')));
    content.push(sn(8, gpl('sprzedaz.zal4.ust8')));
    content.push(sn(9, gpl('sprzedaz.zal4.ust9')));
    content.push({ text:gpl('sprzedaz.zal4.ust10head'), font:'Roboto', fontSize:S, lineHeight:LH, margin:[0,2,0,2], alignment:'justify' });
    content.push(sl('a', gpl('sprzedaz.zal4.ust10a')));
    content.push(sl('b', gpl('sprzedaz.zal4.ust10b')));
    content.push(sl('c', gpl('sprzedaz.zal4.ust10c')));
    content.push(sl('d', gpl('sprzedaz.zal4.ust10d')));
    content.push(sn(11, gpl('sprzedaz.zal4.ust11')));
    content.push(sn(12, gpl('sprzedaz.zal4.ust12')));
    content.push(sn(13, gpl('sprzedaz.zal4.ust13')));
    content.push(sn(14, gpl('sprzedaz.zal4.ust14')));

    // ZAŁĄCZNIK 5 — polisa OC
    content.push(pb());
    content.push({ text:'', margin:[0,16,0,0] });
    content.push(...zalHeader(5,
      gpl('sprzedaz.zal5.title'),
      gpl('sprzedaz.zal5.sub')
    ));
    if (ocData && ocData.startsWith('data:image/')) {
      content.push({ image: ocData, width: 360, alignment:'center', margin:[0,4,0,0] });
    } else {
      content.push({ text:gpl('sprzedaz.zal.oc_placeholder'), fontSize:9, italics:true, alignment:'center', margin:[0,16,0,16] });
    }

    // ZAŁĄCZNIK 6+7 — PEP + RODO zgoda (na jednej stronie)
    content.push(pb());
    // ── PEP (bilingual) ──
    content.push(...zalHeader(6, gpl('sprzedaz.zal.pep.title'), null, isBilingual ? g('sprzedaz.zal.pep.title') : null, null));
    bilPush(content, { text:`${gpl('sprzedaz.zal.pep.imie')}: ${d.imie}`, font:'Roboto', fontSize:8.5, margin:[0,0,0,5] }, isBilingual?{text:`${g('sprzedaz.zal.pep.imie')}: ${d.imie}`, font:'Roboto', fontSize:8.5, margin:[0,0,0,5]}:null);
    bilPush(content, { columns:[
      { text:`1. ${gpl('sprzedaz.zal.pep.q1')}`, font:'Roboto', fontSize:8.5, lineHeight:1.25, width:'*' },
      { text:`${d.ck(d.pep1,'TAK')} TAK   ${d.ck(d.pep1,'NIE')} NIE`, font:'Roboto', fontSize:8.5, width:80, alignment:'right' },
    ], columnGap:6, margin:[0,0,0,3] }, isBilingual?{ columns:[
      { text:`1. ${g('sprzedaz.zal.pep.q1')}`, font:'Roboto', fontSize:8.5, lineHeight:1.25, width:'*' },
      { text:`${d.ck(d.pep1,'TAK')} TAK   ${d.ck(d.pep1,'NIE')} NIE`, font:'Roboto', fontSize:8.5, width:80, alignment:'right' },
    ], columnGap:6, margin:[0,0,0,3] }:null);
    bilPush(content, { columns:[
      { text:`2. ${gpl('sprzedaz.zal.pep.q2')}`, font:'Roboto', fontSize:8.5, lineHeight:1.25, width:'*' },
      { text:`${d.ck(d.pep2,'TAK')} TAK   ${d.ck(d.pep2,'NIE')} NIE`, font:'Roboto', fontSize:8.5, width:80, alignment:'right' },
    ], columnGap:6, margin:[0,0,0,3] }, isBilingual?{ columns:[
      { text:`2. ${g('sprzedaz.zal.pep.q2')}`, font:'Roboto', fontSize:8.5, lineHeight:1.25, width:'*' },
      { text:`${d.ck(d.pep2,'TAK')} TAK   ${d.ck(d.pep2,'NIE')} NIE`, font:'Roboto', fontSize:8.5, width:80, alignment:'right' },
    ], columnGap:6, margin:[0,0,0,3] }:null);
    bilPush(content, { columns:[
      { text:`3. ${gpl('sprzedaz.zal.pep.q3')}`, font:'Roboto', fontSize:8.5, lineHeight:1.25, width:'*' },
      { text:`${d.ck(d.pep3,'TAK')} TAK   ${d.ck(d.pep3,'NIE')} NIE`, font:'Roboto', fontSize:8.5, width:80, alignment:'right' },
    ], columnGap:6, margin:[0,0,0,3] }, isBilingual?{ columns:[
      { text:`3. ${g('sprzedaz.zal.pep.q3')}`, font:'Roboto', fontSize:8.5, lineHeight:1.25, width:'*' },
      { text:`${d.ck(d.pep3,'TAK')} TAK   ${d.ck(d.pep3,'NIE')} NIE`, font:'Roboto', fontSize:8.5, width:80, alignment:'right' },
    ], columnGap:6, margin:[0,0,0,3] }:null);
    bilPush(content, { text: gpl('sprzedaz.zal.pep.uwaga'), font:'Roboto', fontSize:7.5, italics:true, margin:[0,0,0,4] }, isBilingual?{text: g('sprzedaz.zal.pep.uwaga'), font:'Roboto', fontSize:7.5, italics:true, margin:[0,0,0,4]}:null);
    if (d.pepSources && d.pepSources.length > 0) {
      content.push({ text:gpl('sprzedaz.zal.pep.sources')+' '+d.pepSources.join(', '), font:'Roboto', fontSize:8.5, margin:[0,0,0,4] });
    }
    content.push(sigRowDataKlient(d.data));
    // ── separator ──
    content.push({ canvas:[{type:'line',x1:0,y1:0,x2:495,y2:0,lineWidth:0.3,lineColor:'#ccc'}], margin:[0,6,0,6] });
    // ── RODO zgoda (bilingual) ──
    content.push(...zalHeader(7, gpl('sprzedaz.zal.rodo.title'), null, isBilingual ? g('sprzedaz.zal.rodo.title') : null, null));
    bilPush(content, { text:`${gpl('sprzedaz.zal.rodo.imie')}: ${d.imie}`, font:'Roboto', fontSize:8.5, margin:[0,0,0,4] }, isBilingual?{text:`${g('sprzedaz.zal.rodo.imie')}: ${d.imie}`, font:'Roboto', fontSize:8.5, margin:[0,0,0,4]}:null);
    const rodoItemsPL = [
      ['0', `${gpl('sprzedaz.zal.rodo.gen')} ${FIRMA.nazwa} ${gpl('sprzedaz.zal.rodo.scope')}`, d.rodo0],
      ['1', gpl('sprzedaz.zal.rodo.1'), d.rodo1],
      ['2', gpl('sprzedaz.zal.rodo.2'), d.rodo2],
      ['3', gpl('sprzedaz.zal.rodo.3'), d.rodo3],
      ['4', gpl('sprzedaz.zal.rodo.4'), d.rodo4],
    ];
    const rodoItemsTR = isBilingual ? [
      ['0', `${g('sprzedaz.zal.rodo.gen')} ${FIRMA.nazwa} ${g('sprzedaz.zal.rodo.scope')}`, d.rodo0],
      ['1', g('sprzedaz.zal.rodo.1'), d.rodo1],
      ['2', g('sprzedaz.zal.rodo.2'), d.rodo2],
      ['3', g('sprzedaz.zal.rodo.3'), d.rodo3],
      ['4', g('sprzedaz.zal.rodo.4'), d.rodo4],
    ] : null;
    rodoItemsPL.forEach(([nr, txt, val], i) => {
      const trItem = rodoItemsTR ? rodoItemsTR[i] : null;
      const plEl = { columns:[
        { text: (nr==='0'?gpl('sprzedaz.zal.rodo.gen_label'):'  '+nr+'.'), fontSize:8, bold:true, width:nr==='0'?76:14 },
        { text: txt, fontSize:8, lineHeight:1.2, width:'*', alignment:'justify' },
        { text: `${d.ck(val,'TAK')} TAK  ${d.ck(val,'NIE')} NIE`, fontSize:8, width:66, alignment:'right' },
      ], columnGap:4, margin:[0,0,0,4] };
      if (trItem) {
        const trEl = { columns:[
          { text: (nr==='0'?g('sprzedaz.zal.rodo.gen_label'):'  '+nr+'.'), fontSize:8, bold:true, width:nr==='0'?52:14 },
          { text: trItem[1], fontSize:8, lineHeight:1.2, width:'*', alignment:'justify' },
          { text: `${d.ck(val,'TAK')} TAK  ${d.ck(val,'NIE')} NIE`, fontSize:8, width:66, alignment:'right' },
        ], columnGap:4, margin:[0,0,0,4] };
        bilPush(content, plEl, trEl);
      } else {
        content.push(plEl);
      }
    });
    content.push(sigRowDataKlient(d.data));

    // ZAŁĄCZNIK 8 — Karty prezentacji (tylko kupno)
    if (isKupno && d.prezentacje && d.prezentacje.length > 0) {
      content.push(pb());
      content.push(...zalHeader(8, gpl('sprzedaz.zal8.title'), null));
      d.prezentacje.forEach(p => {
        content.push({ text:gpl('sprzedaz.zal8.header', {idx:p.idx, adres:p.adres}), font:'Roboto', fontSize:9, bold:true, margin:[0,8,0,4] });
        content.push({ columns:[
          { stack:[{text:gpl('sprzedaz.zal8.f_data'), fontSize:8.5,bold:true,margin:[0,0,0,1]},{text:p.data||'—',fontSize:8.5,margin:[0,0,0,0]}], width:'25%' },
          { stack:[{text:gpl('sprzedaz.zal8.f_cena'), fontSize:8.5,bold:true,margin:[0,0,0,1]},{text:p.cena||'—',fontSize:8.5,margin:[0,0,0,0]}], width:'25%' },
          { stack:[{text:gpl('sprzedaz.zal8.f_pow'), fontSize:8.5,bold:true,margin:[0,0,0,1]},{text:p.pow||'—',fontSize:8.5,margin:[0,0,0,0]}], width:'25%' },
          { stack:[{text:gpl('sprzedaz.zal8.f_rodzaj'), fontSize:8.5,bold:true,margin:[0,0,0,1]},{text:p.rodzaj||'—',fontSize:8.5,margin:[0,0,0,0]}], width:'25%' },
        ], columnGap:8, margin:[0,0,0,4] });
        if (p.uwagi) content.push({ text:gpl('sprzedaz.zal8.uwagi_prefix')+p.uwagi, fontSize:8.5, italics:true, margin:[0,0,0,4] });
        content.push({ text:gpl('sprzedaz.zal8.confirm'), style:'body', margin:[0,6,0,0] });
        content.push(sigRow(gpl('sprzedaz.zal8.sig_klient'), gpl('sprzedaz.zal8.sig_pos')));
      });
    }

    const safeName = (v('klient_imie') || 'klient').replace(/\s+/g,'_').replace(/[^a-zA-Z0-9_]/g,'');
    const typeLabel = isKupno ? 'kupno' : isExcl ? 'ekskluzywna' : 'otwarta';
    const langSuffix = isBilingual ? '_'+selectedContractLang.toUpperCase() : '';
    const fileName = `Umowa_${typeLabel}_${safeName}_${d.nr.replace(/\//g,'-')}${langSuffix}.pdf`;

    // Złącz stronę PL z tłumaczeniem (strona po stronie)
    let finalContent;
    if (isBilingual && trContent.length > 0) {
      // Nagłówek strony tłumaczenia
      const langName = 'ENGLISH';
      const trPageHeader = [
        { text:'', pageBreak:'before' },
        { canvas:[{type:'rect',x:0,y:0,w:495,h:3,color:'#2d5a8e',r:0}], margin:[0,0,0,12] },
        { text: contractTitleTR, style:'title', color:'#2d5a8e', italics:true },
        { text: g('sprzedaz.subtitle') ? '('+g('sprzedaz.subtitle')+')' : '', style:'subtitle', color:'#2d5a8e', italics:true },
        { text:'NR '+d.nr, style:'nr' },
        { text:`${langFlag[selectedContractLang]}  ${langName}`, fontSize:8.5, bold:true, color:'#333', margin:[0,2,0,4] },
        { canvas:[{type:'line',x1:0,y1:0,x2:495,y2:0,lineWidth:0.4,lineColor:'#b8c4d8'}], margin:[0,0,0,6] },
      ];
      finalContent = [...plContent, ...trPageHeader, ...trContent];
    } else {
      finalContent = plContent;
    }

    const docDef = {
      pageSize: 'A4',
      pageMargins: [50, 8, 50, 45],
      defaultStyle: { font:PF, fontSize:10, lineHeight:1.35 },
      styles,
      content: finalContent,
      footer: (currentPage, pageCount) => ({
        columns:[
          { text:`${FIRMA.stopka} | NR ${d.nr}`, fontSize:7, color:'#999', margin:[50,0,0,0] },
          { text:`Strona ${currentPage} z ${pageCount}`, fontSize:7, color:'#999', alignment:'right', margin:[0,0,50,0] },
        ]
      }),
    };

    pdfMake.createPdf(docDef).download(fileName);
    try { startAddRecent(contractLabel(isExcl, isKupno), (v('klient_imie')||'Klient') + ' — ' + fileName.replace('.pdf',''), 'generator'); } catch(e){}

  } catch(err) {
    console.error(err);
    alert('Błąd generowania PDF: ' + err.message);
  } finally {
    HEX.hideSpinner();
  }
}
function prefillAnkietaFromGenerator() {
  if (typeof window.ankietaPrefill === 'function') { window.ankietaPrefill(); return; }
  HEX.toast('Ankieta — moduł w przygotowaniu');
}

  // ── Init (onActivate) ──
  function init() {
    render();
    initFirmaPanel();
    initLangState();
    const dataField = document.getElementById('data_umowy');
    if (dataField && !dataField.value) {
      const t = new Date();
      dataField.value = t.getFullYear() + '-' + String(t.getMonth()+1).padStart(2,'0') + '-' + String(t.getDate()).padStart(2,'0');
    }
    showPage(1); updateStep(1);
  }

  HEX.registerModule('sprzedaz', { onActivate: init });

  // ── Public API ──
  return {
    selectContract, setProwizjaTyp, selectS5, updateBadge, setKlientTyp, togglePelnom, addPrezentacja, removePrezentacja, goNext, goBack, clearSig, ocDeletePolisa, handleOCFile, generatePDF, resetGenerator, selectContractLang, toggleZadanieRozpoczecia, toggleFirmaPanel, applyFirmaSettings, resetFirmaToDefault, loadSelectedProfile, toggleLangFeature, prefillAnkietaFromGenerator,
  };

})();
