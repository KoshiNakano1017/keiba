export interface RaceEntry {
  horseNumber: number;
  horseName: string;
  jockey: string;
  odds: number;
  /** AI 本命マーク */
  starRating: "★" | "▲" | "⚠" | "◆" | null;
  /** 予想勝率 (0-100) */
  winRate: number | null;
  /** 予想連対率 (0-100) */
  placeRate: number | null;
  /** 予想複勝率 (0-100) */
  showRate: number | null;
  /** 期待値 */
  expectedValue: number | null;
}

export interface Race {
  id: string;
  raceName: string;
  venue: string;
  raceNumber: number;
  date: string;
  startTime: string;
  courseType: "芝" | "ダート";
  distance: number;
  entries: RaceEntry[];
}

export interface RaceCard {
  id: string;
  raceName: string;
  venue: string;
  raceNumber: number;
  date: string;
  startTime: string;
  courseType: "芝" | "ダート";
  distance: number;
  /** 一覧で表示する上位ピック */
  topPicks: {
    star: string | null;
    triangle: string | null;
    caution: string | null;
    darkHorse: string | null;
  };
}
