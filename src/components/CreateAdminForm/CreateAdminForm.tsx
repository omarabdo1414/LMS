"use client";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { motion } from "framer-motion";

// ✅ TypeScript interface for the form state
type AdminForm = {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  cpassword: string;
};

export default function CreateAdminForm() {
  // ✅ Properly typed state
  const [form, setForm] = useState<AdminForm>({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    cpassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Properly typed form event
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        setForm({
          fullName: "",
          email: "",
          phoneNumber: "",
          password: "",
          cpassword: "",
        });
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 px-4">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="
          w-full 
          max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl 
          bg-white border border-gray-200 rounded-2xl shadow-2xl 
          p-6 sm:p-8 md:p-10 
          flex flex-col gap-4
        "
      >
        <motion.h2
          className="text-3xl md:text-4xl font-semibold text-center mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Create New Admin
        </motion.h2>

        {/* ✅ Full Name & Phone Number */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(["fullName", "phoneNumber"] as (keyof AdminForm)[]).map(
            (field, index) => (
              <motion.input
                key={field}
                type={field === "phoneNumber" ? "text" : "text"}
                placeholder={
                  field === "fullName" ? "Full Name" : "Phone Number"
                }
                className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 hover:shadow-md"
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                required
                whileFocus={{ scale: 1.02 }}
                whileHover={{ scale: 1.01 }}
              />
            )
          )}
        </div>

        {/* ✅ Email */}
        <motion.input
          type="email"
          placeholder="Email"
          className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 hover:shadow-md"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          whileFocus={{ scale: 1.02 }}
          whileHover={{ scale: 1.01 }}
        />

        {/* ✅ Password & Confirm Password */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(["password", "cpassword"] as (keyof AdminForm)[]).map((field) => (
            <motion.input
              key={field}
              type="password"
              placeholder={
                field === "password" ? "Password" : "Confirm Password"
              }
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 hover:shadow-md"
              value={form[field]}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              required
              whileFocus={{ scale: 1.02 }}
              whileHover={{ scale: 1.01 }}
            />
          ))}
        </div>

        {/* ✅ Submit Button */}
        <motion.button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-all duration-300 w-full"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {loading ? "Creating..." : "Create Admin"}
        </motion.button>

        {/* ✅ Message */}
        {message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`text-center text-sm md:text-base mt-3 ${
              message.startsWith("✅")
                ? "text-green-600"
                : message.startsWith("❌")
                ? "text-red-600"
                : "text-yellow-600"
            }`}
          >
            {message}
          </motion.p>
        )}
      </motion.form>
    </div>
  );
}
