// 직무 정의 및 역량 매칭
export const JOBS = [
  { 
    id: 'itdev', 
    name: 'IT 개발직',
    description: '프로그래머, 웹/앱 개발자, 데이터 엔지니어 등',
    competencies: { 
      logic: 5, communication: 3, creativity: 3, detail: 5, 
      organization: 3, it_technical: 5, mfg_technical: 0, global: 1, flexibility: 5,
      trend: 3, profitability: 1
    }
  },
  { 
    id: 'se', 
    name: '시스템 엔지니어(SE)',
    description: '시스템 설계, 구축, 운용, 유지보수 등',
    competencies: { 
      logic: 5, communication: 5, creativity: 1, detail: 3, 
      organization: 3, it_technical: 5, mfg_technical: 1, global: 1, flexibility: 5,
      trend: 1, profitability: 3
    }
  },
  { 
    id: 'sales', 
    name: '영업직',
    description: '법인/개인 영업, 고객 관리, 신규 개척 등',
    competencies: { 
      logic: 3, communication: 5, creativity: 1, detail: 3, 
      organization: 1, it_technical: 1, mfg_technical: 1, global: 1, flexibility: 5,
      trend: 3, profitability: 5
    }
  },
  { 
    id: 'planning', 
    name: '기획직',
    description: '상품 기획, 서비스 기획, 전략 기획 등',
    competencies: { 
      logic: 5, communication: 3, creativity: 5, detail: 3, 
      organization: 3, it_technical: 1, mfg_technical: 1, global: 1, flexibility: 5,
      trend: 5, profitability: 3
    }
  },
  { 
    id: 'consultant', 
    name: '컨설턴트',
    description: '비즈니스 분석, 솔루션 제안, 프로젝트 관리 등',
    competencies: { 
      logic: 5, communication: 5, creativity: 3, detail: 3, 
      organization: 5, it_technical: 3, mfg_technical: 1, global: 3, flexibility: 5,
      trend: 3, profitability: 3
    }
  },
  { 
    id: 'admin', 
    name: '사무 종합직(관리부문)',
    description: '인사, 총무, 회계, 법무 등 백오피스 업무',
    competencies: { 
      logic: 3, communication: 5, creativity: 1, detail: 5, 
      organization: 3, it_technical: 1, mfg_technical: 0, global: 1, flexibility: 5,
      trend: 1, profitability: 3
    }
  },
  { 
    id: 'engineer', 
    name: '기술 종합직(엔지니어)',
    description: '제품 개발, 생산 기술, 품질 관리 등',
    competencies: { 
      logic: 5, communication: 3, creativity: 3, detail: 5, 
      organization: 1, it_technical: 1, mfg_technical: 5, global: 1, flexibility: 3,
      trend: 1, profitability: 3
    }
  },
  { 
    id: 'research', 
    name: '연구개발직',
    description: 'R&D, 기초/응용 연구, 신기술 개발 등',
    competencies: { 
      logic: 5, communication: 3, creativity: 5, detail: 5, 
      organization: 1, it_technical: 3, mfg_technical: 5, global: 3, flexibility: 3,
      trend: 3, profitability: 1
    }
  },
  { 
    id: 'service', 
    name: '서비스직',
    description: '고객 응대, 서비스 제공, 접객, 안내 등',
    competencies: { 
      logic: 1, communication: 5, creativity: 1, detail: 3, 
      organization: 1, it_technical: 1, mfg_technical: 0, global: 5, flexibility: 5,
      trend: 1, profitability: 1
    }
  },
  { 
    id: 'creative', 
    name: '크리에이티브직',
    description: '디자이너, 작가, 아트 디렉터, 콘텐츠 제작자 등',
    competencies: { 
      logic: 3, communication: 3, creativity: 5, detail: 5, 
      organization: 3, it_technical: 3, mfg_technical: 1, global: 1, flexibility: 3,
      trend: 5, profitability: 1
    }
  }
]; 