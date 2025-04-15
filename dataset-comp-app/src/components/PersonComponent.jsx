import React from 'react';
import "./PersonComponent.css"

const PersonComponent = ({ person }) => {
  return (
    <div className="person">
      <h2>{person.name}</h2>
      <p>Age: {person.age}</p>
      <p>Email: {person.email}</p>
      <h3>Pets:</h3>
      <ul>
        {person.pet.map((pet, index) => (
          <li key={index}>
            Name: {pet.name}, Age: {pet.age}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PersonComponent;