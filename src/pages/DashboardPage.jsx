import React from 'react';
import {
    Activity,
    ArrowRight,
    ArrowUpRight,
    ArrowDownRight,
    Minus,
    Stethoscope,
    HeartPulse
} from 'lucide-react';

import { featureTranslations, directionTranslations } from '../components/TopFactors';

/*
 * Dashboard — presentation only.
 * Every value rendered here comes from data the backend already returns:
 *   result  -> POST /predictions   { id, probability, risk_level, factors[], recommendations[], created_at }
 *   history -> GET  /predictions   [ same shape, newest first ]
 * Nothing is invented, rewritten or recalculated.
 */

const riskText = {
    low: 'text-risk-low',
    moderate: 'text-risk-moderate',
    high: 'text-risk-high'
};

const riskPill = {
    low: 'border-risk-low/25 text-risk-low',
    moderate: 'border-risk-moderate/25 text-risk-moderate',
    high: 'border-risk-high/25 text-risk-high'
};

const riskDot = {
    low: 'bg-risk-low',
    moderate: 'bg-risk-moderate',
    high: 'bg-risk-high'
};

/* barely-there semantic tint behind the score region only */
const riskTint = {
    low: 'color-mix(in oklab, var(--color-risk-low) 4%, transparent)',
    moderate: 'color-mix(in oklab, var(--color-risk-moderate) 4%, transparent)',
    high: 'color-mix(in oklab, var(--color-risk-high) 4%, transparent)'
};

function toneOf(riskLevel) {
    return String(riskLevel || '').toLowerCase();
}

/* Existing frontend risk vocabulary — no new backend fields, no invented copy. */
const riskLabelAr = {
    low: 'منخفضة',
    moderate: 'متوسطة',
    high: 'مرتفعة'
};

function riskLabel(rtl, riskLevel) {
    if (!rtl) return riskLevel;
    return riskLabelAr[toneOf(riskLevel)] || riskLevel;
}

function formatDate(value, rtl, withTime = true) {
    if (!value) return null;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return null;
    return date.toLocaleString(rtl ? 'ar' : 'en', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        ...(withTime ? { hour: '2-digit', minute: '2-digit' } : {})
    });
}

function greeting(rtl, name) {
    const hour = new Date().getHours();
    if (rtl) {
        const part = hour < 12 ? 'صباح الخير' : hour < 18 ? 'مساء الخير' : 'مساء الخير';
        return name ? `${part}، ${name}` : part;
    }
    const part = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
    return name ? `${part}, ${name}` : part;
}

/* Minimal trend line built from history[].probability + created_at (UI only). */
function TrendChart({ points }) {
    if (!points || points.length < 2) return null;

    const width = 520;
    const height = 150;
    const padTop = 14;
    const padBottom = 26;
    const padX = 6;

    const values = points.map((point) => point.probability);
    const max = Math.max(...values, 0.05);
    const min = Math.min(...values, 0);
    const span = Math.max(max - min, 0.08);

    const coords = points.map((point, index) => {
        const x = padX + (index / (points.length - 1)) * (width - padX * 2);
        const y =
            padTop + (1 - (point.probability - min) / span) * (height - padTop - padBottom);
        return [x, y];
    });

    const line = coords
        .map(([x, y], index) => `${index === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`)
        .join(' ');
    const area = `${line} L${width - padX},${height - padBottom} L${padX},${height - padBottom} Z`;
    const last = coords[coords.length - 1];

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="h-[150px] w-full" role="presentation">
            <defs>
                <linearGradient id="pp-trend-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-brand)" stopOpacity="0.09" />
                    <stop offset="100%" stopColor="var(--color-brand)" stopOpacity="0" />
                </linearGradient>
            </defs>

            {[0, 0.5, 1].map((ratio) => {
                const y = padTop + ratio * (height - padTop - padBottom);
                return (
                    <line
                        key={ratio}
                        x1="0"
                        x2={width}
                        y1={y}
                        y2={y}
                        stroke="var(--color-hairline)"
                        strokeWidth="1"
                        strokeDasharray={ratio === 1 ? undefined : '2 5'}
                    />
                );
            })}

            <path d={area} fill="url(#pp-trend-fill)" />
            <path
                d={line}
                fill="none"
                stroke="var(--color-brand)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
            />
            <circle cx={last[0]} cy={last[1]} r="4.5" fill="var(--color-surface)" />
            <circle
                cx={last[0]}
                cy={last[1]}
                r="3"
                fill="var(--color-brand)"
                stroke="var(--color-surface)"
                strokeWidth="1.5"
            />

            <text x="0" y={height - 6} fontSize="10.5" fill="var(--color-canvas-muted)">
                {Math.round(min * 100)}%
            </text>
            <text
                x={width}
                y={height - 6}
                fontSize="10.5"
                textAnchor="end"
                fill="var(--color-canvas-muted)"
            >
                {Math.round(max * 100)}%
            </text>
        </svg>
    );
}


function DashboardPage({ rtl, user, result, history, onStartAssessment, onViewHistory }) {
    const records = Array.isArray(history) ? history : [];

    const latest = result || records[0] || null;

let previous = null;

if (latest) {
    if (result) {
        if (records[0]?.id === result.id) {
            previous = records[1] || null;
        } else {
            previous = records[0] || null;
        }
    } else {
        previous = records[1] || null;
    }
}

const hasComparison =
    latest &&
    previous &&
    typeof latest.probability === 'number' &&
    typeof previous.probability === 'number';

const delta = hasComparison
    ? Math.round(latest.probability * 100) -
      Math.round(previous.probability * 100)
    : null;

    const tone = toneOf(latest?.risk_level);

    if (!latest) {
        return (
            <section className="rounded-2xl border border-hairline bg-surface px-8 py-20 text-center">
                <div className="mx-auto grid max-w-md place-items-center gap-5">
                    <div className="grid size-12 place-items-center rounded-xl bg-brand-soft text-brand">
                        <HeartPulse className="size-5" strokeWidth={1.75} />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        {rtl ? 'لا توجد تقييمات بعد' : 'No assessments yet'}
                    </h1>
                    <p className="text-sm leading-relaxed text-canvas-muted">
                        {rtl
                            ? 'ابدأ تقييمك الأول لعرض مستوى الخطورة والعوامل المؤثرة وسجل التقييمات هنا.'
                            : 'Run your first assessment to see your risk score, contributing factors and assessment history here.'}
                    </p>
                    <button
                        type="button"
                        onClick={onStartAssessment}
                        className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground transition hover:brightness-105"
                    >
                        {rtl ? 'ابدأ التقييم' : 'Start assessment'}
                        <ArrowRight className={`size-4 ${rtl ? 'rotate-180' : ''}`} />
                    </button>
                </div>
            </section>
        );
    }

    const percent = Math.round(latest.probability * 100);
    const assessedAt = formatDate(latest.created_at, rtl);
    const recommendations = Array.isArray(latest.recommendations) ? latest.recommendations : [];
    const factors = Array.isArray(latest.factors) ? latest.factors : [];
    const trendPoints = records.slice(0, 12).reverse();
    const recent = records.slice(0, 5);
    const maxImpact = Math.max(...factors.map((f) => Math.abs(f.impact) || 0), 0.01);

    const DeltaIcon = delta === null || delta === 0 ? Minus : delta > 0 ? ArrowUpRight : ArrowDownRight;
    const deltaClass =
        delta === null || delta === 0
            ? 'text-canvas-muted'
            : delta > 0
              ? 'text-risk-high'
              : 'text-risk-low';

    return (
        <div className="flex flex-col gap-8 lg:gap-12">
            {/* ---------- HEADER ---------- */}
            <div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-canvas-muted">
                    {rtl ? 'أحدث تقييم' : 'Latest assessment'}
                </p>
                <h1 className="mt-2 text-[1.75rem] font-bold tracking-tight sm:text-[2rem]">
                    {greeting(rtl, user?.name)}
                </h1>
            </div>

            {/* ---------- ASSESSMENT ---------- */}
            <section className="relative overflow-hidden rounded-2xl border border-hairline bg-surface">

                <div className="relative grid gap-10 p-6 sm:p-9 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16 lg:p-12">
                    <div>
                        <div
                            className="-mx-3 -my-2 inline-flex flex-wrap items-end gap-x-5 gap-y-2 rounded-xl px-3 py-2"
                            style={{ background: riskTint[tone] }}
                        >
                            <div className="flex items-end gap-1.5" dir="ltr">
                                <span
                                    className={`ppNum ppTabular text-[4.5rem] font-bold leading-[0.82] tracking-[-0.045em] sm:text-[5.25rem] ${riskText[tone] || 'text-canvas-foreground'}`}
                                >
                                    {percent}
                                </span>
                                <span className="pb-2.5 text-[0.95rem] font-medium text-canvas-muted">
                                    /100
                                </span>
                            </div>

                            <span
                                className={`mb-2.5 inline-flex items-center gap-1.5 rounded-full border bg-surface/70 px-2.5 py-[3px] text-[0.64rem] font-semibold uppercase tracking-[0.12em] ${riskPill[tone] || 'border-hairline text-canvas-muted'}`}
                            >
                                <span
                                    className={`size-1.5 rounded-full ${riskDot[tone] || 'bg-canvas-muted'}`}
                                />
                                {riskLabel(rtl, latest.risk_level)}
                            </span>
                        </div>

                        <p className="mt-5 text-[0.95rem] leading-relaxed text-canvas-muted">
                            {rtl ? 'احتمالية خطورة أمراض القلب' : 'Cardiovascular risk probability'}
                        </p>


                        <dl className="mt-8 flex flex-wrap gap-x-12 gap-y-5 border-t border-hairline pt-6">
                            {assessedAt && (
                                <div>
                                    <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-canvas-muted">
                                        {rtl ? 'تاريخ التقييم' : 'Assessed'}
                                    </dt>
                                    <dd className="mt-1.5 text-sm font-medium">{assessedAt}</dd>
                                </div>
                            )}

                            {delta !== null && (
                                <div>
                                    <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-canvas-muted">
                                        {rtl ? 'مقارنة بالتقييم السابق' : 'Change from previous'}
                                    </dt>
                                    <dd className={`mt-1.5 flex items-center gap-1 text-sm font-semibold ${deltaClass}`}>
                                        <DeltaIcon className="size-4" strokeWidth={2} />
                                        <span className="ppTabular" dir="ltr">
                                            {delta > 0 ? '+' : ''}
                                            {delta}
                                        </span>
                                        <span>{rtl ? 'نقطة' : 'pts'}</span>
                                    </dd>
                                </div>
                            )}
                        </dl>
                    </div>

                    {/* trend */}
                    <div className="lg:border-s lg:border-hairline lg:ps-14">
                        {trendPoints.length >= 2 ? (
                            <>
                                <div className="flex items-baseline justify-between">
                                    <h2 className="text-[0.95rem] font-semibold">
                                        {rtl ? 'مسار الخطورة' : 'Risk trend'}
                                    </h2>
                                    <span className="text-xs text-canvas-muted">
                                        {trendPoints.length}
                                        {rtl ? ' تقييمات' : ' assessments'}
                                    </span>
                                </div>
                                <div className="mt-5" dir="ltr">
                                    <TrendChart points={trendPoints} rtl={rtl} />
                                </div>
                                <div
                                    className="mt-1 flex items-center justify-between text-[0.7rem] text-canvas-muted"
                                    dir="ltr"
                                >
                                    <span>{formatDate(trendPoints[0].created_at, rtl, false)}</span>
                                    <span>
                                        {formatDate(trendPoints[trendPoints.length - 1].created_at, rtl, false)}
                                    </span>
                                </div>

                            </>
                        ) : (
                            <p className="text-sm leading-relaxed text-canvas-muted">
                                {rtl
                                    ? 'يظهر مسار الخطورة بعد إجراء تقييمين أو أكثر.'
                                    : 'The risk trend appears once you have two or more assessments.'}
                            </p>
                        )}
                    </div>
                </div>
            </section>

            {/* ---------- FACTORS + RECOMMENDATIONS ---------- */}
            <div className="grid items-start gap-6 lg:grid-cols-2 lg:gap-8">
                <section className="rounded-2xl border border-hairline bg-surface p-6 sm:p-8">
                    <div className="flex items-center gap-2.5">
                        <Activity className="size-[17px] text-brand" strokeWidth={1.9} />
                        <h2 className="text-[1.05rem] font-semibold leading-relaxed">
                            {rtl ? 'أهم العوامل المؤثرة' : 'Top contributing factors'}
                        </h2>
                    </div>

                    {factors.length ? (
                        <ul className="mt-6">
                            {factors.map((factor, index) => {
                                const impact = Math.abs(factor.impact) || 0;
                                return (
                                    <li
                                        key={factor.feature}
                                        className="grid grid-cols-[1.75rem_minmax(0,1fr)_auto] items-center gap-4 border-b border-hairline py-5 last:border-0 last:pb-0"
                                    >
                                        <span className="ppNum ppTabular text-[0.7rem] font-semibold tracking-[0.06em] text-canvas-muted">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>

                                        <div className="min-w-0">
                                            <p className="truncate text-[0.95rem] font-semibold">
                                                {rtl
                                                    ? featureTranslations[factor.feature] || factor.feature
                                                    : factor.feature}
                                            </p>
                                            <p className="mt-1 text-xs text-canvas-muted">
                                                {rtl
                                                    ? directionTranslations[factor.direction] || factor.direction
                                                    : factor.direction}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <span
                                                className="hidden h-px w-24 bg-hairline sm:block"
                                                dir="ltr"
                                            >
                                                <span
                                                    className="block h-px bg-brand/70"
                                                    style={{
                                                        width: `${Math.max(8, (impact / maxImpact) * 100)}%`
                                                    }}
                                                />
                                            </span>
                                            <span className="ppTabular w-8 text-end text-sm font-semibold">
                                                {Math.round(impact * 100)}
                                            </span>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <p className="mt-6 text-sm text-canvas-muted">
                            {rtl ? 'لا توجد عوامل لهذا التقييم.' : 'No factors for this assessment.'}
                        </p>
                    )}
                </section>

                <section className="rounded-2xl border border-hairline bg-surface p-6 sm:p-8">
                    <div className="flex items-center gap-2.5">
                        <Stethoscope className="size-[17px] text-brand" strokeWidth={1.9} />
                        <h2 className="text-[1.05rem] font-semibold leading-relaxed">
                            {rtl ? 'التوصيات' : 'Recommendations'}
                        </h2>
                    </div>

                    {recommendations.length ? (
                        <ol className="mt-6">
                            {recommendations.map((text, index) => (
                                <li
                                    key={text}
                                    className="grid grid-cols-[1.75rem_minmax(0,1fr)] gap-4 border-b border-hairline py-5 first:pt-0 last:border-0 last:pb-0"
                                >
                                    <span className="ppNum ppTabular pt-[3px] text-[0.7rem] font-semibold tracking-[0.06em] text-brand">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                    <p
                                        className="text-[0.95rem] leading-[1.75] text-canvas-foreground/90"
                                        dir="auto"
                                    >
                                        {text}
                                    </p>
                                </li>
                            ))}
                        </ol>
                    ) : (
                        <p className="mt-6 text-sm text-canvas-muted">
                            {rtl ? 'لا توجد توصيات لهذا التقييم.' : 'No recommendations for this assessment.'}
                        </p>
                    )}
                </section>

            </div>

            {/* ---------- RECENT ASSESSMENTS ---------- */}
            <section className="rounded-2xl border border-hairline bg-surface p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <h2 className="text-[1.05rem] font-semibold">
                        {rtl ? 'أحدث التقييمات' : 'Recent assessments'}
                    </h2>
                    <button
                        type="button"
                        onClick={onViewHistory}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-canvas-muted transition hover:text-brand"
                    >
                        {rtl ? 'عرض السجل' : 'View history'}
                        <ArrowRight className={`size-3.5 ${rtl ? 'rotate-180' : ''}`} />
                    </button>
                </div>

                {recent.length ? (
                    <>
                        {/* desktop table */}
                        <table className="mt-6 hidden w-full border-collapse text-sm sm:table">
                            <thead>
                                <tr className="border-b border-hairline">
                                    {[
                                        rtl ? 'التاريخ' : 'Date',
                                        rtl ? 'أهم عامل' : 'Top factor',
                                        rtl ? 'الخطورة' : 'Risk',
                                        rtl ? 'الاحتمالية' : 'Probability'
                                    ].map((label, index) => (
                                        <th
                                            key={label}
                                            className={`pb-4 text-[0.64rem] font-bold uppercase tracking-[0.16em] text-canvas-foreground/70 ${
                                                index === 3 ? 'text-end' : 'text-start'
                                            }`}
                                        >
                                            {label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {recent.map((record) => {
                                    const recordTone = toneOf(record.risk_level);
                                    const topFactor = record.factors?.[0]?.feature;
                                    return (
                                        <tr
                                            key={record.id}
                                            className="border-b border-hairline transition-colors duration-150 last:border-0 hover:bg-canvas/70"
                                        >
                                            <td className="py-5 text-canvas-muted">
                                                {formatDate(record.created_at, rtl)}
                                            </td>
                                            <td className="py-5 font-medium">
                                                {topFactor
                                                    ? rtl
                                                        ? featureTranslations[topFactor] || topFactor
                                                        : topFactor
                                                    : '—'}
                                            </td>
                                            <td className="py-5">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-[2px] text-[0.62rem] font-semibold uppercase tracking-[0.1em] ${riskPill[recordTone] || 'border-hairline text-canvas-muted'}`}
                                                >
                                                    <span
                                                        className={`size-1.5 rounded-full ${riskDot[recordTone] || 'bg-canvas-muted'}`}
                                                    />
                                                    {riskLabel(rtl, record.risk_level)}
                                                </span>
                                            </td>
                                            <td className="ppNum ppTabular py-5 text-end text-[0.95rem] font-semibold">
                                                {Math.round(record.probability * 100)}%
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        {/* mobile cards */}
                        <ul className="mt-5 flex flex-col gap-3 sm:hidden">
                            {recent.map((record) => {
                                const recordTone = toneOf(record.risk_level);
                                const topFactor = record.factors?.[0]?.feature;
                                return (
                                    <li
                                        key={record.id}
                                        className="rounded-xl border border-hairline px-4 py-3.5"
                                    >
                                        <div className="flex items-center justify-between gap-3">
                                            <span className="text-xs text-canvas-muted">
                                                {formatDate(record.created_at, rtl)}
                                            </span>
                                            <span className="ppNum ppTabular text-[1.05rem] font-bold">
                                                {Math.round(record.probability * 100)}%
                                            </span>
                                        </div>
                                        <div className="mt-2.5 flex items-center justify-between gap-3">
                                            <p className="min-w-0 truncate text-sm font-medium">
                                                {topFactor
                                                    ? rtl
                                                        ? featureTranslations[topFactor] || topFactor
                                                        : topFactor
                                                    : rtl
                                                      ? 'تقييم'
                                                      : 'Assessment'}
                                            </p>
                                            <span
                                                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2 py-[2px] text-[0.6rem] font-semibold uppercase tracking-[0.1em] ${riskPill[recordTone] || 'border-hairline text-canvas-muted'}`}
                                            >
                                                <span
                                                    className={`size-1.5 rounded-full ${riskDot[recordTone] || 'bg-canvas-muted'}`}
                                                />
                                                {riskLabel(rtl, record.risk_level)}
                                            </span>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>

                    </>
                ) : (
                    <p className="mt-5 text-sm text-canvas-muted">
                        {rtl ? 'لا توجد تقييمات محفوظة بعد.' : 'No saved assessments yet.'}
                    </p>
                )}
            </section>

            <p className="text-xs text-canvas-muted">
                {rtl
                    ? 'نتيجة توعوية قابلة للتفسير، وليست تشخيصًا طبيًا.'
                    : 'Explainable educational screening, not a medical diagnosis.'}
            </p>
        </div>
    );
}

export default DashboardPage;
