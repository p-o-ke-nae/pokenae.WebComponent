import React from 'react';
import PropTypes from 'prop-types';
import styles from './CustomImage.module.css';

const CustomImage = ({ metaData, value, label }) => {
  const altText = label || (metaData ? metaData.label : '');
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  return isValidUrl(value) ? (
    <div className={styles.imageContainer}>
      <img src={value} alt={altText} className={styles.customimage}  />
    </div>
  ) : (
    <span className={styles.customimage}>{altText}</span>
  );
};

CustomImage.propTypes = {
  metaData: PropTypes.object,
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
};

export default CustomImage;
