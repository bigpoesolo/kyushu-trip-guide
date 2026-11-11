const commons = 'https://commons.wikimedia.org/wiki/File:';
const licenses = 'https://creativecommons.org/licenses/';
const photo = (file, caption, author, original, license, licensePath) => ({
  file: `photo-${file}.webp`, caption, author, source: `${commons}${original}`, license, licenseUrl: `${licenses}${licensePath}/`,
});

export const photos = {
  'food-sofuren': { file: 'photo-food-sofuren.webp', caption: '소후렌 하카타 에키마에점 외관 · 공식 사진', author: '소후렌', source: 'https://www.sofuren.com/stores/hakata-ekimae' },
  'food-daichi': { file: 'photo-food-daichi.jpg', caption: '다이치 우동 하카타역 지하점 내부 · 공식 사진', author: '다이치 우동', source: 'https://daichinoudon.pro/?p=15' },
  'food-mako': { file: 'photo-food-mako.jpg', caption: '마코 야키토리 코스 예시 · TableCheck 매장 제공 사진', author: '야키토리 마코', source: 'https://www.tablecheck.com/ja/yakitori-mako' },
  'food-toriden': { file: 'photo-food-toriden.jpg', caption: '토리덴 미즈타키 메뉴 예시 · 공식 사진', author: '토리덴', source: 'https://toriden.com/' },
  'food-gyozalee': { file: 'photo-food-gyozalee.png', caption: '교자 리 군만두 · 공식 사진', author: '교자 리', source: 'https://gyouza-lee.com/' },
  'food-hamadaya': { file: 'photo-food-hamadaya.jpg', caption: '하마다야 코스 구성 예시 · 공식 사진', author: '하마다야', source: 'https://mizutaki-hamadaya.jp/honten/' },
  'food-wakaba': { file: 'photo-food-wakaba.png', caption: '돈카츠 와카바 텐진 본점 외관 · 공식 사진', author: '와카바', source: 'https://foryou-group.co.jp/brandfc/fukuoka/entry-83.html' },
  forza: { file: 'photo-forza.webp', caption: '리프레시 더블 객실 예시 · 공식 사진', author: '포르자 하카타구치', source: 'https://www.hotelforza.jp/hakataguchi/rooms/refresh-double.php' },
  yufuin: { file: 'yufuin-winter.webp', caption: '유후인 겨울 풍경 · 생성 이미지' },
  shiba: { file: 'photo-mameshiba.webp', caption: '마메시바 카페 분위기 · 생성 이미지' },
  snacks: { file: 'photo-street-snacks.webp', caption: '유후인 길거리 간식 예시 · 생성 이미지' },
  night: { file: 'photo-night-snacks.webp', caption: '료칸에서 먹을 야식 예시 · 생성 이미지' },
  station: photo('yufuin-station', '유후인역 외관', 'inunami', 'Yufuin_Station_exterior_2022-09-10.jpg', 'CC BY 2.0', 'by/2.0'),
  street: photo('yunotsubo', '유노츠보 요코초', 'そらみみ', 'Yunotsubo-Yokocho_in_Yufuin_Hot_Spring.JPG', 'CC BY-SA 4.0', 'by-sa/4.0'),
  airport: photo('airport', '후쿠오카공항 국제선 출국층', 'ERIC SALARD', 'Fukuoka_Airport_FUK_international_departures_2025-03-30.jpg', 'CC BY-SA 2.0', 'by-sa/2.0'),
  hakata: photo('hakata', '하카타역 지쿠시 출구 쪽', 'そらみみ', 'Hakata_Station_20180306.jpg', 'CC BY-SA 4.0', 'by-sa/4.0'),
  kushida: photo('kushida', '구시다 신사의 첫 도리이', 'STA3816', 'Kushida-jinja_Ichi_no_Torii.jpg', 'CC BY-SA 4.0', 'by-sa/4.0'),
  'hakata-bread': { file: 'photo-hakata-bread.webp', caption: '하카타 베이커리 메뉴 예시 · 생성 이미지' },
  'hakata-ramen': { file: 'photo-hakata-ramen.webp', caption: '하카타 돈코츠 라멘 예시 · 생성 이미지' },
  'hakata-tempura': { file: 'photo-hakata-tempura.webp', caption: '덴푸라 정식 예시 · 생성 이미지' },
  'hakata-gyoza': { file: 'photo-hakata-gyoza.webp', caption: '하카타 한입 교자 예시 · 생성 이미지' },
  'hakata-unagi': { file: 'photo-hakata-unagi.webp', caption: '장어덮밥 예시 · 생성 이미지' },
};

const photoGroups = {
  airport: ['flight-out', 'arrival', 'platform', 'bus-out', 'airport-return', 'airport-arrival', 'depart', 'flight-back'],
  station: ['bags', 'walk-back', 'collect', 'ryokan-ride', 'taxi-am', 'bus-ready'],
  street: ['walk-cafe', 'shopping'],
  shiba: ['shiba'],
  night: ['late-snack'],
  yufuin: ['ryokan', 'sukiyaki', 'bath', 'early'],
  kushida: ['shrine', 'lunch', 'canal'],
  hakata: ['bus-back', 'hakata-bags', 'brunch', 'market-before', 'market', 'breakfast', 'mako-transit', 'mako-return'],
  forza: ['hakata-hotel', 'rest', 'checkout', 'snack'],
  'food-mako': ['mako-ready', 'dinner'],
  'food-sofuren': ['night-food'],
};

export const eventPhotos = Object.fromEntries(Object.entries(photoGroups).flatMap(([key, ids]) => ids.map(id => [id, photos[key]])));

const station = 'JR 由布院駅 大分県由布市';
const cafe = '由布院豆柴カフェ 大分県由布市湯布院町川上1507-2';
const ryokan = '由布の彩 YADOYA おおはし 大分県由布市湯布院町川北1235';
const hakataStation = 'JR 博多駅 福岡';
const forza = 'ホテルフォルツァ博多駅博多口 福岡市博多区博多駅前2-1-15';
const mako = '焼鳥まこ 福岡市中央区薬院2-14-18 YAKUIN KZ LIFE BLD. 2F';
const sofuren = '想夫恋 博多駅前店 福岡市博多区博多駅前3-16-2 宮原ビル1F';
const kushida = '櫛田神社 福岡';
const roomPhotos = ['료칸 로프트 객실 사진·시설', 'https://yufunoirodori-oohashi.jp/room'];
const airportMap = ['국제선 층별 안내도', 'https://www.fukuoka-airport.jp/assets/map/file/fukuoka_airport_int_map.pdf'];

export const guides = {
  platform: { directions: '국제선 1층 도착 구역에서 고속버스 표지판을 따라 이동합니다. 승차장은 당일 안내판과 예약 내역을 확인하세요.', links: [airportMap] },
  'bus-out': { directions: '후쿠오카공항 국제선 1층 고속버스 승차 구역 → 유후인역 앞 버스센터.', links: [airportMap] },
  bags: { directions: '버스센터에서 JR 유후인역 쪽으로 걸어가면 역 옆 관광안내센터 1층에 유후인 칫키가 있어요.' },
  'walk-cafe': { origin: station, mode: 'walking', directions: '역 앞에서 유후인 거리를 따라 동쪽으로 이동합니다. 카페는 유후마치야 미도리(由布町屋 翠) 2층이에요.' },
  shiba: { origin: station, mode: 'walking', directions: '유후인역에서 도보 약 15~20분 예상. 유후마치야 미도리(由布町屋 翠) 2층에서 당일 입장권을 구매합니다.', related: ['shopping'] },
  shopping: {
    origin: cafe, mode: 'walking',
    directions: '카페에서 유노츠보 거리를 지나 역 방향으로 돌아갑니다. 역으로 되돌아가면서 줄이 짧은 한 곳을 골라요.',
    food: ['milch', 'bspeak', 'korokke', 'purindora'],
    related: ['late-snack'],
  },
  'walk-back': { origin: cafe, mode: 'walking', directions: '역 앞 관광안내센터의 짐 보관소로 돌아옵니다. 야식은 줄이 짧고 짐 회수에 여유가 있을 때만 사세요.', related: ['late-snack'] },
  collect: { directions: '역 옆 관광안내센터 1층에서 짐을 찾고, 역 공중전화로 연락합니다.' },
  'ryokan-ride': { origin: station, mode: 'driving', directions: '픽업은 역 옆 관광안내센터 안 짐 배송 카운터 근처에서 탑승합니다. 택시를 타면 지도 버튼에 있는 료칸 이름과 주소를 보여주세요.' },
  ryokan: { links: [roomPhotos], related: ['late-snack'] },
  bath: { links: [roomPhotos], related: ['late-snack'] },
  'late-snack': {
    links: [roomPhotos],
    stores: [
      { name: '세븐일레븐 유후인 가와카미점', meta: '1순위 · 역에서 도보 약 2분 · 24시간 안내', note: '구운 연어 주먹밥, 빵, 물이나 차처럼 객실에서 바로 먹을 수 있는 걸 소량 골라요.', place: 'セブン-イレブン 湯布院川上店 大分県由布市湯布院町川上3736-1', origin: station, fromRyokan: ryokan, url: 'https://location.sevenbank.co.jp/sevenbank/spot/detail?code=0000022027' },
      { name: '이온 유후인점', meta: '슈퍼마켓 · 09:00~22:00', note: '도시락이나 과일, 디저트까지 고르고 싶을 때. 장보는 시간이 필요하니 오후에 여유가 있을 때만 들러요.', place: 'イオン湯布院店 大分県由布市湯布院町川上2924-1', origin: station, url: 'https://tenpo.aeon-kyushu.info/aeon/detail/yufuin/' },
    ],
    related: ['shopping'],
  },
  'hakata-bags': {
    origin: '博多バスターミナル', mode: 'walking',
    directions: '10:07 버스터미널 도착 예정. 하카타구치 쪽 포르자 하카타구치로 걸어가 짐을 맡겨요. 호텔 공식 안내에 체크인 전 짐 보관이 가능하며, 하카타역 하카타구치에서 도보 약 3분입니다. 짐을 맡긴 뒤 다코메카 쪽으로 이동해요.',
    links: [['하카타역 로커 위치', 'https://www.jrhakatacity.com/coinlocker/'], ['마루이 2층 짐 보관', 'https://tabinaka-hakata.com/']],
    related: ['brunch', 'hakata-hotel'],
  },
  brunch: {
    origin: forza, mode: 'walking',
    directions: '포르자에 짐을 맡긴 뒤 하카타구치 쪽에서 빵을 가볍게 먹어요. 점심은 우동집 선택 중이며, 구시다 신사·캐널시티는 점심 뒤 선택 방문입니다. 점심까지 간격이 짧으니 빵은 소량 또는 포장도 좋아요.',
    hints: { shiroya: '역 안에서 바로 포장', fullfull: '구시다 신사 가는 길에 포장' },
    related: ['lunch', 'shrine'],
  },
  shrine: { origin: hakataStation, mode: 'walking', directions: '우동 점심을 먹은 뒤 짧게 들르는 선택 일정입니다. 하카타 크리스마스마켓이 메인이므로 대기나 쇼핑이 길어지면 생략해도 좋아요.', related: ['canal', 'hakata-hotel'] },
  lunch: {
    origin: kushida, mode: 'walking',
    directions: '일요일 점심은 우동집 선택 중입니다. 마켓 중심 일정에는 포르자와 같은 하카타구치 쪽 다이치 우동이 편하고, 신사 쪽에서 먹고 싶으면 카로노우론을 비교해요. 우동 점심 → 구시다 신사·캐널시티 선택 방문 → 14:30 포르자 휴식 순서입니다. 타이라와 하가쿠레는 일요일 휴무라 이날 후보에서 제외했습니다.',
    hints: { daichi: '하카타역·포르자 근처 · 큰 우엉튀김 우동', genki: '가와바타 북쪽 · 줄 비교 후 이동', hirao: '이미 텐진에 있을 때', issou: '하카타역 동쪽에 있을 때', kamakiri: '우동 유지 · 다이묘로 넘어갈 때', umeyama: '생선 정식 · 텐진 남쪽으로 동선 변경', wakaba: '돈카츠 · 니시나카스·텐진 쪽', kubocurry: '카레 · 점심만 · 다이묘로 동선 변경', gyozalee: '큰 교자·중식 · 야쿠인으로 동선 변경' },
    related: ['canal'],
  },
  canal: { origin: kushida, mode: 'walking', directions: '캐널시티는 짧게 둘러보고 14:15쯤 포르자로 출발해요. 14:30 체크인·휴식과 15:45 마켓 관람을 우선하는 선택 일정입니다.', related: ['hakata-hotel'] },
  'hakata-hotel': { origin: 'キャナルシティ博多', mode: 'walking', directions: '하카타역 하카타구치 방향으로 돌아와 14:30쯤 체크인합니다. 예약한 곳은 포르자 하카타구치이며 지쿠시구치 지점과 구분해요. 맡긴 짐을 찾고 15:30까지 쉰 뒤 하카타역 마켓으로 나갑니다.', related: ['hakata-bags', 'market-before'] },
  snack: { directions: '15:30 호텔에서 예약 화면과 교통카드를 준비하고 하카타역 광장으로 나갑니다. 간식은 소량만 먹고 다른 빵집으로 우회하지 않아요.', related: ['market-before', 'dinner'] },
  'market-before': { origin: forza, mode: 'walking', directions: '포르자 하카타구치에서 하카타역 하카타구치 광장으로 걸어요. 15:45~17:05가 저녁 전 마켓 관람 시간입니다. 17:05에는 역 안 나나쿠마선 표지판을 따라 마코로 출발합니다. 일요일 운영 12:00~23:00·마지막 주문 22:45. 밤 조명은 식사 후 다시 봐요.', related: ['mako-transit', 'market'] },
  'mako-transit': {
    origin: '博多駅前広場', mode: 'transit',
    directions: '기본은 17:05 하카타역 크리스마스마켓 출발. 마켓을 건너뛰고 호텔에서 바로 가면 17:15 포르자 출발을 목표로 해요.\n① 하카타역에서 초록색 나나쿠마선(七隈線) 표지판을 따라갑니다. 광장부터 승강장까지 역내 이동 약 10분, 대기·혼잡 여유를 따로 잡아요.\n② 하시모토(橋本) 방면 열차 탑승. 하카타 N18 → 구시다진자마에 N17 → 텐진미나미 N16 → 와타나베도리 N15 → 야쿠인 N14 → 야쿠인오도리 N13. 환승 없이 5정거장, 승차 약 8~9분, 편도 성인 1인 ¥260입니다.\n③ 薬院(야쿠인)에서 내리지 말고 薬院大通(야쿠인오도리)까지 갑니다. 1번 출구로 나와 薬院2-14-18 건물 2층 마코까지 도보 약 3분. 출구까지 역내 이동은 별도예요.\n17:45~17:50 도착을 목표로 잡았으며 특정 열차 시각은 당일 길찾기로 확인해요.',
    links: [['하카타 → 야쿠인오도리 노선·운임', 'https://transit.yahoo.co.jp/search/result/%E5%8D%9A%E5%A4%9A-%E8%96%AC%E9%99%A2%E5%A4%A7%E9%80%9A'], ['야쿠인오도리역 공식 · 출구·주말 시각표', 'https://subway.city.fukuoka.lg.jp/eki/stations/yakuinoo.php'], ['마코 위치·1번 출구 안내', 'https://r.gnavi.co.jp/kmd1t4s00000/map/']],
    related: ['mako-ready', 'dinner'],
  },
  'mako-ready': { origin: '薬院大通駅 1番出口 福岡市', mode: 'walking', directions: '야쿠인오도리역 1번 출구에서 건물 주소 薬院2-14-18을 확인하며 도보 약 3분. 식당은 YAKUIN KZ LIFE BLD. 2층입니다. 17:50 도착 목표로 예약자 이름과 확정 화면을 준비해요.', related: ['dinner'] },
  dinner: {
    origin: '博多駅前広場', mode: 'transit',
    directions: '17:05 하카타역 마켓 출발 → 나나쿠마선 하시모토 방면 → 야쿠인오도리역 1번 출구 → 도보 약 3분 → 마코 2층. 호텔에서 바로 가면 17:15 포르자 출발을 목표로 해요. 17:45~17:50 도착·18:00 코스 시작입니다. 상세한 역 순서와 교통비는 「하카타역 마켓 → 마코 · 지하철」 일정에서 확인해요.',
    related: ['mako-transit', 'mako-ready', 'mako-return', 'market'],
  },
  'mako-return': {
    origin: mako, mode: 'transit',
    directions: '소후렌에 들를 때는 하카타까지 가지 않고 한 정거장 앞 구시다진자마에역에서 내려요.\n① 마코 → 야쿠인오도리역 도보 약 3분.\n② 나나쿠마선 하카타(博多) 방면 → 야쿠인 → 와타나베도리 → 텐진미나미 → 구시다진자마에(櫛田神社前). 환승 없이 4정거장, 약 7분, 1인 ¥210입니다.\n③ 구시다진자마에역 4번 출구에서 소후렌 하카타 에키마에점까지 도보 약 3~4분.\n20:30쯤 마코에서 출발해 20:55 소후렌 도착을 목표로 하는 계획입니다. 가는 편 하카타 → 야쿠인오도리 ¥260, 오는 편 야쿠인오도리 → 구시다진자마에 ¥210으로 두 명 합계 ¥940 기준입니다.\n야식을 건너뛰면 종점 하카타까지 그대로 타고 돌아오면 됩니다(편도 1인 ¥260, 하카타 왕복 두 명 ¥1,040).',
    links: [['야쿠인오도리 → 구시다진자마에 노선·운임', 'https://transit.yahoo.co.jp/search/result/%E8%96%AC%E9%99%A2%E5%A4%A7%E9%80%9A-%E6%AB%9B%E7%94%B0%E7%A5%9E%E7%A4%BE%E5%89%8D'], ['야쿠인오도리역 공식 · 하카타 방면 주말 시각표', 'https://subway.city.fukuoka.lg.jp/eki/stations/yakuinoo.php']],
    related: ['night-food', 'market', 'rest'],
  },
  'night-food': { origin: '櫛田神社前駅 4番出口 福岡市', mode: 'walking', directions: '구시다진자마에역 4번 출구에서 博多駅前3-16-2 소후렌으로 걸어요. 도보 약 3~4분이며 포르자와 같은 하카타역 서쪽 권역입니다. 야식 뒤에는 하카타역 마켓 또는 호텔로 걸어갈 수 있어요. 공식 마감 21:30, 마지막 주문은 미공개라 방문 전에 확인합니다.', related: ['mako-return', 'market', 'rest'] },
  market: { origin: sofuren, mode: 'walking', directions: '소후렌에 들렀다면 약 10분의 이동 여유를 두고 하카타역 하카타구치 광장으로 걸어갑니다. 야식을 생략하면 지하철로 하카타역까지 바로 와서 20:55쯤부터 밤 마켓을 볼 수 있어요. 22:30쯤 호텔로 출발하는 계획이며 일요일 마감 23:00·마지막 주문 22:45입니다.', related: ['rest'] },
  rest: { origin: '博多駅前広場', mode: 'walking', directions: '하카타역 하카타구치 광장에서 포르자 하카타구치로 걸어 돌아갑니다. 호텔은 博多駅前2-1-15이며 지쿠시구치 지점과 구분해요.' },
  'airport-return': { origin: forza, mode: 'driving', directions: '포르자 하카타구치에서 출발해 후쿠오카공항 국제선 터미널로 이동해요. 지도는 차량 경로이며 택시 예약은 별도로 확인합니다.', links: [airportMap] },
  depart: { links: [airportMap] },
};
