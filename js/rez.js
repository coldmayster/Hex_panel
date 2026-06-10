// ═══════════════════════════════════════════════════════════
// MODUŁ: UMOWA REZERWACYJNA
// HEX Dokumenty v4.0
// Rejestracja: HEX.registerModule('rezerwacja', { onActivate })
// ═══════════════════════════════════════════════════════════

const REZ = (() => {

  // ── Stan modułu ──
  const osoby     = { sp: [], ku: [] };
  let osobaIdx    = 0;
  const typState  = { sp: 'os', ku: 'os' };
  let platnosc    = 'przelew';

  // ── HTML modułu ──
  function render() {
    document.getElementById('rezerwacja-root').innerHTML = `
    <div class="container" id="rez-container">

      <!-- STEPS -->
      <div class="steps" id="rez-steps">
        <div class="step active" id="rez-s1" onclick="REZ.goTo(1)">
          <div class="step-num">1</div>
          <div class="step-label">Strony</div>
        </div>
        <div class="step" id="rez-s2" onclick="REZ.goTo(2)">
          <div class="step-num">2</div>
          <div class="step-label">Nieruchomość</div>
        </div>
        <div class="step" id="rez-s3" onclick="REZ.goTo(3)">
          <div class="step-num">3</div>
          <div class="step-label">Płatność</div>
        </div>
        <div class="step" id="rez-s4" onclick="REZ.goTo(4)">
          <div class="step-num">4</div>
          <div class="step-label">Podpisy</div>
        </div>
      </div>

      <!-- KROK 1: Strony -->
      <div class="page active" id="rez-page1">
        <div class="card">
          <div class="card-title">Dane ogólne</div>
          <div class="card-sub">Miejsce i data zawarcia umowy</div>
          <div class="form-grid">
            <div class="field">
              <label>Data zawarcia <span class="req">*</span></label>
              <input type="date" id="ur_data">
            </div>
            <div class="field">
              <label>Miejscowość <span class="req">*</span></label>
              <input id="ur_miejsce" placeholder="np. Gdańsk">
            </div>
          </div>
        </div>

        <!-- SPRZEDAJĄCY -->
        <div class="card">
          <div class="card-title">Sprzedający</div>
          <div style="display:flex;gap:10px;margin-bottom:16px;">
            <button id="sp-btn-os" class="lang-btn active" onclick="REZ.setTyp('sp','os')">👤 Osoba prywatna</button>
            <button id="sp-btn-firm" class="lang-btn" onclick="REZ.setTyp('sp','firm')">🏢 Firma</button>
          </div>
          <div id="sp-firma-blok" style="display:none;">
            <div class="form-grid">
              <div class="field span2"><label>Nazwa firmy <span class="req">*</span></label><input id="sp_firma_nazwa" placeholder="np. Kowalski Sp. z o.o."></div>
              <div class="field"><label>NIP</label><input id="sp_firma_nip" placeholder="0000000000"></div>
              <div class="field"><label>REGON</label><input id="sp_firma_regon" placeholder="000000000"></div>
              <div class="field span2"><label>Adres siedziby</label><input id="sp_firma_adres" placeholder="ul. Przykładowa 1, Gdańsk"></div>
              <div class="field span2"><label>Reprezentowana przez</label><input id="sp_firma_repr" placeholder="Jan Kowalski — Prezes Zarządu"></div>
            </div>
          </div>
          <div id="sp-osoby"></div>
          <button class="add-btn" id="sp-add-btn" onclick="REZ.addOsoba('sp')">+ Dodaj sprzedającego</button>
        </div>

        <!-- KUPUJĄCY -->
        <div class="card">
          <div class="card-title">Kupujący</div>
          <div style="display:flex;gap:10px;margin-bottom:16px;">
            <button id="ku-btn-os" class="lang-btn active" onclick="REZ.setTyp('ku','os')">👤 Osoba prywatna</button>
            <button id="ku-btn-firm" class="lang-btn" onclick="REZ.setTyp('ku','firm')">🏢 Firma</button>
          </div>
          <div id="ku-firma-blok" style="display:none;">
            <div class="form-grid">
              <div class="field span2"><label>Nazwa firmy <span class="req">*</span></label><input id="ku_firma_nazwa" placeholder="np. Nowak Sp. z o.o."></div>
              <div class="field"><label>NIP</label><input id="ku_firma_nip" placeholder="0000000000"></div>
              <div class="field"><label>REGON</label><input id="ku_firma_regon" placeholder="000000000"></div>
              <div class="field span2"><label>Adres siedziby</label><input id="ku_firma_adres" placeholder="ul. Przykładowa 1, Gdańsk"></div>
              <div class="field span2"><label>Reprezentowana przez</label><input id="ku_firma_repr" placeholder="Jan Nowak — Prezes Zarządu"></div>
            </div>
          </div>
          <div id="ku-osoby"></div>
          <button class="add-btn" id="ku-add-btn" onclick="REZ.addOsoba('ku')">+ Dodaj kupującego</button>
        </div>

        <div class="nav-row">
          <div></div>
          <button class="btn btn-primary" onclick="REZ.goTo(2)">Dalej →</button>
        </div>
      </div>

      <!-- KROK 2: Nieruchomość -->
      <div class="page" id="rez-page2">
        <div class="card">
          <div class="card-title">Dane nieruchomości</div>
          <div class="form-grid">
            <div class="field"><label>Nr lokalu <span class="req">*</span></label><input id="nr_lok" placeholder="np. 12"></div>
            <div class="field"><label>Powierzchnia (m²)</label><input id="ur_pow" placeholder="np. 65"></div>
            <div class="field"><label>Piętro</label><input id="ur_pietro" placeholder="np. 3. piętrze"></div>
            <div class="field"><label>Klatka</label><input id="ur_klatka" placeholder="np. A"></div>
            <div class="field span2"><label>Ulica <span class="req">*</span></label><input id="ur_ulica" placeholder="ul. Przykładowa 10"></div>
            <div class="field"><label>Miejsce parkingowe</label><input id="ur_miejsce_post" placeholder="nr miejsca (opcjonalnie)"></div>
            <div class="field"><label>Komórka lokatorska</label><input id="ur_komorka" placeholder="nr komórki (opcjonalnie)"></div>
            <div class="field span2"><label>Nr KW <span class="req">*</span></label><input id="ur_kw" placeholder="GD1G/00000000/0"></div>
            <div class="field span2"><label>Sąd rejonowy</label><input id="ur_sad" placeholder="Sąd Rejonowy Gdańsk-Północ"></div>
          </div>
        </div>
        <div class="nav-row">
          <button class="btn btn-ghost" onclick="REZ.goTo(1)">← Wstecz</button>
          <button class="btn btn-primary" onclick="REZ.goTo(3)">Dalej →</button>
        </div>
      </div>

      <!-- KROK 3: Płatność -->
      <div class="page" id="rez-page3">
        <div class="card">
          <div class="card-title">Cena i opłata rezerwacyjna</div>
          <div class="form-grid">
            <div class="field">
              <label>Cena nieruchomości (PLN) <span class="req">*</span></label>
              <input id="ur_cena" type="number" placeholder="np. 650000" oninput="REZ.updSlownie('ur_cena','ur_cena_slow')">
              <div class="slownie-hint" id="ur_cena_slow"></div>
            </div>
            <div class="field">
              <label>Opłata rezerwacyjna (PLN) <span class="req">*</span></label>
              <input id="ur_oplata" type="number" placeholder="np. 20000" oninput="REZ.updSlownie('ur_oplata','ur_oplata_slow')">
              <div class="slownie-hint" id="ur_oplata_slow"></div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-title">Forma płatności</div>
          <div style="display:flex;gap:10px;margin-bottom:16px;">
            <button id="btn-platnosc-przelew" class="lang-btn" onclick="REZ.setPlatnosc('przelew')">🏦 Przelew krajowy</button>
            <button id="btn-platnosc-zagr" class="lang-btn" onclick="REZ.setPlatnosc('zagr')">🌍 Przelew zagraniczny</button>
            <button id="btn-platnosc-gotowka" class="lang-btn" onclick="REZ.setPlatnosc('gotowka')">💵 Gotówka</button>
          </div>
          <div id="blok-konto" class="form-grid">
            <div class="field span2">
              <label>Numer konta (IBAN) <span class="req">*</span></label>
              <input id="ur_konto" placeholder="37 1020 1909 0000 3202 0132 1744" oninput="REZ.formatIBAN(this)">
              <div class="slownie-hint" id="ur_konto_hint"></div>
            </div>
          </div>
          <div id="blok-swift" class="form-grid" style="display:none;">
            <div class="field"><label>SWIFT / BIC</label><input id="ur_swift" placeholder="np. BPKOPLPW"></div>
          </div>
          <div id="blok-bank-nazwa" class="form-grid" style="display:none;">
            <div class="field span2"><label>Nazwa banku</label><input id="ur_bank_nazwa" placeholder="np. PKO Bank Polski"></div>
          </div>
          <div id="blok-gotowka" style="display:none;">
            <div class="info-note"><span class="info-icon">ℹ️</span>Płatność gotówką — numer konta nie jest wymagany.</div>
          </div>
        </div>

        <div class="card">
          <div class="card-title">Terminy</div>
          <div class="form-grid">
            <div class="field">
              <label>Termin wpłaty opłaty rezerwacyjnej <span class="req">*</span></label>
              <input type="date" id="ur_termin_wplaty">
            </div>
            <div class="field">
              <label>Koniec rezerwacji <span class="req">*</span></label>
              <input type="date" id="ur_koniec_rez" onchange="REZ.updKoniecRez()">
            </div>
            <div class="field span2">
              <label>Termin zawarcia umowy przyrzeczonej (słownie)</label>
              <input id="ur_termin_aktu" placeholder="np. 30 czerwca 2025 r.">
            </div>
          </div>
        </div>

        <div class="nav-row">
          <button class="btn btn-ghost" onclick="REZ.goTo(2)">← Wstecz</button>
          <button class="btn btn-primary" onclick="REZ.goTo(4)">Dalej →</button>
        </div>
      </div>

      <!-- KROK 4: Podpisy -->
      <div class="page" id="rez-page4">
        <div class="card">
          <div class="card-title">Podpisy stron</div>
          <div class="card-sub" id="ur-sig-sub"></div>
          <div id="ur-sig-container" style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:16px;"></div>
        </div>
        <div class="nav-row">
          <button class="btn btn-ghost" onclick="REZ.goTo(3)">← Wstecz</button>
          <button class="btn btn-gold" onclick="REZ.generatePDF()">
            <span class="icon">📄</span> Generuj Umowę Rezerwacyjną
          </button>
        </div>
      </div>

    </div>
    `;
  }

  // ── Nawigacja ──
  function goTo(n) {
    for (let i = 1; i <= 4; i++) {
      const p = document.getElementById('rez-page' + i);
      const s = document.getElementById('rez-s' + i);
      if (p) p.classList.toggle('active', i === n);
      if (s) {
        s.classList.remove('active', 'done');
        if (i < n) s.classList.add('done');
        if (i === n) s.classList.add('active');
      }
    }
    if (n === 4) urRenderSigs();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ── Typ strony ──
  function setTyp(strona, typ) {
    typState[strona] = typ;
    ['os', 'firm'].forEach(t => {
      const btn = document.getElementById(strona + '-btn-' + t);
      if (!btn) return;
      btn.style.background = t === typ ? 'var(--navy)' : 'var(--cream)';
      btn.style.color      = t === typ ? '#fff'        : 'var(--gray)';
    });
    const firmaBlok = document.getElementById(strona + '-firma-blok');
    const addBtn    = document.getElementById(strona + '-add-btn');
    if (typ === 'firm') {
      document.getElementById(strona + '-osoby').innerHTML = '';
      osoby[strona] = [];
      if (addBtn) addBtn.style.display = 'none';
      if (firmaBlok) firmaBlok.style.display = 'block';
    } else {
      if (firmaBlok) firmaBlok.style.display = 'none';
      if (addBtn) addBtn.style.display = '';
      if (osoby[strona].length === 0) addOsoba(strona);
    }
  }

  // ── Osoby ──
  function osobaHTML(strona, id, nr) {
    const isFirst = nr === 1;
    const label   = strona === 'sp' ? 'Sprzedający' : 'Kupujący';
    return `<div class="osoba-blok" id="osoba-${id}">
      <div class="osoba-nr">${label} ${nr}</div>
      ${!isFirst ? `<button class="remove-btn" onclick="REZ.removeOsoba('${strona}','${id}')">✕</button>` : ''}
      <div class="fields-grid" style="margin-top:8px;">
        <div class="field" style="grid-column:1/-1;">
          <label>Imię i nazwisko <span class="req">*</span></label>
          <input id="os-${id}-imie" placeholder="np. Jan Kowalski">
        </div>
        <div class="field"><label>Imię ojca</label><input id="os-${id}-ojciec" placeholder="np. Adam"></div>
        <div class="field"><label>Imię matki</label><input id="os-${id}-matka" placeholder="np. Maria"></div>
        <div class="field">
          <label>Stan cywilny</label>
          <select id="os-${id}-stan">
            <option value="żonaty">żonaty</option>
            <option value="zamężna">zamężna</option>
            <option value="kawaler">kawaler</option>
            <option value="panna">panna</option>
            <option value="rozwiedziony">rozwiedziony</option>
            <option value="rozwiedziona">rozwiedziona</option>
            <option value="wdowiec">wdowiec</option>
            <option value="wdowa">wdowa</option>
          </select>
        </div>
        <div class="field" style="grid-column:1/-1;">
          <label>Adres zamieszkania <span class="req">*</span></label>
          <input id="os-${id}-adres" placeholder="ul. Przykładowa 1, 80-000 Gdańsk">
        </div>
        <div class="field"><label>PESEL <span class="req">*</span></label><input id="os-${id}-pesel" placeholder="00000000000" maxlength="11"></div>
        <div class="field"><label>Nr dowodu <span class="req">*</span></label><input id="os-${id}-dowod" placeholder="np. AZE 123456"></div>
        <div class="field" style="grid-column:1/-1;">
          <label><input type="checkbox" id="os-${id}-dg" onchange="REZ.toggleDG('${id}')"> Prowadzi działalność gospodarczą</label>
        </div>
        <div id="os-${id}-dg-blok" style="display:none;grid-column:1/-1;">
          <div class="fields-grid">
            <div class="field" style="grid-column:1/-1;"><label>Nazwa DG</label><input id="os-${id}-dg-nazwa" placeholder="Firma Jan Kowalski"></div>
            <div class="field"><label>NIP</label><input id="os-${id}-dg-nip" placeholder="0000000000"></div>
            <div class="field"><label>REGON</label><input id="os-${id}-dg-regon" placeholder="000000000"></div>
          </div>
        </div>
      </div>
    </div>`;
  }

  function addOsoba(strona) {
    if (osoby[strona].length >= 4) return;
    osobaIdx++;
    const id  = strona + osobaIdx;
    const nr  = osoby[strona].length + 1;
    osoby[strona].push(id);
    const container = document.getElementById(strona + '-osoby');
    const div = document.createElement('div');
    div.innerHTML = osobaHTML(strona, id, nr);
    container.appendChild(div.firstChild);
    if (osoby[strona].length >= 4) document.getElementById(strona + '-add-btn').style.display = 'none';
  }

  function removeOsoba(strona, id) {
    osoby[strona] = osoby[strona].filter(x => x !== id);
    document.getElementById('osoba-' + id)?.remove();
    osoby[strona].forEach((oid, i) => {
      const blok = document.getElementById('osoba-' + oid);
      if (blok) {
        const nr = blok.querySelector('.osoba-nr');
        if (nr) nr.textContent = (strona === 'sp' ? 'Sprzedający' : 'Kupujący') + ' ' + (i + 1);
      }
    });
    document.getElementById(strona + '-add-btn').style.display = osoby[strona].length >= 4 ? 'none' : '';
  }

  function toggleDG(id) {
    const chk  = document.getElementById('os-' + id + '-dg');
    const blok = document.getElementById('os-' + id + '-dg-blok');
    if (blok) blok.style.display = chk.checked ? 'grid' : 'none';
  }

  // ── Slownie ──
  function slownie(n) {
    if (isNaN(n) || n < 0) return '';
    n = Math.round(n);
    if (n === 0) return 'zero';
    const j1  = ['','jeden','dwa','trzy','cztery','pięć','sześć','siedem','osiem','dziewięć'];
    const j2  = ['','jedenaście','dwanaście','trzynaście','czternaście','piętnaście','szesnaście','siedemnaście','osiemnaście','dziewiętnaście'];
    const dz  = ['','dziesięć','dwadzieścia','trzydzieści','czterdzieści','pięćdziesiąt','sześćdziesiąt','siedemdziesiąt','osiemdziesiąt','dziewięćdziesiąt'];
    const st  = ['','sto','dwieście','trzysta','czterysta','pięćset','sześćset','siedemset','osiemset','dziewięćset'];
    const tys = ['','tysiąc','tysiące','tysięcy'];
    const mln = ['','milion','miliony','milionów'];
    function forma3(x) { if(x===1)return 0; if(x>=2&&x<=4)return 1; if(x>=12&&x<=14)return 2; const m=x%10; if(m>=2&&m<=4)return 1; return 2; }
    function seg(x) {
      let w = '';
      if(x>=100){w+=st[Math.floor(x/100)]+' ';x%=100;}
      if(x>=11&&x<=19){w+=j2[x-10];return w.trim();}
      if(x>=10){w+=dz[Math.floor(x/10)]+' ';x%=10;}
      if(x>0)w+=j1[x];
      return w.trim();
    }
    let wynik = '', rest = n;
    const mils = Math.floor(rest/1000000); rest %= 1000000;
    const tyss = Math.floor(rest/1000);    rest %= 1000;
    const setek = rest;
    if(mils>0){const f=forma3(mils);wynik+=seg(mils)+' '+[mln[1],mln[2],mln[3]][f]+' ';}
    if(tyss>0){
      if(tyss===1)wynik+='tysiąc ';
      else if(tyss===2)wynik+='dwa tysiące ';
      else if(tyss>=3&&tyss<=4)wynik+=seg(tyss)+' tysiące ';
      else{const f=forma3(tyss);wynik+=seg(tyss)+' '+[tys[1],tys[2],tys[3]][f]+' ';}
    }
    if(setek>0)wynik+=seg(setek);
    return wynik.trim();
  }

  function updSlownie(inId, outId) {
    const val = parseInt(document.getElementById(inId)?.value || '0');
    const el  = document.getElementById(outId);
    if (el) el.textContent = val > 0 ? slownie(val) + ' złotych' : '';
  }

  // ── Koniec rezerwacji ──
  function updKoniecRez() {
    const val = document.getElementById('ur_koniec_rez').value;
    const el  = document.getElementById('ur_termin_aktu');
    if (!val || !el) return;
    const d = new Date(val);
    const mies = ['stycznia','lutego','marca','kwietnia','maja','czerwca','lipca','sierpnia','września','października','listopada','grudnia'];
    el.value = d.getDate() + ' ' + mies[d.getMonth()] + ' ' + d.getFullYear() + ' r.';
  }

  // ── Forma płatności ──
  function setPlatnosc(typ) {
    platnosc = typ;
    const btns = { przelew: 'btn-platnosc-przelew', zagr: 'btn-platnosc-zagr', gotowka: 'btn-platnosc-gotowka' };
    Object.entries(btns).forEach(([t, id]) => {
      const btn = document.getElementById(id);
      if (!btn) return;
      btn.style.background = t === typ ? 'var(--navy)' : 'var(--cream)';
      btn.style.color      = t === typ ? '#fff'        : 'var(--gray)';
    });
    document.getElementById('blok-konto').style.display    = typ === 'gotowka' ? 'none'  : 'grid';
    document.getElementById('blok-gotowka').style.display  = typ === 'gotowka' ? 'block' : 'none';
    document.getElementById('blok-swift').style.display    = typ === 'zagr'    ? ''      : 'none';
    document.getElementById('blok-bank-nazwa').style.display = typ === 'zagr'  ? ''      : 'none';
    const input = document.getElementById('ur_konto');
    const hint  = document.getElementById('ur_konto_hint');
    if (input) {
      input.value = '';
      if (typ === 'przelew') {
        input.maxLength = 32; input.placeholder = '37 1020 1909 0000 3202 0132 1744';
        if (hint) { hint.style.color = 'var(--gray)'; hint.textContent = 'Wpisz 26 cyfr numeru rachunku (bez przedrostka PL)'; }
      } else if (typ === 'zagr') {
        input.maxLength = 42; input.placeholder = 'DE89 3704 0044 0532 0130 00';
        if (hint) { hint.style.color = 'var(--gray)'; hint.textContent = 'Format IBAN: 2 litery kodu kraju + cyfry kontrolne + numer konta'; }
      }
    }
  }

  function formatIBAN(input) {
    const hint = document.getElementById('ur_konto_hint');
    if (platnosc === 'przelew') {
      let val = input.value.replace(/\D/g, '');
      if (val.length > 26) val = val.slice(0, 26);
      let groups = [];
      for (let i = 0; i < val.length; i += 4) groups.push(val.slice(i, i + 4));
      input.value = groups.join(' ');
      input.maxLength = 32;
      if (hint) {
        if (val.length > 0 && val.length < 26) { hint.style.color = '#c00'; hint.textContent = 'Wpisz 26 cyfr (aktualnie: ' + val.length + ' z 26)'; }
        else if (val.length === 26) { hint.style.color = 'green'; hint.textContent = '✓ Poprawny numer rachunku'; }
        else { hint.style.color = 'var(--gray)'; hint.textContent = 'Wpisz 26 cyfr numeru rachunku (bez przedrostka PL)'; }
      }
    } else {
      let val = input.value.replace(/[^A-Z0-9]/gi, '').toUpperCase();
      if (val.length > 34) val = val.slice(0, 34);
      let groups = [];
      for (let i = 0; i < val.length; i += 4) groups.push(val.slice(i, i + 4));
      input.value = groups.join(' ');
      input.maxLength = 42;
    }
  }

  // ── Podpisy ──
  function urRenderSigs() {
    const container = document.getElementById('ur-sig-container');
    const sub       = document.getElementById('ur-sig-sub');
    if (!container) return;
    container.innerHTML = '';
    const spPersons = typState.sp === 'firm'
      ? [{ id: 'sp-repr', label: 'Sprzedający — ' + (document.getElementById('sp_firma_repr')?.value?.trim() || document.getElementById('sp_firma_nazwa')?.value?.trim() || 'Sprzedający') }]
      : osoby.sp.map(id => ({ id: 'sp-' + id, label: 'Sprzedający — ' + (document.getElementById('os-' + id + '-imie')?.value?.trim() || 'Sprzedający') }));
    const kuPersons = typState.ku === 'firm'
      ? [{ id: 'ku-repr', label: 'Kupujący — ' + (document.getElementById('ku_firma_repr')?.value?.trim() || document.getElementById('ku_firma_nazwa')?.value?.trim() || 'Kupujący') }]
      : osoby.ku.map(id => ({ id: 'ku-' + id, label: 'Kupujący — ' + (document.getElementById('os-' + id + '-imie')?.value?.trim() || 'Kupujący') }));
    const all = [...kuPersons, ...spPersons];
    const total = all.length;
    if (sub) sub.textContent = total + (total === 1 ? ' osoba' : total <= 4 ? ' osoby' : ' osób') + ' — każda podpisuje osobno';
    all.forEach(p => {
      const cid = 'ur-sig-' + p.id;
      const div = document.createElement('div');
      div.innerHTML = `<div style="font-size:12px;font-weight:600;color:var(--navy);margin-bottom:6px;">${p.label}</div>
        <canvas id="${cid}" class="sig-canvas" width="340" height="100"></canvas>
        <button onclick="HEX.clearSig('${cid}')" style="margin-top:4px;font-size:11px;color:var(--gray);background:none;border:none;cursor:pointer;">✕ Wyczyść</button>`;
      container.appendChild(div);
      HEX.initSig(cid);
    });
  }

  function urCollectSigs() {
    const container = document.getElementById('ur-sig-container');
    if (!container) return [];
    return Array.from(container.querySelectorAll('canvas')).map(c => ({
      id:    c.id,
      label: c.previousElementSibling?.textContent || c.id,
      sig:   HEX.getSig(c.id),
    }));
  }

  // ── Budowanie opisu osoby ──
  function buildOsobaText(id) {
    const g     = s => document.getElementById('os-' + id + '-' + s)?.value?.trim() || '';
    const imie  = g('imie');
    const ojciec = g('ojciec');
    const matka  = g('matka');
    const stan   = g('stan');
    const adres  = g('adres');
    const pesel  = g('pesel');
    const dowod  = g('dowod');
    const hasDG  = document.getElementById('os-' + id + '-dg')?.checked;
    const dgNazwa = g('dg-nazwa'), dgNip = g('dg-nip'), dgRegon = g('dg-regon');
    const jestK = stan === 'zamężna' || stan === 'panna' || stan === 'wdowa' || stan === 'rozwiedziona';
    let txt = imie;
    if (ojciec || matka) txt += ', ' + (jestK ? 'córką' : 'synem') + ' ' + [ojciec, matka].filter(Boolean).join(' i ');
    txt += ', według oświadczenia ' + stan;
    txt += ', zamieszkał' + (jestK ? 'a' : '') + ' ' + adres;
    txt += ', PESEL: ' + pesel + ', dowód osobisty: ' + dowod;
    if (hasDG && dgNazwa) {
      txt += ', prowadząc' + (jestK ? 'ą' : 'y') + ' działalność gospodarczą jako ' + dgNazwa;
      if (dgNip)   txt += ' NIP: ' + dgNip;
      if (dgRegon) txt += ', REGON: ' + dgRegon;
    }
    return txt;
  }

  // ── Reset ──
  function resetForm() {
    ['ur_data','ur_miejsce','nr_lok','ur_pow','ur_pietro','ur_klatka',
     'ur_ulica','ur_miejsce_post','ur_komorka','ur_kw','ur_sad',
     'ur_cena','ur_oplata','ur_termin_wplaty','ur_konto',
     'ur_koniec_rez','ur_termin_aktu',
     'sp_firma_nazwa','sp_firma_nip','sp_firma_regon','sp_firma_adres','sp_firma_repr',
     'ku_firma_nazwa','ku_firma_nip','ku_firma_regon','ku_firma_adres','ku_firma_repr'
    ].forEach(id => { const e = document.getElementById(id); if (e) e.value = ''; });
    ['ur_cena_slow','ur_oplata_slow'].forEach(id => { const e = document.getElementById(id); if (e) e.textContent = ''; });
    document.getElementById('sp-osoby').innerHTML = '';
    document.getElementById('ku-osoby').innerHTML = '';
    osoby.sp = []; osoby.ku = [];
    setTyp('sp', 'os'); setTyp('ku', 'os');
    const sCont = document.getElementById('ur-sig-container'); if (sCont) sCont.innerHTML = '';
    document.getElementById('ur_data').value = new Date().toISOString().split('T')[0];
  }

  // ── Generuj PDF ──
  function generatePDF() {
    const F = HEX.loadFirmaData(); HEX.buildFirmaPochodne(F);
    const g = id => document.getElementById(id)?.value?.trim() || '';

    const wymagane = [
      [g('ur_data'),       'Data zawarcia'],
      [g('ur_miejsce'),    'Miejscowość'],
      [g('ur_kw'),         'Numer KW'],
      [g('ur_cena'),       'Cena nieruchomości'],
      [g('ur_oplata'),     'Opłata rezerwacyjna'],
      [platnosc === 'gotowka' ? '1' : g('ur_konto'), 'Numer konta (lub wybierz gotówkę)'],
      [platnosc === 'zagr' && !g('ur_swift') ? '' : '1', 'Kod SWIFT (wymagany przy przelewie zagranicznym)'],
      [g('ur_koniec_rez'), 'Data końca rezerwacji'],
      [platnosc === 'gotowka' ? '1' : g('ur_termin_wplaty'), 'Termin wpłaty'],
    ];
    const brak = wymagane.filter(([v]) => !v).map(([, l]) => l);
    if (brak.length) { alert('Uzupełnij wymagane pola:\n• ' + brak.join('\n• ')); return; }

    const NAVY = '#1a2b5e', S = 9.5, LH = 1.35;
    const styles = {
      tytul: { font: 'Roboto', fontSize: 14, bold: true, alignment: 'center', margin: [0,0,0,4] },
      par:   { font: 'Roboto', fontSize: S, bold: true, alignment: 'center', margin: [0,10,0,4] },
      body:  { font: 'Roboto', fontSize: S, lineHeight: LH, alignment: 'justify' },
    };
    const pl = t => ({ text: t || '', font: 'Roboto', fontSize: S, lineHeight: LH, alignment: 'justify' });
    const hr = m => ({ canvas: [{ type: 'line', x1:0, y1:0, x2:495, y2:0, lineWidth:0.5, lineColor:'#ccc' }], margin: m || [0,6,0,6] });

    const dataZaw   = HEX.fmtDateL(g('ur_data'));
    const miejsce   = g('ur_miejsce');
    const koniecRez = HEX.fmtDateL(g('ur_koniec_rez'));
    const termin    = HEX.fmtDateL(g('ur_termin_wplaty'));
    const cena      = parseInt(g('ur_cena'));
    const oplata    = parseInt(g('ur_oplata'));
    const cenaSl    = slownie(cena) + ' złotych brutto';
    const oplataSl  = slownie(oplata) + ' złotych';
    const kw        = g('ur_kw');
    const sad       = g('ur_sad') || 'właściwy Sąd Rejonowy';
    const ulica     = g('ur_ulica');
    const klatka    = g('ur_klatka');
    const pietro    = g('ur_pietro');
    const pow       = g('ur_pow');
    const lok       = g('nr_lok');
    const mPost     = g('ur_miejsce_post');
    const komorka   = g('ur_komorka');
    const kontoRaw  = g('ur_konto').replace(/\s/g, '');
    const konto     = platnosc === 'przelew' ? 'PL' + kontoRaw : kontoRaw;

    let opisNieruch = 'lokalu mieszkalnego numer ' + lok + ' o powierzchni ' + pow + ' m²';
    opisNieruch += ', zlokalizowanego na ' + pietro;
    opisNieruch += ' budynku położonego przy ulicy ' + ulica + (klatka ? ' kl.' + klatka : '');
    if (mPost)   opisNieruch += ', wraz z przynależnym miejscem postojowym w hali garażowej nr ' + mPost;
    if (komorka) opisNieruch += ' i komórką lokatorską nr ' + komorka;
    opisNieruch += '. Dla przedmiotowego lokalu, ' + sad + ', prowadzi księgę wieczystą: ' + kw + '.';

    const buildStrona = (strona) => {
      const typ = typState[strona];
      if (typ === 'firm') {
        const p = strona;
        const nazwa  = g(p + '_firma_nazwa');
        const nip    = g(p + '_firma_nip');
        const regon  = g(p + '_firma_regon');
        const adresF = g(p + '_firma_adres');
        const repr   = g(p + '_firma_repr');
        let txt = nazwa;
        if (adresF) txt += ' z siedzibą w ' + adresF;
        if (nip)    txt += ', NIP: ' + nip;
        if (regon)  txt += ', REGON: ' + regon;
        if (repr)   txt += ', reprezentowaną przez: ' + repr;
        return txt;
      }
      return osoby[strona].map(id => buildOsobaText(id)).join('\ni\n');
    };

    const sp_txt   = buildStrona('sp');
    const ku_txt   = buildStrona('ku');
    const sp_label = osoby.sp.length > 1 || typState.sp === 'firm' ? 'Sprzedającymi' : 'Sprzedającym';
    const ku_label = osoby.ku.length > 1 || typState.ku === 'firm' ? 'Kupującymi'    : 'Kupującym';

    const allSigs = urCollectSigs();
    const mkSig   = (sig, lbl) => ({ stack: [
      sig ? { image: sig, width: 120, height: 36, margin: [0,0,0,2] }
          : { canvas: [{ type: 'line', x1:0, y1:36, x2:150, y2:36, lineWidth:0.5, lineColor:'#999' }], margin: [0,0,0,2] },
      { text: lbl, fontSize: 7.5, color: '#666' },
    ]});

    const d = { dataZaw, miejsce, sp_label, ku_label, opisNieruch, cena, cenaSl, oplata, oplataSl, koniecRez, termin };
    const content = [];

    // Nagłówek
    content.push({ columns: [
      { image: 'logo', width: 80, margin: [0,0,0,0] },
      { stack: [
        { text: 'Umowa Rezerwacyjna', style: 'tytul' },
        { canvas: [{ type: 'line', x1:0, y1:0, x2:400, y2:0, lineWidth:1.5, lineColor: NAVY }], margin: [0,4,0,0] },
      ], width: '*', margin: [14,4,0,0] }
    ], margin: [0,0,0,12] });

    content.push(pl(getText('rez.intro', d)));
    content.push(hr([0,6,0,4]));
    content.push({ text: sp_txt, font: 'Roboto', fontSize: S, bold: true, lineHeight: LH });
    content.push({ text: getText('rez.zwani_sp', d), font: 'Roboto', fontSize: S, italics: true, margin: [0,2,0,6] });
    content.push(hr([0,2,0,4]));
    content.push({ text: getText('rez.a'), font: 'Roboto', fontSize: S, bold: true, alignment: 'center', margin: [0,0,0,4] });
    content.push(hr([0,2,0,4]));
    content.push({ text: ku_txt, font: 'Roboto', fontSize: S, bold: true, lineHeight: LH });
    content.push({ text: getText('rez.zwani_ku', d), font: 'Roboto', fontSize: S, italics: true, margin: [0,2,0,6] });
    content.push(hr([0,2,0,4]));
    content.push({ text: getText('rez.strony'), style: 'body', margin: [0,0,0,10] });

    content.push({ text: '§ 1', style: 'par', color: NAVY });
    content.push(pl(getText('rez.par1', d)));
    content.push({ text: '§ 2', style: 'par', color: NAVY });
    content.push(pl(getText('rez.par2', d)));
    content.push({ text: '§ 3', style: 'par', color: NAVY });
    content.push(pl(getText('rez.par3a', d)));
    content.push({ text: getText('rez.par3b'), style: 'body', margin: [0,4,0,0] });

    const swift     = g('ur_swift');
    const bankNazwa = g('ur_bank_nazwa');
    content.push({ text: '§ 4', style: 'par', color: NAVY });
    if (platnosc === 'gotowka') {
      content.push(pl(getText('rez.par4_gotowka', d)));
    } else if (platnosc === 'zagr') {
      content.push(pl(getText('rez.par4_zagr_intro', d)));
      const ibanLines = [{ text: konto, font: 'Roboto', fontSize: S, bold: true }];
      if (swift)     ibanLines.push({ text: 'SWIFT/BIC: ' + swift,  font: 'Roboto', fontSize: S, bold: true });
      if (bankNazwa) ibanLines.push({ text: 'Bank: ' + bankNazwa,   font: 'Roboto', fontSize: S });
      content.push({ stack: ibanLines, alignment: 'center', margin: [0,6,0,6] });
    } else {
      content.push(pl(getText('rez.par4_przelew_intro', d)));
      content.push({ text: konto, font: 'Roboto', fontSize: S, bold: true, alignment: 'center', margin: [0,6,0,6] });
    }

    content.push({ text: '§ 5', style: 'par', color: NAVY });
    content.push(pl(getText('rez.par5', d)));
    content.push({ text: '§ 6', style: 'par', color: NAVY });
    content.push(pl(getText('rez.par6')));

    content.push({ canvas: [{ type: 'line', x1:0, y1:0, x2:495, y2:0, lineWidth:0.5, lineColor:'#bbb' }], margin: [0,20,0,14] });
    if (allSigs.length > 0) {
      for (let i = 0; i < allSigs.length; i += 2) {
        const row  = allSigs.slice(i, i + 2);
        const cols = row.length === 2
          ? [mkSig(row[0].sig, row[0].label), mkSig(row[1].sig, row[1].label)]
          : [mkSig(row[0].sig, row[0].label), { text: '' }];
        content.push({ columns: cols, columnGap: 40, margin: [0,0,0,12] });
      }
    } else {
      content.push({ columns: [mkSig(null, 'KUPUJĄCY'), mkSig(null, 'SPRZEDAJĄCY')], columnGap: 40 });
    }

    const docDef = {
      pageSize: 'A4', pageMargins: [55, 8, 55, 45],
      defaultStyle: { font: 'Roboto', fontSize: S, lineHeight: LH },
      styles,
      images: { logo: LOGO_PDF_B64 },
      content,
      footer: (cur, tot) => ({ columns: [
        { text: F.stopka || 'Home Experts' + ' | Umowa Rezerwacyjna', fontSize: 7, color: '#999', margin: [55,0,0,0] },
        { text: 'Strona ' + cur + ' z ' + tot, fontSize: 7, color: '#999', alignment: 'right', margin: [0,0,55,0] },
      ]}),
    };
    const datePart = g('ur_data') || new Date().toISOString().split('T')[0];
    pdfMake.createPdf(docDef).download('UmowaRezerwacyjna_' + datePart + '.pdf');
  }

  // ── Init ──
  function init() {
    if (document.getElementById('rez-container')) return; // już zainicjowany
    render();
    // Ustaw domyślną datę
    const urData = document.getElementById('ur_data');
    if (urData && !urData.value) urData.value = new Date().toISOString().split('T')[0];
    // Dodaj pierwsze osoby
    if (osoby.sp.length === 0) addOsoba('sp');
    if (osoby.ku.length === 0) addOsoba('ku');
    // Ustaw domyślną formę płatności
    setPlatnosc('przelew');
  }

  // ── Rejestracja ──
  HEX.registerModule('rezerwacja', { onActivate: init });

  // Public API
  return { goTo, setTyp, addOsoba, removeOsoba, toggleDG, updSlownie, updKoniecRez, setPlatnosc, formatIBAN, generatePDF, resetForm };

})();
