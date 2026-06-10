// ═══════════════════════════════════════════════════════════════════
// najem.js — HEX Dokumenty v4.0
// Generator umów pośrednictwa w najmie (najemca / wynajmujący)
// Architektura: namespace NAJEM, rejestracja HEX.registerModule
// ═══════════════════════════════════════════════════════════════════

const NAJEM = (() => {

  // ── Stan modułu ──
  let selectedType  = null; // 'najemca' | 'wynajmujacy'
  let currentPage   = 1;
  let prowizjaTyp   = 'pct';
  let s5Wariant     = 'jednorazowo';
  let ocImageData   = null;

  // ── Render HTML ──
  function render() {
    const root = document.getElementById('najem-root');
    if (!root) return;
    root.innerHTML = `
<!-- ═══ STEPPER ═══ -->
<div class="steps" id="najem-stepper">
  <div class="step" id="najem-step1"><span class="step-num">1</span><span class="step-label">Rodzaj</span></div>
  <div class="step" id="najem-step2"><span class="step-num">2</span><span class="step-label">Klient</span></div>
  <div class="step" id="najem-step3"><span class="step-num">3</span><span class="step-label">Umowa</span></div>
  <div class="step" id="najem-step4"><span class="step-num">4</span><span class="step-label">PEP/RODO</span></div>
  <div class="step" id="najem-step5"><span class="step-num">5</span><span class="step-label">Podpisy</span></div>
  <div class="step" id="najem-step6"><span class="step-num">6</span><span class="step-label">Podsumowanie</span></div>
</div>

<!-- ═══ KROK 1: Rodzaj umowy ═══ -->
<div class="page" id="najem-page1">
  <div class="card">
    <h3 class="card-title">Rodzaj umowy pośrednictwa</h3>
    <div class="contract-options" id="najem-contract-options">
      <div class="contract-option" id="najem-opt-najemca" onclick="NAJEM.selectType('najemca')">
        <div class="contract-icon">🔍</div>
        <div class="contract-name">Pośrednictwo w poszukiwaniu najmu</div>
        <div class="contract-desc">Klient szuka mieszkania do wynajęcia</div>
      </div>
      <div class="contract-option" id="najem-opt-wynajmujacy" onclick="NAJEM.selectType('wynajmujacy')">
        <div class="contract-icon">🏠</div>
        <div class="contract-name">Pośrednictwo w najmie</div>
        <div class="contract-desc">Klient wynajmuje swoją nieruchomość</div>
      </div>
    </div>
    <div class="nav-row">
      <button class="btn btn-primary" id="najem-next1" disabled onclick="NAJEM.goNext(1)">Dalej →</button>
    </div>
  </div>
</div>

<!-- ═══ KROK 2: Dane klienta ═══ -->
<div class="page" id="najem-page2">
  <div class="card">
    <h3 class="card-title">Dane klienta</h3>
    <div class="lang-strip" style="margin-bottom:16px;">
      <button class="lang-btn active" id="najem-btn-klient-pryw" onclick="NAJEM.setKlientTyp('pryw')">Osoba prywatna</button>
      <button class="lang-btn" id="najem-btn-klient-firma" onclick="NAJEM.setKlientTyp('firma')">Firma</button>
    </div>
    <div class="form-grid">
      <div class="field">
        <label id="n_lbl_imie">Imię i nazwisko *</label>
        <input type="text" id="n_klient_imie" placeholder="Jan Kowalski">
      </div>
      <div class="field">
        <label id="n_lbl_adres">Adres zamieszkania *</label>
        <input type="text" id="n_klient_adres" placeholder="ul. Przykładowa 1, 80-001 Gdańsk">
      </div>
      <div class="field">
        <label id="n_lbl_pesel">PESEL *</label>
        <input type="text" id="n_klient_pesel" placeholder="00000000000">
      </div>
      <div class="field">
        <label id="n_lbl_dowod">Nr dokumentu tożsamości *</label>
        <input type="text" id="n_klient_dowod" placeholder="ABC123456">
      </div>
      <div class="field">
        <label>Adres e-mail</label>
        <input type="email" id="n_klient_email" placeholder="jan@example.com">
      </div>
      <div class="field">
        <label>Telefon</label>
        <input type="tel" id="n_klient_telefon" placeholder="+48 500 000 000">
      </div>
    </div>
    <div class="field" style="margin-top:8px;">
      <label>
        <input type="checkbox" id="n_chk_pelnom" onchange="NAJEM.togglePelnom(this.checked)">
        Klient działa przez pełnomocnika
      </label>
    </div>
    <div id="najem-pelnom-section" style="display:none; margin-top:12px;">
      <div class="form-grid">
        <div class="field">
          <label>Imię i nazwisko pełnomocnika</label>
          <input type="text" id="n_pelnom_imie">
        </div>
        <div class="field">
          <label>Adres pełnomocnika</label>
          <input type="text" id="n_pelnom_adres">
        </div>
      </div>
    </div>
    <div class="nav-row">
      <button class="btn btn-ghost" onclick="NAJEM.goBack(2)">← Wstecz</button>
      <button class="btn btn-primary" onclick="NAJEM.goNext(2)">Dalej →</button>
    </div>
  </div>
</div>

<!-- ═══ KROK 3: Warunki umowy ═══ -->
<div class="page" id="najem-page3">
  <div class="card">
    <h3 class="card-title">Warunki umowy</h3>
    <div class="form-grid">
      <div class="field">
        <label>Data zawarcia umowy</label>
        <input type="date" id="n_data_umowy">
      </div>
      <div class="field">
        <label>Miejsce zawarcia umowy</label>
        <input type="text" id="n_miejsce_umowy" placeholder="Gdańsk">
      </div>
      <div class="field">
        <label>Nr umowy (opcjonalnie)</label>
        <input type="text" id="n_nr_umowy" placeholder="001">
      </div>
      <div class="field">
        <label>Czas trwania (miesięcy)</label>
        <input type="number" id="n_czas_trwania" placeholder="3" min="1">
      </div>
    </div>

    <!-- Wynagrodzenie -->
    <div class="section-label" style="margin-top:16px;">Wynagrodzenie pośrednika</div>
    <div class="lang-strip" style="margin-bottom:8px;">
      <button class="lang-btn active" id="n_btn-pct" onclick="NAJEM.setProwizjaTyp('pct')">%</button>
      <button class="lang-btn" id="n_btn-zl" onclick="NAJEM.setProwizjaTyp('zl')">zł</button>
    </div>
    <div class="field">
      <input type="number" id="n_wynagrodzenie" placeholder="100" oninput="NAJEM.updateBadge()">
      <span class="form-hint" id="n_prowizja-hint"></span>
    </div>

    <!-- Wariant płatności §5 -->
    <div class="section-label" style="margin-top:16px;">Wariant płatności</div>
    <div class="contract-options" style="gap:8px;">
      <div class="contract-option selected" id="n_opt-s5-jednorazowo" onclick="NAJEM.selectS5('jednorazowo')">
        <div class="contract-name">Jednorazowo</div>
        <div class="contract-desc">100% po zawarciu umowy najmu</div>
      </div>
      <div class="contract-option" id="n_opt-s5-zaliczka" onclick="NAJEM.selectS5('zaliczka')">
        <div class="contract-name">Zaliczka</div>
        <div class="contract-desc">50% zaliczki + 50% po zawarciu</div>
      </div>
    </div>

    <!-- Pola nieruchomości (tylko wynajmujący) -->
    <div id="najem-nieruch-fields" style="display:none; margin-top:16px;">
      <div class="section-label">Nieruchomość</div>
      <div class="form-grid">
        <div class="field">
          <label>Adres nieruchomości</label>
          <input type="text" id="n_nieruch_adres" placeholder="ul. Przykładowa 1/2, Gdańsk">
        </div>
        <div class="field">
          <label>Rodzaj nieruchomości</label>
          <input type="text" id="n_nieruch_rodzaj" placeholder="mieszkanie, dom, lokal...">
        </div>
        <div class="field">
          <label>Powierzchnia (m²)</label>
          <input type="number" id="n_nieruch_pow" placeholder="50">
        </div>
        <div class="field">
          <label>Czynsz ofertowy (zł/mc)</label>
          <input type="number" id="n_nieruch_czynsz" placeholder="2500">
        </div>
      </div>
    </div>

    <!-- E-mail do faktury -->
    <div class="field" style="margin-top:16px;">
      <label>E-mail do faktury VAT (e-faktura)</label>
      <input type="email" id="n_fakt_email" placeholder="jan@example.com">
    </div>

    <div class="nav-row">
      <button class="btn btn-ghost" onclick="NAJEM.goBack(3)">← Wstecz</button>
      <button class="btn btn-primary" onclick="NAJEM.goNext(3)">Dalej →</button>
    </div>
  </div>
</div>

<!-- ═══ KROK 4: PEP + RODO ═══ -->
<div class="page" id="najem-page4">
  <div class="card">
    <h3 class="card-title">Oświadczenia PEP i zgody RODO</h3>

    <div class="section-label">Oświadczenie PEP</div>
    <div class="field">
      <label>Imię i nazwisko klienta</label>
      <input type="text" id="n_pep_imie" readonly>
    </div>

    <div class="pep-question">
      <span>1. Czy jest Pani/Pan osobą zajmującą eksponowane stanowiska polityczne?</span>
      <label><input type="radio" name="n_pep1" value="TAK"> TAK</label>
      <label><input type="radio" name="n_pep1" value="NIE" checked> NIE</label>
    </div>
    <div class="pep-question">
      <span>2. Czy jest Pani/Pan członkiem rodziny takiej osoby?</span>
      <label><input type="radio" name="n_pep2" value="TAK"> TAK</label>
      <label><input type="radio" name="n_pep2" value="NIE" checked> NIE</label>
    </div>
    <div class="pep-question">
      <span>3. Czy jest Pani/Pan bliskim współpracownikiem takiej osoby?</span>
      <label><input type="radio" name="n_pep3" value="TAK"> TAK</label>
      <label><input type="radio" name="n_pep3" value="NIE" checked> NIE</label>
    </div>

    <div class="section-label" style="margin-top:20px;">Zgody RODO</div>
    <div class="rodo-item">
      <span>Zgoda ogólna na przetwarzanie danych w celach pośrednictwa</span>
      <label><input type="radio" name="n_rodo0" value="TAK"> TAK</label>
      <label><input type="radio" name="n_rodo0" value="NIE" checked> NIE</label>
    </div>
    <div class="rodo-item">
      <span>1. Przekazanie danych do kancelarii notarialnej</span>
      <label><input type="radio" name="n_rodo1" value="TAK"> TAK</label>
      <label><input type="radio" name="n_rodo1" value="NIE" checked> NIE</label>
    </div>
    <div class="rodo-item">
      <span>2. Przekazanie numeru KW zainteresowanej stronie</span>
      <label><input type="radio" name="n_rodo2" value="TAK"> TAK</label>
      <label><input type="radio" name="n_rodo2" value="NIE" checked> NIE</label>
    </div>
    <div class="rodo-item">
      <span>3. Przesyłanie informacji handlowych drogą elektroniczną</span>
      <label><input type="radio" name="n_rodo3" value="TAK"> TAK</label>
      <label><input type="radio" name="n_rodo3" value="NIE" checked> NIE</label>
    </div>
    <div class="rodo-item">
      <span>4. Cele marketingowe</span>
      <label><input type="radio" name="n_rodo4" value="TAK"> TAK</label>
      <label><input type="radio" name="n_rodo4" value="NIE" checked> NIE</label>
    </div>

    <div class="nav-row">
      <button class="btn btn-ghost" onclick="NAJEM.goBack(4)">← Wstecz</button>
      <button class="btn btn-primary" onclick="NAJEM.goNext(4)">Dalej →</button>
    </div>
  </div>
</div>

<!-- ═══ KROK 5: Podpisy + OC ═══ -->
<div class="page" id="najem-page5">
  <div class="card">
    <h3 class="card-title">Podpisy i polisa OC</h3>

    <div class="section-label">Podpis klienta</div>
    <div class="sig-wrap" id="n-sig-klient-wrap">
      <canvas id="najemSigKlient" class="sig-canvas" width="700" height="200"></canvas>
      <div class="sig-actions">
        <button class="btn btn-ghost sig-clear-btn" onclick="NAJEM.clearSig('klient')">✕ Wyczyść</button>
        <span class="sig-hint">← Podpisz tutaj</span>
      </div>
    </div>

    <div class="section-label" style="margin-top:16px;">Podpis agenta</div>
    <div class="sig-wrap" id="n-sig-agent-wrap">
      <canvas id="najemSigAgent" class="sig-canvas" width="700" height="200"></canvas>
      <div class="sig-actions">
        <button class="btn btn-ghost sig-clear-btn" onclick="NAJEM.clearSig('agent')">✕ Wyczyść</button>
        <span class="sig-hint">← Podpisz tutaj</span>
      </div>
    </div>

    <div class="section-label" style="margin-top:20px;">Polisa OC pośrednika</div>
    <div id="n-oc-preview-wrap">
      <img id="n-oc-preview" src="" alt="Polisa OC" style="display:none; max-width:100%; border-radius:6px; margin-bottom:8px;">
      <button id="n-oc-delete-btn" class="btn btn-ghost" style="display:none;" onclick="NAJEM.deletePolisa()">🗑 Usuń polisę</button>
    </div>
    <div id="n-oc-upload-wrap">
      <label class="btn btn-ghost">
        📎 Wgraj polisę OC (PNG / JPG)
        <input type="file" id="n-oc-file-input" accept="image/png,image/jpeg" style="display:none;" onchange="NAJEM.handleOCFile(event)">
      </label>
    </div>

    <div class="nav-row">
      <button class="btn btn-ghost" onclick="NAJEM.goBack(5)">← Wstecz</button>
      <button class="btn btn-primary" onclick="NAJEM.goNext(5)">Dalej →</button>
    </div>
  </div>
</div>

<!-- ═══ KROK 6: Podsumowanie ═══ -->
<div class="page" id="najem-page6">
  <div class="card">
    <h3 class="card-title">Podsumowanie</h3>
    <div id="najem-summary-box" class="summary-box"></div>
    <div class="nav-row" style="margin-top:20px; flex-wrap:wrap; gap:10px;">
      <button class="btn btn-ghost" onclick="NAJEM.goBack(6)">← Wstecz</button>
      <button class="btn btn-primary" onclick="NAJEM.generatePDF()">⬇ Generuj PDF</button>
      <button class="btn btn-ghost" onclick="NAJEM.reset()">🔄 Nowa umowa</button>
    </div>
  </div>
</div>
    `;
  }

  // ── Inicjalizacja ──
  function init() {
    render();
    showPage(1);
  }

  // ── Wybór typu ──
  function selectType(type) {
    selectedType = type;
    document.querySelectorAll('#najem-contract-options .contract-option').forEach(el => el.classList.remove('selected'));
    document.getElementById('najem-opt-' + type)?.classList.add('selected');
    document.getElementById('najem-next1').disabled = false;
  }

  // ── Nawigacja ──
  function goNext(from) {
    if (from === 1 && !selectedType) { alert('Wybierz rodzaj umowy.'); return; }
    if (from === 2) {
      const imie  = document.getElementById('n_klient_imie')?.value.trim();
      const adres = document.getElementById('n_klient_adres')?.value.trim();
      if (!imie || !adres) { alert('Uzupełnij wymagane pola danych klienta.'); return; }
      const pepImie = document.getElementById('n_pep_imie');
      if (pepImie) pepImie.value = imie;
    }
    showPage(from + 1);
  }

  function goBack(from) { showPage(from - 1); }

  function showPage(n) {
    currentPage = n;
    document.querySelectorAll('#najem-root .page').forEach(p => p.classList.remove('active'));
    document.getElementById('najem-page' + n)?.classList.add('active');
    for (let i = 1; i <= 6; i++) {
      const stepEl = document.getElementById('najem-step' + i);
      if (!stepEl) continue;
      stepEl.classList.remove('active', 'done');
      if (i < n)      stepEl.classList.add('done');
      else if (i === n) stepEl.classList.add('active');
    }
    window.scrollTo(0, 0);
    if (n === 3) updateNieruchFields();
    if (n === 5) { setTimeout(initSigPads, 100); initOC(); }
    if (n === 6) buildSummary();
  }

  // ── Typ klienta (pryw/firma) ──
  function setKlientTyp(typ) {
    const isF = typ === 'firma';
    const btnPryw  = document.getElementById('najem-btn-klient-pryw');
    const btnFirma = document.getElementById('najem-btn-klient-firma');
    if (btnPryw)  { btnPryw.classList.toggle('active', !isF); }
    if (btnFirma) { btnFirma.classList.toggle('active', isF); }
    document.getElementById('n_lbl_imie').textContent  = isF ? 'Nazwa firmy *'        : 'Imię i nazwisko *';
    document.getElementById('n_lbl_adres').textContent = isF ? 'Siedziba firmy *'      : 'Adres zamieszkania *';
    document.getElementById('n_lbl_pesel').textContent = isF ? 'NIP'                   : 'PESEL *';
    document.getElementById('n_lbl_dowod').textContent = isF ? 'Nr KRS/REGON'          : 'Nr dokumentu tożsamości *';
  }

  function togglePelnom(checked) {
    document.getElementById('najem-pelnom-section').style.display = checked ? 'block' : 'none';
  }

  // ── Prowizja ──
  function setProwizjaTyp(typ) {
    prowizjaTyp = typ;
    document.getElementById('n_btn-pct').classList.toggle('active', typ === 'pct');
    document.getElementById('n_btn-zl').classList.toggle('active',  typ === 'zl');
    updateBadge();
  }

  function selectS5(wariant) {
    s5Wariant = wariant;
    document.getElementById('n_opt-s5-jednorazowo').classList.toggle('selected', wariant === 'jednorazowo');
    document.getElementById('n_opt-s5-zaliczka').classList.toggle('selected',    wariant === 'zaliczka');
  }

  function updateBadge() {
    const val  = document.getElementById('n_wynagrodzenie')?.value || '';
    const hint = document.getElementById('n_prowizja-hint');
    if (hint && val) hint.textContent = prowizjaTyp === 'pct' ? val + '% kwoty miesięcznego czynszu' : val + ' zł brutto';
  }

  // ── Nieruchomość (tylko wynajmujący) ──
  function updateNieruchFields() {
    const el = document.getElementById('najem-nieruch-fields');
    if (el) el.style.display = selectedType === 'wynajmujacy' ? 'block' : 'none';
  }

  // ── Podpisy ──
  function initSigPads() {
    HEX.initSig('najemSigKlient');
    HEX.initSig('najemSigAgent');
  }

  function clearSig(which) {
    const id = which === 'klient' ? 'najemSigKlient' : 'najemSigAgent';
    HEX.clearSig(id);
  }

  function getSigCanvas(id) {
    return document.getElementById(id);
  }

  // ── OC ──
  function initOC() {
    if (!ocImageData && typeof DEFAULT_POLISA_B64 !== 'undefined') {
      ocImageData = 'data:image/png;base64,' + DEFAULT_POLISA_B64;
    }
    renderOC();
  }

  function renderOC() {
    const img    = document.getElementById('n-oc-preview');
    const btnDel = document.getElementById('n-oc-delete-btn');
    const upWrap = document.getElementById('n-oc-upload-wrap');
    if (!img || !btnDel || !upWrap) return;
    if (ocImageData) {
      img.src              = ocImageData;
      img.style.display    = 'block';
      btnDel.style.display = 'inline-block';
      upWrap.style.display = 'none';
      const inp = document.getElementById('n-oc-file-input');
      if (inp) inp.value = '';
    } else {
      img.src              = '';
      img.style.display    = 'none';
      btnDel.style.display = 'none';
      upWrap.style.display = 'block';
    }
  }

  function deletePolisa() {
    ocImageData = null;
    renderOC();
    HEX.toast('Polisa OC usunięta — wgraj nową');
  }

  function handleOCFile(e) {
    const file = (e.target || e).files[0];
    if (!file) return;
    if (!['image/png', 'image/jpeg'].includes(file.type)) {
      HEX.toast('❌ Dozwolone formaty: PNG, JPG, JPEG');
      if (e.target) e.target.value = '';
      return;
    }
    const reader = new FileReader();
    reader.onload = ev => {
      ocImageData = ev.target.result;
      renderOC();
      HEX.toast('✓ Polisa OC wczytana');
    };
    reader.readAsDataURL(file);
  }

  // ── Podsumowanie ──
  function buildSummary() {
    updateNieruchFields();
    const nv = id => document.getElementById(id)?.value || '—';
    const isW = selectedType === 'wynajmujacy';
    const typLabel    = isW ? 'Pośrednictwo w najmie (Wynajmujący)' : 'Pośrednictwo w poszukiwaniu najmu (Najemca)';
    const prowizjaVal = nv('n_wynagrodzenie');
    const prowizjaStr = prowizjaVal !== '—' ? prowizjaVal + (prowizjaTyp === 'pct' ? '%' : ' zł') : '—';
    const rows = [
      ['Rodzaj umowy',   typLabel],
      ['Klient',         nv('n_klient_imie')],
      ['Data / Miejsce', (nv('n_data_umowy') || '—') + ' / ' + (nv('n_miejsce_umowy') || '—')],
      ['Nr umowy',       nv('n_nr_umowy')],
    ];
    if (isW) {
      rows.push(['Adres nieruchomości', nv('n_nieruch_adres')]);
      rows.push(['Czynsz ofertowy',     nv('n_nieruch_czynsz') !== '—' ? nv('n_nieruch_czynsz') + ' zł/mc' : '—']);
    }
    rows.push(['Wynagrodzenie', prowizjaStr]);
    if (nv('n_czas_trwania') !== '—') rows.push(['Czas trwania', nv('n_czas_trwania') + ' miesięcy']);
    rows.push(['Wariant płatności', s5Wariant === 'jednorazowo' ? '100% po zawarciu umowy najmu' : 'Zaliczka 50% + dopłata 50%']);

    const box = document.getElementById('najem-summary-box');
    if (box) box.innerHTML = rows.map(([k, v]) =>
      `<div class="summary-row"><span class="summary-key">${k}</span><span class="summary-val">${v}</span></div>`
    ).join('');
  }

  // ── Reset ──
  function reset() {
    selectedType  = null;
    currentPage   = 1;
    prowizjaTyp   = 'pct';
    s5Wariant     = 'jednorazowo';
    ocImageData   = null;
    document.querySelectorAll('#najem-contract-options .contract-option').forEach(el => el.classList.remove('selected'));
    document.getElementById('najem-next1').disabled = true;
    [
      'n_klient_imie','n_klient_adres','n_klient_pesel','n_klient_dowod',
      'n_klient_email','n_klient_telefon','n_data_umowy','n_miejsce_umowy',
      'n_nr_umowy','n_wynagrodzenie','n_czas_trwania','n_nieruch_adres',
      'n_nieruch_czynsz','n_nieruch_rodzaj','n_nieruch_pow','n_fakt_email',
    ].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
    showPage(1);
  }

  // ══════════════════════════════════════════════════════════════════
  // GENEROWANIE PDF
  // ══════════════════════════════════════════════════════════════════
  async function generatePDF() {
    HEX.showSpinner();
    try {
      const FIRMA = HEX.buildFirmaPochodne(HEX.loadFirmaData());
      const isW   = selectedType === 'wynajmujacy';
      const nv    = id => document.getElementById(id)?.value?.trim() || '';
      const today = new Date().toLocaleDateString('pl-PL', { day:'2-digit', month:'2-digit', year:'numeric' });

      const d = {
        imie:          nv('n_klient_imie'),
        adres:         nv('n_klient_adres'),
        pesel:         nv('n_klient_pesel'),
        dowod:         nv('n_klient_dowod'),
        email:         nv('n_klient_email'),
        tel:           nv('n_klient_telefon'),
        data:          nv('n_data_umowy') || today,
        miejsce:       nv('n_miejsce_umowy') || FIRMA.miasto,
        nr: (() => {
          const nr    = nv('n_nr_umowy');
          const rok   = FIRMA.rok;
          const skrot = FIRMA.skrot || 'HEX';
          const agent = FIRMA.agent || '';
          return nr ? `${nr}/${skrot}/${rok}${agent ? '/' + agent : ''}` : `.../${skrot}/${rok}`;
        })(),
        wynagrodzenie:  nv('n_wynagrodzenie'),
        prowizjaTyp,
        czas_trwania:   nv('n_czas_trwania'),
        s5wariant:      s5Wariant,
        nieruch_adres:  nv('n_nieruch_adres'),
        nieruch_czynsz: nv('n_nieruch_czynsz'),
        nieruch_rodzaj: nv('n_nieruch_rodzaj'),
        nieruch_pow:    nv('n_nieruch_pow'),
        pelnom:         document.getElementById('n_chk_pelnom')?.checked,
        pelnom_imie:    nv('n_pelnom_imie'),
        pelnom_adres:   nv('n_pelnom_adres'),
        pep1:  document.querySelector('input[name="n_pep1"]:checked')?.value  || 'NIE',
        pep2:  document.querySelector('input[name="n_pep2"]:checked')?.value  || 'NIE',
        pep3:  document.querySelector('input[name="n_pep3"]:checked')?.value  || 'NIE',
        rodo0: document.querySelector('input[name="n_rodo0"]:checked')?.value || 'NIE',
        rodo1: document.querySelector('input[name="n_rodo1"]:checked')?.value || 'NIE',
        rodo2: document.querySelector('input[name="n_rodo2"]:checked')?.value || 'NIE',
        rodo3: document.querySelector('input[name="n_rodo3"]:checked')?.value || 'NIE',
        rodo4: document.querySelector('input[name="n_rodo4"]:checked')?.value || 'NIE',
        faktEmail: nv('n_fakt_email'),
        ck: (val, expect) => val === expect ? '☑' : '☐',
      };

      const NAVY = '#1a2b5e', GOLD = '#b8922a', GRAY = '#6b7280';
      const S = 9, LH = 1.4;

      const styles = {
        title:    { font:'Roboto', fontSize:11, bold:true,    color:NAVY, alignment:'center', margin:[0,0,0,4] },
        subtitle: { font:'Roboto', fontSize:9,  italics:true, color:GRAY, alignment:'center', margin:[0,0,0,4] },
        nr:       { font:'Roboto', fontSize:9,  bold:true,    color:NAVY, alignment:'center', margin:[0,0,0,14] },
        par:      { font:'Roboto', fontSize:9.5, bold:true,   alignment:'center', color:NAVY, margin:[0,10,0,4] },
        body:     { font:'Roboto', fontSize:S,  lineHeight:LH, color:NAVY, alignment:'justify' },
      };

      const tx = (t, bold=false, sz=S) => ({ text: t||'', font:'Roboto', fontSize:sz, bold, lineHeight:LH, color:NAVY, alignment:'justify' });
      const blankLine = (w=200) => ({ canvas:[{ type:'line', x1:0, y1:4, x2:w, y2:4, lineWidth:0.5, lineColor:'#aaa' }], margin:[0,0,0,1] });
      const hr = (col='#e0dbd0') => ({ canvas:[{ type:'line', x1:0, y1:0, x2:495, y2:0, lineWidth:0.5, lineColor:col }], margin:[0,6,0,6] });
      const sn = (n, t) => tx(`${n}.  ${t}`, false, S);
      const sl = (l, t) => tx(`    ${l})  ${t}`, false, S);

      // Signature row (text-only)
      const sigRow = (l1, l2) => ({ columns:[
        { stack:[blankLine(), tx(l1, true, 8)], width:'50%' },
        { stack:[blankLine(), tx(l2, true, 8)], alignment:'right', width:'50%' },
      ], columnGap:20, margin:[0,24,0,8] });

      // Signature row with canvas images
      const sigRowKlient = () => {
        const sk = getSigCanvas('najemSigKlient');
        const sa = getSigCanvas('najemSigAgent');
        const hasK = sk && sk.getContext('2d').getImageData(0, 0, sk.width, sk.height).data.some(x => x !== 0);
        const hasA = sa && sa.getContext('2d').getImageData(0, 0, sa.width, sa.height).data.some(x => x !== 0);
        const leftStack = [];
        if (hasK) leftStack.push({ image: sk.toDataURL('image/png'), width:120, height:40, margin:[0,0,0,2] });
        leftStack.push(blankLine(200));
        leftStack.push(tx(HEX.getText('najem.sig.klient'), true, 8));
        const rightStack = [];
        if (hasA) rightStack.push({ image: sa.toDataURL('image/png'), width:120, height:40, margin:[0,0,0,2], alignment:'right' });
        rightStack.push(blankLine(200));
        rightStack.push(tx(HEX.getText('najem.sig.pelnom'), true, 8));
        return { columns:[
          { stack: leftStack, width:'50%' },
          { stack: rightStack, alignment:'right', width:'50%' },
        ], columnGap:20, margin:[0,20,0,8] };
      };

      // Załącznik nagłówek
      const zalHeader = (nr, tit, sub) => {
        const arr = [
          { text:'', pageBreak:'before' },
          { text:`ZAŁĄCZNIK NR ${nr}`, font:'Roboto', fontSize:9, bold:true, color:GOLD, margin:[0,16,0,2], alignment:'center' },
          { text:tit, font:'Roboto', fontSize:10, bold:true, color:NAVY, margin:[0,0,0, sub?2:10], alignment:'center' },
        ];
        if (sub) arr.push({ text:sub, font:'Roboto', fontSize:8.5, italics:true, color:GRAY, margin:[0,0,0,10], alignment:'center' });
        arr.push(hr(GOLD));
        return arr;
      };

      const content = [];

      // ── Nagłówek ──
      const titlePL = HEX.getText(isW ? 'najem.title_w' : 'najem.title_n');
      if (typeof LOGO_PDF_B64 !== 'undefined') {
        content.push({
          columns:[
            { image: LOGO_PDF_B64, width:80, margin:[0,0,0,0] },
            { stack:[
                { text: titlePL, style:'title', margin:[0,0,0,2] },
                { text: HEX.getText('najem.subtitle'), style:'subtitle' },
                { text: 'NR ' + d.nr, style:'nr' },
              ], alignment:'center', width:'*', margin:[0,4,0,0] },
            { text:'', width:80 },
          ],
          columnGap:8, margin:[0,0,0,6],
        });
      } else {
        content.push({ text: titlePL, style:'title' });
        content.push({ text: HEX.getText('najem.subtitle'), style:'subtitle' });
        content.push({ text: 'NR ' + d.nr, style:'nr' });
      }
      content.push(hr(GOLD));

      // ── Komparacja ──
      content.push(hr());
      content.push(tx(HEX.getText('najem.zawarta', d)));
      content.push({ text:'', margin:[0,6,0,0] });
      content.push({ text: HEX.getText('najem.posrednik_desc', { nazwa:FIRMA.nazwa, kod:FIRMA.kod, miasto:FIRMA.miasto, ulica:FIRMA.ulica, nip:FIRMA.nip, regon:FIRMA.regon, wlasciciel:FIRMA.wlasciciel, stanowisko:FIRMA.stanowisko }), font:'Roboto', fontSize:S, lineHeight:LH, color:NAVY, alignment:'justify', margin:[0,0,0,6] });
      content.push({ text: HEX.getText('najem.klient_desc', d), font:'Roboto', fontSize:S, lineHeight:LH, color:NAVY, alignment:'justify', margin:[0,0,0,6] });
      content.push({ text: HEX.getText('najem.o_nastepujacej'), font:'Roboto', fontSize:S, lineHeight:LH, color:NAVY, margin:[0,0,0,10] });
      content.push(hr());

      if (isW) {
        // ─── WYNAJMUJĄCY ───
        content.push({ text:'§ 1', style:'par' });
        content.push(sn(1, HEX.getText('najem.w.par1.ust1')));
        content.push(sn(2, HEX.getText('najem.w.par1.ust2')));
        content.push({ columns:[
          { stack:[tx('Rodzaj nieruchomości:', true, 8.5), blankLine(200)], width:'50%' },
          { stack:[tx(d.nieruch_rodzaj || '—', false, 9)], width:'50%' },
        ], margin:[10,4,0,4] });
        content.push({ columns:[
          { stack:[tx('Adres nieruchomości:', true, 8.5), blankLine(200)], width:'50%' },
          { stack:[tx(d.nieruch_adres || '—', false, 9)], width:'50%' },
        ], margin:[10,4,0,4] });
        content.push({ columns:[
          { stack:[tx('Powierzchnia (m²):', true, 8.5), blankLine(200)], width:'50%' },
          { stack:[tx(d.nieruch_pow || '—', false, 9)], width:'50%' },
        ], margin:[10,4,0,4] });
        content.push({ columns:[
          { stack:[tx('Czynsz ofertowy:', true, 8.5), blankLine(200)], width:'50%' },
          { stack:[tx(d.nieruch_czynsz ? d.nieruch_czynsz + ' zł/mc' : '—', false, 9)], width:'50%' },
        ], margin:[10,4,0,12] });

        content.push({ text:'§ 2', style:'par' });
        content.push(sn(1, HEX.getText('najem.w.par2.ust1')));
        content.push(sl('a', HEX.getText('najem.w.par2.a')));
        content.push(sl('b', HEX.getText('najem.w.par2.b')));
        content.push(sl('c', HEX.getText('najem.w.par2.c')));
        content.push(sl('d', HEX.getText('najem.w.par2.d')));
        content.push(sl('e', HEX.getText('najem.w.par2.e')));
        content.push(sn(2, HEX.getText('najem.par2.ust2')));
        content.push(sn(3, HEX.getText('najem.par2.ust3')));
        content.push(sn(4, HEX.getText('najem.par2.ust4')));

        content.push({ text:'§ 3', style:'par' });
        content.push(tx(HEX.getText('najem.w.par3', d)));

        content.push({ text:'§ 4', style:'par' });
        content.push(tx(HEX.getText('najem.par4')));

        content.push({ text:'§ 5', style:'par' });
        content.push(tx(HEX.getText('najem.w.par5')));

        content.push({ text:'§ 6', style:'par' });
        content.push(sn(1, HEX.getText('najem.w.par6.ust1')));
        content.push(sn(2, HEX.getText('najem.w.par6.ust2')));
        content.push(sn(3, `Klient oświadcza, że wyraża zgodę na przekazanie przez Pośrednika faktury VAT drogą elektroniczną na adres: ${d.faktEmail || '........................................'}`));

        content.push({ text:'§ 7', style:'par' });
        content.push(tx(HEX.getText('najem.w.par7')));

        content.push({ text:'§ 8', style:'par' });
        content.push(sn(1, HEX.getText('najem.w.par8.ust1')));
        content.push(sn(2, HEX.getText('najem.w.par8.ust2')));

        content.push({ text:'§ 9', style:'par' });
        content.push(tx(HEX.getText('najem.w.par9')));

        content.push({ text:'§ 10', style:'par' });
        content.push(sn(1, HEX.getText('najem.w.par10.ust1')));
        content.push(sn(2, HEX.getText('najem.wszelkie_zmiany')));

        content.push({ text:'§ 11', style:'par' });
        content.push(tx(HEX.getText('najem.dwa_egzemplarze')));

      } else {
        // ─── NAJEMCA ───
        content.push({ text:'§ 1', style:'par' });
        content.push(sn(1, HEX.getText('najem.n.par1.ust1')));
        content.push(sn(2, HEX.getText('najem.n.par1.ust2')));

        content.push({ text:'§ 2', style:'par' });
        content.push(sn(1, HEX.getText('najem.n.par2.ust1')));
        content.push(sl('a', HEX.getText('najem.n.par2.a')));
        content.push(sl('b', HEX.getText('najem.n.par2.b')));
        content.push(sl('c', HEX.getText('najem.n.par2.c')));
        content.push(sl('d', HEX.getText('najem.n.par2.d')));
        content.push(sl('e', HEX.getText('najem.n.par2.e')));
        content.push(sl('f', HEX.getText('najem.n.par2.f')));
        content.push(sn(2, HEX.getText('najem.par2.ust2')));
        content.push(sn(3, HEX.getText('najem.par2.ust3')));
        content.push(sn(4, HEX.getText('najem.par2.ust4')));

        content.push({ text:'§ 3', style:'par' });
        content.push(tx(HEX.getText('najem.n.par3', d)));

        content.push({ text:'§ 4', style:'par' });
        content.push(tx(HEX.getText('najem.par4')));

        content.push({ text:'§ 5', style:'par' });
        content.push(tx('Pośrednik nie gwarantuje osiągnięcia rezultatu, tj. zawarcia umowy najmu Nieruchomości będącej przedmiotem niniejszej Umowy oraz nie ponosi odpowiedzialności za wykonanie obowiązków wynikających z umów między Klientem a wynajmującym.'));

        content.push({ text:'§ 6', style:'par' });
        content.push(sn(1, 'Klient zobowiązuje się do korzystania z przekazanych przez Pośrednika ofert wynajmu wyłącznie na własny użytek i zachowania szczegółów ofert w ścisłej tajemnicy oraz nieprzekazywania ich innym osobom trzecim.'));
        content.push(sn(2, HEX.getText('najem.n.par6.ust2')));
        content.push(sn(3, `Klient oświadcza, że wyraża zgodę na przekazanie przez Pośrednika faktury VAT drogą elektroniczną na adres: ${d.faktEmail || '........................................'}`));

        content.push({ text:'§ 7', style:'par' });
        content.push(tx(HEX.getText('najem.n.par7')));

        content.push({ text:'§ 8', style:'par' });
        content.push(sn(1, HEX.getText('najem.n.par8.ust1')));
        content.push(sn(2, HEX.getText('najem.n.par8.ust2')));

        content.push({ text:'§ 9', style:'par' });
        content.push(tx(HEX.getText('najem.n.par9')));

        content.push({ text:'§ 10', style:'par' });
        content.push(sn(1, HEX.getText('najem.n.par10.ust1')));
        content.push(sn(2, HEX.getText('najem.n.par10.ust2')));
        content.push(sn(3, HEX.getText('najem.wszelkie_zmiany')));
        content.push(sn(4, HEX.getText('najem.n.par10.ust4')));

        content.push({ text:'§ 11', style:'par' });
        content.push(sn(1, HEX.getText('najem.n.par11.ust1')));
        content.push(sl('a', HEX.getText('najem.n.par11.a')));
        content.push(sl('b', HEX.getText('najem.n.par11.b')));
        content.push(sl('c', HEX.getText('najem.n.par11.c')));

        content.push({ text:'§ 12', style:'par' });
        content.push(tx(HEX.getText('najem.dwa_egzemplarze')));
      }

      // ── Podpisy strona główna ──
      content.push(sigRowKlient());

      // ── Zgoda RODO (inline) ──
      content.push(hr());
      content.push({ text: HEX.getText('najem.rodo_tytul', { nazwa:FIRMA.nazwa }), font:'Roboto', fontSize:8.5, bold:true, color:NAVY, margin:[0,6,0,4] });
      content.push({ text: HEX.getText('najem.rodo_tresc', { nazwa:FIRMA.nazwa, miasto:FIRMA.miasto, kod:FIRMA.kod, ulica:FIRMA.ulica }), font:'Roboto', fontSize:8, lineHeight:1.3, color:NAVY, margin:[0,0,0,10] });
      content.push(sigRow(HEX.getText('najem.sig.klient'), ''));

      // ── Załączniki ──
      const zalNr = isW ? 1 : 4;

      // Zał RODO
      content.push(...zalHeader(zalNr, 'ZASADY DOTYCZĄCE OCHRONY DANYCH OSOBOWYCH', null));
      content.push(sn(1, HEX.getText('najem.zal.rodo.ust1', { nazwa:FIRMA.nazwa, kod:FIRMA.kod, miasto:FIRMA.miasto, ulica:FIRMA.ulica })));
      content.push(sn(2, HEX.getText('najem.zal.rodo.ust2')));
      content.push(sn(3, HEX.getText('najem.zal.rodo.ust3')));

      // Zał PEP + RODO zgody
      content.push(...zalHeader(zalNr + 1, 'OŚWIADCZENIE PEP', null));
      content.push(tx(`Imię i nazwisko: ${d.imie}`, false, 8.5));
      content.push({ columns:[
        { text:'1. Czy jest Pani/Pan osobą zajmującą eksponowane stanowiska polityczne? *', font:'Roboto', fontSize:8.5, lineHeight:1.25, width:'*' },
        { text:`${d.ck(d.pep1,'TAK')} TAK   ${d.ck(d.pep1,'NIE')} NIE`, font:'Roboto', fontSize:8.5, width:80, alignment:'right' },
      ], columnGap:6, margin:[0,2,0,3] });
      content.push({ columns:[
        { text:'2. Czy jest Pani/Pan członkiem rodziny osoby zajmującej eksponowane stanowiska polityczne? *', font:'Roboto', fontSize:8.5, lineHeight:1.25, width:'*' },
        { text:`${d.ck(d.pep2,'TAK')} TAK   ${d.ck(d.pep2,'NIE')} NIE`, font:'Roboto', fontSize:8.5, width:80, alignment:'right' },
      ], columnGap:6, margin:[0,0,0,3] });
      content.push({ columns:[
        { text:'3. Czy jest Pani/Pan osobą bliskiego współpracownika osoby zajmującej eksponowane stanowiska polityczne? *', font:'Roboto', fontSize:8.5, lineHeight:1.25, width:'*' },
        { text:`${d.ck(d.pep3,'TAK')} TAK   ${d.ck(d.pep3,'NIE')} NIE`, font:'Roboto', fontSize:8.5, width:80, alignment:'right' },
      ], columnGap:6, margin:[0,0,0,3] });
      content.push({ text: HEX.getText('najem.zal.pep.uwaga'), font:'Roboto', fontSize:7.5, italics:true, margin:[0,0,0,4] });
      content.push(sigRow(HEX.getText('najem.sig.klient_short'), HEX.getText('najem.sig.posrednik_short')));
      content.push({ canvas:[{ type:'line', x1:0, y1:0, x2:495, y2:0, lineWidth:0.3, lineColor:'#ccc' }], margin:[0,6,0,6] });

      // RODO zgody
      content.push({ text:'ZGODA NA PRZETWARZANIE DANYCH OSOBOWYCH', font:'Roboto', fontSize:9, bold:true, color:GOLD, margin:[0,0,0,3], alignment:'center' });
      content.push({ canvas:[{ type:'line', x1:0, y1:0, x2:495, y2:0, lineWidth:0.5, lineColor:GOLD }], margin:[0,0,0,6] });
      content.push(tx(`Imię i nazwisko: ${d.imie}`, false, 8.5));
      const rodoItems = [
        ['0', 'Wyrażam zgodę na przetwarzanie moich danych osobowych przez ' + FIRMA.nazwa + ' w zakresie niezbędnym do oferowania produktów i usług w związku z wykonywanym pośrednictwem nieruchomościowym.', d.rodo0],
        ['1', 'W celu przesłania danych do wskazanej kancelarii notarialnej.', d.rodo1],
        ['2', 'W celu przekazania zainteresowanej stronie numeru księgi wieczystej nieruchomości.', d.rodo2],
        ['3', 'W celu przesyłania informacji handlowych drogą elektroniczną.', d.rodo3],
        ['4', 'W celach marketingowych.', d.rodo4],
      ];
      rodoItems.forEach(([nr, txt, val]) => {
        content.push({ columns:[
          { text: nr === '0' ? 'Zgoda ogólna:' : '  ' + nr + '.', fontSize:8, bold:true, width: nr === '0' ? 76 : 14 },
          { text: txt, fontSize:8, lineHeight:1.2, width:'*', alignment:'justify' },
          { text: `${d.ck(val,'TAK')} TAK  ${d.ck(val,'NIE')} NIE`, fontSize:8, width:66, alignment:'right' },
        ], columnGap:4, margin:[0,0,0,4] });
      });
      content.push(sigRow(HEX.getText('najem.sig.klient_short'), HEX.getText('najem.sig.posrednik_short')));

      // Zał OC
      content.push(...zalHeader(isW ? 3 : 6, 'Kopia dokumentu ubezpieczenia OC pośrednika', null));
      if (ocImageData && ocImageData.startsWith('data:image/')) {
        content.push({ image: ocImageData, width:360, alignment:'center', margin:[0,4,0,0] });
      } else {
        content.push({ text: HEX.getText('najem.zal.oc_placeholder'), fontSize:9, italics:true, alignment:'center', margin:[0,16,0,16] });
      }

      // ── Generuj plik ──
      const typeLabel = isW ? 'wynajmujacy' : 'najemca';
      const safeName  = (d.imie || 'klient').replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
      const fileName  = `Umowa_najem_${typeLabel}_${safeName}_${d.nr.replace(/\//g, '-')}.pdf`;

      const docDef = {
        pageSize:     'A4',
        pageMargins:  [50, 8, 50, 45],
        defaultStyle: { font:'Roboto', fontSize:10, lineHeight:1.35 },
        styles,
        content,
        footer: (cur, total) => ({
          columns:[
            { text:`${FIRMA.stopka} | NR ${d.nr}`, fontSize:7, color:'#999', margin:[50,0,0,0] },
            { text:`Strona ${cur} z ${total}`, fontSize:7, color:'#999', alignment:'right', margin:[0,0,50,0] },
          ],
        }),
      };

      pdfMake.createPdf(docDef).download(fileName);
      if (typeof startAddRecent === 'function') {
        startAddRecent(isW ? 'Umowa pośrednictwa w najmie' : 'Umowa poszukiwania najmu', d.imie + ' — ' + fileName.replace('.pdf', ''), 'najem');
      }
      HEX.toast('✓ Umowa najmu wygenerowana: ' + fileName);

    } catch (err) {
      console.error(err);
      HEX.toast('❌ Błąd PDF: ' + err.message);
    } finally {
      HEX.hideSpinner();
    }
  }

  // ── Rejestracja modułu ──
  HEX.registerModule('najem', { onActivate: init });

  // ── Public API ──
  return {
    selectType,
    goNext,
    goBack,
    setKlientTyp,
    togglePelnom,
    setProwizjaTyp,
    selectS5,
    updateBadge,
    clearSig,
    deletePolisa,
    handleOCFile,
    generatePDF,
    reset,
  };

})();
