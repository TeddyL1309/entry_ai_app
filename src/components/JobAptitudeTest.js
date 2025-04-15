import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { COMPETENCIES } from '../utils/constants';
import { calculateResults } from '../utils/helpers';
import SummaryTab from './tabs/SummaryTab';
import IndustriesTab from './tabs/IndustriesTab';
import JobsTab from './tabs/JobsTab';

const JobAptitudeTest = ({ onBackToHome }) => {
  // 상태 관리
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState({
    logic: 3,
    communication: 3,
    creativity: 3,
    detail: 3,
    organization: 3,
    it_technical: 3,
    mfg_technical: 3,
    global: 3,
    flexibility: 3,
    trend: 3,
    profitability: 3
  });
  const [results, setResults] = useState(null);
  const [showExplanation, setShowExplanation] = useState({});
  const [activeTab, setActiveTab] = useState('summary');

  // 점수 업데이트 핸들러
  const handleScoreChange = (competency, value) => {
    setScores(prev => ({
      ...prev,
      [competency]: parseInt(value)
    }));
  };

  // 다음 단계로 이동
  const handleNext = () => {
    if (step === 0) {
      setStep(1);
    } else if (step === 1) {
      const calculatedResults = calculateResults(scores);
      setResults(calculatedResults);
      setStep(2);
    }
  };

  // 처음으로 돌아가기
  const handleReset = () => {
    setStep(0);
    setScores({
      logic: 3,
      communication: 3,
      creativity: 3,
      detail: 3,
      organization: 3,
      it_technical: 3,
      mfg_technical: 3,
      global: 3,
      flexibility: 3,
      trend: 3,
      profitability: 3
    });
    setResults(null);
    setShowExplanation({});
    setActiveTab('summary');
  };

  // 설명 토글 핸들러
  const toggleExplanation = (id) => {
    setShowExplanation(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  // 업계 추천 차트 데이터 생성
  const generateRecommendationChartData = () => {
    if (!results) return [];
    return results.industries.map(industry => ({
      name: industry.name,
      '추천 확률': industry.percentageMatch
    }));
  };
  
  // 레이더 차트 색상
  const RADAR_COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];

  return (
    <div className="max-w-4xl mx-auto p-4">
      {step === 0 && (
        <IntroductionSection onNext={handleNext} />
      )}
      
      {step === 1 && (
        <QuestionnaireSection 
          scores={scores} 
          onScoreChange={handleScoreChange}
          onNext={handleNext}
        />
      )}
      
      {step === 2 && results && (
        <ResultsSection 
          results={results}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          showExplanation={showExplanation}
          toggleExplanation={toggleExplanation}
          generateRecommendationChartData={generateRecommendationChartData}
          RADAR_COLORS={RADAR_COLORS}
          handleReset={handleReset}
          scores={scores}
        />
      )}
    </div>
  );
};

// 소개 섹션
const IntroductionSection = ({ onNext }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">업계/직무 적합도 검사</h2>
        <p className="text-gray-600">
          자신의 역량과 성향을 바탕으로 일본 취업에 가장 적합한 업계와 직무를 찾아보세요.
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">테스트 소개</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>11개의 핵심 역량 항목에 대해 자가 평가를 진행합니다.</li>
          <li>각 항목별로 1점부터 5점까지 점수를 선택할 수 있습니다.</li>
          <li>솔직하게 응답할수록 더 정확한 결과를 얻을 수 있습니다.</li>
          <li>테스트 결과는 일본 취업에 적합한 업계와 직무를 추천해 드립니다.</li>
          <li>각 업계와 직무별 상세 정보와 함께 취업 전략도 확인할 수 있습니다.</li>
        </ul>
      </div>
      
      <div className="flex justify-center">
        <button
          onClick={onNext}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition"
        >
          테스트 시작하기
        </button>
      </div>
    </div>
  );
};

// 질문 섹션
const QuestionnaireSection = ({ scores, onScoreChange, onNext }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">역량 자가 평가</h2>
        <p className="text-gray-600">
          각 항목에 대해 본인의 역량 수준을 1점(매우 낮음)부터 5점(매우 높음)까지 평가해주세요.
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="space-y-6">
          {COMPETENCIES.map((competency) => (
            <div key={competency.id} className="border-b pb-4 last:border-b-0 last:pb-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium">{competency.name}</h3>
                  <p className="text-sm text-gray-600">{competency.description}</p>
                </div>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <label key={value} className="mx-1 cursor-pointer">
                      <input
                        type="radio"
                        name={competency.id}
                        value={value}
                        checked={scores[competency.id] === value}
                        onChange={() => onScoreChange(competency.id, value)}
                        className="sr-only"
                      />
                      <span
                        className={`inline-block w-8 h-8 rounded-full flex items-center justify-center ${
                          scores[competency.id] === value
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {value}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-center">
        <button
          onClick={onNext}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition"
        >
          결과 확인하기
        </button>
      </div>
    </div>
  );
};

// 결과 섹션
const ResultsSection = ({ results, activeTab, setActiveTab, showExplanation, toggleExplanation, generateRecommendationChartData, RADAR_COLORS, handleReset, scores }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">진단 결과</h2>
        <button
          onClick={handleReset}
          className="text-blue-600 hover:text-blue-800 focus:outline-none"
        >
          다시 테스트하기
        </button>
      </div>
      
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab('summary')}
            className={`py-2 px-4 text-center border-b-2 font-medium text-sm ${
              activeTab === 'summary'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            결과 요약
          </button>
          <button
            onClick={() => setActiveTab('industries')}
            className={`py-2 px-4 text-center border-b-2 font-medium text-sm ${
              activeTab === 'industries'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            업계 매칭도
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            className={`py-2 px-4 text-center border-b-2 font-medium text-sm ${
              activeTab === 'jobs'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            직무 매칭도
          </button>
        </nav>
      </div>
      
      {/* 결과 콘텐츠 */}
      <div className="bg-gray-50 rounded-lg p-6">
        {activeTab === 'summary' && (
          <SummaryTab 
            results={results}
            generateRecommendationChartData={generateRecommendationChartData}
            scores={scores}
          />
        )}
        
        {activeTab === 'industries' && (
          <IndustriesTab 
            results={results}
            scores={scores}
          />
        )}
        
        {activeTab === 'jobs' && (
          <JobsTab 
            results={results}
            scores={scores}
          />
        )}
      </div>
    </div>
  );
};

export default JobAptitudeTest; 