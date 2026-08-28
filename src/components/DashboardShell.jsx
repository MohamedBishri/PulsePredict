import React, { useState } from 'react';
import {
    Activity,
    BarChart3,
    History,
    Globe2,
    LayoutDashboard,
    LogOut,
    Menu,
    ShieldCheck,
    X
} from 'lucide-react';

/*
 * Premium shell for the Dashboard tab only.
 * Presentation layer — it forwards the exact same handlers the legacy Sidebar used.
 */

function NavList({ tab, setTab, t, user, onNavigate }) {
    const items = [
        ['dashboard', LayoutDashboard, t.dashboard],
        ['predict', Activity, t.predict],
        ['history', History, t.history],
    ];

    if (user?.is_admin) items.push(['admin', ShieldCheck, t.admin]);

    return (
        <div className="flex flex-col gap-1">
            {items.map(([id, Icon, label]) => {
                const active = tab === id;
                return (
                    <button
                        key={id}
                        type="button"
                        onClick={() => {
                            setTab(id);
                            onNavigate?.();
                        }}
                        className={`relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-start text-sm outline-none transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-brand/60 ${
                            active
                                ? 'bg-brand/10 font-semibold text-white'
                                : 'font-medium text-ink-muted hover:bg-white/[0.04] hover:text-white'
                        }`}
                    >
                        <span
                            className={`absolute inset-y-2 start-0 w-[2px] rounded-full bg-brand transition-opacity duration-150 ${
                                active ? 'opacity-100' : 'opacity-0'
                            }`}
                        />
                        <Icon className={`size-[18px] ${active ? 'text-brand' : ''}`} strokeWidth={1.75} />
                        {label}
                    </button>
                );
            })}
        </div>
    );
}

function SidebarBody({ rtl, tab, setTab, t, user, logout, setLang, onViewProfile, onNavigate }) {
    return (
        <div className="flex h-full flex-col bg-ink px-5 py-8">
            <div className="flex items-center gap-3 px-1">
                <span className="relative grid size-11 place-items-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.05] text-brand">
                    <svg
                        viewBox="0 0 48 48"
                        className="pointer-events-none absolute inset-0 size-full opacity-[0.18]"
                        aria-hidden="true"
                    >
                        <path
                            d="M0 26 h13 l3 -5 l4 14 l4 -22 l4 18 l3 -5 h13"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <Activity className="relative size-5" strokeWidth={2.1} />
                </span>
                <div className="leading-tight">
                    <p className="font-display text-[1.1rem] font-extrabold tracking-[-0.01em] text-white">
                        PulsePredict
                    </p>
                    <p className="mt-0.5 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-ink-muted">
                        {rtl ? 'صحة مدعومة بالذكاء' : 'AI-Powered Health'}
                    </p>
                </div>
            </div>

            <div className="mt-10">
                <p className="px-3 pb-2.5 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-ink-muted/70">
                    {rtl ? 'التنقل' : 'Menu'}
                </p>
                <NavList tab={tab} setTab={setTab} t={t} user={user} onNavigate={onNavigate} />
            </div>

            <div className="mt-auto pt-10">
                <button
                    type="button"
                    onClick={() => {
                        onViewProfile?.();
                        onNavigate?.();
                    }}
                    className="flex w-full items-center gap-3 rounded-xl border border-white/[0.08] px-3 py-3 text-start outline-none transition-colors duration-150 hover:border-white/20 focus-visible:ring-2 focus-visible:ring-brand/60"
                >
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand/15 text-sm font-bold text-brand">
                        {(user?.name || 'M')[0].toUpperCase()}
                    </span>
                    <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold text-white">
                            {user?.name || 'Mohamed'}
                        </span>
                        <span className="block text-[0.7rem] text-ink-muted">
                            {rtl ? 'عرض الملف الشخصي' : 'View profile'}
                        </span>
                    </span>
                </button>

                <div className="mt-3 flex flex-col">
                    <button
                        type="button"
                        onClick={() => setLang(rtl ? 'en' : 'ar')}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[0.82rem] text-ink-muted outline-none transition-colors duration-150 hover:text-white focus-visible:ring-2 focus-visible:ring-brand/60"
                    >
                        <Globe2 className="size-[18px]" strokeWidth={1.75} />
                        {rtl ? 'اللغة' : 'Language'}
                    </button>
                    <button
                        type="button"
                        onClick={logout}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[0.82rem] text-ink-muted outline-none transition-colors duration-150 hover:text-white focus-visible:ring-2 focus-visible:ring-brand/60"
                    >
                        <LogOut className="size-[18px]" strokeWidth={1.75} />
                        {rtl ? 'تسجيل الخروج' : 'Logout'}
                    </button>
                </div>
            </div>
        </div>
    );
}

function DashboardShell({ rtl, tab, setTab, t, user, logout, setLang, onViewProfile, children }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="ppShell">
            {/* desktop sidebar */}
            <aside className="fixed inset-y-0 start-0 z-30 hidden w-[248px] lg:block">
                <SidebarBody
                    rtl={rtl}
                    tab={tab}
                    setTab={setTab}
                    t={t}
                    user={user}
                    logout={logout}
                    setLang={setLang}
                    onViewProfile={onViewProfile}
                />
            </aside>

            {/* mobile top bar */}
            <div className="sticky top-0 z-30 flex items-center justify-between border-b border-hairline bg-surface px-4 py-3 lg:hidden">
                <div className="flex items-center gap-2.5">
                    <span className="grid size-8 place-items-center rounded-[9px] bg-ink text-brand">
                        <Activity className="size-4" strokeWidth={2} />
                    </span>
                    <span className="font-display text-sm font-bold text-canvas-foreground">PulsePredict</span>
                </div>
                <button
                    type="button"
                    aria-label={rtl ? 'القائمة' : 'Menu'}
                    onClick={() => setOpen(true)}
                    className="grid size-9 place-items-center rounded-lg border border-hairline text-canvas-foreground"
                >
                    <Menu className="size-[18px]" strokeWidth={1.75} />
                </button>
            </div>

            {open && (
                <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
                    <div
                        className="absolute inset-0 bg-ink/60"
                        onClick={() => setOpen(false)}
                        role="presentation"
                    />
                    <div className="absolute inset-y-0 start-0 flex w-[84%] max-w-[320px] flex-col border-e border-white/10 bg-ink">
                        <button
                            type="button"
                            aria-label={rtl ? 'إغلاق' : 'Close'}
                            onClick={() => setOpen(false)}
                            className="absolute end-3 top-5 z-10 grid size-9 place-items-center rounded-lg text-ink-muted transition-colors hover:text-white"
                        >
                            <X className="size-[18px]" />
                        </button>
                        <div className="min-h-0 flex-1 overflow-y-auto">
                            <SidebarBody
                                rtl={rtl}
                                tab={tab}
                                setTab={setTab}
                                t={t}
                                user={user}
                                logout={logout}
                                setLang={setLang}
                                onViewProfile={onViewProfile}
                                onNavigate={() => setOpen(false)}
                            />
                        </div>
                    </div>
                </div>
            )}

            <main className="lg:ps-[248px]">
                <div className="mx-auto w-full max-w-[1180px] px-5 py-8 sm:px-8 lg:px-14 lg:py-16">
                    {children}
                </div>
            </main>
        </div>
    );
}

export default DashboardShell;
