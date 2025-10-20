import { ILesson } from "@/constants/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type TLessonState = {
  lessonData: ILesson | null;
};
const initialState: TLessonState = {
  lessonData: null,
};
let lessonSlice = createSlice({
  name: "lesson",
  initialState,
  reducers: {
    setLesson: (state, action: PayloadAction<ILesson>) => {
      state.lessonData = action.payload;
    },
  },
});
export let LessonReducer = lessonSlice.reducer;
export let { setLesson } = lessonSlice.actions;
