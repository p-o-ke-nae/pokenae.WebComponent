'use client';

import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { usePageMode, PageModes } from '../context/PageModeContext';
import styles from './CustomTextBox.module.css';

const CustomTextBox = React.memo(({ 
  metaData, 
  value = '',
  onChange, 
  status, 
  placeholder, 
  rows,
  type = 'text',
  name,
  className = '',
  disabled,
  required,
  readOnly,
  ...otherProps 
}) => {
  const pageMode = usePageMode();
  
  // Determine the effective status
  const effectiveStatus = status ?? metaData?.status ?? 'normal';
  
  // Determine component configuration
  const config = useMemo(() => {
    const isTextarea = rows && rows > 0;
    const isRequired = required ?? (effectiveStatus === 'required');
    const isReadOnly = readOnly ?? (effectiveStatus === 'readonly');
    const isDisabled = disabled ?? (pageMode === PageModes.READ_ONLY);
    
    return {
      isTextarea,
      isRequired,
      isReadOnly,
      isDisabled,
      placeholder: placeholder ?? (metaData ? (effectiveStatus === 'readonly' ? '' : `${metaData.label}を入力してください`) : ''),
      name: name ?? metaData?.name ?? '',
    };
  }, [rows, required, readOnly, disabled, effectiveStatus, pageMode, placeholder, metaData, name]);

  // Optimize onChange handler
  const handleChange = useCallback((event) => {
    if (onChange) {
      onChange(event);
    }
  }, [onChange]);

  // Common props for both input and textarea
  const commonProps = {
    name: config.name,
    className: `${styles.customtextbox} ${className}`.trim(),
    value,
    onChange: handleChange,
    placeholder: config.placeholder,
    required: config.isRequired,
    readOnly: config.isReadOnly,
    disabled: config.isDisabled,
    ...otherProps,
  };

  // Render textarea or input based on rows
  return config.isTextarea ? (
    <textarea 
      {...commonProps}
      rows={rows}
    />
  ) : (
    <input 
      {...commonProps}
      type={type}
    />
  );
});

CustomTextBox.displayName = 'CustomTextBox';

CustomTextBox.propTypes = {
  metaData: PropTypes.shape({
    name: PropTypes.string,
    label: PropTypes.string,
    status: PropTypes.oneOf(['normal', 'required', 'readonly']),
  }),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  status: PropTypes.oneOf(['normal', 'required', 'readonly']),
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  type: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
};

export default CustomTextBox;