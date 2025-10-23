import  updateExam  from "@/components/updateExam/updateExam"
import ProtectedRoute from "@/components/guard/ProtectPages"


const UpdateExam=()=>{
  
  return(
    <>
    <ProtectedRoute>
    <UpdateExam/>
    </ProtectedRoute>
    </>
  
  )


}


export default updateExam