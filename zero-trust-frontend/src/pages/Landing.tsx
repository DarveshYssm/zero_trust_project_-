import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Landing = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Your message has been sent! We will contact you soon.");
    setForm({ name: "", email: "", message: "" });
  };
  return (
    <div className="min-h-screen bg-black text-white relative">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,rgba(255,0,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,0,255,0.15)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-fuchsia-600 blur-[180px] opacity-40"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink-500 blur-[200px] opacity-30"></div>
        <div className="absolute top-1/2 right-10 w-[300px] h-[300px] bg-purple-700 blur-[150px] opacity-25"></div>
      </div>

      <section className="py-40 text-center px-6">
        <h1 className="text-7xl md:text-8xl font-extrabold drop-shadow-[0_0_20px_rgba(255,0,255,0.8)]">
          ZeroTrust Tasks
        </h1>

        <p className="text-2xl max-w-4xl mx-auto mt-8 opacity-90">
          Enterprise-grade task management secured by Zero Trust Architecture.
          Every request verified. Every session monitored. No implicit trust.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-8 mt-14">
          <Link
            to="/register"
            className="px-14 py-5 rounded-2xl bg-pink-500 hover:bg-pink-600 text-black text-xl font-extrabold shadow-[0_0_25px_rgba(255,0,255,0.6)] hover:shadow-[0_0_45px_rgba(255,0,255,0.9)] transition-all"
          >
            Start Now
          </Link>

          <Link
            to="/login"
            className="px-14 py-5 rounded-2xl border border-pink-400 hover:bg-pink-600/20 text-pink-300 hover:text-white text-xl font-bold transition-all"
          >
            Login
          </Link>
        </div>
      </section>

      <section className="py-32 px-6">
        <h2 className="text-5xl font-extrabold text-center mb-20">
          Why Choose ZeroTrust?
        </h2>

        <div className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {[
            {
              title: "Continuous Authentication",
              text: "Every request validates the JWT token. No weak or persistent unsafe sessions.",
            },
            {
              title: "Session Timeout",
              text: "Automatic 15-minute inactivity logout with full backend sync.",
            },
            {
              title: "Role-Based Access",
              text: "Strict RBAC ensures users only access resources assigned to them.",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="bg-white/5 border border-pink-400/20 p-10 rounded-3xl backdrop-blur-xl hover:border-pink-400 hover:shadow-[0_0_35px_rgba(255,0,255,0.6)] transition-all"
            >
              <h3 className="text-3xl font-bold mb-4">{card.title}</h3>
              <p className="opacity-90">{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-32 px-6 bg-black/40 backdrop-blur-xl">
        <h2 className="text-5xl text-center font-extrabold mb-20">
          Trusted by Teams
        </h2>

        <div className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {[
            {
              name: "Sara I.",
              role: "User1",
              text:
                "ZeroTrust Tasks completely changed how we secure workflows. Continuous verification is a game changer.",
            },
            {
              name: "Yasmina D.",
              role: "User2",
              text:
                "The admin panel and RBAC are incredibly well implemented. Easy to audit, easy to manage.",
            },
            {
              name: "Danel Y.",
              role: "User 3",
              text:
                "The most secure task management system we’ve ever tested. Perfect for enterprise security.",
            },
          ].map((user, i) => (
            <div
              key={i}
              className="bg-white/5 border border-pink-400/20 p-10 rounded-3xl backdrop-blur-xl hover:shadow-[0_0_30px_rgba(255,0,255,0.6)] transition-all"
            >
              <p className="opacity-90 mb-6 italic">"{user.text}"</p>
              <p className="text-xl font-bold text-pink-300">{user.name}</p>
              <p className="opacity-70">{user.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-32 px-6 bg-gradient-to-b from-black via-fuchsia-900/10 to-black">
        <h2 className="text-5xl text-center font-extrabold mb-20">
          Have a Question?
        </h2>

        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto bg-white/5 p-12 rounded-3xl border border-pink-400/20 backdrop-blur-xl shadow-[0_0_25px_rgba(255,0,255,0.3)]"
        >
          <div className="mb-6">
            <label className="block mb-2">Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-4 rounded-xl bg-black/40 border border-pink-400/30 focus:border-pink-400 outline-none"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2">Email</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-4 rounded-xl bg-black/40 border border-pink-400/30 focus:border-pink-400 outline-none"
            />
          </div>

          <div className="mb-8">
            <label className="block mb-2">Message</label>
            <textarea
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full p-4 rounded-xl bg-black/40 border border-pink-400/30 focus:border-pink-400 outline-none h-40"
            />
          </div>

          <button
            type="submit"
            className="px-12 py-4 bg-pink-500 hover:bg-pink-600 text-black text-xl font-extrabold rounded-2xl transition-all shadow-[0_0_35px_rgba(255,0,255,0.6)] hover:scale-105"
          >
            Send Message →
          </button>
        </form>
      </section>

      <section className="py-32 text-center px-6">
        <h2 className="text-5xl font-bold mb-10">
          Ready to Secure Your Workflow?
        </h2>
        <p className="text-xl opacity-90 mb-12 max-w-3xl mx-auto">
          Join organizations using ZeroTrust Tasks to secure their enterprise operations.
        </p>
        <Link
          to="/register"
          className="inline-block px-16 py-6 bg-pink-500 hover:bg-pink-600 rounded-3xl text-black text-2xl font-extrabold shadow-[0_0_35px_rgba(255,0,255,0.8)] transition-all hover:scale-105"
        >
          Create Account →
        </Link>
      </section>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 bg-pink-500 text-black px-6 py-3 rounded-xl font-bold shadow-[0_0_25px_rgba(255,0,255,0.5)] hover:scale-110 transition-all"
      >
        ↑ Top
      </button>

      <footer className="py-10 text-center opacity-80 border-t border-pink-500/30 mt-20">
        <p>© 2025 ZeroTrust • Ilesbek Sara • Yerkulieva Danel • Darveshova Yasmina</p>
      </footer>
    </div>
  );
};
export default Landing;
