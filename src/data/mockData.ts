
import { LineOAAccount, PromotionPackage, Transaction } from '../types';

export const categories = [
  { id: 'gourmet', name: 'グルメ', icon: '🍜' },
  { id: 'travel', name: '旅行', icon: '✈️' },
  { id: 'beauty', name: '美容', icon: '💄' },
  { id: 'shopping', name: 'ショッピング', icon: '🛍️' },
  { id: 'entertainment', name: 'エンタメ', icon: '🎬' },
  { id: 'health', name: '健康', icon: '💪' },
  { id: 'education', name: '教育', icon: '📚' },
  { id: 'business', name: 'ビジネス', icon: '💼' },
];

export const mockAccounts: LineOAAccount[] = [
  {
    id: '1',
    name: '東京ラーメン横丁',
    description: '新宿にある老舗ラーメン店。毎日手作りの麺と秘伝のスープでお客様をお迎えします。',
    category: 'gourmet',
    image: '/placeholder.svg',
    qrCode: '/placeholder.svg',
    followers: 12500,
    rating: 4.8,
    isPromoted: true,
    location: {
      lat: 35.6895,
      lng: 139.6917,
      address: '東京都新宿区歌舞伎町1-2-3'
    },
    tags: ['ラーメン', '深夜営業', '新宿'],
    verificationStatus: 'approved',
    ownerId: 'org1',
    createdAt: '2024-01-15',
    views: 2500,
    friendAdds: 450
  },
  {
    id: '2',
    name: '京都観光ガイド',
    description: '京都の隠れた名所や季節のイベント情報をお届けします。地元ガイドが厳選した情報をお楽しみください。',
    category: 'travel',
    image: '/placeholder.svg',
    qrCode: '/placeholder.svg',
    followers: 8900,
    rating: 4.6,
    isPromoted: false,
    location: {
      lat: 35.0116,
      lng: 135.7681,
      address: '京都府京都市東山区清水1-294'
    },
    tags: ['観光', '京都', 'ガイド'],
    verificationStatus: 'approved',
    ownerId: 'org2',
    createdAt: '2024-02-01',
    views: 1800,
    friendAdds: 320
  },
  {
    id: '3',
    name: 'ビューティーサロン SAKURA',
    description: '最新の美容技術と心地よい空間で、あなたの美しさを引き出します。完全予約制でゆったりとお過ごしください。',
    category: 'beauty',
    image: '/placeholder.svg',
    qrCode: '/placeholder.svg',
    followers: 5600,
    rating: 4.9,
    isPromoted: true,
    location: {
      lat: 35.6586,
      lng: 139.7454,
      address: '東京都渋谷区表参道3-4-5'
    },
    tags: ['美容室', '表参道', '完全予約制'],
    verificationStatus: 'approved',
    ownerId: 'org3',
    createdAt: '2024-01-20',
    views: 3200,
    friendAdds: 680
  },
  {
    id: '4',
    name: 'フィットネスクラブ STRONG',
    description: '24時間営業のフィットネスクラブ。最新マシンと専門トレーナーがあなたの目標達成をサポートします。',
    category: 'health',
    image: '/placeholder.svg',
    qrCode: '/placeholder.svg',
    followers: 4200,
    rating: 4.4,
    isPromoted: false,
    location: {
      lat: 35.6762,
      lng: 139.6503,
      address: '東京都渋谷区恵比寿1-2-3'
    },
    tags: ['フィットネス', '24時間', 'パーソナル'],
    verificationStatus: 'approved',
    ownerId: 'org4',
    createdAt: '2024-02-10',
    views: 1500,
    friendAdds: 280
  },
  {
    id: '5',
    name: 'オンライン英会話 SPEAK',
    description: 'ネイティブ講師とのマンツーマンレッスンで英語力アップ。初心者から上級者まで対応のオンライン英会話です。',
    category: 'education',
    image: '/placeholder.svg',
    qrCode: '/placeholder.svg',
    followers: 7800,
    rating: 4.7,
    isPromoted: true,
    location: {
      lat: 35.6804,
      lng: 139.7690,
      address: '東京都新宿区新宿3-1-1'
    },
    tags: ['英会話', 'オンライン', 'マンツーマン'],
    verificationStatus: 'approved',
    ownerId: 'org5',
    createdAt: '2024-01-05',
    views: 2800,
    friendAdds: 520
  },
  {
    id: '6',
    name: 'カフェ MOON',
    description: '自家焙煎コーヒーと手作りスイーツが自慢のカフェ。WiFi完備でお仕事や勉強にも最適です。',
    category: 'gourmet',
    image: '/placeholder.svg',
    qrCode: '/placeholder.svg',
    followers: 3400,
    rating: 4.5,
    isPromoted: false,
    verificationStatus: 'pending',
    ownerId: 'org6',
    createdAt: '2024-03-01',
    views: 890,
    friendAdds: 125,
    tags: ['カフェ', 'WiFi', '自家焙煎']
  },
  {
    id: '7',
    name: 'アニメショップ OTAKU',
    description: '最新アニメグッズから希少なコレクションまで。アニメファンのための専門店です。',
    category: 'entertainment',
    image: '/placeholder.svg',
    qrCode: '/placeholder.svg',
    followers: 9200,
    rating: 4.6,
    isPromoted: true,
    location: {
      lat: 35.7022,
      lng: 139.7745,
      address: '東京都豊島区東池袋1-1-1'
    },
    tags: ['アニメ', 'フィギュア', '池袋'],
    verificationStatus: 'approved',
    ownerId: 'org7',
    createdAt: '2024-01-25',
    views: 4200,
    friendAdds: 850
  },
  {
    id: '8',
    name: 'ファッション STYLE',
    description: '最新トレンドからクラシックまで、幅広いファッションアイテムを取り揃えています。',
    category: 'shopping',
    image: '/placeholder.svg',
    qrCode: '/placeholder.svg',
    followers: 6700,
    rating: 4.3,
    isPromoted: false,
    location: {
      lat: 35.6627,
      lng: 139.7304,
      address: '東京都渋谷区原宿1-2-3'
    },
    tags: ['ファッション', '原宿', 'トレンド'],
    verificationStatus: 'approved',
    ownerId: 'org8',
    createdAt: '2024-02-15',
    views: 1900,
    friendAdds: 380
  },
  {
    id: '9',
    name: 'コンサルティング PRO',
    description: 'ビジネス戦略からIT導入まで、企業の成長をトータルサポートします。',
    category: 'business',
    image: '/placeholder.svg',
    qrCode: '/placeholder.svg',
    followers: 2100,
    rating: 4.8,
    isPromoted: false,
    location: {
      lat: 35.6751,
      lng: 139.7648,
      address: '東京都港区赤坂1-1-1'
    },
    tags: ['コンサル', 'IT', 'ビジネス'],
    verificationStatus: 'approved',
    ownerId: 'org9',
    createdAt: '2024-02-20',
    views: 650,
    friendAdds: 95
  },
  {
    id: '10',
    name: 'ペットサロン FLUFFY',
    description: 'ワンちゃん・ネコちゃんのトリミングとペットホテル。愛するペットを大切にお預かりします。',
    category: 'health',
    image: '/placeholder.svg',
    qrCode: '/placeholder.svg',
    followers: 4800,
    rating: 4.7,
    isPromoted: true,
    location: {
      lat: 35.6844,
      lng: 139.7544,
      address: '東京都新宿区四谷1-2-3'
    },
    tags: ['ペット', 'トリミング', 'ホテル'],
    verificationStatus: 'approved',
    ownerId: 'org10',
    createdAt: '2024-01-30',
    views: 2200,
    friendAdds: 420
  },
  {
    id: '11',
    name: '大阪お好み焼き 道頓堀',
    description: '創業50年の老舗お好み焼き店。秘伝のソースと愛情込めて焼き上げます。',
    category: 'gourmet',
    image: '/placeholder.svg',
    qrCode: '/placeholder.svg',
    followers: 8500,
    rating: 4.6,
    isPromoted: false,
    location: {
      lat: 34.6698,
      lng: 135.5023,
      address: '大阪府大阪市中央区道頓堀1-1-1'
    },
    tags: ['お好み焼き', '大阪', '老舗'],
    verificationStatus: 'approved',
    ownerId: 'org11',
    createdAt: '2024-01-10',
    views: 3100,
    friendAdds: 590
  },
  {
    id: '12',
    name: 'ヨガスタジオ ZEN',
    description: '心身のバランスを整えるヨガスタジオ。初心者からインストラクター養成まで。',
    category: 'health',
    image: '/placeholder.svg',
    qrCode: '/placeholder.svg',
    followers: 3900,
    rating: 4.8,
    isPromoted: true,
    location: {
      lat: 35.6586,
      lng: 139.7454,
      address: '東京都渋谷区表参道2-3-4'
    },
    tags: ['ヨガ', '瞑想', '表参道'],
    verificationStatus: 'approved',
    ownerId: 'org12',
    createdAt: '2024-02-05',
    views: 1750,
    friendAdds: 310
  },
  {
    id: '13',
    name: 'プログラミングスクール CODE',
    description: '未経験からエンジニアへ。実践的なカリキュラムで転職をサポートします。',
    category: 'education',
    image: '/placeholder.svg',
    qrCode: '/placeholder.svg',
    followers: 5200,
    rating: 4.5,
    isPromoted: false,
    verificationStatus: 'pending',
    ownerId: 'org13',
    createdAt: '2024-03-05',
    views: 1200,
    friendAdds: 180,
    tags: ['プログラミング', '転職', 'エンジニア']
  },
  {
    id: '14',
    name: '温泉旅館 やまぐち',
    description: '山口県の自然に囲まれた温泉旅館。四季折々の料理と温泉でおもてなし。',
    category: 'travel',
    image: '/placeholder.svg',
    qrCode: '/placeholder.svg',
    followers: 2800,
    rating: 4.9,
    isPromoted: true,
    location: {
      lat: 34.1858,
      lng: 131.4706,
      address: '山口県山口市湯田温泉1-2-3'
    },
    tags: ['温泉', '旅館', '山口'],
    verificationStatus: 'approved',
    ownerId: 'org14',
    createdAt: '2024-01-12',
    views: 1600,
    friendAdds: 240
  },
  {
    id: '15',
    name: 'ゲームセンター PLAY',
    description: '最新ゲーム機からクラシックまで。家族みんなで楽しめるゲームセンターです。',
    category: 'entertainment',
    image: '/placeholder.svg',
    qrCode: '/placeholder.svg',
    followers: 6100,
    rating: 4.4,
    isPromoted: false,
    location: {
      lat: 35.7022,
      lng: 139.7745,
      address: '東京都豊島区池袋2-1-1'
    },
    tags: ['ゲーム', 'アーケード', 'ファミリー'],
    verificationStatus: 'approved',
    ownerId: 'org15',
    createdAt: '2024-02-25',
    views: 2400,
    friendAdds: 450
  },
  {
    id: '16',
    name: 'アクセサリーショップ SHINE',
    description: 'ハンドメイドアクセサリーの専門店。オーダーメイドも承ります。',
    category: 'shopping',
    image: '/placeholder.svg',
    qrCode: '/placeholder.svg',
    followers: 3700,
    rating: 4.6,
    isPromoted: true,
    location: {
      lat: 35.6627,
      lng: 139.7304,
      address: '東京都渋谷区表参道1-3-5'
    },
    tags: ['アクセサリー', 'ハンドメイド', 'オーダー'],
    verificationStatus: 'approved',
    ownerId: 'org16',
    createdAt: '2024-01-22',
    views: 1300,
    friendAdds: 250
  },
  {
    id: '17',
    name: 'マーケティング BOOST',
    description: 'デジタルマーケティングで売上アップ。SNS運用からWeb広告まで。',
    category: 'business',
    image: '/placeholder.svg',
    qrCode: '/placeholder.svg',
    followers: 1900,
    rating: 4.7,
    isPromoted: false,
    verificationStatus: 'pending',
    ownerId: 'org17',
    createdAt: '2024-03-10',
    views: 580,
    friendAdds: 85,
    tags: ['マーケティング', 'SNS', 'Web広告']
  },
  {
    id: '18',
    name: 'スイーツカフェ SWEET',
    description: 'パティシエ特製スイーツとこだわりコーヒーで至福のひとときを。',
    category: 'gourmet',
    image: '/placeholder.svg',
    qrCode: '/placeholder.svg',
    followers: 4600,
    rating: 4.8,
    isPromoted: true,
    location: {
      lat: 35.6762,
      lng: 139.6503,
      address: '東京都渋谷区恵比寿3-4-5'
    },
    tags: ['スイーツ', 'カフェ', 'パティシエ'],
    verificationStatus: 'approved',
    ownerId: 'org18',
    createdAt: '2024-01-18',
    views: 2100,
    friendAdds: 390
  },
  {
    id: '19',
    name: 'ネイルサロン NAIL',
    description: '最新トレンドのネイルアートから基本ケアまで。丁寧な施術でお迎えします。',
    category: 'beauty',
    image: '/placeholder.svg',
    qrCode: '/placeholder.svg',
    followers: 5100,
    rating: 4.5,
    isPromoted: false,
    location: {
      lat: 35.6627,
      lng: 139.7304,
      address: '東京都渋谷区原宿2-1-3'
    },
    tags: ['ネイル', 'アート', '原宿'],
    verificationStatus: 'approved',
    ownerId: 'org19',
    createdAt: '2024-02-12',
    views: 1850,
    friendAdds: 320
  },
  {
    id: '20',
    name: '音楽教室 MELODY',
    description: 'ピアノからギターまで、音楽の楽しさを伝える教室です。無料体験レッスン実施中。',
    category: 'education',
    image: '/placeholder.svg',
    qrCode: '/placeholder.svg',
    followers: 2600,
    rating: 4.6,
    isPromoted: false,
    location: {
      lat: 35.6804,
      lng: 139.7690,
      address: '東京都新宿区新宿4-2-1'
    },
    tags: ['音楽', 'ピアノ', 'ギター'],
    verificationStatus: 'approved',
    ownerId: 'org20',
    createdAt: '2024-02-08',
    views: 980,
    friendAdds: 150
  }
];

export const promotionPackages: PromotionPackage[] = [
  {
    id: 'basic',
    name: 'ベーシック',
    price: 3000,
    duration: 7,
    features: ['検索結果上位表示', '基本統計レポート']
  },
  {
    id: 'standard',
    name: 'スタンダード',
    price: 8000,
    duration: 30,
    features: ['検索結果上位表示', '詳細統計レポート', 'おすすめ枠掲載'],
    isPopular: true
  },
  {
    id: 'premium',
    name: 'プレミアム',
    price: 20000,
    duration: 90,
    features: ['検索結果上位表示', '詳細統計レポート', 'おすすめ枠掲載', 'カテゴリトップ表示', '専用サポート']
  }
];

export const mockTransactions: Transaction[] = [
  {
    id: 't1',
    organizerId: 'org1',
    packageId: 'standard',
    amount: 8000,
    status: 'completed',
    date: '2024-03-01'
  },
  {
    id: 't2',
    organizerId: 'org3',
    packageId: 'premium',
    amount: 20000,
    status: 'completed',
    date: '2024-02-28'
  },
  {
    id: 't3',
    organizerId: 'org5',
    packageId: 'standard',
    amount: 8000,
    status: 'pending',
    date: '2024-03-05'
  }
];
