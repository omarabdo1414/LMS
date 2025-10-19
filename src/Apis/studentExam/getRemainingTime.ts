import axios from "axios";
import Cookies from "js-cookie";

export async function getExamRemainingTime(examId: string) {
  const token = Cookies.get("token");
  const url = `${process.env.NEXT_PUBLIC_API_URL}/studentExam/exams/remaining-time/${examId}`;

  const response = await axios.get(url, {
    headers: {
      token: token,
    },
    validateStatus: (status) => status < 500,
  });

  return response;
}


