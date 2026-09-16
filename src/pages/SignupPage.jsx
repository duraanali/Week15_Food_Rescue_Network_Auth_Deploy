import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.js";

// Sign up sends the new details to the API, which returns the created account.
function SignupPage() {
  const signup = useAuthStore((state) => state.signup);

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createdId, setCreatedId] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    const created = await signup({ firstName, email, password });
    if (created) setCreatedId(created.id);
  };

  return (
    <main className="auth">
      <form className="auth-card" onSubmit={onSubmit}>
        <h1>Sign up</h1>

        <label className="auth-field">
          Name
          <input className="auth-input" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </label>
        <label className="auth-field">
          Email
          <input className="auth-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className="auth-field">
          Password
          <input className="auth-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>

        <button className="auth-button" >Create account</button>

        {createdId && (
          <p className="auth-ok">
            ✅ Account created (id {createdId}). This is a demo API, so it isn't saved — log in with
            the demo account to continue.
          </p>
        )}

        <p className="auth-hint">Already have an account? <Link to="/login">Log in</Link></p>
      </form>
    </main>
  );
}

export default SignupPage;
