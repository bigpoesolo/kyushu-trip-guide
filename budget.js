// One entry per expense. Shared rides, day passes and return tickets are counted once.
const dates = ['12/5 토', '12/6 일', '12/7 월'];
const places = ['유후인', '하카타', '귀국'];
const kinds = {
  paid: '카드 결제 완료', online: '온라인 카드 지정', scheduled: '자동 결제 예정',
  fixed: '현지 결제 확정', base: '기본 예산', option: '선택 지출', unknown: '금액 미확인',
};
const sources = {
  bags: ['유후인 관광국 보관료', 'https://yufuin.gr.jp/news/news-4422/'],
  shiba: ['카페 공식 입장료', 'https://owls-cats-forest.com/free/mameshiba-yufuin'],
  pickup: ['료칸 송영 안내', 'https://yufunoirodori-oohashi.jp/access'],
  subway: ['후쿠오카 지하철 운임', 'https://subway.city.fukuoka.lg.jp/fare/ryokin.php'],
  market: ['하카타 마켓 공식 안내', 'https://christmas-advent.jp/fukuoka-hakata/'],
  soba: ['소후렌 하카타 에키마에점 메뉴', 'https://r.gnavi.co.jp/nr28d5j20000/menu1/'],
  airport: ['니시테쓰 국제선 직행버스', 'https://www.nishitetsu.jp/bus/rosen/akeito/'],
};
const ledger = [
  [
    { event: 'flight-out', title: '제주항공 왕복 · 성인 2명', kind: 'unknown', note: '예약 목록에 왕복 항공편이 있어요. 두 사람의 결제 영수증과 운임은 찾지 못해 모든 금액 합계에서 제외했어요.' },
    { event: 'arrival', title: '공항 간단식·물', kind: 'option', min: 800, max: 1800, note: '두 사람 예산. 인천에서 먹었거나 버스 환승이 빠듯하면 건너뛰어요.' },
    { event: 'bus-out', title: '유후인 고속버스 왕복', kind: 'paid', min: 13000, mail: 'bus-tickets', note: '왕복 2인 합계. 11/10 카드 결제 완료. 일요일 유후인 → 하카타도 포함돼요.' },
    { event: 'bags', title: '유후인역 짐 보관', kind: 'base', min: 1200, max: 1600, source: 'bags', note: '캐리어 2개 가정. 높이 60cm 미만은 개당 ¥600, 60cm 이상은 ¥800이에요.' },
    { event: 'shiba', title: '마메시바 카페 입장', kind: 'option', min: 2200, source: 'shiba', note: '성인 ¥1,100 × 2, 음료 포함. 15:50쯤까지 입장할 수 있을 때만 써요.' },
    { event: 'shopping', title: '유노츠보 거리 간식', kind: 'option', min: 600, max: 1400, note: '고로케나 밀히 디저트 등 각자 한두 개를 고르는 예산이에요.' },
    { event: 'collect', title: '픽업 요청 공중전화', kind: 'base', min: 10, max: 100, note: '짧은 통화용 동전 예산. 10엔 동전을 여러 개 챙겨요.' },
    { event: 'ryokan-ride', title: '픽업 불발 시 택시', kind: 'option', min: 1000, max: 2000, source: 'pickup', note: '료칸 송영 이용 시 ¥0. 택시 한 대 예산으로, 호출·대기 상황에 따라 달라져요.' },
    { event: 'ryokan', title: '오오하시 객실', kind: 'online', min: 34480, mail: 'ryokan-booking', note: '1박 2인 객실료. 예약서에 사전 온라인 카드 결제로 지정됐고 실제 승인·청구 여부는 미확인이에요.' },
    { event: 'ryokan', title: '오오하시 입탕세', kind: 'fixed', min: 500, mail: 'ryokan-booking', note: '성인 ¥250 × 2. 숙박일에 한 번만 계산했어요. 체크아웃 정산이면 이 금액은 일요일 아침에 내요.' },
    { event: 'sukiyaki', title: '료칸 스키야키 석식', kind: 'fixed', min: 26400, mail: 'ryokan-conversation', note: '11/18 료칸이 2인 ¥26,400을 확정했어요. 현지 카드 결제가 가능해요. 다음 날 정산해도 토요일에만 계산해요.' },
    { event: 'late-snack', title: '료칸에서 먹을 야식', kind: 'option', min: 500, max: 1200, note: '역 근처 편의점에서 둘이 나눌 간식·음료를 사는 예산이에요.' },
  ],
  [
    { event: 'taxi-am', title: '료칸 → 버스센터 아침 택시', kind: 'base', min: 1000, max: 2000, note: '택시 한 대 기준 계획액. 07:20 배차·금액은 미확정이에요.' },
    { event: 'brunch', title: '하카타역 브런치', kind: 'base', min: 1000, max: 2200, note: '빵·커피로 가볍게 먹는 2인 예산이에요.' },
    { event: 'lunch', title: '우동 점심', kind: 'base', min: 1600, max: 3000, note: '우동 두 그릇과 토핑 예산. 가게·주문이 정해지면 실제 금액이 달라져요.' },
    { event: 'hakata-hotel', title: '포르자 하카타구치 객실', kind: 'scheduled', min: 157.34, currency: 'USD', mail: 'agoda-hotel', note: '세금·봉사료 포함 예약 기준액. 12/1 자동 결제 시 아고다 환율·5% 조정 조건이 적용돼 최종 원화 청구액은 미확정이에요.' },
    { event: 'hakata-hotel', title: '포르자 현지 숙박세', kind: 'fixed', min: 400, mail: 'agoda-hotel', note: '2인 합계. 객실 예약 기준액과 별도로 현지에서 내요.' },
    { event: 'market-before', title: '크리스마스마켓 먹거리·소품', kind: 'option', min: 500, max: 3000, source: 'market', note: '입장·일루미네이션 관람은 무료. 오후와 밤 두 번 방문해도 하루 구매 예산 한 번만 잡아요.' },
    { event: 'mako-transit', title: '하카타 → 야쿠인오도리 지하철', kind: 'base', min: 520, source: 'subway', note: '마코로 갈 때 1인 ¥260 × 2. 도보 구간은 무료예요.' },
    { event: 'dinner', title: '마코 야키토리 코스', kind: 'fixed', min: 19360, mail: 'mako-booking', note: '12/6 18:00. ¥8,800 × 2 + 서비스료 ¥1,760. TableCheck 보증용 카드 가승인과 별개로 매장에서 한 번 결제해요.' },
    { event: 'dinner', title: '마코 음료·추가 주문', kind: 'option', min: 1000, max: 4000, note: '코스 외에 두 사람이 추가 주문할 때 쓸 계획액이에요.' },
    { event: 'mako-return', title: '마코 → 하카타 방면 지하철', kind: 'base', min: 420, max: 520, source: 'subway', note: '2인 합계. 소후렌으로 가면 구시다진자마에 하차 ¥420, 호텔·마켓 직행은 하카타 하차 ¥520. 한 경로만 타요.' },
    { event: 'night-food', title: '소후렌 야키소바', kind: 'option', min: 1400, max: 2100, source: 'soba', note: '소 ¥700 또는 보통 ¥1,050을 각자 한 그릇. 저녁 후 배고프고 주문이 가능할 때 들러요.' },
  ],
  [
    { event: 'breakfast', title: '하카타 아침 식사', kind: 'base', min: 1000, max: 2200, note: '포르자 확정서에 조식 포함 표기가 없어 역 근처에서 따로 먹는 예산이에요.' },
    { event: 'airport-return', title: '하카타 → 국제선 터미널', kind: 'base', min: 2000, max: 3500, source: 'airport', note: '짐을 싣고 호텔에서 출발하는 택시 한 대 예산. 직행버스를 타면 두 사람 약 ¥760~800으로 이 항목을 대체해요.' },
    { event: 'depart', title: '공항 간단식', kind: 'option', min: 1600, max: 3200, note: '출국 수속 후 시간이 남을 때 먹는 2인 예산이에요.' },
  ],
];

const yen = n => '¥' + n.toLocaleString('en-US');
const usd = n => 'US$' + n.toFixed(2);
const range = (min, max) => min === max ? yen(min) : yen(min) + '–' + yen(max);
const money = r => r.kind === 'unknown' ? '미확인' : r.currency === 'USD' ? usd(r.min) : range(r.min, r.max ?? r.min);
const sum = (list, fn) => list.reduce((s, item) => s + fn(item), 0);
const subtotal = (rows, kind, high = false) => sum(rows.filter(r => r.kind === kind), r => high ? (r.max ?? r.min) : r.min);

export const budgetDays = ledger.map(rows => {
  const fixed = subtotal(rows, 'fixed');
  const min = fixed + subtotal(rows, 'base');
  const max = fixed + subtotal(rows, 'base', true);
  const options = subtotal(rows, 'option', true);
  return {fixed, min, max, options, limit: max + options};
});
const rows = ledger.flat();
const paid = subtotal(rows, 'paid');
const online = subtotal(rows, 'online');
const scheduled = subtotal(rows, 'scheduled');
const localFixed = subtotal(rows, 'fixed');
const confirmedYen = paid + online + localFixed;
const localMin = sum(budgetDays, d => d.min);
const localMax = sum(budgetDays, d => d.max);
const localLimit = sum(budgetDays, d => d.limit);
// KB indicative rates displayed by KITA on Nov 23. Keep separate from actual card charges.
const approxWon = (jpy, dollars = 0) => (Math.round((jpy * 8.4612 + dollars * 1343.8) / 1000) / 10).toLocaleString('ko-KR') + '만 원';

// Additional appearances of the same expense never create a second ledger entry.
const references = {
  'flight-back': ['flight-out', '항공권 · 금액 미확인'],
  'bus-ready': ['bus-out', '왕복 승차권에 포함'],
  'bus-back': ['bus-out', '왕복 승차권에 포함'],
  platform: ['bus-out', '승강장 이동 무료 · 승차권 결제 완료'],
  bath: ['ryokan', '객실 온천 포함 · 입탕세는 숙박에 집계'],
  early: ['ryokan', '료칸 정산 · 숙박일에 집계'],
  'mako-ready': ['dinner', '예약 확인 · 코스비는 저녁에 집계'],
  market: ['market-before', '무료 입장 · 구매 예산은 오후와 공유'],
  checkout: ['hakata-hotel', '포르자 숙박비에 집계'],
  rest: ['hakata-hotel', '숙박에 포함'],
};
const free = {
  'walk-cafe': '도보 무료', 'walk-back': '도보 무료', 'hakata-bags': '투숙객 짐 보관 · 별도 예산 없음',
  shrine: '신사 참배·상점가 산책 무료', canal: '입장·산책 무료', snack: '외출 준비 · 무료',
  'airport-arrival': '터미널 이동 · 추가 비용 없음',
};
const related = id => rows.filter(r => r.event === (references[id]?.[0] || id));
export function dailyBudgetLabel(day) {
  const b = budgetDays[day];
  return b ? range(b.min, b.max) : '';
}
export function eventBudgetLabel(id) {
  if (references[id]) return references[id][1];
  if (free[id]) return free[id];
  const list = related(id);
  if (list.length > 1) return list.map(r => kinds[r.kind] + ' ' + money(r)).join(' · ');
  const r = list[0];
  if (!r) return '';
  return r.kind === 'unknown' ? kinds.unknown : kinds[r.kind] + ' ' + money(r);
}
function line(r) {
  const source = sources[r.source];
  const links = [
    r.mail && `<button type="button" class="budget-link" data-action="mail" data-id="${r.mail}|${r.event}">예약 메일 보기</button>`,
    source && `<a class="budget-link" href="${source[1]}" target="_blank" rel="noopener noreferrer">${source[0]}</a>`,
  ].filter(Boolean).join('');
  return `<article class="budget-line"><div><span class="budget-kind">${kinds[r.kind]}</span><h4>${r.title}</h4></div><strong>${money(r)}</strong><p>${r.note}</p>${links ? '<div class="budget-links">' + links + '</div>' : ''}</article>`;
}
export function eventBudgetDetails(id) {
  const list = related(id);
  const note = references[id]?.[1] || free[id];
  if (!list.length && !note) return '';
  return `<section class="budget-section event-budget"><h3>비용 · 두 사람</h3>${note ? '<p class="budget-note">' + note + '</p>' : ''}${list.map(line).join('')}</section>`;
}
function ledgerGroup(title, entries, expanded = false) {
  if (!entries.length) return '';
  return `<details class="ledger-group"${expanded ? ' open' : ''}><summary><strong>${title}</strong><span>${entries.length}건</span></summary><ul>${entries.map(r => `<li><button class="ledger-action" type="button" data-action="event" data-id="${r.event}"><span><small class="cost-state state-${r.kind}">${kinds[r.kind]}</small><b>${r.title}</b></span><strong>${money(r)}</strong></button></li>`).join('')}</ul></details>`;
}
function dayBudget(day) {
  const b = budgetDays[day];
  const entries = ledger[day];
  return `<section class="budget-hero"><h2>${dates[day]} 현지 기본 예산</h2><strong class="budget-total">${dailyBudgetLabel(day)}</strong>
    <p>약 ${approxWon(b.min)}~${approxWon(b.max)} · 카드와 현금 합계</p>
    <dl class="daily-split"><div><dt>현지 결제 확정</dt><dd>${yen(b.fixed)}</dd></div><div><dt>식비·이동 등 예상</dt><dd>${range(b.min - b.fixed, b.max - b.fixed)}</dd></div></dl></section>
    <p class="budget-cap"><span>선택 일정까지 이용하면</span><strong>최대 ${yen(b.limit)}</strong></p>
    <section class="day-account"><h2>${dates[day]} 지출 내역</h2>
    ${ledgerGroup('현지 기본 일정', entries.filter(r => ['fixed', 'base'].includes(r.kind)), true)}
    ${ledgerGroup('선택 지출 · 최대 ' + yen(b.options), entries.filter(r => r.kind === 'option'))}
    ${ledgerGroup('사전 예약·항공권', entries.filter(r => ['online', 'paid', 'scheduled', 'unknown'].includes(r.kind)))}</section>`;
}
function tripBudget() {
  const onlineYen = paid + online;
  const dailyRows = budgetDays.map((d, i) => `<li><button type="button" data-action="budget" data-id="${i}"><span>${dates[i]} <small>${places[i]}</small></span><b>${range(d.min, d.max)}</b><svg aria-hidden="true"><use href="#chevron"/></svg></button></li>`).join('');
  return `<section class="budget-hero"><h2>여행 전체 예상액 · 항공권 제외</h2><strong class="budget-total">약 ${approxWon(onlineYen + localMin, scheduled)}~${approxWon(onlineYen + localMax, scheduled)}</strong><p>${range(onlineYen + localMin, onlineYen + localMax)} + ${usd(scheduled)}</p></section>
    <div class="budget-overview"><section class="budget-receipt"><h2>예약 금액과 결제 상태</h2><p class="booking-amount">${yen(confirmedYen)} + ${usd(scheduled)} <small>약 ${approxWon(confirmedYen, scheduled)}</small></p>
    <dl class="payment-rows"><div><dt>결제 완료 <small>왕복버스</small></dt><dd>${yen(paid)}</dd></div>
    <div><dt>현지 결제 확정 <small>석식 2회·입탕세·숙박세</small></dt><dd>${yen(localFixed)}</dd></div>
    <div><dt>카드 청구 미확인 <small>료칸 객실</small></dt><dd>${yen(online)}</dd></div>
    <div><dt>12/1 자동 결제 예정 <small>포르자 객실</small></dt><dd>${usd(scheduled)}</dd></div>
    <div><dt>항공권 <small>제주항공 왕복</small></dt><dd>금액 미확인</dd></div></dl></section>
    <section class="budget-local"><h2>날짜별 현지 예산</h2><ul class="budget-date-list">${dailyRows}</ul><dl class="payment-rows"><div><dt>3일 합계</dt><dd>${range(localMin, localMax)}</dd></div></dl><p class="budget-note">이 합계에는 현지에서 낼 예약 금액 ${yen(localFixed)}이 들어 있어요.</p></section></div>
    <details class="trip-account budget-basis"><summary><strong>선택 지출과 환산 기준</strong></summary><div class="account-body"><dl class="payment-rows"><div><dt>선택 포함 현지 상한</dt><dd>${yen(localLimit)}</dd></div><div><dt>선택 포함 전체 상한</dt><dd>${yen(onlineYen + localLimit)} + ${usd(scheduled)}</dd></div></dl>
    <p>11/23 예약 메일·일정 기준. 항공권·한국 내 이동·개인 쇼핑은 별도예요. 택시·식비는 두 사람의 계획액이에요.</p><p>료칸 객실은 사전 온라인 카드로 지정됐고 실제 청구는 확인 중이에요. 포르자는 12/1 환율과 조정 조건에 따라 원화 청구액이 달라져요.</p><p class="budget-note">원화는 11/23 KB국민은행 31회차 매매기준율(100엔 846.12원, 1달러 1,343.80원)로 반올림했어요. <a class="budget-link" href="https://www.kita.net/cmmrcInfo/ehgtGnrlzInfo/rltmEhgt.do" target="_blank" rel="noopener noreferrer">한국무역협회 환율</a></p></div></details>`;
}
export function renderBudget(day, overview = false) {
  const tabs = dates.map((date, i) => `<button type="button" class="budget-day" data-action="budget-day" data-id="${i}" aria-pressed="${!overview && day === i}"><b>${date}</b><span>${places[i]}</span></button>`).join('');
  return `<div class="budget-page"><header class="budget-heading"><h1>여행 예산</h1><p>성인 2명 기준</p></header>
    <div class="budget-days" role="group" aria-label="예산 기간"><button type="button" class="budget-day" data-action="budget-overview" aria-pressed="${overview}"><b>전체</b><span>2박 3일</span></button>${tabs}</div>
    ${overview ? tripBudget() : dayBudget(day)}</div>`;
}
