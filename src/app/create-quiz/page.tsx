"use client";

import ProtectedRoute from "@/components/guard/ProtectPages";
import Quiz from "@/components/create-qiuz";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { roles } from "@/constants/enums";
import { AlertCircle } from "lucide-react";

function CreateQuiz() {
    const { userData } = useSelector((state: RootState) => state.user);

    // Check if user is admin or super admin
    const isAdmin = true //userData?.role === roles.ADMIN || userData?.role === roles.SUPER_ADMIN;

    return (
        <ProtectedRoute>
            <section>
                {isAdmin ? (
                    <Quiz />
                ) : (
                    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
                        <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
                            <div className="flex justify-center mb-4">
                                <div className="bg-red-100 rounded-full p-3">
                                    <AlertCircle className="w-8 h-8 text-red-600" />
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
                            <p className="text-gray-600 mb-6">
                                Only administrators can create and manage questions. Please contact your administrator if you believe this is an error.
                            </p>
                            <a 
                                href="/home" 
                                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
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