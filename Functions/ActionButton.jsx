// ActionButton.jsx
import React from 'react';

const ActionButton = ({ label, onClick }) => {
  return (
    <button
      className="bg-green-500 text-white p-1 ml-2"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default ActionButton;
