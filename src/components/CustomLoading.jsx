'use client';

import React from 'react';
import CustomModal from './CustomModal';
import styles from './CustomLoading.module.css';

const CustomLoading = ({ isLoading }) => {
  return (
    <CustomModal isOpen={isLoading} showCloseButton={false}>
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading...</p>
      </div>
    </CustomModal>
  );
};

export default CustomLoading;