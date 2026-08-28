export const featureTranslations = {
    Age: "العمر",
    Sex: "الجنس",
    "Chest pain pattern": "نوع ألم الصدر",
    "Resting blood pressure": "ضغط الدم أثناء الراحة",
    Cholesterol: "الكوليسترول",
    "Fasting blood sugar": "سكر الدم الصائم",
    "Maximum heart rate": "أقصى معدل لضربات القلب",
    "Exercise-induced angina": "الذبحة الصدرية الناتجة عن المجهود",
    "ST depression (oldpeak)": "انخفاض ST (Oldpeak)",
};

export const directionTranslations = {
    "increases risk": "يزيد من الخطورة",
    "reduces risk": "يقلل من الخطورة",
};

function TopFactors({ rtl, factors }) {
    if (!factors?.length) return null;

    const featureTranslations = {
        Age: "العمر",
        Sex: "الجنس",
        "Chest pain pattern": "نوع ألم الصدر",
        "Resting blood pressure": "ضغط الدم أثناء الراحة",
        Cholesterol: "الكوليسترول",
        "Fasting blood sugar": "سكر الدم الصائم",
        "Maximum heart rate": "أقصى معدل لضربات القلب",
        "Exercise-induced angina": "الذبحة الصدرية الناتجة عن المجهود",
        "ST depression (oldpeak)": "انخفاض ST (Oldpeak)",
    };

    const directionTranslations = {
        "increases risk": "يزيد من الخطورة",
        "reduces risk": "يقلل من الخطورة",
    };

    return (
        <>
            <h3>
                {rtl
                    ? "أهم العوامل المؤثرة"
                    : "Top contributing factors"}
            </h3>

            <div className="factors">
                {factors.map((factor, index) => (
                    <div
                        className="factor"
                        key={factor.feature}
                    >
                        <span>{index + 1}</span>

                        <div>
                            <b>
                                {rtl
                                    ? featureTranslations[factor.feature] ||
                                      factor.feature
                                    : factor.feature}
                            </b>

                            <small>
                                {rtl
                                    ? directionTranslations[factor.direction] ||
                                      factor.direction
                                    : factor.direction}
                            </small>
                        </div>

                        <em>
                            {Math.round(factor.impact * 100)}{" "}
                            {rtl ? "التأثير" : "Impact"}
                        </em>
                    </div>
                ))}
            </div>
        </>
    );
}

export default TopFactors;