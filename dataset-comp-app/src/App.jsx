import React from 'react';
import DataSet from './components/DataSet';
import "./App.css"

const App = () => {
  const headers = [
    { property: 'id', label: 'ID' },
    { property: 'name', label: 'Имя' },
    { property: 'age', label: 'Возраст' },
  ];

  const data = [
    { id: 1, name: 'shpatel', age: 298 },
    { id: 2, name: 'christmas-fire', age: -52 },
    { id: 3, name: 'AnotherPumpkin', age: 1.5 },
    { id: "все-7", name: 'Шпаковский aka grubost1', age: "unlimited" },
  ];

  return (
    <div class="table">
      <h1 class="title">Таблица данных</h1>
      <DataSet headers={headers} data={data} />
    </div>
  );
};

export default App;