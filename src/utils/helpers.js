import { COMPETENCIES } from './constants';
import { INDUSTRIES } from './industries';
import { JOBS } from './jobs';
import { INDUSTRY_JOBS } from './constants';

// 진단 결과 계산 함수
export const calculateResults = (userScores) => {
  // 업계 매칭 계산
  const industryMatches = INDUSTRIES.map(industry => {
    let matchScore = 0;
    let maxPossibleScore = 0;
    let importantCompetenciesScore = 0; // 중요 역량에 대한 점수
    let importantCompetenciesCount = 0; // 중요 역량 개수
    let competencyValues = {};
    
    Object.keys(industry.competencies).forEach(competency => {
      const industryValue = industry.competencies[competency];
      const userValue = userScores[competency] || 3; // 기본값 3
      
      // 각 역량별 점수 저장
      competencyValues[competency] = {
        industryValue,
        userValue,
        contribution: industryValue * userValue
      };
      
      // 기본 매칭 점수 계산 (기존 방식)
      matchScore += industryValue * userValue;
      maxPossibleScore += industryValue * 5; // 5점 만점 기준
      
      // 중요 역량(3점 이상)에 대한 별도 점수 계산 - 변별력 향상
      if (industryValue >= 3) {
        importantCompetenciesScore += userValue;
        importantCompetenciesCount++;
      }
    });
    
    // 기본 백분율 매칭 점수
    let percentageMatch = Math.round((matchScore / maxPossibleScore) * 100);
    
    // 중요 역량 보너스/페널티 적용 (변별력 향상)
    if (importantCompetenciesCount > 0) {
      const avgImportantScore = importantCompetenciesScore / importantCompetenciesCount;
      
      // 중요 역량 점수가 높으면 보너스, 낮으면 페널티
      if (avgImportantScore > 3.5) {
        percentageMatch += 5; // 보너스
      } else if (avgImportantScore < 2.5) {
        percentageMatch -= 5; // 페널티
      }
      
      // 범위 제한
      percentageMatch = Math.min(100, Math.max(0, percentageMatch));
    }
    
    return {
      ...industry,
      matchScore,
      percentageMatch,
      avgImportantScore: importantCompetenciesCount > 0 ? 
                        (importantCompetenciesScore / importantCompetenciesCount).toFixed(1) : 0,
      competencyValues
    };
  }).sort((a, b) => b.percentageMatch - a.percentageMatch);
  
  // 상위 3개 업계 추출
  const topIndustries = industryMatches.slice(0, 3);
  
  // 각 상위 업계별로 해당하는 직무만 필터링하여 매칭
  const jobMatchesByIndustry = topIndustries.map(industry => {
    // 해당 업계의 가능 직무 ID 목록
    const availableJobIds = INDUSTRY_JOBS[industry.id] || [];
    
    // 해당 업계에 가능한 직무만 필터링하여 계산
    const filteredJobs = JOBS.filter(job => availableJobIds.includes(job.id))
      .map(job => {
        let matchScore = 0;
        let maxPossibleScore = 0;
        let importantCompetenciesScore = 0;
        let importantCompetenciesCount = 0;
        let competencyValues = {};
        
        Object.keys(job.competencies).forEach(competency => {
          const jobValue = job.competencies[competency];
          const userValue = userScores[competency] || 3;
          
          // 각 역량별 점수 저장
          competencyValues[competency] = {
            jobValue,
            userValue,
            contribution: jobValue * userValue
          };
          
          matchScore += jobValue * userValue;
          maxPossibleScore += jobValue * 5;
          
          if (jobValue >= 3) {
            importantCompetenciesScore += userValue;
            importantCompetenciesCount++;
          }
        });
        
        let percentageMatch = Math.round((matchScore / maxPossibleScore) * 100);
        
        if (importantCompetenciesCount > 0) {
          const avgImportantScore = importantCompetenciesScore / importantCompetenciesCount;
          
          if (avgImportantScore > 3.5) {
            percentageMatch += 5;
          } else if (avgImportantScore < 2.5) {
            percentageMatch -= 5;
          }
          
          percentageMatch = Math.min(100, Math.max(0, percentageMatch));
        }
        
        return {
          ...job,
          matchScore,
          percentageMatch,
          avgImportantScore: importantCompetenciesCount > 0 ? 
                            (importantCompetenciesScore / importantCompetenciesCount).toFixed(1) : 0,
          industryId: industry.id,
          industryName: industry.name,
          competencyValues
        };
      }).sort((a, b) => b.percentageMatch - a.percentageMatch)
      .slice(0, 2); // 각 업계별 상위 2개 직무
      
    return filteredJobs;
  });
  
  // 모든 업계의 직무를 하나의 배열로 합치고 매칭 점수로 정렬
  const allJobMatches = jobMatchesByIndustry.flat()
    .sort((a, b) => b.percentageMatch - a.percentageMatch)
    .slice(0, 5); // 전체 상위 5개 직무만 표시
  
  // 역량 데이터를 레이더 차트용으로 변환
  const userRadarData = COMPETENCIES.map(comp => ({
    subject: comp.name,
    value: userScores[comp.id] || 3
  }));
  
  // 상위 3개 업계의 역량 데이터를 레이더 차트용으로 변환
  const industryRadarData = topIndustries.map(industry => {
    return {
      id: industry.id,
      name: industry.name,
      data: COMPETENCIES.map(comp => ({
        subject: comp.name,
        value: industry.competencies[comp.id] || 0
      }))
    };
  });
  
  return {
    industries: topIndustries,
    jobs: allJobMatches,
    userRadarData,
    industryRadarData
  };
}; 