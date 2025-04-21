import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { COMPETENCIES } from '../../utils/constants';

const SummaryTab = ({ results, generateRecommendationChartData, scores }) => {
  if (!results) return null;
  
  return (
    <div className="space-y-6">
      {/* 추천 업계 */}
      <div>
        <h3 className="text-lg font-semibold mb-3">추천 업계</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {results.industries.slice(0, 3).map((industry) => (
            <div
              key={industry.id}
              className="bg-white p-4 rounded-lg shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-medium mb-1">{industry.name}</h4>
                  <p className="text-sm text-gray-500 mb-3">
                    매칭 점수: {industry.percentageMatch}%
                  </p>
                </div>
                <span className={`text-xs font-semibold rounded-full px-2 py-1 ${
                  industry.percentageMatch >= 80 ? 'bg-green-100 text-green-800' : 
                  industry.percentageMatch >= 70 ? 'bg-blue-100 text-blue-800' : 
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {industry.percentageMatch >= 80 ? '매우 높음' : 
                   industry.percentageMatch >= 70 ? '높음' : '보통'}
                </span>
              </div>
              
              <p className="text-sm mb-3">
                {industry.shortDescription}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 추천 직무 */}
      <div>
        <h3 className="text-lg font-semibold mb-3">추천 직무</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {results.jobs.slice(0, 3).map((job) => (
            <div
              key={job.id}
              className="bg-white p-4 rounded-lg shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-medium mb-1">{job.name}</h4>
                  <p className="text-sm mb-2">
                    <span className="font-bold text-red-600">{job.industryName} 업계</span>
                  </p>
                  <p className="text-sm text-gray-500 mb-3">
                    매칭 점수: {job.percentageMatch}%
                  </p>
                </div>
                <span className={`text-xs font-semibold rounded-full px-2 py-1 ${
                  job.percentageMatch >= 80 ? 'bg-green-100 text-green-800' : 
                  job.percentageMatch >= 70 ? 'bg-blue-100 text-blue-800' : 
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {job.percentageMatch >= 80 ? '매우 높음' : 
                   job.percentageMatch >= 70 ? '높음' : '보통'}
                </span>
              </div>
              
              <p className="text-sm mb-3">
                {job.shortDescription}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 추천 차트 */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-3">업계별 적합도</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={generateRecommendationChartData()}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis type="category" dataKey="name" width={100} />
              <Tooltip formatter={(value) => [`${value}%`, '추천 확률']} />
              <Bar dataKey="추천 확률" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 핵심 역량 */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">핵심 역량과 엔트리시트 어필 포인트</h3>
        <div className="space-y-4">
          {(() => {
            // 5점인 항목 필터링
            const maxScoreItems = Object.entries(scores).filter(([_, score]) => score === 5);
            
            // 5점인 항목이 있더라도 3개 미만이면 다음 높은 점수 항목을 추가
            let itemsToShow = [...maxScoreItems];
            
            // 5점 항목이 3개 미만인 경우, 추가 항목 필요
            if (itemsToShow.length < 3) {
              // 5점 아닌 항목들을 점수 내림차순으로 정렬
              const otherItems = Object.entries(scores)
                .filter(([_, score]) => score < 5)
                .sort((a, b) => b[1] - a[1]);
              
              // 필요한 만큼 추가 (3개까지)
              const additionalItems = otherItems.slice(0, 3 - itemsToShow.length);
              itemsToShow = [...itemsToShow, ...additionalItems];
            }
            
            return itemsToShow.map(([compId, score]) => {
              const competency = COMPETENCIES.find(c => c.id === compId);
              const compName = compId === 'logic' ? '논리적 사고' : 
                           compId === 'communication' ? '커뮤니케이션' :
                           compId === 'creativity' ? '창의력' :
                           compId === 'detail' ? '세부 지향성' :
                           compId === 'organization' ? '조직력' :
                           compId === 'it_technical' ? 'IT 기술' :
                           compId === 'mfg_technical' ? '제조 기술' :
                           compId === 'global' ? '글로벌 감각' :
                           compId === 'flexibility' ? '유연성' :
                           compId === 'trend' ? '트렌드 감각' : '수익성 의식';
              
              return (
                <div key={compId} className="border p-3 rounded-lg bg-white">
                  <h4 className="font-bold text-blue-700">
                    {compName} <span className="text-sm text-gray-500">(점수: {score}/5)</span>
                  </h4>
                  <div className="mt-2 space-y-3">
                    <div className="text-sm">
                      <h5 className="font-medium text-gray-700 mb-1">자기PR(自己PR) 어필 포인트:</h5>
                      <p className="text-gray-600">
                        {(() => {
                          switch(compId) {
                            case 'logic':
                              return '데이터를 분석하고 논리적으로 문제를 해결한 경험을 구체적으로 제시하세요. 수치와 성과를 명확히 포함하면 설득력이 높아집니다.';
                            case 'communication':
                              return '다양한 이해관계자와 효과적으로 소통하여 성과를 이끌어낸 경험을 강조하세요. 갈등 해결이나 설득 경험이 특히 효과적입니다.';
                            case 'creativity':
                              return '기존 방식을 개선하거나 새로운 아이디어를 제안하여 가치를 창출한 사례를 서술하세요. 창의적 사고 과정을 구체적으로 설명하면 좋습니다.';
                            case 'detail':
                              return '복잡한 상황에서 세부 사항까지 놓치지 않고 완벽하게 업무를 수행한 경험을 강조하세요. 오류 발견이나 품질 향상 사례가 효과적입니다.';
                            case 'organization':
                              return '복잡한 프로젝트나 일정을 효율적으로 관리하여 성공으로 이끈 경험을 서술하세요. 동시에 여러 작업을 관리한 사례가 유용합니다.';
                            case 'it_technical':
                              return '기술적 난제를 해결하거나 혁신적인 솔루션을 개발한 프로젝트 경험을 강조하세요. 지원 직무와 연관된 기술 스킬을 구체적으로 제시하면 좋습니다.';
                            case 'mfg_technical':
                              return '제품 개발이나 공정 개선에 기여한 경험을 상세히 서술하세요. 품질 향상이나 생산성 증대에 기여한 사례가 특히 효과적입니다.';
                            case 'global':
                              return '다문화 환경에서의 경험과 글로벌 비즈니스에 대한 이해를 강조하세요. 언어 능력과 함께 문화적 적응력을 보여주는 사례가 중요합니다.';
                            case 'flexibility':
                              return '예상치 못한 변화에 빠르게 적응하고 유연하게 대처한 경험을 서술하세요. 불확실한 환경에서 성과를 낸 사례가 특히 유용합니다.';
                            case 'trend':
                              return '시장 트렌드를 파악하고 이를 활용한 제안이나 프로젝트 경험을 강조하세요. 소비자 니즈 발견이나 트렌드 예측 사례가 효과적입니다.';
                            case 'profitability':
                              return '비용 절감이나 수익 증대에 기여한 경험을 구체적인 수치와 함께 제시하세요. 한정된 자원으로 효율적인 성과를 낸 사례가 설득력 있습니다.';
                            default:
                              return '관련 역량을 발휘한 구체적인 경험을 STAR 기법으로 서술하세요.';
                          }
                        })()}
                      </p>
                    </div>
                    
                    <div className="text-sm">
                      <h5 className="font-medium text-gray-700 mb-1">지원 동기(志望動機) 작성 포인트:</h5>
                      <p className="text-gray-600">
                        {(() => {
                          switch(compId) {
                            case 'logic':
                              return '해당 기업/업계에서 분석력과 논리적 사고가 중요한 이유를 언급하고, 본인의 이러한 강점이 어떻게 기여할 수 있는지 연결하세요. 데이터 기반 의사결정의 중요성을 강조하면 좋습니다.';
                            case 'communication':
                              return '지원 업계/기업에서 커뮤니케이션이 중요한 이유를 언급하고, 본인의 소통 능력이 어떻게 가치를 창출할 수 있는지 서술하세요. 대인관계와 팀워크의 중요성을 강조합니다.';
                            case 'creativity':
                              return '해당 업계/기업이 창의적 혁신을 추구한다는 점을 언급하고, 본인의 창의적 사고가 어떻게 기업 발전에 기여할 수 있는지 구체적으로 서술하세요.';
                            case 'detail':
                              return '지원 업계/기업에서 세부사항에 대한 주의가 중요한 이유를 언급하고, 본인의 꼼꼼함이 업무 품질 향상에 어떻게 기여할 수 있는지 구체적으로 서술하세요.';
                            case 'organization':
                              return '해당 기업/업계에서 체계적인 업무 관리가 중요한 이유를 언급하고, 본인의 조직력이 프로젝트 성공에 어떻게 기여할 수 있는지 서술하세요.';
                            case 'it_technical':
                              return '해당 기업의 기술적 도전과제나 비전을 언급하고, 본인의 IT 기술 전문성이 이러한 과제 해결에 어떻게 기여할 수 있는지 구체적으로 서술하세요.';
                            case 'mfg_technical':
                              return '지원 기업의 제품이나 생산 공정에 대한 이해를 보여주고, 본인의 기술적 전문성이 제품 혁신이나 품질 향상에 어떻게 기여할 수 있는지 서술하세요.';
                            case 'global':
                              return '기업의 글로벌 비즈니스 전략이나 국제적 환경을 언급하고, 본인의 언어 능력과 국제 감각이 글로벌 시장 확장에 어떻게 기여할 수 있는지 서술하세요.';
                            case 'flexibility':
                              return '빠르게 변화하는 업계 환경을 언급하고, 본인의 적응력과 융통성이 기업의 변화 대응과 혁신에 어떻게 도움이 될 수 있는지 구체적으로 서술하세요.';
                            case 'trend':
                              return '지원 업계/기업의 트렌드 중심적 특성을 언급하고, 본인의 트렌드 감각이 신규 사업 개발이나 마케팅에 어떻게 기여할 수 있는지 구체적으로 서술하세요.';
                            case 'profitability':
                              return '기업의 수익성 및 효율성 추구 방향을 언급하고, 본인의 수익 관리 역량이 비즈니스 성장과 최적화에 어떻게 기여할 수 있는지 구체적으로 서술하세요.';
                            default:
                              return '해당 업계와 기업에 관심을 갖게 된 계기, 해당 기업만의 고유한 강점에 끌린 점, 입사 후 기여하고 싶은 포부를 논리적으로 연결하세요.';
                          }
                        })()}
                      </p>
                    </div>
                    
                    <div className="text-sm">
                      <h5 className="font-medium text-gray-700 mb-1">작성 예시:</h5>
                      <p className="text-gray-600 p-2 bg-gray-50 rounded">
                        {(() => {
                          switch(compId) {
                            case 'logic':
                              return '「私は大学時代、データ分析サークルのリーダーとして複雑なマーケティングデータを分析し、売上20%増加に繋がる施策を導き出しました。この経験を通じて培った論理的思考力と問題解決能力を貴社の事業拡大に活かしたいと考えております。」';
                            case 'communication':
                              return '「異なる学部の学生10名からなるプロジェクトチームをまとめ、意見の対立を調整しながら大学祭の企画を成功に導きました。日本語と英語のバイリンガルとして、貴社のグローバルコミュニケーションの架け橋となりたいと考えております。」';
                            case 'creativity':
                              return '「インターンシップで参加した商品開発プロジェクトでは、従来の発想にとらわれない新しいアプローチを提案し、若年層の購買意欲を30%高めるアイデアが評価されました。貴社の革新的な商品開発にこの創造力を活かしたいと思います。」';
                            case 'detail':
                              return '「学生団体の会計担当として、年間予算200万円の管理を任され、詳細な支出分析により無駄を10%削減しました。ミスを見逃さない細部への注意力と正確性を貴社の品質管理業務に活かしたいと考えております。」';
                            case 'organization':
                              return '「複数のサークル活動と学業の両立のため、綿密なスケジュール管理とタスク整理の習慣を身につけました。50人規模のイベントを滞りなく運営できたのも、この組織力のおかげです。貴社のプロジェクト管理においてこの強みを発揮したいと思います。」';
                            case 'it_technical':
                              return '「研究室では機械学習を活用したユーザー行動予測システムを開発し、予測精度を15%向上させました。Pythonによるプログラミングとデータ分析のスキルを貴社のDX推進に役立てたいと考えております。」';
                            case 'mfg_technical':
                              return '「工学部の研究プロジェクトでは、製造工程の最適化に取り組み、生産効率を25%改善する提案をしました。CADを使った設計から試作品の評価まで一貫して担当した経験を貴社の製品開発に活かしたいと思います。」';
                            case 'global':
                              return '「1年間の留学経験とNPOでの国際交流活動を通じて、異文化への理解と適応力を養いました。JLPT N1と英語のTOEIC 850点のスキルを活かし、貴社のグローバルビジネス展開に貢献したいと考えております。」';
                            case 'flexibility':
                              return '「アルバイト先の突然の人員不足に対応するため、短期間で複数の業務を習得し、シフト変更にも柔軟に対応しました。このような環境変化への適応力を貴社の変革期における業務推進に活かしたいと思います。」';
                            case 'trend':
                              return '「学生起業家として、SNSの利用動向を分析し、新しいマーケティング手法を導入して月間ユーザー数を3倍に増やしました。常に市場の動向に敏感であることの重要性を学び、この感覚を貴社の新規事業開発に活かしたいと考えております。」';
                            case 'profitability':
                              return '「学園祭の出店では、原価計算から価格設定、在庫管理まで徹底的に利益を意識した運営を行い、前年比40%の利益増を達成しました。このコスト意識と収益性への鋭い視点を貴社のビジネス拡大に役立てたいと思います。」';
                            default:
                              return '「私のこれまでの経験と培ってきたスキルを貴社の業務に活かし、共に成長していきたいと考えております。御社の○○という理念に強く共感し、その実現に向けて貢献したいという思いから今回応募いたしました。」';
                          }
                        })()}
                      </p>
                    </div>
                  </div>
                </div>
              );
            });
          })()}
        </div>
      </div>
    </div>
  );
};

export default SummaryTab; 