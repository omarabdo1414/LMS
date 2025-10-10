import React from "react";

type Exam = {
  id: string;
  title: string;
  description?: string;
};

async function fetchExams(): Promise<Exam[]> {
  const res = await fetch("https://edu-master-psi.vercel.app/exam", {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch exams: ${res.status}`);
  }
  return res.json();
}

export default async function Page() {
  const exams = await fetchExams();

  return (
    <main>
      <h1>Exams</h1>
      <ul>
        {exams.map((e) => (
          <li key={e.id}>
            <strong>{e.title}</strong> — {e.description}
          </li>
        ))}
      </ul>
    </main>
  );
}
