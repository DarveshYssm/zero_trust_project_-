import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-black/90 backdrop-blur-md shadow-neonSoft border-b border-pink-500/30 animate-glow">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-12 h-12 bg-pink-600 rounded-xl flex items-center justify-center shadow-neon">
            <span className="text-white font-bold text-xl tracking-widest">ZT</span>
          </div>
          <span className="text-2xl font-extrabold text-neon-pink drop-shadow">
            ZeroTrust
          </span>
        </Link>

        {/* NAV LINKS */}
        <div className="flex items-center space-x-6">
          {user ? (
            <>
              <Link
                to="/account"
                className="text-neon-pink hover:text-white transition font-medium"
              >
                Account
              </Link>

              <Link
                to="/tasks"
                className="text-neon-pink hover:text-white transition font-medium"
              >
                Tasks
              </Link>

              {user.roles.includes("ADMIN") && (
                <Link
                  to="/admin"
                  className="text-pink-400 hover:text-white transition font-bold"
                >
                  Admin Panel
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="px-5 py-2 bg-pink-600 hover:bg-pink-700 text-black font-bold rounded-lg shadow-neon transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-neon-pink hover:text-white transition font-medium"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-5 py-2 bg-pink-500 hover:bg-pink-600 text-black font-bold rounded-lg shadow-neon transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
