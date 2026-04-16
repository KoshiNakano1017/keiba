/** Supabase users.plan に格納される値 */
export type BackendPlan = "trial" | "expired" | "pro";

/**
 * UI 側で表示制御に使う 4 状態。
 * 03_認可設計.md §1.2 に準拠。
 */
export type UiState = "guest" | "trial" | "expired" | "pro";

export interface AppUser {
  id: string;
  email: string;
  plan: BackendPlan;
  trialEndsAt: string | null;
}

/**
 * BackendPlan + ログイン有無 → UiState へ正規化する唯一の変換関数。
 * 03_認可設計.md §6「アプリ起動時の状態判定」に対応。
 */
export function deriveUiState(user: AppUser | null): UiState {
  if (!user) return "guest";
  return user.plan;
}
