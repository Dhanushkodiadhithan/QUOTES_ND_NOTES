import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../Redux/Slices/authSlice";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// Customized, super-friendly error messages
const getFirebaseSignupError = (code: string): string => {
  switch (code) {
    case 'auth/email-already-in-use':
      return "Oops! That email is already registered. Try logging in or use another email address.";
    case 'auth/invalid-email':
      return "Hmm, that doesn’t look like a valid email. Please check for typos!";
    case 'auth/weak-password':
      return "Passwords must be at least 6 characters long. Please choose a stronger password.";
    case 'auth/missing-password':
      return "Please enter a password before continuing.";
    case 'auth/internal-error':
      return "An unexpected error occurred. Try refreshing the page or trying again.";
    default:
      return "Signup failed. Please try again or contact support if the problem continues.";
  }
};

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords do not match! Please check both fields.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      dispatch(setCurrentUser({ email: result.user.email ?? "" }));
      setError("");
      navigate("/");
    } catch (err: any) {
      if (err?.code) {
        setError(getFirebaseSignupError(err.code));
      } else {
        setError("Signup failed. Please try again or contact support if the problem continues.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <form
        onSubmit={handleSignup}
        className="w-full max-w-sm rounded-lg border border-gray-700 bg-gray-800 p-8 shadow-lg"
      >
        <h2 className="mb-2 text-2xl font-bold text-white">Create Account</h2>
        <p className="mb-6 text-gray-400">Sign up to get started.</p>
        <label className="mb-1 block text-sm font-semibold text-white">
          Email
        </label>
        <input
          className="mb-4 w-full rounded border border-gray-600 bg-gray-900 px-3 py-2 text-gray-100 focus:border-blue-500 focus:outline-none"
          type="email"
          autoComplete="email"
          placeholder="johndoe@email.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        {/* Password */}
        <label className="mb-1 block text-sm font-semibold text-white">
          Password
        </label>
        <div className="relative mb-6">
          <input
            className="w-full rounded border border-gray-600 bg-gray-900 px-3 py-2 pr-10 text-gray-100 focus:border-blue-500 focus:outline-none"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
            onClick={() => setShowPassword(v => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Confirm Password */}
        <label className="mb-1 block text-sm font-semibold text-white">
          Confirm Password
        </label>
        <div className="relative mb-6">
          <input
            className="w-full rounded border border-gray-600 bg-gray-900 px-3 py-2 pr-10 text-gray-100 focus:border-blue-500 focus:outline-none"
            type={showConfirm ? "text" : "password"}
            placeholder="••••••••"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            required
          />
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
            onClick={() => setShowConfirm(v => !v)}
            aria-label={showConfirm ? "Hide password" : "Show password"}
          >
            {showConfirm ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {error && <div className="mb-4 text-sm text-red-500">{error}</div>}

        <button
          type="submit"
          className="mb-4 w-full rounded bg-blue-600 py-2 font-bold text-white transition hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Creating account..." : "Sign up"}
        </button>
        <div className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <span
            className="cursor-pointer text-blue-400 hover:underline"
            onClick={() => navigate("/login")}
          >
            Log in
          </span>
        </div>
      </form>
    </div>
  );
}
