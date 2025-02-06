import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [message, setMessage] = useState([]);
  const [messageType, setMessageType] = useState('info');
  const [messageDuration, setMessageDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmTitle, setConfirmTitle] = useState('');
  const [confirmMessage, setConfirmMessage] = useState('');
  const [onConfirmCallback, setOnConfirmCallback] = useState(null);

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
  };
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
  };
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
    <AppContext.Provider
      value={{
        showInfo,
        showSuccess,
        showWarning,
        showError,
        showConfirm,
        generateValidationMessage,
        getMetaDataFromname,
        setIsLoading,
        isLoading,
        message,
        messageType,
        messageDuration,
        isConfirmOpen,
        confirmTitle,
        confirmMessage,
        handleConfirm,
        handleCancel,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
