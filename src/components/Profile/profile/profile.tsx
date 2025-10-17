"use client";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getUserProfile, updateTheUserProfile ,deleteUserAccount } from "@/redux/userSlice";
import { SquarePen ,BookCheck,KeyRound ,UserX ,LogOut ,BookOpenCheck } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.userData);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
        phone: user.phoneNumber || "",
      })
      ;
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
  const res = await dispatch(updateTheUserProfile(formData) as any);
  if ((res as any).payload?.success) {
    toast.success("Profile updated successfully!");
    dispatch(getUserProfile());
    setIsEditing(false);
  } else {
    toast.error("Failed to update profile.");
  }
};

  let router = useRouter();
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("userId");
    toast.success("You logged out successfully")
    router.push("/login");
  };


  const handleDeleteAccount = () => {
    toast((t) => (
      <div className="flex flex-col items-start gap-2">
        <span className="text-sm font-medium text-gray-900">
          Are you sure you want to delete your account?
        </span>
        <div className="flex gap-3 mt-2">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              const userId = Cookies.get("userId");
              const token = Cookies.get("token");

              if (!userId || !token) {
                toast.error("User not logged in");
                return;
              }

              const response = await dispatch(deleteUserAccount()).unwrap();

              if (response.success) {
                toast.success("Account deleted successfully");
                Cookies.remove("token");
                Cookies.remove("userId");
                router.push("/signup");
              } else {
                toast.error(response.message || "Failed to delete account");
              }
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
          >
            Yes, Delete
          </button>

          <button
            onClick={() => toast.dismiss(t.id)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    ), {
      duration: 5000,
      position: "top-center",
    });
  };



  return (
    <div className="px-5 my-3 space-y-3">
      {/* Header */}
      <div className="flex justify-between items-center bg-blue-50 border border-blue-100 rounded-2xl p-5 flex-wrap gap-5">
        <div>
          <h1 className="text-2xl font-semibold text-base-color">
            Good morning,{" "}
            <span className="font-bold">
                {user?.fullName?.split(" ")[0]} 
                </span>!
          </h1>
          <span className="text-gray-600">
            What do you want to <span className="font-bold">learn</span> today?
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center bg-[var(--btn)] text-white rounded-full w-10 h-10 text-lg font-semibold">
            {user?.fullName?.charAt(0)?.toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-base-color">{user?.fullName }</p>
            <p className="text-sm text-gray-600">{user?.email }</p>
          </div>
        </div>
      </div>

      {/* Personal Info */}
      <div className="border border-blue-100 rounded-2xl p-6 bg-white shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-base-color">Personal Information</h2>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-1 border border-blue-300 text-base-color font-semibold px-3 py-1 rounded-full text-sm hover:bg-blue-50"
            >
              <span>Edit</span>
              <SquarePen className="w-4 ml-2" />
            </button>
          )}
        </div>

        {!isEditing ? (
          <div className="space-y-3 text-blue-700">
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-medium">{user?.fullName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email Address</p>
              <p className="font-medium">{user?.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone Number</p>
              <p className="font-medium">{user?.phoneNumber}</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div>
              <label className="font-semibold">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="form-input "
              />
            </div>
            <div>
              <label className="font-semibold">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div>
              <label className="font-semibold">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="btn px-3"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>

      {/* My Courses */}
      <div className="border border-blue-100 rounded-2xl p-6 bg-white shadow-sm flex justify-between items-center flex-wrap ">
          <h2 className="text-lg font-bold text-base-color mb-4">My Courses</h2>
          <Link href="#">
            <button className="btn px-8" >
                  <BookOpenCheck  className="w-5 mr-3" />
                  View Courses
            </button>
          </Link>
      </div>

      {/* My Exams */}
      <div className="border border-blue-100 rounded-2xl p-6 bg-white shadow-sm flex justify-between items-center flex-wrap gap-5">
          <h2 className="text-lg font-bold text-base-color ">My Exams</h2>
          <Link href="#">
            <button className="btn px-8">
                  <BookCheck className="w-5 mr-3" />
                  View Exams
            </button>
          </Link>
      </div>

      {/* Account settings */}
      <div className="border border-blue-100 rounded-2xl p-6 bg-white shadow-sm">
            <div className="flex justify-between items-center ">
                <h2 className="text-lg font-bold text-base-color ">Account Settings</h2>
                <p className="text-base-color text-[14px]">perform profile actions or change password</p>
            </div>
            <div className="set-btns mt-5 flex justify-between flex-wrap gap-5">
                <div className="flex gap-5 flex-wrap">
                  <button className="btn px-8 py-2" onClick={() => router.push("/changePassword")}>  
                    <KeyRound className="w-5 mr-2"/>
                    Change Password
                  </button>
                  <button className="flex items-center px-8 bg-[#ff1717] text-white rounded-[10px] hover:bg-[#ea0c0c] py-2" 
                          onClick={handleLogout}>  
                      <LogOut className="w-5 mr-2 "/>
                      logout
                  </button>
                </div>
                <button className="flex items-center px-8 bg-[#ffb1b1] rounded-[10px] hover:bg-[#db8787] text-[#ff1717] py-2" 
                        onClick={handleDeleteAccount}>  
                    <UserX className="w-5 mr-2 "/>
                    Delete Account
                </button>
            </div>
      </div>

    </div>
  );
}
