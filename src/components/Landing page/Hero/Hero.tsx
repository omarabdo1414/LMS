import React from "react";
import Image from "next/image";

export default function Hero() {
  return (
    <>
      
      <section className="container mx-auto py-16 px-6 bg-[rgba(255,255,255,0.95)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
         
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--main-hero)] leading-tight mb-6">
              Up your
              <span className="text-[var(--hover)]"> Skills</span> to 
              <span className="text-[var(--hover)]"> Advance</span> your 
              <span className="text-[var(--hover)]"> Career</span> path 
            </h1>

            <p className="text-lg text-[oklch(0.45_0.03_250)] mb-8">
              Start your learning journey with us today and join thousands of
              successful students.
            </p>

            <button className="px-6 py-3 bg-[var(--hover)] text-white font-semibold rounded-2xl shadow-md hover:bg-[var(--main-hero)] transition-all">
              Get Started
            </button>
          </div>

          
          <div className="flex justify-center items-center">
            <Image
              src="/Images/hero-image.jpg"
              alt="A person enhancing their skills on a laptop"
              width={800}
              height={900}
              className="rounded-2xl shadow-2xl object-cover"
              priority
            />
          </div>
        </div>
      </section>

     
      <section className="bg-card border-t border-b border-border py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <h2 className="text-5xl font-bold text-[var(--hover)] mb-2">
                +5000
              </h2>
              <p className="font-semibold text-[var(--main-hero)]">
                Trained Students
              </p>
            </div>
            <div className="p-6">
              <h2 className="text-5xl font-bold text-[var(--hover)] mb-2">
                +100
              </h2>
              <p className="font-semibold text-[var(--main-hero)]">
                Available Courses
              </p>
            </div>
            <div className="p-6">
              <h2 className="text-5xl font-bold text-[var(--hover)] mb-2">
                95%
              </h2>
              <p className="font-semibold text-[var(--main-hero)]">
                Student Satisfaction
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
