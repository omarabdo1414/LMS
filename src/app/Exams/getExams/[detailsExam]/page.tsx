"use client";
import React, { useEffect, useState } from "react";
import ExamDetails from "@/components/ExamDetails/ExamDetails";
import { getExamScore } from "@/Apis/studentExam/getScore";
import { useParams } from "next/navigation";

const DetailsExam = () => {
  const params = useParams();
  const rawExamId = params.detailsExam;
  const examId = Array.isArray(rawExamId) ? rawExamId[0] : rawExamId;

  const [scoreData, setScoreData] = useState<any | null>(null);

  useEffect(() => {
    if (!examId) return;
    let mounted = true;
    async function fetchData(id: string) {
      try {
        const res = await getExamScore(id);
        setScoreData(res?.data ?? null);
      } catch (e) {
        // ignore score fetch errors, UI will just show generic success
      }
    }
    fetchData(examId);
    return () => {
      mounted = false;
    };
  }, [examId]);

  return (
    <div>
      {scoreData ? (
        <ExamDetails scoreData={scoreData} />
      ) : (
        <p className="text-sm text-gray-600">Results will be available soon.</p>
      )}
    </div>
  );
};

export default DetailsExam;
