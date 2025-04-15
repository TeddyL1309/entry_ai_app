// 업계 정의 및 역량 매칭
export const INDUSTRIES = [
  { 
    id: 'it', 
    name: 'IT/정보통신',
    description: '소프트웨어 개발, 시스템 구축, 데이터 처리, AI/클라우드 서비스 등',
    competencies: { 
      logic: 5, communication: 3, creativity: 3, detail: 3, 
      organization: 3, it_technical: 5, mfg_technical: 0, global: 1, flexibility: 5,
      trend: 3, profitability: 3
    }
  },
  { 
    id: 'manufacturing', 
    name: '제조업/에너지',
    description: '제품 개발, 생산 관리, 품질 관리, 공정 관리 등',
    competencies: { 
      logic: 3, communication: 3, creativity: 1, detail: 5, 
      organization: 3, it_technical: 1, mfg_technical: 5, global: 1, flexibility: 3,
      trend: 1, profitability: 5
    }
  },
  { 
    id: 'retail', 
    name: '유통/소매',
    description: '판매, 매장 운영, 머천다이징, 상품 기획, 고객 서비스 등',
    competencies: { 
      logic: 1, communication: 5, creativity: 3, detail: 5, 
      organization: 3, it_technical: 1, mfg_technical: 0, global: 1, flexibility: 5,
      trend: 5, profitability: 5
    }
  },
  { 
    id: 'service', 
    name: '서비스',
    description: '호텔, 여행, 외식, 교육, 컨텐츠 제공 등 고객 접점 서비스',
    competencies: { 
      logic: 1, communication: 5, creativity: 1, detail: 3, 
      organization: 1, it_technical: 0, mfg_technical: 0, global: 3, flexibility: 5,
      trend: 1, profitability: 1
    }
  },
  { 
    id: 'finance', 
    name: '금융',
    description: '은행, 증권, 보험, 투자, 자산관리 등',
    competencies: { 
      logic: 5, communication: 5, creativity: 1, detail: 5, 
      organization: 1, it_technical: 3, mfg_technical: 0, global: 3, flexibility: 1,
      trend: 3, profitability: 5
    }
  },
  { 
    id: 'consulting', 
    name: '컨설팅',
    description: '경영 컨설팅, IT 컨설팅, 전략 수립, 솔루션 제안 등',
    competencies: { 
      logic: 5, communication: 5, creativity: 3, detail: 3, 
      organization: 5, it_technical: 3, mfg_technical: 1, global: 3, flexibility: 5,
      trend: 3, profitability: 3
    }
  },
  { 
    id: 'trading', 
    name: '상사/무역',
    description: '수출입, 해외 영업, 국제 비즈니스, 무역 중개 등',
    competencies: { 
      logic: 3, communication: 5, creativity: 3, detail: 3, 
      organization: 3, it_technical: 1, mfg_technical: 1, global: 5, flexibility: 5,
      trend: 3, profitability: 3
    }
  },
  { 
    id: 'media', 
    name: '미디어/광고',
    description: '방송, 출판, 광고, 디자인, 콘텐츠 제작 등',
    competencies: { 
      logic: 1, communication: 5, creativity: 5, detail: 3, 
      organization: 3, it_technical: 3, mfg_technical: 0, global: 1, flexibility: 3,
      trend: 5, profitability: 3
    }
  }
];