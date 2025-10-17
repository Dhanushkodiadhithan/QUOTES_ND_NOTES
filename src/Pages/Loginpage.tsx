import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function Login() {
  const [email, setEmail] = useState(""); // User email input state
  const [password, setPassword] = useState(""); // User password input state
  const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility
  const [error, setError] = useState(""); // Holds error message string for UI display
  const [loading, setLoading] = useState(false); // Loading spinner/state for submit button
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form reload on submit
    setError(""); // Reset any previous errors
    setLoading(true); // Set loading state for UI feedback during auth

    try {
      // Firebase sign-in with email and password
      await signInWithEmailAndPassword(auth, email, password);

      // Redirect to home page on successful login
      navigate("/home-page", { replace: true });
    } catch (err: any) {
      // Handle specific Firebase auth error codes with friendly messages
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
          setError("Too many failed login attempts. Please wait and try later.");
          break;
        default:
          setError("Login failed. Please try again later.");
          break;
      }
    } finally {
      setLoading(false); // Clear loading state regardless of success/failure
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <form
        onSubmit={handleSubmit} // Form submission bound to above handler
        className="w-full max-w-sm rounded-lg border border-gray-700 bg-gray-800 p-8 shadow-lg"
      >
        <h2 className="mb-2 text-2xl font-bold text-white">Welcome!</h2>
        <p className="mb-6 text-gray-400">Sign in to continue.</p>

        {/* Email Input Field */}
        <label htmlFor="email" className="mb-1 block text-sm font-semibold text-white">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="johndoe@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Update email input state on change
          required
          disabled={loading} // Disable input while loading to prevent changes
          className="mb-4 w-full rounded border border-gray-600 bg-gray-900 px-3 py-2 text-gray-100 focus:border-blue-500 focus:outline-none"
        />

        {/* Password Input Field */}
        <label htmlFor="password" className="mb-1 block text-sm font-semibold text-white">
          Password
        </label>
        <div className="relative mb-6">
          <input
            id="password"
            type={showPassword ? "text" : "password"} // Toggle input type for password visibility
            autoComplete="current-password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password input state on change
            required
            disabled={loading} // Disable input while loading
            className="mb-6 w-full rounded border border-gray-600 bg-gray-900 px-3 py-2 pr-10 text-gray-100 focus:border-blue-500 focus:outline-none"
          />
          {/* Password Visibility Toggle */}
          <span
            className="absolute right-3 top-3 cursor-pointer text-gray-400"
            onClick={() => setShowPassword(!showPassword)} // Toggle password visibility state
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading} // Prevent multiple submits while authenticating
          className={`mb-4 w-full rounded bg-blue-600 py-2 font-bold text-white transition hover:bg-blue-700 ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Signing in..." : "Login"}
        </button>

        {/* Error Popup Message */}
        {error && (
          <div
            role="alert"
            aria-live="assertive"
            className="rounded border border-red-400 bg-red-100 p-2 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        {/* Signup Redirect Link */}
        <div className="text-center text-sm text-gray-400 mt-4">
          Don't have an account?{" "}
          <span
            className="cursor-pointer text-blue-400 hover:underline"
            onClick={() => navigate("/signup")} // Navigate to signup page
          >
            Sign up
          </span>
        </div>
      </form>
    </div>
  );
}
