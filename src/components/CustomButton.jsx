'use client';

import React from 'react';
import PropTypes from 'prop-types';
import styles from './CustomButton.module.css';

const CustomButton = React.memo(({ 
  onClick, 
  children, 
  label, 
  type = 'button',
  disabled = false,
  variant = 'primary',
  size = 'medium',
  className = '',
  ...otherProps 
}) => {
  // Use label prop or children, with children taking precedence
  const buttonContent = children || label;

  return (
    <button 
      className={`${styles.custombutton} ${styles[variant]} ${styles[size]} ${className}`.trim()}
      onClick={onClick}
      type={type}
      disabled={disabled}
      {...otherProps}
    >
      {buttonContent}
    </button>
  );
});

CustomButton.displayName = 'CustomButton';

CustomButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  label: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'success']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  className: PropTypes.string,
};

export default CustomButton;