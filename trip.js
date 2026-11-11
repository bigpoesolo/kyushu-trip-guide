export const days = [
  { date: '12/5 토', short: '유후인', title: '공항에서 유후인으로', description: '마메시바 카페 · 유노츠보 · 료칸', area: 'yufuin', warning: ['bus-out', '공항 환승 68분', '12:00 도착 예정 → 13:08 버스 출발'] },
  { date: '12/6 일', short: '후쿠오카', title: '하카타 크리스마스마켓', description: '마켓 중심으로 · 우동 점심 · 18:00 마코', area: 'hakata', warning: ['taxi-am', '아침 택시 미예약', '07:20 택시와 조기 체크아웃 사전 협의'] },
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
const mako = '焼鳥まこ 福岡市中央区薬院2-14-18 YAKUIN KZ LIFE BLD. 2F';
const makoBooking = ['마코 예약 안내 · TableCheck', 'https://www.tablecheck.com/ko/shops/yakitori-mako/reserve'];
const sofuren = '想夫恋 博多駅前店 福岡市博多区博多駅前3-16-2 宮原ビル1F';
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
    { id: 'shrine', start: '13:10', end: '13:35', title: '구시다 신사 · 가와바타', subtitle: '점심 뒤 짧게 · 마켓 시간을 우선하는 선택 일정', status: 'option', place: '櫛田神社 福岡', area: 'kushida' },
    { id: 'lunch', start: '12:15', end: '13:05', title: '점심 · 우동집 선택 중', subtitle: '카로노우론·다이치·가마키리 비교 · 미확정', status: 'plan', area: 'kushida', candidates: ['daichi', 'karo', 'kamakiri', 'genki', 'hirao', 'uochu', 'issou', 'umeyama', 'wakaba', 'kubocurry', 'gyozalee'], meal: 'lunch', detail: '일요일 점심은 우동을 먹고 싶다는 선호를 반영했으며 식당은 아직 미확정입니다. 우동 타이라와 하가쿠레는 일요일 휴무라 이날 후보에서 제외했어요. 다이치를 고르면 하카타역 근처 점심을 먼저 먹고 구시다 신사로 이동하는 순서가 편합니다.', fallback: ['우동집 대기·품절 시', '구시다 신사 근처면 카로노우론, 하카타역 근처면 다이치 우동 지하점, 텐진·다이묘로 넘어간 경우면 가마키리 우동의 줄을 비교해요. 가까운 곳부터 보되 무리한 왕복은 피합니다.'] },
    { id: 'canal', start: '13:35', end: '14:15', title: '캐널시티 짧게 둘러보기', subtitle: '선택 방문 · 14:30 호텔 휴식 목표', status: 'option', place: 'キャナルシティ博多', area: 'kushida', links: [['캐널시티 공식', 'https://canalcity.co.jp/']] },
    { id: 'hakata-hotel', start: '14:30', end: '15:30', title: '포르자 하카타구치 체크인 · 휴식', subtitle: '아고다 예약 확정 · 마켓 전 1시간 휴식', status: 'confirmed', booking: true, place: forza, area: 'hakata', links: [forzaOfficial, ['아고다 내 예약', 'https://www.agoda.com/account/bookings.html']], detail: '12/6~12/7 성인 2명·1박 예약이 확정됐어요. 체크인은 14:00부터, 체크아웃은 다음 날 11:00까지입니다. 마켓 관람 시간을 확보하려고 14:30 호텔 도착·15:30까지 휴식하는 계획으로 조정했어요. 예약 확정서와 결제·취소 조건은 아래 예약 정보와 관련 메일에서 확인하세요.' },
    { id: 'snack', start: '15:30', end: '15:45', title: '마켓·저녁 외출 준비', subtitle: '예약 화면·교통카드 준비 · 간식은 소량만', status: 'plan', area: 'hakata', place: forza, detail: '호텔에서 예약 화면과 교통카드를 챙긴 뒤 하카타역 광장으로 나갑니다. 마코 코스 전 간식은 소량만 먹고, 다른 빵집으로 우회하지 않아요.' },
    { id: 'market-before', start: '15:45', end: '17:05', title: '하카타역 크리스마스마켓', subtitle: '오늘의 메인 · 저녁 예약 전 여유 있게 구경', status: 'plan', place: '博多駅前広場', area: 'hakata', links: [['하카타역 행사 공식', 'https://christmas-advent.jp/fukuoka-hakata/']], detail: '하카타에서는 크리스마스마켓 관람이 메인입니다. 일요일은 12:00~23:00 운영하며 마지막 주문은 22:45입니다. 15:45부터 저녁 전까지 구경하고, 17:05에는 지하철로 마코에 출발해요. 밤 조명은 식사 후 다시 봅니다.' },
    { id: 'mako-transit', start: '17:05', end: '17:50', title: '하카타역 마켓 → 마코 · 지하철', subtitle: '나나쿠마선 하시모토 방면 · 야쿠인오도리 하차', status: 'plan', deadline: '17:05 마켓 출발 · 호텔 직행 시 17:15', area: 'tenjin', place: mako, detail: '기본은 마켓을 구경하다 17:05 하카타역 광장에서 출발하는 동선입니다. 마켓을 건너뛰고 호텔에서 바로 가면 17:15 포르자 출발을 목표로 해요. 하카타역에서 薬院(야쿠인)보다 한 정거장 더 가서 薬院大通(야쿠인오도리)에 내립니다. 대기·역내 이동에 여유를 둔 계획이며 특정 열차의 출발 시각을 확정한 것은 아닙니다.', fallback: ['지연되거나 길을 찾기 어려울 때', '예약은 18:00 동시 시작입니다. 17:50까지 도착하기 어려울 것 같으면 마코 092-214-7053으로 바로 연락해요. TableCheck 안내상 15분 이상 연락 없이 늦으면 취소 처리될 수 있습니다.'] },
    { id: 'mako-ready', start: '17:50', end: '18:00', title: '마코 도착 · 예약 확인', subtitle: '건물 2층 · 10분 먼저 도착 목표', status: 'plan', deadline: '18:00 식사 시작', area: 'tenjin', place: mako, links: [makoBooking], detail: '예약 확정 화면·메일을 준비하고 예약자 이름을 보여줘요. 주소는 薬院2-14-18 YAKUIN KZ LIFE BLD. 2F입니다. 전화번호는 092-214-7053입니다.' },
    { id: 'dinner', start: '18:00', end: '20:30', title: '마코 · 야키토리 오마카세', subtitle: '12/6 일요일 18:00 예약 완료 · 예약자 확인', status: 'confirmed', fixed: true, food: 'mako', area: 'tenjin', place: mako, links: [makoBooking], detail: '11/12 예약자가 일요일 18:00 예약 완료를 확인했어요. 예약 확정 메일 원문은 아직 확인하지 못했습니다. 종료 20:30은 매장 안내의 좌석 이용 2시간 30분을 반영한 계획 시각입니다. 공개 오마카세 요금은 1인 ¥8,800 + 서비스료 10%(¥9,680)이며 음료·마무리 식사는 별도예요. 실제 예약 인원·좌석·코스·취소 조건은 확정서 원문 확인이 필요합니다.' },
    { id: 'mako-return', start: '20:30', end: '20:55', title: '마코 → 소후렌 · 지하철 이동', subtitle: '하카타 방면 · 구시다진자마에역에서 하차', status: 'plan', area: 'hakata', place: sofuren, detail: '마코 식사가 20:30쯤 끝나고 아직 배가 고프면 야식을 먹으러 갑니다. 야쿠인오도리역에서 나나쿠마선 하카타 방면을 타고 구시다진자마에역에서 내려 소후렌으로 걸어요. 야식은 예약한 식사가 아니므로 입장 가능 시간·식욕에 따라 건너뜁니다.' },
    { id: 'night-food', start: '20:55', end: '21:25', title: '야식 · 소후렌 하카타 에키마에점', subtitle: '히타 야키소바 · 저장 완료 · 영업·식욕에 따라', status: 'option', food: 'sofuren', area: 'hakata', place: sofuren, deadline: '공식 21:30 마감 · 마지막 주문 확인', links: [['소후렌 하카타 에키마에 공식', 'https://www.sofuren.com/stores/hakata-ekimae']], detail: '일요일 야식으로 선택한 곳을 저장했어요. 공식 영업시간은 11:00~21:30, 목요일 휴무이며 공식 페이지에 마지막 주문 시간은 따로 없습니다. 20:55 도착을 목표로 하되 방문 전 입장·주문 가능 여부를 확인해요. 예약 없이 방문하는 선택 일정입니다.', fallback: ['마코가 늦어지거나 소후렌이 마감했을 때', '야식을 위해 마코 코스를 서둘러 끝내지 않아요. 소후렌을 건너뛰고 하카타역 마켓을 짧게 보거나 호텔로 돌아갑니다. 배가 고프면 호텔 근처 영업 중인 편의점에서 간단히 포장해요.'] },
    { id: 'market', start: '21:35', end: '22:30', title: '하카타역 크리스마스마켓 · 야경', subtitle: '야식 생략 시 20:55부터 · 23:00까지 운영', status: 'plan', place: '博多駅前広場', area: 'hakata', links: [['하카타역 행사 공식', 'https://christmas-advent.jp/fukuoka-hakata/']], detail: '밤 마켓을 충분히 보는 일정입니다. 소후렌 야식을 먹으면 21:35쯤 광장으로 돌아오고, 야식을 건너뛰면 지하철로 하카타역까지 바로 와서 20:55쯤부터 구경할 수 있어요. 22:30쯤 호텔로 출발하되 피곤하면 일찍 쉬어도 됩니다. 일요일 23:00 마감·마지막 주문 22:45입니다.' },
    { id: 'rest', start: '22:40', timeLabel: '22:40 전후', title: '포르자 복귀 · 휴식', status: 'plan', place: forza, area: 'hakata' },
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
  { id: 'mako-mail', event: 'dinner', title: '마코 예약 확정 메일 확인', info: '12/6 일요일 18:00 예약 완료 · 확정서의 인원·좌석·코스 조건은 원문 확인 대기' },
  { id: 'choose-yufuin-snack', event: 'shopping', title: '토요일 유후인 간식 고르기', info: '마메시바 입장과 짐 회수에 여유가 있을 때 먹을 한두 곳' },
  { id: 'choose-udon', event: 'lunch', title: '일요일 점심 우동집 고르기', info: '카로노우론·다이치·가마키리 비교 · 타이라·하가쿠레는 일요일 휴무' },
  { id: 'sofuren-order', event: 'night-food', title: '소후렌 마지막 주문 시간 확인', info: '야식 장소 저장 완료 · 공식 21:30 마감, 마지막 주문은 미공개' },
  { id: 'airport', event: 'airport-return', title: '귀국일 공항 이동수단 정하기', info: '후쿠오카공항 국제선 터미널' },
];

const awards = 'https://award.tabelog.com/hyakumeiten/';
const bread = ['빵 WEST 2026', `${awards}bread_west/2026`];
const udon = ['우동 WEST 2024', `${awards}udon_west/2024`];
const ramen = ['라멘 WEST 2025', `${awards}ramen_west/2025`];
const unagi = ['장어 2026', `${awards}unagi/2026`];
const checked = '2026.11.10';
const foodChecked = '2026.11.11';

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
  mako: {
    name: '야키토리 마코 · 예약 완료', jp: mako, area: 'tenjin', menu: '일품요리와 부위별 닭꼬치 오마카세', photo: 'food-mako', meals: ['dinner'],
    hours: '12/6 일 18:00 예약 완료 · 좌석 이용 2시간 30분', rating: 3.91, reviewCount: 225, added: true, checked: '2026.11.12',
    budget: '공개 코스 1인 ¥8,800 + 서비스료 10% = ¥9,680 · 음료·마무리 식사 별도',
    info: '12/6 일요일 18:00 예약 완료를 예약자가 확인했어요. 메일 원문은 확인 대기입니다. 현재 코스의 고정 세부 메뉴는 공개되지 않았으며, 취재 사례에는 닭 수프·타타키·부위별 꼬치·채소꼬치가 나옵니다. 공개 예약 안내의 취소료는 당일·전날 100%, 3일 이내 50%이며 실제 예약 조건은 확정서를 우선해요.',
    reviewNote: '2026 야키토리 WEST 백명점. 흑사츠마닭·고쇼닭·어린 닭을 부위별로 사용하고, 일품요리와 꼬치를 순서대로 제공하는 코스형 식당입니다. 메뉴는 방문일 수급에 따라 달라져요.',
    route: '기본은 17:05 하카타역 마켓 출발(호텔 직행 시 17:15 포르자 출발) → 나나쿠마선 하시모토 방면 → 5정거장 뒤 야쿠인오도리역 → 1번 출구에서 도보 약 3분. 17:45~17:50 도착 목표. 가는 편 1인 ¥260. 소후렌을 들를 때는 복귀 시 구시다진자마에역에서 내려요.',
    award: ['야키토리 WEST 2026', `${awards}yakitori_west/2026/`], tabelog: 'https://tabelog.com/fukuoka/A4001/A400104/40059074/', official: 'https://www.tablecheck.com/ja/yakitori-mako', booking: 'https://www.tablecheck.com/ko/shops/yakitori-mako/reserve', evidenceLinks: [['메뉴 구성·현지 취재', 'https://rkb.jp/contents/202608/204338/']],
  },
  taka: {
    name: '야키토리 타카', jp: '焼き鳥 貴 福岡市中央区高砂2-13-7 ミカミビル1F', area: 'tenjin', menu: '오마카세 닭꼬치 · 숯불구이', meals: ['dinner'],
    hours: '일 18:00~23:00 · 부정기 휴무 · 재료 소진 시 종료', rating: 3.73, reviewCount: 285, added: true, checked: foodChecked,
    budget: '후기 기준 1인 ¥10,000~14,999 전후 · 서비스료 5% 별도',
    info: '평가가 좋은 예약형 야키토리 후보. 12석 규모라 현장 대기 대안보다 미리 자리를 확인할 특별식 후보예요. 이번 저녁은 마코 예약으로 확정했으며, 타카는 비교용 후보로 남겨둡니다.',
    reviewNote: '일본어 재방문 후기에서 숯 향·타레·야채의 익힘과 응대를 좋게 평가했어요. 2026년 후기에는 순서대로 나오는 오마카세 구이의 만족도가 보입니다. 평가가 높아도 예약과 이동 부담은 있어요.',
    route: '야쿠인보다 남쪽인 다카사고. 하카타·나카스 기본 동선에서 벗어나므로 이곳을 고르면 저녁 목적지 자체를 바꾸고 식사 시간을 넉넉히 잡아요.',
    award: ['야키토리 WEST 2026', `${awards}yakitori_west/2026/`], tabelog: 'https://tabelog.com/fukuoka/A4001/A400104/40033935/', official: 'https://yakitori-taka-fukuoka.studio.site/',
  },
  kamakiri: {
    name: '가마키리 우동', jp: '釜喜利うどん 福岡市中央区大名1-7-8', area: 'tenjin', menu: '고보텐 우동 · 스다치 우동', meals: ['lunch', 'dinner'],
    hours: '일 11:30~21:00 · 주문 마감 20:30 · 화·수 휴무', rating: 3.70, reviewCount: 1263, added: true, checked: foodChecked,
    budget: '1인 ¥1,000~1,999', info: '일요일에 못 가는 하가쿠레를 대신할 우동 후보예요. 예약 불가·대기가 생기는 인기점이며 점심부터 저녁까지 중간 휴식 없이 운영합니다. 줄이 짧다고 보장할 수 있는 대안은 아니에요.',
    reviewNote: '1,200명 이상이 후기를 남겼고, 일본어 후기에서 면과 다시의 균형을 좋게 평가해요. 공식 등록 정보도 자가제면과 가쓰오·다시마 육수를 소개합니다.',
    route: '다이묘·아카사카를 둘러볼 때 적합해요. 구시다 신사 옆 대기줄에서 즉시 갈아타기에는 거리가 있어 텐진으로 넘어가기로 했을 때 고릅니다.',
    award: udon, tabelog: 'https://tabelog.com/fukuoka/A4001/A400104/40034851/',
  },
  umeyama: {
    name: '우메야마 텟페이 식당 본점', jp: '梅山鉄平食堂 本店 福岡市中央区渡辺通3-6-1', area: 'tenjin', menu: '생선 조림·구이·튀김 정식', meals: ['lunch', 'dinner'],
    hours: '일 11:30~21:00 · 주문 마감 20:30 · 수 휴무', rating: 3.69, reviewCount: 948, added: true, checked: foodChecked,
    budget: '1인 ¥1,000~1,999 중심 · 생선에 따라 추가', info: '라멘·장어 대신 평소 먹는 생선 정식을 원할 때 우선 추천. 제철 생선 조림·구이·튀김 중 당일 메뉴를 보고 골라요. 예약은 받지 않으며 중간 휴식 없이 영업합니다.',
    reviewNote: '2026년 10월 일본어 후기에서 생선 조림과 밥의 조합을 호평했고, 재방문 후기도 확인됩니다. 일요일 개점 전 대기와 음식 제공이 느리다는 후기도 있어 회전이 빠른 가게로 보지는 않아요.',
    route: '와타나베도리역 근처라 텐진 남쪽·야쿠인 일정과 묶어요. 구시다·캐널시티 기본 점심 동선을 유지한다면 우선순위는 낮춥니다.',
    award: ['식당 2026', `${awards}shokudo/2026/`], tabelog: 'https://tabelog.com/fukuoka/A4001/A400103/40018886/', official: 'https://umeyamateppei.com/',
  },
  toriden: {
    name: '토리덴 하카타 본점', jp: 'とり田 博多本店 福岡市博多区下川端町10-5', area: 'kushida', menu: '미즈타키 · 닭 육수 전골 · 마무리 죽', photo: 'food-toriden', meals: ['lunch', 'dinner'],
    hours: '일 11:30~23:00 · 주문 마감 22:00 · 부정기 휴무', rating: 3.67, reviewCount: 982, added: true, checked: foodChecked,
    budget: '후기·게재 예산: 점심 ¥5,000~5,999 / 저녁 ¥8,000~9,999', info: '아직 후보에 없던 하카타 대표 음식 미즈타키를 먹을 곳. 토리덴 탄탄멘 가게와 다른 물닭전골 본점입니다. 예약 가능하며 전골 식사 시간을 확인한 뒤 뒤의 일정을 여유 있게 잡아요.',
    reviewNote: '2026년 일본어 후기에서 진한 닭 육수, 마지막 죽, 직원이 전골을 설명하고 조리해 주는 서비스를 좋게 평가했어요. 일부 후기는 가격 대비 만족도와 2층 분위기에 호불호가 있습니다.',
    route: '가와바타 상점가 북쪽·하카타자 뒤편. 구시다 신사와 같은 권역이지만 점심 1시간 안에 전골을 서두르기보다 예약한 저녁으로 넣기 좋아요.',
    tabelog: 'https://tabelog.com/fukuoka/A4001/A400102/40037654/', official: 'https://toriden.com/',
  },
  wakaba: {
    name: '돈카츠 와카바 텐진 본점', jp: 'とんかつ わか葉 天神本店 福岡市中央区天神1-15-36', area: 'tenjin', menu: '흰 튀김옷의 히레·로스 돈카츠 정식', photo: 'food-wakaba', meals: ['lunch', 'dinner'],
    hours: '일 10:30~ / 저녁 17:00~ · 마감 안내 차이 확인', rating: 3.66, reviewCount: 887, added: true, checked: foodChecked,
    budget: '타베로그 게재 예산 1인 ¥1,000~1,999', info: '저온 조리로 얇고 흰 튀김옷과 분홍빛 고기가 특징인 돈카츠집. 원하는 익힘이 있으면 주문 전 문의해요. 타베로그와 공식 사이트의 마감 안내가 달라 점심 14:30·저녁 19:45보다 일찍 방문하고 당일 마감을 확인합니다.',
    reviewNote: '일본어 후기에서 부드러운 히레와 얇은 튀김옷을 높게 평가해요. 주문 후 조리에 약 15~20분 걸렸다는 후기가 있어 대기가 없더라도 식사 시간을 남겨둡니다. 지쿠시구치 지점의 점수·수상과 구분했어요.',
    route: '텐진 북동쪽·아크로스와 니시나카스 근처. 다이묘까지 가지 않고 텐진·나카스 산책과 묶을 수 있어요.',
    award: ['돈카츠 2026', `${awards}tonkatsu/2026/`], tabelog: 'https://tabelog.com/fukuoka/A4001/A400103/40050758/', official: 'https://foryou-group.co.jp/brandfc/fukuoka/entry-83.html',
  },
  gyozalee: {
    name: '교자 리 · 餃子李', jp: '餃子李 福岡市中央区薬院3-1-11 福海ビル1F', area: 'tenjin', menu: '큰 군만두·물만두 · 볶음밥·중식', photo: 'food-gyozalee', meals: ['lunch', 'dinner'],
    hours: '일 11:30~14:30 / 17:00~23:00 · 저녁 주문 마감 21:50 · 화 휴무', rating: 3.66, reviewCount: 1748, added: true, checked: foodChecked,
    budget: '점심 ¥1,000~1,999 / 저녁 후기 기준 ¥3,000~3,999', info: '호운테이의 작은 하카타 교자와 다른, 큼직한 만두와 중식을 나눠 먹는 후보예요. 공식 사이트 기준 화요일 휴무. 타베로그에 예약은 4인 이상, 현금 결제로 기재되어 있어 두 분은 현장 대기·현금 준비를 기준으로 봅니다.',
    reviewNote: '1,700명 이상이 후기를 남긴 오래된 중식점. 일본어 후기에서 군만두·물만두·볶음밥 조합이 자주 등장해요. 양이 큰 만두를 둘이 나눠 먹는 식사로 골랐습니다.',
    route: '야쿠인역 근처라 16구·야마미치 쪽으로 동선을 바꿀 때 좋아요. 나카스에서 걸어서 바로 옮기는 짧은 대안은 아니에요.',
    award: ['중국요리 WEST 2026', `${awards}chinese_west/2026/`], tabelog: 'https://tabelog.com/fukuoka/A4001/A400104/40000194/', official: 'https://gyouza-lee.com/',
  },
  ichifuji: {
    name: '모츠나베 이치후지 하카타점', jp: 'もつ鍋 一藤 博多店 福岡市博多区博多駅前2-4-16', area: 'hakata', menu: '미소 모츠나베 · 짬뽕면 마무리', meals: ['dinner'],
    hours: '일 17:00~23:00 · 주문 마감 22:30', rating: 3.56, reviewCount: 667, added: true, checked: foodChecked,
    budget: '식사 코스 ¥4,000부터 · 주문·음료에 따라 추가 · 오토시 ¥495 안내', info: '야마나카 아카사카점까지 가지 않고 포르자와 같은 하카타구치 권역에서 모츠나베를 먹는 대안. 예약 가능하며 2인 개인실 요청은 전화로 받습니다. 이 가게의 12/6 자리 확보 여부는 아직 확인하지 않았어요.',
    reviewNote: '2026년 일본어 후기에서 미소 육수와 곱창 식감을 좋게 평가했어요. 개점 후 곧 만석이었다는 후기도 있어 큰 가게라도 예약 확인이 먼저입니다. 매우 높은 점수만으로 뽑은 곳이 아니라 동선과 후기 규모를 함께 본 후보예요.',
    route: '포르자 체크인 후 하카타역 서쪽에서 저녁을 먹고 역 광장 크리스마스마켓으로 이어가기 편한 선택입니다.',
    tabelog: 'https://tabelog.com/fukuoka/A4001/A400101/40040770/', official: 'https://www.ichifuji-f.jp/hakata/',
  },
  kubocurry: {
    name: '쿠보카레 다이묘점', jp: 'クボカリー 大名店 福岡市中央区大名1-4-23 ロワールマンション大名101', area: 'tenjin', menu: '스파이스 카레 플레이트 · 치킨 비리야니', meals: ['lunch'],
    hours: '일 11:00~15:30 안내 · 휴무는 공식 Instagram 확인', rating: 3.56, reviewCount: 442, added: true, checked: foodChecked,
    budget: '1인 ¥1,000~1,999 · 후기 플레이트·비리야니 ¥1,500 전후', info: '일본식 면·전골 대신 스파이스 카레를 먹고 싶을 때. 점심 예약 불가, 13석 규모라 줄이 생길 수 있어요. 현행 점심 영업을 기준으로 넣었으며 과거 저녁 영업 후기를 근거로 저녁 후보에 넣지 않았습니다.',
    reviewNote: '타베로그 일본어 후기에서 비리야니와 카레 플레이트를 호평하고, Retty에는 여러 차례 방문한 후기와 식권 주문 방식이 확인돼요. 지역 음식 매체 UMAGA도 후쿠오카 스파이스 카레의 대표점으로 소개합니다.',
    route: '다이묘·아카사카 쇼핑을 점심부터 할 때 선택해요. 캐널시티 점심 동선에서 즉시 이동하는 대안보다는 텐진 중심으로 계획을 바꿀 때 적합합니다.',
    tabelog: 'https://tabelog.com/fukuoka/A4001/A400104/40050019/', official: 'https://www.instagram.com/kubocurry_daimyo/', evidenceLinks: [['일본어 재방문 후기', 'https://retty.me/area/PRE40/ARE122/SUB12301/100001444750/'], ['지역 음식 매체 UMAGA', 'https://umaga.net/store/47035/']],
  },
  hamadaya: {
    name: '미즈타키 하마다야 본점', jp: '博多水たき濱田屋 本店 福岡市博多区住吉1-1-9 RJRプレシア博多201', area: 'kushida', menu: '닭 육수 미즈타키 · 면 또는 죽', photo: 'food-hamadaya', meals: ['dinner'],
    hours: '일 11:30~15:00 / 17:00~22:00 · 주문 마감 14:00 / 21:00 · 부정기 휴무', rating: 3.55, reviewCount: 430, added: true, checked: foodChecked,
    budget: '공식 물닭전골 세트 1인 ¥3,800 · 2인부터 주문 / 코스 ¥5,200', info: '토리덴보다 부담을 낮추고 캐널시티 옆에서 물닭전골을 먹는 대안. 본점의 실제 주소와 영업시간을 확인했으며, 비슷한 이름의 덴야마치점과 구분해요. 예약 가능합니다.',
    reviewNote: '타베로그 3.55·후기 430명 규모를 확인했어요. 아주 높은 점수보다는 투명한 닭 육수, 공식 세트 가격과 캐널시티 동선을 함께 고려해 넣었습니다. Hot Restaurant 선정과 백명점은 구분합니다.',
    route: '캐널시티 이스트빌딩 쪽·하카타역 하카타구치에서 공식 도보 약 8분. 저녁을 먹은 뒤 하카타역 광장으로 돌아오기 편해요.',
    tabelog: 'https://tabelog.com/fukuoka/A4001/A400101/40044969/', official: 'https://mizutaki-hamadaya.jp/honten/',
  },
  sofuren: {
    name: '소후렌 하카타 에키마에점', jp: sofuren, area: 'hakata', menu: '히타 야키소바 · 바삭하게 구운 면', photo: 'food-sofuren', checked: '2026.11.12',
    hours: '공식 11:00~21:30 · 목요일 휴무 · 마지막 주문 미공개',
    info: '일요일 야식으로 저장한 식당입니다. 마코 식사 후 구시다진자마에역에서 내려 도보 약 3~4분. 20:55 도착을 목표로 하되 입장·주문 가능 여부를 먼저 확인해요. 공식 홈페이지는 21:30 마감, 일부 예약 사이트는 22:00 마감·21:30 마지막 주문으로 달라 늦은 시간을 보장하지 않습니다. 하카타역에키마에 지점이며 다른 지점과 구분해요.',
    tabelog: 'https://tabelog.com/fukuoka/A4001/A400101/40065140/', official: 'https://www.sofuren.com/stores/hakata-ekimae',
  },
  daichi: {
    name: '다이치 우동 하카타역 지하점', jp: '大地のうどん 博多駅ちかてん 福岡市博多区博多駅前2-1-1 福岡朝日ビルB2F', area: 'hakata', menu: '큰 우엉튀김 우동 · 고기우엉 우동', photo: 'food-daichi', meals: ['lunch'], rating: 3.56, reviewCount: 2212, added: true, checked: '2026.11.12',
    hours: '공식 10:30~16:00 / 17:00~21:00 · 연말연시 외 무휴', budget: '후기 기준 1인 ¥1,000 미만 중심 · 실제 메뉴 가격 확인',
    info: '일요일 우동 점심의 새 후보입니다. 포르자와 같은 하카타구치 쪽 아사히빌딩 지하 2층. 예약 불가·현금 식권 기준이며 줄이 생길 수 있어요. 타베로그의 개점 10:00 표기와 공식 10:30 표기가 달라 공식 시간을 기준으로 넣었습니다. 백명점 표시는 지점별로 구분하며 이 지점에는 붙이지 않았어요.',
    reviewNote: '2,200명 이상의 후기가 있는 하카타역 근처 인기점. 큰 우엉튀김과 면의 조합을 소개하는 일본어 후기가 많고, 포르자에서 먼 곳으로 이동하지 않아도 되는 점이 장점이에요.',
    route: '다이치를 고르면 하카타역 근처에서 점심을 먼저 먹고 구시다 신사·캐널시티로 이동하는 순서가 편해요. 점심 식당은 아직 미확정이며 하카타역 마켓 관람이 메인인 일정입니다.',
    tabelog: 'https://tabelog.com/fukuoka/A4001/A400101/40035066/', official: 'https://daichinoudon.pro/?p=15',
  },
  taira: {
    name: '우동 타이라 · 일요일 휴무', jp: 'うどん平 福岡市博多区住吉5-10-7 第3住吉ハイツ1F', area: 'hakata', menu: '고기우엉 우동 · 부드럽고 쫄깃한 자가제면', checked: '2026.11.12',
    hours: '월~토 11:00~15:00 · 주문 마감 14:30 · 일·공휴일 휴무',
    info: '타베로그 3.69·후기 975명, 우동 WEST 백명점 2024에 선정된 유명점입니다. 일요일 휴무라 12/6 점심 후보에서는 제외했어요. 12/7은 11시 개점이 공항 이동 뒤라 이번 여행에 무리해서 넣지 않습니다. 비교·다음 여행 참고용으로 남겨둬요.',
    award: udon, tabelog: 'https://tabelog.com/fukuoka/A4001/A400101/40052349/',
  },
  'hotel-breakfast': { name: '호텔 조식', menu: '숙소 확정 후 선택', info: '조식 포함 여부와 공항 이동 전 이용 가능 시간을 확인하세요.' },
};

export const foodGenres = {
  noodles: { label: '우동·라멘·야키소바', ids: ['karo', 'daichi', 'taira', 'issou', 'hagakure', 'genki', 'kamakiri', 'sofuren'] },
  rice: { label: '정식·덮밥', ids: ['yoshizuka', 'yamamichi', 'hirao', 'uochu', 'umeyama', 'wakaba'] },
  hotpot: { label: '전골', ids: ['yamanaka', 'toriden', 'hamadaya', 'ichifuji'] },
  skewers: { label: '야키토리', ids: ['mako', 'taka'] },
  dumplings: { label: '교자·중식', ids: ['hountei', 'gyozalee'] },
  curry: { label: '카레', ids: ['kubocurry'] },
  bread: { label: '빵', ids: ['dacomecca', 'painstock', 'shiroya', 'fullfull'] },
  snacks: { label: '간식·카페', ids: ['16ku', 'suzukake', 'tenjosajiki', 'bspeak', 'milch', 'korokke', 'purindora'] },
};

export const savedPlaces = [
  { name: '야도야 오오하시', kind: '숙소', status: 'confirmed', label: '숙박 예약 확정', event: 'ryokan', place: ryokan, mode: 'driving', icon: 'hotel', when: '12/5 토 → 12/6 일', note: '17:00~17:10 도착 목표 · 17:30 체크인 마감. 역 픽업이 기본입니다.' },
  { name: '포르자 하카타구치', kind: '숙소', status: 'confirmed', label: '숙박 예약 확정', event: 'hakata-hotel', place: forza, mode: 'walking', icon: 'hotel', when: '12/6 일 → 12/7 월', note: '하카타역 서쪽 하카타구치 지점. 지쿠시구치 지점과 구분해요.' },
  { name: '야키토리 마코', kind: '식당', status: 'confirmed', label: '18:00 예약 완료', event: 'dinner', place: mako, mode: 'transit', icon: 'food', when: '12/6 일 18:00', note: '17:05 마켓 출발 · 호텔 직행 시 17:15. 야쿠인오도리역 1번 출구. 예약자 확인 기준이며 메일 원문은 대기 중입니다.' },
  { name: '소후렌 하카타 에키마에점', kind: '식당', status: 'plan', label: '야식 저장 완료 · 미예약', event: 'night-food', place: sofuren, mode: 'walking', icon: 'bowl', when: '12/6 일 20:55 도착 목표 · 선택 방문', note: '공식 21:30 마감. 마코 뒤 구시다진자마에역 하차 · 마지막 주문 확인이 필요해요.' },
  { name: '하카타역 크리스마스마켓', kind: '메인 관광', status: 'plan', label: '일요일 메인 · 입장 무료', event: 'market-before', place: '博多駅前広場', mode: 'walking', icon: 'sparkle', when: '12/6 일 15:45~17:05 · 식사 후 야경', note: '일요일 12:00~23:00, 마지막 주문 22:45. 마켓을 두 차례 보고 포르자로 걸어 돌아와요.' },
];

export const foodDecisions = [
  { event: 'shopping', title: '토요일 유후인 간식', label: '선택 중', status: 'todo', note: '마메시바·짐 회수 시간에 맞춰 한두 곳 고르기' },
  { event: 'lunch', title: '일요일 점심 · 우동', label: '선택 중', status: 'todo', note: '카로노우론·다이치·가마키리 비교 · 타이라는 일요일 휴무' },
  { event: 'night-food', title: '일요일 야식 · 소후렌', label: '저장 완료', status: 'plan', note: '마코 식사 종료·입장 가능 시간에 따라 방문' },
];
