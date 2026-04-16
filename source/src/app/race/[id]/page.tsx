import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { LockedOverlay } from "@/components/LockedOverlay";
import { createRaceRepository } from "@/lib/repositories/race";
import { createUserRepository } from "@/lib/repositories/user";
import { deriveUiState } from "@/types/user";
import { derivePolicy } from "@/features/plan-gating/policy";
import { notFound } from "next/navigation";

export const metadata: Metadata = { title: "レース詳細 | CrossFactor AI" };

interface Props {
  params: Promise<{ id: string }>;
}

export default async function RaceDetailPage({ params }: Props) {
  const { id } = await params;
  const [race, user] = await Promise.all([
    createRaceRepository().getRaceDetail(id),
    createUserRepository().getCurrentUser(),
  ]);

  if (!race) notFound();

  const uiState = deriveUiState(user);
  const policy = derivePolicy(uiState, user?.trialEndsAt ?? null);

  return (
    <>
      <Header uiState={uiState} />
      <main className="mx-auto max-w-5xl px-4 py-6">
        <Link
          href="/"
          className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
        >
          ← レース一覧に戻る
        </Link>

        <div className="mb-4 flex items-center gap-2">
          <Badge
            label={`${race.venue} ${race.raceNumber}R`}
            color="blue"
          />
          <Badge label={`${race.courseType}${race.distance}m`} color="gray" />
          <span className="text-sm text-gray-400">{race.startTime}</span>
        </div>

        <h1 className="mb-6 text-2xl font-bold">{race.raceName}</h1>

        {/* 出馬表 */}
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left font-medium text-gray-500">
                  枠
                </th>
                <th className="px-3 py-2 text-left font-medium text-gray-500">
                  馬名
                </th>
                <th className="px-3 py-2 text-left font-medium text-gray-500">
                  騎手
                </th>
                <th className="px-3 py-2 text-left font-medium text-gray-500">
                  AI
                </th>
                <th className="px-3 py-2 text-right font-medium text-gray-500">
                  オッズ
                </th>
                <th className="px-3 py-2 text-right font-medium text-gray-500">
                  勝率
                </th>
                <th className="px-3 py-2 text-right font-medium text-gray-500">
                  期待値
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {race.entries.map((entry) => {
                const isRestricted =
                  (entry.starRating === "⚠" && !policy.canViewCaution) ||
                  (entry.starRating === "◆" && !policy.canViewDarkHorse);

                return (
                  <tr key={entry.horseNumber} className="hover:bg-gray-50">
                    <td className="px-3 py-2 font-medium">
                      {entry.horseNumber}
                    </td>
                    <td className="px-3 py-2">{entry.horseName}</td>
                    <td className="px-3 py-2 text-gray-500">{entry.jockey}</td>
                    <td className="px-3 py-2">
                      {entry.starRating && (
                        <span
                          className={`font-bold ${
                            entry.starRating === "★"
                              ? "text-red-500"
                              : entry.starRating === "▲"
                                ? "text-blue-500"
                                : entry.starRating === "⚠"
                                  ? "text-amber-500"
                                  : "text-purple-500"
                          }`}
                        >
                          {isRestricted ? "🔒" : entry.starRating}
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums">
                      {entry.odds}
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums">
                      <LockedOverlay
                        locked={!policy.canViewPredictionValues}
                        message=""
                      >
                        <span>
                          {entry.winRate != null
                            ? `${entry.winRate.toFixed(1)}%`
                            : "—"}
                        </span>
                      </LockedOverlay>
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums">
                      <LockedOverlay
                        locked={!policy.canViewPredictionValues}
                        message=""
                      >
                        <span>
                          {entry.expectedValue != null
                            ? entry.expectedValue.toFixed(2)
                            : "—"}
                        </span>
                      </LockedOverlay>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ロック時のCTA */}
        {(policy.showLoginCta || policy.showUpgradeCta) && (
          <div className="mt-6 rounded-lg bg-gray-50 p-6 text-center">
            <p className="mb-3 text-sm text-gray-600">
              {policy.showLoginCta
                ? "すべてのAI予想を見るにはログインしてください"
                : "トライアル期間終了後もAI予想をご利用いただくにはプロ登録が必要です"}
            </p>
            <Link
              href={policy.showLoginCta ? "/login" : "/pricing"}
            >
              <Button data-testid="race-detail-cta">
                {policy.showLoginCta ? "ログイン / 新規登録" : "プロ登録"}
              </Button>
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
