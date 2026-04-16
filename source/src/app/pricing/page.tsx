import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PricingPageClient } from "./PricingPageClient";
import { createUserRepository } from "@/lib/repositories/user";
import { deriveUiState } from "@/types/user";

export const metadata: Metadata = { title: "料金プラン | CrossFactor AI" };

export default async function PricingPage() {
  const user = await createUserRepository().getCurrentUser();
  const uiState = deriveUiState(user);

  return (
    <>
      <Header uiState={uiState} />
      <main className="mx-auto max-w-5xl px-4 py-12">
        <h1 className="mb-2 text-center text-2xl font-bold">料金プラン</h1>
        <p className="mb-8 text-center text-sm text-gray-500">
          CrossFactor AI のすべてのAI予想をご利用いただけます
        </p>
        <PricingPageClient />
      </main>
      <Footer />
    </>
  );
}
