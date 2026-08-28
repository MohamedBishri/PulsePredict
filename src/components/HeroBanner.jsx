import React from 'react';

function HeroBanner({ rtl }) {
    return (
        <section className="heroBanner">
            <div className="heroContent">
                <span className="heroBadge">
                    {rtl
                        ? 'رعاية صحية مدعومة بالذكاء الاصطناعي'
                        : 'AI Powered Healthcare'}
                </span>

                <h1>
                    {rtl
                        ? 'تقييم مخاطر أمراض القلب'
                        : 'Heart Disease Risk Assessment'}
                </h1>

                <p>
                    {rtl
                        ? 'توقّع مخاطر القلب باستخدام تعلم الآلة، واحصل على نتائج قابلة للتفسير، وتعرّف على العوامل المؤثرة في كل نتيجة.'
                        : 'Predict cardiovascular risk using machine learning, receive explainable results, and understand the factors influencing every prediction.'}
                </p>

                <div className="heroStats">
                    <div>
                        <strong>96.8%</strong>
                        <span>
                            {rtl ? 'الدقة' : 'Accuracy'}
                        </span>
                    </div>

                    <div>
                        <strong>5</strong>
                        <span>
                            {rtl ? 'نماذج ذكاء اصطناعي' : 'AI Models'}
                        </span>
                    </div>

                    <div>
                        <strong>6000+</strong>
                        <span>
                            {rtl ? 'سجل صحي' : 'Patients'}
                        </span>
                    </div>

                    <div>
                        <strong>0.97</strong>
                        <span>AUC</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroBanner;