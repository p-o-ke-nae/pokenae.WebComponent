import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styles from './CustomTextBox.module.css';

const CustomTextBox = ({ metaData, value, onChange, status, placeholder, rows }) => {
  const mystatus = status ?? (metaData ? metaData.status : 'normal');
  const inputType = rows ? 'textarea' : 'input';
  const inputProps = {
    name: metaData ? metaData.name : '',
    className: styles.customtextbox,
    value: value,
    onChange: onChange,
    placeholder: placeholder ?? (metaData ? (mystatus === 'readonly' ? '' : `${metaData.label}を入力してください`) : ''),
    required: mystatus === 'required',
    readOnly: mystatus === 'readonly',
    rows: rows,
  };

  return useMemo(() => (
    React.createElement(inputType, inputProps)
  ), [value, onChange, placeholder, rows]);
};

CustomTextBox.propTypes = {
  metaData: PropTypes.object,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  status: PropTypes.oneOf(['required', 'readonly', 'normal']),
  placeholder: PropTypes.string,
  rows: PropTypes.number,
};

CustomTextBox.defaultProps = {
  status: 'normal',
  rows: null,
};

export default CustomTextBox;