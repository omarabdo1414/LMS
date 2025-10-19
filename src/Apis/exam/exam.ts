import axios from "axios";
import Cookies from "js-cookie";

export async function getExamById() {
  try {
    // Get token from cookies (client-side)
    const token = Cookies.get("token");
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/question`,
      {
        headers: {
          token: token,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching exam:", error);
    throw error; // Re-throw to handle in component
  }
}
