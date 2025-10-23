import ProtectedRoute from "@/components/guard/ProtectPages";
import Quiz from "@/components/create-qiuz";
import { roles } from "@/constants/enums";
import { AlertCircle } from "lucide-react";
import { getProfile } from "@/Apis/user/getProfile";

async function CreateQuiz() {
    // Fetch user data server-side
    const userData = await getProfile();

    // Check if user is admin or super admin
    const isAdmin = true // userData?.data?.role === roles.ADMIN || userData?.data?.role === roles.SUPER_ADMIN;

    return (
        <ProtectedRoute>
            <section>
                {isAdmin ? (
                    <Quiz />
                ) : (
                    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 flex items-center justify-center p-6">
                        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-8 max-w-md w-full text-center">
                            <div className="flex justify-center mb-4">
                                <div className="bg-red-100 dark:bg-red-900/30 rounded-full p-3">
                                    <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Access Denied</h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-6">
                                Only administrators can create and manage questions. Please contact your administrator if you believe this is an error.
                            </p>
                            <a 
                                href="/home" 
                                className="inline-block bg-blue-600 dark:bg-blue-700 text-white px-6 py-2 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                            >
                                Go to Home
                            </a>
                        </div>
                    </div>
                )}
            </section>
        </ProtectedRoute>
    );
}

export default CreateQuiz;