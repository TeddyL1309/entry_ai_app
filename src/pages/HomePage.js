import React from 'react';
import TestCard from '../components/TestCard';

const HomePage = ({ onTestSelect }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <section className="mb-10 text-center">
        <h1 className="text-5xl font-bold text-blue-600 mb-4">
          entry.ai
        </h1>
        <div className="bg-blue-50 p-6 rounded-lg inline-block text-center mx-auto">
          <p className="text-gray-700 text-base">
            적성검사 결과와 간단한 이력만 있다면<br />
            5분만에 맞춤형 엔트리시트 완성!
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-800 mb-4">적성 검사</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TestCard
            title="업계/직무 적합도 검사"
            description="당신의 특성에 맞는 업계와 직무는?"
            icon="👔"
            color="bg-yellow-50"
            borderColor="border-yellow-200"
            buttonColor="bg-yellow-500 hover:bg-yellow-600"
            onClick={() => onTestSelect('aptitude')}
            buttonText="검사 시작하기"
          />
          
          <TestCard
            title="일본 비즈니스 적응력 검사"
            description="당신의 일본 사회생활 레벨은?"
            icon="🤝"
            color="bg-blue-50"
            borderColor="border-blue-200"
            buttonColor="bg-blue-500 hover:bg-blue-600"
            onClick={() => onTestSelect('business-culture')}
            buttonText="검사 시작하기"
          />
          
          <TestCard
            title="일본어 능력 자가 진단"
            description="회의 지옥에서 살아남을 가능성은?"
            icon="🗣️"
            color="bg-green-50"
            borderColor="border-green-200"
            buttonColor="bg-green-500 hover:bg-green-600"
            onClick={() => onTestSelect('language')}
            buttonText="검사 시작하기"
          />
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">ES 작성</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TestCard
            title="엔트리시트 작성 가이드"
            description="2025년 최신판 ES 작성의 모든 것"
            icon="📝"
            color="bg-purple-50"
            borderColor="border-purple-200"
            buttonColor="bg-purple-500 hover:bg-purple-600"
            onClick={() => window.open('https://docs.google.com/document/d/1hRdzVVlmr3iXzH9Q58NDNjz3TKi-rLHN/edit?usp=sharing&ouid=115919424945295513275&rtpof=true&sd=true', '_blank')}
            buttonText="내용 확인하기"
          />
          
          <TestCard
            title="entry.ai 엔트리시트 메이커"
            description="검사 결과와 당신의 이력만 입력하면 5분만에 맞춤형 ES 완성"
            icon="✨"
            color="bg-indigo-50"
            borderColor="border-indigo-200"
            buttonColor="bg-indigo-500 hover:bg-indigo-600"
            onClick={() => window.open('https://chatgpt.com/g/g-67e6593863c8819182fe301338057534-entry-ai-enteurisiteu-meikeo', '_blank')}
            buttonText="바로 만들어보기"
          />
          
          <TestCard
            title="컨설팅 신청하기"
            description="월드잡플러스 출신 컨설턴트와 함께 엔트리 전략을 설계하고 싶다면?"
            icon="💬"
            color="bg-pink-50"
            borderColor="border-pink-200"
            buttonColor="bg-pink-500 hover:bg-pink-600"
            onClick={() => window.open('#', '_blank')}
            buttonText="신청하기"
          />
        </div>
      </section>
    </div>
  );
};

export default HomePage; 