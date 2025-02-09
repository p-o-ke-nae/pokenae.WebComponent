import React, { useEffect, useState } from 'react';
import CustomMessageArea from './CustomMessageArea';
import CustomLoading from './CustomLoading';
import CustomMessageDialog from './CustomMessageDialog';
import { useAppContext } from '../context/AppContext';
import { checkPermissions } from '../utils/permissions';
import { PageModeProvider, PageModes } from '../context/PageModeContext';
import { fetchPageTitle, fetchPageList, fetchCategories } from '../utils/api';
import Header from './Header';
import Footer from './Footer';
import RightSidebar from './RightSidebar';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  const {
    message,
    messageType,
    messageDuration,
    isLoading,
    isConfirmOpen,
    confirmTitle,
    confirmMessage,
    handleConfirm,
    handleCancel,
  } = useAppContext();

  const [permissions, setPermissions] = useState(null);
  const [pageMode, setPageMode] = useState(PageModes.READ_ONLY);
  const [pageTitle, setPageTitle] = useState('');
  const [pageList, setPageList] = useState([]);
  const [recommendedPages, setRecommendedPages] = useState([]);
  const [pageRankings, setPageRankings] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchPermissions = async () => {
      const userPermissions = await checkPermissions();
      setPermissions(userPermissions);
      setPageMode(userPermissions.canEdit ? PageModes.EDIT : PageModes.READ_ONLY);
    };

    const fetchData = async () => {
      const title = await fetchPageTitle();
      const pages = await fetchPageList();
      const categories = await fetchCategories();
      setPageTitle(title);
      setPageList(pages);
      setCategories(categories);
      setRecommendedPages(pages.slice(0, 3)); // 仮のデータ
      setPageRankings(pages.slice(0, 3)); // 仮のデータ
    };

    fetchPermissions();
    fetchData();
  }, []);

  if (!permissions) {
    return <CustomLoading isLoading={true} />;
  }

  return (
    <PageModeProvider value={pageMode}>
      <div className={styles.container}>
        <Header categories={categories} />
        <div className={styles.content}>
          <div className={styles.leftSidebarPlaceholder}></div> {/* 左サイドバーの幅を残す */}
          <main className={styles.mainContent}>
            <CustomMessageArea
              message={message}
              type={messageType}
              duration={messageDuration}
            />
            <CustomLoading isLoading={isLoading} />
            {isConfirmOpen && (
              <CustomMessageDialog
                title={confirmTitle}
                message={confirmMessage}
                isConfirmOpen={isConfirmOpen}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
              />
            )}
            {children}
          </main>
          <div className={styles.rightSidebar}>
            <RightSidebar recommendedPages={recommendedPages} pageRankings={pageRankings} />
          </div>
        </div>
        <Footer pageList={pageList} />
      </div>
    </PageModeProvider>
  );
};

export default Layout;