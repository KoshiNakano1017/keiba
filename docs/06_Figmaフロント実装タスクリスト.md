# Figmaからフロント実装を行うためのタスクリスト

**対象:** CrossFactor AI Webフロント  
**目的:** Figmaを起点に、保守・改修しやすい `Next.js` フロントエンドを実装するための具体的な作業手順を定義する  
**前提:** クライアントから共有されたURLが `Figma Make` の場合、実装仕様の取得元としては不十分なことがあるため、必要に応じて通常の `Figma Design file` を追加で取得する

---

## 参考にした一次情報

- [Figma: Guide to inspecting](https://help.figma.com/hc/en-us/articles/22012921621015-Guide-to-inspecting)
- [Figma: Add measurements and annotate designs in Dev Mode](https://help.figma.com/hc/en-us/articles/20774752502935-Add-measurements-and-annotate-designs-in-Dev-Mode)
- [Figma Developers: Intro to Figma Make](https://developers.figma.com/docs/code/intro-to-figma-make/)
- [Next.js: Project structure and colocation](https://nextjs.org/docs/app/building-your-application/routing/colocation)
- [Next.js: Accessibility](https://nextjs.org/docs/accessibility)
- [Tailwind CSS: Responsive design](https://tailwindcss.com/docs/responsive-design/)
- [Tailwind CSS: Theme variables](https://tailwindcss.com/docs/theme)

---

## 方針

- `Figma Make` の見た目だけを頼りに実装を始めない
- 実装前に、画面仕様を `構造化された情報` として取得する
- `Next.js App Router` と `Tailwind CSS` を前提に、再利用しやすいUI部品へ分解する
- ページ単位の見た目再現より、`状態管理`、`アクセシビリティ`、`改修容易性` を優先する
- Figma上の値をそのままコードへ埋め込まず、必要に応じて `デザイントークン` に変換する

---

## 1. 共有物と前提の確認

- [ ] クライアント共有のURLが `Figma Make` なのか `Figma Design file` なのかを確認する
- [ ] `Figma Make` しかない場合、通常の `Figma Design file` が存在するかをクライアントへ確認する
- [ ] 自分のアクセス権が `view-only` か `can edit` か、`Dev Mode` を使えるかを確認する
- [ ] 対象画面の一覧を確定する
- [ ] PC版だけでなく `SP版` と必要なら `タブレット版` の有無を確認する
- [ ] ログイン状態、未ログイン状態、プラン別状態など、画面差分の有無を確認する
- [ ] ロゴ、画像、アイコン、フォントの共有方法を確認する

### クライアントに確認すべき項目

- [ ] `make` ではなく通常の `design` または `file` URL を共有可能か
- [ ] 画面ごとの状態差分は存在するか
- [ ] `未ログイン / 無料 / プロ` の各状態デザインがあるか
- [ ] `hover / focus / disabled / loading / empty / error` の状態定義があるか
- [ ] 使用フォント名と利用条件が確定しているか
- [ ] 画像素材を `SVG / PNG / JPEG` のどれで受け取るか

---

## 2. Figmaから取得すべき設計情報

- [ ] 画面全体の `Frame size` を取得する
- [ ] 各セクションの `width / height` を取得する
- [ ] 背景色、ボタン色、文字色、境界線色などの `color` を取得する
- [ ] テキストごとの `font family / size / weight / line-height / letter spacing` を取得する
- [ ] 親コンテナごとの `Auto Layout direction / gap / alignment` を取得する
- [ ] `padding top / right / bottom / left` を取得する
- [ ] カードやボタンの `radius / border / shadow` を取得する
- [ ] 画像やアイコンの表示サイズと書き出し形式を取得する
- [ ] 必要な箇所の要素間距離を `Option` キー計測で確認する
- [ ] Dev Mode が使える場合は `annotations` と `measurements` の有無を確認する

### 取得対象の分解例

- [ ] `Header`
- [ ] `Logo`
- [ ] `PlanTabs`
- [ ] `PrimaryButton`
- [ ] `SecondaryButton`
- [ ] `Hero`
- [ ] `HeroImage`
- [ ] `DateChip`
- [ ] `PremiumLockedSection`
- [ ] `OverlayLabel`
- [ ] `RaceCardList`
- [ ] `RaceCardRow`

---

## 3. 取得情報を実装仕様へ変換

- [ ] Figmaの値をそのまま列挙するだけでなく、実装用の仕様メモに整理する
- [ ] セクションごとに `役割` と `責務` を明文化する
- [ ] 画面内の状態を一覧化する
- [ ] ボタン押下時の遷移先やイベントを整理する
- [ ] データ表示箇所と固定文言を分離する
- [ ] 見た目の仕様と業務ロジックを混ぜない
- [ ] 画像アセット一覧を作成する
- [ ] デザインとの差分許容ルールを決める

### 実装仕様メモに最低限入れる内容

- [ ] 画面名
- [ ] 主要セクション構成
- [ ] PC時のレイアウト
- [ ] SP時のレイアウト
- [ ] 各コンポーネント名
- [ ] 状態一覧
- [ ] 制御条件
- [ ] 画像アセット一覧

---

## 4. フロント実装の構成設計

- [ ] `Next.js App Router` を前提にルーティング構成を決める
- [ ] `src` を使うかどうかを決め、以後統一する
- [ ] `layout.tsx` に共通UIを置く範囲を決める
- [ ] 画面固有UIと共通UIの切り分けルールを決める
- [ ] `components/ui` と `components/features` の責務を分ける
- [ ] `lib`, `types`, `constants`, `mocks` の配置方針を決める
- [ ] データフェッチを行う層と表示コンポーネント層を分離する
- [ ] ページに直接大量のUIを書かない方針を徹底する

### 推奨ディレクトリ例

```text
src/
  app/
    (marketing)/
      page.tsx
      layout.tsx
  components/
    ui/
    features/
  lib/
  types/
  constants/
  mocks/
```

---

## 5. デザイントークン設計

- [ ] 色を `primary`, `surface`, `text`, `muted`, `border` などの役割名で整理する
- [ ] タイポグラフィを `heading`, `body`, `caption` などに整理する
- [ ] 余白を `spacing scale` として整理する
- [ ] `radius`, `shadow`, `border` を再利用可能な単位に整理する
- [ ] 頻出するFigma値は `Tailwind` のテーマ変数に寄せる
- [ ] 一時的な `arbitrary value` を増やしすぎない

### トークン設計の意図

- [ ] Figma変更時に影響箇所を追いやすくする
- [ ] UIの横展開をしやすくする
- [ ] 微妙に違う値が乱立するのを防ぐ
- [ ] デザインの一貫性を保つ

---

## 6. コンポーネント分割設計

- [ ] ページ全体をセクション単位で分割する
- [ ] 共通で使う `Button`, `Card`, `Chip`, `Badge` を先に切り出す
- [ ] `Header` の内部要素を必要に応じて分割する
- [ ] `Hero` はテキスト領域と画像領域を分離する
- [ ] `PremiumLockedSection` はロック状態の表現責務を閉じ込める
- [ ] `RaceCardList` と `RaceCardItem` を分ける
- [ ] props には意味のある名前を付ける
- [ ] Figmaのレイヤー名をそのままコード名に使わない

### コンポーネント設計ルール

- [ ] `見た目の差分` は `variant` などで表現する
- [ ] `業務データ` と `スタイル制御` のpropsを分ける
- [ ] 親が持つべき状態を子へ押し込みすぎない
- [ ] 再利用しないものは無理に共通化しすぎない

---

## 7. 実装順序

- [ ] 最初に `page.tsx` の骨組みだけ作る
- [ ] 次に共通UI部品を実装する
- [ ] `Header` を実装する
- [ ] `Hero` を実装する
- [ ] `DateChip` を実装する
- [ ] `PremiumLockedSection` を実装する
- [ ] `RaceCardList` をダミーデータで実装する
- [ ] 必要に応じて `layout.tsx` へ共通要素を移す
- [ ] 最後に画面全体の余白とレイアウトを詰める

### 画面実装時の注意

- [ ] いきなりピクセル単位の微調整から始めない
- [ ] まず `構造`, 次に `共通部品`, 最後に `見た目` の順で進める
- [ ] ダミーデータでコンポーネント境界を固めてからAPI接続を行う
- [ ] Figma上にない状態も運用上必要なら実装に含める

---

## 8. レスポンシブ対応

- [ ] `Tailwind` の mobile-first 前提で実装する
- [ ] まずモバイルで自然に積める構造にする
- [ ] `md`, `lg` 以上で横並びや余白拡張を行う
- [ ] ヘッダーのナビが狭幅で崩れないか確認する
- [ ] Hero画像の比率が画面幅で破綻しないか確認する
- [ ] テキスト折返しとボタン幅をSPで確認する
- [ ] ぼかしオーバーレイが各幅で適切に見えるか確認する

---

## 9. 画像・フォント・アセット対応

- [ ] 画像は `next/image` を優先して使う
- [ ] 外部画像を使う場合は `width`, `height`, `alt` を必ず明示する
- [ ] ローカルアセットの配置場所を決める
- [ ] アイコンは可能なら `SVG` で管理する
- [ ] フォントは `next/font` の利用を優先する
- [ ] ブランドフォントが使えない場合の代替フォントを決める

### アセット受領時の確認

- [ ] 実装用の実画像か仮画像か
- [ ] 画像差し替えが予定されているか
- [ ] 透過画像が必要か
- [ ] OGPやfaviconの作成が必要か

---

## 10. アクセシビリティ対応

- [ ] `header`, `nav`, `main`, `section`, `button`, `ul`, `li` などのセマンティック要素を使う
- [ ] 画像には適切な `alt` を設定する
- [ ] 装飾画像は空の `alt` にする
- [ ] キーボード操作でCTAへ到達できることを確認する
- [ ] `focus-visible` の見た目を確保する
- [ ] 色コントラストが不足していないか確認する
- [ ] ページごとに適切な `title` を設定する
- [ ] `aria-*` は必要なときだけ適切に使う

---

## 11. Figmaとの差分確認

- [ ] 主要フレームごとに見比べ確認を行う
- [ ] 余白、フォントサイズ、行間、角丸、影を重点確認する
- [ ] `Option` 計測で主要要素間の距離を確認する
- [ ] SP表示時に意図しない崩れがないか確認する
- [ ] 意図的に変えた箇所を一覧化する
- [ ] 未確定仕様による差分を明記する

### レビュー前にまとめること

- [ ] Figmaと一致している点
- [ ] 仕様未確定で仮置きした点
- [ ] 改修しやすさのために設計変更した点
- [ ] クライアント確認が必要な点

---

## 12. 仕上げと納品前整理

- [ ] `page.tsx` にロジックやUIが集中しすぎていないか見直す
- [ ] 仮データを `mocks` や `constants` に分離する
- [ ] 未使用コンポーネントや不要クラスを削除する
- [ ] `lint` と型チェックを通す
- [ ] PCとSPの主要画面を最終確認する
- [ ] 実装メモに `参照したFigmaファイル` と `未確定事項` を残す

---

## Makeしかない場合の代替フロー

- [ ] クライアントに `通常のFigma Design fileがない` 前提で進めてよいか確認する
- [ ] スクリーンショット単位でセクション構成を文章化する
- [ ] 文言、導線、画面状態、制御条件をクライアントへ追加確認する
- [ ] `ピクセル完全一致` ではなく `運用しやすいUI` を優先して実装する
- [ ] 差分レビューで詰める前提を共有する

---

## この案件で優先的に確認したい事項

- [ ] `Figma Design file` の共有可否
- [ ] `SP版` の有無
- [ ] `未ログイン / 無料 / プロ` の状態差分
- [ ] `PremiumLockedSection` の解放条件
- [ ] CTAボタンの遷移先
- [ ] 画像とロゴの書き出し元
- [ ] 使用フォントの正式指定
