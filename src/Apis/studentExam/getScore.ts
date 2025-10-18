import axios from "axios";
import Cookies from "js-cookie";

// Get exam score for the current student by exam id
export async function getExamScore(examId: string) {
  const token = Cookies.get("token");
  const url = `${process.env.NEXT_PUBLIC_API_URL}/studentExam/exams/${examId}`;

  const response = await axios.get(url, {
    headers: {
      token: token,
    },
    validateStatus: (status) => status < 500,
  });

  return response;
}

// Get exam score to student (admin/teacher view by studentExam id)
export async function getExamScoreForStudent(studentExamId: string) {
  const token = Cookies.get("token");
  const url = `${process.env.NEXT_PUBLIC_API_URL}/studentExam/exams/score/${studentExamId}`;

  const response = await axios.get(url, {
    headers: {
      token: token,
    },
    validateStatus: (status) => status < 500,
  });

  return response;
}


