// フォームフィールドの型定義
export interface FormField {
  name: string;
  label: string;
  status: 'required' | 'readonly' | 'normal';
  type: 'text' | 'number' | 'boolean';
}

export const FormMetaData: FormField[] = [
  {
    name: 'name',
    label: '名前',
    status: 'normal',
    type: 'number',
  },
  {
    name: 'email',
    label: 'Email',
    status: 'required',
    type: 'text',
  },
  {
    name: 'message',
    label: 'メッセージ',
    status: 'readonly',
    type: 'text',
  },
  {
    name: 'yesno',
    label: 'はい/いいえ',
    status: 'normal',
    type: 'boolean',
  },
];