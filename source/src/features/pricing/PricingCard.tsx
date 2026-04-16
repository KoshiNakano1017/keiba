"use client";

import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";

interface Props {
  onCheckout: () => void;
  loading?: boolean;
}

export function PricingCard({ onCheckout, loading }: Props) {
  return (
    <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
      {/* 無料トライアル（参考表示） */}
      <Card className="p-6">
        <Badge label="トライアル" color="gray" />
        <h3 className="mt-3 text-xl font-bold text-gray-900">無料体験</h3>
        <p className="mt-1 text-3xl font-extrabold text-gray-900">
          ¥0
          <span className="text-base font-normal text-gray-500"> / 7日間</span>
        </p>
        <ul className="mt-4 space-y-2 text-sm text-gray-600">
          <li className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            レース一覧の閲覧
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            AI予想（★ ▲ ⚠ ◆）すべて閲覧
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            予想勝率・期待値の閲覧
          </li>
        </ul>
        <Button variant="secondary" disabled className="mt-6 w-full">
          登録時に自動適用
        </Button>
      </Card>

      {/* プロプラン */}
      <Card className="relative border-brand-primary p-6 ring-2 ring-brand-primary">
        <Badge label="おすすめ" color="blue" />
        <h3 className="mt-3 text-xl font-bold text-gray-900">プロ</h3>
        <p className="mt-1 text-3xl font-extrabold text-gray-900">
          ¥—
          <span className="text-base font-normal text-gray-500"> / 月</span>
        </p>
        <p className="mt-1 text-xs text-gray-400">
          ※ 料金はクライアント確認後に確定
        </p>
        <ul className="mt-4 space-y-2 text-sm text-gray-600">
          <li className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            トライアルの全機能
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            トライアル終了後もすべてのAI予想を継続閲覧
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            AI詳細見解テキストの閲覧
          </li>
        </ul>
        <Button
          onClick={onCheckout}
          disabled={loading}
          className="mt-6 w-full"
          data-testid="pricing-checkout"
        >
          {loading ? "処理中…" : "プロで始める"}
        </Button>
      </Card>
    </div>
  );
}
