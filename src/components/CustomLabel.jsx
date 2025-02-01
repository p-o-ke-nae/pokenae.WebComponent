import React from 'react';
import PropTypes from 'prop-types';
import styles from './CustomLabel.module.css';

const CustomLabel = ({ metaData, children }) => {
  return <span className={styles.customlabel}>{children || (metaData ? metaData.label : '')}</span>;
};

CustomLabel.propTypes = {
  metaData: PropTypes.object,
  children: PropTypes.node,
};

export default CustomLabel;
