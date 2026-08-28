import React from 'react';
import {
    BrainCircuit,
    CheckCircle2,
    ShieldCheck
} from 'lucide-react';

import HealthForm from '../components/HealthForm';

function AssessmentPage({
    rtl,
    fields,
    values,
    setValues,
    submit,
    demo,
    loading,
    error
}) {
    return (
        <section className="assessmentPage">
            <div className="assessmentHeader">
                <div>
                    <span className="pageLabel">
                        {rtl ? 'الخطوة الأولى' : 'STEP 1'}
                    </span>

                    <h1>
                        {rtl
                            ? 'المعلومات الصحية'
                            : 'Health Information'}
                    </h1>

                    <p>
                        {rtl
                            ? 'أدخل بياناتك الصحية للحصول على تقييم لمستوى مخاطر القلب.'
                            : 'Enter your health information to receive an AI-powered heart-risk assessment.'}
                    </p>
                </div>
            </div>

            <div className="assessmentLayout">
                <HealthForm
                    rtl={rtl}
                    fields={fields}
                    values={values}
                    setValues={setValues}
                    submit={submit}
                    demo={demo}
                    loading={loading}
                    error={error}
                />

                <aside className="panel assessmentTips">
    <div className="tipsTitle">
        <ShieldCheck />

        <div>
            <h3>
                {rtl ? 'نصائح التقييم' : 'Assessment Tips'}
            </h3>

            <p>
                {rtl
                    ? 'اتبع هذه الإرشادات للحصول على نتيجة أكثر دقة.'
                    : 'Follow these recommendations for a more accurate assessment.'}
            </p>
        </div>
    </div>

    <div className="tipItem">
        <CheckCircle2 />
        <span>
            {rtl
                ? 'استخدم أحدث معلوماتك الصحية.'
                : 'Use your latest and most accurate health information.'}
        </span>
    </div>

    <div className="tipItem">
        <CheckCircle2 />
        <span>
            {rtl
                ? 'أكمل جميع الحقول المطلوبة.'
                : 'Complete all required health fields.'}
        </span>
    </div>

    <div className="tipItem">
        <CheckCircle2 />
        <span>
            {rtl
                ? 'هذه النتيجة تقديرية وليست تشخيصًا طبيًا.'
                : 'This result is an AI prediction and not a medical diagnosis.'}
        </span>
    </div>

    <div className="privacyCard">
        <ShieldCheck />

        <div>
            <b>
                {rtl
                    ? 'خصوصيتك تهمنا'
                    : 'Your Privacy Matters'}
            </b>

            <p>
                {rtl
                    ? 'يتم تشفير بياناتك واستخدامها فقط لإجراء التقييم، ولا تتم مشاركتها مع أي طرف.'
                    : 'Your information is encrypted, kept confidential, and used only to generate your assessment. We never share your personal data.'}
            </p>
        </div>
    </div>
</aside>
            </div>
        </section>
    );
}

export default AssessmentPage;