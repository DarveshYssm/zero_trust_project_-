import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await axios.post("http://localhost:8080/auth/register", {
        email,
        password,
      });
      setSuccess("Registration successful!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err: any) {
      setError(err.response?.data || "Registration failed. Try another email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="neon-card max-w-md w-full p-10 rounded-2xl">

        <h2 className="text-4xl font-extrabold neon-text text-center mb-10">
          Create Account
        </h2>

        {error && (
          <div className="bg-red-600/30 border border-red-400 text-red-200 px-4 py-3 rounded mb-6 text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-600/20 border border-green-400 text-green-300 px-4 py-3 rounded mb-6 text-center">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="text-pink-300 font-medium">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 mt-2 bg-black border border-pink-500/40 rounded-lg text-white focus:ring-2 focus:ring-pink-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="newuser@zerotrust.com"
            />
          </div>

          <div>
            <label className="text-pink-300 font-medium">Password</label>
            <input
              type="password"
              minLength={6}
              className="w-full px-4 py-3 mt-2 bg-black border border-pink-500/40 rounded-lg text-white focus:ring-2 focus:ring-pink-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-600 hover:bg-pink-700 text-black font-bold py-3 rounded-lg shadow-neon transition scan-hover"
          >
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        <p className="text-center text-pink-300 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-pink-400 hover:text-white font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
