import React from 'react';
import CustomMessageArea from './CustomMessageArea';
import CustomLoading from './CustomLoading';
import CustomMessageDialog from './CustomMessageDialog';
import { useAppContext } from '../context/AppContext';

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

  return (
    <div className="container">
      <head>
        <meta name="google-site-verification" content="IUX-8TWXUwIqWtc8WttGG9Lai_R9_jIxiFBAv4dTdWM" />
      </head>
      <div style={{ width: '100%', height: '50px', backgroundColor: '#333', color: '#fff', textAlign: 'center', lineHeight: '50px' }}>
        {/* ヘッダーコンテンツ */}
      </div>
      <div style={{ display: 'inline-block', width: '15%', height: '1000px', backgroundColor: '#f0f0f0', float: 'left' }}>
        <div>サイドバー</div>
      </div>
      <main style={{ display: 'inline-block', width: '70%', margin: '0 auto' }}>
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
    </div>
  );
};

export default Layout;