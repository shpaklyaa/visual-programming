import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DataSet from './DataSet';

describe('DataSet Component', () => {
  const headers = [
    { property: 'id', label: 'ID' },
    { property: 'name', label: 'Имя' },
    { property: 'age', label: 'Возраст' },
  ];

  const data = [
    { id: 1, name: 'Alice', age: 25 },
    { id: 2, name: 'Bob', age: 30 },
    { id: 3, name: 'Charlie', age: 35 },
  ];

  it('renders the table with headers and data', () => {
    render(<DataSet headers={headers} data={data} />);

    // Проверяем заголовки столбцов
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Имя')).toBeInTheDocument();
    expect(screen.getByText('Возраст')).toBeInTheDocument();

    // Проверяем данные в таблице
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Charlie')).toBeInTheDocument();
  });

  it('allows row selection', () => {
    render(<DataSet headers={headers} data={data} />);

    // Нажимаем на первую строку
    const firstRow = screen.getAllByRole('row')[1]; // Первый ряд данных (индекс 1)
    fireEvent.click(firstRow);

    // Проверяем, что строка выделена
    expect(firstRow).toHaveStyle({ backgroundColor: '#e6f7ff' });

    // Нажимаем снова на первую строку
    fireEvent.click(firstRow);

    // Проверяем, что выделение снято
    expect(firstRow).not.toHaveStyle({ backgroundColor: '#e6f7ff' });
  });

  it('allows multiple row selection with Ctrl key', () => {
    render(<DataSet headers={headers} data={data} />);

    // Нажимаем на первую строку
    const firstRow = screen.getAllByRole('row')[1];
    fireEvent.click(firstRow);

    // Нажимаем на вторую строку с зажатой клавишей Ctrl
    const secondRow = screen.getAllByRole('row')[2];
    fireEvent.keyDown(secondRow, { key: 'Control' }); // Зажимаем Ctrl
    fireEvent.click(secondRow);
    fireEvent.keyUp(secondRow, { key: 'Control' }); // Отпускаем Ctrl

    // Проверяем, что обе строки выделены
    expect(firstRow).toHaveStyle({ backgroundColor: '#e6f7ff' });
    expect(secondRow).toHaveStyle({ backgroundColor: '#e6f7ff' });
  });
});