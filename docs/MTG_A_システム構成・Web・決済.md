# MTG資料 A｜システム構成・Web側・決済確認
**アジェンダ2** ／ 想定時間: 15分  
**目的:** 技術スタック・プラン設計・Stripe連携の方針をこの場で確定する

---

## 1. システム全体アーキテクチャ

```
【Windows（Shibata様PC）】
  CrossFactor（競馬ソフト）
    └─ SQLite DB
         └─ Python 抽出スクリプト
              └─ AI推論（勝率・期待値算出）
                   └─ Supabase REST API へ自動アップロード
                        └─ Windowsタスクスケジューラで定期実行

【クラウド】
  Supabase
    ├─ PostgreSQL DB（予測データ保存）
    ├─ Auth（認証・JWT）
    ├─ RLS（行レベルセキュリティ＝プラン別アクセス制御）
    └─ Edge Functions（Stripe Webhook受信）

  Vercel
    └─ Next.js（Web フロントエンド）
         ├─ 出馬表＋予測結果表示
         ├─ Stripe決済ページ
         └─ プラン別UI出し分け

【決済】
  Stripe Billing（サブスクリプション管理）
    └─ Webhook → Supabase → プラン更新 → RLS即時反映
```

---

## 2. プラン別権限マトリクス（確認・合意が必要）

| 表示データ | 未登録 | プロプラン |
|-----------|:-----:|:---------:|
| 出馬表（馬名・枠番・オッズ） | ○ | ○ |
| 予想勝率（%） | × | ○ |
| 予想連対率・複勝率 | × | ○ |
| 期待値 | × | ○ |

> **※ △は「ぼかし表示／上位N頭のみ」等の中間パターンも検討可**  
> **→ 明日の打ち合わせで各行を確定してください**

### 確認事項（この15分で決める）

- [ ] **未登録で勝率を見せるか/隠すか**（集客と有料転換率のトレードオフ）
- [ ] **無料とプロの明確な差別化ポイント**（期待値をプロ限定で合意できるか）
- [ ] **プランの料金設定**（月額いくら？）

---

## 3. Stripe決済フロー

```
ユーザー（未登録）
  → Webサイト訪問
  → 「プランを選択」ボタン
  → Stripe Checkout（カード入力）
  → 決済成功
  → Stripe Webhook（customer.subscription.created）
  → Supabase users.plan カラム更新（'free' → 'pro'）
  → Supabase RLS が自動的に閲覧権限を拡張
  → ユーザーはリロードなしに追加データが見える
```

### 解約・プランダウン時

```
Stripe側で解約 or プランダウン
  → Webhook（customer.subscription.updated / deleted）
  → Supabase users.plan を即時降格
  → 次回アクセス時から制限データが非表示
```

### 確認事項

- [ ] **プラン変更の即時反映 vs 次回更新日適用**（どちらが運用しやすいか）
- [ ] **無料トライアル期間を設けるか**（例: 7日間無料）

---

## 4. RLS（行レベルセキュリティ）の仕組み

```sql
-- Supabase RLS ポリシー例
-- proプランのユーザーのみ期待値カラムにアクセス可
CREATE POLICY "pro_only_expected_value"
  ON predictions
  FOR SELECT
  USING (
    auth.jwt() -> 'user_metadata' ->> 'plan' = 'pro'
  );
```

> **ポイント:** フロントエンドでの表示制御（JS）だけでは不十分。  
> APIレベル（Supabase RLS）でもデータを遮断するため、ブラウザのDevToolsから  
> 制限データを覗かれることはありません。

---

## 5. Figmaデザイン連携について

| 項目 | 方針 |
|------|------|
| デザイン参照 | Figmaファイルを共有いただき、Next.jsで再現 |
| MVPのUI優先度 | AI予測データの表示＞デザイン完全再現（第2フェーズ） |
| コンポーネント | Tailwind CSS + shadcn/ui でFigmaに近い実装を効率化 |

### 確認事項

- [ ] **FigmaファイルのURL/共有**（打ち合わせ後に共有いただけるか）
- [ ] **デザインの優先度**（MVP段階でのデザイン完成度のゴール設定）
