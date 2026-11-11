export const hotelBooking = {
  name: '포르자 하카타구치',
  english: 'Hotel Forza Hakata-Guchi',
  room: '리프레시 더블 · 금연 · 성인 2명',
  stay: '2026.12.06 일 → 12.07 월 · 1박',
  checkin: '12/6 14:00부터',
  checkout: '12/7 11:00까지',
  payment: 'USD 157.34 기준 · 12/1 자동 결제 예정',
  paymentNote: '예약 확정 메일 기준 세금·봉사료 포함. 나중에 결제 옵션으로, 결제일 환율과 5% 조정이 적용되므로 원화 청구액은 아직 확정되지 않았어요.',
  cityTax: '현지 숙박세 2인 합계 ¥400 별도',
  cancellation: '12/2 23:59까지 무료 취소 · 12/3 00:00부터 환불 불가 (일본시간)',
  breakfast: '확정 메일에 조식 포함 표기 없음 · 아침 식사는 별도 계획',
  verified: '2026.11.11 아고다 예약 확정 메일 확인',
};

// Public summaries only. Reservation IDs, access keys and bearer links stay in Gmail.
export const travelMails = [
  {
    id: 'mako-booking', source: 'TableCheck · 예약자 확인', date: '2026.11.12 예약자 확인', status: 'confirmed', label: '예약 완료 · 메일 원문 대기', icon: 'food',
    title: '마코 · 12/6 일요일 18:00 예약',
    summary: '예약자가 일요일 18:00 예약 완료 확인 · 메일 원문은 아직 미확인',
    query: 'from:tablecheck.com after:2026/11/11 before:2026/11/14 {"焼鳥まこ" "Yakitori Mako" "야키토리 마코"}',
    notes: ['12/6 일요일 18:00 예약 완료 · 11/12 예약자 확인 기준', '메일 연결 오류로 확정서 원문을 아직 읽지 못했어요. 실제 예약 인원·좌석·코스·취소 조건은 Gmail 원문을 확인해야 합니다.', '17:05 하카타역 마켓 출발(호텔에서 직행 시 17:15 포르자 출발) → 나나쿠마선 하시모토 방면 → 야쿠인오도리역 1번 출구 → 도보 약 3분', '17:45~17:50 도착 목표 · 식당은 薬院2-14-18 YAKUIN KZ LIFE BLD. 2층', '공개 매장 안내: 코스 1인 ¥8,800 + 서비스료 10%(¥9,680). 음료·마무리 식사는 별도이며 실제 예약 조건은 확정서를 우선해요.', '20:30은 좌석 이용 2시간 30분을 반영한 종료 예상입니다. 소후렌 야식은 선택 방문으로 두고, 식사 후 하카타역 크리스마스마켓 야경을 봐요.'],
    events: ['dinner', 'mako-transit', 'mako-ready', 'mako-return'],
  },
  {
    id: 'agoda-hotel', source: 'Agoda', date: '2026.11.11 22:52', status: 'confirmed', label: '예약 확정', icon: 'hotel',
    title: '포르자 하카타구치 예약 확정서',
    summary: '12/6–12/7 · 리프레시 더블 금연 · 성인 2명 · 1박',
    query: 'from:no-reply@agoda.com after:2026/11/10 before:2026/11/13 "Hotel Forza Hakata-Guchi"',
    notes: [hotelBooking.checkin, hotelBooking.checkout, hotelBooking.payment, hotelBooking.paymentNote, hotelBooking.cityTax, hotelBooking.cancellation, hotelBooking.breakfast],
    events: ['hakata-hotel', 'hakata-bags', 'rest', 'checkout', 'breakfast'],
  },
  {
    id: 'ryokan-booking', source: '야도야 오오하시', date: '2026.11.09 17:48', status: 'confirmed', label: '숙박 확정', icon: 'hotel',
    title: '야도야 오오하시 숙박 예약 확인',
    summary: '12/5–12/6 · 로프트 객실 · 실내탕·노천탕 · 식사 별도',
    query: 'from:noreply@hpdsp.net after:2026/11/08 before:2026/11/11 subject:"유후의 아야 YADOYA 오오하시예약 확인"',
    notes: ['성인 2명 · 객실 1개 · 1박 · 기본 예약에 조식·석식 미포함', '기본 숙박 ¥34,480 (세금·봉사료 포함) · 온천세 1인 ¥250 별도', '자동 확정 메일의 일반 안내보다 이후 숙소와 직접 협의한 17:30 체크인 마감을 우선해요.', '석식 추가는 별도 협의 중이며 숙박 확정과 구분합니다.'],
    events: ['ryokan', 'bath', 'early'],
  },
  {
    id: 'ryokan-conversation', source: '야도야 오오하시', date: '2026.11.11 16:16까지', status: 'pending', label: '석식 회신 대기', icon: 'food',
    title: '료칸 석식·픽업 협의 메일',
    summary: '스키야키 2인 요청 · 픽업은 당일 전화 · 17:30 체크인 마감',
    query: 'after:2026/11/08 (from:yadoyaoohashi@gmail.com OR to:yadoyaoohashi@gmail.com) subject:"夕食追加"',
    notes: ['11/11 숙소 답장: 스키야키 요청 접수, 레스토랑 예약 상황 확인 후 다시 안내 예정. 아직 석식 확정은 아니에요.', '석식 추가 시 2인 ¥26,400 · 현지 카드 결제 가능 · 18:00 또는 18:30 시작 안내', '픽업 접수는 15:00~17:00. 유후인역 도착 후 0977-84-5565로 전화하고, 전화가 어렵다면 역 공중전화를 이용해요.', '역 오른쪽 관광안내센터 안 짐 배송 카운터 근처에서 대기. 당일 복장 사진은 Gmail에서 숙소에 보내기로 했어요.', '픽업이 안 되면 택시. 일정의 료칸 도착 목표는 17:00~17:10이며, 체크인은 17:30까지 완료해요.'],
    events: ['sukiyaki', 'collect', 'ryokan-ride', 'ryokan', 'taxi-am'],
  },
  {
    id: 'bus-tickets', source: 'Highwaybus', date: '2026.11.10 19:39', status: 'confirmed', label: '왕복 승차권 안내', icon: 'bus',
    title: '유후인 왕복 모바일 승차권 메일',
    summary: '12/5 공항 → 유후인 · 12/6 유후인 → 하카타 · 성인 2명',
    query: 'from:kyusyu@highwaybus.com after:2026/11/09 before:2026/11/12 subject:"휴대 승차권 통지"',
    notes: ['12/5 후쿠오카공항 국제선 터미널 → 유후인역 앞 버스센터 · 성인 2명', '12/6 유후인역 앞 버스센터 → 하카타 버스터미널 · 성인 2명', '메일 자체는 승차권이 아니에요. Gmail 원문 안에서 가는 편·오는 편의 모바일 승차권을 각각 열어 준비하세요.', '승차권 발행 주소와 예약 조회용 정보는 Gmail 원문에서만 확인할 수 있어요.'],
    events: ['bus-out', 'bus-back', 'bus-ready', 'platform'],
  },
];

export const mailChecked = '2026.11.12';
export const gmailSearch = query => `https://mail.google.com/mail/u/0/#search/${encodeURIComponent(query)}`;
