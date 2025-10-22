"use client";
import { GraduationCap, Loader, LoaderCircle } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
// loading page
export default function LoadingPage() {
  return (
    <div className="bg-background fixed top-0 right-0 left-0 bottom-0 z-50 flex justify-center items-center">
      <motion.div
        initial={{ scale: 0.99, opacity: 0.6 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
        className="w-[70px] h-[70px] bg-accent rounded-md flex justify-center items-center"
      >
        <GraduationCap className="w-12 h-12 text-white" />
      </motion.div>
    </div>
  );
}
