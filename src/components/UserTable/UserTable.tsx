"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function UserTable() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    const token = Cookies.get("token");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/all-user`, {
        headers: { token: token || "" },
      });

      if (!res.ok) throw new Error("Failed to fetch users");

      const data = await res.json();
      setUsers(data.data || []);
    } catch (err: any) {
      console.error(err);
      setError("Unable to load users. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🌀 Loading state
  if (loading)
    return (
      <p className="text-center text-base-color animate-pulse mt-10">
        Loading users...
      </p>
    );

  // ❌ Error state
  if (error)
    return (
      <p className="text-center text-error mt-10">
        {error}
      </p>
    );

  // 📋 Empty state
  if (users.length === 0)
    return (
      <p className="text-center text-muted-foreground mt-10">
        No users found.
      </p>
    );

  // ✅ Table UI
  return (
    <div className="bg-card text-card-foreground border border-border p-5 rounded-lg shadow-sm transition-all duration-300">
      <h2 className="text-xl font-semibold mb-4 text-base-color">
        All Users
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-muted text-muted-foreground">
              <th className="border border-border p-3 text-left">#</th>
              <th className="border border-border p-3 text-left">Name</th>
              <th className="border border-border p-3 text-left">Email</th>
              <th className="border border-border p-3 text-left">Verified</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr
                key={i}
                className="hover:bg-accent/10 transition-colors duration-150"
              >
                <td className="border border-border p-3">{i + 1}</td>
                <td className="border border-border p-3">{u.name}</td>
                <td className="border border-border p-3">{u.email}</td>
                <td className="border border-border p-3 text-center">
                  {u.isVerified ? (
                    <span className="text-green-500">✅</span>
                  ) : (
                    <span className="text-error">❌</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
