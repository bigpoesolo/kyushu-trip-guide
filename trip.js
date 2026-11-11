export const days = [
  { date: '12/5 토', short: '유후인', title: '공항에서 유후인으로', description: '마메시바 카페 · 유노츠보 · 료칸', area: 'yufuin', warning: ['bus-out', '공항 환승 68분', '12:00 도착 예정 → 13:08 버스 출발'] },
  { date: '12/6 일', short: '후쿠오카', title: '하카타와 텐진', description: '이른 퇴실 · 하카타 맛집과 관광', area: 'hakata', warning: ['taxi-am', '아침 택시 미예약', '07:20 택시와 조기 체크아웃 사전 협의'] },
  { date: '12/7 월', short: '귀국', title: '하카타에서 공항으로', description: '아침 식사 · 국제선 터미널 · 귀국', area: 'hakata', warning: ['airport-return', '국제선 터미널', '10:15~10:30 도착 목표'] },
];

export const areas = { hakata: '하카타역', kushida: '구시다·가와바타', tenjin: '텐진·다이묘·야쿠인', yufuin: '유후인' };
export const statuses = { confirmed: '예약 확정', pending: '회신 대기', todo: '미예약·미확정', plan: '계획', option: '선택 일정' };

const bus = ['고속버스 예약 조회', 'https://www.highwaybus.com/gp/inbound/index?lang=KO'];
const busRoute = ['니시테쓰 노선·시각표', 'https://www.nishitetsu.jp/bus/highwaybus/rosen/yufuin/'];
const airport = ['후쿠오카공항 공식', 'https://www.fukuoka-airport.jp/'];
const airline = ['제주항공 예약 조회', 'https://www.jejuair.net/'];
const hotel = ['료칸 공식', 'https://yufunoirodori-oohashi.jp/'];
const ryokan = '由布の彩 YADOYA おおはし 大分県由布市湯布院町川北1235';
const fukuoka = '福岡空港 国際線ターミナル';
const yufuin = '由布院駅前バスセンター';
const luggage = 'ゆふいんチッキ 由布市ツーリストインフォメーションセンター';
const hakata = '博多バスターミナル';
const forza = 'ホテルフォルツァ博多駅博多口 福岡市博多区博多駅前2-1-15';
const forzaOfficial = ['포르자 공식 · 짐 보관 안내', 'https://www.hotelforza.jp/hakataguchi/'];
const cafe = '由布院豆柴カフェ 大分県由布市湯布院町川上1507-2';

export const schedules = [
  [
    { id: 'flight-out', start: '10:30', end: '12:00', title: '인천 → 후쿠오카', subtitle: '제주항공 7C1403', status: 'confirmed', fixed: true, place: fukuoka, links: [airline, airport] },
    { id: 'arrival', start: '12:00', end: '12:55', title: '입국심사·짐 찾기·세관', subtitle: '12:55 수속 완료 목표', status: 'plan', place: fukuoka, links: [airport] },
    { id: 'platform', start: '12:55', end: '13:03', title: '국제선 유후인행 승강장으로', subtitle: '환승 최우선 · 승강장 현장 확인', status: 'plan', place: fukuoka, links: [airport, busRoute] },
    { id: 'bus-out', start: '13:08', end: '14:59', title: '후쿠오카공항 → 유후인', subtitle: '국제선 터미널 출발 · 고속버스', status: 'confirmed', fixed: true, place: fukuoka, links: [bus, busRoute, airport], detail: '항공 도착 예정 12:00부터 버스 출발 13:08까지 68분. 입국 후 바로 국제선 유후인행 승강장으로 이동합니다. 탑승 위치와 탑승권은 예약 내역을 확인하세요. 도착지는 由布院駅前バスセンター입니다.', fallback: ['버스를 놓쳤을 때', 'Highwaybus에서 국제선 → 유후인역 앞 다음 편의 잔여석과 변경 가능 여부를 확인합니다. 공항 버스 안내소에도 문의할 수 있어요. 기존 예약이 자동으로 다음 편으로 넘어가는 것으로 가정하지 않습니다.\n도착이 늦어지면 료칸에 연락하고 관광을 줄여 17:30 체크인을 우선합니다.'] },
    { id: 'bags', start: '15:00', end: '15:10', title: '유후인역 주변 짐 보관', subtitle: '역 오른쪽 관광안내센터 · 17:00까지 회수', status: 'plan', deadline: '17:00 회수', area: 'yufuin', place: luggage, links: [['짐 보관 공식 안내', 'https://yufuin.gr.jp/spot/spot-2280/']], detail: '유후인 칫키(ゆふいんチッキ) 공식 보관 시간은 09:00~17:00입니다. 맡길 때 회수 마감과 보관 가능 여부를 확인하세요.', fallback: ['보관이 어려울 때', '역 주변 코인로커를 확인하거나, 짐을 들고 관광하기 어려우면 체크인 먼저 동선을 참고합니다.'] },
    { id: 'walk-cafe', start: '15:10', end: '15:30', title: '유후인역 → 마메시바 카페', subtitle: '도보 약 15~20분 · 초안 추정', status: 'plan', place: cafe, area: 'yufuin' },
    { id: 'shiba', start: '15:30', end: '16:20', title: '유후인 마메시바 카페', subtitle: '15:50쯤까지 입장 가능한 경우에만 방문', status: 'option', deadline: '15:50 입장 기준', place: cafe, area: 'yufuin', links: [['카페 공식', 'https://owls-cats-forest.com/free/mameshiba-yufuin']], detail: '현장 발권 시 입장 가능 시각을 먼저 확인하세요. 15:50쯤 입장하면 30분 체류 기준 16:20에 나와 곧장 역으로 돌아갑니다. 카페 자체 마지막 입장은 16:30입니다.', fallback: ['매진·대기가 길 때', '15:50쯤까지 입장하기 어렵다면 카페를 건너뜁니다. 유노츠보는 역으로 돌아가는 길에 짐 회수 시간에 여유가 있을 때만 둘러보세요.'] },
    { id: 'shopping', start: '16:00', end: '16:15', title: '유노츠보 거리', subtitle: '카페에서 일찍 나온 경우에만 짧게', status: 'option', place: '湯の坪街道 由布院', area: 'yufuin', detail: '카페를 16:00쯤 나오거나 건너뛴 경우에만 역으로 가는 길에 잠깐 들릅니다. 늦어도 16:20에는 역으로 출발하세요.' },
    { id: 'walk-back', start: '16:15', end: '16:40', title: '유노츠보 → 유후인역', subtitle: '늦어도 16:20에 출발 · 도보 약 15~20분', status: 'plan', place: yufuin, area: 'yufuin' },
    { id: 'collect', start: '16:35', end: '16:50', title: '짐 회수 → 역 공중전화로 픽업 요청', subtitle: '짐을 찾은 뒤 바로 전화 · 일본 동전 준비', status: 'plan', deadline: '17:00 회수·픽업 접수 마감', place: luggage, area: 'yufuin', detail: '짐을 찾은 뒤 유후인역 공중전화에서 일본 동전으로 료칸(0977-84-5565)에 전화하세요. 료칸 안내상 픽업 접수는 15:00~17:00이고, 이용 의사는 사전에 메일로 전달했습니다.' },
    { id: 'ryokan-ride', start: '16:50', timeLabel: '16:50 전후', title: '유후인역 → 야도야 오오하시', subtitle: '료칸 픽업 · 요청이 안 되면 택시', status: 'plan', place: ryokan, area: 'yufuin', links: [hotel], detail: '픽업 요청이 접수되면 역 오른쪽 관광안내센터 안 짐 배송 카운터 근처에서 기다립니다. 료칸은 당일 복장 사진을 이메일로 보내 달라고 안내했습니다. 역에서 료칸까지는 차로 약 5분이며 배차 대기 시간은 별도입니다.', fallback: ['픽업이 안 될 때', '전화 연결이 안 되거나 17:00 접수 마감을 넘기면 유후인역에서 택시로 이동합니다. 17:30 체크인 마감에 맞춰 출발하세요.'] },
    { id: 'ryokan', start: '17:00', end: '17:10', title: '야도야 오오하시 체크인', subtitle: '17:00~17:10 도착 목표 · 로프트 객실 예약 완료', status: 'confirmed', deadline: '17:30 체크인 마감', place: ryokan, area: 'yufuin', links: [hotel], detail: '료칸 도착 목표는 17:00~17:10입니다. 료칸 메일에 따르면 체크인은 17:30까지 완료해야 합니다. 객실 안에 실내탕과 노천탕이 있고, 기본 숙박 예약에 조식과 석식은 미포함입니다.' },
    { id: 'sukiyaki', start: '18:00', timeLabel: '18:00 또는 18:30', title: '료칸 스키야키 석식', subtitle: '추가 식사 · 2인 ¥26,400', status: 'pending', place: ryokan, area: 'yufuin', links: [hotel], detail: '기본 숙박에 포함되지 않은 추가 식사입니다. 최초 문의 내용 기준 현장 카드 결제 가능. 회신에 맞춰 시간과 상태를 수정할 수 있어요.', fallback: ['석식이 어려울 때', '료칸 도착 전에 영업 중인 유후인 식당이나 포장 대안을 확인합니다.'] },
    { id: 'bath', start: '19:30', timeLabel: '19:30 이후', title: '객실 온천 · 휴식', subtitle: '실내탕·노천탕', status: 'plan', area: 'yufuin', place: ryokan },
    { id: 'late-snack', start: '21:00', timeLabel: '21:00 전후', title: '료칸에서 먹을 야식', subtitle: '픽업 전에 편의점에서 간단히 포장', status: 'option', area: 'yufuin', detail: '역으로 돌아오는 길에 시간이 남으면 주먹밥·빵·음료를 가볍게 사두세요. 로프트 객실에는 냉장고가 있어 냉장 제품은 도착 후 포장 안내대로 보관할 수 있어요.', fallback: ['픽업 시간이 빠듯할 때', '17:00 짐 회수·픽업 접수가 먼저입니다. 장볼 시간이 없으면 체크인부터 하고, 나중에 필요할 때 세븐일레븐 카드의 료칸 출발 경로를 확인하세요.'] },
  ],
  [
    { id: 'early', start: '06:30', end: '07:10', title: '짐 정리 · 조기 체크아웃', subtitle: '료칸과 사전 협의 · 조식 미포함', status: 'todo', place: ryokan, links: [hotel], area: 'yufuin' },
    { id: 'taxi-am', start: '07:20', title: '료칸 → 유후인역 앞 버스센터', subtitle: '택시 예약 요청 예정', status: 'todo', place: yufuin, area: 'yufuin', links: [hotel], detail: '전날 료칸에 오전 07:20 택시 사전 예약과 조기 체크아웃을 요청합니다. 이른 아침 무료 송영은 미확인입니다.' },
    { id: 'bus-ready', start: '07:35', end: '07:45', title: '유후인역 앞 버스센터 도착 목표', subtitle: '08:00 출발 · 15~25분 여유 목표', status: 'plan', place: yufuin, links: [busRoute], area: 'yufuin' },
    { id: 'bus-back', start: '08:00', end: '10:07', title: '유후인 → 하카타', subtitle: '하카타 버스터미널 도착 · 고속버스', status: 'confirmed', fixed: true, place: yufuin, links: [bus, busRoute], area: 'hakata' },
    { id: 'hakata-bags', start: '10:10', end: '10:35', title: '포르자에 짐 맡기기', subtitle: '하카타구치 도보 약 3분 · 체크인 전 보관 가능', status: 'plan', place: forza, area: 'hakata', links: [forzaOfficial], fallback: ['호텔에 맡기기 어려울 때', '하카타역 코인 로커를 확인하고, 만석이면 KITTE 하카타 마루이 2층 TABINAKA를 이용해요.'] },
    { id: 'brunch', start: '10:45', end: '11:25', title: '브런치', subtitle: '하카타역 근처에서 빵을 가볍게', status: 'plan', area: 'hakata', candidates: ['dacomecca', 'shiroya', 'fullfull'], meal: 'brunch', fallback: ['다코메카 줄이 길 때', '대기가 15분을 넘길 것 같으면 역 안 시로야에서 포장하거나, 구시다 신사 쪽으로 계속 걸어 더 풀풀 하카타에서 빵을 삽니다.'] },
    { id: 'shrine', start: '11:30', end: '12:15', title: '구시다 신사 · 가와바타', subtitle: '신사를 먼저 보고 상점가 산책은 점심 뒤로', status: 'plan', place: '櫛田神社 福岡', area: 'kushida' },
    { id: 'lunch', start: '12:15', end: '13:15', title: '점심', subtitle: '13시 전에 카로노우론 도착 목표', status: 'plan', area: 'kushida', candidates: ['karo', 'genki', 'hirao', 'uochu', 'issou'], meal: 'lunch', fallback: ['카로노우론 대기·품절 시', '고후쿠마치 쪽 하카타 겐키잇파이의 줄이 더 짧으면 이동합니다. 이미 텐진 쪽으로 넘어갔다면 히라오 다이묘점도 후보예요.'] },
    { id: 'canal', start: '13:15', end: '15:00', title: '가와바타 · 캐널시티 쇼핑', subtitle: '점심 뒤 도보로 둘러보고 하카타역 쪽으로', status: 'option', place: 'キャナルシティ博多', area: 'kushida', links: [['캐널시티 공식', 'https://canalcity.co.jp/']] },
    { id: 'hakata-hotel', start: '15:15', end: '16:45', title: '포르자 하카타구치 체크인 · 휴식', subtitle: '아고다 예약 확정 · 리프레시 더블 금연 · 2인', status: 'confirmed', booking: true, place: forza, area: 'hakata', links: [forzaOfficial, ['아고다 내 예약', 'https://www.agoda.com/account/bookings.html']], detail: '12/6~12/7 성인 2명·1박 예약이 확정됐어요. 체크인은 14:00부터, 체크아웃은 다음 날 11:00까지입니다. 실제 방문은 기존 일정대로 15:15를 목표로 해요. 예약 확정서와 결제·취소 조건은 아래 예약 정보와 관련 메일에서 확인하세요.' },
    { id: 'snack', start: '16:45', end: '17:30', title: '간식', subtitle: '나카스 쪽 저녁 동선에 맞을 때만', status: 'option', area: 'tenjin', candidates: ['painstock', '16ku', 'suzukake'], meal: 'snack' },
    { id: 'dinner', start: '18:00', end: '19:15', title: '저녁', subtitle: '요시즈카 2인 예약 가능 · 좌석 미확정', status: 'todo', area: 'kushida', candidates: ['yoshizuka', 'hountei', 'yamamichi', 'issou', 'yamanaka', 'genki'], meal: 'dinner', fallback: ['요시즈카 자리가 없거나 줄이 길 때', '같은 나카스 2초메의 호운테이 나카스 본점 자리를 확인합니다. 장어가 우선이면 야쿠인오도리의 야마미치 본점에 먼저 자리를 확인하고 이동하세요.'] },
    { id: 'market', start: '19:30', end: '20:30', title: '하카타역 크리스마스마켓 · 야경', subtitle: '저녁 뒤 역 광장 · 12/6 12:00~23:00 운영', status: 'option', place: '博多駅前広場', area: 'hakata', links: [['하카타역 행사 공식', 'https://christmas-advent.jp/fukuoka-hakata/']] },
    { id: 'rest', start: '20:30', timeLabel: '20:30 이후', title: '포르자 복귀 · 휴식', status: 'plan', place: forza, area: 'hakata' },
  ],
  [
    { id: 'breakfast', start: '08:00', end: '09:00', title: '아침', status: 'plan', area: 'hakata', candidates: ['shiroya', 'hotel-breakfast'], meal: 'brunch' },
    { id: 'checkout', start: '09:00', end: '09:40', title: '포르자 체크아웃 · 짐 정리', subtitle: '숙소 체크아웃 마감 11:00 · 공항 이동은 09:45 목표', status: 'plan', place: forza, area: 'hakata' },
    { id: 'airport-return', start: '09:45', timeLabel: '09:45 전후', title: '하카타 → 후쿠오카공항 국제선', subtitle: '택시 기본안 · 대중교통 대안', status: 'todo', place: fukuoka, links: [airport, ['하카타역 ↔ 국제선 버스', 'https://www.nishitetsu.jp/bus/rosen/akeito/']], detail: '국제선 터미널 도착 목표는 10:15~10:30입니다.', fallback: ['대중교통으로 갈 때', '하카타역에서 국제선행 직행 버스를 확인합니다. 지하철을 이용하면 국내선 쪽에서 국제선 터미널 연결편을 확인하세요.'] },
    { id: 'airport-arrival', start: '10:15', end: '10:30', title: '국제선 터미널 도착 목표', status: 'plan', place: fukuoka, links: [airport] },
    { id: 'depart', start: '10:30', end: '12:00', title: '출국 수속 · 공항 내 간단한 식사', subtitle: '수하물·보안검색·탑승 마감 우선', status: 'plan', place: fukuoka, links: [airline, airport] },
    { id: 'flight-back', start: '13:00', end: '14:30', title: '후쿠오카 → 인천', subtitle: '제주항공 7C1404', status: 'confirmed', fixed: true, place: fukuoka, links: [airline, airport] },
  ],
];

export const checkinFirst = [
  ['14:59', '유후인역 도착', '예약 버스 도착 예정'],
  ['15:00–15:35', '숙소 이동·체크인·짐 정리', '역 공중전화로 픽업 요청 · 안 되면 택시'],
  ['15:35 이후', '료칸 → 마메시바 카페', '택시 주행 약 10~15분 추정 + 배차 대기'],
  ['15:50까지', '마메시바 카페 입장 판단', '15:50쯤까지 입장 가능한 경우에만 방문'],
  ['16:20–17:00', '유노츠보 거리', '가게 마감 전 짧게 구경'],
  ['17:00–17:30', '료칸 복귀', '택시 · 석식 시간에 맞춰 복귀'],
];

export const tasks = [
  { id: 'dinner-reply', event: 'sukiyaki', title: '스키야키 2인 석식 회신 확인', info: '예약 가능 여부와 18:00 / 18:30 중 시작 시간', priority: true },
  { id: 'early-taxi', event: 'taxi-am', title: '07:20 택시 예약 요청', info: '료칸에 07:10 전후 조기 체크아웃도 협의', priority: true },
  { id: 'eta', event: 'ryokan', title: '료칸에 체크인 예상시간 안내', info: '기존에 알린 15:00쯤을 17:00~17:10 도착 예정으로 변경 안내' },
  { id: 'bus-alt', event: 'bus-out', title: '공항 환승 실패 시 대안 확인', info: '13:08 다음 편 잔여석과 예약 변경 조건' },
  { id: 'locker', event: 'bags', title: '유후인역 짐 보관과 마감 확인', info: '17:00 이전 회수 가능 여부' },
  { id: 'cafe-alt', event: 'shiba', title: '마메시바 카페 입장 시각 확인', info: '15:50쯤까지 입장 가능한 경우에만 방문' },
  { id: 'pickup', event: 'collect', title: '픽업 요청용 일본 동전 준비', info: '짐 회수 후 역 공중전화로 17:00까지 요청 · 안 되면 택시' },
  { id: 'hotel-payment', event: 'hakata-hotel', title: '12/1 포르자 자동 결제 확인', info: '숙소 예약 확정 · USD 157.34 기준, 결제일 환율·5% 조정 및 현지 숙박세 별도 확인' },
  { id: 'eel', event: 'dinner', title: '요시즈카 우나기야 예약 가능 여부 확인', info: '12/6 일요일 저녁 2인' },
  { id: 'airport', event: 'airport-return', title: '귀국일 공항 이동수단 정하기', info: '후쿠오카공항 국제선 터미널' },
];

const awards = 'https://award.tabelog.com/hyakumeiten/';
const bread = ['빵 WEST 2026', `${awards}bread_west/2026`];
const udon = ['우동 WEST 2024', `${awards}udon_west/2024`];
const ramen = ['라멘 WEST 2025', `${awards}ramen_west/2025`];
const unagi = ['장어 2026', `${awards}unagi/2026`];
const checked = '2026.11.10';

export const foods = {
  dacomecca: { name: '다코메카 · DACOMECCA', jp: 'DACOMECCA 福岡市博多区博多駅前4-14-1', area: 'hakata', menu: '조리빵 · 크루아상', hours: '07:00~19:00 · 부정기 휴무', photo: 'hakata-bread', info: '하카타역 하카타구치 쪽 브런치 1순위. 일요일은 정기 휴무일이 아니며 임시 휴무·품절 공지는 당일 확인해요.', meals: ['brunch', 'snack'], award: bread, tabelog: 'https://tabelog.com/fukuoka/A4001/A400101/40057205/', official: 'https://peaceput.com/shop/', checked },
  karo: { name: '카로노우론', jp: 'かろのうろん 福岡市博多区上川端町2-1', area: 'kushida', menu: '고보텐 우동', hours: '일 11:00~17:00 · 재료 소진 시 종료', info: '구시다 신사와 캐널시티 사이. 화요일 정기 휴무라 일요일 점심에 방문할 수 있어요. 12:15쯤 도착을 목표로 합니다.', meals: ['lunch'], award: udon, tabelog: 'https://tabelog.com/fukuoka/A4001/A400102/40000027/', official: 'https://karonouron.com/', checked },
  yoshizuka: { name: '요시즈카 우나기야', jp: '博多名代 吉塚うなぎ屋 福岡市博多区中洲2-8-27', area: 'kushida', menu: '우나주 · 구운 장어', hours: '일 10:30 안내 시작~21:00 · 주문 마감 20:15', photo: 'hakata-unagi', info: '공식 10:00 영업 시작, 10:30 입장 안내. 수요일과 둘째·넷째 화요일 정기 휴무. 예약은 2명부터 가능하며 12/6 좌석은 별도 확인이 필요해요.', meals: ['lunch', 'dinner'], award: unagi, tabelog: 'https://tabelog.com/fukuoka/A4001/A400102/40000017/', official: 'https://yoshizukaunagi.com/', booking: 'https://yoshizukaunagi.com/room/', checked },
  hountei: { name: '호운테이 나카스 본점', jp: '宝雲亭 中洲本店 福岡市博多区中洲2-4-20', area: 'kushida', menu: '하카타 한입 군만두', hours: '일 17:00~23:00 · 주문 마감 22:30', photo: 'hakata-gyoza', info: '요시즈카와 같은 나카스 2초메라 저녁에 가장 쉽게 바꿀 수 있는 대안이에요. 백명점 선정은 나카스 본점 기준입니다.', meals: ['dinner'], award: ['교자 2024', `${awards}gyoza/2024`], tabelog: 'https://tabelog.com/fukuoka/A4001/A400102/40000125/', official: 'https://www.nakasukankou.com/shop/detail/58', checked },
  yamamichi: { name: '우나기도코로 야마미치 본점', jp: 'うなぎ処 山道 本店 福岡市中央区薬院4-3-14', area: 'tenjin', menu: '우나주 · 양식장 직영 장어', hours: '일 11:00~21:00 · 주문 마감 20:30', photo: 'hakata-unagi', info: '장어가 우선이라면 야쿠인오도리 쪽 본점이 대안이에요. 화요일 정기 휴무. 본점은 방문 한 달 전부터 좌석 예약을 받으니 이동 전에 확인해요.', meals: ['lunch', 'dinner'], award: unagi, official: 'https://unagiyamamichi.com/honten/', checked },
  painstock: { name: '팡스톡 텐진점', jp: 'パンストック 天神店 福岡市中央区西中洲6-17', area: 'tenjin', menu: '명란 프랑스', info: '공식 백명점 목록에 월요일 휴무 표기. 12/6 일요일 간식 후보 · 오후에는 품절 가능.', meals: ['brunch', 'snack'], award: bread, tabelog: 'https://tabelog.com/fukuoka/A4001/A400103/40052317/', checked },
  hirao: { name: '덴푸라 히라오 다이묘점', jp: '天麩羅処ひらお 大名店 福岡市中央区大名2-6-20', area: 'tenjin', menu: '갓 튀긴 덴푸라 정식', hours: '일 10:30~20:30 · 주문 마감 20:00', photo: 'hakata-tempura', info: '텐진·다이묘 쪽에 이미 와 있을 때 고르기 좋아요. 백명점 선정과 영업시간은 다이묘점 기준입니다. 방문 전 매장 공지와 대기줄을 확인해요.', meals: ['lunch', 'dinner'], award: ['덴푸라 2025', `${awards}tempura/2025`], tabelog: 'https://tabelog.com/fukuoka/A4001/A400104/40046106/', official: 'https://www.hirao-foods.net/shop/', checked },
  uochu: { name: '우오추', jp: '田中田式海鮮食堂 魚忠 福岡市中央区今泉1-18-26', area: 'tenjin', menu: '익힌 생선 정식 · 차즈케', info: '후쿠오카시 안내 일요일 11:30~22:30 · 주문 마감 22:00. 익힌 생선 정식 위주로 확인.', meals: ['lunch', 'dinner'], official: 'https://umakamon.city.fukuoka.lg.jp/store/3568/', checked },
  yamanaka: { name: '모츠나베 야마나카 아카사카점', jp: '博多もつ鍋 やま中 赤坂店 福岡市中央区赤坂1-9-1', area: 'tenjin', menu: '미소 모츠나베', info: '공식 일요일 점심 12:00~14:00 · 저녁 16:00~23:00. 웹 예약 링크는 매장 페이지에서 확인.', meals: ['lunch', 'dinner'], tabelog: 'https://tabelog.com/fukuoka/A4001/A400104/40004383/', official: 'https://motsunabe-yamanaka.com/akasaka_/', checked },
  issou: { name: '하카타 잇소 하카타역 동쪽 본점', jp: '博多一双 博多駅東本店 福岡市博多区博多駅東3-1-6', area: 'hakata', menu: '진한 돈코츠 라멘', hours: '11:00~24:00 · 대기 확인', photo: 'hakata-ramen', info: '숙소가 하카타역 동쪽이면 편한 대안이에요. 후쿠오카시 매장 정보 기준 11:00~24:00이며, 일요일 영업과 재료 소진은 당일 확인해요.', meals: ['lunch', 'dinner'], award: ramen, tabelog: 'https://tabelog.com/fukuoka/A4001/A400101/40032701/', official: 'https://umakamon.city.fukuoka.lg.jp/store/18338/', checked },
  '16ku': { name: '프랑스과자 16구', jp: 'フランス菓子16区 福岡市中央区薬院4-20-10', area: 'tenjin', menu: '다쿠아즈', info: '야쿠인오도리 쪽 간식 후보. 12/6 영업과 포장 가능 여부는 공식 달력 확인.', meals: ['snack'], award: ['디저트 WEST 2023', `${awards}sweets_west/2023`], tabelog: 'https://tabelog.com/fukuoka/A4001/A400104/40000550/', official: 'https://www.16ku.jp/shop-info/', checked },
  shiroya: { name: '시로야 잇핀도리점', jp: 'シロヤ いっぴん通り店 福岡市博多区博多駅中央街1-1', area: 'hakata', menu: '연유 사니빵 · 오믈렛', hours: '08:00~21:00 · 품절 가능', photo: 'hakata-bread', info: '하카타역 안 잇핀도리에서 포장합니다. 짐을 맡긴 직후 동선을 늘리지 않고 살 수 있어요. 월요일 귀국 전 아침으로도 가능해요.', meals: ['brunch', 'snack'], award: bread, tabelog: 'https://tabelog.com/fukuoka/A4001/A400101/40038970/', official: 'https://shiroya-pan.com/store/', checked },
  hagakure: { name: '하가쿠레 우동', jp: '葉隠うどん 福岡市博多区博多駅南2-3-32', area: 'hakata', menu: '고보텐 우동 · 카시와메시', info: '일요일 휴무. 초안상 월요일 11:00 개점이라 13:00 귀국편 일정과 맞추기 어려움.', wish: true, award: udon, tabelog: 'https://tabelog.com/fukuoka/A4001/A400101/40004342/', checked },
  genki: { name: '하카타 겐키잇파이', jp: '博多元気一杯!! 福岡市博多区下呉服町4-31-1', area: 'kushida', menu: '크리미한 돈코츠 라멘', hours: '일 11:00~20:00 · 주문 마감 19:30', photo: 'hakata-ramen', info: '가와바타 북쪽 고후쿠마치 방향. 가게 밖 파란 양동이가 영업 표식으로 알려져 있어요. 여기도 대기가 생길 수 있어 줄을 보고 결정해요.', meals: ['lunch', 'dinner'], award: ramen, tabelog: 'https://tabelog.com/fukuoka/A4001/A400106/40000488/', checked },
  fullfull: { name: '더 풀풀 하카타', jp: 'THE FULL FULL HAKATA 福岡市博多区祇園町9-3', area: 'kushida', menu: '명란 프랑스', hours: '일 10:00~19:00', photo: 'hakata-bread', info: '구시다 신사로 가는 길에 빵을 포장할 수 있어요. 공식 화요일 휴무. 다코메카에서 기다리기보다 바로 신사 쪽으로 이동할 때 편해요.', meals: ['brunch', 'snack'], award: bread, tabelog: 'https://tabelog.com/fukuoka/A4001/A400101/40059101/', official: 'https://www.full-full.jp/shop/', checked },
  suzukake: { name: '스즈카케 하카타 본점', jp: '博多 鈴懸本店 福岡市博多区上川端町12-20', area: 'kushida', menu: '모나카 · 화과자 · 찻집', info: '공식 과자 판매 09:00~19:00 · 찻집 11:00~19:00. 가와바타 산책 중 간식 대안.', meals: ['snack'], official: 'https://www.suzukake.co.jp/shops/honten', checked },
  tenjosajiki: { name: '사보 텐조사시키', jp: '茶房 天井棧敷 亀の井別荘 由布院', area: 'yufuin', menu: '커피 · 디저트', info: '긴린코 쪽 찻집. 카페 매진 시 시간이 충분할 때만 고려하고, 영업·대기 여부 확인.', award: ['찻집 2026', `${awards}kissaten/2026`], official: 'https://www.kamenoi-bessou.jp/facility/cafe-bar/', checked },
  bspeak: { name: 'B-speak 유후인', jp: 'B-speak 大分県由布市湯布院町川上3040-2', area: 'yufuin', menu: 'P롤 생크림 롤케이크', hours: '10:00~17:00', photo: 'snacks', info: '역 쪽으로 돌아오면서 포장하기 좋아요. 오후에는 원하는 제품 재고를 확인하고, 생크림 제품은 매장 보관 안내를 따라 주세요.', official: 'https://b-speak.net/', checked },
  milch: { name: '유후인 밀히 본점', jp: '由布院ミルヒ本店 大分県由布市湯布院町川上3015-1', area: 'yufuin', menu: '갓 구운 케제쿠헨 치즈케이크', hours: '10:30~17:30', photo: 'snacks', info: '유후인 우유로 만든 작은 치즈케이크예요. 한 가지 고른다면 따뜻한 케제쿠헨을 추천해요. 카페 입장과 짐 회수에 여유가 있을 때 들릅니다.', official: 'https://www.milch-japan.co.jp/shops/', checked },
  korokke: { name: '금상 고로케 2호점', jp: '金賞コロッケ 2号店 大分県由布市湯布院町川上1079-8', area: 'yufuin', menu: '갓 튀긴 금상 고로케', hours: '09:00 개점 · 겨울 마감 확인', photo: 'snacks', info: '달지 않은 간식을 원할 때. 2호점은 유노츠보 거리변에 있어요. 주문 후 튀겨주는 가게라 줄이 길면 지나가고, 영업시간은 당일 확인하세요.', official: 'https://yunotubo.com/map/', checked },
  purindora: { name: '하나코지 키쿠야', jp: '御菓子司 花麹菊家 大分県由布市湯布院町川上1524-1', area: 'yufuin', menu: '푸딩을 넣은 도라야키 · 푸린도라', hours: '10:00~17:00', photo: 'snacks', info: '유노츠보 요코초 입구의 과자점이에요. 푸린도라를 포장하고, 밤에 먹을 거라면 제품의 냉장·섭취 안내를 확인하세요.', official: 'https://www.yufuin.org/', checked },
  'hotel-breakfast': { name: '호텔 조식', menu: '숙소 확정 후 선택', info: '조식 포함 여부와 공항 이동 전 이용 가능 시간을 확인하세요.' },
};
