import React, { useState } from "react";
import Cookies from "js-cookie";

export default function CreateAdminForm() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const token = Cookies.get("token");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/create-admin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token || "",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (data.success) {
        setMessage("✅ Admin created successfully");
        setForm({ name: "", email: "", password: "" }); // clear form after success
      } else {
        setMessage(data.message || "❌ Failed to create admin");
      }
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Server error, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border p-5 rounded-lg shadow space-y-3 max-w-md mx-auto"
    >
      <h2 className="text-xl font-semibold text-center">Create New Admin</h2>

      <input
        type="text"
        placeholder="Name"
        className="border p-2 w-full rounded"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />

      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full rounded"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full rounded"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create Admin"}
      </button>

      {message && (
        <p
          className={`text-sm text-center mt-2 ${
            message.startsWith("✅")
              ? "text-green-600"
              : message.startsWith("❌")
              ? "text-red-600"
              : "text-yellow-600"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
