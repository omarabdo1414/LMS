"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { motion } from "framer-motion";

export default function AdminTable() {
  const [admins, setAdmins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAdmins = async () => {
    const token = Cookies.get("token");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/all-admin`,
        {
          headers: { token: token || "" },
        }
      );

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

  if (loading)
    return (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-base-color animate-pulse mt-10"
      >
        Loading admins...
      </motion.p>
    );

  if (error)
    return (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-error mt-10"
      >
        {error}
      </motion.p>
    );

  if (admins.length === 0)
    return (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-muted-foreground mt-10"
      >
        No admins found.
      </motion.p>
    );
  console.log(admins);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-card text-card-foreground border border-border p-6 sm:p-8 rounded-2xl shadow-2xl mx-auto w-full max-w-5xl 2xl:max-w-7xl transition-all duration-300"
    >
      <motion.h2
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-2xl md:text-3xl font-semibold mb-6 text-base-color text-center"
      >
        All Admins
      </motion.h2>

      <div className="overflow-x-auto rounded-xl">
        <motion.table
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full text-sm md:text-base border-collapse"
        >
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
              <motion.tr
                key={i}
                whileHover={{
                  scale: 1.02,
                  backgroundColor: "rgba(0,0,0,0.03)",
                }}
                transition={{ type: "spring", stiffness: 150 }}
                className="hover:bg-accent/10 transition-colors duration-150"
              >
                <td className="border border-border p-3">{i + 1}</td>
                <td className="border border-border p-3">{a.fullName}</td>
                <td className="border border-border p-3">{a.email}</td>
                <td className="border border-border p-3">{a.role}</td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      </div>
    </motion.div>
  );
}
