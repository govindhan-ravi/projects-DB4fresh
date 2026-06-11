import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `http://localhost:4000/api/auth/reset-password/${token}`,
        { password }
      );

      setMessage(res.data.message || "Password reset successful");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.message || "Reset link is invalid or expired"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-8">
        <h2 className="text-2xl font-bold text-center mb-2">
          Reset Password
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Enter a new password for your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="New password"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-red-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm new password"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-red-400"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            {loading ? "Resetting..." : "Reset Password"}
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
