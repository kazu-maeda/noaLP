# noa LP

スキンケアブランド「noa」のランディングページ実装。

- **公開URL**: https://noalp.vercel.app/
- **GitHub**: https://github.com/kazu-maeda/noaLP

## 技術構成

- HTML / CSS / JavaScript（フレームワーク不使用）
- 基準幅：1440px（PC） / 768px以下をブレークポイントとしたスマホ対応

## ファイル構成

```
index.html
css/style.css
js/main.js
images/
  アセット 41-80.jpg   … hero左パネル背景（紙質テクスチャー）
  アセット 42-80.jpg   … hero右ビジュアル（ボトル写真、PC/SP共通）
  アセット 43-80.jpg   … concept セクション大画像（ポートレート）
  アセット 44-80.jpg   … concept セクション小画像（テクスチャーアップ）
  アセット 45-80.jpg   … ingredients「セラミド」
  アセット 46-80.jpg   … ingredients「ツボクサエキス」
  アセット 47-80.jpg   … ingredients「ヒアルロン酸」
  アセット 49-80.jpg   … moisture バナー背景（横長）
  アセット 51-80.jpg   … cta セクション背景（横長・暗め）
  hero-mobile-visual.jpg … 現在未使用（下記「補足」参照）
  noaFV.スマホ.jpg     … スマホ版hero検討用にいただいた元データ（参照用）
```

## セクション構成

1. header（固定ヘッダー、PCは透明→スクロールでクリーム背景に切替、SPはハンバーガーメニュー）
2. hero（メインビジュアル＋キャッチコピー）
3. features（5つの無添加 等、4項目）
4. concept（肌がよろこぶ、シンプルな処方。）
5. ingredients（自然の力で、肌を整える。／成分3種）
6. moisture（うるおいが満ちると、毎日が少し、心地よくなる。／横長バナー）
7. voice（お客様の声、カード3件＋VIEW MORE）
8. cta（「肌に、余計なものはいらない。」）
9. footer（コピーライトのみ・簡易）

## PC版について

- 完成デザインカンプ（1440×2627）をピクセル単位で実測しながら実装
- header〜heroは特に細かく調整（左右比率、高さ、余白、ボタン位置、見出しハイライト帯の位置など）
- 背景画像・大型ビジュアルは画面幅いっぱい、テキストコンテンツは`--pad-x`（可変）で余白を確保

## スマホ版について

- 768px以下をブレークポイントとしてレイアウトを縦積みに変更
- **hero**：いただいたイラレ案（`noaFV.スマホ.jpg`）を参考に、ボトル写真の右側にキャッチコピーを縦書き（`writing-mode: vertical-rl`）で重ねる構成。文字は実テキストのままなので、後述の1文字ずつのアニメーションもPC同様に効く
- header：スマホでは常時クリーム背景の固定ヘッダー＋ハンバーガーメニュー

### 補足：`hero-mobile-visual.jpg` について

一時、キャッチコピーを画像に焼き込んだ1枚画像（`noaFV.スマホ.jpg`から切り出した`hero-mobile-visual.jpg`）を使う実装にしていましたが、「1文字ずつ流れるアニメーション」をスマホでも効かせるために、見出しは実テキスト＋CSSの縦書きで再現する方式に変更しました。そのため`hero-mobile-visual.jpg`は現在未使用です（削除はせず残してあります）。

## 実装した動き（アニメーション）

- **hero見出し**：1文字ずつ流れるように表示（JSで文字をspan分解し、45msずつ遅延させてフェードイン）。見出し下のハイライト帯も左から右へ伸びる演出
- **スクロールリビール**：features／concept／ingredients／moisture／voice／ctaの各セクションが、画面に入ったタイミングでふわっとフェードイン＋下から少し上がる動き（IntersectionObserver）。グリッド・リスト系は子要素が少しずつ時差で表示
- **ヘッダー**：`position: fixed`に変更し、20pxスクロールでクリーム背景＋シャドウに切替、ナビ文字色も自動で反転
- **モバイルメニュー**：開閉を`max-height`＋`opacity`のスライドフェードに変更
- `prefers-reduced-motion`（モーション抑制設定）時は上記アニメーションを無効化して即表示

## 今後の対応候補（未着手）

- FAQセクション（ヘッダーナビに`#faq`リンクがあるが、対応するセクション自体は未作成）
- LOGIN／CART／各種CTAボタンの遷移先（すべて`href="#"`のダミー）
- concept／ingredients／cta セクションのPC細部デザイン調整（header・heroほど細かく詰めていない）
- お問い合わせフォーム等、LP以降の導線

## ローカル確認方法

```
python3 -m http.server 8765
```

`http://localhost:8765/index.html` にアクセス。

## デプロイ

GitHubリポジトリ(`kazu-maeda/noaLP`)にpushすると、Vercel側で自動的に本番反映されます。
静的サイトのため`vercel.json`やビルド設定は不要です(Framework Preset: `Other`)。

- **公開URL**: https://noalp.vercel.app/
- **GitHub**: https://github.com/kazu-maeda/noaLP
- **Vercelプロジェクト**: `kazuya-m1/noalp`(プロジェクト名は小文字必須のため`noaLP`ではなく`noalp`)

デザインカンプ元ファイル(`noaLP.jpg` / `noa.ai`)や作業用キャプチャ(`.playwright-mcp/`)はリポジトリ・デプロイ対象から除外しています(`.gitignore` / `.vercelignore`)。

### 初回セットアップ手順(実施済み)

1. `.gitignore`を作成し、デザインカンプ元ファイル・作業用キャプチャ・`.DS_Store`を除外
2. `git init` → `git add -A` → 初回コミット
3. `gh repo create kazu-maeda/noaLP --public --source=. --remote=origin --push`でGitHubリポジトリを作成しpush
4. `vercel link --yes --project noalp`でVercelプロジェクトを新規作成し、GitHubリポジトリと自動連携
5. `vercel --prod --yes`で本番デプロイ

### ハマったポイント

- 初回の`vercel --prod`は`.gitignore`を参照せず、`.vercelignore`が無い状態だったため`noa.ai`(約90MB)や`.playwright-mcp/`まで含めてアップロードしてしまった(92.3MB / 80ファイル)。
- `.vercelignore`を`.gitignore`と同内容で追加し再デプロイしたところ、17ファイルのみの軽量デプロイになった。肥大化した旧デプロイは`vercel remove`で削除済み。
- → **Git経由の自動デプロイと、`vercel` CLIでの直接デプロイは除外ルールが別物**なので、どちらを使う場合も`.vercelignore`を用意しておくのが安全。
