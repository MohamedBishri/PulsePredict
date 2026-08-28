import React from 'react';

function WelcomeHeader({
    rtl,
    tab,
    t,
    model
}) {
    return (
        <section className="welcome">
            <div>
                <p>
                    {rtl
                        ? 'منصة تحليل مخاطر أمراض القلب'
                        : 'Machine Learning Risk Prediction Platform'}
                </p>

                <h1>
                    {tab === 'predict'
                        ? 'AI Cardiovascular Dashboard'
                        : tab === 'history'
                        ? t.history
                        : tab === 'model'
                        ? t.model
                        : t.admin}
                </h1>
            </div>

            
        </section>
    );
}

export default WelcomeHeader;