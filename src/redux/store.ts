import { configureStore } from "@reduxjs/toolkit";
import { UserReducer } from "./userSlice";

export let configStore = configureStore({
  reducer: {
    user: UserReducer,
  },
});
// type of state in selector
export type RootState = ReturnType<typeof configStore.getState>;
// type of dispatch
export type AppDispatch = typeof configStore.dispatch;
