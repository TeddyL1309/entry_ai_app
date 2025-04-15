import React, { useState } from 'react';
import { LANGUAGE_TEST } from '../utils/testsData';

const LanguageTest = ({ onBackToHome }) => {
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
    if (currentQuestion < LANGUAGE_TEST.questions.length - 1) {
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
    let correctCount = 0;
    
    LANGUAGE_TEST.questions.forEach(question => {
      const userAnswer = answers[question.id];
      if (userAnswer === question.correctAnswer) {
        correctCount++;
      }
    });
    
    const interpretation = LANGUAGE_TEST.interpretation.scores.find(
      score => correctCount >= score.min && correctCount <= score.max
    );
    
    setResult({
      score: correctCount,
      level: interpretation.level,
      description: interpretation.description
    });
    
    setShowResults(true);
  };
  
  const currentQuestionData = currentQuestion >= 0 ? LANGUAGE_TEST.questions[currentQuestion] : null;
  
  const renderIntroduction = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-center">{LANGUAGE_TEST.introduction}</h2>
      
      <div className="bg-blue-50 rounded-lg p-4">
        <p className="mb-2 font-medium">검사 안내:</p>
        <ul className="list-disc list-inside space-y-1">
          {LANGUAGE_TEST.guidance.map((item, index) => (
            <li key={index} className="text-gray-700">{item}</li>
          ))}
        </ul>
      </div>
      
      <div className="bg-yellow-50 rounded-lg p-4">
        <p className="text-sm">
          이 검사는 비즈니스 일본어 이해도와 일본 기업 내 커뮤니케이션에 필요한 언어 지식을 평가합니다.
          약 5분이 소요되며, 각 문항에 대해 가장 적절한 답변을 선택하세요.
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
        <h2 className="text-lg font-semibold">문항 {currentQuestion + 1}/{LANGUAGE_TEST.questions.length}</h2>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-gray-800 mb-6 font-medium">{currentQuestionData.text}</p>
        
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
          {currentQuestion === LANGUAGE_TEST.questions.length - 1 ? '결과 보기' : '다음'}
        </button>
      </div>
    </div>
  );
  
  const renderResults = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">검사 완료!</h2>
        <p className="text-gray-600">
          당신의 비즈니스 일본어 수준:
        </p>
        <div className="mt-4 mb-6">
          <p className="text-3xl font-bold text-blue-600">{result.level}</p>
          <p className="text-lg mt-2">정답 수: {result.score}/{LANGUAGE_TEST.questions.length}</p>
        </div>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">분석 결과</h3>
        <p>{result.description}</p>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-4">문항별 결과</h3>
        <div className="space-y-4">
          {LANGUAGE_TEST.questions.map((question, index) => {
            const userAnswer = answers[question.id];
            const isCorrect = userAnswer === question.correctAnswer;
            
            return (
              <div key={question.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                <div className="flex justify-between mb-2">
                  <h4 className="font-medium">문항 {index + 1}</h4>
                  <span className={`text-sm font-medium ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                    {isCorrect ? '정답' : '오답'}
                  </span>
                </div>
                <p className="text-sm text-gray-700 font-medium mb-2">{question.text}</p>
                <div className="text-sm mb-2">
                  <div className="flex mb-1">
                    <span className="font-medium mr-2 w-20">내 답변:</span>
                    <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                      {userAnswer ? question.options.find(o => o.value === userAnswer)?.label : '답변 없음'}
                    </span>
                  </div>
                  {!isCorrect && (
                    <div className="flex">
                      <span className="font-medium mr-2 w-20">정답:</span>
                      <span className="text-green-600">
                        {question.options.find(o => o.value === question.correctAnswer)?.label}
                      </span>
                    </div>
                  )}
                </div>
                <div className="mt-2 p-2 bg-blue-50 rounded">
                  <p className="text-sm font-medium">설명:</p>
                  <p className="text-sm">{question.explanation}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="bg-yellow-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">일본어 능력 향상을 위한 조언</h3>
        <ul className="list-disc list-inside space-y-2">
          {result.score <= 2 && (
            <>
              <li>비즈니스 일본어 기초 교재로 자주 사용되는 단어와 표현을 학습하세요.</li>
              <li>비즈니스 상황을 다룬 초급 일본어 교재나 앱을 활용하세요.</li>
              <li>JLPT N3 수준의 일본어 학습을 목표로 하며, 특히 경어 표현에 주목하세요.</li>
              <li>일본 드라마나 영화를 통해 실제 대화 상황에서의 표현을 익히세요.</li>
            </>
          )}
          {result.score >= 3 && result.score <= 5 && (
            <>
              <li>JLPT N2 수준의 어휘와 문법, 특히 비즈니스 관련 용어를 집중적으로 학습하세요.</li>
              <li>비즈니스 이메일 작성법과 전화 응대 표현을 연습하세요.</li>
              <li>회의와 프레젠테이션에서 사용되는 표현을 학습하고 역할극을 통해 연습하세요.</li>
              <li>일본 신문이나 비즈니스 잡지를 정기적으로 읽어 전문 용어에 익숙해지세요.</li>
            </>
          )}
          {result.score >= 6 && result.score <= 8 && (
            <>
              <li>JLPT N1 수준의 어휘와 복잡한 경어 표현을 마스터하세요.</li>
              <li>업종별 전문 용어와 업계 관행에 관한 표현을 학습하세요.</li>
              <li>일본 비즈니스 뉴스나 전문 잡지를 통해 최신 용어와 트렌드를 파악하세요.</li>
              <li>원어민과의 대화 기회를 늘려 자연스러운 비즈니스 대화 능력을 향상시키세요.</li>
            </>
          )}
          {result.score >= 9 && (
            <>
              <li>비즈니스 협상, 컨설팅, 프레젠테이션 등 고급 비즈니스 상황에서의 표현을 더욱 정교화하세요.</li>
              <li>일본의 비즈니스 관행에 관한 서적을 원서로 읽으며 문화적 뉘앙스를 이해하세요.</li>
              <li>일본 기업의 내부 문서 작성법과 보고서 작성 방식을 학습하세요.</li>
              <li>업종별 전문 용어와 업계 특수 표현을 깊이 있게 공부하세요.</li>
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
      <h1 className="text-2xl font-bold text-center mb-6 text-blue-800">비즈니스 일본어 능력 평가</h1>
      
      {currentQuestion === -1 && renderIntroduction()}
      {currentQuestion >= 0 && !showResults && renderQuestion()}
      {showResults && renderResults()}
    </div>
  );
};

export default LanguageTest; 