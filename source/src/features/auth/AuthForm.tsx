"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { createClient } from "@/lib/supabase/browser";
import { logger } from "@/lib/logger";

interface Props {
  mode: "signup" | "login";
  returnTo?: string;
}

export function AuthForm({ mode, returnTo }: Props) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const title = mode === "signup" ? "新規登録" : "ログイン";
  const submitLabel = mode === "signup" ? "登録する" : "ログイン";
  const altText =
    mode === "signup"
      ? "すでにアカウントをお持ちの方は"
      : "アカウントをお持ちでない方は";
  const altLink = mode === "signup" ? "/login" : "/signup";
  const altLabel = mode === "signup" ? "ログイン" : "新規登録";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const supabase = createClient();

      const { error: authError } =
        mode === "signup"
          ? await supabase.auth.signUp({ email, password })
          : await supabase.auth.signInWithPassword({ email, password });

      if (authError) {
        setError(authError.message);
        return;
      }

      const dest = returnTo ?? "/";
      router.push(dest);
      router.refresh();
    } catch (e) {
      logger.error("AuthForm", "Unexpected error", e);
      setError("予期しないエラーが発生しました。");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="mx-auto w-full max-w-md p-8">
      <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">
        {title}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            メールアドレス
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            パスワード
          </label>
          <input
            id="password"
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
            placeholder="8文字以上"
          />
        </div>

        {error && (
          <p className="rounded-md bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="w-full"
          data-testid={`auth-${mode}-submit`}
        >
          {loading ? "処理中…" : submitLabel}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        {altText}
        <a href={altLink} className="ml-1 text-brand-primary hover:underline">
          {altLabel}
        </a>
      </p>
    </Card>
  );
}
