/** @type {import('next').NextConfig} */
const nextConfig = {
  // コンポーネントライブラリ用の設定
  // ビルド時にコンポーネントのみをエクスポート
  transpilePackages: ['react', 'react-dom'],
  
  // 開発時のコンポーネントテスト用設定
  experimental: {
    appDir: true
  },
  
  // コンポーネントライブラリとしての設定
  env: {
    LIBRARY_NAME: 'Pokenae WebComponent'
  },
  
  // クライアントサイドレンダリング用の設定
  output: 'export',
  trailingSlash: true,
  
  // 外部依存関係の設定
  webpack: (config) => {
    // コンポーネントライブラリとして使用される場合の設定
    if (!config.isServer) {
      config.externals = {
        ...config.externals,
        react: 'react',
        'react-dom': 'react-dom'
      };
    }
    return config;
  }
};

export default nextConfig;
