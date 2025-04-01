import React from 'react';
import Accordion from './Accordion';

function App() {
  return (
    <div className="app">
      <h1>Accordion Example</h1>
      <Accordion
        header={{
          icon: ['🍎', '🍌', '🍊'],
          text: 'Fruits',
        }}
        renderHeader={(header, toggle) => (
          <div className="header-content">
            {header.icon.map((icon, index) => (
              <span key={index}>{icon}</span>
            ))}
            <span>{header.text}</span>
            <span onClick={toggle} className="toggle-icon">
              {toggle ? '▲' : '▼'}
            </span>
          </div>
        )}
      >
        <div className="fruits-list">
          <div className="fruit-item">
            <span className="fruit-icon">🍎</span>
            <span className="fruit-name">Apple</span>
          </div>
          <div className="fruit-item">
            <span className="fruit-icon">🍌</span>
            <span className="fruit-name">Banana</span>
          </div>
          <div className="fruit-item">
            <span className="fruit-icon">🍊</span>
            <span className="fruit-name">Orange</span>
          </div>
        </div>
      </Accordion>
    </div>
  );
}

export default App;