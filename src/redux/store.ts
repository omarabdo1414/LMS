import { configureStore } from "@reduxjs/toolkit";
import { UserReducer } from "./userSlice";
import { LessonReducer } from "./lessonSlice";

export let configStore = configureStore({
  reducer: {
    user: UserReducer,
    lesson: LessonReducer,
  },
});
// type of state in selector
export type RootState = ReturnType<typeof configStore.getState>;
// type of dispatch
export type AppDispatch = typeof configStore.dispatch;
