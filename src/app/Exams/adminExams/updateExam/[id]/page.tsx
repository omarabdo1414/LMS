import  updateExam  from "@/components/updateExam/updateExam"
import ProtectedRoute from "@/components/guard/ProtectPages"
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import NotAuth from "@/components/ui/NotAuth/NotAuth";

const UpdateExam=()=>{
  const { userData } = useSelector((state: RootState) => state.user);
  const isAdmin = userData?.role === "admin";
if(isAdmin){
  return(
    <>
    <ProtectedRoute>
    <UpdateExam/>
    </ProtectedRoute>
    </>
  )}else{
    <>
    <NotAuth/>
    </>
  }


}


export default updateExam