import type { RaceCard, Race, RaceEntry } from "@/types/race";

const today = new Date().toISOString().slice(0, 10);

function entry(
  num: number,
  name: string,
  jockey: string,
  odds: number,
  star: RaceEntry["starRating"],
  winRate: number,
  ev: number,
): RaceEntry {
  return {
    horseNumber: num,
    horseName: name,
    jockey,
    odds,
    starRating: star,
    winRate,
    placeRate: winRate * 1.4,
    showRate: winRate * 1.8,
    expectedValue: ev,
  };
}

export const MOCK_RACE_CARDS: RaceCard[] = [
  {
    id: "race-001",
    raceName: "メイン特別",
    venue: "東京",
    raceNumber: 11,
    date: today,
    startTime: "15:40",
    courseType: "芝",
    distance: 2000,
    topPicks: {
      star: "サンプルホース",
      triangle: "テストランナー",
      caution: "ダンジャーポップ",
      darkHorse: "ミステリーウィン",
    },
  },
  {
    id: "race-002",
    raceName: "午後スプリント",
    venue: "中山",
    raceNumber: 10,
    date: today,
    startTime: "15:10",
    courseType: "ダート",
    distance: 1200,
    topPicks: {
      star: "スピードキング",
      triangle: "ラストダッシュ",
      caution: "トラップランナー",
      darkHorse: "ブラックスワン",
    },
  },
  {
    id: "race-003",
    raceName: "朝一番レース",
    venue: "阪神",
    raceNumber: 1,
    date: today,
    startTime: "09:50",
    courseType: "芝",
    distance: 1600,
    topPicks: {
      star: "モーニンググロー",
      triangle: "ライジングサン",
      caution: "フォグウォーカー",
      darkHorse: "シークレットスター",
    },
  },
];

export const MOCK_RACE_DETAIL: Race = {
  id: "race-001",
  raceName: "メイン特別",
  venue: "東京",
  raceNumber: 11,
  date: today,
  startTime: "15:40",
  courseType: "芝",
  distance: 2000,
  entries: [
    entry(1, "サンプルホース", "武豊", 3.2, "★", 31.5, 1.08),
    entry(2, "テストランナー", "ルメール", 5.1, "▲", 19.6, 1.12),
    entry(3, "ダンジャーポップ", "川田", 8.4, "⚠", 11.9, 0.89),
    entry(4, "ミステリーウィン", "松山", 24.7, "◆", 4.1, 1.35),
    entry(5, "ノーマルランナー", "横山武", 12.0, null, 8.3, 0.95),
    entry(6, "スティディペース", "戸崎", 15.3, null, 6.5, 0.91),
  ],
};
