import axios from "axios";
import Cookies from "js-cookie";

type SubmitAnswer = {
  questionId: string;
  selectedAnswer: string;
};

export async function submitStudentExam(examId: string, answers: SubmitAnswer[]) {
  const token = Cookies.get("token");
  const url = `${process.env.NEXT_PUBLIC_API_URL}/studentExam/submit/${examId}`;

  const response = await axios.post(
    url,
    { answers },
    {
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
      validateStatus: (status) => status < 500,
    }
  );

  return response;
}


