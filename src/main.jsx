import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import AssessmentPage from './pages/AssessmentPage';
import Gauge from './components/Gauge';
import ResultPage from './pages/ResultPage';
import HeroBanner from './components/HeroBanner';
import WelcomeHeader from './components/WelcomeHeader';
import Sidebar from './components/Sidebar';
import HistoryPage from './pages/HistoryPage';
import AdminPage from './pages/AdminPage';
import ProfilePage from './pages/ProfilePage';
import DashboardPage from './pages/DashboardPage';
import DashboardShell from './components/DashboardShell';
import ForgotPasswordPage from "./ForgotPasswordPage";
import ResetPasswordPage from "./ResetPasswordPage";
import LandingPage from "./pages/LandingPage";
import {
    Activity,
    ArrowRight,
    BrainCircuit,
    Check,
    CheckCircle2,
    Clipboard,
    Download,
    HeartPulse,
    History,
    Languages,
    LogOut,
    RefreshCw,
    Send,
    ShieldCheck,
    Sparkles,
    Stethoscope,
    Trash2,
    User,
    UserPlus
} from 'lucide-react';
import './styles.css';
import './ai-chat.css';

const API = 'http://127.0.0.1:8000';

const copy = {
    en: {
        tag: 'AI-POWERED PREVENTIVE HEALTH',
        title: 'Know the risk. Understand the reason. Act earlier.',
        sub: 'PulsePredict turns health indicators into an explainable heart-risk screening result in under a minute.',
        cta: 'Start assessment',
        login: 'Sign in',
        create: 'Create account',
        dashboard: 'Dashboard',
        predict: 'Assessment',
        history: 'History',
        admin: 'Admin',
        logout: 'Logout'
    },

    ar: {
        tag: 'صحة وقائية مدعومة بالذكاء الاصطناعي',
        title: 'اعرف مستوى الخطر، افهم السبب، واتخذ خطوة مبكرة.',
        sub: 'يحوّل PulsePredict المؤشرات الصحية إلى تقييم واضح ومفسّر لمخاطر القلب خلال أقل من دقيقة.',
        cta: 'ابدأ التقييم',
        login: 'تسجيل الدخول',
        create: 'إنشاء حساب',
        dashboard: 'لوحة المعلومات',
        predict: 'التقييم',
        history: 'السجل',
        admin: 'الإدارة',
        logout: 'خروج'
    }
};

const fields = [
    [
        'age',
        'Age',
        'العمر',
        'number',
        45,
        18,
        100
    ],

    [
        'sex',
        'Sex (0 female, 1 male)',
        'الجنس (0 أنثى، 1 ذكر)',
        'number',
        1,
        0,
        1
    ],

    [
        'chest_pain_type',
        'Chest pain type (0–3)',
        'نوع ألم الصدر (0–3)',
        'number',
        1,
        0,
        3
    ],

    [
        'resting_bp',
        'Resting blood pressure',
        'ضغط الدم أثناء الراحة',
        'number',
        125,
        70,
        240
    ],

    [
        'cholesterol',
        'Cholesterol',
        'الكوليسترول',
        'number',
        210,
        80,
        700
    ],

    [
        'fasting_blood_sugar',
        'Fasting sugar >120 (0/1)',
        'سكر صائم أعلى من 120 (0/1)',
        'number',
        0,
        0,
        1
    ],

    [
        'max_heart_rate',
        'Maximum heart rate',
        'أقصى معدل نبض',
        'number',
        160,
        50,
        230
    ],

    [
        'exercise_angina',
        'Exercise angina (0/1)',
        'ذبحة مع الجهد (0/1)',
        'number',
        0,
        0,
        1
    ],

    [
        'oldpeak',
        'ST depression / oldpeak',
        'انخفاض ST / Oldpeak',
        'number',
        0.8,
        0,
        8
    ]
];

const suggestions = {
    ar: [
        'كيف أحافظ على صحة القلب؟',
        'ما الأطعمة المفيدة للقلب؟',
        'كيف أخفض ضغط الدم؟',
        'ما هو الكوليسترول؟'
    ],

    en: [
        'How can I protect my heart health?',
        'What foods are good for the heart?',
        'How can I lower blood pressure?',
        'What is cholesterol?'
    ]
};
async function request(path, opts = {}, token) {
    return fetch(API + path, {
        ...opts,

        headers: {
            'Content-Type': 'application/json',

            ...(token
                ? {
                    Authorization: `Bearer ${token}`
                }
                : {}),

            ...(opts.headers || {})
        }
    }).then(async (response) => {
        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            throw new Error(data.detail || 'Request failed');
        }

        return data;
    });
}
function Auth({ onAuth, lang, setLang }) {
    const t = copy[lang];
    const rtl = lang === 'ar';

    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [mode, setMode] = useState('login');

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [error, setError] = useState('');

    const params = new URLSearchParams(window.location.search);
const resetToken = params.get("reset_token");

if (resetToken) {
    return (
        <ResetPasswordPage
            request={request}
            token={resetToken}
            onSuccess={() => {
                window.history.replaceState(
                    {},
                    "",
                    window.location.pathname
                );
                window.location.reload();
            }}
        />
    );
}

    if (showForgotPassword) {
        return (
            <ForgotPasswordPage
                request={request}
            />
        );
    }

    async function submit(event) {
        event.preventDefault();

        setError('');

        try {
            const data = await request(
                mode === 'login'
                    ? '/auth/login'
                    : '/auth/register',

                {
                    method: 'POST',
                    body: JSON.stringify(form)
                }
            );

            localStorage.setItem(
                'token',
                data.access_token
            );

            onAuth(data.access_token);
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <main
            className="auth"
            dir={rtl ? 'rtl' : 'ltr'}
        >
            <section className="hero">
                <div className="topline">
                    <Activity />

                    <button
                        className="ghost"
                        type="button"
                        onClick={() =>
                            setLang(rtl ? 'en' : 'ar')
                        }
                    >
                        <Languages />

                        {rtl ? 'English' : 'العربية'}
                    </button>
                </div>

                <div className="badge">
                    <Sparkles />

                    {t.tag}
                </div>

                <h1>
                    {t.title}
                </h1>

                <p>
                    {t.sub}
                </p>

                <div className="heroPoints">
                    <span>
                        <CheckCircle2 />
                        Explainable results
                    </span>

                    <span>
                        <CheckCircle2 />
                        Secure accounts
                    </span>

                    <span>
                        <CheckCircle2 />
                        Actionable insights
                    </span>
                </div>

                <div className="heroVisual">
                    <div className="orb">
                        <HeartPulse />

                        <b>
                            87%
                        </b>

                        <small>
                            Explainability score
                        </small>
                    </div>

                    <div className="miniCard">
                        <BrainCircuit />

                        <div>
                            <b>
                                3 models compared
                            </b>

                            <small>
                                Best model selected automatically
                            </small>
                        </div>
                    </div>
                </div>
            </section>

            <form
                className="authCard"
                onSubmit={submit}
            >
                <div className="authIcon">
                    <UserPlus />
                </div>

                <h2>
                    {mode === 'login'
                        ? t.login
                        : t.create}
                </h2>

                <p>
                    {rtl
                        ? 'ادخل إلى لوحة التقييم الخاصة بك'
                        : 'Access your private health intelligence dashboard.'}
                </p>

                {mode === 'register' && (
                    <input
                        required
                        placeholder={
                            rtl
                                ? 'الاسم الكامل'
                                : 'Full name'
                        }
                        value={form.name}
                        onChange={(event) =>
                            setForm({
                                ...form,
                                name: event.target.value
                            })
                        }
                    />
                )}

                <input
                    required
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(event) =>
                        setForm({
                            ...form,
                            email: event.target.value
                        })
                    }
                />

                <input
                    required
                    type="password"
                    minLength="8"
                    placeholder={
                        rtl
                            ? 'كلمة المرور (8 أحرف فأكثر)'
                            : 'Password (8+ characters)'
                    }
                    value={form.password}
                    onChange={(event) =>
                        setForm({
                            ...form,
                            password: event.target.value
                        })
                    }
                />

                {error && (
                    <p className="error">
                        {error}
                    </p>
                )}

                <button
                    className="primary"
                    type="submit"
                >
                    {mode === 'login'
                        ? t.login
                        : t.create}

                    <ArrowRight />
                </button>
                {mode === 'login' && (
    <button
        type="button"
        className="textBtn"
        onClick={() => setShowForgotPassword(true)}
    >
        {rtl ? 'نسيت كلمة المرور؟' : 'Forgot Password?'}
    </button>
)}

                <button
                    type="button"
                    className="textBtn"
                    onClick={() =>
                        setMode(
                            mode === 'login'
                                ? 'register'
                                : 'login'
                        )
                    }
                >
                    {mode === 'login'
                        ? rtl
                            ? 'ليس لديك حساب؟ أنشئ حسابًا'
                            : 'New here? Create an account'
                        : rtl
                            ? 'لديك حساب؟ سجل الدخول'
                            : 'Already registered? Sign in'}
                </button>

                <div className="safe">
                    <ShieldCheck />

                    {rtl
                        ? 'للاستخدام التوعوي وليست أداة تشخيص طبي'
                        : 'Educational screening, not a medical diagnosis'}
                </div>
            </form>
        </main>
    );
}


function FormattedMessage({ text }) {
    const lines = text.split('\n');

    return (
        <div className="formattedMessage">
            {lines.map((line, index) => {
                const clean = line
                    .replace(/\*\*/g, '')
                    .trim();

                if (!clean) {
                    return <br key={index} />;
                }

                if (
                    clean.startsWith('* ') ||
                    clean.startsWith('- ') ||
                    clean.startsWith('• ')
                ) {
                    return (
                        <div
                            className="messageBullet"
                            key={index}
                        >
                            • {clean.slice(2)}
                        </div>
                    );
                }

                if (
                    line.includes('**') &&
                    clean.length < 90
                ) {
                    return (
                        <strong
                            className="messageHeading"
                            key={index}
                        >
                            {clean}
                        </strong>
                    );
                }

                return (
                    <p key={index}>
                        {clean}
                    </p>
                );
            })}
        </div>
    );
}

function AIChat({ rtl, token }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState(null);

    const endRef = useRef(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({
            behavior: 'smooth'
        });
    }, [messages, loading]);

    async function sendMessage(text = input) {
        const question = text.trim();

        if (!question || loading) {
            return;
        }

        setMessages((current) => [
            ...current,

            {
                role: 'user',
                text: question,
                time: new Date().toLocaleTimeString(
                    [],
                    {
                        hour: '2-digit',
                        minute: '2-digit'
                    }
                )
            }
        ]);

        setInput('');
        setLoading(true);

        try {
           const data = await request(
    `/ai-chat?message=${encodeURIComponent(question)}`,
    {
        method: 'POST'
    },
    token
);

            setMessages((current) => [
                ...current,

                {
                    role: 'assistant',

                    text:
                        data.reply ||
                        (
                            rtl
                                ? 'لم يصل رد من المساعد.'
                                : 'No response received.'
                        ),

                    time: new Date().toLocaleTimeString(
                        [],
                        {
                            hour: '2-digit',
                            minute: '2-digit'
                        }
                    )
                }
            ]);
        } catch {
            setMessages((current) => [
                ...current,

                {
                    role: 'assistant',

                    text: rtl
                        ? 'تعذر الاتصال بالمساعد الذكي. تأكد أن الـ Backend يعمل ثم حاول مرة أخرى.'
                        : 'Failed to contact the AI assistant. Make sure the backend is running and try again.',

                    time: new Date().toLocaleTimeString(
                        [],
                        {
                            hour: '2-digit',
                            minute: '2-digit'
                        }
                    )
                }
            ]);
        } finally {
            setLoading(false);
        }
    }

    async function copyMessage(text, index) {
        await navigator.clipboard.writeText(text);

        setCopiedIndex(index);

        setTimeout(() => {
            setCopiedIndex(null);
        }, 1500);
    }

    function regenerate() {
        const lastUserMessage = [
            ...messages
        ]
            .reverse()
            .find(
                (message) =>
                    message.role === 'user'
            );

        if (!lastUserMessage) {
            return;
        }

        sendMessage(lastUserMessage.text);
    }

    return (
        <section className="panel aiChat">
            <div className="aiChatHeader">
                <div className="aiTitle">
                    <div className="aiAvatar">
                        <BrainCircuit />
                    </div>

                    <div>
                        <h2>
                            {rtl
                                ? 'مساعد PulsePredict الذكي'
                                : 'PulsePredict AI Assistant'}
                        </h2>

                        <span>
                            <i />

                            {rtl
                                ? 'متصل الآن'
                                : 'Online now'}
                        </span>
                    </div>
                </div>

                <button
                    className="newChatBtn"
                    type="button"
                    onClick={() =>
                        setMessages([])
                    }
                >
                    <Trash2 />

                    {rtl
                        ? 'محادثة جديدة'
                        : 'New chat'}
                </button>
            </div>

            <div className="chatWindow">
                {messages.length === 0 && (
                    <div className="chatWelcome">
                        <div className="welcomeRobot">
                            <HeartPulse />
                        </div>

                        <h3>
                            {rtl
                                ? 'مرحبًا! كيف أستطيع مساعدتك؟'
                                : 'Hello! How can I help you?'}
                        </h3>

                        <p>
                            {rtl
                                ? 'اسأل سؤالًا صحيًا عامًا، وسيقدم لك المساعد إرشادات توعوية مختصرة.'
                                : 'Ask a general health question and receive brief educational guidance.'}
                        </p>

                        <div className="suggestionGrid">
                            {suggestions[
                                rtl ? 'ar' : 'en'
                            ].map((item) => (
                                <button
                                    key={item}
                                    type="button"
                                    onClick={() =>
                                        sendMessage(item)
                                    }
                                >
                                    <Sparkles />

                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {messages.map(
                    (message, index) => (
                        <div
                            className={`chatRow ${message.role}`}
                            key={`${message.time}-${index}`}
                        >
                            <div className="messageAvatar">
                                {message.role ===
                                'assistant'
                                    ? <BrainCircuit />
                                    : <User />}
                            </div>

                            <div className="messageBlock">
                                <div className="messageMeta">
                                    <b>
                                        {message.role ===
                                        'assistant'
                                            ? 'PulsePredict AI'
                                            : rtl
                                                ? 'أنت'
                                                : 'You'}
                                    </b>

                                    <span>
                                        {message.time}
                                    </span>
                                </div>

                                <div className="messageBubble">
                                    {message.role ===
                                    'assistant'
                                        ? (
                                            <FormattedMessage
                                                text={
                                                    message.text
                                                }
                                            />
                                        )
                                        : (
                                            <p>
                                                {message.text}
                                            </p>
                                        )}
                                </div>

                                {message.role ===
                                    'assistant' && (
                                    <div className="messageActions">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                copyMessage(
                                                    message.text,
                                                    index
                                                )
                                            }
                                        >
                                            {copiedIndex ===
                                            index
                                                ? <Check />
                                                : <Clipboard />}

                                            {copiedIndex ===
                                            index
                                                ? rtl
                                                    ? 'تم النسخ'
                                                    : 'Copied'
                                                : rtl
                                                    ? 'نسخ'
                                                    : 'Copy'}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                )}

                {loading && (
                    <div className="chatRow assistant">
                        <div className="messageAvatar">
                            <BrainCircuit />
                        </div>

                        <div className="messageBlock">
                            <div className="messageMeta">
                                <b>
                                    PulsePredict AI
                                </b>
                            </div>

                            <div className="messageBubble typingBubble">
                                <span />
                                <span />
                                <span />
                            </div>
                        </div>
                    </div>
                )}

                <div ref={endRef} />
            </div>

            <div className="chatComposer">
                <textarea
                    rows="1"
                    value={input}
                    placeholder={
                        rtl
                            ? 'اكتب رسالتك هنا...'
                            : 'Type your message...'
                    }
                    onChange={(event) =>
                        setInput(
                            event.target.value
                        )
                    }
                    onKeyDown={(event) => {
                        if (
                            event.key === 'Enter' &&
                            !event.shiftKey
                        ) {
                            event.preventDefault();
                            sendMessage();
                        }
                    }}
                />

                <button
                    className="sendBtn"
                    type="button"
                    onClick={() =>
                        sendMessage()
                    }
                    disabled={
                        !input.trim() ||
                        loading
                    }
                >
                    <Send />
                </button>
            </div>

            <div className="chatFooter">
                <div className="safe">
                    <ShieldCheck />

                    {rtl
                        ? 'للتوعية فقط، ولا يقدم تشخيصًا طبيًا.'
                        : 'Educational guidance only, not a medical diagnosis.'}
                </div>

                <button
                    className="regenerateBtn"
                    type="button"
                    onClick={regenerate}
                    disabled={
                        loading ||
                        !messages.some(
                            (message) =>
                                message.role ===
                                'user'
                        )
                    }
                >
                    <RefreshCw />

                    {rtl
                        ? 'إعادة الرد'
                        : 'Regenerate'}
                </button>
            </div>
        </section>
    );
}
function App() {
    const [token, setToken] = useState(
        localStorage.getItem('token')
    );

    const [user, setUser] = useState(null);
    const [tab, setTab] = useState('dashboard');
    const [showLanding, setShowLanding] = useState(true);
    const [assessmentStep, setAssessmentStep] =
    useState('assessment');

    const [lang, setLang] = useState(
        localStorage.getItem('lang') || 'en'
    );

    const [values, setValues] = useState(
        Object.fromEntries(
            fields.map((field) => [
                field[0],
                field[4]
            ])
        )
    );

    const [result, setResult] = useState(null);
    const [history, setHistory] = useState([]);
    const [stats, setStats] = useState(null);
    const [model, setModel] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const t = copy[lang];
    const rtl = lang === 'ar';

    useEffect(() => {
        localStorage.setItem(
            'lang',
            lang
        );
    }, [lang]);

    useEffect(() => {
        request('/model/info')
            .then(setModel)
            .catch(() => {});

        if (token) {
            request(
                '/users/me',
                {},
                token
            )
                .then(setUser)
                .catch(logout);
        }
    }, [token]);

    useEffect(() => {
        if (
            token &&
            (tab === 'history' || tab === 'dashboard')
        ) {
            request(
                '/predictions',
                {},
                token
            )
                .then(setHistory)
                .catch((err) =>
                    setError(err.message)
                );
        }

        if (
            token &&
            tab === 'admin'
        ) {
            request(
                '/admin/stats',
                {},
                token
            )
                .then(setStats)
                .catch((err) =>
                    setError(err.message)
                );
        }
    }, [tab, token]);

    function logout() {
        localStorage.removeItem('token');

        setToken(null);
        setUser(null);
    }

    async function submit(event) {
        event.preventDefault();

        setLoading(true);
        setError('');

        try {
            const payload = Object.fromEntries(
                Object.entries(values).map(
                    ([key, value]) => [
                        key,
                        Number(value)
                    ]
                )
            );

            const prediction = await request(
                '/predictions',

                {
                    method: 'POST',
                    body: JSON.stringify(payload)
                },

                token
            );

            setResult(prediction);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    function demo() {
        setValues({
            age: 61,
            sex: 1,
            chest_pain_type: 3,
            resting_bp: 152,
            cholesterol: 284,
            fasting_blood_sugar: 1,
            max_heart_rate: 118,
            exercise_angina: 1,
            oldpeak: 2.4
        });
    }
    if (showLanding) {
    return (
        <LandingPage
            onStart={() => setShowLanding(false)}
            lang={lang}
            setLang={setLang}
        />
    );
}

    if (!token) {
        return (
            <Auth
                onAuth={setToken}
                lang={lang}
                setLang={setLang}
            />
        );
    }

    if (tab === 'dashboard') {
        return (
            <div dir={rtl ? 'rtl' : 'ltr'}>
                <DashboardShell
                    rtl={rtl}
                    tab={tab}
                    setTab={setTab}
                    t={t}
                    user={user}
                    logout={logout}
                    setLang={setLang}
                    onViewProfile={() => setTab('profile')}
                >
                    <DashboardPage
                        rtl={rtl}
                        user={user}
                        result={result}
                        history={history}
                        onStartAssessment={() => setTab('predict')}
                        onViewHistory={() => setTab('history')}
                    />
                </DashboardShell>
            </div>
        );
    }

    return (
        <div dir={rtl ? 'rtl' : 'ltr'}>
         <Sidebar
    rtl={rtl}
    tab={tab}
    setTab={setTab}
    t={t}
    user={user}
    logout={logout}
    setLang={setLang}
    onViewProfile={() => setTab('profile')}
/>

            <main className="dashboard">
                <WelcomeHeader
    rtl={rtl}
    tab={tab}
    t={t}
    model={model}
/>


                {tab === 'predict' && (
                    <>
                   <HeroBanner rtl={rtl} />
                        <section className="assessmentWrapper">
    <div className="assessmentSteps">
        <div className={`step ${result ? 'done' : 'active'}`}>
            <span>1</span>
            <p>{rtl ? 'التقييم' : 'Assessment'}</p>
        </div>

        <div className={`step ${result ? 'active' : ''}`}>
            <span>2</span>
            <p>{rtl ? 'النتيجة' : 'Result'}</p>
        </div>

        <div className="step">
            <span>3</span>
            <p>{rtl ? 'المساعد الذكي' : 'AI Assistant'}</p>
        </div>
    </div>

    {!result ? (
        <AssessmentPage
            rtl={rtl}
            fields={fields}
            values={values}
            setValues={setValues}
            submit={submit}
            demo={demo}
            loading={loading}
            error={error}
        />
    ) : (
        <ResultPage
            rtl={rtl}
            result={result}
            Gauge={Gauge}
            onBack={() => setResult(null)}
        />
    )}
</section>

                        <AIChat rtl={rtl} token={token} />
                    </>
                )}
                {tab === 'history' && (
    <HistoryPage history={history} />
)}

                
                {tab === 'admin' && (
    <AdminPage stats={stats} />
)}
{tab === 'profile' && (
    <ProfilePage
        rtl={rtl}
        user={user}
        history={history}
        onBack={() => setTab('predict')}
        onEdit={() => alert('Edit Profile - Coming Soon')}
        onSave={async (updatedData) => {
    try {
        const updatedUser = await request(
            '/users/me',
            {
                method: 'PUT',
                body: JSON.stringify(updatedData)
            },
            token
        );

        setUser(updatedUser);
    } catch (err) {
        setError(err.message);
    }
}}
onSave={async (updatedData) => {
    try {
        const updatedUser = await request(
            '/users/me',
            {
                method: 'PUT',
                body: JSON.stringify(updatedData)
            },
            token
        );

        setUser(updatedUser);
    } catch (err) {
        setError(err.message);
    }
}}

onChangePassword={async (passwordData) => {
    await request(
        "/users/me/password",
        {
            method: "PUT",
            body: JSON.stringify(passwordData)
        },
        token
    );
}}
/>
)}

                <footer>
    <p>
        {rtl
            ? "منصة تعتمد على الذكاء الاصطناعي لتقييم المخاطر الصحية وتعزيز الرعاية الوقائية، ولا تُغني عن الاستشارة أو التشخيص الطبي المتخصص."
            : "AI-powered health risk assessment for preventive care. Not a substitute for professional medical advice."}
    </p>
</footer>
            </main>
        </div>
    );
}
createRoot(document.getElementById('root')).render(<App />);
