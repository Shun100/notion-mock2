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
Downloading node.js version 20.19.0 (64-bit)...
Extracting node and npm...
Complete
Installation complete.
If you want to use this version, type:

nvm use 20.19.0

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

added 204 packages, and audited 205 packages in 10s

60 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

<!-- 開発用サーバの起動確認 -->
PS C:\Workspace\TypeScript\repo\notion-mock2> npm run dev

> notion-mock2@0.0.0 dev
> vite


  VITE v8.0.0  ready in 1009 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

- 途中で失敗して再インストールしたい場合

```PowerShell
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
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

<!-- 再度push -->
git push origin main
```
