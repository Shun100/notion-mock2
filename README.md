# Notionモックアプリ

## 環境セットアップ

### 1. nvmのインストール

- 以下のサイトから`nvm-steup.exe`をダウンロード
- https://github.com/coreybutler/nvm-windows/releases

### 2. Node.jsのインストール・アップデート

```PowerShell
<!-- Node.jsのバージョン確認 -->
PS C:\Workspace> npm --version
11.3.0

<!-- Node.jsのアップデート -->
PS C:\Workspace> nvm install 20.19.0

<!-- アップデートしたバージョンを使用する -->
PS C:\Workspace> nvm use 20.19.0
Now using node v20.19.0 (64-bit)
```

### 3. プロジェクトのセットアップ

```PowerShell
<!-- プロジェクトを作成するフォルダに移動 -->
PS C:\Workspace> cd C:\Workspace\TypeScript\repo

<!-- プロジェクト作成コマンドを実行 -->
PS C:\Workspace\TypeScript\repo> npm create vite@latest
> npx
> create-vite

│
◇  Project name:
│  notion-mock2
│
◇  Select a framework:
│  React
│
◇  Select a variant:
│  TypeScript
│
◇  Install with npm and start now?
│  No
│
◇  Scaffolding project in C:\Workspace\TypeScript\repo\notion-mock2...
│
└  Done. Now run:

  cd notion-mock2
  npm install
  npm run dev

<!-- プロジェクトフォルダに移動 -->
PS C:\Workspace\TypeScript\repo> cd .\notion-mock2\

<!-- 依存ライブラリをインストール -->
PS C:\Workspace\TypeScript\repo\notion-mock2> npm install

<!-- 開発用サーバの起動確認 -->
PS C:\Workspace\TypeScript\repo\notion-mock2> npm run dev

<!-- 追加の依存ライブラリをインストール -->
PS C:\Workspace\TypeScript\repo\notion-mock2> npm install react-router-dom react-icons cmdk
PS C:\Workspace\TypeScript\repo\notion-mock2> npm install axios
```

- 途中で失敗して再インストールしたい場合

```PowerShell
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

## 実行方法

- `npm run dev`

## プロジェクト構成

```text
.
├── .env                : 環境変数
├── public              : そのまま配信される静的ファイル
├── src
│   ├── components      : 各ページの中の部品を表すReactコンポーネント
│   ├── modules         : repository, service, entity
│   ├── lib             : ライブラリの設定
│   ├── pages           : 各ページの全体を表すReactコンポーネント
│   ├── styles          : CSS
│   ├── App.tsx         : アプリ全体のルートを表すReactコンポーネント
│   ├── index.css       : グローバルCSS
│   ├── Layout.tsx      : 共通レイアウトを表すReactコンポーネント
│   └── main.tsx        : エントリーポイント (App.tsxをindex.htmlに描画する)
├── eslint.config.js    : ESLintの設定ファイル
├── index.html          : アプリのHTML
├── package-lock.json   : 依存パッケージのバージョンを固定するための設定ファイル (npmが自動生成する)
├── package.json        : プロジェクト設定・依存関係の設定ファイル (人が管理する)
├── tsconfig.app.json   : ブラウザで動くアプリ用(フロントエンド用)のTypeScript設定ファイル
├── tsconfig.json       : TypeScript全体用の設定ファイル
├── tsconfig.node.json  : Node.js環境用(ビルドツール・開発ツール用)のTypeScript設定ファイル
└── vite.config.ts      : Viteの設定ファイル
```

## 初回コミット手順

```PowerShell
<!-- Git初期化 -->
git init

<!-- ファイルをステージング -->
git add .

<!-- コミット -->
git commit -m "Initial commit"

<!-- GitHubリポジトリを登録 -->
git remote add origin https://github.com/Shun100/notion-mock2.git

<!-- push -->
git branch -M main
git push -u origin main

<!-- エラー -->
PS C:\Workspace\TypeScript\repo\notion-mock2> git push -u origin main
To https://github.com/Shun100/notion-mock2
 ! [rejected]        main -> main (fetch first)
error: failed to push some refs to 'https://github.com/Shun100/notion-mock2'
hint: Updates were rejected because the remote contains work that you do not
hint: have locally. This is usually caused by another repository pushing to
hint: the same ref. If you want to integrate the remote changes, use
hint: 'git pull' before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.

<!-- リモートリポジトリの内容を取り込む -->
git pull origin main --rebase

<!-- 再度push (どちらのコマンドも同じ) -->
git push -u origin main
git push --set-upstream origin main
```

## API一覧

| 機能名     | URL                          |
| ---------- | ---------------------------- |
| ユーザ登録 | `localhost:8888/auth/signup` |

## メモ

- ログイン機能の実装方法
  - トークンが無ければサインインページにリダイレクトする
  - そのために、全ページにトークンチェックを実装する必要があるが、共通処理なのでどう実装するのか
