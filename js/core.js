// ═══════════════════════════════════════════════════════════
// HEX DOKUMENTY v4.0 — CORE.JS
// Router, firma data, shared utils
// Moduły rejestrują się przez HEX.registerModule()
// ═══════════════════════════════════════════════════════════

const HEX = (() => {

  // ── Rejestr modułów ──
  const modules = {};
  let activeTab = null;

  // ── Router ──
  function registerModule(id, { onActivate } = {}) {
    modules[id] = { onActivate };
  }

  function switchTab(id) {
    if (activeTab === id) return;
    // Deaktywuj poprzedni panel
    document.querySelectorAll('.hex-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.hex-tab').forEach(t => t.classList.remove('active'));
    // Aktywuj nowy
    const panel = document.getElementById('tab-' + id);
    const tab   = document.querySelector('[data-tab="' + id + '"]');
    if (panel) panel.classList.add('active');
    if (tab)   tab.classList.add('active');
    activeTab = id;
    // Callback modułu
    if (modules[id]?.onActivate) modules[id].onActivate();
  }

  // ── Firma ──
  // Model pełny: pola bazowe + pochodne liczone w buildFirmaPochodne().
  //  - wlasciciel = imię i nazwisko reprezentanta (do treści umowy)
  //  - agent      = KOD agenta do numeracji (np. 'MAZI'), NIE imię
  //  - skrot/rok  = składowe numeru umowy  nr/skrot/agent/rok
  const FIRMA_DOMYSLNE = {
    nazwa:       'Home Experts Mariusz Zimnowodzki Nieruchomości',
    pelna:       'Home Experts Mariusz Zimnowodzki Nieruchomości',
    forma:       '',          // '' neutralne | 'jdg' (CEIDG) | 'spolka' (KRS)
    nip:         '5782809711',
    regon:       '368332760',
    krs:         '',          // tylko dla spółki
    ulica:       'Romana Dmowskiego 12 lokal 201',
    kod:         '80-264',
    miasto:      'Gdańsk',
    wlasciciel:  'Mariusz Zimnowodzki',
    stanowisko:  'właściciel firmy',
    licencja:    '',
    tel:         '690 464 944',
    email:       'kontakt@homeexperts.pl',
    agent_email: 'mariusz.zimnowodzki@homeexperts.pl',
    agent_tel:   '797 697 020',
    skrot:       'HEX',
    agent:       'MAZI',
    rok:         String(new Date().getFullYear()),
    stopka:      'Home Experts Mariusz Zimnowodzki Nieruchomości',
  };

  function loadFirmaData() {
    try {
      const saved = localStorage.getItem('hex_firma');
      return saved ? { ...FIRMA_DOMYSLNE, ...JSON.parse(saved) } : { ...FIRMA_DOMYSLNE };
    } catch { return { ...FIRMA_DOMYSLNE }; }
  }

  function saveFirmaData(data) {
    try { localStorage.setItem('hex_firma', JSON.stringify(data)); } catch {}
  }

  // Mutuje F i ZWRACA F (najem.js/sprzedaz.js robią: const FIRMA = buildFirmaPochodne(loadFirmaData()))
  function buildFirmaPochodne(F) {
    F.pelna      = F.pelna      || F.nazwa;
    F.regon      = F.regon      || '';
    F.krs        = F.krs        || '';
    F.stopka     = F.stopka     || F.nazwa;
    F.wlasciciel = F.wlasciciel || F.agent || '';
    F.skrot      = F.skrot      || 'HEX';
    F.rok        = F.rok        || String(new Date().getFullYear());
    // ── Pola pochodne (wykorzystywane przez sprzedaz.js) ──
    F.adres  = F.ulica + ', ' + F.kod + ' ' + F.miasto;
    F.krótka = F.nazwa + ', ' + F.ulica + ', ' + F.kod + ' ' + F.miasto;
    const _siedziba = F.nazwa + ' z siedzibą w ' + F.miasto + ' (' + F.kod + ') ' + F.ulica;
    // Klauzula rejestrowa zależna od formy prawnej (spółka → KRS, inaczej → CEIDG)
    const _rejestr = (F.forma === 'spolka')
      ? 'wpisaną do rejestru przedsiębiorców Krajowego Rejestru Sądowego pod numerem KRS: ' + F.krs + ', NIP: ' + F.nip + ', REGON: ' + F.regon
      : 'działającą na podstawie wpisu do Centralnej Ewidencji i Informacji o Działalności Gospodarczej (CEIDG), NIP: ' + F.nip + ', REGON: ' + F.regon;
    F.ceidg  = _siedziba + ', ' + _rejestr + '. Reprezentowaną przez ' + F.wlasciciel + ' — ' + F.stanowisko + ',';
    return F;
  }

  // ── Spinner ──
  function showSpinner(msg = 'Generuję PDF…') {
    const el = document.getElementById('spinner');
    if (!el) return;
    const p = el.querySelector('p');
    if (p) p.textContent = msg;
    el.classList.add('show');
  }
  function hideSpinner() {
    document.getElementById('spinner')?.classList.remove('show');
  }

  // ── Toast ──
  function toast(msg, duration = 3000) {
    const el = document.getElementById('hex-toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), duration);
  }

  // ── getText — deleguje do texts.js ──
  function getText(key, data = null, lang = 'pl') {
    if (typeof texts === 'undefined') return key;
    const entry = texts[key];
    if (!entry) return key;
    const val = entry[lang] ?? entry['pl'] ?? key;
    if (typeof val === 'function') return val(data || {});
    return val;
  }

  // ── Podpisy (canvas) — shared helper ──
  function initSig(id) {
    const c = document.getElementById(id);
    if (!c || c._hexSigInit) return;
    c._hexSigInit = true;
    let drawing = false, lx = 0, ly = 0;
    const ctx = c.getContext('2d');
    ctx.strokeStyle = '#1a2b5e'; ctx.lineWidth = 2; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    const pos = e => {
      const r = c.getBoundingClientRect(), sx = c.width / r.width, sy = c.height / r.height;
      const t = e.touches?.[0] || e;
      return [(t.clientX - r.left) * sx, (t.clientY - r.top) * sy];
    };
    c.addEventListener('mousedown',  e => { drawing = true; [lx, ly] = pos(e); });
    c.addEventListener('mousemove',  e => { if (!drawing) return; const [x,y] = pos(e); ctx.beginPath(); ctx.moveTo(lx,ly); ctx.lineTo(x,y); ctx.stroke(); [lx,ly] = [x,y]; });
    c.addEventListener('mouseup',    () => drawing = false);
    c.addEventListener('mouseleave', () => drawing = false);
    c.addEventListener('touchstart', e => { e.preventDefault(); drawing = true; [lx,ly] = pos(e); }, { passive: false });
    c.addEventListener('touchmove',  e => { if (!drawing) return; e.preventDefault(); const [x,y] = pos(e); ctx.beginPath(); ctx.moveTo(lx,ly); ctx.lineTo(x,y); ctx.stroke(); [lx,ly] = [x,y]; }, { passive: false });
    c.addEventListener('touchend',   () => drawing = false);
  }

  function clearSig(id) {
    const c = document.getElementById(id);
    if (c) c.getContext('2d').clearRect(0, 0, c.width, c.height);
  }

  function getSig(id) {
    const c = document.getElementById(id);
    if (!c) return null;
    const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data;
    return Array.from(d).some((v, i) => i % 4 === 3 && v > 0) ? c.toDataURL('image/png') : null;
  }

  // ── Format daty ──
  function fmtDate(iso) {
    if (!iso) return '....................';
    const [y, m, d] = iso.split('-');
    return `${d}.${m}.${y}`;
  }

  function fmtDateL(iso) {
    if (!iso) return '....................';
    const [y, m, d] = iso.split('-');
    const mn = ['stycznia','lutego','marca','kwietnia','maja','czerwca','lipca','sierpnia','września','października','listopada','grudnia'];
    return `${parseInt(d)} ${mn[parseInt(m) - 1]} ${y} r.`;
  }

  // ── Init (po załadowaniu DOM) ──
  function init() {
    // Logo na granatowej belce (z logo.js, globalny LOGO_PDF_B64)
    const lg = document.getElementById('hex-logo');
    if (lg && typeof LOGO_PDF_B64 !== 'undefined' && LOGO_PDF_B64) {
      lg.src = LOGO_PDF_B64;
      lg.style.display = '';
    }
    // Bind zakładek
    document.querySelectorAll('.hex-tab[data-tab]').forEach(tab => {
      tab.addEventListener('click', () => {
        if (tab.classList.contains('hex-tab-placeholder')) return;
        switchTab(tab.dataset.tab);
      });
    });
    // Domyślna zakładka
    const first = document.querySelector('.hex-tab[data-tab]:not(.hex-tab-placeholder)');
    if (first) switchTab(first.dataset.tab);
  }

  // Public API
  return {
    registerModule,
    switchTab,
    loadFirmaData,
    saveFirmaData,
    buildFirmaPochodne,
    showSpinner,
    hideSpinner,
    toast,
    getText,
    initSig,
    clearSig,
    getSig,
    fmtDate,
    fmtDateL,
    init,
    FIRMA: FIRMA_DOMYSLNE,
  };

})();

// Globalne aliasy (kompatybilność wsteczna z istniejącymi modułami)
// UWAGA: NIE aliasujemy globalnie getText — kolidowałby z `function getText`
// zdefiniowaną w texts.js (oba w zakresie globalnym → SyntaxError „already declared").
// Moduły wołające bezprefiksowe getText() korzystają z funkcji z texts.js;
// moduły v4 (sprzedaz, najem) używają HEX.getText().
const loadFirmaData      = () => HEX.loadFirmaData();
const buildFirmaPochodne = (F) => HEX.buildFirmaPochodne(F);
const FIRMA              = HEX.FIRMA;


// ═══ Ustawienia firmy — panel globalny (header + #firma-settings-panel) ═══
// Przeniesione ze sprzedaz.js; wspólne dla wszystkich zakładek.
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

// Pokaż pole KRS tylko dla spółki
function applyFormaVisibility() {
  const forma = document.getElementById('fp_forma')?.value;
  const wrap  = document.getElementById('fp_krs_wrap');
  if (wrap) wrap.style.display = (forma === 'spolka') ? '' : 'none';
}

function toggleFirmaPanel() {
  const panel = document.getElementById('firma-settings-panel');
  const btn   = document.getElementById('firma-panel-toggle-btn');
  const isOpen = panel.style.display !== 'none';
  panel.style.display = isOpen ? 'none' : 'block';
  btn.textContent = isOpen ? '⚙️ Ustawienia firmy' : '✕ Zamknij ustawienia';
}

function initFirmaPanel() {
  // Fill form fields from current FIRMA
  const fields = ['forma','nazwa','wlasciciel','stanowisko','nip','regon','krs',
                  'ulica','kod','miasto','email','tel','agent_email','agent_tel','skrot','agent','rok'];
  fields.forEach(f => {
    const el = document.getElementById('fp_' + f);
    if (el) el.value = HEX.loadFirmaData()[f] || '';
  });
  // Przywróć stan checkboxa języka
  const chk = document.getElementById('fp_lang_enabled');
  if (chk) chk.checked = localStorage.getItem('hex_lang_enabled') === '1';
  applyFormaVisibility();
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
  const fields = ['forma','nazwa','wlasciciel','stanowisko','nip','regon','krs',
                  'ulica','kod','miasto','email','tel','agent_email','agent_tel','skrot','agent','rok'];
  fields.forEach(f => {
    const el = document.getElementById('fp_' + f);
    if (el) el.value = data[f] || '';
  });
  applyFormaVisibility();
}

function applyFirmaSettings() {
  const fields = ['forma','nazwa','wlasciciel','stanowisko','nip','regon','krs',
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
  const fields = ['forma','nazwa','wlasciciel','stanowisko','nip','regon','krs',
                  'ulica','kod','miasto','email','tel','agent_email','agent_tel','skrot','agent','rok'];
  fields.forEach(f => {
    const el = document.getElementById('fp_' + f);
    if (el) el.value = HEX.FIRMA[f] || '';
  });
}

// Boot
document.addEventListener('DOMContentLoaded', () => { HEX.init(); initFirmaPanel(); });
