"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function AdminTable() {
  const [admins, setAdmins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAdmins = async () => {
    const token = Cookies.get("token");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/all-admin`, {
        headers: { token: token || "" },
      });

      if (!res.ok) throw new Error("Failed to fetch admins");

      const data = await res.json();
      setAdmins(data.data || []);
    } catch (err) {
      console.error(err);
      setError("Unable to load admins. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // 🌀 Loading
  if (loading)
    return (
      <p className="text-center text-base-color animate-pulse mt-10">
        Loading admins...
      </p>
    );

  // ❌ Error
  if (error)
    return (
      <p className="text-center text-error mt-10">
        {error}
      </p>
    );

  // 📭 Empty
  if (admins.length === 0)
    return (
      <p className="text-center text-muted-foreground mt-10">
        No admins found.
      </p>
    );

  // ✅ Table
  return (
    <div className="bg-card text-card-foreground border border-border p-5 rounded-lg shadow-sm transition-all duration-300">
      <h2 className="text-xl font-semibold mb-4 text-base-color">
        All Admins
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-muted text-muted-foreground">
              <th className="border border-border p-3 text-left">#</th>
              <th className="border border-border p-3 text-left">Name</th>
              <th className="border border-border p-3 text-left">Email</th>
              <th className="border border-border p-3 text-left">Role</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((a, i) => (
              <tr
                key={i}
                className="hover:bg-accent/10 transition-colors duration-150"
              >
                <td className="border border-border p-3">{i + 1}</td>
                <td className="border border-border p-3">{a.name}</td>
                <td className="border border-border p-3">{a.email}</td>
                <td className="border border-border p-3">{a.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
