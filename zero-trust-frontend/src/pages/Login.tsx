import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && user) navigate("/tasks", { replace: true });
  }, [user, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8080/auth/login", {
        email,
        password,
      });
      login(res.data.accessToken);
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="neon-card max-w-md w-full p-10 rounded-2xl">

        <h2 className="text-4xl font-extrabold neon-text text-center mb-10">
          Login
        </h2>

        {error && (
          <div className="bg-red-600/30 border border-red-400 text-red-200 px-4 py-3 rounded mb-6 text-center">
            {error}
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
            />
          </div>

          <div>
            <label className="text-pink-300 font-medium">Password</label>
            <input
              type="password"
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
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-pink-300 mt-6">
          No account?{" "}
          <Link to="/register" className="text-pink-400 hover:text-white">
            Register here
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;
