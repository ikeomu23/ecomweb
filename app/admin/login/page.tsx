"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy check: replace with real API call
    if (email === "admin@school.com" && password === "admin123") {
      // Store auth state (for demo, use localStorage)
      localStorage.setItem("superadmin-auth", "true");
      router.push("/admin");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 shadow-lg rounded-lg p-8 w-full max-w-sm flex flex-col gap-4 border border-gray-100"
      >
        <h2 className="text-2xl font-bold text-blue-700 mb-2 text-center">Super Admin Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button
          type="submit"
          className="bg-blue-700 text-white rounded px-4 py-2 font-semibold hover:bg-blue-800 transition"
        >
          Login
        </button>
      </form>
    </main>
  );
}
