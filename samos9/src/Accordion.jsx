import React, { useState } from 'react';

const Accordion = ({ header, children, renderHeader }) => {
  // Состояние для отслеживания открытого/закрытого состояния
  const [isOpen, setIsOpen] = useState(false);

  // Функция для переключения состояния
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  // Рендер заголовка с использованием переданной функции renderHeader
  const renderedHeader = renderHeader(header, toggleAccordion);

  return (
    <div className="accordion">
      {/* Заголовок */}
      <div className="header" onClick={toggleAccordion}>
        {renderedHeader}
      </div>

      {/* Тело */}
      {isOpen && (
        <div className="body">
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;