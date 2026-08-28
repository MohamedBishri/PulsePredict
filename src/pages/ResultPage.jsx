import React from 'react';
import {
    ArrowLeft,
    ArrowRight
} from 'lucide-react';

import ResultCard from '../components/ResultCard';

const factorTranslations = {
    "Exercise-induced angina": "الذبحة الصدرية الناتجة عن المجهود",
    "ST depression (oldpeak)": "انخفاض ST (Oldpeak)",
    "Resting blood pressure": "ضغط الدم أثناء الراحة",
    "Fasting blood sugar": "سكر الدم أثناء الصيام",
    "Age": "العمر",
    "Cholesterol": "الكوليسترول",
    "Maximum heart rate": "أقصى معدل لضربات القلب",
    "Chest pain pattern": "نوع ألم الصدر",
    "Sex": "الجنس"
};

function ResultPage({
    rtl,
    result,
    Gauge,
    onBack
}) {
    if (!result) return null;

    return (
        <section className="resultPage">
            <div className="resultHeader">
                <div>
                    <span className="pageLabel">
                        {rtl
                            ? 'الخطوة الثانية'
                            : 'STEP 2'}
                    </span>

                    <h1>
                        {rtl
                            ? 'نتيجة التقييم'
                            : 'Assessment Result'}
                    </h1>

                    <p>
                        {rtl
                            ? 'تم تحليل البيانات بنجاح.'
                            : 'Your health data has been analyzed successfully.'}
                    </p>
                </div>

                <div className="resultActions">
    <button
        className="outline"
        type="button"
        onClick={() => window.print()}
    >
        {rtl ? 'طباعة التقرير' : 'Print Report'}
    </button>

    <button
        className="outline"
        type="button"
        onClick={onBack}
    >
        {rtl
            ? <ArrowRight />
            : <ArrowLeft />}

        {rtl
            ? 'العودة للتقييم'
            : 'Back to Assessment'}
    </button>
</div>
            </div>

            <ResultCard
                rtl={rtl}
                result={result}
                Gauge={Gauge}
            />
        </section>
    );
}


export default ResultPage;