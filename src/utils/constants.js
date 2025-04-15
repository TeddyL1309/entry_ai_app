// 역량 정의
export const COMPETENCIES = [
  { id: 'logic', name: '논리/분석력', description: '데이터 분석, 문제 해결, 논리적 사고 능력' },
  { id: 'communication', name: '커뮤니케이션', description: '의사소통 능력, 대인관계 능력, 설득력' },
  { id: 'creativity', name: '창의성', description: '새로운 아이디어 제안, 창의적 사고, 혁신 능력' },
  { id: 'detail', name: '세부주의', description: '꼼꼼함, 정확성, 세부사항에 대한 집중력' },
  { id: 'organization', name: '조직력', description: '업무 관리, 일정 조율, 효율적인 일 처리 능력' },
  { id: 'it_technical', name: 'IT 기술 전문성', description: '프로그래밍, 소프트웨어 개발, 시스템 설계, 데이터 분석 등' },
  { id: 'mfg_technical', name: '제조/공학 전문성', description: '전기전자, 기계, 화학, 생산기술, 품질관리 등' },
  { id: 'global', name: '언어/국제감각', description: '외국어 능력, 다문화 이해, 글로벌 마인드' },
  { id: 'flexibility', name: '융통성/적응력', description: '변화 대응력, 새로운 환경 적응력, 스트레스 관리' },
  { id: 'trend', name: '트렌드 민감도', description: '시장 트렌드 파악, 소비자 니즈 이해, 시장 변화 예측 능력' },
  { id: 'profitability', name: '수익성 관리', description: '비용 관리, 매출 목표 달성, 효율적 자원 활용 능력' }
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