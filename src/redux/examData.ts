import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Exam {
  _id: string;
  title: string;
  description: string;
  duration: number;
  classLevel: string;
  startDate: string;
  endDate: string;
  isPublished: boolean;
}

interface ExamState {
  exams: Exam[];
  currentExam: Exam | null;
}

const initialState: ExamState = {
  exams: [],
  currentExam: null,
};

const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    setExams: (state, action: PayloadAction<Exam[]>) => {
      state.exams = action.payload;
    },
    setCurrentExam: (state, action: PayloadAction<Exam | null>) => {
      state.currentExam = action.payload;
    },
  },
});

export const { setExams, setCurrentExam } = examSlice.actions;
export const examDataReducer=  examSlice.reducer;
