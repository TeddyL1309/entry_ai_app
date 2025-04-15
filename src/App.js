import React, { useState } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import JobAptitudeTest from './components/JobAptitudeTest';
import BusinessCultureTest from './components/BusinessCultureTest';
import LanguageTest from './components/LanguageTest';
import Footer from './components/Footer';

const App = () => {
  const [selectedTest, setSelectedTest] = useState(null);

  const handleTestSelect = (testType) => {
    setSelectedTest(testType);
  };

  const handleBackToHome = () => {
    setSelectedTest(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header onBackToHome={handleBackToHome} />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        {selectedTest === 'aptitude' && (
          <JobAptitudeTest onBackToHome={handleBackToHome} />
        )}
        {selectedTest === 'business-culture' && (
          <BusinessCultureTest onBackToHome={handleBackToHome} />
        )}
        {selectedTest === 'language' && (
          <LanguageTest onBackToHome={handleBackToHome} />
        )}
        {!selectedTest && (
          <HomePage onTestSelect={handleTestSelect} />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default App; 