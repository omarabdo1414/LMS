import { getProfile } from "@/Apis/user/getProfile";
import { IUser, IUserState } from "@/constants/interfaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
