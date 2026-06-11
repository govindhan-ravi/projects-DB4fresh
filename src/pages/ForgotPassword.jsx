import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email) {
      return setError("Please enter your registered email");
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:4000/api/auth/forgot-password",
        { email }
      );

      setMessage(
        res.data.message ||
          "Password reset link has been sent to your email"
      );
    } catch (err) {
      setError(
        err.response?.data?.message || "Email not registered"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-8">
        <h2 className="text-2xl font-bold text-center mb-2">
          Forgot Password
        </h2>

        <p className="text-sm text-gray-500 text-center mb-6">
          Enter your registered email address and we’ll send you a
          password reset link.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-red-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {error && (
            <p className="text-sm text-red-600 text-center">
              {error}
            </p>
          )}

          {message && (
            <p className="text-sm text-green-600 text-center">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-3 rounded font-semibold hover:bg-red-700 transition disabled:opacity-50"
          >
            {loading ? "Sending link..." : "Send Reset Link"}
          </button>
        </form>

        <p
          onClick={() => navigate("/login")}
          className="mt-6 text-center text-sm text-blue-600 cursor-pointer"
        >
          Back to Login
        </p>
      </div>
    </div>
  );
}
