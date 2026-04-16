"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { RaceCard as RaceCardType } from "@/types/race";
import type { UiState } from "@/types/user";
import type { GatingPolicy } from "@/features/plan-gating/policy";
import { RaceCard } from "./RaceCard";
import { RaceDateTabs } from "./RaceDateTabs";
import { UpgradeCta } from "@/features/plan-gating/UpgradeCta";

interface Props {
  races: RaceCardType[];
  uiState: UiState;
  policy: GatingPolicy;
}

export function RaceListClient({ races, uiState, policy }: Props) {
  const router = useRouter();
  const [_dateFilter, setDateFilter] = useState("today");

  function handleLockedClick() {
    if (policy.showLoginCta) {
      router.push("/login?returnTo=/");
    } else {
      router.push("/pricing");
    }
  }

  return (
    <div className="space-y-4">
      <UpgradeCta uiState={uiState} trialDaysLeft={policy.trialDaysLeft} />

      <RaceDateTabs onSelect={setDateFilter} />

      <div className="space-y-3">
        {races.map((race) => (
          <RaceCard
            key={race.id}
            race={race}
            policy={policy}
            onLockedClick={handleLockedClick}
          />
        ))}

        {races.length === 0 && (
          <p className="py-12 text-center text-sm text-gray-400">
            レースデータがありません
          </p>
        )}
      </div>
    </div>
  );
}
