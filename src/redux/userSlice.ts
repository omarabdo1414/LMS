import { IUser, IUserState } from "@/constants/interfaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
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
// userData => profile of user
let initialState: IUserState = {
  userData: null,
};
let UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserProfile.pending, (state, action) => {});
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.userData = action.payload.data;
    });
    builder.addCase(getUserProfile.rejected, (state, action) => {});
  },
});
export let UserReducer = UserSlice.reducer;
