import React from 'react';

const Header = ({ onBackToHome }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div 
          className="text-blue-600 font-bold text-xl md:text-2xl cursor-pointer flex items-center"
          onClick={onBackToHome}
        >
          entry.ai
        </div>
        <nav className="flex space-x-4">
          <button 
            onClick={onBackToHome}
            className="text-gray-600 hover:text-blue-600 transition"
          >
            🏠 홈으로
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header; 