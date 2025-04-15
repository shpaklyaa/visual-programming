import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FormComponent from './components/FormComponent';
import PersonComponent from './components/PersonComponent';
import "./App.css"

const App = () => {
  const [people, setPeople] = useState([]);

  const handleAddPerson = (person) => {
    setPeople([...people, person]);
  };

  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/form">Добавить человека</Link>
          <Link to="/list">Список людей</Link>
        </nav>

        <Routes>
          <Route
            path="/form"
            element={<FormComponent onSubmit={handleAddPerson} />}
          />
          <Route
            path="/list"
            element={
              <div>
                {people.map((person, index) => (
                  <PersonComponent key={index} person={person} />
                ))}
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;