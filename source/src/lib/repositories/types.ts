import type { AppUser } from "@/types/user";
import type { RaceCard, Race } from "@/types/race";

/**
 * データアクセスの境界インターフェース。
 * 初期は mock 実装、後で Supabase 実装に差し替える。
 */
export interface RaceRepository {
  getRaceList(date: string): Promise<RaceCard[]>;
  getRaceDetail(id: string): Promise<Race | null>;
}

export interface UserRepository {
  getCurrentUser(): Promise<AppUser | null>;
}
