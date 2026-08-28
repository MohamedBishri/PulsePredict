import React from 'react';
import {
    Download,
    HeartPulse,
    Stethoscope
} from 'lucide-react';
import TopFactors from './TopFactors';

function ResultCard({
    rtl,
    result,
    Gauge
}) {
    if (!result) {
        return (
            <section className="panel resultPanel">
                <div className="empty">
                    <div className="pulse">
                        <HeartPulse />
                    </div>

                    <h2>
                        {rtl
                            ? 'جاهز للتحليل'
                            : 'Ready for Analysis'}
                    </h2>

                    <p>
                        {rtl
                            ? 'أكمل النموذج وسيقوم الذكاء الاصطناعي بتحليل البيانات وإظهار مستوى الخطورة مع أهم العوامل المؤثرة والتوصيات.'
                            : 'Complete the assessment and our AI will predict the risk level, explain the contributing factors, and generate personalized recommendations.'}
                    </p>

                    <div className="resultSteps">
                        <div>
                            <strong>01</strong>
                            <span>
                                {rtl
                                    ? 'أدخل البيانات'
                                    : 'Fill Health Data'}
                            </span>
                        </div>

                        <div>
                            <strong>02</strong>
                            <span>
                                {rtl
                                    ? 'تحليل الذكاء الاصطناعي'
                                    : 'AI Analysis'}
                            </span>
                        </div>

                        <div>
                            <strong>03</strong>
                            <span>
                                {rtl
                                    ? 'استلام التقرير'
                                    : 'Receive Report'}
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    const riskClass = String(
        result.risk_level || ''
    ).toLowerCase();

    return (
        <section className="panel resultPanel">
            <div className="resultTop">
                <div>
                    <p>AI RISK ESTIMATE</p>

                    <h2>
                        {rtl
                            ? 'نتيجة قابلة للتفسير'
                            : 'Explainable result'}
                    </h2>
                </div>

                <button
                    className="outline"
                    type="button"
                    onClick={() =>
                        window.print()
                    }
                >
                    <Download />

                    {rtl
                        ? 'التقرير'
                        : 'Report'}
                </button>
            </div>

            <div className="resultHero">
                <Gauge
                    value={result.probability}
                    level={result.risk_level}
                />

                <div className="riskSummary">
                    <span
                        className={`riskBadge ${riskClass}`}
                    >
                        {result.risk_level}
                    </span>

                    <h2>
                        {Math.round(
                            result.probability * 100
                        )}
                        %
                    </h2>

                    <p>
                        {rtl
                            ? 'احتمالية الخطورة'
                            : 'Risk Probability'}
                    </p>
                </div>
            </div>

            <TopFactors
    rtl={rtl}
    factors={result.factors}
/>

            <div className="recommend">
                <Stethoscope />

                <div>
                    <b>
                        {rtl
                            ? 'الخطوة التالية'
                            : 'Recommended next step'}
                    </b>

                    <p>
                        {
                            result
                                .recommendations?.[0]
                        }
                    </p>
                </div>
            </div>
        </section>
    );
}

export default ResultCard;