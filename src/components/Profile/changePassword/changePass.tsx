"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/redux/hooks";
import { changeUserPassword } from "@/redux/userSlice";

export default function ChangePasswordPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    cpassword: "",
  });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.newPassword !== formData.cpassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    const res = await dispatch(changeUserPassword(formData) as any);

    if (res.payload?.success) {
      toast.success("Password changed successfully!");
      router.push("/profile");
    } else {
      toast.error(res.payload?.message || "Failed to change password");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center " >
      <form
        onSubmit={handleSubmit}
        className="form flex flex-col gap-5"
      >
        <h2 className="text-xl font-bold text-center text-base-color">
          Change Password
        </h2>

        <div>
          <label className="font-semibold">Old Password</label>
          <input
            type="password"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div>
          <label className="font-semibold">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div>
          <label className="font-semibold">Confirm New Password</label>
          <input
            type="password"
            name="cpassword"
            value={formData.cpassword}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        

        <button type="submit" className="btn w-full py-2">
          Change Password
        </button>

        <button
          type="button"
          onClick={() => router.push("/profile")}
          className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-100"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
