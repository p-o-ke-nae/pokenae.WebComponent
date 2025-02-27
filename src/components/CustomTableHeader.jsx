import React from 'react';
import styles from './CustomTableHeader.module.css';

const CustomTableHeader = ({ columns, requestSort, sortConfig, tableSettings }) => {
  return (
    <thead>
      <tr>
        {columns.map((column, index) => (
          column.visible && (
            <th
              key={column.name}
              style={{ width: column.width, left: index < tableSettings.fixedColumns ? `${index * 100}px` : 'auto' }}
              onClick={() => requestSort(column.name)}
              className={`${styles.header} ${tableSettings.sortableColumns.includes(column.name) ? styles.sortable : ''} ${sortConfig.key === column.name ? (sortConfig.direction === 'ascending' ? styles['sort-asc'] : styles['sort-desc']) : ''} ${!column.showHeader ? styles['hidden-header'] : ''} ${index < tableSettings.fixedColumns ? styles['sticky-cell'] : ''} ${index < tableSettings.fixedColumns ? styles['sticky-header'] : ''}`}
            >
              {column.showHeader ? column.header : ''}
            </th>
          )
        ))}
      </tr>
    </thead>
  );
};

export default CustomTableHeader;
