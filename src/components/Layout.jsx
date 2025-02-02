import React from 'react';
import CustomMessageArea from './CustomMessageArea';
import CustomLoading from './CustomLoading';
import CustomMessageDialog from './CustomMessageDialog';

const Layout = ({ children, message, messageType, messageDuration, isLoading, isConfirmOpen, confirmTitle, confirmMessage, onConfirm, onCancel }) => {
  return (
    <div className="container" >
      <div style={{ width: '100%', height: '50px', backgroundColor: '#333', color: '#fff', textAlign: 'center', lineHeight: '50px' }}>
        {/* ヘッダーコンテンツ */}
      </div>
      <div style={{ display: 'inline-block', width: '15%', height: '1000px', backgroundColor: '#f0f0f0', float: 'left' }}>
        <div>testver2 ようやく移行できそうですね</div>
      </div>
      <main style={{ display: 'inline-block', width: '70%', margin: '0 auto', }}>
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
            onConfirm={onConfirm}
            onCancel={onCancel}
          />
        )}
        {children}
      </main>
    </div>
  );
};

export default Layout;