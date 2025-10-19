import Cookies from "js-cookie";

export async function deleteExam(examId: string): Promise<{ success: boolean; message: string }>
{
  try {
    const token = Cookies.get("token");
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/exam/${examId}`, {
      method: "DELETE",
      headers: {
        token: token as string,
      },
    });

    if (!res.ok) {
      const message = `Failed to delete exam: ${res.status}`;
      return { success: false, message };
    }

    const data = await res.json().catch(() => ({}));
    return { success: true, message: data?.message || "Deleted" };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return { success: false, message };
  }
}


