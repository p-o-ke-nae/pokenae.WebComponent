# Pokenae WebComponent - コンポーネントライブラリ

## 概要

このプロジェクトは `pokenae.Web` で使用する再利用可能な React コンポーネントライブラリです。

## 役割分担

- **pokenae.WebComponent**: UI コンポーネントライブラリ（この プロジェクト）
- **pokenae.Web**: 実際の Web アプリケーション（ページ構成）

## コンポーネント構成

### 基本 UI コンポーネント

- `CustomButton` - カスタムボタン
- `CustomButtonNavigation` - ナビゲーション用ボタン
- `CustomButtonPost` - 投稿用ボタン
- `CustomCheckBox` - チェックボックス
- `CustomHeader` - ヘッダー
- `CustomImage` - 画像表示
- `CustomLabel` - ラベル
- `CustomLoading` - ローディング表示
- `CustomModal` - モーダルダイアログ
- `CustomRadioButton` - ラジオボタン
- `CustomSpinBox` - 数値入力
- `CustomTextBox` - テキスト入力

### メッセージ関連コンポーネント

- `CustomMessageArea` - メッセージ表示エリア
- `CustomMessageDialog` - メッセージダイアログ

### テーブル関連コンポーネント

- `CustomTable` - テーブル
- `CustomTableHeader` - テーブルヘッダー
- `CustomTableRow` - テーブル行
- `CustomPagination` - ページネーション
- `CustomRecordsPerPageSelector` - 表示件数選択

### レイアウトコンポーネント

- `Layout` - 基本レイアウト
- `Header` - ヘッダーレイアウト
- `Footer` - フッターレイアウト
- `Sidebar` - サイドバー
- `RightSidebar` - 右サイドバー
- `Login` - ログインコンポーネント
- `Callback` - コールバック処理

### コンテキスト（状態管理）

- `AppContext` - アプリケーション全体の状態
- `PageModeContext` - ページモード管理

### ユーティリティ

- `api` - API 通信関連
- `permissions` - 権限管理
- `validation` - バリデーション機能
- `FormMetaData` - フォームメタデータ

## ディレクトリ構造

```
src/
├── components/                   # 基本UIコンポーネント
│   ├── index.js                  # コンポーネントエクスポート
│   ├── CustomButton.jsx
│   ├── CustomButton.module.css
│   ├── CustomCheckBox.jsx
│   ├── CustomCheckBox.module.css
│   ├── CustomHeader.jsx
│   ├── CustomHeader.module.css
│   ├── CustomTable.jsx
│   ├── CustomTable.module.css
│   └── ... (その他のコンポーネント)
├── containercomponents/          # レイアウトコンポーネント
│   ├── Layout.jsx
│   ├── Layout.module.css
│   ├── Header.jsx
│   ├── Header.module.css
│   └── ... (その他のレイアウト)
├── context/                      # React Context
│   ├── AppContext.js
│   └── PageModeContext.js
├── utils/                        # ユーティリティ関数
│   ├── api.js
│   ├── permissions.js
│   └── validation.js
└── metadata/                     # メタデータ
    └── FormMetaData.ts
```

## 技術スタック

- **フレームワーク**: React 19
- **スタイリング**: CSS Modules
- **状態管理**: React Context API
- **ビルドツール**: Webpack, Next.js (開発時)

## 使用方法

### pokenae.Web での使用例

```javascript
import {
  CustomButton,
  CustomTable,
  Layout,
  AppProvider,
} from "pokenae-webcomponent";

function MyPage() {
  return (
    <AppProvider>
      <Layout>
        <CustomButton onClick={handleClick}>クリック</CustomButton>
        <CustomTable data={tableData} />
      </Layout>
    </AppProvider>
  );
}
```

## 開発・運用

### 開発サーバーの起動（コンポーネントテスト用）

```bash
npm run dev
```

### コンポーネントのビルド

```bash
npm run build:components
```

### 新しいコンポーネントの追加

1. `src/components/` に新しいコンポーネントファイルを作成
2. 対応する CSS Modules ファイルを作成
3. `src/components/index.js` にエクスポートを追加
4. 必要に応じて Storybook ストーリーを作成

## 注意事項

- このプロジェクトはコンポーネントライブラリです
- 実際のページは `pokenae.Web` プロジェクトで作成してください
- コンポーネントは再利用可能で独立性を保つように設計してください
