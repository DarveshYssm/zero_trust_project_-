import { useState, useEffect } from "react";
import axios from "axios";

interface AdminUser {
  id: number;
  email: string;
  roles: string[];
}

const AdminPanel = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/admin/users");
      setUsers(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const promoteUser = async (id: number) => {
    if (!confirm("Promote this user to ADMIN?")) return;
    await axios.post(`http://localhost:8080/admin/users/${id}/promote`);
    fetchUsers();
  };

  const deleteUser = async (id: number) => {
    if (!confirm("Delete this user permanently?")) return;
    await axios.delete(`http://localhost:8080/admin/users/${id}`);
    fetchUsers();
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-14">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl neon-text text-center font-extrabold mb-12">
          Admin Control Center
        </h1>

        <div className="neon-card rounded-2xl p-10">

          <h2 className="text-3xl font-bold neon-text mb-8">
            User Management
          </h2>

          {loading ? (
            <p className="text-center text-pink-300">Loading users...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border border-pink-500/40 rounded-xl">
                <thead className="bg-pink-600/20">
                  <tr>
                    <th className="px-6 py-4 text-left">ID</th>
                    <th className="px-6 py-4 text-left">Email</th>
                    <th className="px-6 py-4 text-left">Roles</th>
                    <th className="px-6 py-4 text-left">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((u) => (
                    <tr
                      key={u.id}
                      className="border-t border-pink-500/20 hover:bg-pink-600/10 transition"
                    >
                      <td className="px-6 py-4">{u.id}</td>
                      <td className="px-6 py-4">{u.email}</td>

                      <td className="px-6 py-4">
                        <div className="flex gap-3">
                          {u.roles.map((role) => (
                            <span
                              key={role}
                              className={
                                role === "ADMIN"
                                  ? "px-3 py-1 bg-red-600 text-white rounded-lg shadow-neon"
                                  : "px-3 py-1 bg-pink-500 text-black rounded-lg shadow-neon"
                              }
                            >
                              {role}
                            </span>
                          ))}
                        </div>
                      </td>

                      <td className="px-6 py-4 flex gap-3">

                        {!u.roles.includes("ADMIN") && (
                          <button
                            onClick={() => promoteUser(u.id)}
                            className="bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded-lg text-black font-bold shadow-neon transition scan-hover"
                          >
                            Promote
                          </button>
                        )}

                        <button
                          onClick={() => deleteUser(u.id)}
                          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white font-bold shadow-neon transition scan-hover"
                        >
                          Delete
                        </button>

                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
