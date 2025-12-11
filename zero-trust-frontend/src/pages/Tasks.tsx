import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

interface Task {
  id: number;
  title: string;
  description: string;
  createdAt: string;
}

const Tasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:8080/tasks");
      setTasks(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/tasks", { title, description });
    setTitle("");
    setDescription("");
    fetchTasks();
  };

  const handleUpdate = async (id: number) => {
    await axios.put(`http://localhost:8080/tasks/${id}`, { title, description });
    setEditingId(null);
    setTitle("");
    setDescription("");
    fetchTasks();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this task?")) return;
    await axios.delete(`http://localhost:8080/tasks/${id}`);
    fetchTasks();
  };

  const startEdit = (task: Task) => {
    setEditingId(task.id);
    setTitle(task.title);
    setDescription(task.description || "");
  };

  return (
    <div className="min-h-screen bg-black px-4 py-14 text-white">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl neon-text text-center mb-4">
          My Tasks
        </h1>

        <p className="text-center text-pink-300 mb-10 text-lg">
          Welcome back, <span className="text-pink-400">{user?.email}</span>
        </p>

        <div className="neon-card p-10 rounded-2xl mb-14">

          <h2 className="text-3xl font-bold neon-text mb-8">
            {editingId ? "Edit Task" : "Create New Task"}
          </h2>

          <form
            onSubmit={
              editingId
                ? (e) => {
                    e.preventDefault();
                    handleUpdate(editingId);
                  }
                : handleCreate
            }
            className="space-y-6"
          >
            <input
              type="text"
              className="w-full px-4 py-3 bg-black border border-pink-500/40 rounded-lg text-white focus:ring-2 focus:ring-pink-500"
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <textarea
              rows={4}
              className="w-full px-4 py-3 bg-black border border-pink-500/40 rounded-lg text-white focus:ring-2 focus:ring-pink-500"
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-pink-600 hover:bg-pink-700 text-black font-bold py-3 px-10 rounded-lg shadow-neon transition scan-hover"
              >
                {editingId ? "Update" : "Create"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setTitle("");
                    setDescription("");
                  }}
                  className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 px-10 rounded-lg transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {loading ? (
          <p className="text-center text-pink-300">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="text-center text-pink-400 text-xl">
            No tasks yet. Create your first one!
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="neon-card p-6 rounded-xl hover:shadow-pink-500/40 transition"
              >
                <h3 className="text-2xl font-bold text-white mb-3">
                  {task.title}
                </h3>

                {task.description && (
                  <p className="text-pink-200 mb-4">{task.description}</p>
                )}

                <p className="text-pink-400 text-sm mb-6">
                  Created: {new Date(task.createdAt).toLocaleDateString()}
                </p>

                <div className="flex gap-3">
                  <button
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black py-2 rounded-lg font-bold transition"
                    onClick={() => startEdit(task)}
                  >
                    Edit
                  </button>

                  <button
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-bold transition"
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Tasks;
