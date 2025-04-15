import React from 'react';

const TestCard = ({ title, description, icon, color, borderColor, buttonColor, onClick, buttonText = "검사 시작하기" }) => {
  return (
    <div className={`test-card rounded-lg border ${borderColor} ${color} p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow`}>
      <div className="text-4xl mb-4">{icon}</div>
      <h2 className="text-xl font-bold mb-3">{title}</h2>
      <p className="text-gray-600 mb-6 flex-grow">{description}</p>
      <button
        className={`${buttonColor} text-white py-2 px-4 rounded-lg transition`}
        onClick={onClick}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default TestCard; 