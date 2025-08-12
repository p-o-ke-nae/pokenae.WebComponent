'use client';

import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { usePageMode, PageModes } from '../context/PageModeContext';
import styles from './CustomSpinBox.module.css';

const CustomSpinBox = React.memo(({ 
  metaData, 
  value = '', 
  onChange, 
  status, 
  placeholder, 
  min, 
  max, 
  step = 1,
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
  const effectivePlaceholder = placeholder ?? 
    (metaData ? (effectiveStatus === 'readonly' ? '' : `${metaData.label}を入力してください`) : '');

  // Optimized change handler
  const handleChange = useCallback((event) => {
    if (onChange) {
      onChange(event);
    }
  }, [onChange]);

  return (
    <input 
      type="number"
      name={effectiveName}
      className={`${styles.customspinbox} ${className}`.trim()}
      value={value}
      onChange={handleChange}
      placeholder={effectivePlaceholder}
      required={isRequired}
      readOnly={isReadOnly}
      disabled={isDisabled}
      min={min}
      max={max}
      step={step}
      {...otherProps}
    />
  );
});

CustomSpinBox.displayName = 'CustomSpinBox';

CustomSpinBox.propTypes = {
  metaData: PropTypes.shape({
    name: PropTypes.string,
    label: PropTypes.string,
    status: PropTypes.oneOf(['normal', 'required', 'readonly']),
  }),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  status: PropTypes.oneOf(['normal', 'required', 'readonly']),
  placeholder: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  name: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
};

export default CustomSpinBox;