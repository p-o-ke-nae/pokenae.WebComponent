# Pokenae WebComponent 使用マニュアル

本マニュアルはPokenae WebComponentライブラリの各コンポーネントの使用方法をまとめたものです。

## 目次

1. [基本コンポーネント](#基本コンポーネント)
   - [CustomButton](#custombutton)
   - [CustomTextBox](#customtextbox)
   - [CustomCheckBox](#customcheckbox)
   - [CustomLabel](#customlabel)
   - [CustomSpinBox](#customspinbox)
   - [CustomRadioButton](#customradiobutton)
2. [レイアウトコンポーネント](#レイアウトコンポーネント)
   - [CustomHeader](#customheader)
   - [CustomModal](#custommodal)
3. [テーブルコンポーネント](#テーブルコンポーネント)
   - [CustomTable](#customtable)
   - [CustomPagination](#custompagination)
4. [メッセージコンポーネント](#メッセージコンポーネント)
   - [CustomMessageArea](#custommessagearea)
   - [CustomMessageDialog](#custommessagedialog)
5. [コンテキストプロバイダー](#コンテキストプロバイダー)
   - [AppProvider](#appprovider)
   - [PageModeProvider](#pagemodeprovider)

---

## 基本コンポーネント

### CustomButton

カスタマイズされたボタンコンポーネントです。

#### プロパティ

| プロパティ | 型 | デフォルト値 | 説明 |
|---|---|---|---|
| `onClick` | `function` | - | クリック時のコールバック関数 |
| `children` | `node` | - | ボタン内容（labelより優先される） |
| `label` | `string` | - | ボタンラベル |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | ボタンタイプ |
| `disabled` | `boolean` | `false` | 無効状態 |
| `variant` | `'primary' \| 'secondary' \| 'danger' \| 'success'` | `'primary'` | ボタンバリアント |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | ボタンサイズ |
| `className` | `string` | `''` | 追加CSSクラス |

#### 使用例

```jsx
import { CustomButton } from 'pokenae-webcomponent';

// 基本的な使用
<CustomButton onClick={() => console.log('clicked')}>
  クリック
</CustomButton>

// バリアントとサイズの指定
<CustomButton 
  variant="danger" 
  size="large"
  onClick={handleDelete}
>
  削除
</CustomButton>

// ラベルプロパティを使用
<CustomButton 
  label="保存" 
  type="submit"
  variant="success"
  onClick={handleSave}
/>
```

---

### CustomTextBox

テキスト入力およびテキストエリアコンポーネントです。

#### プロパティ

| プロパティ | 型 | デフォルト値 | 説明 |
|---|---|---|---|
| `value` | `string \| number` | `''` | 入力値 |
| `onChange` | `function` | - | 値変更時のコールバック |
| `metaData` | `object` | - | メタデータオブジェクト |
| `status` | `'normal' \| 'required' \| 'readonly'` | `'normal'` | 入力状態 |
| `placeholder` | `string` | - | プレースホルダーテキスト |
| `rows` | `number` | - | テキストエリアの行数（指定時はテキストエリアになる） |
| `type` | `string` | `'text'` | input要素のtype属性 |
| `name` | `string` | - | name属性 |
| `className` | `string` | `''` | 追加CSSクラス |
| `disabled` | `boolean` | - | 無効状態 |
| `required` | `boolean` | - | 必須状態 |
| `readOnly` | `boolean` | - | 読み取り専用状態 |

#### 使用例

```jsx
import { CustomTextBox } from 'pokenae-webcomponent';

// 基本的なテキストボックス
<CustomTextBox 
  value={name}
  onChange={(e) => setName(e.target.value)}
  placeholder="名前を入力"
  required
/>

// テキストエリア
<CustomTextBox 
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  rows={4}
  placeholder="説明を入力"
/>

// メタデータを使用
const nameMetaData = {
  name: 'userName',
  label: 'ユーザー名',
  status: 'required'
};

<CustomTextBox 
  metaData={nameMetaData}
  value={formData.userName}
  onChange={handleChange}
/>
```

---

### CustomCheckBox

カスタマイズされたチェックボックスコンポーネントです。

#### プロパティ

| プロパティ | 型 | デフォルト値 | 説明 |
|---|---|---|---|
| `value` | `boolean` | `false` | チェック状態 |
| `onChange` | `function` | - | 変更時のコールバック |
| `metaData` | `object` | - | メタデータオブジェクト |
| `status` | `'normal' \| 'required' \| 'readonly'` | `'normal'` | チェックボックス状態 |
| `label` | `string` | - | ラベルテキスト |
| `indeterminate` | `boolean` | `false` | 不確定状態 |
| `name` | `string` | - | name属性 |
| `className` | `string` | `''` | 追加CSSクラス |
| `disabled` | `boolean` | - | 無効状態 |
| `readOnly` | `boolean` | - | 読み取り専用状態 |

#### 使用例

```jsx
import { CustomCheckBox } from 'pokenae-webcomponent';

// 基本的なチェックボックス
<CustomCheckBox 
  label="利用規約に同意する"
  value={agreed}
  onChange={(e) => setAgreed(e.target.checked)}
/>

// 不確定状態のチェックボックス
<CustomCheckBox 
  label="すべて選択"
  value={allSelected}
  indeterminate={someSelected}
  onChange={handleSelectAll}
/>

// メタデータを使用
const agreeMetaData = {
  name: 'agreement',
  label: '同意',
  status: 'required'
};

<CustomCheckBox 
  metaData={agreeMetaData}
  value={formData.agreement}
  onChange={handleChange}
/>
```

---

### CustomLabel

カスタマイズされたラベルコンポーネントです。

#### プロパティ

| プロパティ | 型 | デフォルト値 | 説明 |
|---|---|---|---|
| `children` | `node` | - | ラベル内容（textより優先される） |
| `text` | `string` | - | ラベルテキスト |
| `metaData` | `object` | - | メタデータオブジェクト |
| `className` | `string` | `''` | 追加CSSクラス |
| `htmlFor` | `string` | - | label要素のfor属性 |
| `as` | `'span' \| 'label' \| 'p' \| 'div'` | `'span'` | レンダリングする要素タイプ |

#### 使用例

```jsx
import { CustomLabel } from 'pokenae-webcomponent';

// 基本的なラベル
<CustomLabel text="ユーザー名" />

// label要素として使用
<CustomLabel 
  as="label" 
  htmlFor="username"
  text="ユーザー名"
/>

// 子要素を含むラベル
<CustomLabel as="label">
  <strong>必須</strong> ユーザー名
</CustomLabel>

// メタデータを使用
const labelMetaData = {
  label: 'パスワード'
};

<CustomLabel 
  metaData={labelMetaData}
  as="label"
  htmlFor="password"
/>
```

---

### CustomSpinBox

数値入力用のスピンボックスコンポーネントです。

#### プロパティ

| プロパティ | 型 | デフォルト値 | 説明 |
|---|---|---|---|
| `value` | `string \| number` | `''` | 入力値 |
| `onChange` | `function` | - | 値変更時のコールバック |
| `metaData` | `object` | - | メタデータオブジェクト |
| `status` | `'normal' \| 'required' \| 'readonly'` | `'normal'` | 入力状態 |
| `placeholder` | `string` | - | プレースホルダーテキスト |
| `min` | `number` | - | 最小値 |
| `max` | `number` | - | 最大値 |
| `step` | `number` | `1` | ステップ値 |
| `name` | `string` | - | name属性 |
| `className` | `string` | `''` | 追加CSSクラス |
| `disabled` | `boolean` | - | 無効状態 |
| `readOnly` | `boolean` | - | 読み取り専用状態 |
| `required` | `boolean` | - | 必須状態 |

#### 使用例

```jsx
import { CustomSpinBox } from 'pokenae-webcomponent';

// 基本的なスピンボックス
<CustomSpinBox 
  value={age}
  onChange={(e) => setAge(e.target.value)}
  min={0}
  max={120}
  placeholder="年齢"
/>

// 小数点を含む値
<CustomSpinBox 
  value={price}
  onChange={(e) => setPrice(e.target.value)}
  min={0}
  step={0.01}
  placeholder="価格"
/>

// メタデータを使用
const ageMetaData = {
  name: 'userAge',
  label: '年齢',
  status: 'required'
};

<CustomSpinBox 
  metaData={ageMetaData}
  value={formData.userAge}
  onChange={handleChange}
  min={0}
  max={150}
/>
```

---

### CustomRadioButton

カスタマイズされたラジオボタンコンポーネントです。

#### プロパティ

| プロパティ | 型 | デフォルト値 | 説明 |
|---|---|---|---|
| `value` | `string \| number` | - | 選択された値 |
| `onChange` | `function` | - | 値変更時のコールバック |
| `options` | `array` | `[]` | オプション配列（必須） |
| `metaData` | `object` | - | メタデータオブジェクト |
| `status` | `'normal' \| 'required' \| 'readonly'` | `'normal'` | ラジオボタン状態 |
| `name` | `string` | - | name属性 |
| `className` | `string` | `''` | 追加CSSクラス |
| `disabled` | `boolean` | - | 無効状態 |
| `readOnly` | `boolean` | - | 読み取り専用状態 |
| `required` | `boolean` | - | 必須状態 |

#### オプション配列の形式

```javascript
[
  { value: 'option1', label: 'オプション1' },
  { value: 'option2', label: 'オプション2' }
]
```

#### 使用例

```jsx
import { CustomRadioButton } from 'pokenae-webcomponent';

const genderOptions = [
  { value: 'male', label: '男性' },
  { value: 'female', label: '女性' },
  { value: 'other', label: 'その他' }
];

// 基本的なラジオボタン
<CustomRadioButton 
  options={genderOptions}
  value={gender}
  onChange={(e) => setGender(e.target.value)}
/>

// メタデータを使用
const genderMetaData = {
  name: 'userGender',
  label: '性別',
  status: 'required'
};

<CustomRadioButton 
  metaData={genderMetaData}
  options={genderOptions}
  value={formData.userGender}
  onChange={handleChange}
/>
```

---

## レイアウトコンポーネント

### CustomHeader

ページヘッダーコンポーネントです。

#### 使用例

```jsx
import { CustomHeader } from 'pokenae-webcomponent';

<CustomHeader>
  ページタイトル
</CustomHeader>
```

### CustomModal

モーダルダイアログコンポーネントです。

#### 使用例

```jsx
import { CustomModal } from 'pokenae-webcomponent';

<CustomModal 
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
>
  <h2>モーダルタイトル</h2>
  <p>モーダル内容</p>
</CustomModal>
```

---

## テーブルコンポーネント

### CustomTable

高機能なデータテーブルコンポーネントです。

#### 基本的な使用例

```jsx
import { CustomTable } from 'pokenae-webcomponent';

const data = [
  { id: 1, name: 'ユーザー1', email: 'user1@example.com' },
  { id: 2, name: 'ユーザー2', email: 'user2@example.com' }
];

const columns = [
  { name: 'name', label: '名前', editable: true, width: '200px' },
  { name: 'email', label: 'メール', editable: true, width: '300px' }
];

<CustomTable 
  data={data}
  columns={columns}
  rowsPerPage={10}
  onDataChange={handleDataChange}
/>
```

---

## メッセージコンポーネント

### CustomMessageArea

メッセージ表示エリアコンポーネントです。

### CustomMessageDialog

メッセージダイアログコンポーネントです。

---

## コンテキストプロバイダー

### AppProvider

アプリケーション全体の状態管理を提供するプロバイダーです。

#### 使用例

```jsx
import { AppProvider, useAppContext } from 'pokenae-webcomponent';

// アプリケーションのルートで使用
function App() {
  return (
    <AppProvider>
      <YourComponents />
    </AppProvider>
  );
}

// コンポーネント内で使用
function MyComponent() {
  const { showInfo, showError, isLoading } = useAppContext();
  
  const handleSuccess = () => {
    showInfo('操作が成功しました');
  };
  
  return (
    <div>
      {/* コンポーネント内容 */}
    </div>
  );
}
```

#### 提供される機能

- `showInfo(message, duration)` - 情報メッセージの表示
- `showSuccess(message, duration)` - 成功メッセージの表示
- `showWarning(message, duration)` - 警告メッセージの表示
- `showError(message, duration)` - エラーメッセージの表示
- `showConfirm(title, message)` - 確認ダイアログの表示
- `isLoading` - ローディング状態
- `setIsLoading(boolean)` - ローディング状態の設定

### PageModeProvider

ページモードの管理を提供するプロバイダーです。

#### 使用例

```jsx
import { PageModeProvider, usePageMode, PageModes } from 'pokenae-webcomponent';

// ページレベルで使用
function EditPage() {
  return (
    <PageModeProvider value={PageModes.EDIT}>
      <YourEditComponents />
    </PageModeProvider>
  );
}

// コンポーネント内で使用
function MyComponent() {
  const pageMode = usePageMode();
  
  const isReadOnly = pageMode === PageModes.READ_ONLY;
  
  return (
    <div>
      {/* ページモードに応じた表示 */}
    </div>
  );
}
```

#### 利用可能なモード

- `PageModes.EDIT` - 編集モード
- `PageModes.READ_ONLY` - 読み取り専用モード

---

## インストールと基本設定

### インストール

```bash
npm install pokenae-webcomponent
```

### 基本的なセットアップ

```jsx
import React from 'react';
import { 
  AppProvider, 
  PageModeProvider, 
  PageModes,
  Layout 
} from 'pokenae-webcomponent';

function App() {
  return (
    <AppProvider>
      <PageModeProvider value={PageModes.EDIT}>
        <Layout>
          {/* あなたのアプリケーション */}
        </Layout>
      </PageModeProvider>
    </AppProvider>
  );
}

export default App;
```

---

## 設計原則

### 1. コンポーネント指向設計

- 各コンポーネントは単一責任の原則に従い、特定の機能に特化しています
- 再利用可能で組み合わせ可能な設計になっています

### 2. Reactベストプラクティス

- `React.memo`を使用したパフォーマンス最適化
- `useCallback`による関数の最適化
- PropTypesによる型チェック
- アクセシビリティの考慮

### 3. 一貫したAPI設計

- すべてのフォームコンポーネントで共通のプロパティパターン
- metaDataによる統一的な設定方法
- 状態管理の一貫性

### 4. カスタマイズ性

- CSSモジュールによるスタイリング
- classNameプロパティによる追加スタイリング
- 柔軟なプロパティ設計

---

## 注意事項

1. **metaDataオブジェクト**: フォームコンポーネントで使用するmetaDataは以下の形式で提供してください：
   ```javascript
   {
     name: 'フィールド名',
     label: '表示ラベル',
     status: 'normal' | 'required' | 'readonly'
   }
   ```

2. **PageModeContext**: ページモードを使用する場合は、適切なプロバイダーでコンポーネントをラップしてください。

3. **キー属性**: リスト表示時は適切なkey属性を設定してください。

4. **アクセシビリティ**: スクリーンリーダーやキーボードナビゲーションを考慮した実装がされています。

---

## サポートとお問い合わせ

ご不明な点やバグ報告は、GitHubのIssuesページまでお願いします。

本マニュアルは定期的に更新されます。最新の情報は公式ドキュメントをご確認ください。