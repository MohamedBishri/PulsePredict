import React from "react";
import { Activity } from "lucide-react";

function LandingPage({ onStart, lang }) {
    const rtl = lang === "ar";

    return (
        <div className="landingPage" dir={rtl ? "rtl" : "ltr"}>

            <div className="landingHero">

                <div className="landingText">

                    <div className="brand">
                        <span className="pulseIcon">
                            <Activity size={22} />
                        </span>
                        PulsePredict
                    </div>


                    <h1>
                        {rtl
                            ? "توقع مخاطر القلب بالذكاء الاصطناعي"
                            : <>
                                Predict Your Heart Risk
                                <br />
                                <span>With AI</span>
                            </>
                        }
                    </h1>


                    <p>
                        {rtl
                            ? "منصة ذكية لتحليل عوامل الخطورة القلبية باستخدام نماذج تعلم الآلة وتقديم نتائج واضحة قابلة للفهم."
                            : "A smart AI platform that analyzes cardiovascular risk factors using machine learning models and provides explainable insights."
                        }
                    </p>


                    <button
                        className="landingButton"
                        onClick={onStart}
                    >
                        {rtl ? "ابدأ التقييم" : "Start Assessment"}
                    </button>

                </div>


                <div className="heartVisual">

                    <div className="medicalCard">

                        <div className="medicalHeader">
                            <Activity size={24}/>
                            <span>PulsePredict AI</span>
                        </div>


                        <div className="scanCircle">

                            <div className="medicalLogo">
                                <Activity size={45}/>
                            </div>

                        </div>


                        <div className="analysisBox">

                            <span>
                                Cardiovascular Analysis
                            </span>

                            <strong>
                                AI Powered
                            </strong>

                        </div>

                    </div>

                </div>

            </div>


            <div className="features">

                <div className="featureCard">
                    <h3>
                        AI Prediction
                    </h3>
                    <p>
                        Machine learning based cardiovascular assessment.
                    </p>
                </div>


                <div className="featureCard">
                    <h3>
                        Risk Analysis
                    </h3>
                    <p>
                        Understand factors affecting your result.
                    </p>
                </div>


                <div className="featureCard">
                    <h3>
                        Smart Insights
                    </h3>
                    <p>
                        Personalized recommendations for prevention.
                    </p>
                </div>

            </div>

        </div>
    );
}

export default LandingPage;