import React, { useState } from 'react';
import {
    History,
    ArrowLeft,
    ArrowRight
} from 'lucide-react';

function HistoryPage({ history, rtl = false }) {
    const [selectedRecord, setSelectedRecord] = useState(null);

    if (selectedRecord) {
        const probability = Math.round(
            selectedRecord.probability * 100
        );

        return (
            <section className="historyDetailPage">
                <div className="historyDetailTop">
                    <div>
                        <span className="pageLabel">
                            {rtl
                                ? 'تفاصيل التقييم'
                                : 'ASSESSMENT DETAILS'}
                        </span>

                        <h1>
                            {rtl
                                ? 'تفاصيل التقييم السابق'
                                : 'Previous Assessment'}
                        </h1>

                        <p>
                            {new Date(
                                selectedRecord.created_at
                            ).toLocaleString()}
                        </p>
                    </div>

                    <button
                        type="button"
                        className="outline"
                        onClick={() => setSelectedRecord(null)}
                    >
                        {rtl ? (
                            <ArrowRight size={18} />
                        ) : (
                            <ArrowLeft size={18} />
                        )}

                        {rtl
                            ? 'العودة للسجل'
                            : 'Back to History'}
                    </button>
                </div>

                <div className="historyDetailHero panel">
                    <div>
                        <span className="pageLabel">
                            {rtl
                                ? 'درجة الخطورة'
                                : 'RISK SCORE'}
                        </span>

                        <div className="historyRiskScore">
                            {probability}
                            <small>/100</small>
                        </div>

                        <p>
                            {rtl
                                ? 'احتمالية خطورة أمراض القلب'
                                : 'Cardiovascular risk probability'}
                        </p>
                    </div>

                    <div className="historyRiskMeta">
                        <span>
                            {rtl
                                ? 'مستوى الخطورة'
                                : 'Risk level'}
                        </span>

                        <strong
                            className={`pill ${selectedRecord.risk_level.toLowerCase()}`}
                        >
                            {selectedRecord.risk_level}
                        </strong>
                    </div>
                </div>

                <div className="historyDetailGrid">
                    <section className="panel historyDetailCard">
                        <h2>
                            {rtl
                                ? 'أهم العوامل المؤثرة'
                                : 'Top contributing factors'}
                        </h2>

                        {selectedRecord.factors?.length ? (
                            selectedRecord.factors.map(
                                (factor, index) => (
                                    <div
                                        className="historyFactor"
                                        key={`${factor.feature}-${index}`}
                                    >
                                        <span>
                                            {String(index + 1).padStart(2, '0')}
                                        </span>

                                        <div>
                                            <strong>
                                                {factor.feature}
                                            </strong>

                                            <small>
                                                {factor.direction}
                                            </small>
                                        </div>

                                        <b>
                                            {Math.round(
                                                Math.abs(factor.impact) * 100
                                            )}
                                        </b>
                                    </div>
                                )
                            )
                        ) : (
                            <p>
                                {rtl
                                    ? 'لا توجد عوامل متاحة لهذا التقييم.'
                                    : 'No contributing factors available.'}
                            </p>
                        )}
                    </section>

                    <section className="panel historyDetailCard">
                        <h2>
                            {rtl
                                ? 'التوصيات'
                                : 'Recommendations'}
                        </h2>

                        {selectedRecord.recommendations?.length ? (
                            selectedRecord.recommendations.map(
                                (recommendation, index) => (
                                    <div
                                        className="historyRecommendation"
                                        key={index}
                                    >
                                        <span>
                                            {String(index + 1).padStart(2, '0')}
                                        </span>

                                        <p>
                                            {recommendation}
                                        </p>
                                    </div>
                                )
                            )
                        ) : (
                            <p>
                                {rtl
                                    ? 'لا توجد توصيات متاحة لهذا التقييم.'
                                    : 'No recommendations available.'}
                            </p>
                        )}
                    </section>
                </div>
            </section>
        );
    }

    return (
        <section className="panel tablePanel">
            {history.length ? (
                <table>
                    <thead>
                        <tr>
                            <th>
                                {rtl ? 'التاريخ' : 'Date'}
                            </th>

                            <th>
                                {rtl ? 'الخطورة' : 'Risk'}
                            </th>

                            <th>
                                {rtl
                                    ? 'الاحتمالية'
                                    : 'Probability'}
                            </th>

                            <th>
                                {rtl
                                    ? 'أهم عامل'
                                    : 'Top factor'}
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {history.map((record) => (
                            <tr
                                key={record.id}
                                onClick={() =>
                                    setSelectedRecord(record)
                                }
                                style={{ cursor: 'pointer' }}
                            >
                                <td>
                                    {new Date(
                                        record.created_at
                                    ).toLocaleString()}
                                </td>

                                <td>
                                    <span
                                        className={`pill ${record.risk_level.toLowerCase()}`}
                                    >
                                        {record.risk_level}
                                    </span>
                                </td>

                                <td>
                                    {Math.round(
                                        record.probability * 100
                                    )}
                                    %
                                </td>

                                <td>
                                    {
                                        record.factors?.[0]
                                            ?.feature
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="empty small">
                    <History />

                    <h2>
                        {rtl
                            ? 'لا توجد تقييمات بعد'
                            : 'No predictions yet'}
                    </h2>
                </div>
            )}
        </section>
    );
}

export default HistoryPage;