'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './CustomCheckBox.module.css';

const CustomCheckBox = React.memo(({ 
  metaData, 
  value = false, 
  onChange, 
  status, 
  label, 
  indeterminate = false,
  name,
  className = '',
  disabled,
  readOnly,
  ...otherProps 
}) => {
  const checkboxRef = useRef(null);
  const [isChecked, setIsChecked] = useState(value);
  
  // Determine effective status and configuration
  const effectiveStatus = status ?? metaData?.status ?? 'normal';
  const effectiveLabel = label ?? metaData?.label ?? '';
  const effectiveName = name ?? metaData?.name ?? '';
  const isReadOnly = readOnly ?? (effectiveStatus === 'readonly');
  const isDisabled = disabled;

  // Update internal state when value prop changes
  useEffect(() => {
    setIsChecked(value);
  }, [value]);

  // Set indeterminate state
  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  // Optimized change handler
  const handleChange = useCallback((event) => {
    if (isReadOnly || isDisabled) return;
    
    const newChecked = event.target.checked;
    setIsChecked(newChecked);
    
    if (onChange) {
      onChange(event);
    }
  }, [onChange, isReadOnly, isDisabled]);

  return (
    <label className={`${styles['customcheckbox-container']} ${className}`.trim()}>
      <input
        ref={checkboxRef}
        type="checkbox"
        name={effectiveName}
        checked={isChecked}
        onChange={handleChange}
        readOnly={isReadOnly}
        disabled={isDisabled}
        className={styles.checkboxInput}
        aria-checked={indeterminate ? 'mixed' : isChecked}
        aria-readonly={isReadOnly}
        {...otherProps}
      />
      <span className={styles.customcheckbox}></span>
      {effectiveLabel && <span className={styles.checkboxLabel}>{effectiveLabel}</span>}
    </label>
  );
});

CustomCheckBox.displayName = 'CustomCheckBox';

CustomCheckBox.propTypes = {
  metaData: PropTypes.shape({
    name: PropTypes.string,
    label: PropTypes.string,
    status: PropTypes.oneOf(['normal', 'required', 'readonly']),
  }),
  value: PropTypes.bool,
  onChange: PropTypes.func,
  status: PropTypes.oneOf(['normal', 'required', 'readonly']),
  label: PropTypes.string,
  indeterminate: PropTypes.bool,
  name: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
};

export default CustomCheckBox;