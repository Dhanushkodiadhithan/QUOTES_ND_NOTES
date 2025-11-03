import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useDispatch } from "react-redux";
import { setUser } from "../Redux/Slices/authSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // ✅ Firebase login
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      // ✅ Save user to Redux
      dispatch(setUser({ uid: user.uid, email: user.email ?? "" }));

      // ✅ Optionally fetch user data from backend
      // await fetch(`http://localhost:5000/api/users/by-uid/${user.uid}`);

      // ✅ Redirect to homepage
      navigate("/home-page", { replace: true });
    } catch (err: any) {
      switch (err.code) {
        case "auth/user-not-found":
          setError("No user found with that email. Please sign up first.");
          break;
        case "auth/wrong-password":
          setError("Incorrect password. Please try again.");
          break;
        case "auth/invalid-email":
          setError("Invalid email format. Please check and try again.");
          break;
        case "auth/too-many-requests":
          setError("Too many failed attempts. Please try again later.");
          break;
        default:
          setError("Login failed. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-lg border border-gray-700 bg-gray-800 p-8 shadow-lg"
      >
        <h2 className="mb-2 text-2xl font-bold text-white">Welcome Back!</h2>
        <p className="mb-6 text-gray-400">Sign in to continue.</p>

        {/* Email Input */}
        <label
          htmlFor="email"
          className="mb-1 block text-sm font-semibold text-white"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="johndoe@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
          className="mb-4 w-full rounded border border-gray-600 bg-gray-900 px-3 py-2 text-gray-100 focus:border-blue-500 focus:outline-none"
        />

        {/* Password Input */}
        <label
          htmlFor="password"
          className="mb-1 block text-sm font-semibold text-white"
        >
          Password
        </label>
        <div className="relative mb-6">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            className="mb-6 w-full rounded border border-gray-600 bg-gray-900 px-3 py-2 pr-10 text-gray-100 focus:border-blue-500 focus:outline-none"
          />
          <span
            className="absolute right-3 top-3 cursor-pointer text-gray-400"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`mb-4 w-full rounded bg-blue-600 py-2 font-bold text-white transition hover:bg-blue-700 ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Signing in..." : "Login"}
        </button>

        {/* Error Message */}
        {error && (
          <div
            role="alert"
            aria-live="assertive"
            className="rounded border border-red-400 bg-red-100 p-2 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        {/* Signup Link */}
        <div className="mt-4 text-center text-sm text-gray-400">
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
