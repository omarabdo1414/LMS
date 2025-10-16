import { IUser, IUserState } from "@/constants/interfaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
<<<<<<< HEAD
=======

// get profile 
>>>>>>> main
async function getProfile() {
  let token = Cookies.get("token");
  try {
    let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/`, {
      method: "GET",
      headers: {
        token: token as string,
      },
    });

    let data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
export let getUserProfile = createAsyncThunk("user/getProfile", getProfile);

//Update Personal info
async function updateUserProfile(updatedData: { fullName: string; email: string; phone: string }) {
  let token = Cookies.get("token");
  let userId = Cookies.get("userId");
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: token as string,
      },
      body: JSON.stringify({
        fullName: updatedData.fullName,
        email: updatedData.email,
        phoneNumber: updatedData.phone,
      }
      ),
    });
    let data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export let updateTheUserProfile = createAsyncThunk("user/updateUserProfile", updateUserProfile );

//change Password
async function changePassword({
      oldPassword,
      newPassword,
      cpassword,
    }: { oldPassword: string; newPassword: string; cpassword: string },
  ) {
  const token = Cookies.get("token");
  try {
      console.log("Sending to backend:", {
        oldPassword,
        newPassword,
        cpassword,
      });
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/update-password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        token: token as string,
      },
      body: JSON.stringify({ oldPassword, newPassword , cpassword,}),
    });
    const result = await res.json();
    console.log(" Response from backend:", result);
    return result;
  } catch (error) {
    console.error("Change password error:", error);
  }
}

export let changeUserPassword = createAsyncThunk("user/changePassword", changePassword);


// delete Account
async function deleteAccount() {
  const token = Cookies.get("token");

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
      method: "DELETE",
      headers: {
        token: token as string,
      },
    });
    return await res.json();
  } catch (error) {
    console.error("Delete account error:", error);
  }
}
export let deleteUserAccount = createAsyncThunk("user/deleteAccount", deleteAccount);

// userData => profile of user
let initialState: IUserState = {
  userData: null,
<<<<<<< HEAD
  isLoading: true,
=======
  loading:false, 
  error:null,
>>>>>>> main
};
let UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
<<<<<<< HEAD
    builder.addCase(getUserProfile.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.userData = action.payload.data;
      state.isLoading = false;
    });
    builder.addCase(getUserProfile.rejected, (state, action) => {
      state.isLoading = true;
    });
  },
});
=======
    // get profile
    builder.addCase(getUserProfile.pending, (state, action) => {
        state.loading = true;
    });
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload.data;
    });
    builder.addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load profile";
    });

    //update profile
    builder.addCase(updateTheUserProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateTheUserProfile.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload?.success) {
        state.userData = action.payload.data;
      }
    });
    builder.addCase(updateTheUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to update user profile";
    });

    //update password
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

    //delete Account
    builder.addCase(deleteUserAccount.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteUserAccount.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload?.success) {
        state.userData = null;
        Cookies.remove("token");
        Cookies.remove("userId");
      }
    });
    builder.addCase(deleteUserAccount.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to delete account";
    });


},
})
>>>>>>> main
export let UserReducer = UserSlice.reducer;
