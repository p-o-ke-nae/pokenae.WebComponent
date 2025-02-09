export const fetchPageTitle = async () => {
  // APIからページタイトルを取得するロジックを実装
  // ここでは仮のデータを返します
  return 'ページタイトル';
};

export const fetchPageList = async () => {
  // APIからページ一覧を取得するロジックを実装
  // ここでは仮のデータを返します
  return [
    { id: 1, name: 'ページ1' },
    { id: 2, name: 'ページ2' },
    { id: 3, name: 'ページ3' },
  ];
};

export const fetchCategories = async () => {
  // APIからカテゴリ一覧を取得するロジックを実装
  // ここでは仮のデータを返します
  return [
    { id: 1, name: 'Webアプリ', url: '/category1' },
    { id: 2, name: 'デスクトップアプリ', url: '/category2' },
    { id: 3, name: '攻略情報', url: '/category3' },
    { id: 4, name: 'ショーケース', url: '/category4' },
  ];
};
