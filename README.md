# TANJA Corporate Website — V2 静的プロトタイプ

タンザニア国内での TANJA の認知と信頼を広げるための、1ページ型（ロングスクロール）の静的プロトタイプです。第一の読者は TANJA で働く人々と周辺地域、次にタンザニアの企業・行政・協業候補、その次に求職者です。日本企業向けの営業サイトではありません。

## Preview

`index.html` をブラウザーで開いてください。ビルドツール・外部ライブラリ・Webフォント・外部通信はありません（HTML／CSS／JavaScript のみ）。
`package.json` はCI／開発時の動作確認専用（Playwrightを使う）で、サイト本体のビルド手順ではありません。詳しくは「テスト（CI）」を参照。

## 構成

2026-09-25 のWeb Development Meetingの決定、および2026-09-26のユーザー指示により、表示するのは次の5セクションです（順序固定）。

1. Home ＝ Hero（2026-09-26からゆっくり切り替わる3枚の写真ローテーション。既存のHero／Coffee／Careerの写真を再利用。JavaScript無効時や`prefers-reduced-motion`では元の静止1枚に戻る。ホワイトボード案のCoffee→Avocado→Macadamiaではない — Drive共有が未解決のため）
2. About（Our Companyのみ：TANJAとは何か・名前の意味＝VERIFY・いつ始まったか）
3. What We Do（3系統：Farm＝Coffee・Avocado・Macadamia・Beekeeping ／ Sustainability＝Carbon Credit・Lunch・Cattle（増やせる作り）／ Cafe＝単独のfeature block）
4. Career（現在の募集は主張しない。応募ボタンなし）
5. Contact（Email・Phone・Instagram・Facebook。フォームなし）

各What We Do項目のタイトルは `what-we-do.html`（2026-09-26追加）の該当アンカーへのリンクになっている。このページは全項目にジャンプできる目次を持ち、Coffeeを実例として「Overview／Growing & processing／Status」の詳細枠を用意、他の項目は同じ枠でOverview＋プレースホルダーのみ。

Vision / Mission は2026-09-25のホワイトボードから外れたため非表示です。Our Staff は2026-09-25にAboutから独立したが、2026-09-26にユーザー指示で削除しました。いずれも `architecture/model.js` に "planned"（ghost）として残置、`styles.css` のCSSも残置（再表示可能）。
News / Updates は今回の表示対象外です。`index.html` の該当箇所に挿入位置を記してあります。

言語は EN（既定）／SW／JP。ヘッダーで切り替え、選択は端末に記憶します。JavaScript が無効でも英語版とナビゲーションは読めます。SW と JP の各文言は `data-review="draft"`（未承認）を持ち、承認した文言だけ `reviewed` に直します。下書きが残るセクションの上端にだけ小さな「翻訳は下書き」の目印が出て、最後の1件を承認すると自動で消えます。

## ファイル

- `index.html` — 構造と3言語の本文。冒頭コメントに編集規約
- `what-we-do.html` — What We Do の詳細ページ（2026-09-26追加）。全項目にジャンプできる目次と、項目ごとの詳細枠
- `styles.css` — デザイントークン（色・文字・余白）と、12列の編集レイアウト（`.wrap`）。デスクトップ1440pxを主画面に設計し、1024→768→スマホの順に組み替える
- `script.js` — 言語切替、モバイルメニュー、ヘッダー切替（補助機能のみ）
- `assets/images/` — スロット番号付きの最適化済み写真（WebP＋JPEG）
- `docs/V2_IMPLEMENTATION_NOTES.md` — 実装ノート（設計判断、プレースホルダー一覧、承認が必要な事実、WordPress移行メモ）
- `architecture/` — **オブジェクトマップ**。デザインデータ・概念図・ER図を同じキャンバスに載せ、メニューひとつで行き来できる。3つとも `model.js` の1ファイルから描かれ、直すと全部に追従する。`index.html` を開く。使い方は `architecture/README.md`
- `docs/PHOTO_MANIFEST.md` — 写真スロットごとの台帳（出所、承認状態、比率、代替テキスト）
- `docs/WEB_V2_WORKING_BRIEF.md` / `CONTENT_SOURCE_MAP.md` — 要件と情報源の基準
- `archive/` — 旧版の退避先（ローカル管理で未コミット）。参考用でライブ版ではありません
- `package.json` / `scripts/verify-render.js` — CI／開発時の動作確認専用（Playwright）。サイト本体はこれに依存しない
- `.github/workflows/verify.yml` — 全ブランチのpush／PRで自動動作確認（次項）。`pages.yml` はGitHub Pagesへのデプロイ専用で別物

## テスト（CI）

`.github/workflows/verify.yml` が、**すべてのブランチへのpush**とプルリクエストで自動的に動作確認を行う（GitHub Actions）。内容：

1. `node architecture/check.js` — `architecture/model.js` とサイト本体（`index.html`／`styles.css`）の整合性チェック
2. `node architecture/test-core.js` — オブジェクトマップの内部ロジックのテスト
3. `node scripts/verify-render.js` — Playwrightで実際にページを開き、EN／SW／JP × 1440／1024／768／390pxでコンソールエラー・横スクロール・セクション順序・カード数を確認、モバイルメニューの開閉、JavaScript無効時のフォールバック、`architecture/` ビューアの3ビューも確認

ローカルで同じことを実行するには（初回のみ `npm install` が必要。Playwrightのみで、サイト本体のビルド手順ではない）：

```
npm install
npm test          # 上記3つをまとめて実行
```

サイトの構成（セクション順序・カード数など）を意図的に変えたときは、`scripts/verify-render.js` 冒頭の定数（`EXPECTED_SECTION_ORDER` など）も、`architecture/model.js` と同様に更新すること。

## Important

これは企画確認用のデモです。未確認の内容（Vision／Mission、スタッフ、連絡先、SNS、募集、写真の一部）は、明示したプレースホルダーです。事実を創作して埋めてはいません。既存ドメインのWordPress、DNS、本番環境への接続・変更・デプロイは行いません。
