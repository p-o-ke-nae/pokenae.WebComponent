import React from 'react';
import { AppProvider } from '../context/AppContext';
import '../app/globals.css';

export const metadata = {
  title: 'Pokenae WebComponent',
  description: 'ポケナエWebコンポーネントライブラリ - テスト環境',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
