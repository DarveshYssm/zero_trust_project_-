import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Account = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-black px-4 py-12 text-white">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-5xl font-extrabold neon-text text-center mb-10">
          My Account
        </h1>

        <div className="neon-card rounded-2xl p-10">

          <div className="grid md:grid-cols-2 gap-10">

            <div>
              <h2 className="text-3xl font-bold neon-text mb-6">
                Profile Information
              </h2>

              <div className="space-y-6">

                <div>
                  <p className="text-pink-300 font-medium text-lg">Email</p>
                  <p className="text-xl">{user?.email}</p>
                </div>

                <div>
                  <p className="text-pink-300 font-medium text-lg">Roles</p>
                  <div className="flex flex-wrap gap-3 mt-3">
                    {user?.roles.map((role) => (
                      <span
                        key={role}
                        className={
                          role === "ADMIN"
                            ? "px-4 py-2 rounded-full bg-red-600 text-white shadow-neon"
                            : "px-4 py-2 rounded-full bg-pink-600 text-black shadow-neon"
                        }
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold neon-text mb-6">
                Quick Actions
              </h2>

              <div className="space-y-6">

                <Link
                  to="/tasks"
                  className="block w-full bg-pink-600 hover:bg-pink-700 text-black font-bold py-4 rounded-xl shadow-neon text-center transition scan-hover"
                >
                  View My Tasks
                </Link>

                {user?.roles.includes("ADMIN") && (
                  <Link
                    to="/admin"
                    className="block w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-neon text-center transition scan-hover"
                  >
                    Admin Panel
                  </Link>
                )}

              </div>
            </div>

          </div>

          <div className="mt-12 pt-8 border-t border-pink-500/40 text-center">
            <p className="text-pink-300 text-sm">
              Session expires automatically after 15 minutes of inactivity.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Account;
