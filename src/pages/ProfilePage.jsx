import React, { useEffect, useState } from 'react';
import {
    ArrowLeft,
    ArrowRight,
    Lock,
    Mail,
    Pencil,
    ShieldCheck,
    User
} from 'lucide-react';

function ProfilePage({
    rtl,
    user,
    history,
    onBack,
    onEdit,
    onSave,
    onChangePassword
}) {
    const predictionsCount = history?.length || 0;
    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || ''
});
useEffect(() => {
    setForm({
        name: user?.name || '',
        email: user?.email || ''
    });
}, [user]);

const [passwords, setPasswords] = useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
});
const handlePasswordChange = async () => {
    if (passwords.new_password !== passwords.confirm_password) {
        alert("Passwords do not match");
        return;
    }

    try {
        await onChangePassword(passwords);

        alert("Password updated successfully");

        setPasswords({
            current_password: "",
            new_password: "",
            confirm_password: ""
        });
    } catch (err) {
        alert(err.message);
    }
};

    return (
        <section className="profilePage">
            <div className="profileHeader">
                <div>
                    <span className="pageLabel">
                        {rtl
                            ? 'الحساب الشخصي'
                            : 'USER PROFILE'}
                    </span>

                    <h1>
                        {rtl
                            ? 'الملف الشخصي'
                            : 'My Profile'}
                    </h1>

                    <p>
                        {rtl
                            ? 'عرض معلومات حسابك ونشاطك داخل المنصة.'
                            : 'View your account information and activity.'}
                    </p>
                </div>

                <button
                    className="outline"
                    type="button"
                    onClick={onBack}
                >
                    {rtl
                        ? <ArrowRight />
                        : <ArrowLeft />}

                    {rtl
                        ? 'رجوع'
                        : 'Back'}
                </button>
                <button
    className="outline"
    type="button"
    onClick={() => {
    if (isEditing) {
        onSave(form);
        setIsEditing(false);
    } else {
        setIsEditing(true);
    }
}}
>

    <Pencil size={18} />

    {isEditing
    ? (rtl ? 'حفظ التعديلات' : 'Save Changes')
    : (rtl ? 'تعديل الملف' : 'Edit Profile')}
    {isEditing && (
    <button
        className="outline"
        type="button"
        onClick={() => {
            setForm({
                name: user?.name || '',
                email: user?.email || ''
            });
            setIsEditing(false);
        }}
    >
        {rtl ? 'إلغاء' : 'Cancel'}
    </button>
)}

</button>
            </div>

            <div className="profileGrid">
                <section className="panel profileCard">
                    <div className="profileAvatar">
                        {(user?.name || 'M')[0].toUpperCase()}
                    </div>

                    <h2>{isEditing ? form.name : user?.name || 'Mohamed'}</h2>

                    <span className="pill">
                        {user?.is_admin
                            ? rtl
                                ? 'مدير'
                                : 'Admin'
                            : rtl
                            ? 'مستخدم'
                            : 'User'}
                    </span>
                </section>

                <section className="panel profileDetails">
                    <div className="profileDetail">
                        <User />

                        <div>
                            <span>
                                {rtl ? 'الاسم' : 'Full name'}
                            </span>

                            {isEditing ? (
    <input
        type="text"
        value={form.name}
        onChange={(e) =>
            setForm({
                ...form,
                name: e.target.value
            })
        }
    />
) : (
    <strong>
        {user?.name || 'Not available'}
    </strong>
)}
                        </div>
                    </div>

                    <div className="profileDetail">
                        <Mail />

                        <div>
                            <span>
                                {rtl
                                    ? 'البريد الإلكتروني'
                                    : 'Email address'}
                            </span>

                            {isEditing ? (
    <input
        type="email"
        value={form.email}
        onChange={(e) =>
            setForm({
                ...form,
                email: e.target.value
            })
        }
    />
) : (
    <strong>
        {user?.email || 'Not available'}
    </strong>
)}
                        </div>
                    </div>

                    <div className="profileDetail">
                        <ShieldCheck />

                        <div>
                            <span>
                                {rtl
                                    ? 'نوع الحساب'
                                    : 'Account type'}
                            </span>

                            <strong>
                                {user?.is_admin
                                    ? rtl
                                        ? 'مدير'
                                        : 'Administrator'
                                    : rtl
                                    ? 'مستخدم'
                                    : 'Standard user'}
                            </strong>
                        </div>
                    </div>

                    <div className="profileStat">
                        <span>
                            {rtl
                                ? 'عدد التقييمات'
                                : 'Total assessments'}
                        </span>

                        <strong>{predictionsCount}</strong>
                    </div>
                </section>

                <section className="panel profileDetails">
    <div className="profileDetail">
        <Lock />

        <div>
            <span>
                {rtl
                    ? 'تغيير كلمة المرور'
                    : 'Change Password'}
            </span>

            <strong>
                {rtl
                    ? 'حدّث كلمة مرور حسابك'
                    : 'Update your account password'}
            </strong>
        </div>
    </div>

    <div className="profileDetail">
        <div>
            <span>
                {rtl
                    ? 'كلمة المرور الحالية'
                    : 'Current password'}
            </span>

            <input
                type="password"
                value={passwords.current_password}
                onChange={(e) =>
                    setPasswords({
                        ...passwords,
                        current_password: e.target.value
                    })
                }
            />
        </div>
    </div>

    <div className="profileDetail">
        <div>
            <span>
                {rtl
                    ? 'كلمة المرور الجديدة'
                    : 'New password'}
            </span>

            <input
                type="password"
                value={passwords.new_password}
                onChange={(e) =>
                    setPasswords({
                        ...passwords,
                        new_password: e.target.value
                    })
                }
            />
        </div>
    </div>

    <div className="profileDetail">
        <div>
            <span>
                {rtl
                    ? 'تأكيد كلمة المرور'
                    : 'Confirm password'}
            </span>

            <input
                type="password"
                value={passwords.confirm_password}
                onChange={(e) =>
                    setPasswords({
                        ...passwords,
                        confirm_password: e.target.value
                    })
                }
            />
        </div>
    </div>

    <button
    type="button"
    className="primary"
    onClick={handlePasswordChange}
>
        {rtl
            ? 'تحديث كلمة المرور'
            : 'Update Password'}
    </button>
    </section>
            </div>
        </section>
    );
}

export default ProfilePage;