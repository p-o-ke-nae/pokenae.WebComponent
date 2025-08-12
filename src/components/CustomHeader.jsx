'use client';

import React from 'react';
import PropTypes from 'prop-types';
import styles from './CustomHeader.module.css';

const CustomHeader = React.memo(({ 
  metaData, 
  status, 
  children,
  text,
  level = 3,
  showRequired = true,
  className = '',
  as,
  ...otherProps 
}) => {
  const effectiveStatus = status ?? metaData?.status ?? 'normal';
  const headerContent = children ?? text ?? metaData?.label ?? '';
  const isRequired = effectiveStatus === 'required';
  
  // Determine header element based on level or 'as' prop
  const HeaderElement = as || `h${level}`;
  
  return (
    <div 
      className={`${styles['customheader-container']} ${styles[`header-${effectiveStatus}`]} ${className}`.trim()}
      {...otherProps}
    >
      <HeaderElement>
        <label className={styles.customheader}>
          {headerContent}
          {isRequired && showRequired && (
            <span className={styles.requiredmark}>※</span>
          )}
        </label>
      </HeaderElement>
    </div>
  );
});

CustomHeader.displayName = 'CustomHeader';

CustomHeader.propTypes = {
  metaData: PropTypes.shape({
    label: PropTypes.string,
    status: PropTypes.oneOf(['normal', 'required', 'readonly']),
  }),
  status: PropTypes.oneOf(['normal', 'required', 'readonly']),
  children: PropTypes.node,
  text: PropTypes.string,
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  showRequired: PropTypes.bool,
  className: PropTypes.string,
  as: PropTypes.string,
};

export default CustomHeader;