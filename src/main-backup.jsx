import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
    Activity,
    ArrowRight,
    BarChart3,
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
        predict: 'Assessment',
        history: 'History',
        model: 'Model Lab',
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
        predict: 'التقييم',
        history: 'السجل',
        model: 'مختبر النموذج',
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

    const [mode, setMode] = useState('login');

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [error, setError] = useState('');

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
function Gauge({ value, level }) {
    const deg = Math.round(value * 360);

    return (
        <div
            className={`gauge ${level.toLowerCase()}`}
            style={{
                background: `conic-gradient(
                    var(--risk) ${deg}deg,
                    #17303b ${deg}deg
                )`
            }}
        >
            <div>
                <b>
                    {Math.round(value * 100)}%
                </b>

                <span>
                    {level} risk
                </span>
            </div>
        </div>
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
    const [tab, setTab] = useState('predict');

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
            tab === 'history'
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

    if (!token) {
        return (
            <Auth
                onAuth={setToken}
                lang={lang}
                setLang={setLang}
            />
        );
    }

    return (
        <div dir={rtl ? 'rtl' : 'ltr'}>
            <header>
                <Activity />

                <nav>
                    {[
                        [
                            'predict',
                            Activity,
                            t.predict
                        ],

                        [
                            'history',
                            History,
                            t.history
                        ],

                        [
                            'model',
                            BarChart3,
                            t.model
                        ]
                    ].map(
                        ([
                            id,
                            Icon,
                            label
                        ]) => (
                            <button
                                type="button"
                                className={
                                    tab === id
                                        ? 'active'
                                        : ''
                                }
                                onClick={() =>
                                    setTab(id)
                                }
                                key={id}
                            >
                                <Icon />

                                {label}
                            </button>
                        )
                    )}

                    {user?.is_admin && (
                        <button
                            type="button"
                            className={
                                tab === 'admin'
                                    ? 'active'
                                    : ''
                            }
                            onClick={() =>
                                setTab('admin')
                            }
                        >
                            <ShieldCheck />

                            {t.admin}
                        </button>
                    )}
                </nav>

                <div className="headerActions">
                    <button
                        className="iconBtn"
                        type="button"
                        onClick={() =>
                            setLang(
                                rtl
                                    ? 'en'
                                    : 'ar'
                            )
                        }
                    >
                        <Languages />
                    </button>

                    <button
                        className="iconBtn"
                        type="button"
                        onClick={logout}
                    >
                        <LogOut />
                    </button>
                </div>
            </header>

            <main className="dashboard">
                <section className="welcome">
                    <div>
                        <p>
                            {t.tag}
                        </p>

                        <h1>
                            {tab === 'predict'
                                ? rtl
                                    ? `مرحبًا ${user?.name || ''}`
                                    : `Welcome, ${user?.name || ''}`
                                : tab === 'history'
                                    ? t.history
                                    : tab === 'model'
                                        ? t.model
                                        : t.admin}
                        </h1>
                    </div>

                    <div className="status">
                        <span />

                        {model?.selected_model ||
                            'Model'} online
                    </div>
                </section>

                {tab === 'predict' && (
                    <>
                        <div className="assessment">
                            <form
                                className="panel formPanel"
                                onSubmit={submit}
                            >
                                <div className="panelHead">
                                    <div>
                                        <span>
                                            01
                                        </span>

                                        <h2>
                                            {rtl
                                                ? 'البيانات الصحية'
                                                : 'Health profile'}
                                        </h2>
                                    </div>

                                    <button
                                        type="button"
                                        className="outline"
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
                                            <label key={key}>
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
                                                        key ===
                                                        'oldpeak'
                                                            ? '0.1'
                                                            : '1'
                                                    }
                                                    value={
                                                        values[
                                                            key
                                                        ]
                                                    }
                                                    onChange={(
                                                        event
                                                    ) =>
                                                        setValues({
                                                            ...values,

                                                            [key]:
                                                                event
                                                                    .target
                                                                    .value
                                                        })
                                                    }
                                                />
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
                                    className="primary full"
                                    disabled={loading}
                                    type="submit"
                                >
                                    {loading
                                        ? rtl
                                            ? 'جاري التحليل...'
                                            : 'Analyzing...'
                                        : rtl
                                            ? 'احسب مستوى الخطر'
                                            : 'Calculate risk'}

                                    <BrainCircuit />
                                </button>
                            </form>

                            <section className="panel resultPanel">
                                {result ? (
                                    <>
                                        <div className="resultTop">
                                            <div>
                                                <p>
                                                    AI RISK ESTIMATE
                                                </p>

                                                <h2>
                                                    {rtl
                                                        ? 'نتيجة قابلة للتفسير'
                                                        : 'Explainable result'}
                                                </h2>
                                            </div>

                                            <button
                                                className="outline"
                                                type="button"
                                                onClick={() =>
                                                    window.print()
                                                }
                                            >
                                                <Download />

                                                {rtl
                                                    ? 'التقرير'
                                                    : 'Report'}
                                            </button>
                                        </div>

                                        <Gauge
                                            value={
                                                result.probability
                                            }
                                            level={
                                                result.risk_level
                                            }
                                        />

                                        <h3>
                                            {rtl
                                                ? 'أهم العوامل المؤثرة'
                                                : 'Top contributing factors'}
                                        </h3>

                                        <div className="factors">
                                            {result.factors?.map(
                                                (
                                                    factor,
                                                    index
                                                ) => (
                                                    <div
                                                        className="factor"
                                                        key={
                                                            factor.feature
                                                        }
                                                    >
                                                        <span>
                                                            {index +
                                                                1}
                                                        </span>

                                                        <div>
                                                            <b>
                                                                {
                                                                    factor.feature
                                                                }
                                                            </b>

                                                            <small>
                                                                {
                                                                    factor.direction
                                                                }
                                                            </small>
                                                        </div>

                                                        <em>
                                                            {Math.round(
                                                                factor.impact *
                                                                    100
                                                            )}{' '}
                                                            impact
                                                        </em>
                                                    </div>
                                                )
                                            )}
                                        </div>

                                        <div className="recommend">
                                            <Stethoscope />

                                            <div>
                                                <b>
                                                    {rtl
                                                        ? 'الخطوة التالية'
                                                        : 'Recommended next step'}
                                                </b>

                                                <p>
                                                    {
                                                        result
                                                            .recommendations?.[0]
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="empty">
                                        <div className="pulse">
                                            <HeartPulse />
                                        </div>

                                        <h2>
                                            {rtl
                                                ? 'النتيجة ستظهر هنا'
                                                : 'Your result will appear here'}
                                        </h2>

                                        <p>
                                            {rtl
                                                ? 'أكمل البيانات للحصول على تقدير واضح مع أهم العوامل المؤثرة.'
                                                : 'Complete the assessment to receive a clear score, risk level, and the factors behind it.'}
                                        </p>
                                    </div>
                                )}
                            </section>
                        </div>

                        <AIChat rtl={rtl} token={token} />
                    </>
                )}
                {tab === 'history' && (
                    <section className="panel tablePanel">
                        {history.length ? (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Risk</th>
                                        <th>Probability</th>
                                        <th>Top factor</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {history.map((record) => (
                                        <tr key={record.id}>
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
                                                    record.probability *
                                                        100
                                                )}
                                                %
                                            </td>

                                            <td>
                                                {
                                                    record
                                                        .factors?.[0]
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
                                    No predictions yet
                                </h2>
                            </div>
                        )}
                    </section>
                )}

                {tab === 'model' && (
                    <section className="modelGrid">
                        <div className="panel modelIntro">
                            <div className="badge">
                                <BrainCircuit />
                                MODEL TRANSPARENCY
                            </div>

                            <h2>
                                Built to be explainable,
                                comparable, and
                                upgradeable.
                            </h2>

                            <p>
                                The current hackathon
                                build compares multiple
                                algorithms, selects the
                                strongest AUC performer,
                                and exposes transparent
                                evaluation metrics.
                            </p>

                            <div className="modelFacts">
                                <div>
                                    <b>
                                        {model?.records ||
                                            6000}
                                    </b>

                                    <span>
                                        training records
                                    </span>
                                </div>

                                <div>
                                    <b>
                                        {model?.metrics
                                            ?.length ||
                                            3}
                                    </b>

                                    <span>
                                        models evaluated
                                    </span>
                                </div>

                                <div>
                                    <b>
                                        {model?.selected_model ||
                                            'Auto'}
                                    </b>

                                    <span>
                                        selected model
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="panel metrics">
                            <h3>
                                Model comparison
                            </h3>

                            {model?.metrics?.map(
                                (metric) => (
                                    <div
                                        className="metric"
                                        key={
                                            metric.name
                                        }
                                    >
                                        <div>
                                            <b>
                                                {
                                                    metric.name
                                                }
                                            </b>

                                            <span>
                                                AUC{' '}
                                                {Math.round(
                                                    metric.auc *
                                                        100
                                                )}
                                                %
                                            </span>
                                        </div>

                                        <div className="bar">
                                            <i
                                                style={{
                                                    width: `${metric.auc * 100}%`
                                                }}
                                            />
                                        </div>

                                        <small>
                                            Accuracy{' '}
                                            {
                                                metric.accuracy
                                            }{' '}
                                            · Recall{' '}
                                            {
                                                metric.recall
                                            }{' '}
                                            · F1{' '}
                                            {metric.f1}
                                        </small>
                                    </div>
                                )
                            )}
                        </div>
                    </section>
                )}
                {tab === 'admin' && stats && (
                    <div className="stats">
                        {[
                            [
                                'Registered users',
                                stats.users
                            ],

                            [
                                'Predictions',
                                stats.predictions
                            ],

                            [
                                'High-risk results',
                                stats.high_risk
                            ],

                            [
                                'Average probability',
                                `${Math.round(
                                    stats.average_probability *
                                        100
                                )}%`
                            ]
                        ].map(
                            ([
                                label,
                                value
                            ]) => (
                                <div
                                    className="panel stat"
                                    key={label}
                                >
                                    <small>
                                        {label}
                                    </small>

                                    <strong>
                                        {value}
                                    </strong>
                                </div>
                            )
                        )}
                    </div>
                )}

                <footer>
                    PulsePredict is a hackathon
                    prototype for preventive-health
                    awareness and must not replace
                    professional medical evaluation.
                </footer>
            </main>
        </div>
    );
}
createRoot(document.getElementById('root')).render(<App />);