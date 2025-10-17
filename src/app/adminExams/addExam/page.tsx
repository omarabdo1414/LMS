



 import React from 'react'
 import ProtectedRoute from '@/components/guard/ProtectPages'
 import CreateExam from '@/components/createExams/createExam'

 
 const page = () => {
   return (
     <div>
       <ProtectedRoute> 
          <CreateExam/>
       </ProtectedRoute>
     </div>
   )
 }
 
 export default page
 
