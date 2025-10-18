import { configureStore } from "@reduxjs/toolkit";
import { UserReducer } from "./userSlice";
import questionsReducer from "./questions";
import examReducer from "./exam";
import { LessonReducer } from "./lessonSlice";

export const configStore = configureStore({
  reducer: {
    user: UserReducer,
    questions: questionsReducer,
    exam: examReducer,
    lesson: LessonReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['questions/initializeQuiz'],
        ignoredPaths: ['questions.currentQuiz.createdAt', 'questions.currentQuiz.updatedAt'],
      },
    }),
});
// type of state in selector
export type RootState = ReturnType<typeof configStore.getState>;
// type of dispatch
export type AppDispatch = typeof configStore.dispatch;
