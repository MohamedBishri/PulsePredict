import React from 'react';
import {
    Activity,
    LayoutDashboard,
    History,
    Globe2,
    LogOut,
    ShieldCheck
} from 'lucide-react';

function Sidebar({
    rtl,
    tab,
    setTab,
    t,
    user,
    logout,
    setLang,
    onViewProfile
}) {
    return (
        <header>
            <div className="sidebarLogo">
                <Activity />

                <div>
                    <h2>PulsePredict</h2>
                    <span>AI Powered Health</span>
                </div>
            </div>

            <nav>
                {[
                    ['dashboard', LayoutDashboard, t.dashboard],
                    ['predict', Activity, t.predict],
                    ['history', History, t.history]
                ].map(([id, Icon, label]) => (
                    <button
                        key={id}
                        type="button"
                        className={tab === id ? 'active' : ''}
                        onClick={() => setTab(id)}
                    >
                        <Icon />
                        {label}
                    </button>
                ))}

                {user?.is_admin && (
                    <button
                        type="button"
                        className={tab === 'admin' ? 'active' : ''}
                        onClick={() => setTab('admin')}
                    >
                        <ShieldCheck />
                        {t.admin}
                    </button>
                )}
            </nav>

            <div className="headerActions">
                <div className="sidebarUser">

                    <button
                        className="userCard"
                        type="button"
                        onClick={onViewProfile}
                    >
                        <div className="avatar">
                            {(user?.name || 'M')[0].toUpperCase()}
                        </div>

                        <div className="userInfo">
                            <strong>
                                {user?.name || 'Mohamed'}
                            </strong>

                            <span>
                                {rtl
                                    ? 'عرض الملف الشخصي'
                                    : 'View profile'}
                            </span>
                        </div>
                    </button>


                    <div className="sidebarBottom">

                        <button
                            className="sidebarAction"
                            type="button"
                            onClick={() =>
                                setLang(rtl ? 'en' : 'ar')
                            }
                        >
                            <Globe2 size={18} />

                            <span>
                                {rtl
                                    ? 'اللغة'
                                    : 'Language'}
                            </span>
                        </button>


                        <button
                            className="sidebarAction logoutBtn"
                            type="button"
                            onClick={logout}
                        >
                            <LogOut size={18} />

                            <span>
                                {rtl
                                    ? 'تسجيل الخروج'
                                    : 'Logout'}
                            </span>
                        </button>

                    </div>

                </div>
            </div>
        </header>
    );
}

export default Sidebar;