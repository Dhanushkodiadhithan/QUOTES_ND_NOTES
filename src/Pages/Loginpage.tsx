import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../Redux/Slices/authSlice";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    console.log(email, password);
    
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      dispatch(setCurrentUser({ email: result.user.email ?? "" }));
      setError("");
      // Optional: navigate to home or dashboard
      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm rounded-lg border border-gray-700 bg-gray-800 p-8 shadow-lg"
      >
        <h2 className="mb-2 text-2xl font-bold text-white">Welcome!</h2>
        <p className="mb-6 text-gray-400">Sign in to continue.</p>
        <label className="mb-1 block text-sm font-semibold text-white">
          Email
        </label>
        <input
          className="mb-4 w-full rounded border border-gray-600 bg-gray-900 px-3 py-2 text-gray-100 focus:border-blue-500 focus:outline-none"
          type="email"
          autoComplete="email"
          placeholder="johndoe@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="mb-1 block text-sm font-semibold text-white">
          Password
        </label>
        <div className="relative mb-6">
        <input
          className="mb-6 w-full rounded border border-gray-600 bg-gray-900 px-3 py-2 pr-10 text-gray-100 focus:border-blue-500 focus:outline-none"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span
          className="absolute right-3  top-3 cursor-pointer text-gray-400"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
        </div>
        {error && <div className="mb-4 text-sm text-red-500">{error}</div>}
        <button
          type="submit"
          className="mb-4 w-full rounded bg-blue-600 py-2 font-bold text-white transition hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Log in"}
        </button>
        <div className="text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <span
            className="cursor-pointer text-blue-400 hover:underline"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </div>
      </form>
    </div>
  );
}
