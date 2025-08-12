'use client';

import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { usePageMode, PageModes } from '../context/PageModeContext';
import styles from './CustomRadioButton.module.css';

const CustomRadioButton = React.memo(({ 
  metaData, 
  value, 
  onChange, 
  status, 
  options = [],
  name,
  className = '',
  disabled,
  readOnly,
  required,
  ...otherProps 
}) => {
  const pageMode = usePageMode();
  
  // Determine effective status and configuration
  const effectiveStatus = status ?? metaData?.status ?? 'normal';
  const effectiveName = name ?? metaData?.name ?? '';
  const isRequired = required ?? (effectiveStatus === 'required');
  const isReadOnly = readOnly ?? (effectiveStatus === 'readonly');
  const isDisabled = disabled ?? (pageMode === PageModes.READ_ONLY);

  // Optimized change handler
  const handleChange = useCallback((event) => {
    if (isReadOnly || isDisabled) return;
    
    if (onChange) {
      onChange(event);
    }
  }, [onChange, isReadOnly, isDisabled]);

  return (
    <div className={`${styles.radioGroup} ${className}`.trim()} {...otherProps}>
      {options.map((option) => (
        <label 
          key={option.value} 
          className={styles.radioContainer}
        >
          <input
            type="radio"
            name={effectiveName}
            value={option.value}
            checked={value === option.value}
            onChange={handleChange}
            readOnly={isReadOnly}
            disabled={isDisabled}
            required={isRequired}
            className={styles.radioInput}
            aria-checked={value === option.value}
          />
          <span className={styles.radioCustom}></span>
          {option.label && <span className={styles.radioLabel}>{option.label}</span>}
        </label>
      ))}
    </div>
  );
});

CustomRadioButton.displayName = 'CustomRadioButton';

CustomRadioButton.propTypes = {
  metaData: PropTypes.shape({
    name: PropTypes.string,
    label: PropTypes.string,
    status: PropTypes.oneOf(['normal', 'required', 'readonly']),
  }),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  status: PropTypes.oneOf(['normal', 'required', 'readonly']),
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  name: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
};

export default CustomRadioButton;