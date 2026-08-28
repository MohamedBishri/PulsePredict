import { useState } from "react";

export default function ResetPasswordPage({
    request,
    token,
    onSuccess
}) {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setMessage("");

        if (newPassword !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            const data = await request(
                "/auth/reset-password",
                {
                    method: "POST",
                    body: JSON.stringify({
                        token,
                        new_password: newPassword
                    })
                }
            );

            setMessage(data.message);

            if (onSuccess) {
                setTimeout(onSuccess, 1500);
            }
        } catch (error) {
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="auth">
            <form
                className="authCard"
                onSubmit={handleSubmit}
            >
                <h2>Reset Password</h2>

                <p>
                    Enter your new password.
                </p>

                <input
                    required
                    type="password"
                    minLength="8"
                    placeholder="New password"
                    value={newPassword}
                    onChange={(event) =>
                        setNewPassword(event.target.value)
                    }
                />

                <input
                    required
                    type="password"
                    minLength="8"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(event) =>
                        setConfirmPassword(event.target.value)
                    }
                />

                {message && (
                    <p className={
                        message === "Password reset successfully"
                            ? "success"
                            : "error"
                    }>
                        {message}
                    </p>
                )}

                <button
                    className="primary"
                    type="submit"
                    disabled={loading}
                >
                    {loading
                        ? "Updating..."
                        : "Reset Password"}
                </button>
            </form>
        </main>
    );
}