import React, { useState } from 'react';

const Accordion = ({ header, children, renderHeader }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const renderedHeader = renderHeader(header, toggleAccordion);

  return (
    <div className="accordion">
      <div className="header" onClick={toggleAccordion}>
        {renderedHeader}
      </div>

      {isOpen && (
        <div className="body">
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;