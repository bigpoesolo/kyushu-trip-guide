import { areas, checkinFirst, days, foods, schedules, statuses, tasks } from './trip.js?v=5';
import { eventPhotos, guides, photos } from './guides.js?v=5';

const view = document.querySelector('#view');
const dialog = document.querySelector('#detail');
const detail = document.querySelector('#detail-content');
const notice = document.querySelector('#notice');
const offlineState = document.querySelector('#offline-state');
const shell = document.querySelector('.shell');
const storageKey = 'fukuoka-trip-edits-v1';
const events = Object.fromEntries(schedules.flatMap((list, day) => list.map(event => [event.id, { ...event, day }])));
const mealEvents = Object.values(events).filter(event => event.meal);
let saved = { events: {}, tasks: {} };
try {
  const stored = JSON.parse(localStorage.getItem(storageKey));
  if (stored?.events && stored?.tasks) saved = stored;
} catch {
  // The initial trip is available even if storage is disabled.
}

let tab = 'schedule';
let day = 0;
let area = '';
let awardOnly = false;
let toastTimer;

const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const icon = name => `<svg class="icon" aria-hidden="true"><use href="#${name}"/></svg>`;
const mark = name => `<span class="mark mark-${name}">${icon(name)}</span>`;
const badge = (label, className = '') => `<span class="tag ${className}">${escape(label)}</span>`;
const link = (label, url) => `<a class="button" href="${escape(url)}" target="_blank" rel="noopener noreferrer">${escape(label)} ${icon('external')}</a>`;
const mapLink = place => link('지도', `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place)}`);
const directionsLink = (origin, destination, mode = 'walking', label = mode === 'walking' ? '도보 길찾기' : '차량 경로') => link(label,
  `https://www.google.com/maps/dir/?${new URLSearchParams({ api: '1', origin, destination, travelmode: mode })}`);
const action = (label, name, id, extraClass = '', symbol = '') => `<button type="button" class="button ${extraClass}" data-action="${name}" data-id="${escape(id)}">${symbol ? icon(symbol) : ''}${escape(label)}</button>`;
const timeText = event => event.timeLabel || [event.start, event.end].filter(Boolean).join('–');
const dayIcons = ['mountain', 'pin', 'plane'];
const eventIcons = {
  'flight-out': 'plane', arrival: 'bag', platform: 'walk', 'bus-out': 'bus', bags: 'bag', 'walk-cafe': 'walk', shiba: 'coffee',
  shopping: 'shop', 'walk-back': 'walk', collect: 'bag', 'ryokan-ride': 'car', ryokan: 'hotel', sukiyaki: 'food', bath: 'bath', 'late-snack': 'food',
  early: 'hotel', 'taxi-am': 'car', 'bus-ready': 'bus', 'bus-back': 'bus', 'hakata-bags': 'bag', brunch: 'bread', shrine: 'pin',
  lunch: 'food', canal: 'shop', 'hakata-hotel': 'hotel', snack: 'coffee', dinner: 'food', market: 'sparkle', rest: 'hotel',
  breakfast: 'bread', checkout: 'bag', 'airport-return': 'car', 'airport-arrival': 'pin', depart: 'bag', 'flight-back': 'plane',
};
const foodIcons = {
  dacomecca: 'bread', karo: 'bowl', painstock: 'bread', uochu: 'bowl', yamanaka: 'bowl', issou: 'bowl', '16ku': 'coffee',
  shiroya: 'bread', hagakure: 'bowl', genki: 'bowl', fullfull: 'bread', suzukake: 'coffee', tenjosajiki: 'coffee', bspeak: 'coffee', milch: 'coffee', purindora: 'coffee',
};

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
  if (base.candidates) {
    event.candidates = [...new Set([...base.candidates, ...(edits.added || [])])];
    event.selected = edits.selected || base.candidates[0];
    event.status = edits.mealStatuses?.[event.selected] || base.status;
  }
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
  const timeline = schedules[day].map(item => currentEvent(item.id)).sort((a, b) => a.start.localeCompare(b.start));
  return `<div class="days" aria-label="날짜 선택">${days.map((item, index) => `<button type="button" class="day-button" data-action="day" data-id="${index}" aria-pressed="${index === day}">${icon(dayIcons[index])}<span><strong>${item.short}</strong><small>${item.date}</small></span><span class="day-index">0${index + 1}</span></button>`).join('')}</div>
    ${titleBlock(`DAY 0${day + 1} <span class="label-line"></span> ${info.date}`, info.title, info.description)}
    <div class="schedule-layout">
    <aside class="day-aside" aria-label="당일 참고">
      <button type="button" class="warning" data-action="event" data-id="${warningEvent}">${mark('clock')}<span><b>${escape(warning[0])}</b><small>${escape(warning[1])}</small></span>${icon('chevron')}</button>
      <div class="toolbar">
        ${day === 0 ? `${action('유후인 거리 간식', 'event', 'shopping', '', 'coffee')}${action('료칸 야식 준비', 'event', 'late-snack', '', 'food')}${action('체크인 먼저 대안', 'checkin-first', '', '', 'route')}` : ''}
        ${action(`${areas[info.area]} 주변 백명점`, 'nearby', info.area, '', 'pin')}
      </div>
    </aside>
    <section class="timeline-panel" aria-label="시간순 일정"><div class="list-heading"><strong>시간순 일정</strong><span>${timeline.length}개 일정 · JST</span></div>
    <ol class="timeline">${timeline.map(item => {
      const sub = item.selected ? foods[item.selected].name : item.subtitle;
      return `<li><button class="event${item.fixed ? ' fixed-event' : ''}" type="button" data-action="event" data-id="${item.id}">
        <span class="time">${escape(item.start)}${item.timeLabel ? `<small>${escape(item.timeLabel.replace(`${item.start} `, ''))}</small>` : item.end ? `<small>– ${item.end}</small>` : ''}</span>
        ${mark(eventIcons[item.id])}
        <span><strong>${escape(item.title)}</strong>${sub ? `<span class="meta">${escape(sub)}</span>` : ''}<span class="chips">${badge(statuses[item.status], item.status)}${item.deadline ? badge(item.deadline, 'deadline') : ''}${item.candidates?.length > 1 ? badge(`예비 ${item.candidates.length - 1}곳`) : ''}</span></span>
        ${icon('chevron')}</button></li>`;
    }).join('')}</ol></section></div>`;
}

function renderFood() {
  const listings = Object.entries(foods).filter(([, food]) => food.area && (!area || food.area === area) && (!awardOnly || food.award));
  return `${titleBlock('02 / FOOD GUIDE', '맛집과 예비 후보', '동선에 맞는 맛집을 식사 후보에 담아요.', 'food')}
    <div class="food-toolbar"><div class="toolbar" aria-label="지역 필터">${Object.entries({ '': '전체 지역', ...areas }).map(([id, label]) => `<button type="button" class="filter" data-action="area" data-id="${id}" aria-pressed="${area === id}">${label}</button>`).join('')}</div>
      <button type="button" class="filter award-filter" data-action="awards" aria-pressed="${awardOnly}">${icon('sparkle')}백명점만</button></div>
    <div class="list-heading"><strong>${area ? areas[area] : '전체 후보'}</strong><span>${listings.length}곳 · 백명점 ${listings.filter(([, food]) => food.award).length}곳</span></div>
    ${listings.length ? `<ul class="food-grid">${listings.map(([id, food]) => `<li><button type="button" class="food-card" data-action="food" data-id="${id}">
      ${mark(foodIcons[id] || 'food')}<span><span class="food-area">${escape(areas[food.area])}</span><strong>${escape(food.name)}</strong><span class="meta">${escape(food.menu)}</span>
      <span class="chips">${food.award ? badge(`백명점 · ${food.award[0]}`, 'award') : ''}${food.hours ? badge(food.hours) : ''}${food.wish ? badge('가고 싶은 곳', 'pending') : ''}</span></span>${icon('chevron')}</button></li>`).join('')}</ul>` : `<div class="empty">${mark('pin')}<p>${awardOnly ? '이 구역에 등록된 백명점이 없어요. 백명점 필터를 끄면 일반 후보를 볼 수 있어요.' : '이 구역에 등록된 후보가 없어요.'}</p></div>`}`;
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

function render() {
  shell.dataset.tab = tab;
  document.querySelector('#task-count').textContent = tasks.filter(task => !saved.tasks[task.id]).length;
  for (const button of document.querySelectorAll('[data-tab]')) {
    if (button.dataset.tab === tab) button.setAttribute('aria-current', 'page');
    else button.removeAttribute('aria-current');
  }
  view.innerHTML = tab === 'schedule' ? renderSchedule() : tab === 'food' ? renderFood() : renderTasks();
}

function detailHeading(label, title, symbol) {
  return `<div class="detail-title-row">${mark(symbol)}<div><p class="eyebrow">${label}</p><h2 id="detail-title">${escape(title)}</h2></div></div>`;
}

function detailPhoto(photo) {
  return `<figure class="detail-cover"><img src="./${photo.file}" alt="" decoding="async">
    <figcaption><span>${escape(photo.caption)}</span>${photo.source ? `<span class="photo-credit"><a href="${photo.source}" target="_blank" rel="noopener noreferrer">${escape(photo.author)}</a> · <a href="${photo.licenseUrl}" target="_blank" rel="noopener noreferrer">${photo.license}</a> · 크기 조정</span>` : ''}</figcaption></figure>`;
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
  const ordered = [event.selected, ...event.candidates.filter(id => id !== event.selected)];
  return `<section class="detail-section"><h3>식사 후보</h3><div class="candidates">${ordered.map((id, index) => {
    const food = foods[id];
    const photo = photos[food.photo];
    const hint = guide.hints?.[id];
    const facts = [food.award && `백명점 · ${food.award[0]}`, food.hours].filter(Boolean).join(' / ');
    const choice = `${event.id}|${id}`;
    return `<div class="candidate">
      <button type="button" class="button candidate-choice" data-action="candidate" data-id="${escape(choice)}">
        ${photo ? `<img src="./${photo.file}" alt="" width="54" height="54" decoding="async">` : ''}
        <span><strong>${escape(`${index === 0 ? '현재 · ' : ''}${food.name}`)}</strong>${facts ? `<small>${escape(facts)}</small>` : ''}${hint ? `<small>${escape(hint)}</small>` : ''}</span>
      </button>${index ? action('이곳 선택', 'choose', choice) : badge('선택됨', 'confirmed')}
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
  const event = currentEvent(id);
  const task = tasks.find(item => item.event === id);
  const guide = guides[id] || {};
  const destination = event.place || foods[event.selected]?.jp;
  const sources = [...(event.links || []), ...(guide.links || [])];
  const editing = `<details class="detail-section edit-section"><summary>${icon('edit')}일정 수정</summary>
    <form class="edit-grid" id="edit-event" data-id="${id}" data-back-task="${escape(backTask)}">
      ${event.fixed ? '<p class="wide">예약된 교통편의 시간과 상태가 고정되어 있어요.</p>' : `<label>시작<input name="start" type="time" value="${event.start}" required></label><label>종료<input name="end" type="time" value="${event.end || ''}"></label>
      <label class="wide">${event.selected ? '현재 선택한 식당의 상태' : '상태'}<select name="status">${Object.entries(statuses).map(([key, label]) => `<option value="${key}"${event.status === key ? ' selected' : ''}>${label}</option>`).join('')}</select></label>`}
      <label class="wide">내 메모<textarea name="note" maxlength="600" placeholder="예약 정보나 바뀐 내용을 적어두세요.">${escape(event.note)}</textarea></label>
      <button class="button primary" type="submit">저장</button>
    </form></details>`;
  showDetail(`${detailPhoto(eventPhotos[id] || photos.yufuin)}
    ${backTask ? action('‹ 할 일', 'task', backTask) : ''}
    ${detailHeading(`${days[event.day].date} · ${escape(timeText(event))}`, event.title, eventIcons[id])}
    <div class="chips">${badge(statuses[event.status], event.status)}${event.deadline ? badge(event.deadline, 'deadline') : ''}</div>
    ${event.subtitle ? `<p class="detail-summary">${escape(event.subtitle)}</p>` : ''}
    ${destination || guide.directions ? `<section class="detail-section"><h3>${icon('pin')}장소·가는 법</h3>
      ${guide.directions ? `<p>${escape(guide.directions)}</p>` : ''}${destination ? `<p class="meta">${escape(destination)}</p>` : ''}
      <div class="links">${guide.origin && destination ? directionsLink(guide.origin, destination, guide.mode) : ''}${destination ? mapLink(destination) : ''}${sources.map(([label, url]) => link(label, url)).join('')}</div></section>` : ''}
    ${guideDetails(id, guide)}
    ${event.detail ? `<section class="detail-section"><h3>${icon('checklist')}현장 메모</h3><p>${escape(event.detail)}</p></section>` : ''}
    ${!destination && !guide.directions && sources.length ? `<section class="detail-section"><h3>${icon('external')}참고 링크</h3><div class="links">${sources.map(([label, url]) => link(label, url)).join('')}</div></section>` : ''}
    ${event.fallback ? `<section class="detail-section fallback"><h3>${icon('route')}${escape(event.fallback[0])}</h3><p>${escape(event.fallback[1])}</p></section>` : ''}
    ${event.candidates ? mealCandidates(event, guide) : ''}
    ${guide.related || event.area ? `<section class="detail-section"><h3>${icon('route')}함께 보기</h3><div class="links">${(guide.related || []).map(related => action(events[related].title, 'event', related, '', eventIcons[related])).join('')}${event.area ? action('주변 백명점', 'nearby', event.area, '', 'pin') : ''}</div></section>` : ''}
    ${event.note ? `<section class="detail-section"><h3>내 메모</h3><p>${escape(event.note)}</p></section>` : ''}
    ${task && !backTask ? `<section class="detail-section"><h3>연결된 할 일</h3>${action(`${saved.tasks[task.id] ? '✓ ' : ''}${task.title}`, 'task', task.id)}</section>` : ''}
    ${editing}`);
}

function showFood(id, fromEvent) {
  const food = foods[id];
  const placesToAdd = mealEvents.filter(event => food.meals?.includes(event.meal) && !currentEvent(event.id).candidates.includes(id));
  showDetail(`${food.photo ? detailPhoto(photos[food.photo]) : ''}${fromEvent ? action(events[fromEvent].meal ? '‹ 식사 후보' : '‹ 일정 상세', 'event', fromEvent) : ''}
    ${detailHeading(food.area ? areas[food.area] : '식사 대안', food.name, foodIcons[id] || 'food')}
    <div class="chips">${food.award ? badge(`백명점 · ${food.award[0]}`, 'award') : ''}${food.hours ? badge(food.hours) : ''}${food.wish ? badge('가고 싶은 곳', 'pending') : ''}</div>
    <p>${escape(food.menu)}</p>${food.jp ? `<p class="meta">${escape(food.jp)}</p>` : ''}
    <section class="detail-section"><h3>영업·방문 참고</h3><p>${escape(food.info)}</p>${food.checked ? `<p class="meta">출처 확인 ${food.checked} · 방문일 임시휴무 및 잔여석 별도 확인</p>` : ''}
    <div class="links">${food.jp ? mapLink(food.jp) : ''}${food.tabelog ? link('타베로그', food.tabelog) : ''}${food.official ? link('매장·영업 정보', food.official) : ''}${food.booking ? link('예약 안내', food.booking) : ''}${food.award ? link('백명점 원문', food.award[1]) : ''}</div></section>
    ${!fromEvent && placesToAdd.length ? `<section class="detail-section"><h3>예비 후보로 담기</h3><div class="links">${placesToAdd.map(event => action(`${days[event.day].date} ${event.title}`, 'add', `${event.id}|${id}`)).join('')}</div></section>` : ''}`);
}

function showTask(id) {
  const task = tasks.find(item => item.id === id);
  const event = currentEvent(task.event);
  const done = Boolean(saved.tasks[id]);
  showDetail(`${detailHeading(`${days[event.day].date} · 할 일`, task.title, 'checklist')}
    <p>${escape(task.info)}</p><div class="chips">${badge(done ? '완료' : '할 일', done ? 'confirmed' : 'todo')}${badge(statuses[event.status], event.status)}</div>
    <section class="detail-section"><h3>연결된 일정</h3><div class="links">${action('일정 상세·예약 상태 수정', 'task-event', id)}${action(done ? '다시 할 일로' : '완료로 표시', 'toggle-task', id, 'primary')}</div></section>`);
}

document.addEventListener('click', event => {
  const button = event.target.closest('button[data-action], button[data-tab]');
  if (!button) return;
  const { action: name, id, tab: nextTab } = button.dataset;
  if (nextTab) {
    tab = nextTab;
    render();
    window.scrollTo(0, 0);
    return;
  }
  switch (name) {
    case 'day': {
      const scrolledPastHeader = view.getBoundingClientRect().top < 0;
      day = Number(id);
      render();
      view.querySelector('.day-button[aria-pressed=true]').focus({ preventScroll: true });
      if (scrolledPastHeader) view.scrollIntoView({ block: 'start' });
      break;
    }
    case 'area': area = id; render(); view.querySelector('.filter[data-action=area][aria-pressed=true]').focus(); break;
    case 'awards': awardOnly = !awardOnly; render(); view.querySelector('.award-filter').focus(); break;
    case 'nearby':
      tab = 'food'; area = id; awardOnly = true;
      if (dialog.open) dialog.close();
      render(); window.scrollTo(0, 0); break;
    case 'event': showEvent(id); break;
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
    else change.status = status;
  }
  if (updateEvent(id, change)) showEvent(id, backTask);
});

function showNetworkState(ready) {
  offlineState.textContent = navigator.onLine ? (ready ? '오프라인 열람 준비 완료' : '온라인') : '오프라인 · 저장된 여행표';
}

render();
let offlineReady = Boolean(navigator.serviceWorker?.controller);
showNetworkState(offlineReady);
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').then(() => navigator.serviceWorker.ready).then(() => {
    offlineReady = true;
    showNetworkState(true);
  }).catch(() => { offlineState.textContent = '오프라인 준비 실패'; });
}
window.addEventListener('online', () => showNetworkState(offlineReady));
window.addEventListener('offline', () => showNetworkState(offlineReady));
