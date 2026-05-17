// ═══════════════════════════════════════════════════════════
// MODUŁ: ANEKSY + PROTOKÓŁ PREZENTACJI
// HEX Dokumenty v4.0
// Rejestracja: HEX.registerModule('aneksy', { onActivate })
// ═══════════════════════════════════════════════════════════

const AX = (() => {

  // ── Stan modułu ──
  let lang      = 'pl';
  let klientTyp = 'pryw';
  let platForm  = 'jedna';
  let typUmowy  = 'ekskl';
  let prLista   = [];

  // ── HTML modułu — wstrzykiwany do #aneksy-root ──
  function render() {
    document.getElementById('aneksy-root').innerHTML = `

    <!-- START: wybór sekcji -->
    <div id="aneksy-start">
      <div class="container">
        <div style="text-align:center;padding:40px 0 28px;">
          <div style="font-family:'Playfair Display',serif;font-size:28px;font-weight:700;color:var(--navy);margin-bottom:8px;">Aneksy i Protokoły</div>
          <div style="font-size:14px;color:var(--gray);">Wybierz typ dokumentu który chcesz wygenerować</div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px;max-width:700px;margin:0 auto;">
          <div class="start-tile" onclick="AX.showAneks()">
            <div class="start-tile-icon">📎</div>
            <div class="start-tile-title">Aneks do umowy</div>
            <div class="start-tile-desc">Zmiana prowizji, płatności, czasu lub typu umowy pośrednictwa</div>
          </div>
          <div class="start-tile" onclick="AX.showProto()">
            <div class="start-tile-icon">🏠</div>
            <div class="start-tile-title">Protokół prezentacji</div>
            <div class="start-tile-desc">Potwierdzenie prezentacji nieruchomości klientowi</div>
          </div>
        </div>
      </div>
    </div>

    <!-- FORMULARZ ANEKSU -->
    <div id="aneksy-form" style="display:none;">
      <div class="container">
        <button onclick="AX.showStart()" class="btn btn-ghost" style="margin-bottom:20px;">← Powrót</button>

        <div class="card">
          <div class="card-title">Aneks do umowy pośrednictwa</div>
          <div class="card-sub">Wypełnij dane i wybierz powody aneksu</div>

          <!-- Dane umowy -->
          <div class="section-label">Dane umowy</div>
          <div class="form-grid">
            <div class="field">
              <label>Nr umowy <span class="req">*</span></label>
              <input id="ax_nr_umowy" placeholder="np. HE/2024/001">
            </div>
            <div class="field">
              <label>Data zawarcia umowy <span class="req">*</span></label>
              <input type="date" id="ax_data_umowy">
            </div>
            <div class="field">
              <label>Data aneksu <span class="req">*</span></label>
              <input type="date" id="ax_data_aneksu">
            </div>
            <div class="field">
              <label>Miejsce zawarcia <span class="req">*</span></label>
              <input id="ax_miejsce" placeholder="np. Gdańsk">
            </div>
          </div>

          <!-- Typ klienta -->
          <div class="section-label" style="margin-top:20px;">Typ klienta</div>
          <div style="display:flex;gap:10px;margin-bottom:16px;">
            <button id="ax-btn-pryw" class="lang-btn active" onclick="AX.setTyp('pryw')">👤 Osoba prywatna</button>
            <button id="ax-btn-firma" class="lang-btn" onclick="AX.setTyp('firma')">🏢 Firma</button>
          </div>

          <div class="form-grid">
            <div class="field" id="ax-f-firma-nazwa" style="display:none;grid-column:span 2;">
              <label>Nazwa firmy <span class="req">*</span></label>
              <input id="ax_firma_nazwa" placeholder="np. Kowalski Sp. z o.o.">
            </div>
            <div class="field">
              <label id="ax-lbl-imie">Imię i nazwisko <span class="req">*</span></label>
              <input id="ax_imie" placeholder="np. Jan Kowalski">
            </div>
            <div class="field">
              <label>PESEL / NIP</label>
              <input id="ax_pesel" placeholder="PESEL lub NIP">
            </div>
            <div class="field">
              <label>Nr dokumentu tożsamości</label>
              <input id="ax_dowod" placeholder="opcjonalnie">
            </div>
            <div class="field">
              <label>Adres <span class="req">*</span></label>
              <input id="ax_adres" placeholder="ul. Przykładowa 1, Gdańsk">
            </div>
            <div class="field">
              <label>Email</label>
              <input id="ax_email" type="email" placeholder="klient@email.pl">
            </div>
            <div class="field">
              <label>Telefon</label>
              <input id="ax_tel" type="tel" placeholder="+48 600 000 000">
            </div>
          </div>

          <!-- Powody aneksu -->
          <div class="section-label" style="margin-top:20px;">Powody aneksu <span class="req">*</span></div>
          <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:16px;">

            <!-- A: Prowizja -->
            <div class="powod-card" id="powod-A">
              <div class="powod-header" onclick="AX.tileToggle('A')">
                <div class="powod-badge" id="ax-tile-A">A</div>
                <div class="powod-label">Zmiana wysokości prowizji</div>
                <input type="checkbox" id="chk-A" style="accent-color:var(--gold);" onclick="event.stopPropagation();AX.tileToggle('A')">
              </div>
              <div class="powod-fields">
                <div class="form-grid" style="margin-top:12px;">
                  <div class="field">
                    <label>Stara prowizja</label>
                    <input id="ax_prow_stara" placeholder="np. 2%">
                  </div>
                  <div class="field">
                    <label>Nowa prowizja</label>
                    <input id="ax_prow_nowa" placeholder="np. 1,5%">
                  </div>
                </div>
              </div>
            </div>

            <!-- B: Płatność -->
            <div class="powod-card" id="powod-B">
              <div class="powod-header" onclick="AX.tileToggle('B')">
                <div class="powod-badge" id="ax-tile-B">B</div>
                <div class="powod-label">Zmiana formy płatności prowizji</div>
                <input type="checkbox" id="chk-B" style="accent-color:var(--gold);" onclick="event.stopPropagation();AX.tileToggle('B')">
              </div>
              <div class="powod-fields">
                <div style="display:flex;gap:10px;margin-top:12px;">
                  <button id="ax-b-jedna" class="lang-btn active" onclick="AX.platnosc('jedna')">Jednorazowa</button>
                  <button id="ax-b-dwie" class="lang-btn" onclick="AX.platnosc('dwie')">Dwie raty</button>
                </div>
              </div>
            </div>

            <!-- C: Typ umowy -->
            <div class="powod-card" id="powod-C">
              <div class="powod-header" onclick="AX.tileToggle('C')">
                <div class="powod-badge" id="ax-tile-C">C</div>
                <div class="powod-label">Zmiana typu umowy</div>
                <input type="checkbox" id="chk-C" style="accent-color:var(--gold);" onclick="event.stopPropagation();AX.tileToggle('C')">
              </div>
              <div class="powod-fields">
                <div style="display:flex;gap:10px;margin-top:12px;">
                  <button id="ax-c-ekskl" class="lang-btn active" onclick="AX.typUm('ekskl')">Na wyłączność</button>
                  <button id="ax-c-otwarta" class="lang-btn" onclick="AX.typUm('otwarta')">Otwarta</button>
                </div>
              </div>
            </div>

            <!-- D: Czas -->
            <div class="powod-card" id="powod-D">
              <div class="powod-header" onclick="AX.tileToggle('D')">
                <div class="powod-badge" id="ax-tile-D">D</div>
                <div class="powod-label">Zmiana czasu obowiązywania umowy</div>
                <input type="checkbox" id="chk-D" style="accent-color:var(--gold);" onclick="event.stopPropagation();AX.tileToggle('D')">
              </div>
              <div class="powod-fields">
                <div class="form-grid" style="margin-top:12px;">
                  <div class="field">
                    <label>Stary czas (miesiące)</label>
                    <input id="ax_czas_stary" placeholder="np. 6">
                  </div>
                  <div class="field">
                    <label>Nowy czas (miesiące)</label>
                    <input id="ax_czas_nowy" placeholder="np. 12">
                  </div>
                  <div class="field span2">
                    <label>Nowa data wygaśnięcia</label>
                    <input type="date" id="ax_data_wyg">
                  </div>
                </div>
              </div>
            </div>

          </div>

          <!-- Język dokumentu -->
          <div class="section-label">Język dokumentu</div>
          <div class="lang-strip">
            <button id="ax-clang-pl" class="clang-btn selected" onclick="AX.langTile('pl')"><span>🇵🇱</span><span>PL</span></button>
            <button id="ax-clang-en" class="clang-btn" onclick="AX.langTile('en')"><span>🇬🇧</span><span>EN</span></button>
          </div>

          <!-- Podpisy -->
          <div class="section-label" style="margin-top:4px;">Podpisy</div>
          <div class="sig-row">
            <div>
              <label style="font-size:11px;display:block;margin-bottom:6px;">Podpis klienta</label>
              <div class="sig-wrap" id="ax-sig-klient-wrap">
                <canvas class="sig-canvas" id="ax-sig-klient" width="400" height="180"></canvas>
              </div>
              <button class="btn btn-ghost sig-clear-btn" style="margin-top:6px;font-size:12px;" onclick="HEX.clearSig('ax-sig-klient')">Wyczyść</button>
            </div>
            <div>
              <label style="font-size:11px;display:block;margin-bottom:6px;">Podpis pośrednika</label>
              <div class="sig-wrap" id="ax-sig-posrednik-wrap">
                <canvas class="sig-canvas" id="ax-sig-posrednik" width="400" height="180"></canvas>
              </div>
              <button class="btn btn-ghost sig-clear-btn" style="margin-top:6px;font-size:12px;" onclick="HEX.clearSig('ax-sig-posrednik')">Wyczyść</button>
            </div>
          </div>

          <div class="nav-row" style="margin-top:28px;">
            <button class="btn btn-ghost" onclick="AX.reset()">🔄 Wyczyść formularz</button>
            <button class="btn btn-gold" onclick="AX.generatePDF()">
              <span class="icon">📄</span> Generuj Aneks PDF
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- FORMULARZ PROTOKOŁU -->
    <div id="aneksy-proto-form" style="display:none;">
      <div class="container">
        <button onclick="AX.showStart()" class="btn btn-ghost" style="margin-bottom:20px;">← Powrót</button>

        <div class="card">
          <div class="card-title">Protokół prezentacji nieruchomości</div>
          <div class="card-sub">Potwierdź przeprowadzone prezentacje</div>

          <div class="section-label">Dane klienta</div>
          <div class="form-grid">
            <div class="field">
              <label>Imię i nazwisko <span class="req">*</span></label>
              <input id="pr_imie" placeholder="np. Jan Kowalski">
            </div>
            <div class="field">
              <label>Telefon</label>
              <input id="pr_tel" type="tel" placeholder="+48 600 000 000">
            </div>
            <div class="field span2">
              <label>Email</label>
              <input id="pr_email" type="email" placeholder="klient@email.pl">
            </div>
          </div>

          <div class="section-label" style="margin-top:20px;">Nieruchomości</div>
          <div id="pr-lista"></div>
          <button class="proto-add-btn" id="pr-add-btn" onclick="AX.prDodaj()">+ Dodaj nieruchomość</button>

          <div id="pr-podpisy" style="display:none;margin-top:24px;">
            <div class="section-label">Podpisy</div>
            <div class="sig-row">
              <div>
                <label style="font-size:11px;display:block;margin-bottom:6px;">Podpis klienta</label>
                <div class="sig-wrap">
                  <canvas class="sig-canvas" id="pr-sig-klient" width="400" height="180"></canvas>
                </div>
                <button class="btn btn-ghost sig-clear-btn" style="margin-top:6px;font-size:12px;" onclick="HEX.clearSig('pr-sig-klient')">Wyczyść</button>
              </div>
              <div>
                <label style="font-size:11px;display:block;margin-bottom:6px;">Podpis agenta</label>
                <div class="sig-wrap">
                  <canvas class="sig-canvas" id="pr-sig-agent" width="400" height="180"></canvas>
                </div>
                <button class="btn btn-ghost sig-clear-btn" style="margin-top:6px;font-size:12px;" onclick="HEX.clearSig('pr-sig-agent')">Wyczyść</button>
              </div>
            </div>
          </div>

          <div class="nav-row" style="margin-top:28px;">
            <button class="btn btn-ghost" onclick="AX.prReset()">🔄 Wyczyść</button>
            <button class="btn btn-gold" onclick="AX.prGeneratePDF()">
              <span class="icon">📄</span> Generuj Protokół PDF
            </button>
          </div>
        </div>
      </div>
    </div>
    `;
  }

  // ── Nawigacja ──
  function showStart() {
    document.getElementById('aneksy-start').style.display = '';
    document.getElementById('aneksy-form').style.display = 'none';
    document.getElementById('aneksy-proto-form').style.display = 'none';
  }

  function showAneks() {
    document.getElementById('aneksy-start').style.display = 'none';
    document.getElementById('aneksy-form').style.display = '';
    document.getElementById('aneksy-proto-form').style.display = 'none';
    HEX.initSig('ax-sig-klient');
    HEX.initSig('ax-sig-posrednik');
    const f = HEX.loadFirmaData();
    const m = document.getElementById('ax_miejsce');
    if (m && !m.value && f.miasto) m.value = f.miasto;
    const d = document.getElementById('ax_data_aneksu');
    if (d && !d.value) d.value = new Date().toISOString().split('T')[0];
  }

  function showProto() {
    document.getElementById('aneksy-start').style.display = 'none';
    document.getElementById('aneksy-form').style.display = 'none';
    document.getElementById('aneksy-proto-form').style.display = '';
    if (prLista.length === 0) prDodaj();
    HEX.initSig('pr-sig-klient');
    HEX.initSig('pr-sig-agent');
  }

  // ── Aneks: typ klienta ──
  function setTyp(typ) {
    klientTyp = typ;
    ['pryw', 'firma'].forEach(t => document.getElementById('ax-btn-' + t)?.classList.toggle('selected', t === typ));
    document.getElementById('ax-f-firma-nazwa').style.display = typ === 'firma' ? '' : 'none';
    const lbl = document.getElementById('ax-lbl-imie');
    if (lbl) lbl.innerHTML = typ === 'firma'
      ? 'Imię i nazwisko repr. <span class="req">*</span>'
      : 'Imię i nazwisko <span class="req">*</span>';
  }

  // ── Aneks: toggle powodu ──
  function tileToggle(lit) {
    const tile = document.getElementById('ax-tile-' + lit);
    const chk  = document.getElementById('chk-' + lit);
    if (!tile) return;
    const isOn = tile.classList.toggle('selected');
    if (chk) chk.checked = isOn;
    document.getElementById('powod-' + lit)?.classList.toggle('selected', isOn);
    const anyOn = ['A','B','C','D'].some(l => document.getElementById('ax-tile-' + l)?.classList.contains('selected'));
  }

  // ── Aneks: forma płatności ──
  function platnosc(typ) {
    platForm = typ;
    ['jedna', 'dwie'].forEach(t => document.getElementById('ax-b-' + t)?.classList.toggle('selected', t === typ));
  }

  // ── Aneks: typ umowy ──
  function typUm(typ) {
    typUmowy = typ;
    ['ekskl', 'otwarta'].forEach(t => document.getElementById('ax-c-' + t)?.classList.toggle('selected', t === typ));
  }

  // ── Język (pl/en tylko) ──
  function langTile(l) {
    lang = l;
    ['pl', 'en'].forEach(x => document.getElementById('ax-clang-' + x)?.classList.toggle('selected', x === l));
  }

  // ── Aneks: reset ──
  function reset() {
    ['ax_nr_umowy','ax_data_umowy','ax_miejsce','ax_imie','ax_firma_nazwa',
     'ax_pesel','ax_dowod','ax_adres','ax_email','ax_tel',
     'ax_prow_stara','ax_prow_nowa','ax_czas_stary','ax_czas_nowy','ax_data_wyg'
    ].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
    ['A','B','C','D'].forEach(l => {
      const chk = document.getElementById('chk-' + l);
      if (chk) chk.checked = false;
      document.getElementById('ax-tile-' + l)?.classList.remove('selected');
      document.getElementById('powod-' + l)?.classList.remove('selected');
    });
    langTile('pl');
    HEX.clearSig('ax-sig-klient');
    HEX.clearSig('ax-sig-posrednik');
    const d = document.getElementById('ax_data_aneksu');
    if (d) d.value = new Date().toISOString().split('T')[0];
  }

  // ── Generuj Aneks PDF ──
  function generatePDF() {
    const isBil = lang !== 'pl';
    const vv    = id => document.getElementById(id)?.value?.trim() || '';
    const powody = ['A','B','C','D'].filter(l => document.getElementById('chk-' + l)?.checked);
    if (!powody.length) { alert('Zaznacz co najmniej jeden powód aneksu.'); return; }

    const F = HEX.loadFirmaData(); HEX.buildFirmaPochodne(F);
    const nrUm   = vv('ax_nr_umowy') || '...';
    const dataUm = HEX.fmtDateL(vv('ax_data_umowy'));
    const dataAn = HEX.fmtDateL(vv('ax_data_aneksu'));
    const miej   = vv('ax_miejsce')  || '...';
    const imie   = vv('ax_imie')     || '...';
    const adres  = vv('ax_adres')    || '...';
    const pesel  = vv('ax_pesel')    || '...';
    const dowod  = vv('ax_dowod');
    const NAVY   = '#1a2b5e';
    const S = 9.5, ST = 8, LH = 1.35;

    const styles = {
      title: { font:'Roboto', fontSize: isBil?9:10, bold:true, alignment:'center', margin:[0,0,0,2] },
      sub:   { font:'Roboto', fontSize:8, alignment:'center', margin:[0,0,0,2] },
      body:  { font:'Roboto', fontSize:S, lineHeight:LH, alignment:'justify' },
      sec:   { font:'Roboto', fontSize:9.5, bold:true, margin:[0,8,0,3] },
    };
    const pl = t => ({ text: t||'', font:'Roboto', fontSize:S, lineHeight:LH, alignment:'justify' });
    const tr = t => ({ text: t||'', font:'Roboto', fontSize:ST, italics:true, lineHeight:LH, color:'#2d5a8e', alignment:'justify' });
    const hr = (c,m) => ({ canvas:[{ type:'line',x1:0,y1:0,x2:495,y2:0,lineWidth:c?1:0.4,lineColor:c||'#ccc' }], margin:m||[0,0,0,4] });

    const plC = [], trC = [];
    const bp = (p, t) => { if (p) plC.push(p); if (isBil && t) trC.push(t); };

    const dNr = { nrUm, dataUm };
    const dMj = { dataAn, miej };

    // Nagłówek
    plC.push({ columns:[{ image:'logo', width:80 },{ stack:[
      { text: getText('ax.title'), style:'title' },
      { text: getText('ax.tytul', dNr), style:'sub' },
      { canvas:[{ type:'line',x1:0,y1:0,x2:400,y2:0,lineWidth:1.5,lineColor:NAVY }], margin:[0,4,0,0] },
    ], width:'*', margin:[12,0,0,0] }], margin:[0,0,0,10] });

    if (isBil) trC.push({ columns:[{ image:'logo', width:80 },{ stack:[
      { text: getText('ax.title', null, lang), style:'title', color:'#2d5a8e', italics:true },
      { text: getText('ax.tytul', dNr, lang), style:'sub', color:'#2d5a8e', italics:true },
      { canvas:[{ type:'rect',x:0,y:0,w:400,h:2,color:'#2d5a8e' }], margin:[0,4,0,0] },
    ], width:'*', margin:[12,0,0,0] }], margin:[0,0,0,10] });

    bp(pl(getText('ax.zawarto', dMj)), isBil ? tr(getText('ax.zawarto', dMj, lang)) : null);
    bp(hr(), isBil ? hr() : null);

    const kDesc = klientTyp === 'firma'
      ? `${vv('ax_firma_nazwa')||'...'}, repr. przez ${imie}, NIP: ${pesel}, adres: ${adres}`
      : `${imie}, PESEL: ${pesel}${dowod ? ', nr dok.: '+dowod : ''}, adres: ${adres}`;
    bp(pl(kDesc), isBil ? tr(kDesc) : null);
    bp({ text: getText('ax.klient'), font:'Roboto', fontSize:S, italics:true, margin:[0,0,0,6] },
       isBil ? { text: getText('ax.klient', null, lang), font:'Roboto', fontSize:ST, italics:true, color:'#2d5a8e', margin:[0,0,0,6] } : null);
    bp(hr(), isBil ? hr() : null);

    const firmaTxt = `${F.pelna||F.nazwa}, NIP: ${F.nip}, repr. przez ${F.agent} — ${F.stanowisko||'pełnomocnik'}`;
    bp(pl(firmaTxt), isBil ? tr(firmaTxt) : null);
    bp({ text: getText('ax.posrednik'), font:'Roboto', fontSize:S, italics:true, margin:[0,0,0,8] },
       isBil ? { text: getText('ax.posrednik', null, lang), font:'Roboto', fontSize:ST, italics:true, color:'#2d5a8e', margin:[0,0,0,8] } : null);

    bp(hr(NAVY,[0,4,0,4]), isBil ? hr(NAVY,[0,4,0,4]) : null);
    bp({ text:'§ 1', style:'sec', alignment:'center' },
       isBil ? { text:'§ 1', font:'Roboto', fontSize:ST, bold:true, italics:true, color:'#2d5a8e', alignment:'center', margin:[0,0,0,3] } : null);
    bp(pl(getText('ax.par1', dNr)), isBil ? tr(getText('ax.par1', dNr, lang)) : null);
    bp({ text:'', margin:[0,3,0,0] }, isBil ? { text:'', margin:[0,3,0,0] } : null);

    let n = 1;
    if (powody.includes('A')) {
      const dA = { s: vv('ax_prow_stara')||'...', nw: vv('ax_prow_nowa')||'...' };
      bp(pl(`${n}. ` + getText('ax.powodA', dA)), isBil ? tr(getText('ax.powodA', dA, lang)) : null);
      bp({ text:'', margin:[0,2,0,0] }, isBil ? { text:'', margin:[0,2,0,0] } : null); n++;
    }
    if (powody.includes('B')) {
      const keyB = platForm === 'jedna' ? 'ax.powodB_jedna' : 'ax.powodB_dwie';
      bp(pl(`${n}. ` + getText(keyB)), isBil ? tr(getText(keyB, null, lang)) : null);
      bp({ text:'', margin:[0,2,0,0] }, isBil ? { text:'', margin:[0,2,0,0] } : null); n++;
    }
    if (powody.includes('C')) {
      const keyC = typUmowy === 'ekskl' ? 'ax.powodC_ekskl' : 'ax.powodC_otwarta';
      bp(pl(`${n}. ` + getText(keyC)), isBil ? tr(getText(keyC, null, lang)) : null);
      bp({ text:'', margin:[0,2,0,0] }, isBil ? { text:'', margin:[0,2,0,0] } : null); n++;
    }
    if (powody.includes('D')) {
      const dD = { s: vv('ax_czas_stary')||'...', nw: vv('ax_czas_nowy')||'...', dt: HEX.fmtDateL(vv('ax_data_wyg')) };
      bp(pl(`${n}. ` + getText('ax.powodD', dD)), isBil ? tr(getText('ax.powodD', dD, lang)) : null);
    }

    bp(hr(NAVY,[0,6,0,4]), isBil ? hr(NAVY,[0,6,0,4]) : null);
    bp({ text:'§ 2', style:'sec', alignment:'center' },
       isBil ? { text:'§ 2', font:'Roboto', fontSize:ST, bold:true, italics:true, color:'#2d5a8e', alignment:'center', margin:[0,0,0,2] } : null);
    bp(pl(getText('ax.par2')), isBil ? tr(getText('ax.par2', null, lang)) : null);
    bp(hr(NAVY,[0,6,0,4]), isBil ? hr(NAVY,[0,6,0,4]) : null);
    bp({ text:'§ 3', style:'sec', alignment:'center' },
       isBil ? { text:'§ 3', font:'Roboto', fontSize:ST, bold:true, italics:true, color:'#2d5a8e', alignment:'center', margin:[0,0,0,2] } : null);
    bp(pl(getText('ax.par3')), isBil ? tr(getText('ax.par3', null, lang)) : null);

    const sigEl = (cid, lbl) => {
      const sig = HEX.getSig(cid);
      return { stack:[
        sig ? { image:sig, width:120, height:36, margin:[0,0,0,2] }
            : { canvas:[{ type:'line',x1:0,y1:36,x2:140,y2:36,lineWidth:0.5,lineColor:'#999' }], margin:[0,0,0,2] },
        { text:lbl, fontSize:7.5, color:'#666' },
      ]};
    };
    const sigLn = { canvas:[{ type:'line',x1:0,y1:0,x2:495,y2:0,lineWidth:0.5,lineColor:'#bbb' }], margin:[0,14,0,12] };
    plC.push(sigLn);
    plC.push({ columns:[ sigEl('ax-sig-klient', getText('ax.sig_k')), sigEl('ax-sig-posrednik', getText('ax.sig_p')) ], columnGap:40 });
    if (isBil) {
      trC.push(sigLn);
      trC.push({ columns:[ sigEl('ax-sig-klient', getText('ax.sig_k', null, lang)), sigEl('ax-sig-posrednik', getText('ax.sig_p', null, lang)) ], columnGap:40 });
    }

    const flags = { pl:'PL', en:'EN' };
    const trHdr = isBil ? [
      { text:'', pageBreak:'before' },
      { canvas:[{ type:'rect',x:0,y:0,w:495,h:3,color:'#2d5a8e' }], margin:[0,0,0,10] },
      { text:`${flags[lang]}  ${lang.toUpperCase()} VERSION`, fontSize:8.5, bold:true, color:'#2d5a8e', margin:[0,0,0,6] },
    ] : [];

    const docDef = {
      pageSize:'A4', pageMargins:[50,8,50,45],
      defaultStyle:{ font:'Roboto', fontSize:S, lineHeight:LH },
      styles, images:{ logo: LOGO_PDF_B64 },
      content: isBil ? [...plC, ...trHdr, ...trC] : plC,
      footer: (cur, tot) => ({ columns:[
        { text:`${F.stopka||F.nazwa} | Aneks nr ${nrUm}`, fontSize:7, color:'#999', margin:[50,0,0,0] },
        { text:`Strona ${cur} z ${tot}`, fontSize:7, color:'#999', alignment:'right', margin:[0,0,50,0] },
      ]}),
    };
    const nr_ = nrUm.replace(/\//g, '-');
    const dt_ = vv('ax_data_aneksu') || new Date().toISOString().split('T')[0];
    pdfMake.createPdf(docDef).download(`Aneks_${nr_}_${dt_}.pdf`);
  }

  // ══ PROTOKÓŁ ══
  function prDodaj() {
    if (prLista.length >= 10) return;
    const n   = prLista.length + 1;
    const id  = 'pr-el-' + n;
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const time  = now.getHours().toString().padStart(2,'0') + ':' + now.getMinutes().toString().padStart(2,'0');
    const div = document.createElement('div');
    div.className = 'proto-nieruch'; div.id = id;
    div.innerHTML = `
      <div class="proto-nieruch-header">
        <div class="proto-nieruch-num">${n}</div>
        <span style="font-size:13px;font-weight:600;color:var(--navy);flex:1;">Nieruchomość ${n}</span>
        ${n > 1 ? `<button onclick="AX.prUsun('${id}')" style="background:none;border:none;color:var(--gray);cursor:pointer;font-size:16px;">✕</button>` : ''}
      </div>
      <div class="proto-nieruch-body">
        <div class="fields-grid">
          <div class="field"><label>Data</label><input type="date" id="${id}-data" value="${today}"></div>
          <div class="field"><label>Godzina</label><input type="time" id="${id}-czas" value="${time}"></div>
          <div class="field" style="grid-column:1/-1;"><label>Adres nieruchomości <span class="req">*</span></label><input id="${id}-adres" placeholder="ul. Przykładowa 10/5, Gdańsk"></div>
          <div class="field"><label>Rodzaj</label>
            <select id="${id}-rodzaj"><option>mieszkanie</option><option>dom jednorodzinny</option><option>dom szeregowy</option><option>lokal użytkowy</option><option>działka</option><option>inne</option></select>
          </div>
          <div class="field"><label>Cena ofertowa</label><input id="${id}-cena" placeholder="np. 650 000 PLN"></div>
          <div class="field" style="grid-column:1/-1;"><label>Uwagi</label><input id="${id}-uwagi" placeholder="opcjonalnie"></div>
        </div>
      </div>`;
    document.getElementById('pr-lista').appendChild(div);
    prLista.push(id);
    document.getElementById('pr-add-btn').style.display = prLista.length >= 10 ? 'none' : '';
    document.getElementById('pr-podpisy').style.display = prLista.length > 0 ? '' : 'none';
    if (prLista.length === 1) { HEX.initSig('pr-sig-klient'); HEX.initSig('pr-sig-agent'); }
  }

  function prUsun(id) {
    document.getElementById(id)?.remove();
    prLista = prLista.filter(x => x !== id);
    document.querySelectorAll('.proto-nieruch').forEach((el, i) => {
      el.querySelector('.proto-nieruch-num').textContent = i + 1;
    });
    document.getElementById('pr-add-btn').style.display  = prLista.length >= 10 ? 'none' : '';
    document.getElementById('pr-podpisy').style.display  = prLista.length > 0 ? '' : 'none';
  }

  function prReset() {
    document.getElementById('pr-lista').innerHTML = '';
    prLista = [];
    ['pr_imie','pr_tel','pr_email'].forEach(id => { const e = document.getElementById(id); if (e) e.value = ''; });
    document.getElementById('pr-podpisy').style.display  = 'none';
    document.getElementById('pr-add-btn').style.display  = '';
    prDodaj();
  }

  function prGeneratePDF() {
    if (prLista.length === 0) { alert('Dodaj co najmniej jedną nieruchomość.'); return; }
    const F  = HEX.loadFirmaData(); HEX.buildFirmaPochodne(F);
    const vv = id => document.getElementById(id)?.value?.trim() || '';
    const kImie  = vv('pr_imie')  || '...';
    const kTel   = vv('pr_tel');
    const kEmail = vv('pr_email');
    const now    = new Date();
    const todayL = HEX.fmtDateL(now.toISOString().split('T')[0]);
    const NAVY   = '#1a2b5e';

    const styles = {
      title: { font:'Roboto', fontSize:11, bold:true, color:NAVY, alignment:'center', margin:[0,0,0,4] },
      sub:   { font:'Roboto', fontSize:8.5, color:'#666', alignment:'center', margin:[0,0,0,10] },
      sec:   { font:'Roboto', fontSize:9.5, bold:true, color:NAVY, margin:[0,8,0,3] },
    };
    const content = [];

    content.push({ columns:[{ image:'logo', width:80 },{ stack:[
      { text: getText('pr.tytul'), style:'title' },
      { text: getText('pr.sporzadzony', { todayL }), style:'sub' },
    ], width:'*', margin:[12,4,0,0] }], margin:[0,0,0,10] });
    content.push({ canvas:[{ type:'rect',x:0,y:0,w:495,h:2,color:NAVY }], margin:[0,0,0,10] });

    content.push({ text: getText('pr.agent_lbl'), style:'sec' });
    content.push({ columns:[
      { stack:[
        { text: F.agent||'...', fontSize:9.5, bold:true },
        { text: F.stanowisko||'', fontSize:8.5, color:'#666' },
        F.licencja ? { text:'Nr lic.: '+F.licencja, fontSize:8, color:'#888' } : {},
      ]},
      { stack:[
        F.tel   ? { text:F.tel,   fontSize:9, alignment:'right' } : {},
        F.email ? { text:F.email, fontSize:9, alignment:'right', color:'#555' } : {},
      ], alignment:'right' },
    ], margin:[0,0,0,12] });

    content.push({ canvas:[{ type:'line',x1:0,y1:0,x2:495,y2:0,lineWidth:0.5,lineColor:'#ccc' }], margin:[0,0,0,8] });
    content.push({ text: getText('pr.klient_lbl'), style:'sec' });
    content.push({ columns:[
      { text: kImie, fontSize:9.5, bold:true },
      { text: [kTel, kEmail].filter(Boolean).join('  ·  '), fontSize:9, color:'#555', alignment:'right' },
    ], margin:[0,0,0,12] });

    content.push({ canvas:[{ type:'line',x1:0,y1:0,x2:495,y2:0,lineWidth:0.5,lineColor:'#ccc' }], margin:[0,0,0,8] });
    content.push({ text: getText('pr.prezentowane'), style:'sec' });

    prLista.forEach((id, idx) => {
      const g = s => document.getElementById(id+s)?.value?.trim() || '';
      content.push({
        table:{ widths:['*'], body:[[{ stack:[
          { columns:[
            { text:`${idx+1}.`, fontSize:10, bold:true, color:NAVY, width:18 },
            { text:g('-adres'), fontSize:9.5, bold:true, color:NAVY, width:'*' },
            { text:`${HEX.fmtDate(g('-data'))} ${g('-czas')}`, fontSize:8.5, color:'#666', alignment:'right', width:80 },
          ], columnGap:6 },
          { columns:[
            { text:g('-rodzaj'), fontSize:8.5, color:'#555', italics:true, width:'*' },
            g('-cena') ? { text:g('-cena'), fontSize:8.5, color:'#555', alignment:'right', width:120 } : {},
          ], margin:[18,2,0,0] },
          g('-uwagi') ? { text:'Uwagi: '+g('-uwagi'), fontSize:8, color:'#888', margin:[18,1,0,0] } : {},
        ], margin:[6,6,6,6] }]]},
        layout:{ hLineWidth:()=>0.5, vLineWidth:()=>0.5, hLineColor:()=>'#ddd', vLineColor:()=>'#ddd' },
        margin:[0,0,0,6],
      });
    });

    content.push({ canvas:[{ type:'line',x1:0,y1:0,x2:495,y2:0,lineWidth:0.5,lineColor:'#ccc' }], margin:[0,10,0,8] });
    content.push({ text: getText('pr.lacznie', { n: prLista.length }), fontSize:9, bold:true, color:NAVY, margin:[0,0,0,12] });
    content.push({ text: getText('pr.potwierdzaja'), fontSize:9, color:'#555', margin:[0,0,0,20] });

    const sigEl = (cid, lbl) => {
      const sig = HEX.getSig(cid);
      return { stack:[
        sig ? { image:sig, width:120, height:36, margin:[0,0,0,2] }
            : { canvas:[{ type:'line',x1:0,y1:36,x2:140,y2:36,lineWidth:0.5,lineColor:'#999' }], margin:[0,0,0,2] },
        { text:lbl, fontSize:7.5, color:'#666' },
      ]};
    };
    content.push({ canvas:[{ type:'line',x1:0,y1:0,x2:495,y2:0,lineWidth:0.5,lineColor:'#bbb' }], margin:[0,6,0,12] });
    content.push({ columns:[ sigEl('pr-sig-klient', getText('pr.sig_k')), sigEl('pr-sig-agent', getText('pr.sig_a')) ], columnGap:40 });

    const docDef = {
      pageSize:'A4', pageMargins:[50,8,50,40],
      defaultStyle:{ font:'Roboto', fontSize:9.5, lineHeight:1.35 },
      styles, images:{ logo: LOGO_PDF_B64 },
      content,
      footer: (cur, tot) => ({ columns:[
        { text:`${F.stopka||F.nazwa} | Protokół prezentacji`, fontSize:7, color:'#999', margin:[50,0,0,0] },
        { text:`Strona ${cur} z ${tot}`, fontSize:7, color:'#999', alignment:'right', margin:[0,0,50,0] },
      ]}),
    };
    const ks = kImie.replace(/\s+/g, '_');
    pdfMake.createPdf(docDef).download(`Protokol_${ks}_${now.toISOString().split('T')[0]}.pdf`);
  }

  // ── Init modułu ──
  function init() {
    render();
    showStart();
  }

  // ── Rejestracja w HEX ──
  HEX.registerModule('aneksy', { onActivate: init });

  // Public API (wywoływane z onclick w HTML)
  return { showStart, showAneks, showProto, setTyp, tileToggle, platnosc, typUm, langTile, reset, generatePDF, prDodaj, prUsun, prReset, prGeneratePDF };

})();
