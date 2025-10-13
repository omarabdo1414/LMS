import axios from "axios";

export async function getExamById() {
  try {
    // Check if we're running on client side where localStorage is available
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (!token) {
      throw new Error("Authentication token not found");
    }

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
