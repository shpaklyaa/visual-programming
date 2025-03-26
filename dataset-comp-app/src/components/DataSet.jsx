import React, { useState } from 'react';
import './DataSet.css'; // Подключение стилей

const DataSet = ({
  headers,
  data,
  renderHeader = (header) => header.label || header.property,
  renderCell = ({ value }) => value,
}) => {
  const [selectedRows, setSelectedRows] = useState([]);

  // Обработчик клика по строке
  const handleRowClick = (index, event) => {
    const isCtrlPressed = event.ctrlKey;

    if (isCtrlPressed) {
      // Если Ctrl зажата, добавляем/удаляем строку из множества выделенных
      setSelectedRows((prevSelected) =>
        prevSelected.includes(index)
          ? prevSelected.filter((rowIndex) => rowIndex !== index)
          : [...prevSelected, index]
      );
    } else {
      // Если Ctrl не зажата, очищаем все выделенные строки и выделяем текущую
      setSelectedRows(isSelected(index) ? [] : [index]);
    }
  };

  // Проверка, является ли строка выделенной
  const isSelected = (index) => selectedRows.includes(index);

  // Получение заголовков столбцов
  const getHeaders = () => {
    if (headers && headers.length > 0) {
      return headers;
    }

    if (data && data.length > 0) {
      return Object.keys(data[0]).map((key) => ({ property: key }));
    }

    return [];
  };

  return (
    <div>
      <table className="dataSetTable">
        <thead>
          <tr>
            {/* Добавляем столбец для выделения */}
            <th className="selectableArea"></th>
            {getHeaders().map((header, index) => (
              <th key={index}>{renderHeader(header)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr
              key={rowIndex}
              onClick={(event) => handleRowClick(rowIndex, event)}
              className={isSelected(rowIndex) ? 'selected' : ''}
            >
              {/* Добавляем ячейку для выделения строки */}
              <td className="selectableArea">{isSelected(rowIndex) ? '✓' : ''}</td>
              {getHeaders().map((header, colIndex) => (
                <td key={colIndex}>
                  {renderCell({
                    value: item[header.property],
                  })}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataSet;