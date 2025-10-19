import { IUser, IUserState } from "@/constants/interfaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// ✅ 1. Get profile
async function getProfile() {
  const token = Cookies.get("token");
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/`, {
      method: "GET",
      headers: { token: token as string },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Get profile error:", error);
  }
}
export const getUserProfile = createAsyncThunk("user/getProfile", getProfile);

// ✅ 2. Update personal info
async function updateUserProfile(updatedData: {
  fullName: string;
  email: string;
  phone: string;
}) {
  const token = Cookies.get("token");
  const userId = Cookies.get("userId");
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token as string,
        },
        body: JSON.stringify({
          fullName: updatedData.fullName,
          email: updatedData.email,
          phoneNumber: updatedData.phone,
        }),
      }
    );
    return await res.json();
  } catch (error) {
    console.error("Update profile error:", error);
  }
}
export const updateTheUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  updateUserProfile
);

// ✅ 3. Change password
async function changePassword({
  oldPassword,
  newPassword,
  cpassword,
}: {
  oldPassword: string;
  newPassword: string;
  cpassword: string;
}) {
  const token = Cookies.get("token");
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/update-password`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          token: token as string,
        },
        body: JSON.stringify({ oldPassword, newPassword, cpassword }),
      }
    );
    return await res.json();
  } catch (error) {
    console.error("Change password error:", error);
  }
}
export const changeUserPassword = createAsyncThunk(
  "user/changePassword",
  changePassword
);

// ✅ 4. Delete account
async function deleteAccount() {
  const token = Cookies.get("token");
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
      method: "DELETE",
      headers: { token: token as string },
    });
    return await res.json();
  } catch (error) {
    console.error("Delete account error:", error);
  }
}
export const deleteUserAccount = createAsyncThunk(
  "user/deleteAccount",
  deleteAccount
);

// ✅ 5. Initial state
const initialState: IUserState & { role: string | null } = {
  userData: null,
  role: null, // هنا بنحتفظ بدور المستخدم
  loading: false,
  error: null,
};

// ✅ 6. Slice
const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get profile
    builder.addCase(getUserProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload?.data || null;
      state.role = action.payload?.data?.role || null;
    });
    builder.addCase(getUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to load profile";
    });

    // Update profile
    builder.addCase(updateTheUserProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateTheUserProfile.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload?.success) {
        state.userData = action.payload.data;
        state.role = action.payload.data?.role || state.role;
      }
    });
    builder.addCase(updateTheUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to update user profile";
    });

    // Change password
    builder.addCase(changeUserPassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(changeUserPassword.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload?.success) {
        state.userData = {
          ...state.userData,
          ...action.payload.data,
        };
      }
    });
    builder.addCase(changeUserPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to change password";
    });

    // Delete account
    builder.addCase(deleteUserAccount.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteUserAccount.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload?.success) {
        state.userData = null;
        state.role = null; // ✅ clear role
        Cookies.remove("token");
        Cookies.remove("userId");
      }
    });
    builder.addCase(deleteUserAccount.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to delete account";
    });
  },
});

export const UserReducer = UserSlice.reducer;
