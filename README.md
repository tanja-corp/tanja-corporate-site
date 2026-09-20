# TANJA Corporate Website — V2 静的プロトタイプ

タンザニア国内での TANJA の認知と信頼を広げるための、1ページ型（ロングスクロール）の静的プロトタイプです。第一の読者は TANJA で働く人々と周辺地域、次にタンザニアの企業・行政・協業候補、その次に求職者です。日本企業向けの営業サイトではありません。

## Preview

`index.html` をブラウザーで開いてください。ビルドツール・外部ライブラリ・Webフォント・外部通信はありません（HTML／CSS／JavaScript のみ）。

## 構成

表示するのは次の5セクションです（順序固定）。

1. Home ＝ Hero（写真1枚）
2. About（Our Company / Our Staff / Vision・Mission）
3. What We Do（Farm: Coffee・Macadamia・Avocado ／ Project: Carbon・School。Project は増やせる作り）
4. Career（現在の募集は主張しない。応募ボタンなし）
5. Contact（Email・Phone・Instagram・Facebook。フォームなし）

News / Updates は今回の表示対象外です。`index.html` の該当箇所に挿入位置を記してあります。

言語は EN（既定）／SW／JP。ヘッダーで切り替え、選択は端末に記憶します。JavaScript が無効でも英語版とナビゲーションは読めます。SW と JP は未承認の下書きで、画面にもその旨を表示しています。

## ファイル

- `index.html` — 構造と3言語の本文。冒頭コメントに編集規約
- `styles.css` — デザイントークン（色・文字・余白）とレイアウト
- `script.js` — 言語切替、モバイルメニュー、ヘッダー切替（補助機能のみ）
- `assets/images/` — スロット番号付きの最適化済み写真（WebP＋JPEG）
- `docs/V2_IMPLEMENTATION_NOTES.md` — 実装ノート（設計判断、プレースホルダー一覧、承認が必要な事実、WordPress移行メモ）
- `docs/PHOTO_MANIFEST.md` — 写真スロットごとの台帳（出所、承認状態、比率、代替テキスト）
- `docs/WEB_V2_WORKING_BRIEF.md` / `CONTENT_SOURCE_MAP.md` — 要件と情報源の基準
- `archive/` — 旧版の退避先（ローカル管理で未コミット）。参考用でライブ版ではありません

## Important

これは企画確認用のデモです。未確認の内容（Vision／Mission、スタッフ、連絡先、SNS、募集、写真の一部）は、明示したプレースホルダーです。事実を創作して埋めてはいません。既存ドメインのWordPress、DNS、本番環境への接続・変更・デプロイは行いません。
