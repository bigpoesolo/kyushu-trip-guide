import { areas, checkinFirst, days, foodDecisions, foodGenres, foods, savedPlaces, schedules, statuses, tasks } from './trip.js?v=17';
import { eventPhotos, guides, photos } from './guides.js?v=17';
import { gmailSearch, hotelBooking, mailChecked, travelMails } from './reservations.js?v=17';

const view = document.querySelector('#view');
const dialog = document.querySelector('#detail');
const detail = document.querySelector('#detail-content');
const notice = document.querySelector('#notice');
const offlineState = document.querySelector('#offline-state');
const shell = document.querySelector('.shell');
const storageKey = 'fukuoka-trip-edits-v1';
const appVersion = 'v17';
const events = Object.fromEntries(schedules.flatMap((list, day) => list.map(event => [event.id, { ...event, day }])));
const mealEvents = Object.values(events).filter(event => event.meal);
let saved = { events: {}, tasks: {} };
try {
  saved = sanitizeSaved(JSON.parse(localStorage.getItem(storageKey)));
} catch {
  // The initial trip is available even if storage is disabled.
}

let tab = 'schedule';
let day = 0;
let area = '';
let awardOnly = false;
let genre = '';
let foodScope = 'trip';
let foodQuery = '';
let fullSchedule = false;
let toastTimer;
let routeApplying = false;
let routeDetail;
let dialogTrigger;
let dialogTriggerInfo;
let installPrompt;
let updateAvailable = false;
const tripFoodIds = ['mako', 'sofuren', 'daichi', 'karo', 'kamakiri', 'dacomecca', 'shiroya', 'fullfull', 'milch', 'bspeak', 'korokke', 'purindora'];

function sanitizeSaved(value) {
  const result = { events: {}, tasks: {} };
  if (!value || typeof value !== 'object') return result;
  for (const [id, edits] of Object.entries(value.events || {})) {
    if (!Object.hasOwn(events, id) || !edits || typeof edits !== 'object') continue;
    const clean = {};
    for (const field of ['start', 'end']) if (typeof edits[field] === 'string' && /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(edits[field])) clean[field] = edits[field];
    if (edits.end === '') clean.end = '';
    if (clean.end && clean.start && clean.end < clean.start) { delete clean.start; delete clean.end; }
    if (typeof edits.note === 'string') clean.note = edits.note.slice(0, 600);
    if (edits.timeLabel === '') clean.timeLabel = '';
    if (Object.hasOwn(statuses, edits.status)) clean.status = edits.status;
    if (Array.isArray(edits.added)) clean.added = [...new Set(edits.added.filter(food => Object.hasOwn(foods, food) && foods[food].meals?.includes(events[id].meal)))];
    if (typeof edits.selected === 'string' && Object.hasOwn(foods, edits.selected)) clean.selected = edits.selected;
    if (edits.mealStatuses && typeof edits.mealStatuses === 'object') clean.mealStatuses = Object.fromEntries(Object.entries(edits.mealStatuses).filter(([food, status]) => Object.hasOwn(foods, food) && Object.hasOwn(statuses, status)));
    result.events[id] = clean;
  }
  for (const task of tasks) if (value.tasks?.[task.id] === true) result.tasks[task.id] = true;
  return result;
}

const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const icon = name => `<svg class="icon" aria-hidden="true"><use href="#${name}"/></svg>`;
const mark = name => `<span class="mark mark-${name}">${icon(name)}</span>`;
const badge = (label, className = '') => `<span class="tag ${className}">${escape(label)}</span>`;
const link = (label, url) => `<a class="button" href="${escape(url)}" target="_blank" rel="noopener noreferrer">${escape(label)} ${icon('external')}</a>`;
const mapLink = (place, label = '지도') => link(label, `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place)}`);
const directionsLink = (origin, destination, mode = 'walking', label = mode === 'walking' ? '도보 길찾기' : mode === 'transit' ? '대중교통 길찾기' : '차량 경로') => link(label,
  `https://www.google.com/maps/dir/?${new URLSearchParams({ api: '1', origin, destination, travelmode: mode })}`);
const action = (label, name, id, extraClass = '', symbol = '') => `<button type="button" class="button ${extraClass}" data-action="${name}" data-id="${escape(id)}">${symbol ? icon(symbol) : ''}${escape(label)}</button>`;
const timeText = event => event.timeLabel || [event.start, event.end].filter(Boolean).join('–') + (event.id === 'dinner' ? ' · 종료 예상' : '');
const dayIcons = ['mountain', 'pin', 'plane'];
const eventIcons = {
  'flight-out': 'plane', arrival: 'bag', platform: 'walk', 'bus-out': 'bus', bags: 'bag', 'walk-cafe': 'walk', shiba: 'coffee',
  shopping: 'shop', 'walk-back': 'walk', collect: 'bag', 'ryokan-ride': 'car', ryokan: 'hotel', sukiyaki: 'food', bath: 'bath', 'late-snack': 'food',
  early: 'hotel', 'taxi-am': 'car', 'bus-ready': 'bus', 'bus-back': 'bus', 'hakata-bags': 'bag', brunch: 'bread', shrine: 'pin',
  lunch: 'food', canal: 'shop', 'hakata-hotel': 'hotel', snack: 'coffee', 'market-before': 'sparkle', 'mako-transit': 'route', 'mako-ready': 'pin', dinner: 'food', 'mako-return': 'route', 'night-food': 'bowl', market: 'sparkle', rest: 'hotel',
  breakfast: 'bread', checkout: 'bag', 'airport-return': 'car', 'airport-arrival': 'pin', depart: 'bag', 'flight-back': 'plane',
};
const foodIcons = {
  dacomecca: 'bread', karo: 'bowl', painstock: 'bread', uochu: 'bowl', yamanaka: 'bowl', issou: 'bowl', '16ku': 'coffee',
  shiroya: 'bread', hagakure: 'bowl', genki: 'bowl', fullfull: 'bread', suzukake: 'coffee', tenjosajiki: 'coffee', bspeak: 'coffee', milch: 'coffee', purindora: 'coffee',
  mako: 'food', sofuren: 'bowl', daichi: 'bowl', taira: 'bowl', taka: 'food', kamakiri: 'bowl', umeyama: 'food', toriden: 'bowl', wakaba: 'food', gyozalee: 'food', ichifuji: 'bowl', kubocurry: 'bowl', hamadaya: 'bowl',
};

const tripDates = ['2026-12-05', '2026-12-06', '2026-12-07'];
const dayHighlights = [
  [['shiba', '15:50', '카페 입장 판단'], ['collect', '16:40', '짐 회수·픽업 전화'], ['ryokan', '17:00', '료칸 도착 목표']],
  [['market-before', '15:45', '크리스마스마켓'], ['mako-transit', '17:05', '마코로 출발'], ['dinner', '18:00', '예약 식사']],
  [['airport-return', '09:45', '호텔 출발 목표'], ['airport-arrival', '10:15', '국제선 도착 목표'], ['flight-back', '13:00', '귀국편 출발']],
];
const dayCopy = [
  ['유후인은 짧게, 온천은 길게.', '카페는 15:50 입장 가능할 때만. 17:30 체크인 마감이 우선이에요.'],
  ['하카타의 크리스마스를 천천히.', '호텔에서 쉬고 마켓으로. 17:05에 마코로 출발하면 여유 있어요.'],
  ['아침은 가볍게, 공항은 여유 있게.', '국제선 터미널 10:15~10:30 도착을 기준으로 움직여요.'],
];
const preparationSteps = new Set(['arrival', 'platform', 'walk-cafe', 'walk-back', 'ryokan-ride', 'bus-ready', 'snack', 'mako-ready', 'mako-return', 'depart']);

function routeHash(modal = routeDetail) {
  return `#${tab}/${day + 1}${modal ? `/${modal.kind}/${encodeURIComponent(modal.id)}${modal.from ? `/${encodeURIComponent(modal.from)}` : ''}` : ''}`;
}

function syncRoute() {
  if (!routeApplying && window.location.hash !== routeHash()) window.history.pushState(null, '', routeHash());
}

function recordDetail(kind, id, from = '') {
  if (!dialog.open) { dialogTrigger = document.activeElement; dialogTriggerInfo = dialogTrigger?.dataset ? { ...dialogTrigger.dataset } : undefined; }
  routeDetail = { kind, id, from };
  syncRoute();
}

function restoreRoute() {
  routeApplying = true;
  let parts;
  try { parts = window.location.hash.slice(1).split('/').map(decodeURIComponent); } catch { parts = []; }
  const [nextTab, nextDay, kind, id, from] = parts;
  tab = ['schedule', 'maps', 'food', 'mail', 'tasks'].includes(nextTab) ? nextTab : 'schedule';
  const today = journeyClock().index;
  day = ['1', '2', '3'].includes(nextDay) ? Number(nextDay) - 1 : today < 0 ? 0 : today;
  routeDetail = undefined;
  render();
  if (kind === 'event' && Object.hasOwn(events, id)) showEvent(id, tasks.some(item => item.id === from) ? from : '');
  else if (kind === 'food' && Object.hasOwn(foods, id)) showFood(id, Object.hasOwn(events, from) ? from : '');
  else if (kind === 'mail' && travelMails.some(item => item.id === id)) showMail(id, Object.hasOwn(events, from) ? from : '');
  else if (kind === 'task' && tasks.some(item => item.id === id)) showTask(id);
  else if (dialog.open) dialog.close();
  routeApplying = false;
  window.history.replaceState(null, '', routeHash());
}

async function shareView() {
  const data = { title: '규슈 여행 노트 · 12/5–7', text: '우리 여행의 공통 일정이에요. 개인 메모·내 기기 선택은 포함되지 않아요.', url: window.location.href };
  try {
    if (navigator.share) await navigator.share(data);
    else await copyText(data.url);
  } catch (error) { if (error.name !== 'AbortError') await copyText(data.url); }
}

function journeyClock(now = new Date()) {
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Tokyo', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(now).map(part => [part.type, part.value]));
  const date = `${parts.year}-${parts.month}-${parts.day}`;
  return { date, time: `${parts.hour}:${parts.minute}`, index: tripDates.indexOf(date) };
}

function nextScheduled(clock) {
  if (clock.index < 0) return undefined;
  const list = schedules[clock.index].map(item => currentEvent(item.id)).filter(item => item.status !== 'option').sort((a, b) => a.start.localeCompare(b.start));
  return list.find(item => item.start >= clock.time || (item.end && item.end > clock.time));
}

function renderJourneyFocus() {
  const clock = journeyClock();
  const next = clock.index === day ? nextScheduled(clock) : undefined;
  const finished = clock.index === day && !next;
  const phase = clock.date < tripDates[0] ? '여행 전 미리보기' : clock.date > tripDates[2] ? '여행 기록' : clock.index === day ? `현지 ${clock.time} · 진행 기준` : '다른 날짜 미리보기';
  return `<section class="journey-focus" aria-label="오늘의 핵심"><div class="focus-top"><p class="eyebrow">DAY 0${day + 1} · ${days[day].date}</p><span>${phase}</span></div>
    <h2>${next ? `${escape(next.start)} ${escape(next.title)}` : finished ? '오늘은 여기까지. 푹 쉬어요.' : dayCopy[day][0]}</h2><p>${next ? `${next.start < clock.time ? '계획상 진행 중' : '다음 계획'} · 실제 이동 상황은 지도에서 확인해요.` : finished ? '마지막 계획 시각이 지났어요. 아래에서 오늘의 일정을 다시 볼 수 있어요.' : dayCopy[day][1]}</p>
    ${next ? `<div class="links">${action('지금 필요한 상세', 'event', next.id, 'primary', eventIcons[next.id])}</div>` : ''}
    <div class="day-highlights">${dayHighlights[day].map(([id, time, title]) => `<button type="button" data-action="event" data-id="${id}"><strong>${time}</strong><span>${title}</span>${icon('chevron')}</button>`).join('')}</div></section>`;
}

function notify(message) {
  clearTimeout(toastTimer);
  notice.textContent = message;
  notice.hidden = false;
  toastTimer = setTimeout(() => { notice.hidden = true; }, 3000);
}

function persist(next) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(next));
  } catch {
    notify('이 기기에 저장하지 못했어요. 브라우저 저장 설정을 확인해 주세요.');
    return false;
  }
  saved = next;
  render();
  return true;
}

function updateEvent(id, change) {
  return persist({ ...saved, events: { ...saved.events, [id]: { ...saved.events[id], ...change } } });
}

function currentEvent(id) {
  const base = events[id];
  const edits = saved.events[id] || {};
  const event = { ...base, ...edits };
  if (!base.candidates) delete event.selected;
  if (base.fixed) {
    Object.assign(event, { start: base.start, end: base.end, timeLabel: base.timeLabel, status: base.status });
  }
  if (base.booking || id === 'ryokan') event.status = base.status;
  if (base.candidates) {
    event.candidates = [...new Set([...base.candidates, ...(edits.added || [])])].filter(food => foods[food]);
    event.selected = event.candidates.includes(edits.selected) ? edits.selected : undefined;
    event.status = event.selected ? edits.mealStatuses?.[event.selected] || base.status : base.status;
    if (event.selected && id === 'lunch') event.title = `점심 · ${foods[event.selected].name}`;
    if (event.selected && id === 'shopping') event.title = `유후인 간식 · ${foods[event.selected].name}`;
  }
  if (event.end && event.end < event.start) Object.assign(event, { start: base.start, end: base.end, timeLabel: base.timeLabel });
  return event;
}

function titleBlock(label, title, description, symbol) {
  return `<div class="section-head${symbol ? ' section-banner' : ''}"><div><p class="eyebrow">${label}</p><h2>${title}</h2><p>${description}</p></div>${symbol ? `<div class="banner-mark">${icon(symbol)}</div>` : ''}</div>`;
}

function renderSchedule() {
  const info = days[day];
  const [warningEvent, warningTitle, warningText] = info.warning;
  const event = currentEvent(warningEvent);
  const warning = warningEvent === 'taxi-am' && event.status !== 'todo' ? [statuses[event.status], event.title] : [warningTitle, warningText];
  const allEvents = schedules[day].map(item => currentEvent(item.id)).sort((a, b) => a.start.localeCompare(b.start));
  const timeline = allEvents.filter(item => fullSchedule || !preparationSteps.has(item.id));
  return `<div class="days" aria-label="날짜 선택">${days.map((item, index) => `<button type="button" class="day-button" data-action="day" data-id="${index}" aria-pressed="${index === day}">${icon(dayIcons[index])}<span><strong>${item.short}</strong><small>${item.date}</small></span><span class="day-index">0${index + 1}</span></button>`).join('')}</div>
    <div id="journey-focus">${renderJourneyFocus()}</div>
    <div class="schedule-layout">
    <aside class="day-aside" aria-label="당일 참고">
      <button type="button" class="warning" data-action="event" data-id="${warningEvent}">${mark('clock')}<span><b>${escape(warning[0])}</b><small>${escape(warning[1])}</small></span>${icon('chevron')}</button>
      <div class="toolbar">
        ${day === 0 ? `${action('유후인 간식 고르기', 'event', 'shopping', '', 'coffee')}${action('체크인 먼저 대안', 'checkin-first', '', '', 'route')}` : day === 1 ? `${action('우동 점심 고르기', 'event', 'lunch', '', 'bowl')}${action('마코 지하철 경로', 'event', 'mako-transit', '', 'route')}` : `${action('공항 이동 대안', 'event', 'airport-return', '', 'route')}${action('예약·관련 메일', 'mailbox', '', '', 'mail')}`}
      </div>
    </aside>
    <section class="timeline-panel" aria-label="시간순 일정"><div class="list-heading"><strong>${escape(info.title)}</strong><button class="text-button" type="button" data-action="timeline-mode" aria-pressed="${fullSchedule}">${fullSchedule ? '핵심만 보기' : `이동·준비 포함 전체 ${allEvents.length}개`}</button></div>
    <ol class="timeline">${timeline.map(item => {
      const sub = item.selected ? `내 선택 · ${foods[item.selected].name}` : item.subtitle;
      return `<li><button class="event${item.fixed ? ' fixed-event' : ''}${item.status === 'option' ? ' optional-event' : ''}" type="button" data-action="event" data-id="${item.id}">
        <span class="time">${escape(item.start)}${item.timeLabel ? `<small>${escape(item.timeLabel.replace(`${item.start} `, ''))}</small>` : item.end ? `<small>${item.id === 'dinner' ? '~' : '–'} ${item.end}${item.id === 'dinner' ? ' 예상' : ''}</small>` : ''}</span>
        ${mark(eventIcons[item.id])}
        <span><strong>${escape(item.title)}</strong>${sub ? `<span class="meta">${escape(sub)}</span>` : ''}<span class="chips">${item.status !== 'plan' ? badge(statuses[item.status], item.status) : ''}${item.deadline ? badge(item.deadline, 'deadline') : ''}${item.candidates ? badge(item.selected ? '내 선택 있음' : `${item.candidates.length}곳 비교 · 미선택`, 'pending') : ''}</span></span>
        ${icon('chevron')}</button></li>`;
    }).join('')}</ol></section></div>`;
}

function renderFood() {
  const listings = foodListings();
  return `${titleBlock('FOOD & LITTLE TREATS', '오늘은 뭘 먹을까', '예약 식당부터 우동 점심, 유후인 간식까지.', 'food')}
    ${renderFoodDecisions()}
    <div class="scope-tabs" aria-label="맛집 목록 범위">${[['trip', '이번 여행'], ['all', '조사한 모든 곳']].map(([id, label]) => `<button type="button" data-action="food-scope" data-id="${id}" aria-pressed="${foodScope === id}">${label}</button>`).join('')}</div>
    <label class="search-field">${icon('pin')}<span class="sr-only">식당·메뉴 검색</span><input type="search" id="food-search" placeholder="식당 이름, 우동, 명란…" value="${escape(foodQuery)}" autocomplete="off"></label>
    <details class="food-filters"${area || genre || awardOnly ? ' open' : ''}><summary>지역·메뉴·백명점 필터${area || genre || awardOnly ? ' · 적용 중' : ''}</summary><div class="food-toolbar"><div class="toolbar" aria-label="지역 필터">${Object.entries({ '': '전체 지역', ...areas }).map(([id, label]) => `<button type="button" class="filter" data-action="area" data-id="${id}" aria-pressed="${area === id}">${label}</button>`).join('')}</div>
      <button type="button" class="filter award-filter" data-action="awards" aria-pressed="${awardOnly}">${icon('sparkle')}백명점만</button></div>
    <div class="menu-toolbar" role="group" aria-label="메뉴 종류"><button type="button" class="filter" data-action="genre" data-id="" aria-pressed="${!genre}">전체 메뉴</button>${Object.entries(foodGenres).filter(([, group]) => group.ids.some(id => foodScope === 'all' || tripFoodIds.includes(id))).map(([id, group]) => `<button type="button" class="filter" data-action="genre" data-id="${id}" aria-pressed="${genre === id}">${escape(group.label)} <span>${group.ids.filter(id => foodScope === 'all' || tripFoodIds.includes(id)).length}</span></button>`).join('')}</div>
    <p class="meta food-research-note">${foodScope === 'trip' ? '동선에 맞는 12곳을 먼저 모았어요. 더 많은 대안은 「조사한 모든 곳」에서 볼 수 있어요.' : '비교용 자료도 포함해요. 타이라·하가쿠레는 일요일 휴무이며 이번 여행 기본 후보에서 제외했어요.'}</p></details>
    <div id="food-results" aria-live="polite">${renderFoodResults(listings)}</div>`;
}

function foodListings() {
  const query = foodQuery.trim().toLocaleLowerCase('ko-KR');
  return Object.entries(foods).filter(([id, food]) => food.area && (foodScope === 'all' || tripFoodIds.includes(id)) && (!area || food.area === area) && (!awardOnly || food.award) && (!genre || foodGenres[genre].ids.includes(id)) && (!query || `${food.name} ${food.menu} ${food.jp || ''}`.toLocaleLowerCase('ko-KR').includes(query)))
    .sort(([a], [b]) => (tripFoodIds.indexOf(a) < 0 ? 99 : tripFoodIds.indexOf(a)) - (tripFoodIds.indexOf(b) < 0 ? 99 : tripFoodIds.indexOf(b)));
}

function renderFoodResults(listings) {
  return `<div class="list-heading"><strong>${area ? areas[area] : foodScope === 'trip' ? '이번 여행에서' : '전체 조사'}</strong><span>${listings.length}곳</span></div>
    ${listings.length ? `<ul class="food-grid">${listings.map(([id, food]) => {
      const photo = photos[food.photo];
      return `<li><button type="button" class="food-card" data-action="food" data-id="${id}">
      ${photo ? `<span class="food-thumb"><img src="./${photo.file}" width="80" height="92" alt="" loading="lazy" decoding="async"><small>${photo.source ? '매장 사진' : '메뉴 예시'}</small></span>` : mark(foodIcons[id] || 'food')}<span><span class="food-area">${escape(areas[food.area])}${id === 'mako' ? ' · 18:00 예약' : id === 'sofuren' ? ' · 야식 저장' : ''}</span><strong>${escape(food.name)}</strong><span class="meta">${escape(food.menu)}</span>
      <span class="chips">${food.rating ? badge(`타베로그 ${food.rating.toFixed(2)}`, 'rating') : ''}${food.award ? badge(`백명점 · ${food.award[0]}`, 'award') : ''}${['taira', 'hagakure'].includes(id) ? badge('일요일 휴무', 'todo') : ''}</span></span>${icon('chevron')}</button></li>`;
    }).join('')}</ul>` : `<div class="empty">${mark('pin')}<div><p>조건에 맞는 식당이 없어요.</p>${action('필터 초기화', 'food-reset', '')}</div></div>`}`;
}

function renderFoodDecisions() {
  const undecided = foodDecisions.filter(item => item.status === 'todo' && !currentEvent(item.event).selected).length;
  return `<section class="food-decisions" aria-label="식사 선택 현황"><div class="list-heading"><strong>먹거리 계획</strong><span>${undecided}가지 선택 중 · 야식은 선택 방문</span></div>
    <div class="decision-grid">${foodDecisions.map(item => { const selected = currentEvent(item.event).selected; return `<button type="button" class="decision-card" data-action="event" data-id="${item.event}"><span class="chips">${badge(selected ? '내 기기에서 선택' : item.label, selected ? 'plan' : item.status)}</span><strong>${escape(selected ? foods[selected].name : item.title)}</strong><small>${escape(selected ? '식당을 골랐어요. 실제 예약·대기는 별도 확인해요.' : item.note)}</small><span class="decision-open">일정·후보 보기 ${icon('chevron')}</span></button>`; }).join('')}</div></section>`;
}

function renderMaps() {
  const localPlaces = mealEvents.map(item => currentEvent(item.id)).filter(item => item.selected && foods[item.selected].jp).map(item => ({ name: foods[item.selected].name, kind: '내 기기 선택', status: 'plan', label: '내 선택 · 예약 별도', event: item.id, place: foods[item.selected].jp, mode: 'walking', icon: foodIcons[item.selected] || 'food', when: `${days[item.day].date} ${item.start}`, note: '이 기기에서 고른 식당이에요. 다른 휴대폰의 선택과 자동으로 합쳐지지는 않아요.' }));
  const places = [...savedPlaces, ...localPlaces.filter(item => !savedPlaces.some(place => place.place === item.place))];
  return `${titleBlock('05 / SAVED PLACES', '우리 여행 장소', '숙소와 선택한 식당, 하카타 크리스마스마켓을 한곳에 모았어요.', 'pin')}
    <div class="map-note"><span>${icon('pin')}</span><p>두 분이 함께 보는 앱의 장소 목록이에요. Google Maps 계정에도 저장하려면 <strong>장소 열기 → 저장</strong>을 눌러 원하는 목록에 담아주세요.</p></div>
    <section class="map-route"><p class="eyebrow">SUNDAY · CHRISTMAS MARKET</p><h3>하카타역 광장을 중심으로</h3><p>우동 점심 → 포르자 휴식 → 마켓 → 마코 18:00 → 소후렌은 선택 → 마켓 야경</p><div class="rail-line" aria-label="마코행 지하철"><span><b>N18</b>하카타</span><span class="rail-direction">나나쿠마선 · 하시모토 방면<small>환승 없이 5정거장 · 약 8~9분</small></span><span><b>N13</b>야쿠인오도리</span></div><p class="meta">17:05 마켓 출발 · 1번 출구 → 도보 약 3분 → 마코 2층</p><div class="links">${action('마코 가는 길 자세히', 'event', 'mako-transit', '', 'route')}${action('마코 뒤 야식 동선', 'event', 'mako-return', '', 'route')}</div></section>
    <div class="list-heading"><strong>바로 찾아갈 장소</strong><span>공통 ${savedPlaces.length}곳${localPlaces.length ? ' + 내 선택' : ''}</span></div>
    <div class="place-grid">${places.map(item => `<article class="place-card"><div class="place-heading">${mark(item.icon)}<div><span class="food-area">${escape(item.kind)} · ${escape(item.when)}</span><h3>${escape(item.name)}</h3></div></div><div class="chips">${badge(item.label, item.status)}</div><p>${escape(item.note)}</p><p class="meta place-address" lang="ja">${escape(item.place)}</p>${destinationActions(item.place, '', item.mode)}<div class="links">${mapLink(item.place, 'Google Maps에서 저장')}${action('일정 상세', 'event', item.event, '', 'calendar')}</div></article>`).join('')}</div>
    ${renderFoodDecisions()}`;
}

function renderTasks() {
  const group = done => tasks.filter(task => Boolean(saved.tasks[task.id]) === done).map(task => `<li><button type="button" class="task-card${done ? ' is-done' : ''}" data-action="task" data-id="${task.id}">
      <span class="task-check" aria-hidden="true">${done ? icon('check') : ''}</span><span><span class="food-area">${days[events[task.event].day].date}</span><strong class="${done ? 'done' : ''}">${escape(task.title)}</strong><span class="meta">${escape(task.info)}</span>${!done && task.priority ? badge('우선 확인', 'deadline') : ''}</span>${icon('chevron')}</button></li>`).join('');
  const open = group(false);
  const complete = group(true);
  const doneCount = tasks.filter(task => saved.tasks[task.id]).length;
  return `${titleBlock('03 / BEFORE YOU GO', '출발 전 할 일', '예약·회신·운영시간을 차례로 확인해요.', 'checklist')}
    <section class="progress-card" aria-label="준비 진행 상황"><div class="progress-header"><strong>여행 준비</strong><span><b>${doneCount}</b> / ${tasks.length} 완료</span></div><progress value="${doneCount}" max="${tasks.length}" aria-label="완료한 할 일"></progress></section>
    <div class="list-heading"><strong>남은 할 일</strong><span>${tasks.length - doneCount}개</span></div>
    ${open ? `<ul class="tasks">${open}</ul>` : `<div class="empty">${mark('check')}<p>남은 할 일이 없어요.</p></div>`}
    ${complete ? `<div class="list-heading complete-heading"><strong>완료</strong><span>${doneCount}개</span></div><ul class="tasks">${complete}</ul>` : ''}`;
}

function mailCards(list, fromEvent = '') {
  return `<ul class="mail-list">${list.map(mail => `<li><button type="button" class="mail-card" data-action="mail" data-id="${mail.id}|${escape(fromEvent)}">
    ${mark(mail.icon)}<span><span class="food-area">${escape(mail.source)} · ${escape(mail.date)}</span><strong>${escape(mail.title)}</strong><span class="meta">${escape(mail.summary)}</span><span class="chips">${badge(mail.label, mail.status)}</span></span>${icon('chevron')}
  </button></li>`).join('')}</ul>`;
}

function renderMails() {
  return `${titleBlock('04 / RESERVATIONS & MAIL', '예약과 여행 메일', '확정서와 숙소 답장을 일정별로 모았어요.', 'mail')}
    <div class="mail-note"><span>${icon('mail')}</span><p>마지막 갱신 <strong>${mailChecked}</strong>. 각 항목에 확인일과 출처를 표시했어요. 「메일 원문 대기」는 예약자 확인 기준이며, 원문·첨부파일은 예약한 Gmail 계정에서 열어주세요.</p></div>
    <div class="list-heading"><strong>관련 메일</strong><span>${travelMails.length}개 묶음</span></div>
    ${mailCards(travelMails)}`;
}

function bookingDetails() {
  return `<section class="detail-section booking-summary"><h3>${icon('hotel')}확정된 숙박 예약</h3>
    <p class="booking-name">${escape(hotelBooking.english)}</p>
    <dl class="booking-facts">${[['숙박', hotelBooking.stay], ['객실', hotelBooking.room], ['체크인', hotelBooking.checkin], ['체크아웃', hotelBooking.checkout], ['결제', hotelBooking.payment], ['현지 납부', hotelBooking.cityTax], ['취소', hotelBooking.cancellation], ['조식', hotelBooking.breakfast]].map(([label, value]) => `<div><dt>${label}</dt><dd>${escape(value)}</dd></div>`).join('')}</dl>
    <p class="meta">${escape(hotelBooking.paymentNote)}</p><p class="meta">${escape(hotelBooking.verified)}</p></section>`;
}

function showMail(id, fromEvent) {
  recordDetail('mail', id, fromEvent);
  const mail = travelMails.find(item => item.id === id);
  showDetail(`${fromEvent ? action('‹ 일정 상세', 'event', fromEvent) : ''}
    ${detailHeading(`${mail.source} · ${mail.date}`, mail.title, 'mail')}
    <div class="chips">${badge(mail.label, mail.status)}${badge('Gmail 원문 확인')}</div><p class="detail-summary">${escape(mail.summary)}</p>
    <section class="detail-section"><h3>${icon('checklist')}메일 핵심 내용</h3><ul class="mail-notes">${mail.notes.map(note => `<li>${escape(note)}</li>`).join('')}</ul></section>
    <section class="detail-section"><h3>${icon('mail')}원문·첨부파일</h3><p>예약한 Gmail 계정에서 메일을 찾아 열어요. 예약번호와 승차권은 원문에서 확인해 주세요.</p><div class="links">${link('Gmail에서 원문·첨부 열기', gmailSearch(mail.query))}</div></section>
    <section class="detail-section"><h3>${icon('calendar')}연결된 일정</h3><div class="links">${mail.events.map(eventId => action(events[eventId].title, 'event', eventId, '', eventIcons[eventId])).join('')}</div></section>`);
}

function render() {
  shell.dataset.tab = tab;
  document.title = `${({ schedule: days[day].date + ' 일정', maps: '우리 여행 장소', food: '맛집과 간식', mail: '예약·메일', tasks: '출발 전 할 일' })[tab]} · 규슈 여행 노트`;
  document.querySelector('#task-count').textContent = tasks.filter(task => !saved.tasks[task.id]).length;
  for (const button of document.querySelectorAll('[data-tab]')) {
    if (button.dataset.tab === tab) button.setAttribute('aria-current', 'page');
    else button.removeAttribute('aria-current');
  }
  view.innerHTML = tab === 'schedule' ? renderSchedule() : tab === 'maps' ? renderMaps() : tab === 'food' ? renderFood() : tab === 'mail' ? renderMails() : renderTasks();
}

function detailHeading(label, title, symbol) {
  return `<div class="detail-title-row">${mark(symbol)}<div><p class="eyebrow">${label}</p><h2 id="detail-title">${escape(title)}</h2></div></div>`;
}

function detailPhoto(photo) {
  return `<figure class="detail-cover"><img src="./${photo.file}" alt="" decoding="async">
    <figcaption><span>${escape(photo.caption)}</span>${photo.source ? `<span class="photo-credit"><a href="${photo.source}" target="_blank" rel="noopener noreferrer">${escape(photo.author)}</a>${photo.license ? ` · <a href="${photo.licenseUrl}" target="_blank" rel="noopener noreferrer">${photo.license}</a> · 크기 조정` : ''}</span>` : ''}</figcaption></figure>`;
}

function fold(title, content) {
  return `<details class="detail-section fold"><summary>${escape(title)}</summary><div>${content}</div></details>`;
}

function destinationActions(destination, origin, mode = 'walking') {
  if (!destination) return '';
  return `<div class="destination-actions">${link('현재 위치에서 길찾기', `https://www.google.com/maps/dir/?${new URLSearchParams({ api: '1', destination, travelmode: mode })}`)}${action('일본어 주소 복사', 'copy', destination, '', 'pin')}${origin ? directionsLink(origin, destination, mode, '계획 경로 보기') : ''}</div>`;
}

function phoneLink(number, label) {
  return `<a class="button" href="tel:+81${number.replace(/\D/g, '').slice(1)}">${icon('phone')}${escape(label)} ${escape(number)}</a>`;
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    notify('복사했어요. 지도나 메시지에 붙여넣을 수 있어요.');
  } catch {
    showDetail(`${detailHeading('COPY', '길게 눌러 복사', 'pin')}<label>복사할 내용<textarea readonly id="copy-value">${escape(text)}</textarea></label>`);
    detail.querySelector('#copy-value').select();
  }
}

function criticalGuide(id) {
  if (['dinner', 'mako-transit', 'mako-ready'].includes(id)) return `<section class="critical-guide"><strong>18:00 예약 · 17:45~17:50 도착 목표</strong><ol><li><b>17:05</b> 하카타역 마켓 출발 <small>호텔 직행이면 17:15 출발</small></li><li><b>나나쿠마선 · 하시모토 방면</b> 하카타 N18 → 야쿠인오도리 N13 <small>환승 없이 5정거장 · 약 8~9분 · 1인 ¥260</small></li><li><b>야쿠인오도리역 1번 출구</b> 도보 약 3분 · 건물 2층 <small>야쿠인역보다 한 정거장 더 가요.</small></li></ol>${phoneLink('092-214-7053', '마코 전화')}</section>`;
  if (['collect', 'ryokan-ride', 'ryokan'].includes(id)) return `<section class="critical-guide"><strong>17:00~17:10 도착 목표 · 체크인 17:30 마감</strong><ol><li><b>16:40</b> 관광안내센터에서 짐 찾기</li><li><b>역 공중전화</b> 짐을 찾고 료칸 픽업 요청 <small>접수 17:00까지 · 일본 동전 준비</small></li><li><b>연결·픽업이 안 되면 택시</b> 기다리느라 체크인에 늦지 않게 이동</li></ol>${phoneLink('0977-84-5565', '료칸 전화')}</section>`;
  if (['market-before', 'market'].includes(id)) return `<section class="critical-guide"><strong>우리 여행의 메인 · 하카타역 서쪽 광장</strong><p>일요일 12:00~23:00 · 마지막 주문 22:45 · 입장 무료<br>외부 음식·음료 반입 불가. 밤 구경은 식사 후 다시 와요.</p>${action('17:05 마코로 가는 길', 'event', 'mako-transit', '', 'route')}</section>`;
  if (id === 'night-food') return `<section class="critical-guide"><strong>20:55 도착 목표 · 야식은 선택</strong><p>공식 마감 21:30. 마지막 주문 시각은 미공개예요. 마코가 늦어지거나 배부르면 생략하고 마켓으로 가요.</p>${action('야식 생략 → 밤 마켓', 'event', 'market', '', 'sparkle')}</section>`;
  return '';
}

function guideDetails(id, guide) {
  return `${guide.food ? `<section class="detail-section"><h3>${icon('coffee')}돌아오는 길에 먹을 것</h3>
    <ul class="guide-list">${guide.food.map((foodId, index) => {
      const food = foods[foodId];
      return `<li><button class="guide-card" type="button" data-action="candidate" data-id="${id}|${foodId}">
        <span class="guide-number">${String(index + 1).padStart(2, '0')}</span><span><strong>${escape(food.name)}</strong><small>${escape(food.menu)} · ${escape(food.hours)}</small></span>${icon('chevron')}
      </button></li>`;
    }).join('')}</ul></section>` : ''}
    ${guide.stores ? `<section class="detail-section"><h3>${icon('shop')}체크인 전에 들를 곳</h3><ul class="guide-list">${guide.stores.map(store => `<li class="store-card">
      <strong>${escape(store.name)}</strong><span class="meta">${escape(store.meta)}</span><p>${escape(store.note)}</p>
      <div class="links">${directionsLink(store.origin, store.place, 'walking', '역에서 길찾기')}${store.fromRyokan ? directionsLink(store.fromRyokan, store.place, 'walking', '료칸에서 길찾기') : ''}${link('매장 정보', store.url)}</div></li>`).join('')}</ul></section>` : ''}`;
}

function mealCandidates(event, guide) {
  const ordered = event.selected ? [event.selected, ...event.candidates.filter(id => id !== event.selected)] : event.candidates;
  return `<section class="detail-section"><h3>식사 후보 ${event.selected ? action('선택 해제', 'unchoose', event.id) : badge('아직 미선택', 'pending')}</h3><p class="meta">선택은 이 기기에만 저장돼요. 예약은 각 식당에서 별도로 진행해요.</p><div class="candidates">${ordered.map((id, index) => {
    const food = foods[id];
    const photo = photos[food.photo];
    const hint = guide.hints?.[id];
    const facts = [food.rating && `타베로그 ${food.rating.toFixed(2)}`, food.award && '백명점'].filter(Boolean).join(' · ');
    const choice = `${event.id}|${id}`;
    return `<div class="candidate">
      <button type="button" class="button candidate-choice" data-action="candidate" data-id="${escape(choice)}">
        ${photo ? `<img src="./${photo.file}" alt="" width="54" height="54" decoding="async">` : mark(foodIcons[id] || 'food')}
        <span><strong>${escape(`${id === event.selected ? '내 선택 · ' : ''}${food.name}`)}</strong>${facts ? `<small>${escape(facts)}</small>` : ''}${hint ? `<small>${escape(hint)}</small>` : ''}</span>
        ${icon('chevron')}
      </button>
    </div>`;
  }).join('')}</div></section>`;
}

function showDetail(html) {
  detail.innerHTML = html;
  if (!dialog.open) dialog.showModal();
  dialog.scrollTop = 0;
  dialog.querySelector('.close').focus({ preventScroll: true });
}

function showEvent(id, backTask) {
  day = events[id].day;
  recordDetail('event', id, backTask);
  const event = currentEvent(id);
  const task = tasks.find(item => item.event === id);
  const guide = guides[id] || {};
  const destination = event.place || foods[event.selected]?.jp;
  const sources = [...(event.links || []), ...(guide.links || [])];
  const editing = `<details class="detail-section edit-section"><summary>${icon('edit')}일정 수정</summary>
    <form class="edit-grid" id="edit-event" data-id="${id}" data-back-task="${escape(backTask)}">
      ${event.fixed ? `<p class="wide">예약된 ${event.food ? '식사의 시작 시간과 상태가 고정되어 있어요. 종료는 매장 이용 시간에 따른 예상입니다.' : '교통편의 시간과 상태가 고정되어 있어요.'}</p>` : `<label>시작<input name="start" type="time" value="${event.start}" required></label><label>종료<input name="end" type="time" value="${event.end || ''}"></label>
      ${event.booking || id === 'ryokan' ? '<p class="wide meta">예약 확정서 기준 숙소예요. 방문 시간과 내 메모를 수정할 수 있어요.</p>' : event.candidates && !event.selected ? '<p class="wide meta">식당을 먼저 고르면 그 식당의 예약 상태도 기록할 수 있어요.</p>' : `<label class="wide">${event.selected ? '현재 선택한 식당의 상태' : '상태'}<select name="status">${Object.entries(statuses).map(([key, label]) => `<option value="${key}"${event.status === key ? ' selected' : ''}>${label}</option>`).join('')}</select></label>`}`}
      <label class="wide">내 메모<textarea name="note" maxlength="600" placeholder="예약 정보나 바뀐 내용을 적어두세요.">${escape(event.note)}</textarea></label>
      <button class="button primary" type="submit">저장</button>
    </form></details>`;
  const cover = photos[foods[event.selected]?.photo] || (id === 'lunch' ? { ...photos['food-daichi'], caption: `점심 후보 · ${photos['food-daichi'].caption}` } : eventPhotos[id]) || photos.yufuin;
  showDetail(`${detailPhoto(cover)}
    ${backTask ? action('‹ 할 일', 'task', backTask) : ''}
    ${detailHeading(`${days[event.day].date} · ${escape(timeText(event))}`, event.title, eventIcons[id])}
    <div class="chips">${badge(statuses[event.status], event.status)}${event.deadline ? badge(event.deadline, 'deadline') : ''}</div>
    ${event.subtitle ? `<p class="detail-summary">${escape(event.subtitle)}</p>` : ''}
    ${destinationActions(destination, guide.origin, guide.mode)}
    ${criticalGuide(id)}
    ${event.candidates ? mealCandidates(event, guide) : ''}
    ${event.booking ? fold('객실·결제·취소 조건', bookingDetails()) : ''}
    ${destination || guide.directions ? `<section class="detail-section"><h3>${icon('pin')}장소·가는 법</h3>
      ${guide.directions ? (criticalGuide(id) ? fold('이동 설명 전체 보기', `<p>${escape(guide.directions)}</p>`) : `<p>${escape(guide.directions)}</p>`) : ''}${destination ? `<p class="meta">${escape(destination)}</p>` : ''}
      <div class="links">${destination ? mapLink(destination, '장소·사진 열기') : ''}${event.food ? action('식당 메뉴·사진', 'food', event.food, '', 'food') : ''}</div></section>` : ''}
    ${guideDetails(id, { ...guide, food: event.candidates ? undefined : guide.food })}
    ${event.detail ? fold('현장 참고·확인 근거', `<p>${escape(event.detail)}</p>`) : ''}
    ${event.fallback ? `<section class="detail-section fallback"><h3>${icon('route')}${escape(event.fallback[0])}</h3><p>${escape(event.fallback[1])}</p></section>` : ''}
    ${sources.length ? fold('공식 안내·참고 링크', `<div class="links">${sources.map(([label, url]) => link(label, url)).join('')}</div>`) : ''}
    ${travelMails.some(mail => mail.events.includes(id)) ? fold('예약·관련 메일', mailCards(travelMails.filter(mail => mail.events.includes(id)), id)) : ''}
    ${guide.related || event.area ? `<section class="detail-section"><h3>${icon('route')}함께 보기</h3><div class="links">${(guide.related || []).map(related => action(events[related].title, 'event', related, '', eventIcons[related])).join('')}${event.area ? action('주변 맛집·백명점', 'nearby', event.area, '', 'pin') : ''}</div></section>` : ''}
    ${event.note ? `<section class="detail-section"><h3>내 메모</h3><p>${escape(event.note)}</p></section>` : ''}
    ${task && !backTask ? `<section class="detail-section"><h3>연결된 할 일</h3>${action(`${saved.tasks[task.id] ? '✓ ' : ''}${task.title}`, 'task', task.id)}</section>` : ''}
    ${editing}`);
}

function showFood(id, fromEvent) {
  recordDetail('food', id, fromEvent);
  const food = foods[id];
  const placesToAdd = mealEvents.filter(event => food.meals?.includes(event.meal) && !['taira', 'hagakure'].includes(id) && !currentEvent(event.id).candidates.includes(id));
  showDetail(`${food.photo ? detailPhoto(photos[food.photo]) : ''}${fromEvent ? action(events[fromEvent].meal ? '‹ 식사 후보' : '‹ 일정 상세', 'event', fromEvent) : ''}
    ${detailHeading(food.area ? areas[food.area] : '식사 대안', food.name, foodIcons[id] || 'food')}
    <div class="chips">${food.award ? badge(`백명점 · ${food.award[0]}`, 'award') : ''}${food.hours ? badge(food.hours) : ''}${food.wish ? badge('가고 싶은 곳', 'pending') : ''}</div>
    <p>${escape(food.menu)}</p>${food.jp ? `<p class="meta">${escape(food.jp)}</p>` : ''}
    ${destinationActions(food.jp)}
    ${fromEvent && currentEvent(fromEvent).candidates?.includes(id) ? `<div class="choice-bar">${action(currentEvent(fromEvent).selected === id ? '이 기기에서 선택한 곳' : '이 식당으로 선택', 'choose', `${fromEvent}|${id}`, 'primary', 'check')}<small>예약은 별도 · 이 기기에 저장</small></div>` : ''}
    ${food.rating ? `<section class="detail-section food-evidence"><h3>${icon('sparkle')}평가와 방문 판단</h3><div class="food-score"><strong>${food.rating.toFixed(2)}</strong><span>타베로그 · 후기 ${food.reviewCount.toLocaleString('ko-KR')}명<small>${escape(food.checked)} 확인 · 조회 시점</small></span></div>
      <p>${escape(food.reviewNote)}</p><p><strong>1인 예산</strong> · ${escape(food.budget)}</p><p><strong>우리 동선에서는</strong> · ${escape(food.route)}</p>
      <div class="links">${link('일본어 후기 원문', `${food.tabelog}dtlrvwlst/`)}${(food.evidenceLinks || []).map(([label, url]) => link(label, url)).join('')}</div></section>` : ''}
    <section class="detail-section"><h3>영업·방문 참고</h3><p>${escape(food.info)}</p>${food.checked ? `<p class="meta">출처 확인 ${food.checked} · 방문일 임시휴무 및 잔여석 별도 확인</p>` : ''}
    <div class="links">${food.jp ? mapLink(food.jp) : ''}${food.tabelog ? `${link('타베로그', food.tabelog)}${link('매장·음식 사진', `${food.tabelog}dtlphotolst/`)}` : ''}${food.official ? link('매장·영업 정보', food.official) : ''}${food.booking ? link('예약 안내', food.booking) : ''}${food.award ? link('백명점 원문', food.award[1]) : ''}</div></section>
    ${!fromEvent && placesToAdd.length ? `<section class="detail-section"><h3>예비 후보로 담기</h3><div class="links">${placesToAdd.map(event => action(`${days[event.day].date} ${event.title}`, 'add', `${event.id}|${id}`)).join('')}</div></section>` : ''}`);
}

function showTask(id) {
  recordDetail('task', id);
  const task = tasks.find(item => item.id === id);
  const event = currentEvent(task.event);
  const done = Boolean(saved.tasks[id]);
  showDetail(`${detailHeading(`${days[event.day].date} · 할 일`, task.title, 'checklist')}
    <p>${escape(task.info)}</p><div class="chips">${badge(done ? '완료' : '할 일', done ? 'confirmed' : 'todo')}${badge(statuses[event.status], event.status)}</div>
    <section class="detail-section"><h3>연결된 일정</h3><div class="links">${action('일정 상세·예약 상태 수정', 'task-event', id)}${action(done ? '다시 할 일로' : '완료로 표시', 'toggle-task', id, 'primary')}</div></section>`);
}

function showAppHelp() {
  showDetail(`${detailHeading('ON YOUR PHONE', '우리 여행표 사용법', 'mountain')}
    <section class="critical-guide"><strong>홈 화면에 두고 앱처럼 열어요</strong><p>아이폰: Safari에서 열기 → 공유 → 홈 화면에 추가<br>안드로이드: Chrome에서 열기 → 메뉴 → 앱 설치 또는 홈 화면에 추가</p>${installPrompt ? action('이 휴대폰에 설치', 'install', '', 'primary') : ''}</section>
    <section class="detail-section"><h3>두 휴대폰에서 보는 내용</h3><p>공통 일정·예약·장소는 같은 링크로 열면 같아요. 식당 선택, 개인 메모, 할 일 체크는 지금 쓰는 기기와 브라우저에만 저장됩니다. 다른 기기나 다른 주소로 열면 자동으로 합쳐지지 않아요.</p></section>
    <section class="detail-section"><h3>인터넷이 없을 때</h3><p>한 번 열어 「오프라인 열람 준비 완료」가 표시되면 일정·사진·일본어 주소를 다시 볼 수 있어요. Google Maps 길찾기, 예약 사이트와 Gmail 원문에는 인터넷이 필요합니다.</p></section>
    <section class="detail-section"><h3>메일과 Google Maps</h3><p>예약 탭은 확인한 메일의 요약이에요. Gmail 새 메일을 자동으로 가져오지는 않으며, 원문 버튼은 각자 로그인한 계정에서 검색합니다. 지도 저장 버튼을 누른 뒤 Google Maps의 「저장」을 눌러 주세요.</p></section>
    <p class="meta">공유 버튼은 현재 화면의 링크를 보내요. 개인 메모와 기기에서 고른 식당은 링크에 포함하지 않아요.</p>`);
}

document.addEventListener('click', event => {
  if (event.target.closest('.skip-link')) { event.preventDefault(); view.focus(); view.scrollIntoView({ block: 'start' }); return; }
  const button = event.target.closest('button[data-action], button[data-tab]');
  if (!button) return;
  const { action: name, id, tab: nextTab } = button.dataset;
  if (nextTab) {
    tab = nextTab;
    routeDetail = undefined;
    syncRoute();
    render();
    window.scrollTo(0, 0);
    return;
  }
  switch (name) {
    case 'app-help': showAppHelp(); break;
    case 'install': if (installPrompt) { installPrompt.prompt(); installPrompt = undefined; } break;
    case 'refresh': window.location.reload(); break;
    case 'share': shareView(); break;
    case 'copy': copyText(id); break;
    case 'food-scope': foodScope = id; render(); view.querySelector(`[data-action=food-scope][data-id=${id}]`).focus({ preventScroll: true }); break;
    case 'food-reset': foodQuery = ''; area = ''; genre = ''; awardOnly = false; render(); view.querySelector('#food-search').focus(); break;
    case 'timeline-mode': fullSchedule = !fullSchedule; render(); view.querySelector('[data-action=timeline-mode]').focus({ preventScroll: true }); break;
    case 'day': {
      const scrolledPastHeader = view.getBoundingClientRect().top < 0;
      day = Number(id);
      routeDetail = undefined;
      render();
      view.querySelector('.day-button[aria-pressed=true]').focus({ preventScroll: true });
      if (scrolledPastHeader) view.scrollIntoView({ block: 'start' });
      break;
    }
    case 'area': area = id; render(); view.querySelector('.filter[data-action=area][aria-pressed=true]').focus(); break;
    case 'genre': genre = id; render(); view.querySelector('.filter[data-action=genre][aria-pressed=true]').focus({ preventScroll: true }); break;
    case 'awards': awardOnly = !awardOnly; render(); view.querySelector('.award-filter').focus(); break;
    case 'nearby':
      tab = 'food'; area = id; awardOnly = false; genre = ''; foodQuery = ''; foodScope = 'all';
      routeDetail = undefined;
      if (dialog.open) dialog.close();
      render(); window.scrollTo(0, 0); break;
    case 'event': showEvent(id); break;
    case 'mail': { const [mailId, fromEvent] = id.split('|'); showMail(mailId, fromEvent); break; }
    case 'mailbox':
      tab = 'mail'; routeDetail = undefined; if (dialog.open) dialog.close(); render(); window.scrollTo(0, 0); break;
    case 'maps':
      tab = 'maps'; routeDetail = undefined; if (dialog.open) dialog.close(); render(); window.scrollTo(0, 0); break;
    case 'food': showFood(id); break;
    case 'task': showTask(id); break;
    case 'task-event': showEvent(tasks.find(task => task.id === id).event, id); break;
    case 'toggle-task':
      if (persist({ ...saved, tasks: { ...saved.tasks, [id]: !saved.tasks[id] } })) showTask(id);
      break;
    case 'candidate': {
      const [eventId, foodId] = id.split('|');
      showFood(foodId, eventId);
      break;
    }
    case 'choose': {
      const [eventId, foodId] = id.split('|');
      if (updateEvent(eventId, { selected: foodId })) showEvent(eventId);
      break;
    }
    case 'unchoose': if (updateEvent(id, { selected: undefined })) showEvent(id); break;
    case 'add': {
      const [eventId, foodId] = id.split('|');
      const added = [...(saved.events[eventId]?.added || []), foodId];
      if (updateEvent(eventId, { added })) {
        dialog.close();
        notify(`${days[events[eventId].day].date} ${events[eventId].title} 후보에 담았어요.`);
      }
      break;
    }
    case 'checkin-first':
      showDetail(`${detailPhoto(photos.station)}${detailHeading('DAY 01 · 대안', '체크인을 먼저 할 때', 'route')}<p>짐을 먼저 맡기는 흐름입니다. 숙소와 카페 사이는 택시를 기준으로 잡았어요.</p><ol class="timeline alternate-timeline">${checkinFirst.map(([time, title, info]) => `<li class="event"><span class="time">${time}</span><span><strong>${title}</strong><span class="meta">${info}</span></span></li>`).join('')}</ol>`);
      break;
  }
  syncRoute();
});

dialog.addEventListener('close', () => {
  if (dialog.open || routeApplying) return;
  routeDetail = undefined;
  window.history.replaceState(null, '', routeHash());
  const trigger = dialogTrigger?.isConnected ? dialogTrigger : dialogTriggerInfo ? [...document.querySelectorAll('button[data-action],button[data-tab]')].find(button => button.dataset.action === dialogTriggerInfo.action && button.dataset.id === dialogTriggerInfo.id && button.dataset.tab === dialogTriggerInfo.tab) : undefined;
  (trigger || view).focus({ preventScroll: true });
});
window.addEventListener('hashchange', restoreRoute);

view.addEventListener('input', event => {
  if (event.target.id !== 'food-search') return;
  foodQuery = event.target.value;
  view.querySelector('#food-results').innerHTML = renderFoodResults(foodListings());
});

detail.addEventListener('submit', event => {
  if (event.target.id !== 'edit-event') return;
  event.preventDefault();
  const { id, backTask } = event.target.dataset;
  const original = currentEvent(id);
  const form = new FormData(event.target);
  const change = { note: form.get('note').trim() };
  if (!original.fixed) {
    const start = form.get('start');
    const end = form.get('end');
    if (end && end < start) {
      const endInput = event.target.elements.end;
      endInput.setCustomValidity('종료 시간을 시작 시간 이후로 입력해 주세요.');
      endInput.reportValidity();
      endInput.addEventListener('input', () => endInput.setCustomValidity(''), { once: true });
      event.target.elements.start.addEventListener('input', () => endInput.setCustomValidity(''), { once: true });
      return;
    }
    const status = form.get('status');
    Object.assign(change, { start, end });
    if (start !== original.start || end !== (original.end || '') || (id === 'sukiyaki' && status === 'confirmed')) change.timeLabel = '';
    if (original.selected) change.mealStatuses = { ...saved.events[id]?.mealStatuses, [original.selected]: status };
    else if (!original.booking && !original.candidates && statuses[status]) change.status = status;
  }
  if (updateEvent(id, change)) showEvent(id, backTask);
});

function showNetworkState(ready) {
  offlineState.textContent = navigator.onLine ? (ready ? '오프라인 열람 준비 완료' : '온라인') : '오프라인 · 저장된 여행표';
  const banner = document.querySelector('#connection-banner');
  banner.hidden = navigator.onLine && !updateAvailable;
  banner.innerHTML = !navigator.onLine ? `${icon('pin')}<span>저장된 여행표를 보고 있어요. 지도·메일은 연결 후 열어 주세요.</span>` : `새 여행표가 준비됐어요. ${action('새로고침', 'refresh', '')}`;
}

restoreRoute();
if (routeDetail) {
  const directLink = routeHash();
  window.history.replaceState(null, '', routeHash(null));
  window.history.pushState(null, '', directLink);
}
let offlineReady = Boolean(navigator.serviceWorker?.controller);
showNetworkState(offlineReady);
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('message', event => {
    if (event.data?.type === 'TRIP_UPDATED' && event.data.version !== `fukuoka-trip-${appVersion}`) { updateAvailable = true; showNetworkState(offlineReady); }
  });
  navigator.serviceWorker.register('./sw.js').then(() => navigator.serviceWorker.ready).then(() => {
    offlineReady = true;
    showNetworkState(true);
  }).catch(() => { offlineState.textContent = '오프라인 준비 실패'; });
}
window.addEventListener('online', () => showNetworkState(offlineReady));
window.addEventListener('offline', () => showNetworkState(offlineReady));
window.addEventListener('beforeinstallprompt', event => { event.preventDefault(); installPrompt = event; });
document.addEventListener('visibilitychange', () => {
  if (!document.hidden && tab === 'schedule' && !dialog.open) render();
});
setInterval(() => {
  const focus = view.querySelector('#journey-focus');
  if (tab === 'schedule' && !dialog.open && focus && !focus.contains(document.activeElement)) focus.innerHTML = renderJourneyFocus();
}, 60000);
