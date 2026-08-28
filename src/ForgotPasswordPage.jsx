import { useState } from "react";

export default function ForgotPasswordPage({ request }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

 async function handleSubmit(e) {
  e.preventDefault();
  setLoading(true);
  setMessage("");

  try {
    const res = await request("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    setMessage(res.message);

    if (res.reset_token) {
      window.location.href =
        `${window.location.pathname}?reset_token=${encodeURIComponent(res.reset_token)}`;
    }
  } catch (err) {
    setMessage(err.message);
  } finally {
    setLoading(false);
  }
}

return (
    <div className="container">
      <h2>Forgot Password</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}