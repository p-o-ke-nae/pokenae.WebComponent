'use client';

import React from 'react';
import PropTypes from 'prop-types';
import styles from './CustomLabel.module.css';

const CustomLabel = React.memo(({ 
  metaData, 
  children, 
  text,
  className = '',
  htmlFor,
  as = 'span',
  ...otherProps 
}) => {
  // Use children, text prop, or metaData label (in that order of precedence)
  const labelContent = children || text || metaData?.label || '';
  
  // Choose the element type
  const Element = as;
  
  const props = {
    className: `${styles.customlabel} ${className}`.trim(),
    ...(htmlFor && as === 'label' ? { htmlFor } : {}),
    ...otherProps,
  };

  return (
    <Element {...props}>
      {labelContent}
    </Element>
  );
});

CustomLabel.displayName = 'CustomLabel';

CustomLabel.propTypes = {
  metaData: PropTypes.shape({
    label: PropTypes.string,
  }),
  children: PropTypes.node,
  text: PropTypes.string,
  className: PropTypes.string,
  htmlFor: PropTypes.string,
  as: PropTypes.oneOf(['span', 'label', 'p', 'div']),
};

export default CustomLabel;
