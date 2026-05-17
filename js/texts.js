// ═══ MODUŁ: TEKSTY PRAWNE ═══
// Centralne repozytorium tekstów prawnych dla wszystkich generatorów.
// Struktura: płaskie klucze, np. texts['rez.par1']
// Klauzule statyczne → plain string
// Klauzule dynamiczne → arrow function (data) => string
// Wielojęzyczność: każdy klucz zawiera obiekt { pl, en }
// (pl wypełnione, en częściowo — ua i by usunięte)

const texts = {

  // ─── UMOWA REZERWACYJNA ──────────────────────────────────────────────────

  'rez.intro': {
    pl: (d) =>
      'Zawarta dnia ' + d.dataZaw + ' w ' + d.miejsce + ' pomiędzy:',
  },

  'rez.zwani_sp': {
    pl: (d) => 'zwanymi dalej ' + d.sp_label + ',',
  },

  'rez.a': {
    pl: 'a',
  },

  'rez.zwani_ku': {
    pl: (d) => 'zwanymi dalej ' + d.ku_label + '.',
  },

  'rez.strony': {
    pl: 'Sprzedający i Kupujący zwani Stronami, o następującej treści:',
  },

  'rez.par1': {
    pl: (d) => 'Przedmiotem umowy jest rezerwacja ' + d.opisNieruch,
  },

  'rez.par2': {
    pl: (d) =>
      'Strony ustalają cenę rezerwowanej nieruchomości na: ' +
      d.cena.toLocaleString('pl-PL') +
      ' zł słownie (' + d.cenaSl + ').',
  },

  'rez.par3a': {
    pl: (d) =>
      'Kupujący rezerwują wyżej opisany lokal mieszkalny wraz z przyległościami do dnia ' +
      d.koniecRez +
      ', na co Sprzedający wyrażają zgodę.',
  },

  'rez.par3b': {
    pl: 'Sprzedający zobowiązują się wstrzymać ze sprzedażą i prezentacjami mieszkania innym klientom do dnia zakończenia rezerwacji.',
  },

  'rez.par4_gotowka': {
    pl: (d) =>
      'Opłata rezerwacyjna w wysokości ' +
      d.oplata.toLocaleString('pl-PL') +
      ' zł słownie (' + d.oplataSl + ') została uiszczona przez Kupujących gotówką w dniu podpisania niniejszej umowy.',
  },

  'rez.par4_zagr_intro': {
    pl: (d) =>
      'Tytułem rezerwacji Kupujący wpłacą, do dnia ' + d.termin +
      ', Sprzedającym opłatę rezerwacyjną w wysokości ' +
      d.oplata.toLocaleString('pl-PL') +
      ' zł słownie (' + d.oplataSl + '), przelewem zagranicznym na rachunek bankowy:',
  },

  'rez.par4_przelew_intro': {
    pl: (d) =>
      'Tytułem rezerwacji Kupujący wpłacą, do dnia ' + d.termin +
      ', Sprzedającym opłatę rezerwacyjną w wysokości ' +
      d.oplata.toLocaleString('pl-PL') +
      ' zł słownie (' + d.oplataSl + '), przelewem na rachunek bankowy:',
  },

  'rez.par5': {
    pl: (d) =>
      'Strony postanawiają, że umowa przyrzeczona w formie aktu notarialnego, na warunkach opisanych w § 2, zostanie zawarta najpóźniej do ostatniego dnia wskazanego w rezerwacji, tj. do ' +
      d.koniecRez +
      '. Opłata rezerwacyjna zostanie wówczas zaliczona na poczet ceny.',
  },

  'rez.par6': {
    pl: 'W przypadku braku zawarcia umowy przyrzeczonej w formie aktu notarialnego w wyżej wskazanym terminie, rezerwację uznaje się za zakończoną, a Sprzedający mają obowiązek zwrócić Kupującym opłatę rezerwacyjną na rachunek bankowy, z którego ją otrzymali, przelewem w terminie 1 dnia roboczego od daty zakończenia umowy rezerwacyjnej.',
  },

  // ─── ANEKS DO UMOWY POŚREDNICTWA ────────────────────────────────────────

  'ax.tytul': {
    pl: (d) => `do umowy nr ${d.nrUm} z dnia ${d.dataUm}`,
    en: (d) => `Annex to Agreement No. ${d.nrUm} dated ${d.dataUm}`,
  },

  'ax.title': {
    pl: 'ANEKS DO UMOWY POŚREDNICTWA NIERUCHOMOŚCI',
    en: 'ANNEX TO THE REAL ESTATE BROKERAGE AGREEMENT',
  },

  'ax.zawarto': {
    pl: (d) => `zawarto dnia ${d.dataAn} w ${d.miej} pomiędzy:`,
    en: (d) => `executed on ${d.dataAn} in ${d.miej} between:`,
  },

  'ax.klient': {
    pl: '— zwanym dalej KLIENTEM,',
    en: '— hereinafter referred to as the CLIENT,',
  },

  'ax.posrednik': {
    pl: '— zwanym dalej POŚREDNIKIEM.',
    en: '— hereinafter referred to as the BROKER.',
  },

  'ax.par1': {
    pl: (d) => `Strony wspólnie postanawiają, że od dnia wejścia w życie niniejszego Aneksu zmianie ulegają następujące zapisy Umowy Pośrednictwa nr ${d.nrUm} z dnia ${d.dataUm}:`,
    en: (d) => `The Parties agree that from the date of this Annex, the following provisions of Agreement No. ${d.nrUm} dated ${d.dataUm} are amended:`,
  },

  'ax.powodA': {
    pl: (d) => `Zmiana prowizji: z ${d.s} na ${d.nw}.`,
    en: (d) => `Commission: changed from ${d.s} to ${d.nw}.`,
  },

  'ax.powodB_jedna': {
    pl: 'Zmiana formy płatności: jednorazowo 100% po umowie końcowej.',
    en: 'Payment: fee payable 100% upon conclusion of the final deed.',
  },

  'ax.powodB_dwie': {
    pl: 'Zmiana formy płatności: dwie raty: 50% przedwstępna + 50% końcowa.',
    en: 'Payment: fee payable in two instalments: 50% preliminary + 50% final deed.',
  },

  'ax.powodC_ekskl': {
    pl: 'Zmiana rodzaju umowy na EKSKLUZYWNĄ.',
    en: 'Type: agreement changed to EXCLUSIVE.',
  },

  'ax.powodC_otwarta': {
    pl: 'Zmiana rodzaju umowy na OTWARTĄ.',
    en: 'Type: agreement changed to OPEN.',
  },

  'ax.powodD': {
    pl: (d) => `Zmiana czasu trwania: z ${d.s} na ${d.nw} miesięcy; nowa data wygaśnięcia: ${d.dt}.`,
    en: (d) => `Duration: changed from ${d.s} to ${d.nw} months; new expiry: ${d.dt}.`,
  },

  'ax.par2': {
    pl: 'Pozostałe postanowienia Umowy pozostają bez zmian.',
    en: 'All other provisions of the Agreement remain unchanged.',
  },

  'ax.par3': {
    pl: 'Aneks sporządzono w dwóch jednobrzmiących egzemplarzach, po jednym dla każdej ze Stron.',
    en: 'This Annex was executed in two counterparts, one for each Party.',
  },

  'ax.sig_k': {
    pl: 'KLIENT',
    en: "CLIENT'S SIGNATURE",
  },

  'ax.sig_p': {
    pl: 'POŚREDNIK',
    en: "BROKER'S SIGNATURE",
  },

  // ─── PROTOKÓŁ PREZENTACJI NIERUCHOMOŚCI ─────────────────────────────────

  'pr.tytul': {
    pl: 'PROTOKÓŁ PREZENTACJI NIERUCHOMOŚCI',
  },

  'pr.sporzadzony': {
    pl: (d) => `sporządzony dnia ${d.todayL}`,
  },

  'pr.agent_lbl': {
    pl: 'Agent / Pośrednik:',
  },

  'pr.klient_lbl': {
    pl: 'Klient:',
  },

  'pr.prezentowane': {
    pl: 'Prezentowane nieruchomości:',
  },

  'pr.lacznie': {
    pl: (d) => `Łącznie: ${d.n} nieruchomości`,
  },

  'pr.potwierdzaja': {
    pl: 'Strony potwierdzają odbycie prezentacji nieruchomości wymienionych powyżej.',
  },

  'pr.sig_k': {
    pl: 'PODPIS KLIENTA',
  },

  'pr.sig_a': {
    pl: 'PODPIS AGENTA',
  },

  // ─── UMOWA POŚREDNICTWA W NAJMIE (generator-najem/pdf.js) ───────────────

  // ── Wspólne ──

  'najem.title_w': {
    pl: 'UMOWA POŚREDNICTWA W NAJMIE NIERUCHOMOŚCI',
  },

  'najem.title_n': {
    pl: 'UMOWA POŚREDNICTWA W POSZUKIWANIU NAJMU NIERUCHOMOŚCI',
  },

  'najem.subtitle': {
    pl: '(zawarta poza lokalem przedsiębiorstwa)',
  },

  'najem.zawarta': {
    pl: (d) => `zawarta w dniu ${d.data} w ${d.miejsce} pomiędzy:`,
  },

  'najem.posrednik_desc': {
    pl: (d) => `${d.nazwa}, z siedzibą w ${d.kod} ${d.miasto}, ul. ${d.ulica}, NIP ${d.nip}, ${d.regon}, reprezentowaną przez ${d.wlasciciel} — ${d.stanowisko}, zwaną dalej „Pośrednikiem",`,
  },

  'najem.klient_desc': {
    pl: (d) => d.pelnom
      ? `${d.imie}, zamieszkałym/ą pod adresem: ${d.adres}, legitymującym/ą się dokumentem tożsamości: ${d.dowod} — reprezentowanym/ą przez pełnomocnika: ${d.pelnom_imie}, zamieszkałego/ą pod adresem: ${d.pelnom_adres} — zwanym/ą dalej „Klientem"`
      : `${d.imie}, zamieszkałym/ą pod adresem: ${d.adres}, PESEL: ${d.pesel}, legitymującym/ą się dokumentem tożsamości: ${d.dowod} — zwanym/ą dalej „Klientem"`,
  },

  'najem.o_nastepujacej': {
    pl: 'o następującej treści:',
  },

  // ── Wspólne paragrafy (identyczne w obu wariantach) ──

  'najem.par2.ust2': {
    pl: 'Rezygnacja Klienta z poszczególnych czynności wymienionych w ust. 1 niniejszego paragrafu nie jest podstawą do zmniejszenia lub niezapłacenia należnego Pośrednikowi wynagrodzenia.',
  },

  'najem.par2.ust3': {
    pl: 'Pośrednik może wykonywać czynności pośrednictwa na rzecz obu stron transakcji, na co Klient niniejszym wyraża zgodę.',
  },

  'najem.par2.ust4': {
    pl: 'Rozszerzenie zakresu ww. czynności oferowanych przez Pośrednika wymaga formy pisemnej pod rygorem nieważności.',
  },

  'najem.par4': {
    pl: 'Wynagrodzenie dla Pośrednika, ustalone w § 3 będzie płatne po zawarciu przez Klienta umowy najmu Nieruchomości wskazanej przez Pośrednika, na podstawie wystawionej przez Pośrednika faktury VAT z 7-dniowym terminem płatności.',
  },

  'najem.par5': {
    pl: 'Pośrednik nie gwarantuje osiągnięcia rezultatu, tj. zawarcia umowy najmu Nieruchomości będącej przedmiotem niniejszej Umowy oraz nie ponosi odpowiedzialności za wykonanie obowiązków wynikających z umów między Klientem a wynajmującym.',
  },

  'najem.par6.ust1': {
    pl: 'Klient zobowiązuje się do korzystania z przekazanych przez Pośrednika ofert wynajmu wyłącznie na własny użytek i zachowania szczegółów ofert w ścisłej tajemnicy oraz nieprzekazywania ich innym osobom trzecim.',
  },

  'najem.par6.ust3': {
    pl: (d) => `Klient oświadcza, że wyraża zgodę na przekazanie przez Pośrednika faktury VAT drogą elektroniczną na adres: ${d.faktEmail || '........................................'}`,
  },

  'najem.wszelkie_zmiany': {
    pl: 'Wszelkie zmiany do niniejszej Umowy wymagają formy pisemnej pod rygorem nieważności.',
  },

  'najem.dwa_egzemplarze': {
    pl: 'Niniejsza Umowa została sporządzona w dwóch jednobrzmiących egzemplarzach, po jednym dla każdej ze Stron.',
  },

  // ── Wariant W (wynajmujący) ──

  'najem.w.par1.ust1': {
    pl: 'Klient oświadcza, iż posiada pełne prawo do dysponowania nieruchomością opisaną poniżej, jest zainteresowany jej wynajmem i w związku z tym zleca Pośrednikowi — z zastrzeżeniem że Klient jest uprawniony do zawierania analogicznych umów z innymi pośrednikami a także do poszukiwania najemcy przedmiotowej nieruchomości we własnym zakresie — pośrednictwo w jej wynajęciu.',
  },

  'najem.w.par1.ust2': {
    pl: 'Opis nieruchomości określony przez Klienta, zwanej w dalszej części umowy „Nieruchomością":',
  },

  'najem.w.par1.ust3': {
    pl: 'Klient oświadcza, że Nieruchomość jest wolna od wad prawnych i obciążeń na rzecz osób trzecich i nie jest w stosunku do Nieruchomości wszczęte postępowanie egzekucyjne.',
  },

  'najem.w.par2.ust1': {
    pl: 'Do obowiązków Pośrednika należy:',
  },

  'najem.w.par2.a': { pl: 'przedłożenie ofert najmu Nieruchomości Klientowi,' },
  'najem.w.par2.b': { pl: 'dokonywanie w uzgodnionych terminach prezentacji Nieruchomości potencjalnym najemcom,' },
  'najem.w.par2.c': { pl: 'skontaktowanie Klienta i potencjalnego najemcy Nieruchomości w celu uzgodnienia przyszłych warunków umowy najmu łączącej strony, udział w negocjacjach,' },
  'najem.w.par2.d': { pl: 'zapewnienie obsługi organizacyjnej transakcji.' },

  'najem.w.par3': {
    pl: (d) => `Z tytułu pośrednictwa Klient zobowiązuje się do zapłaty Pośrednikowi na zasadach określonych w § 4 wynagrodzenia w wysokości ${d.prowizjaTyp === 'pct' ? d.wynagrodzenie + '%' : (d.wynagrodzenie || '.........................') + ' zł'} brutto (słownie: ....................................0/100 złotych).`,
  },

  'najem.w.par6.ust2': {
    pl: 'Klient zobowiązuje się do przekazania Pośrednikowi kopii umowy najmu zawartej między Klientem a wynajmującym wskazanym przez Pośrednika oraz okazania Pośrednikowi oryginału tej umowy w celu prawidłowego wyliczenia wynagrodzenia należnego Pośrednikowi.',
  },

  'najem.w.par7.ust1': {
    pl: 'Wynagrodzenie Pośrednika ustalone w § 3 niniejszej Umowy należne jest również w przypadku, gdy w okresie 12 miesięcy po rozwiązaniu lub wygaśnięciu niniejszej Umowy dojdzie do zawarcia umowy najmu pomiędzy Klientem a najemcą Nieruchomości przedstawionym Klientowi przez Pośrednika.',
  },

  'najem.w.par7.ust2': {
    pl: 'Obowiązek zapłaty Pośrednikowi wynagrodzenia powstanie również w sytuacji, gdy w okresie 12 miesięcy po rozwiązaniu lub wygaśnięciu niniejszej Umowy dojdzie do zawarcia umowy, o której mowa w ust. 1 powyżej, pomiędzy wynajmującym Nieruchomość a osobą bliską Klientowi lub spółką powiązaną, którym Nieruchomość została wskazana przez Pośrednika.',
  },

  'najem.w.par8': {
    pl: 'Klient i Pośrednik ustalają, że w przypadku każdorazowej prezentacji Nieruchomości sporządzany będzie Protokół z prezentacji Nieruchomości podpisywany przez Klienta i Pośrednika, który stanowi podstawę roszczenia przez Pośrednika wynagrodzenia określonego w § 3, a który jest załącznikiem nr 2 do niniejszej Umowy.',
  },

  'najem.w.par9.ust1': {
    pl: 'Pośrednik oświadcza, że zgodnie z obowiązkiem określonym w art. 181 ustawy z dnia 21 sierpnia 1997 r. o gospodarce nieruchomościami jest ubezpieczony od odpowiedzialności za szkody wyrządzone w związku z wykonywaniem czynności pośrednictwa, na dowód czego przekazuje Klientowi kopię dokumentu ubezpieczenia, która to kopia stanowi załącznik nr 3 do niniejszej Umowy.',
  },

  'najem.w.par9.ust2': {
    pl: 'Klient niniejszym potwierdza otrzymanie kopii dokumentu aktualnego ubezpieczenia od odpowiedzialności cywilnej za szkody wyrządzone w związku z wykonywaniem czynności pośrednictwa.',
  },

  'najem.w.par10': {
    pl: 'Zasady dotyczące ochrony danych osobowych określa Załącznik nr 1 do Umowy.',
  },

  'najem.w.par11.ust1': {
    pl: 'Niniejsza Umowa zostaje zawarta na czas nieokreślony.',
  },

  'najem.w.par11.ust2': {
    pl: 'Każdej ze Stron przysługuje prawo wypowiedzenia Umowy z zachowaniem 14-dniowego okresu wypowiedzenia.',
  },

  // ── Wariant N (najemca szuka mieszkania) ──

  'najem.n.par1': {
    pl: 'Klient oświadcza, iż jest zainteresowany najmem nieruchomości (zwanej dalej „Nieruchomością") na własną rzecz lub/i przez osobę przez niego wskazaną, i w związku z tym zleca Pośrednikowi pośrednictwo w najmie, w tym przedstawiania Klientowi stosownych ofert wynajmu.',
  },

  'najem.n.par2.ust1': {
    pl: 'Do obowiązków Pośrednika należy:',
  },

  'najem.n.par2.a': { pl: 'poszukiwanie Nieruchomości zgodnie ze zgłoszonymi preferencjami Klienta,' },
  'najem.n.par2.b': { pl: 'przedłożenie ofert wynajmu Nieruchomości Klientowi,' },
  'najem.n.par2.c': { pl: 'dokonywanie w uzgodnionych terminach prezentacji Nieruchomości Klientowi,' },
  'najem.n.par2.d': { pl: 'skontaktowanie potencjalnego wynajmującego i Klienta w celu uzgodnienia przyszłych warunków transakcji łączącej strony,' },
  'najem.n.par2.e': { pl: 'udział w negocjacjach,' },
  'najem.n.par2.f': { pl: 'zapewnienie obsługi organizacyjnej transakcji, w tym sprawdzenie stanu prawnego Nieruchomości.' },

  'najem.n.par3': {
    pl: (d) => `Z tytułu pośrednictwa Klient zobowiązuje się do zapłaty Pośrednikowi na zasadach określonych w § 4 wynagrodzenia w wysokości ${d.prowizjaTyp === 'pct' ? d.wynagrodzenie + '% kwoty czynszu najmu brutto' : d.wynagrodzenie + ' zł brutto'} zgodnie z umową najmu podpisaną między Klientem a wynajmującym, przy czym przez czynsz podstawowy należy rozumieć czynsz w pełnej wysokości.`,
  },

  'najem.n.par6.ust2': {
    pl: 'Klient zobowiązuje się do przekazania Pośrednikowi kopii umowy najmu zawartej między Klientem a wynajmującym wskazanym przez Pośrednika.',
  },

  'najem.n.par7': {
    pl: 'Klient i Pośrednik ustalają, że w przypadku każdorazowej prezentacji Nieruchomości sporządzany będzie Protokół z prezentacji Nieruchomości podpisywany przez Klienta i Pośrednika, który stanowi podstawę roszczenia przez Pośrednika wynagrodzenia określonego w § 3, a który jest załącznikiem nr 5 do niniejszej Umowy.',
  },

  'najem.n.par8.ust1': {
    pl: 'Pośrednik oświadcza, że zgodnie z obowiązkiem określonym w art. 181 ustawy z dnia 21 sierpnia 1997 r. o gospodarce nieruchomościami jest ubezpieczony od odpowiedzialności za szkody wyrządzone w związku z wykonywaniem czynności pośrednictwa, na dowód czego przekazuje Klientowi kopię dokumentu ubezpieczenia stanowiącą załącznik nr 6 do niniejszej Umowy.',
  },

  'najem.n.par8.ust2': {
    pl: 'Klient niniejszym potwierdza otrzymanie kopii dokumentu aktualnego ubezpieczenia.',
  },

  'najem.n.par9': {
    pl: 'Zasady dotyczące ochrony danych osobowych określa Załącznik nr 4 do Umowy.',
  },

  'najem.n.par10.ust1': {
    pl: 'Niniejsza Umowa zostaje zawarta na czas nieokreślony.',
  },

  'najem.n.par10.ust2': {
    pl: 'Każdej ze Stron przysługuje prawo wypowiedzenia Umowy z zachowaniem 1-miesięcznego okresu wypowiedzenia.',
  },

  'najem.n.par10.ust4': {
    pl: 'Ewentualne spory wynikłe w związku z wykonaniem niniejszej Umowy strony oddadzą pod rozstrzygnięcie właściwemu sądowi powszechnemu.',
  },

  'najem.n.par11.ust1': {
    pl: 'Klient oświadcza, że został poinformowany przez Pośrednika o:',
  },

  'najem.n.par11.a': {
    pl: 'prawie do odstąpienia od umowy zawartej poza lokalem przedsiębiorstwa w terminie 14 (czternastu) dni od dnia jej zawarcia oraz sposobie odstąpienia (zgodnie z art. 27 ustawy z dnia 30 maja 2014 r. o prawach konsumenta),',
  },

  'najem.n.par11.b': {
    pl: 'obowiązku zapłaty Pośrednikowi za świadczenia spełnione do chwili odstąpienia od umowy,',
  },

  'najem.n.par11.c': {
    pl: 'braku prawa do odstąpienia od umowy w przypadku dojścia do transakcji w wyniku podjętych w tym okresie czynności pośrednictwa.',
  },

  // ── Zgoda RODO (na stronie głównej) ──

  'najem.rodo_tytul': {
    pl: (d) => `Zgoda na przetwarzanie danych osobowych przez ${d.nazwa}`,
  },

  'najem.rodo_tresc': {
    pl: (d) => `Wyrażam zgodę na przetwarzanie moich danych osobowych przez ${d.nazwa} z siedzibą w ${d.miasto} (${d.kod}) ul. ${d.ulica}, w zakresie niezbędnym do oferowania produktów i usług, w tym podmiotów współpracujących z ${d.nazwa}, w związku z wykonywanym pośrednictwem nieruchomościowym.`,
  },

  // ── Załączniki ──

  'najem.zal.rodo.ust1': {
    pl: (d) => `Administratorem danych osobowych jest ${d.nazwa} z siedzibą w ${d.kod} ${d.miasto}, ul. ${d.ulica}.`,
  },

  'najem.zal.rodo.ust2': {
    pl: 'Dane osobowe są przetwarzane w celu realizacji niniejszej umowy pośrednictwa oraz w celach wskazanych przez Klienta.',
  },

  'najem.zal.rodo.ust3': {
    pl: 'Klientowi przysługuje prawo dostępu do danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia danych oraz wniesienia skargi do Prezesa UODO.',
  },

  'najem.zal.pep.uwaga': {
    pl: '* dotyczy ostatnich 12 miesięcy',
  },

  'najem.zal.oc_placeholder': {
    pl: '[Dokument polisy OC załączony osobno]',
  },

  // ── Podpisy ──

  'najem.sig.klient': { pl: 'DATA           PODPIS KLIENTA' },
  'najem.sig.pelnom': { pl: 'DATA           PODPIS PEŁNOMOCNIKA' },
  'najem.sig.klient_short': { pl: 'DATA       PODPIS KLIENTA' },
  'najem.sig.posrednik_short': { pl: 'DATA       PODPIS POŚREDNIKA' },

  // ══════════════════════════════════════════════════════════════════════
  // SPRZEDAŻ — generator umów sprzedaży/kupna
  // ══════════════════════════════════════════════════════════════════════

  // ── Nagłówek / tytuły umowy ──

  'sprzedaz.title.excl': {
    pl: 'UMOWA POŚREDNICTWA W SPRZEDAŻY NIERUCHOMOŚCI – NA WYŁĄCZNOŚĆ',
    en: 'EXCLUSIVE REAL ESTATE SALE BROKERAGE AGREEMENT',
  },
  'sprzedaz.title.open': {
    pl: 'UMOWA POŚREDNICTWA W SPRZEDAŻY NIERUCHOMOŚCI – OTWARTA',
    en: 'OPEN REAL ESTATE SALE BROKERAGE AGREEMENT',
  },
  'sprzedaz.title.kupno': {
    pl: 'UMOWA POŚREDNICTWA W KUPNIE NIERUCHOMOŚCI',
    en: 'REAL ESTATE PURCHASE BROKERAGE AGREEMENT',
  },
  'sprzedaz.subtitle': {
    pl: 'zawarta poza lokalem przedsiębiorstwa',
    en: 'concluded outside business premises',
  },
  'sprzedaz.zawarta': {
    pl: ({ dt, mj }) => `zawarta dnia ${dt} w ${mj} pomiędzy:`,
    en: ({ dt, mj }) => `concluded on ${dt} in ${mj} between:`,
  },
  'sprzedaz.klient': {
    pl: 'zwanym w dalszej części umowy KLIENTEM',
    en: 'hereinafter referred to as the CLIENT',
  },
  'sprzedaz.posrednik': {
    pl: 'zwaną dalej w treści umowy POŚREDNIKIEM.',
    en: 'hereinafter referred to as the BROKER.',
  },
  'sprzedaz.oraz': {
    pl: 'oraz',
    en: 'and',
  },
  'sprzedaz.sig.klient': {
    pl: 'PODPIS KLIENTA',
    en: "CLIENT'S SIGNATURE",
  },
  'sprzedaz.sig.posrednik': {
    pl: 'PODPIS POŚREDNIKA',
    en: "BROKER'S SIGNATURE",
  },
  'sprzedaz.sig.data': {
    pl: 'DATA',
    en: 'DATE',
  },

  // ── §1 Przedmiot umowy ──

  'sprzedaz.s1.t1': {
    pl: 'Dla celów niniejszej umowy „Nieruchomość" oznacza: prawo odrębnej własności lokalu, spółdzielcze własnościowe prawo do lokalu mieszkalnego lub użytkowego, prawo do domu jednorodzinnego w spółdzielni mieszkaniowej, nieruchomość gruntową, prawo użytkowania wieczystego',
    en: 'For the purposes of this agreement, "Property" means: the right of separate ownership of premises, cooperative ownership right to residential or commercial premises, right to a single-family house in a housing cooperative, land property, perpetual usufruct right',
  },
  'sprzedaz.s1.t1k': {
    pl: ', a także lokal mieszkalny, lokal użytkowy lub dom jednorodzinny z rynku wtórnego bądź pierwotnego.',
    en: ', as well as residential premises, commercial premises or single-family houses on the secondary or primary market.',
  },
  'sprzedaz.s1.t2': {
    pl: 'Klient oświadcza, że jest właścicielem opisanej poniżej Nieruchomości lub działa na podstawie załączonego pełnomocnictwa udzielonego przez właściciela*, jest zainteresowany jej sprzedażą i niniejszym zleca Pośrednikowi dokonywanie czynności pośrednictwa. (* niepotrzebne skreślić)',
    en: 'The Client declares to be the owner of the Property described below* or acts under an attached power of attorney from the owner*, and is interested in selling it, hereby commissioning the Broker. (*delete as appropriate)',
  },
  'sprzedaz.s1.t2k': {
    pl: 'Klient oświadcza, że jest zainteresowany nabyciem Nieruchomości i niniejszym zleca Pośrednikowi dokonywanie czynności pośrednictwa.',
    en: 'The Client declares interest in acquiring the Property and hereby commissions the Broker for brokerage services.',
  },
  'sprzedaz.s1.t3': {
    pl: 'Opis Nieruchomości określony przez Klienta:',
    en: 'Description of the Property as provided by the Client:',
  },
  'sprzedaz.s1.f_rodzaj': {
    pl: 'Rodzaj',
    en: 'Type',
  },
  'sprzedaz.s1.f_kw': {
    pl: 'Nr Księgi Wieczystej',
    en: 'Land register no.',
  },
  'sprzedaz.s1.f_pow': {
    pl: 'Powierzchnia',
    en: 'Area',
  },
  'sprzedaz.s1.f_pol': {
    pl: 'Położenie',
    en: 'Location',
  },
  'sprzedaz.s1.f_cena': {
    pl: 'Proponowana cena Nieruchomości',
    en: 'Asking price',
  },

  // ── §1 rodzajMap (tłumaczenia wartości select) ──

  'sprzedaz.rodzajMap': {
    pl: null, // PL wartości są oryginalne — bez tłumaczenia
    en: {
      'prawo odrębnej własności lokalu': 'separate ownership right to premises',
      'spółdzielcze własnościowe prawo do lokalu mieszkalnego': 'cooperative ownership right to residential premises',
      'spółdzielcze własnościowe prawo do lokalu użytkowego': 'cooperative ownership right to commercial premises',
      'prawo do domu jednorodzinnego w spółdzielni mieszkaniowej': 'right to a single-family house in a housing cooperative',
      'nieruchomość gruntowa – własność': 'land property – ownership',
      'nieruchomość gruntowa – użytkowanie wieczyste': 'land property – perpetual usufruct',
    },
  },

  // ── §2 Zakres czynności ──

  'sprzedaz.s2.t1': {
    pl: 'Pośrednik zobowiązuje się do dokonywania czynności zmierzających do zbycia Nieruchomości, w tym do poszukiwania nabywcy oraz doprowadzenia do zawarcia umowy sprzedaży lub umowy przedwstępnej sprzedaży Nieruchomości.',
    en: 'The Broker undertakes to perform activities enabling disposal of the Property, including searching for a buyer and enabling conclusion of a sale or preliminary sale agreement.',
  },
  'sprzedaz.s2.t1k': {
    pl: 'Pośrednik zobowiązuje się do dokonywania czynności zmierzających do nabycia Nieruchomości, w tym do prezentacji nieruchomości oraz zapewnienia obsługi organizacyjnej.',
    en: 'The Broker undertakes to perform activities enabling acquisition of the Property, including presenting properties and providing organisational support.',
  },
  'sprzedaz.s2.t2': {
    pl: 'Czynności te będą realizowane m.in. poprzez:',
    en: 'These activities shall include in particular:',
  },
  'sprzedaz.s2.a': {
    pl: 'przedłożenie ofert kupna Nieruchomości Klientowi,',
    en: 'submitting purchase offers to the Client,',
  },
  'sprzedaz.s2.b': {
    pl: 'dokonywanie prezentacji Nieruchomości potencjalnym nabywcom,',
    en: 'conducting property viewings for potential buyers,',
  },
  'sprzedaz.s2.c_excl': {
    pl: 'sporządzenie dokumentacji zdjęciowej, filmowej lub Wirtualnego Spaceru 3D,',
    en: 'preparing photographic, video or 3D Virtual Tour documentation,',
  },
  'sprzedaz.s2.c': {
    pl: 'sporządzenie dokumentacji zdjęciowej,',
    en: 'preparing photographic documentation,',
  },
  'sprzedaz.s2.d': {
    pl: 'skompletowanie dokumentacji na podstawie przedłożonych przez Klienta dokumentów,',
    en: 'compiling documentation based on documents provided by the Client,',
  },
  'sprzedaz.s2.e': {
    pl: 'sporządzenie oferty i rejestracji w bazie danych Pośrednika,',
    en: 'preparing the offer and registering it in the database,',
  },
  'sprzedaz.s2.f': {
    pl: 'dokonanie wstępnej weryfikacji stanu prawnego Nieruchomości,',
    en: 'conducting preliminary verification of the legal status,',
  },
  'sprzedaz.s2.g': {
    pl: 'umieszczenie reklamy na stronie internetowej Pośrednika oraz innych portalach,',
    en: 'placing advertisements on the website and other portals,',
  },
  'sprzedaz.s2.h_excl': {
    pl: 'możliwość umieszczenia banera reklamowego na obiekcie,',
    en: 'option to place an advertising banner at the property,',
  },
  'sprzedaz.s2.i': {
    pl: 'aktualizacja danych dotyczących Nieruchomości,',
    en: 'updating property data,',
  },
  'sprzedaz.s2.j': {
    pl: 'udział w negocjacjach, przygotowanie protokołu uzgodnień,',
    en: 'participation in negotiations, preparation of agreement protocol,',
  },
  'sprzedaz.s2.k': {
    pl: 'przygotowanie protokołu zdawczo-odbiorczego,',
    en: 'preparation of handover protocol,',
  },
  'sprzedaz.s2.l': {
    pl: 'zapewnienie obsługi związanej z przygotowaniem transakcji.',
    en: 'providing organisational support for transaction preparation.',
  },
  'sprzedaz.s2.t3': {
    pl: 'Rezygnacja Klienta z poszczególnych czynności nie jest podstawą do zmniejszenia lub niezapłacenia wynagrodzenia Pośrednikowi.',
    en: "The Client's waiver of individual activities does not reduce the Broker's entitlement to remuneration.",
  },
  'sprzedaz.s2.t4': {
    pl: 'Pośrednik może wykonywać czynności pośrednictwa na rzecz obu stron transakcji, na co Klient niniejszym wyraża zgodę.',
    en: 'The Broker may perform brokerage activities on behalf of both parties, which the Client hereby consents to.',
  },
  'sprzedaz.s2.t3k': {
    pl: 'Pośrednik może prezentować nieruchomości z rynku wtórnego jak i pierwotnego z oferty Deweloperów.',
    en: 'The Broker may present properties from the secondary and primary market.',
  },
  'sprzedaz.s2.t4k': {
    pl: 'Pośrednik nie jest doradcą podatkowym i nie prowadzi usług doradztwa podatkowego.',
    en: 'The Broker is not a tax advisor.',
  },
  'sprzedaz.s2.t5k': {
    pl: 'Rozszerzenie zakresu niniejszej umowy wymaga formy pisemnej pod rygorem nieważności.',
    en: 'Any extension of the scope of this agreement requires written form under pain of nullity.',
  },
  'sprzedaz.s2.t5': {
    pl: 'Rozszerzenie zakresu ww. czynności wymaga formy pisemnej pod rygorem nieważności.',
    en: 'Any extension of the scope of the above activities requires written form under pain of nullity.',
  },

  // ── §3 Wyłączność ──

  'sprzedaz.s3.t1excl': {
    pl: 'Niniejsza umowa jest umową ekskluzywną tj. zawartą na wyłączność z odpowiednim stosowaniem art. 550 kodeksu cywilnego. Klient oddaje sprawę do prowadzenia tylko Pośrednikowi, bez możliwości powierzenia jej innemu podmiotowi.',
    en: 'This is an exclusive agreement concluded with exclusivity. The Client entrusts the matter solely to the Broker.',
  },
  'sprzedaz.s3.t2excl': {
    pl: 'Pośrednikowi wynagrodzenie nie przysługuje w przypadku zawarcia umowy z nabywcą pozyskanym przez Klienta bezpośrednio, bez udziału Pośrednika lub innego pośrednika w obrocie nieruchomościami.',
    en: 'The Broker is not entitled to remuneration if the agreement is concluded with a buyer acquired directly by the Client.',
  },

  // ── §4/§5 Wynagrodzenie ──

  'sprzedaz.s4.wyn': {
    pl: ({ prow }) => `Za czynności pośrednictwa Klient zapłaci Pośrednikowi wynagrodzenie w wysokości ${prow}.`,
    en: ({ prow }) => `For brokerage services the Client shall pay the Broker remuneration of ${prow}.`,
  },
  'sprzedaz.s5.t1a': {
    pl: 'Wynagrodzenie będzie płatne w dwóch częściach:',
    en: 'The remuneration shall be payable in two instalments:',
  },
  'sprzedaz.s5.a': {
    pl: '50% po zawarciu umowy przedwstępnej sprzedaży Nieruchomości z nabywcą wskazanym przez Pośrednika, na podstawie faktury VAT z 7-dniowym terminem płatności.',
    en: '50% upon conclusion of the preliminary sale agreement, based on a VAT invoice with a 7-day payment term.',
  },
  'sprzedaz.s5.b': {
    pl: '50% po zawarciu umowy przenoszącej własność Nieruchomości, na podstawie faktury VAT z 7-dniowym terminem płatności.',
    en: '50% upon conclusion of the ownership transfer agreement, based on a VAT invoice with a 7-day payment term.',
  },
  'sprzedaz.s5.t2': {
    pl: 'Pośrednikowi przysługuje prawo zatrzymania części wynagrodzenia z pkt a) gdy pomimo zawartej umowy przedwstępnej nie dojdzie do przeniesienia własności.',
    en: 'The Broker is entitled to retain part (a) if ownership transfer does not occur despite a concluded preliminary agreement.',
  },
  'sprzedaz.s5.t3': {
    pl: 'Gdy przeniesienie własności nie zostanie poprzedzone umową przedwstępną, całość wynagrodzenia jest płatna po zawarciu umowy przenoszącej własność.',
    en: 'If ownership transfer is not preceded by a preliminary agreement, the full remuneration is payable upon transfer.',
  },
  'sprzedaz.s5.t4': {
    pl: 'Wynagrodzenie przysługuje Pośrednikowi również gdy przeniesienie własności nastąpi na podstawie innej czynności prawnej niż umowa sprzedaży.',
    en: 'Remuneration is also due when ownership transfer occurs on the basis of another legal act.',
  },
  'sprzedaz.s5.t1_one': {
    pl: 'Wynagrodzenie dla Pośrednika będzie płatne w całości — 100% wynagrodzenia zostanie zapłacone po zawarciu przez Klienta umowy przenoszącej własność Nieruchomości z nabywcą wskazanym przez Pośrednika, na podstawie wystawionej przez Pośrednika faktury VAT z 7-dniowym terminem płatności.',
    en: 'The remuneration shall be payable in full — 100% upon conclusion of the ownership transfer agreement.',
  },
  'sprzedaz.s5.t2_one': {
    pl: 'Pośrednikowi przysługuje prawo zatrzymania 50% wynagrodzenia gdy pomimo zawartej umowy przedwstępnej nie dojdzie do przeniesienia własności. Kwota ta stanowić będzie ryczałtowe wynagrodzenie za wykonaną pracę i poczynione nakłady.',
    en: 'The Broker is entitled to retain 50% if ownership transfer does not occur despite a concluded preliminary agreement.',
  },
  'sprzedaz.s5.t1k': {
    pl: 'Wynagrodzenie będzie płatne:',
    en: 'The remuneration shall be payable:',
  },
  'sprzedaz.s5.ak': {
    pl: '100% po zawarciu przez Klienta umowy przenoszącej własność Nieruchomości, na podstawie faktury VAT z 7-dniowym terminem płatności.',
    en: '100% upon conclusion of the ownership transfer agreement, based on a VAT invoice with a 7-day payment term.',
  },
  'sprzedaz.s5.t2k': {
    pl: 'Pośrednikowi przysługuje 50% wynagrodzenia gdy z winy klienta kupującego nie dojdzie do przeniesienia własności pomimo zawartej umowy przedwstępnej.',
    en: "The Broker is entitled to 50% if, through the buyer's fault, the transfer does not occur despite a preliminary agreement.",
  },
  'sprzedaz.s5.t3k': {
    pl: 'Wynagrodzenie przysługuje również gdy przeniesienie własności nastąpi na podstawie innej czynności prawnej (darowizna, zamiana, aport etc).',
    en: 'Remuneration is also due when ownership transfer occurs on the basis of another legal act.',
  },

  // ── §6 Obowiązki Klienta ──

  'sprzedaz.s6.ob1': {
    pl: 'Klient zobowiązuje się do przedłożenia Pośrednikowi wszelkich dokumentów niezbędnych do ustalenia stanu prawnego Nieruchomości i zawarcia umowy sprzedaży oraz współdziałania z Pośrednikiem.',
    en: 'The Client undertakes to provide all documents necessary to establish the legal status and to cooperate with the Broker.',
  },
  'sprzedaz.s6.ob2': {
    pl: 'Klient oświadcza, że nieruchomość nie jest przedmiotem zawartej uprzednio umowy z klauzulą wyłączności.',
    en: 'The Client declares that the property is not subject to any previously concluded exclusivity agreement.',
  },
  'sprzedaz.s6.ob3excl': {
    pl: 'Klient oświadcza, że znane są mu konsekwencje wynikające z zawarcia umowy z klauzulą wyłączności.',
    en: 'The Client acknowledges the consequences of concluding an exclusivity agreement.',
  },
  'sprzedaz.s6.ob_faktura': {
    pl: ({ email }) => `Klient wyraża zgodę na przekazanie przez Pośrednika faktury VAT drogą elektroniczną na adres: ${email}`,
    en: ({ email }) => `The Client consents to receiving VAT invoices electronically at: ${email}.`,
  },
  'sprzedaz.s6.ob_peln': {
    pl: 'Klient udziela pełnomocnictwa Pośrednikowi do złożenia wniosków o wydanie zaświadczeń podatkowych oraz do ich odbioru z Urzędów Skarbowych właściwych dla lokalizacji nieruchomości.',
    en: 'The Client grants the Broker power of attorney to obtain tax certificates from the relevant Tax Offices.',
  },
  'sprzedaz.s6.ob_wpis': {
    pl: 'Klient akceptuje, iż Pośrednik jest uprawniony do wglądu oraz pobierania odpisów, wypisów, zaświadczeń dotyczących Nieruchomości z ksiąg wieczystych, katastru, planów miejscowych i innych rejestrów.',
    en: 'The Client accepts that the Broker is entitled to access and obtain copies of documents from land registers and other registers.',
  },
  'sprzedaz.s6.ob1k': {
    pl: 'Klient i Pośrednik ustalają, że w przypadku każdorazowej prezentacji Nieruchomości sporządzany będzie Protokół z prezentacji podpisany przez Klienta.',
    en: 'A Presentation Protocol shall be prepared and signed by the Client at each property viewing.',
  },
  'sprzedaz.s6.ob2k': {
    pl: ({ email }) => `Klient wyraża zgodę na przekazanie faktury VAT drogą elektroniczną na adres: ${email}`,
    en: ({ email }) => `The Client consents to receiving the VAT invoice electronically at: ${email}.`,
  },

  // ── §7 Tajemnica / §8 Postanowienia dodatkowe ──

  'sprzedaz.s7.taj1': {
    pl: 'Klient zobowiązuje się do zachowania w ścisłej tajemnicy danych potencjalnych nabywców Nieruchomości przekazanych przez Pośrednika.',
    en: 'The Client undertakes to keep strictly confidential the personal data of potential buyers provided by the Broker.',
  },
  'sprzedaz.s7.taj2': {
    pl: 'Klient zobowiązuje się do przekazania Pośrednikowi kopii umowy przedwstępnej i umowy przenoszącej własność Nieruchomości w celu prawidłowego wyliczenia wynagrodzenia. W przypadku niewykonania Pośrednik wyliczy wynagrodzenie według ceny z §1.',
    en: 'The Client undertakes to provide the Broker with copies of the preliminary agreement and the ownership transfer agreement.',
  },
  'sprzedaz.s7.tajk': {
    pl: 'Klient zobowiązuje się do przekazania Pośrednikowi kopii umowy przedwstępnej i umowy sprzedaży Nieruchomości w celu prawidłowego wyliczenia wynagrodzenia.',
    en: 'The Client undertakes to provide the Broker with copies of the preliminary agreement and the sale agreement.',
  },
  'sprzedaz.s8.dod1': {
    pl: 'Obowiązek zapłaty wynagrodzenia powstaje również w sytuacji gdy umowa zostanie zawarta między sprzedającym a osobą bliską lub powiązaną gospodarczo z Klientem.',
    en: 'The obligation to pay remuneration also arises if an agreement is concluded between the seller and a person close to or business-related to the Client.',
  },
  'sprzedaz.s8.dod1k': {
    pl: 'Obowiązek zapłaty wynagrodzenia powstaje również w sytuacji gdy umowa zostanie zawarta z osobą bliską nabywcy wskazanego przez Pośrednika.',
    en: 'The obligation to pay remuneration also arises if an agreement is concluded with a person close to the buyer indicated by the Broker.',
  },

  // ── §9 OC / koordynator ──

  'sprzedaz.s9.oc1': {
    pl: 'Pośrednik jest ubezpieczony od odpowiedzialności cywilnej za szkody wyrządzone w związku z wykonywaniem czynności pośrednictwa (art. 181 ustawy o gospodarce nieruchomościami) – kopia polisy stanowi Załącznik nr 5.',
    en: 'The Broker holds civil liability insurance — a copy of the policy constitutes Annex No. 5.',
  },
  'sprzedaz.s9.oc2': {
    pl: 'Pośrednik nie jest doradcą podatkowym i nie prowadzi usług doradztwa podatkowego.',
    en: 'The Broker is not a tax advisor and does not provide tax advisory services.',
  },
  'sprzedaz.s9.oc3': {
    pl: ({ osoba, tel, email }) => `Osobą koordynującą jest ${osoba}, tel. ${tel}, ${email}. Zmiana osoby koordynującej nie wpływa na pozostałe postanowienia umowy.`,
    en: ({ osoba, tel, email }) => `The coordinating person is: ${osoba}, tel. ${tel}, ${email}. A change of coordinating person does not affect other provisions of the agreement.`,
  },
  'sprzedaz.s9.oc4': {
    pl: 'Klient potwierdza otrzymanie kopii aktualnego dokumentu ubezpieczenia OC.',
    en: 'The Client confirms receipt of a copy of the current civil liability insurance document.',
  },

  // ── §10 RODO ──

  'sprzedaz.s10.rodo_par': {
    pl: 'Zasady dotyczące ochrony danych osobowych określa Załącznik nr 4 do Umowy.',
    en: 'Rules regarding personal data protection are set out in Annex No. 4.',
  },

  // ── §11 Czas trwania ──

  'sprzedaz.s11.czas1': {
    pl: ({ n, sl }) => `Niniejsza Umowa zostaje zawarta na czas określony ${n} (${sl}) miesięcy od dnia jej podpisania. Wypowiedzenie w tym okresie przysługuje Stronom w przypadku zaistnienia ważnych powodów.`,
    en: ({ n, sl }) => `This Agreement is concluded for a fixed term of ${n} (${sl}) months from the date of signing. Termination during this period is available to the Parties in the event of important reasons.`,
  },
  'sprzedaz.s11.czas2': {
    pl: 'Po upłynięciu okresu wskazanego w pkt. 1 umowa przechodzi na czas nieokreślony z 2-tygodniowym okresem wypowiedzenia.',
    en: 'After expiry, the agreement converts to indefinite term with a 2-week notice period.',
  },
  'sprzedaz.s11.czas1k': {
    pl: 'Niniejsza Umowa zostaje zawarta na czas nieokreślony.',
    en: 'This Agreement is concluded for an indefinite term.',
  },
  'sprzedaz.s11.czas2k': {
    pl: 'Każdej ze Stron przysługuje prawo wypowiedzenia Umowy z zachowaniem 1 miesięcznego okresu wypowiedzenia.',
    en: "Either Party has the right to terminate the Agreement with 1 month's notice.",
  },
  'sprzedaz.s11.czas3': {
    pl: 'Wszelkie zmiany do niniejszej Umowy wymagają formy pisemnej pod rygorem nieważności.',
    en: 'All amendments to this Agreement require written form under pain of nullity.',
  },
  'sprzedaz.s11.czas4': {
    pl: 'Ewentualne spory wynikłe w związku z wykonaniem niniejszej Umowy strony oddadzą pod rozstrzygnięcie właściwemu sądowi powszechnemu.',
    en: 'Any disputes shall be submitted to the competent common court.',
  },

  // ── §12 Klauzula konsumencka ──

  'sprzedaz.s12.kons1': {
    pl: 'Klient oświadcza, że został poinformowany przez Pośrednika o:',
    en: 'The Client declares to have been informed by the Broker about:',
  },
  'sprzedaz.s12.konsa': {
    pl: 'prawie do odstąpienia od umowy zawartej poza lokalem przedsiębiorstwa w terminie 14 dni (art. 27 ustawy z dnia 30 maja 2014r. o prawach konsumenta),',
    en: 'the right to withdraw from the agreement within 14 days (Art. 27 Consumer Rights Act),',
  },
  'sprzedaz.s12.konsb': {
    pl: 'obowiązku zapłaty Pośrednikowi za świadczenia spełnione do chwili odstąpienia od umowy, jeśli zgłosił żądanie wykonywania usługi przed terminem do odstąpienia,',
    en: 'the obligation to pay the Broker for services rendered up to withdrawal, if performance was requested before the withdrawal deadline,',
  },
  'sprzedaz.s12.konsc': {
    pl: ({ firma }) => `braku prawa do odstąpienia od umowy, jeśli zgłosił żądanie wykonywania usługi przed terminem do odstąpienia i dojdzie do transakcji w wyniku czynności ${firma}.`,
    en: ({ firma }) => `the loss of the right to withdraw if performance was requested before the deadline and a transaction results from activities of ${firma}.`,
  },
  'sprzedaz.s12.kons2': {
    pl: 'Załączniki: nr 1 – Informacja o prawie odstąpienia, nr 2 – Formularz odstąpienia, nr 3 – Oświadczenie, nr 4 – RODO, nr 5 – Polisa OC, nr 6 – PEP, nr 7 – Zgoda na dane.',
    en: 'Annexes: No. 1 – Withdrawal notice, No. 2 – Withdrawal form, No. 3 – Declaration, No. 4 – GDPR, No. 5 – OC Policy, No. 6 – PEP, No. 7 – Data consent.',
  },
  'sprzedaz.s12.kons2k': {
    pl: 'Załączniki: nr 1 – Informacja o prawie odstąpienia, nr 2 – Formularz odstąpienia, nr 3 – Oświadczenie, nr 4 – RODO, nr 5 – Polisa OC, nr 6 – PEP, nr 7 – Zgoda na dane, nr 8 – Karty prezentacji.',
    en: 'Annexes: No. 1 – Withdrawal notice, No. 2 – Withdrawal form, No. 3 – Declaration, No. 4 – GDPR, No. 5 – OC Policy, No. 6 – PEP, No. 7 – Data consent, No. 8 – Presentation Cards.',
  },
  'sprzedaz.s12.kons3': {
    pl: ({ adres }) => `Reklamacje należy kierować na adres: ${adres}.`,
    en: ({ adres }) => `Complaints should be addressed to: ${adres}.`,
  },
  'sprzedaz.ostatni': {
    pl: 'Niniejsza umowa została sporządzona w dwóch jednobrzmiących egzemplarzach, po jednym dla każdej ze Stron.',
    en: 'This agreement has been drawn up in two identical copies, one for each Party.',
  },

  // ── Załącznik 1: Informacja o prawie odstąpienia ──

  'sprzedaz.z1.title': {
    pl: 'INFORMACJA O PRAWIE ODSTĄPIENIA OD UMOWY',
    en: 'NOTICE OF RIGHT OF WITHDRAWAL',
  },
  'sprzedaz.z1.sub': {
    pl: '(na podstawie ustawy z dnia 30 maja 2014 r. o prawach konsumenta)',
    en: '(pursuant to the Consumer Rights Act of 30 May 2014)',
  },
  'sprzedaz.z1.h1': {
    pl: 'Prawo odstąpienia od umowy',
    en: 'Right of withdrawal',
  },
  'sprzedaz.z1.h2': {
    pl: 'Skutki odstąpienia od umowy',
    en: 'Effects of withdrawal',
  },
  'sprzedaz.z1.s1': {
    pl: 'Mają Państwo prawo odstąpić od niniejszej umowy w terminie 14 dni bez podania jakiejkolwiek przyczyny.',
    en: 'You have the right to withdraw from this agreement within 14 days without giving any reason.',
  },
  'sprzedaz.z1.s2': {
    pl: 'Termin do odstąpienia od umowy wygasa po upływie 14 dni od dnia zawarcia umowy.',
    en: 'The withdrawal period expires 14 days from the date of conclusion of the agreement.',
  },
  'sprzedaz.z1.s3': {
    pl: ({ firma, email }) => `Aby skorzystać z prawa odstąpienia od umowy, muszą Państwo poinformować ${firma} za pomocą jednoznacznego oświadczenia, składając je pocztą lub na adres: ${email}.`,
    en: ({ firma, email }) => `To exercise the right of withdrawal, you must inform ${firma} by sending a clear statement by post or to: ${email}.`,
  },
  'sprzedaz.z1.s4': {
    pl: 'Mogą Państwo skorzystać z wzoru formularza odstąpienia od umowy, jednak nie jest to obowiązkowe.',
    en: 'You may use the model withdrawal form, but it is not obligatory.',
  },
  'sprzedaz.z1.s5': {
    pl: 'Aby zachować termin do odstąpienia od umowy, wystarczy, aby wysłali Państwo informację dotyczącą wykonania przysługującego Państwu prawa odstąpienia od umowy przed upływem terminu do odstąpienia od umowy.',
    en: 'To meet the withdrawal deadline, it is sufficient to send your communication before the period expires.',
  },
  'sprzedaz.z1.e1': {
    pl: 'W przypadku odstąpienia od niniejszej umowy zwracamy Państwu wszystkie otrzymane od Państwa płatności niezwłocznie, a w każdym przypadku nie później niż 14 dni od dnia, w którym zostaliśmy poinformowani o Państwa decyzji o wykonaniu prawa odstąpienia od niniejszej umowy.',
    en: 'If you withdraw, we will reimburse all payments without undue delay, not later than 14 days from receipt of your decision.',
  },
  'sprzedaz.z1.e2': {
    pl: 'Jeżeli zażądali Państwo wykonywania usług przed upływem terminu do odstąpienia od umowy, zapłacą nam Państwo kwotę proporcjonalną do zakresu świadczeń spełnionych do chwili, w której poinformowali nas Państwo o odstąpieniu od niniejszej umowy.',
    en: 'If you requested commencement of services before the deadline, you shall pay an amount proportional to services provided until withdrawal.',
  },
  'sprzedaz.z1.sig': {
    pl: 'data i podpis Klienta (Konsumenta)',
    en: 'date and signature of the Client (Consumer)',
  },

  // ── Załącznik 2: Formularz odstąpienia ──

  'sprzedaz.z2.title': {
    pl: 'WZÓR FORMULARZA ODSTĄPIENIA OD UMOWY',
    en: 'MODEL WITHDRAWAL FORM',
  },
  'sprzedaz.z2.sub': {
    pl: '(formularz ten należy wypełnić i odesłać tylko w przypadku chęci odstąpienia od umowy)',
    en: '(complete and return only if you wish to withdraw)',
  },
  'sprzedaz.z2.inf': {
    pl: 'Ja/My niniejszym informuję/informujemy o moim/naszym odstąpieniu od umowy pośrednictwa.',
    en: 'I/We hereby give notice of my/our withdrawal from the brokerage agreement.',
  },
  'sprzedaz.z2.data': {
    pl: 'Data zawarcia umowy',
    en: 'Date of agreement',
  },
  'sprzedaz.z2.imie': {
    pl: 'Imię i nazwisko konsumenta(-ów)',
    en: 'Name(s) of consumer(s)',
  },
  'sprzedaz.z2.adres': {
    pl: 'Adres konsumenta(-ów)',
    en: 'Address of consumer(s)',
  },
  'sprzedaz.z2.sig': {
    pl: 'Podpis konsumenta(-ów)',
    en: 'Signature of consumer(s)',
  },
  'sprzedaz.z2.date': {
    pl: 'Data',
    en: 'Date',
  },

  // ── Załącznik 3: Oświadczenie ──

  'sprzedaz.z3.title': {
    pl: 'OŚWIADCZENIE',
    en: 'DECLARATION',
  },
  'sprzedaz.z3.text': {
    pl: ({ imie, adres, pesel, dowod, firma, nr, data }) => `Ja niżej podpisany/a ${imie} zamieszkały/a ${adres}, PESEL ${pesel}, nr dowodu ${dowod}, niniejszym żądam od ${firma} rozpoczęcia świadczenia usług na podstawie Umowy nr ${nr} z dnia ${data}, przed upływem terminu do odstąpienia od umowy (art. 27 ustawy z dnia 30 maja 2014 r. o prawach konsumenta) i zobowiązuję się do zapłaty 100% wynagrodzenia, jeśli dojdzie do transakcji.`,
    en: ({ imie, adres, pesel, dowod, firma, nr, data }) => `I, the undersigned ${imie}, residing at ${adres}, PESEL ${pesel}, ID no. ${dowod}, hereby request ${firma} to commence services under Agreement No. ${nr} dated ${data}, before the withdrawal deadline (Art. 27 Consumer Rights Act), and undertake to pay 100% of the agreed fee if a transaction results.`,
  },
  'sprzedaz.z3.ja':       { pl: 'Ja/My niżej podpisany ' },
  'sprzedaz.z3.zam':      { pl: ', zam. ' },
  'sprzedaz.z3.pesel_l':  { pl: ', PESEL ' },
  'sprzedaz.z3.leg':      { pl: ', legitymujący się dowodem osobistym numer ' },
  'sprzedaz.z3.tail': {
    pl: ({ firma, nr, data }) => `, niniejszym oświadczam, że żądam rozpoczęcia przez ${firma} świadczenia usługi na podstawie Umowy Nr ${nr} z dnia ${data} zawartej poza lokalem przedsiębiorstwa, przed upływem terminu do odstąpienia od umowy (art. 27 ustawy z dnia 30 maja 2014r. o prawach konsumenta Dz. U. 2014 poz. 827) i zapewniam, że zapłacę 100% wynagrodzenia ustalonego w umowie, jeśli dojdzie do transakcji w wyniku czynności ${firma}.`,
  },

  'sprzedaz.z3.sig': {
    pl: 'data i podpis Klienta (Konsumenta)',
    en: 'date and signature of the Client (Consumer)',
  },

  // ── Załącznik PEP ──

  'sprzedaz.zal.pep.title': {
    pl: 'OŚWIADCZENIE PEP',
    en: 'PEP DECLARATION',
  },
  'sprzedaz.zal.pep.imie': {
    pl: 'Imię i nazwisko',
    en: 'Full name',
  },
  'sprzedaz.zal.pep.q1': {
    pl: 'Czy jest Pan/Pani osobą zajmującą eksponowane stanowisko polityczne? *',
    en: 'Are you a person holding a prominent public position? *',
  },
  'sprzedaz.zal.pep.q2': {
    pl: 'Czy jest Pan/Pani członkiem rodziny osoby zajmującej eksponowane stanowisko polityczne? *',
    en: 'Are you a family member of a person holding a prominent public position? *',
  },
  'sprzedaz.zal.pep.q3': {
    pl: 'Czy jest Pan/Pani osobą znaną jako bliski współpracownik osoby zajmującej eksponowane stanowisko polityczne? *',
    en: 'Are you a close associate of a person holding a prominent public position? *',
  },
  'sprzedaz.zal.pep.uwaga': {
    pl: '* dotyczy ostatnich 12 miesięcy',
    en: '* refers to the last 12 months',
  },
  'sprzedaz.zal.pep.sources': {
    pl: 'Źródło pochodzenia wartości majątkowych:',
    en: 'Source of assets:',
  },

  // ── Załącznik RODO ──

  'sprzedaz.zal.rodo.title': {
    pl: 'ZGODA NA PRZETWARZANIE DANYCH OSOBOWYCH',
    en: 'CONSENT TO PERSONAL DATA PROCESSING',
  },
  'sprzedaz.zal.rodo.imie': {
    pl: 'Imię i nazwisko',
    en: 'Full name',
  },
  'sprzedaz.zal.rodo.gen': {
    pl: 'Zgoda ogólna: Wyrażam zgodę na przetwarzanie moich danych osobowych przez',
    en: 'General consent: I consent to the processing of my personal data by',
  },
  'sprzedaz.zal.rodo.scope': {
    pl: 'w celu oferowania produktów i usług w związku z pośrednictwem w obrocie nieruchomościami.',
    en: 'for the purpose of offering products and services in connection with real estate brokerage.',
  },
  'sprzedaz.zal.rodo.1': {
    pl: 'W celu przekazania danych do wskazanej kancelarii notarialnej.',
    en: 'For the purpose of sending data to the designated notarial office.',
  },
  'sprzedaz.zal.rodo.2': {
    pl: 'W celu przekazania numeru księgi wieczystej nieruchomości zainteresowanej stronie.',
    en: 'For the purpose of sharing the land register number with the interested party.',
  },
  'sprzedaz.zal.rodo.3': {
    pl: 'W celu przesyłania informacji handlowych drogą elektroniczną.',
    en: 'For the purpose of sending commercial information by electronic means.',
  },
  'sprzedaz.zal.rodo.4': {
    pl: 'W celach marketingowych.',
    en: 'For marketing purposes.',
  },

  // ── OC placeholder ──

  'sprzedaz.zal.oc_placeholder': {
    pl: '[Dokument polisy OC załączony osobno]',
  },

  // ── Ogólne: etykieta numeru załącznika ──

  'sprzedaz.zal.prefix': {
    pl: 'Załącznik Nr ',
    en: 'Annex No. ',
  },

  // ── Załącznik 4: Informacja RODO (PL-only — dokument prawny) ──

  'sprzedaz.zal4.title': {
    pl: 'INFORMACJA O PRZETWARZANIU DANYCH OSOBOWYCH',
  },
  'sprzedaz.zal4.sub': {
    pl: 'Na podstawie art. 13 rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (ogólne rozporządzenie o ochronie danych), zwanego dalej „RODO", w związku z przekazaniem przez Panią/Pana danych osobowych w związku z zawarciem umowy o pośrednictwo w obrocie nieruchomościami, niniejszym informuję:',
  },
  'sprzedaz.zal4.ust1': {
    pl: ({ nazwa, miasto, ulica, kod }) => `Pani/Pana dane osobowe są zbierane przez ${nazwa} z siedzibą w ${miasto} przy ul. ${ulica}, ${kod} ${miasto}, która pełni rolę ich administratora.`,
  },
  'sprzedaz.zal4.ust2': {
    pl: ({ email, tel }) => `Kontakt z Administratorem jest możliwy za pomocą poczty elektronicznej pod adresem: ${email} lub pod numerem telefonu: ${tel}`,
  },
  'sprzedaz.zal4.ust3': {
    pl: 'Podanie Pani/Pana danych osobowych jest warunkiem zawarcia z Administratorem umowy o pośrednictwo w obrocie nieruchomościami, w związku z czym ich niepodanie lub żądanie ich usunięcia powoduje niemożność zawarcia, wykonania lub dalszego wykonywania tej umowy.',
  },
  'sprzedaz.zal4.ust4head': {
    pl: '4.  Celem przetwarzania Pani/Pana danych osobowych jest:',
  },
  'sprzedaz.zal4.ust4a': {
    pl: 'umożliwienie wykonania zawartej z Administratorem umowy o pośrednictwo w obrocie nieruchomościami;',
  },
  'sprzedaz.zal4.ust4b': {
    pl: 'zapewnienie, by inni pośrednicy w obrocie nieruchomościami działający pod marką Home Experts nie kontaktowali się z Panią/Panem w kwestii obrotu nieruchomościami, w tym nie składali ofert ani nie proponowali współpracy, poprzez wprowadzenie Pani/Pana danych (wyłącznie w zakresie imienia, nazwiska i numeru telefonu) do dedykowanej dla pośredników w obrocie nieruchomościami aplikacji EstiCRM, zwanej dalej „Aplikacją".',
  },
  'sprzedaz.zal4.ust4note': {
    pl: 'Dane nie służą do zautomatyzowanego podejmowania decyzji i nie stanowią przedmiotu profilowania w rozumieniu RODO.',
  },
  'sprzedaz.zal4.ust5head': {
    pl: '5.  Podstawą prawną przetwarzania Pani/Pana danych osobowych jest:',
  },
  'sprzedaz.zal4.ust5a': {
    pl: 'art. 6 ust. 1 lit. b) RODO, tj. niezbędność przetwarzania danych na potrzeby wykonania zawartej z Administratorem umowy o pośrednictwo w obrocie nieruchomościami;',
  },
  'sprzedaz.zal4.ust5b': {
    pl: 'art. 6 ust. 1 lit. a) RODO, tj. wyrażona przez Panią/Pana zgoda na przetwarzanie danych osobowych za pomocą Aplikacji.',
  },
  'sprzedaz.zal4.ust6head': {
    pl: '6.  Odbiorcami Pani/Pana danych osobowych będą:',
  },
  'sprzedaz.zal4.ust6a': { pl: 'Administrator;' },
  'sprzedaz.zal4.ust6b': {
    pl: 'Home Experts Mariusz Zimnowodzki Nieruchomości z siedzibą w Gdańsku – w zakresie danych osobowych wprowadzanych do Aplikacji, jako licencjobiorcy Aplikacji;',
  },
  'sprzedaz.zal4.ust6c': {
    pl: 'EstiCRM sp. z o.o. z siedzibą w Gdańsku – w zakresie danych osobowych wprowadzanych do Aplikacji, jako dostawcy Aplikacji;',
  },
  'sprzedaz.zal4.ust6d': {
    pl: 'inni pośrednicy działający pod marką Home Experts – wyłącznie w zakresie imienia i nazwiska wprowadzonego do Aplikacji.',
  },
  'sprzedaz.zal4.ust6e': {
    pl: 'Kancelaria księgowa obsługująca Agenta w zakresie rozliczania wystawianych klientom faktur za sprzedaż / kupno nieruchomości.',
  },
  'sprzedaz.zal4.ust7': {
    pl: 'Pani/Pana dane osobowe będą przechowywane przez okres niezbędny do całkowitego wykonania zawartej z Administratorem umowy o pośrednictwo w obrocie nieruchomościami.',
  },
  'sprzedaz.zal4.ust8': {
    pl: 'W każdym czasie w okresie przetwarzania Pani/Pana danych osobowych przysługuje Pani/Panu prawo do uzyskania od Administratora potwierdzenia, czy przetwarzane są dotyczące Pani/Pana dane osobowe, a jeżeli ma to miejsce, jest Pani/Pan uprawniony do uzyskania dostępu do nich oraz do informacji: o celach przetwarzania; o kategoriach odnośnych danych; o odbiorcach lub kategoriach odbiorców, którym dane zostały ujawnione; o planowanym okresie przechowywania danych; o prawie do żądania sprostowania, usunięcia lub ograniczenia przetwarzania oraz do wniesienia sprzeciwu; o prawie wniesienia skargi do organu nadzorczego. Administrator dostarcza kopię danych osobowych podlegających przetwarzaniu.',
  },
  'sprzedaz.zal4.ust9': {
    pl: 'W każdym czasie w okresie przetwarzania Pani/Pana danych osobowych przysługuje Pani/Panu prawo do żądania od Administratora niezwłocznego sprostowania dotyczących Pani/Pana danych osobowych, które są nieprawidłowe.',
  },
  'sprzedaz.zal4.ust10head': {
    pl: '10.  W każdym czasie w okresie przetwarzania Pani/Pana danych osobowych przysługuje Pani/Panu prawo do żądania od Administratora niezwłocznego usunięcia dotyczących Pani/Pana danych osobowych.',
  },
  'sprzedaz.zal4.ust10a': {
    pl: 'dane osobowe nie są już niezbędne do celów, w których zostały zebrane lub w inny sposób przetwarzane;',
  },
  'sprzedaz.zal4.ust10b': {
    pl: 'cofnęła Pani/Pan zgodę, na której opiera się przetwarzanie i nie ma innej podstawy prawnej przetwarzania danych;',
  },
  'sprzedaz.zal4.ust10c': {
    pl: 'dane osobowe są przetwarzane niezgodnie z prawem;',
  },
  'sprzedaz.zal4.ust10d': {
    pl: 'dane osobowe muszą zostać usunięte w celu wywiązania się z obowiązku prawnego.',
  },
  'sprzedaz.zal4.ust11': {
    pl: 'W każdym czasie przysługuje Pani/Panu prawo do żądania od Administratora ograniczenia przetwarzania danych osobowych.',
  },
  'sprzedaz.zal4.ust12': {
    pl: 'Przysługuje Pani/Panu prawo do przenoszenia danych osobowych.',
  },
  'sprzedaz.zal4.ust13': {
    pl: 'W każdym czasie przysługuje Pani/Panu prawo do wycofania zgody na przetwarzanie danych osobowych. Wycofanie zgody nie wpływa na zgodność z prawem przetwarzania dokonanego przed jej wycofaniem.',
  },
  'sprzedaz.zal4.ust14': {
    pl: 'W razie naruszenia zasad ochrony Pani/Pana danych osobowych przysługuje Pani/Panu prawo do wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych.',
  },

  // ── Załącznik 5: Polisa OC ──

  'sprzedaz.zal5.title': {
    pl: 'Kopia dokumentu ubezpieczenia OC pośrednika',
  },
  'sprzedaz.zal5.sub': {
    pl: 'ubezpieczenie odpowiedzialności cywilnej za szkody wyrządzone w związku z wykonywaniem czynności pośrednictwa',
  },

  // ── Załącznik RODO: etykieta „Zgoda ogólna" ──

  'sprzedaz.zal.rodo.gen_label': {
    pl: 'Zgoda ogólna:',
    en: 'General:',
  },

  // ── Załącznik 8: Karty prezentacji (PL-only — tylko umowa kupno) ──

  'sprzedaz.zal8.title': {
    pl: 'KARTY PREZENTACJI NIERUCHOMOŚCI',
  },
  'sprzedaz.zal8.header': {
    pl: ({ idx, adres }) => `Prezentacja nr ${idx}: ${adres}`,
  },
  'sprzedaz.zal8.f_data': { pl: 'Data prezentacji:' },
  'sprzedaz.zal8.f_cena': { pl: 'Cena ofertowa:' },
  'sprzedaz.zal8.f_pow':  { pl: 'Powierzchnia:' },
  'sprzedaz.zal8.f_rodzaj': { pl: 'Rodzaj:' },
  'sprzedaz.zal8.uwagi_prefix': { pl: 'Uwagi: ' },
  'sprzedaz.zal8.confirm': {
    pl: 'Niniejszym potwierdzam, że zapoznałem/am się z prezentowaną Nieruchomością.',
  },
  'sprzedaz.zal8.sig_klient': { pl: 'DATA       PODPIS KLIENTA' },
  'sprzedaz.zal8.sig_pos':    { pl: 'DATA       PODPIS POŚREDNIKA' },

  // ── §1 kupno: preferencje klienta ──

  'sprzedaz.s1.t3k': {
    pl: ({ opis }) => `Preferencje Klienta dotyczące poszukiwanej Nieruchomości: ${opis}`,
    en: ({ opis }) => `Client's preferences for the sought Property: ${opis}`,
  },

};

// Helper: pobierz tekst w danym języku (domyślnie 'pl').
// Jeśli wartość jest funkcją, wywołaj ją z przekazanymi danymi.
function getText(key, data, lang) {
  lang = lang || 'pl';
  const entry = texts[key];
  if (!entry) return '';
  const val = entry[lang] || entry['pl'] || '';
  return typeof val === 'function' ? val(data || {}) : val;
}
