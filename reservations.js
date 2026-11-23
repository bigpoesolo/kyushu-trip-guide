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
    id: 'mako-booking', source: 'TableCheck', date: '2026.11.12 00:06', status: 'confirmed', label: '예약 확정 · 현장 결제', icon: 'food',
    title: '마코 · 12/6 일요일 18:00 예약',
    summary: '12/6 일 18:00 · 오마카세 2명 · 서비스료 포함 ¥19,360 현장 결제',
    query: 'from:tablecheck.com after:2026/11/11 before:2026/11/14 {"焼鳥まこ" "Yakitori Mako" "야키토리 마코"}',
    notes: ['오마카세 1인 ¥8,800 × 2명 + 서비스료 10%(¥1,760) = ¥19,360. 예약 카드는 보증용 가승인이며, 코스와 추가 주문은 당일 매장에서 결제해요.', '17:05 하카타역 마켓 출발(호텔에서 직행 시 17:15 포르자 출발) → 나나쿠마선 → 야쿠인오도리역 1번 출구 → 도보 약 3분. 17:45~17:50 도착 목표예요.', '늦을 때는 092-214-7053으로 연락하세요. 연락 없이 15분이 지나면 예약이 취소될 수 있고, 30분 이상 늦으면 식사 제공 없이 취소료가 부과됩니다.', '메일의 매장 안내에 적힌 취소료는 3일 이내 50%, 전날·당일 100%입니다.'],
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
    notes: ['성인 2명 · 객실 1개 · 1박 · 기본 예약에 조식·석식 미포함', '기본 숙박 ¥34,480은 사전 온라인 카드 결제 금액입니다. 예약 메일로 금액과 결제 방식을 확인했고 실제 청구 영수증은 미확인입니다.', '현지 온천세는 1인 ¥250, 2인 ¥500입니다. 17:00~17:10 도착이 목표이고 체크인 마감은 17:30입니다.', '스키야키는 11/18 숙소 회신에서 별도 예약이 확정됐어요.'],
    events: ['ryokan', 'bath', 'early'],
  },
  {
    id: 'ryokan-conversation', source: '야도야 오오하시', date: '2026.11.18 17:38까지', status: 'confirmed', label: '석식 확정 · 현장 결제', icon: 'food',
    title: '료칸 스키야키 확정 · 역 픽업 안내',
    summary: '스키야키 2인 ¥26,400 · 시작 시각 확인 필요 · 역 픽업은 당일 전화',
    query: 'after:2026/11/08 (from:yadoyaoohashi@gmail.com OR to:yadoyaoohashi@gmail.com) subject:"夕食追加"',
    notes: ['11/18 16:43 숙소가 좌석 확보와 스키야키 2인 준비를 확인했어요. 1인 ¥13,200, 2인 ¥26,400이며 현장에서 카드 결제가 가능합니다.', '시작 시각은 18:00 또는 18:30 중 확인이 필요해요. 체크인 당일 정확한 도착 예상 시각을 알리기로 했습니다.', '무료 픽업은 15:00~17:00에 당일 전화로 접수해요. 짐을 찾은 뒤 역 공중전화에서 0977-84-5565로 요청하면 료칸에서 차량이 출발합니다.', '당일 복장 사진을 숙소에 보내고 역 오른쪽 관광안내센터 안 짐 배송 카운터 근처에서 대기하세요. 픽업이 안 되면 택시로 이동해요.', '17:00~17:10 료칸 도착 목표 · 체크인 마감 17:30. 다음 날 07:20 택시와 조기 체크아웃은 별도 협의가 필요해요.'],
    events: ['sukiyaki', 'collect', 'ryokan-ride', 'ryokan', 'taxi-am'],
  },
  {
    id: 'bus-tickets', source: 'Highwaybus', date: '2026.11.10 19:39', status: 'confirmed', label: '왕복 결제 완료', icon: 'bus',
    title: '유후인 왕복 결제 확인 · 모바일 승차권',
    summary: '12/5 공항 → 유후인 · 12/6 유후인 → 하카타 · 성인 2명 왕복 ¥13,000 결제 완료',
    query: 'from:kyusyu@highwaybus.com after:2026/11/09 before:2026/11/12',
    notes: ['결제완료 통지 메일에서 두 명의 왕복 합계 ¥13,000 온라인 카드 결제를 확인했어요.', '12/5 13:08 후쿠오카공항 국제선 터미널 → 유후인역 앞 버스센터', '12/6 08:00 유후인역 앞 버스센터 → 하카타 버스터미널', '탑승할 때는 해당 방향의 휴대 승차권 통지 메일에서 모바일 승차권을 열어 보여주세요.'],
    events: ['bus-out', 'bus-back', 'bus-ready', 'platform'],
  },
];

export const mailChecked = '2026.11.23';
export const gmailSearch = query => `https://mail.google.com/mail/u/0/#search/${encodeURIComponent(query)}`;
