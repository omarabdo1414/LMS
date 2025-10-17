"use client";
import React, { useEffect, useState } from "react";
import ExamResults from "@/components/ExamResults/ExamResults";
import { getExamRemainingTime } from "@/Apis/studentExam/getRemainingTime";

const DetailsExam = () => {
  const [scoreData, setScoreData] = useState<any | null>(null);

  useEffect(() => {
    let mounted = true;
    async function fetchData() {
      try {
        const res = await getExamRemainingTime();
        if (mounted) setScoreData(res ?? null);
      } catch (e) {
        // handle or ignore fetch error
        // console.error(e);
      }
    }
    fetchData();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div>
      {scoreData ? (
        <ExamResults scoreData={scoreData} />
      ) : (
        <p className="text-sm text-gray-600">Results will be available soon.</p>
      )}
    </div>
  );
};

export default DetailsExam;
