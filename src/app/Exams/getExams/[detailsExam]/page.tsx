"use client";
import React, { useEffect, useState } from "react";
import ExamDetails from "@/components/ExamDetails/ExamDetails";
import { getExamScore } from "@/Apis/studentExam/getScore";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import NotAuth from "@/components/ui/NotAuth/NotAuth";

const DetailsExam = () => {
  
  const { userData } = useSelector((state: RootState) => state.user);
  const isAdmin = userData?.role === "admin";


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
if (isAdmin){ return (

    <div>
      {scoreData ? (
        <ExamDetails scoreData={scoreData} />
      ) : (
        <p className="text-sm text-gray-600">Results will be available soon.</p>
      )}
    </div>
  );}else{
    return(
      <>
      <NotAuth/>
      </>
    )
  }
};

export default DetailsExam;
