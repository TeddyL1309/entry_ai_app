import React from 'react';
import { COMPETENCIES } from '../../utils/constants';

const IndustriesTab = ({ results, scores }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold mb-3">업계별 상세 분석</h3>
      
      {results.industries.map((industry, index) => (
        <div key={industry.id} className="border rounded-lg p-4 mb-4">
          <h4 className="text-xl font-bold mb-2 border-b pb-2">{industry.name} ({industry.percentageMatch}% 일치)</h4>
          
          <div className="mb-4">
            <h5 className="font-semibold mb-2">업계 설명</h5>
            <p className="text-gray-700">{industry.description}</p>
          </div>
          
          <div className="mb-4">
            <h5 className="font-semibold mb-2">주요 필요 역량</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {Object.entries(industry.competencies)
                .filter(([_, value]) => value >= 3)
                .sort((a, b) => b[1] - a[1])
                .map(([key, value]) => {
                  const competency = COMPETENCIES.find(c => c.id === key);
                  const userScore = scores[key] || 3;
                  const scoreColor = 
                    userScore >= 4 ? 'text-green-600' : 
                    userScore === 3 ? 'text-yellow-600' : 
                    'text-red-600';
                  
                  return (
                    <div key={key} className="flex items-center bg-gray-50 p-2 rounded">
                      <div className="flex-1">
                        <div className="font-medium">{competency?.name}</div>
                        <div className="text-xs text-gray-500">{competency?.description}</div>
                      </div>
                      <div className={`font-bold ${scoreColor}`}>
                        {userScore}/5
                      </div>
                    </div>
                  );
                })
              }
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IndustriesTab; 