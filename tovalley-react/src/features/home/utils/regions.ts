export type Region = { ko: string; en: string }
type RegionType = Region[]

export const regions: RegionType = [
  { ko: '백령', en: 'baengnyeong' },
  { ko: '서울', en: 'seoul' },
  { ko: '춘천', en: 'chuncheon' },
  { ko: '강릉', en: 'gangneung' },
  { ko: '수원', en: 'suwon' },
  { ko: '청주', en: 'cheongju' },
  { ko: '울릉/독도', en: 'ulleung' },
  { ko: '대전', en: 'daejeon' },
  { ko: '안동', en: 'andong' },
  { ko: '전주', en: 'jeonju' },
  { ko: '대구', en: 'daegu' },
  { ko: '울산', en: 'ulsan' },
  { ko: '광주', en: 'gwangju' },
  { ko: '목포', en: 'mokpo' },
  { ko: '부산', en: 'busan' },
  { ko: '제주', en: 'jeju' },
  { ko: '여수', en: 'yeosu' },
]

export const province: RegionType = [
  { ko: '전국', en: 'NATIONWIDE' },
  { ko: '서울', en: 'SEOUL' },
  { ko: '경기', en: 'GYEONGGI' },
  { ko: '세종', en: 'SEJONG' },
  { ko: '강원', en: 'GANGWON' },
  { ko: '충청', en: 'CHUNGCHEONG' },
  { ko: '전라', en: 'JEOLLA' },
  { ko: '광주', en: 'GWANGJU' },
  { ko: '경상', en: 'GYEONGSANG' },
  { ko: '부산', en: 'BUSAN' },
  { ko: '울산', en: 'ULSAN' },
  { ko: '제주', en: 'JEJU' },
]
