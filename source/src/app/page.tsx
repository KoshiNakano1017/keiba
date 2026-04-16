import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RaceListClient } from "@/features/race-list/RaceListClient";
import { createRaceRepository } from "@/lib/repositories/race";
import { createUserRepository } from "@/lib/repositories/user";
import { deriveUiState } from "@/types/user";
import { derivePolicy } from "@/features/plan-gating/policy";

export default async function RaceListPage() {
  const [races, user] = await Promise.all([
    createRaceRepository().getRaceList(new Date().toISOString().slice(0, 10)),
    createUserRepository().getCurrentUser(),
  ]);

  const uiState = deriveUiState(user);
  const policy = derivePolicy(uiState, user?.trialEndsAt ?? null);

  return (
    <>
      <Header uiState={uiState} />
      <main className="mx-auto max-w-5xl px-4 py-6">
        <h1 className="mb-4 text-xl font-bold">レース一覧</h1>
        <RaceListClient races={races} uiState={uiState} policy={policy} />
      </main>
      <Footer />
    </>
  );
}
