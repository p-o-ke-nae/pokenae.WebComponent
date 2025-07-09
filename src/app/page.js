'use client';

import React from 'react';
import {
  Layout,
  CustomButton,
  CustomHeader,
  CustomTable,
  CustomCheckBox,
  CustomModal,
  useAppContext
} from '../components';
import styles from './page.module.css';

export default function ComponentTestPage() {
  const { showInfo, showWarning, showError } = useAppContext();

  // テスト用のテーブルデータ
  const testTableData = [
    { id: 1, name: 'ポケモンカード1', category: 'ノーマル', status: '所有' },
    { id: 2, name: 'ポケモンカード2', category: 'レア', status: '未所有' },
    { id: 3, name: 'ポケモンカード3', category: 'プロモ', status: '所有' },
  ];

  const testColumns = [
    { key: 'name', label: '名前', editable: true },
    { key: 'category', label: 'カテゴリ', editable: false },
    { key: 'status', label: 'ステータス', editable: true },
  ];

  return (
    <Layout>
      <div className={styles.container}>
        <CustomHeader>Pokenae WebComponent テスト環境</CustomHeader>
        
        <div className={styles.section}>
          <h2>ボタンコンポーネント</h2>
          <div className={styles.buttonGroup}>
            <CustomButton 
              onClick={() => showInfo('情報メッセージのテストです')}
              label="情報表示"
            />
            <CustomButton 
              onClick={() => showWarning('警告メッセージのテストです')}
              label="警告表示"
            />
            <CustomButton 
              onClick={() => showError('エラーメッセージのテストです')}
              label="エラー表示"
            />
          </div>
        </div>

        <div className={styles.section}>
          <h2>チェックボックスコンポーネント</h2>
          <CustomCheckBox 
            label="テストチェックボックス"
            value={false}
            onChange={(checked) => showInfo(`チェックボックス: ${checked}`)}
          />
        </div>

        <div className={styles.section}>
          <h2>テーブルコンポーネント</h2>
          <CustomTable 
            data={testTableData}
            columns={testColumns}
            rowsPerPage={5}
          />
        </div>
      </div>
    </Layout>
  );
}
