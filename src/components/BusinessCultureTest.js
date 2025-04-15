import React, { useState } from 'react';
import { BUSINESS_CULTURE_TEST } from '../utils/testsData';

const BusinessCultureTest = ({ onBackToHome }) => {
  const [currentQuestion, setCurrentQuestion] = useState(-1);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState({ score: 0, level: '', description: '' });
  
  const handleAnswer = (questionId, value) => {
    setAnswers({
      ...answers,
      [questionId]: value
    });
  };
  
  const handleNext = () => {
    if (currentQuestion < BUSINESS_CULTURE_TEST.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  const calculateResults = () => {
    let totalScore = 0;
    
    BUSINESS_CULTURE_TEST.questions.forEach(question => {
      const userAnswer = answers[question.id];
      if (userAnswer) {
        const score = question.explanation.answers[userAnswer].score;
        totalScore += score;
      }
    });
    
    const interpretation = BUSINESS_CULTURE_TEST.interpretation.scores.find(
      score => totalScore >= score.min && totalScore <= score.max
    );
    
    setResult({
      score: totalScore,
      level: interpretation.level,
      description: interpretation.description
    });
    
    setShowResults(true);
  };
  
  const currentQuestionData = BUSINESS_CULTURE_TEST.questions[currentQuestion];
  
  const renderIntroduction = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-center">{BUSINESS_CULTURE_TEST.introduction}</h2>
      
      <div className="bg-blue-50 rounded-lg p-4">
        <p className="mb-2 font-medium">검사 안내:</p>
        <ul className="list-disc list-inside space-y-1">
          {BUSINESS_CULTURE_TEST.guidance.map((item, index) => (
            <li key={index} className="text-gray-700">{item}</li>
          ))}
        </ul>
      </div>
      
      <div className="bg-yellow-50 rounded-lg p-4">
        <p className="text-sm">
          이 검사는 약 5분 소요되며, 일본 비즈니스 상황에서 당신의 행동 패턴을 예측하여 
          일본 기업 문화에 대한 적응력을 측정합니다. 자신이 실제로 할 것 같은 행동을 솔직하게 선택하세요.
        </p>
      </div>
      
      <button
        onClick={() => setCurrentQuestion(0)}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
      >
        검사 시작하기
      </button>
    </div>
  );
  
  const renderQuestion = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">문항 {currentQuestion + 1}/{BUSINESS_CULTURE_TEST.questions.length}</h2>
        <div className="text-sm text-gray-500">
          카테고리: {(() => {
            switch(currentQuestionData.category) {
              case 'hierarchy': return '조직 계층구조';
              case 'decision_making': return '의사결정 프로세스';
              case 'communication': return '커뮤니케이션 방식';
              case 'relationship': return '인간관계';
              case 'implicit_communication': return '간접적 표현';
              default: return currentQuestionData.category;
            }
          })()}
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-gray-800 mb-6">{currentQuestionData.text}</p>
        
        <div className="space-y-3">
          {currentQuestionData.options.map(option => (
            <div key={option.value} className="border rounded-lg overflow-hidden">
              <label 
                className={`flex p-3 cursor-pointer ${answers[currentQuestionData.id] === option.value ? 'bg-blue-50 border-blue-300' : 'hover:bg-gray-100'}`}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestionData.id}`}
                  value={option.value}
                  checked={answers[currentQuestionData.id] === option.value}
                  onChange={() => handleAnswer(currentQuestionData.id, option.value)}
                  className="mt-1 mr-3"
                />
                <span>{option.label}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className={`py-2 px-4 rounded-lg ${
            currentQuestion === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gray-500 text-white hover:bg-gray-600'
          } transition`}
        >
          이전
        </button>
        
        <button
          onClick={handleNext}
          disabled={!answers[currentQuestionData.id]}
          className={`py-2 px-4 rounded-lg ${
            !answers[currentQuestionData.id]
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          } transition`}
        >
          {currentQuestion === BUSINESS_CULTURE_TEST.questions.length - 1 ? '결과 보기' : '다음'}
        </button>
      </div>
    </div>
  );
  
  const renderResults = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">검사 완료!</h2>
        <p className="text-gray-600">
          당신의 일본 비즈니스 문화 적응력 레벨:
        </p>
        <div className="mt-4 mb-6">
          <p className="text-3xl font-bold text-blue-600">{result.level}</p>
          <p className="text-lg mt-2">총점: {result.score}점</p>
        </div>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">분석 결과</h3>
        <p>{result.description}</p>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-4">문항별 상세 분석</h3>
        <div className="space-y-4">
          {BUSINESS_CULTURE_TEST.questions.map((question, index) => {
            const userAnswer = answers[question.id];
            const answerData = userAnswer ? question.explanation.answers[userAnswer] : null;
            
            return (
              <div key={question.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                <div className="flex justify-between mb-2">
                  <h4 className="font-medium">문항 {index + 1}: {question.category === 'hierarchy' ? '조직 계층구조' : 
                                                     question.category === 'decision_making' ? '의사결정 프로세스' :
                                                     question.category === 'communication' ? '커뮤니케이션 방식' :
                                                     question.category === 'relationship' ? '인간관계' :
                                                     question.category === 'implicit_communication' ? '간접적 표현' :
                                                     question.category}</h4>
                  {answerData && (
                    <span className={`text-sm font-medium ${
                      answerData.score >= 4 ? 'text-green-600' : 
                      answerData.score >= 3 ? 'text-yellow-600' : 
                      'text-red-600'
                    }`}>
                      {answerData.score}점 ({answerData.description})
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-700 mb-2">{question.text}</p>
                <div className="text-sm">
                  <p className="font-medium">내 선택:</p>
                  <p className="text-gray-800">
                    {userAnswer ? question.options.find(o => o.value === userAnswer)?.label : '답변 없음'}
                  </p>
                </div>
                <div className="mt-2 p-2 bg-blue-50 rounded">
                  <p className="text-sm font-medium">설명:</p>
                  <p className="text-sm">{question.explanation.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="bg-yellow-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">일본 비즈니스 문화 적응을 위한 조언</h3>
        <ul className="list-disc list-inside space-y-2">
          {result.score <= 20 && (
            <>
              <li>일본 비즈니스 문화의 기본 개념과 핵심 가치(위계질서, 집단주의, 조화 등)를 학습하세요.</li>
              <li>기본적인 비즈니스 예절과 인사법, 명함 교환 방식 등을 익히세요.</li>
              <li>일본어의 기본 인사말과 비즈니스 상황에서 자주 사용되는 표현을 배우세요.</li>
              <li>일본의 역사와 현대 비즈니스 문화에 영향을 미친 주요 사건들을 이해하세요.</li>
            </>
          )}
          {result.score > 20 && result.score <= 30 && (
            <>
              <li>네마와시(根回し)와 호렌소(報連相)의 중요성과 실제 적용법을 더 깊이 이해하세요.</li>
              <li>비즈니스 일본어 실력을 향상시켜 미묘한 뉘앙스를 파악할 수 있도록 하세요.</li>
              <li>실제 일본 비즈니스 상황에서의 케이스 스터디를 통해 상황별 대응법을 학습하세요.</li>
              <li>일본 회사의 내부 문화와 의사결정 과정에 대한 이해를 높이세요.</li>
            </>
          )}
          {result.score > 30 && result.score <= 40 && (
            <>
              <li>일본 비즈니스의 심층적인
              상황별 대응 방식을 연구하고 역할극을 통해 연습해보세요.</li>
              <li>일본 특유의 '空気を読む'(공기를 읽는다) 능력을 개발하여 언어 외적 신호를 포착하세요.</li>
              <li>부서간 관계와 링기(稟議) 시스템 등 조직 내 복잡한 프로세스에 대한 이해를 높이세요.</li>
              <li>실제 일본인들과의 비즈니스 네트워킹을 통해 실전 감각을 향상시키세요.</li>
            </>
          )}
          {result.score > 40 && (
            <>
              <li>일본 기업의 내부 정치와 암묵적 규칙에 대한 더 깊은 이해를 발전시키세요.</li>
              <li>산업별 특수한 비즈니스 관행과 용어에 대해 학습하세요.</li>
              <li>다양한 상황에서의 리더십 발휘 방법과 갈등 해결 기술을 향상시키세요.</li>
              <li>전통적 비즈니스 관행과 현대적 변화의 균형을 이해하고 유연하게 적응하세요.</li>
            </>
          )}
        </ul>
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={() => {
            setCurrentQuestion(0);
            setAnswers({});
            setShowResults(false);
          }}
          className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition"
        >
          다시 검사하기
        </button>
        
        <button
          onClick={onBackToHome}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          다른 검사 보기
        </button>
      </div>
    </div>
  );
  
  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold text-center mb-6 text-blue-800">일본 비즈니스 문화 적응력 검사</h1>
      
      {currentQuestion === -1 && renderIntroduction()}
      {currentQuestion >= 0 && !showResults && renderQuestion()}
      {showResults && renderResults()}
    </div>
  );
};

export default BusinessCultureTest; 