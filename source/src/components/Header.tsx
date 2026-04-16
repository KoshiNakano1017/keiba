import Link from "next/link";
import type { UiState } from "@/types/user";
import { Button } from "./Button";

interface Props {
  uiState: UiState;
}

export function Header({ uiState }: Props) {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-bold text-brand-dark">
          CrossFactor AI
        </Link>

        <nav className="flex items-center gap-2">
          {uiState === "guest" && (
            <>
              <Link href="/login">
                <Button variant="ghost" data-testid="header-login">
                  ログイン
                </Button>
              </Link>
              <Link href="/signup">
                <Button data-testid="header-signup">無料登録</Button>
              </Link>
            </>
          )}

          {uiState === "trial" && (
            <Link href="/pricing">
              <Button variant="secondary" data-testid="header-upgrade">
                プロ登録
              </Button>
            </Link>
          )}

          {uiState === "expired" && (
            <Link href="/pricing">
              <Button data-testid="header-upgrade">プロ登録</Button>
            </Link>
          )}

          {(uiState === "trial" ||
            uiState === "expired" ||
            uiState === "pro") && (
            <Link
              href="/mypage"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-300 transition"
              data-testid="header-avatar"
              aria-label="マイページ"
            >
              U
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
