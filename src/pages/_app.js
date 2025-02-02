import React, { useState } from 'react';
import Layout from '../components/Layout';
import '../app/globals.css';

function MyApp({ Component, pageProps }) {
  const [message, setMessage] = useState([]);
  const [messageType, setMessageType] = useState('info'); // info, success, warning, error
  const [messageDuration, setMessageDuration] = useState(0); // メッセージエリアを表示する秒数を指定
  const [isLoading, setIsLoading] = useState(false); // ローディング状態を管理
  const [isConfirmOpen, setIsConfirmOpen] = useState(false); // 確認ダイアログの表示状態を管理
  const [confirmTitle, setConfirmTitle] = useState(''); // 確認ダイアログのタイトルを管理
  const [confirmMessage, setConfirmMessage] = useState(''); // 確認ダイアログのメッセージを管理
  const [onConfirmCallback, setOnConfirmCallback] = useState(null); // 確認ダイアログの「はい」ボタンを押したときのコールバック関数を管理

  const showInfo = (message, duration) => {
    showMessage(message, 'info', duration);
  };
  const showSuccess = (message, duration) => {
    showMessage(message, 'success', duration);
  };
  const showWarning = (message, duration) => {
    showMessage(message, 'warning', duration);
  };
  const showError = (message, duration) => {
    showMessage(message, 'error', duration);
  };
  const showMessage = (message, messagetype, duration) => {
    setMessage([]);
    setTimeout(() => {
      setMessage(Array.isArray(message) ? message : [message]);
      setMessageType(messagetype);
      setMessageDuration(duration);
    }, 0);
  }
  const showConfirm = (title, message) => {
    return new Promise((resolve) => {
      setConfirmTitle(title);
      setConfirmMessage(message);
      setOnConfirmCallback(() => resolve);
      setIsConfirmOpen(true);
    });
  };
  const handleConfirm = () => {
    setIsConfirmOpen(false);
    if (onConfirmCallback) {
      onConfirmCallback(true);
    }
  };

  const handleCancel = () => {
    setIsConfirmOpen(false);
    if (onConfirmCallback) {
      onConfirmCallback(false);
    }
  };

  const generateValidationMessage = (errors) => {
    if (!errors || Object.keys(errors).length === 0) {
      return '';
    }
    return Object.entries(errors)
      .map(([field, message]) => `${message}`)
      .join('\n');
  }

  const getMetaDataFromname = (metaData, name) => {
    const data = metaData.find((meta) => meta.name === name);
    if (!data) {
      throw new Error(`${name}というメタデータは見つかりませんでした． \n Metadata not found for ${name}`);
    }
    
    return {
      ...data,
    };
  };

  return (
    <Layout
      message={message}
      messageType={messageType}
      messageDuration={messageDuration}
      isLoading={isLoading}
      isConfirmOpen={isConfirmOpen}
      confirmTitle={confirmTitle}
      confirmMessage={confirmMessage}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    >
      <Component
        {...pageProps}
        setIsLoading={setIsLoading}
        showInfo={showInfo}
        showSuccess={showSuccess}
        showWarning={showWarning}
        showError={showError}
        showConfirm={showConfirm}
        generateValidationMessage={generateValidationMessage}
        getMetaDataFromname={getMetaDataFromname}
      />
    </Layout>
  );
}

export default MyApp;