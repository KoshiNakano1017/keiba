import type { RaceRepository } from "./types";
import { MOCK_RACE_CARDS, MOCK_RACE_DETAIL } from "@/mocks/races";

export class MockRaceRepository implements RaceRepository {
  async getRaceList(_date: string) {
    return MOCK_RACE_CARDS;
  }

  async getRaceDetail(id: string) {
    if (MOCK_RACE_DETAIL.id === id) return MOCK_RACE_DETAIL;
    return null;
  }
}

export function createRaceRepository(): RaceRepository {
  return new MockRaceRepository();
}
