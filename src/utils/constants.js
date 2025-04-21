// 역량 정의
export const COMPETENCIES = [
  { id: 'logic', name: '논리/분석력', description: '의사결정 과정에서, 나는 데이터와 정보를 분석하는 것과 직관적 판단 중 어떤 방식을 선호하나요?\n(1점: 주로 직관적 판단에 의존함 ~ 5점: 주로 데이터 분석에 의존함)' },
  { id: 'communication', name: '커뮤니케이션', description: '여러 의견이 공존하는 상황에서, 나는 토론을 진행하거나 의견을 청취하는 방식 중 어디에 더 편안함을 느끼나요?\n(1점: 주로 명확한 방향 제시 ~ 5점: 주로 다양한 의견 청취)' },
  { id: 'creativity', name: '창의성', description: '문제 해결 시, 나는 검증된 방법과 새로운 접근법 중 어느 쪽에 더 끌리나요?\n(1점: 주로 검증된 방법 선호 ~ 5점: 주로 새로운 접근법 선호)' },
  { id: 'detail', name: '세부주의', description: '프로젝트 수행 시, 나는 전체적인 방향과 세부 사항 중 어디에 더 관심을 두나요?\n(1점: 주로 전체적인 방향에 집중 ~ 5점: 주로 세부 사항에 집중)' },
  { id: 'organization', name: '조직력', description: '업무 처리 방식에 있어, 나는 즉흥적 대응과 계획적 접근 중 어느 쪽을 더 자연스럽게 선택하나요?\n(1점: 주로 즉흥적 대응 ~ 5점: 주로 계획적 접근)' },
  { id: 'it_technical', name: 'IT 기술 전문성', description: '다음 IT 관련 활동 중 본인이 편안하게 수행할 수 있는 수준은 어느 정도인가요?\n(1점: 기본적인 소프트웨어 사용 ~ 3점: 간단한 코딩이나 시스템 설정 가능 ~ 5점: 복잡한 프로그래밍이나 시스템 설계 가능)' },
  { id: 'mfg_technical', name: '제조/공학 전문성', description: '제조나 공학 분야에서 본인의 전문 지식과 경험 수준은 어느 정도인가요?\n(1점: 기초적인 이해 수준 ~ 3점: 특정 분야에 대한 실무 경험 보유 ~ 5점: 여러 공학 분야에서의 심화된 전문 지식 보유)' },
  { id: 'global', name: '언어/국제감각', description: '다양한 문화적 환경에서, 나는 익숙한 방식 유지와 현지 방식 수용 중 어디에 더 편안함을 느끼나요?\n(1점: 주로 익숙한 방식 유지 ~ 5점: 주로 현지 방식 수용)' },
  { id: 'flexibility', name: '융통성/적응력', description: '계획 변경이 필요할 때, 나는 기존 방식 고수와 새로운 방향 수용 중 어느 쪽에 더 자연스럽게 반응하나요?\n(1점: 주로 기존 방식 고수 ~ 5점: 주로 새로운 방향 수용)' },
  { id: 'trend', name: '트렌드 민감도', description: '산업이나 시장 트렌드를 파악하기 위해 어느 정도로 관련 정보를 접하고 분석하나요?\n(1점: 가끔 주요 뉴스 확인 ~ 3점: 정기적으로 업계 동향 파악 ~ 5점: 다양한 출처를 통해 지속적으로 트렌드 분석)' },
  { id: 'profitability', name: '수익성 관리', description: '자원 배분 시, 나는 품질/성능 우선과 비용 효율성 우선 중 어느 기준을 더 중요하게 생각하나요?\n(1점: 주로 품질/성능 우선 ~ 5점: 주로 비용 효율성 우선)' }
];

// 업계별 가능 직무 매핑
export const INDUSTRY_JOBS = {
  'it': ['itdev', 'se', 'sales', 'planning', 'consultant'],
  'manufacturing': ['sales', 'admin', 'se', 'engineer', 'research'],
  'retail': ['sales', 'admin', 'planning', 'service'],
  'service': ['sales', 'admin', 'service'],
  'finance': ['sales', 'se', 'consultant'],
  'consulting': ['consultant'],
  'trading': ['sales'],
  'media': ['sales', 'creative']
}; 