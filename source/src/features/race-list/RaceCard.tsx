"use client";

import Link from "next/link";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { LockedOverlay } from "@/components/LockedOverlay";
import type { RaceCard as RaceCardType } from "@/types/race";
import type { GatingPolicy } from "@/features/plan-gating/policy";

interface Props {
  race: RaceCardType;
  policy: GatingPolicy;
  onLockedClick: () => void;
}

export function RaceCard({ race, policy, onLockedClick }: Props) {
  return (
    <Link href={`/race/${race.id}`} data-testid={`race-card-${race.id}`}>
      <Card className="p-4 transition hover:shadow-md">
        {/* 段1: レース情報 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge
              label={`${race.venue} ${race.raceNumber}R`}
              color="blue"
            />
            <Badge
              label={`${race.courseType}${race.distance}m`}
              color="gray"
            />
          </div>
          <span className="text-xs text-gray-400">{race.startTime}</span>
        </div>

        <h3 className="mt-2 text-base font-semibold text-gray-900">
          {race.raceName}
        </h3>

        {/* 段2: ★ ▲ (常時表示) */}
        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
          {race.topPicks.star && (
            <div className="flex items-center gap-1">
              <span className="text-red-500 font-bold">★</span>
              <span className="text-gray-700">{race.topPicks.star}</span>
            </div>
          )}
          {race.topPicks.triangle && (
            <div className="flex items-center gap-1">
              <span className="text-blue-500 font-bold">▲</span>
              <span className="text-gray-700">{race.topPicks.triangle}</span>
            </div>
          )}
        </div>

        {/* 段3: ⚠ ◆ (ロック対象) */}
        <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
          <LockedOverlay
            locked={!policy.canViewCaution}
            message={
              policy.showLoginCta
                ? "ログインして確認"
                : "プロ登録で確認"
            }
            onCtaClick={onLockedClick}
            ctaLabel={
              policy.showLoginCta ? "ログイン" : "プロ登録"
            }
          >
            {race.topPicks.caution && (
              <div className="flex items-center gap-1">
                <span className="text-amber-500 font-bold">⚠</span>
                <span className="text-gray-700">{race.topPicks.caution}</span>
              </div>
            )}
          </LockedOverlay>

          <LockedOverlay
            locked={!policy.canViewDarkHorse}
            message={
              policy.showLoginCta
                ? "ログインして確認"
                : "プロ登録で確認"
            }
            onCtaClick={onLockedClick}
            ctaLabel={
              policy.showLoginCta ? "ログイン" : "プロ登録"
            }
          >
            {race.topPicks.darkHorse && (
              <div className="flex items-center gap-1">
                <span className="text-purple-500 font-bold">◆</span>
                <span className="text-gray-700">{race.topPicks.darkHorse}</span>
              </div>
            )}
          </LockedOverlay>
        </div>
      </Card>
    </Link>
  );
}
