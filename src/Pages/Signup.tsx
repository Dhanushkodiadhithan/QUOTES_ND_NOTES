import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { signupUser } from "../firebaseConfig";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email: string) => /^\S+@\S+\.\S+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("Oops! That doesn't look like a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Your password should have at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Your confirmation password does not match.");
      return;
    }

    setLoading(true);
    try {
      await signupUser(email, password);
      navigate("/login");
    } catch (err: any) {
      switch (err.code) {
        case "auth/email-already-in-use":
          setError("This email is already registered. Try logging in instead.");
          break;
        case "auth/invalid-email":
          setError("The email address entered is not valid. Please check and try again.");
          break;
        case "auth/operation-not-allowed":
          setError("Oops! Email/password accounts are not enabled yet. Contact support.");
          break;
        case "auth/weak-password":
          setError("Your password is too weak. Please choose a stronger password.");
          break;
        default:
          setError("Something went wrong while creating your account. Please try again.");
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-lg border border-gray-700 bg-gray-800 p-8 shadow-lg">
        <h2 className="mb-2 text-2xl font-bold text-white">Create Account</h2>
        <p className="mb-6 text-gray-400">Sign up to get started.</p>
        
        <label htmlFor="email" className="mb-1 block text-sm font-semibold text-white">Email</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="johndoe@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          required
          className="mb-4 w-full rounded border border-gray-600 bg-gray-900 px-3 py-2 text-gray-100 focus:border-blue-500 focus:outline-none"
        />

        <label htmlFor="password" className="mb-1 block text-sm font-semibold text-white">Password</label>
        <div className="relative mb-6">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
            className="w-full rounded border border-gray-600 bg-gray-900 px-3 py-2 pr-10 text-gray-100 focus:border-blue-500 focus:outline-none"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <label htmlFor="confirm" className="mb-1 block text-sm font-semibold text-white">Confirm Password</label>
        <div className="relative mb-6">
          <input
            id="confirm"
            type={showConfirm ? "text" : "password"}
            placeholder="••••••••"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            disabled={loading}
            required
            className="w-full rounded border border-gray-600 bg-gray-900 px-3 py-2 pr-10 text-gray-100 focus:border-blue-500 focus:outline-none"
          />
          <span
            onClick={() => setShowConfirm(!showConfirm)}
            aria-label={showConfirm ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
          >
            {showConfirm ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button
          disabled={loading}
          type="submit"
          className={`mb-4 w-full rounded bg-blue-600 py-2 font-bold text-white transition hover:bg-blue-700 ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
        {error && <div className="text-red-500 mb-2" aria-live="assertive">{error}</div>}

        <div className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <span className="cursor-pointer text-blue-400 hover:underline" onClick={() => navigate("/login")}>
            Log in
          </span>
        </div>
      </form>
    </div>
  );
}
