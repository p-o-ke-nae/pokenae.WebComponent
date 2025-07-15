'use client';

import React, { useState, useMemo, useImperativeHandle, forwardRef, useCallback, useEffect } from 'react';
import styles from './CustomTable.module.css';
import CustomTableHeader from './CustomTableHeader';
import CustomTableRow from './CustomTableRow';
import CustomPagination from './CustomPagination';
import CustomRecordsPerPageSelector from './CustomRecordsPerPageSelector';
import CustomButton from './CustomButton';

const CustomTable = forwardRef(({ columns, data, rowsPerPage, tableSettings = {}, showConfirm, onDataChange, onRowClick, detailComponent }, ref) => {
  // tableSettingsのデフォルト値を設定
  const defaultTableSettings = {
    sortableColumns: [],
    fixedColumns: 0,
    allowRowAddition: false,
    allowRowDeletion: false,
    ...tableSettings
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [tableData, setTableData] = useState(data.map((item, index) => ({ ...item, id: index })));
  const [recordsPerPage, setRecordsPerPage] = useState(rowsPerPage);
  const [editedCells, setEditedCells] = useState(new Set());
  const [originalData, setOriginalData] = useState(new Map());

  // propsのdataが変更されたときに内部状態を更新
  useEffect(() => {
    setTableData(data.map((item, index) => ({ ...item, id: index })));
    // 新しいデータが来た場合、編集状態をリセット
    setEditedCells(new Set());
    setOriginalData(new Map());
  }, [data]);

  const totalPages = Math.ceil(tableData.length / recordsPerPage);

  // ページ変更時の処理
  const handleClick = useCallback(async (page) => {
    setCurrentPage(page);
  }, []);

  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;

  // ソートされたデータを取得
  const currentData = useMemo(() => {
    const sortedData = [...tableData];
    if (sortConfig.key !== null) {
      sortedData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortedData.slice(startIndex, endIndex);
  }, [tableData, startIndex, endIndex, sortConfig]);

  const tableWidth = useMemo(() => {
    return columns.reduce((total, column) => column.visible ? total + parseInt(column.width || '0', 10) : total, 0);
  }, [columns]);

  // ソートリクエストの処理
  const requestSort = useCallback((key) => {
    if (defaultTableSettings.sortableColumns.includes(key)) {
      let direction = 'ascending';
      if (sortConfig.key === key && sortConfig.direction === 'ascending') {
        direction = 'descending';
      }
      setSortConfig({ key, direction });
    }
  }, [sortConfig, defaultTableSettings]);

  // 入力変更時の処理
  const handleInputChange = useCallback((id, name, value) => {
    const newData = tableData.map((item) => {
      if (item.id === id) {
        if (!originalData.has(id)) {
          originalData.set(id, { ...item });
        }
        return { ...item, [name]: value };
      }
      return item;
    });
    setTableData(newData);
    setEditedCells((prev) => new Set(prev).add(`${id}-${name}`));
    onDataChange(newData); // データ変更時にコールバックを呼び出す
  }, [tableData, onDataChange, originalData]);

  // 行追加時の処理
  const handleAddRow = useCallback(() => {
    if (defaultTableSettings.allowRowAddition) {
      const newRow = columns.reduce((acc, column) => {
        acc[column.name] = '';
        return acc;
      }, {});
      newRow.id = tableData.length;
      const newData = [...tableData, newRow];
      setTableData(newData);
      onDataChange(newData); // 行追加時にコールバックを呼び出す
    }
  }, [defaultTableSettings, columns, tableData, onDataChange]);

  useImperativeHandle(ref, () => ({
    getTableData: () => tableData,
    getCurrentData: () => currentData,
    getRowWithNeighbors: (row) => {
      const rowIndex = currentData.findIndex(item => item.id === row.id);
      const prevRow = currentData[rowIndex - 1] || null;
      const nextRow = currentData[rowIndex + 1] || null;
      return { row, prevRow, nextRow };
    },
    getEditedRows: () => {
      const editedRows = Array.from(editedCells).map(cell => {
        const [id] = cell.split('-');
        const editedRow = tableData.find(item => item.id === parseInt(id, 10));
        const originalRow = originalData.get(parseInt(id, 10));
        return { editedRow, originalRow };
      });
      return editedRows;
    },
  }));

  // レコード数変更時に現在ページが最大ページ数を超えている場合の処理
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  // 行クリック時の処理
  const handleRowClick = useCallback((rowIndex) => {
    const row = currentData[rowIndex];
    const prevRow = currentData[rowIndex - 1] || null;
    const nextRow = currentData[rowIndex + 1] || null;
    if (onRowClick) {
      onRowClick(rowIndex, row, prevRow, nextRow); // rowIndexとrowオブジェクトの両方を渡す
    }
  }, [currentData, onRowClick]);

  return (
    <div className={styles['table-wrapper']} style={{ '--rows-per-page': recordsPerPage, '--row-height': `${40}px` }}>
      <CustomRecordsPerPageSelector
        recordsPerPage={recordsPerPage}
        setRecordsPerPage={setRecordsPerPage}
        options={defaultTableSettings.recordsPerPageOptions || [5, 10, 20, 50, 100]}
      />
      {defaultTableSettings.allowRowAddition && (
        <CustomButton onClick={handleAddRow} className={styles['add-row-button']}>
          行を追加
        </CustomButton>
      )}
      <div className={styles['customtable-container']}>
        <table className={`${styles.customtable}`} style={{ width: `${tableWidth}px` }}>
          <CustomTableHeader columns={columns} requestSort={requestSort} sortConfig={sortConfig} tableSettings={defaultTableSettings} />
          <tbody className={styles['tbody-fixed-height']}>
            {currentData.map((row, rowIndex) => (
              <CustomTableRow
                key={row.id}
                row={row}
                columns={columns}
                handleInputChange={handleInputChange}
                editedCells={editedCells}
                handleRowClick={handleRowClick}
                rowIndex={rowIndex}
                tableSettings={defaultTableSettings}
              />
            ))}
            {/* 空の行を追加して高さを固定 */}
            {Array.from({ length: recordsPerPage - currentData.length }).map((_, index) => (
              <tr key={`empty-${index}`} className={index % 2 === 0 ? styles['even-row'] : styles['odd-row']}>
                {columns.map((column, colIndex) => (
                  <td key={`empty-${index}-${column.name}`} style={{ width: column.width }} />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <CustomPagination currentPage={currentPage} totalPages={totalPages} handleClick={handleClick} />
    </div>
  );
});

CustomTable.defaultProps = {
  rowsPerPage: 10,
  tableSettings: {
    fixedColumns: 0,
    allowRowAddition: false,
    sortableColumns: [],
    recordsPerPageOptions: [5, 10, 20, 50, 100],
  },
};

export const exportTableDataAsJson = (tableData) => {
  return JSON.stringify(tableData, null, 2);
};

export default CustomTable;