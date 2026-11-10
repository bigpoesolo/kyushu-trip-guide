const commons = 'https://commons.wikimedia.org/wiki/File:';
const licenses = 'https://creativecommons.org/licenses/';
const photo = (file, caption, author, original, license, licensePath) => ({
  file: `photo-${file}.webp`, caption, author, source: `${commons}${original}`, license, licenseUrl: `${licenses}${licensePath}/`,
});

export const photos = {
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
  kushida: ['shrine', 'lunch', 'canal', 'dinner'],
  hakata: ['bus-back', 'hakata-bags', 'brunch', 'hakata-hotel', 'snack', 'market', 'rest', 'breakfast', 'checkout'],
};

export const eventPhotos = Object.fromEntries(Object.entries(photoGroups).flatMap(([key, ids]) => ids.map(id => [id, photos[key]])));

const station = 'JR 由布院駅 大分県由布市';
const cafe = '由布院豆柴カフェ 大分県由布市湯布院町川上1507-2';
const ryokan = '由布の彩 YADOYA おおはし 大分県由布市湯布院町川北1235';
const hakataStation = 'JR 博多駅 福岡';
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
    directions: '10:07 버스터미널 도착 예정. 연결된 하카타역의 코인 로커를 먼저 봐요. 로커가 차면 하카타구치 쪽 KITTE 하카타의 하카타 마루이 2층 TABINAKA(10:00~21:00)에서 맡길 수 있어요. 숙소가 역 근처이고 체크인 전 보관이 확인되면 숙소에 맡겨도 됩니다.',
    links: [['하카타역 로커 위치', 'https://www.jrhakatacity.com/coinlocker/'], ['마루이 2층 짐 보관', 'https://tabinaka-hakata.com/']],
    related: ['brunch', 'hakata-hotel'],
  },
  brunch: {
    origin: hakataStation, mode: 'walking',
    directions: '역에 짐을 맡긴 뒤 하카타구치 쪽에서 빵을 가볍게 먹고 구시다 신사 쪽으로 걸어요. 점심까지 간격이 짧으니 포장도 좋아요.',
    hints: { shiroya: '역 안에서 바로 포장', fullfull: '구시다 신사 가는 길에 포장' },
    related: ['shrine', 'lunch'],
  },
  shrine: { origin: hakataStation, mode: 'walking', directions: '브런치 뒤 신사를 먼저 보고 12:15쯤 점심을 먹어요. 가와바타 상점가는 점심 뒤에 천천히 둘러봅니다.', related: ['lunch', 'canal'] },
  lunch: {
    origin: kushida, mode: 'walking',
    directions: '신사 바로 근처 카로노우론을 기존 13:00보다 앞당겨 12:15쯤 들러요. 일요일에도 재료가 소진되면 일찍 문을 닫을 수 있어요.',
    hints: { genki: '가와바타 북쪽 · 줄 비교 후 이동', hirao: '이미 텐진에 있을 때', issou: '하카타역 동쪽에 있을 때' },
    related: ['canal'],
  },
  canal: { origin: kushida, mode: 'walking', directions: '점심 뒤 가와바타 상점가와 캐널시티를 한 번에 둘러보고, 필요하면 역에서 짐을 찾아 체크인해요.', related: ['hakata-hotel'] },
  snack: { directions: '저녁에 나카스 쪽으로 가면 니시나카스 팡스톡이나 가와바타 스즈카케를 들르기 편해요. 야마미치로 바꾸면 16구가 같은 야쿠인 쪽이에요. 체크인이나 저녁이 밀리면 간식은 건너뛰어요.', related: ['dinner'] },
  dinner: {
    directions: '체크인 뒤 나카스로 이동하는 일정이에요. 숙소 위치에 따라 이동 시간이 달라져요. 저녁이 늦어져도 하카타역 크리스마스마켓은 일요일 23:00까지 운영합니다.',
    hints: { hountei: '같은 나카스 2초메 · 가까운 대안', yamamichi: '장어를 먹고 싶을 때 · 자리 확인 후 이동', issou: '숙소가 하카타역 동쪽일 때' },
    related: ['market'],
  },
  'airport-return': { links: [airportMap] },
  depart: { links: [airportMap] },
};
