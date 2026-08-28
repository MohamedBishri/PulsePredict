import React from 'react';
import { BrainCircuit } from 'lucide-react';

function HealthForm({
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
        <form
            className="panel formPanel"
            onSubmit={submit}
        >
            <div className="panelHead">
                <div>
                    <div>
    <span>01</span>

    <h2>
        {rtl
            ? 'الملف الصحي'
            : 'Health profile'}
    </h2>
</div>
                </div>

                <button
                    type="button"
                    className="outline demoButton"
                    onClick={demo}
                >
                    {rtl
                        ? 'بيانات تجريبية'
                        : 'Use demo data'}
                </button>
            </div>

            <div className="fields">
                {fields.map(
                    ([
                        key,
                        englishLabel,
                        arabicLabel,
                        type,
                        defaultValue,
                        min,
                        max
                    ]) => (
                        <label
                            className="healthField"
                            key={key}
                        >
                            <span>
                                {rtl
                                    ? arabicLabel
                                    : englishLabel}
                            </span>

                            <input
                                type={type}
                                min={min}
                                max={max}
                                step={
                                    key === 'oldpeak'
                                        ? '0.1'
                                        : '1'
                                }
                                value={values[key]}
                                onChange={(event) =>
                                    setValues({
                                        ...values,
                                        [key]:
                                            event.target.value
                                    })
                                }
                            />

                            <small>
                                {rtl
                                    ? `من ${min} إلى ${max}`
                                    : `Range: ${min}–${max}`}
                            </small>
                        </label>
                    )
                )}
            </div>

            {error && (
                <p className="error">
                    {error}
                </p>
            )}

            <button
                className="primary full assessmentSubmit"
                disabled={loading}
                type="submit"
            >
                <span>
                    {loading
                        ? rtl
                            ? 'جاري تحليل البيانات...'
                            : 'Analyzing your data...'
                        : rtl
                          ? 'احسب مستوى الخطر'
                          : 'Calculate Risk'}
                </span>

                <BrainCircuit />
            </button>
        </form>
    );
}

export default HealthForm;