import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DataTable from './components/DataTable'; // Импорт DataTable
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        {/* Панель навигации */}
        <nav className="sidebar">
          <ul>
            <li>
              <Link to="/posts">Posts</Link>
            </li>
            <li>
              <Link to="/albums">Albums</Link>
            </li>
            <li>
              <Link to="/todos">Todos</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        {/* Основное содержимое */}
        <main className="content">
          <Routes>
            {/* Маршруты для каждой таблицы */}
            <Route
              path="/posts"
              element={<DataTable endpoint="https://jsonplaceholder.typicode.com/posts" />}
            />
            <Route
              path="/albums"
              element={<DataTable endpoint="https://jsonplaceholder.typicode.com/albums" />}
            />
            <Route
              path="/todos"
              element={<DataTable endpoint="https://jsonplaceholder.typicode.com/todos" />}
            />
            <Route
              path="/users"
              element={<DataTable endpoint="https://jsonplaceholder.typicode.com/users" />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;