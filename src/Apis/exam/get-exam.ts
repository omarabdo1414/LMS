"use client";

export async function getExam(examId: string) {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/exam/get/${examId}`,
            {
                method: "GET",
                headers: {
                    token: localStorage.getItem("token") as string,
                },
            }
        );

        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getAllExams() {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/exam`,
            {
                method: "GET",
                headers: {
                    token: localStorage.getItem("token") as string,
                },
            }
        );

        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
