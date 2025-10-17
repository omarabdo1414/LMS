import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function AdminTable() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAdmins = async () => {
    const token = Cookies.get("token");
    try {
      const res = await fetch("https://edu-master-psi.vercel.app/admin/all-admin", {
        headers: { token: token || "" },
      });
      const data = await res.json();
      setAdmins(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  if (loading) return <p>Loading admins...</p>;

  return (
    <div className="border p-5 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-3">All Admins</h2>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">#</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((a: any, i) => (
            <tr key={i}>
              <td className="border p-2">{i + 1}</td>
              <td className="border p-2">{a.name}</td>
              <td className="border p-2">{a.email}</td>
              <td className="border p-2">{a.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
