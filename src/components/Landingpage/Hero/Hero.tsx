import React from 'react'
import Image from 'next/image';
export default function Hero() {
return (
    <>
    <section className="w-[95%] mx-auto py-10 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
            <div className="text-center md:text-left">
            <h1 className="text-2xl lg:text-6xl font-semibold text-foreground leading-tight mb-6">
            Up your <span className="text-accent ">Skills</span> to <span className="text-accent ">Advance</span> your <span className="text-accent ">Career</span> path
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
                Start your learning journey with us today and join thousands of successful students.
            </p>
        </div>
    <div className="flex justify-center items-center">
        <Image 
        src="/Images/hero-image.jpg"
        alt="A person enhancing their skills on a laptop"
        width={800}
        height={900}
        className="rounded-lg shadow-2xl object-cover"
        priority 
        />
    </div>
</div>
</section>

    {/* Statistics Section */}
    <section className="bg-card border-t border-b border-border py-16 w-[95%] mx-auto ">
        <div className="px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="p-6">
                    <h2 className="text-5xl font-bold text-accent  mb-2">+5000</h2>
                    <p className="font-semibold text-muted-foreground">Trained Students</p>
                </div>
                <div className="p-6">
                    <h2 className="text-5xl font-bold text-accent  mb-2">+100</h2>
                    <p className="font-semibold text-muted-foreground">Available Courses</p>
                </div>
                <div className="p-6">
                    <h2 className="text-5xl font-bold text-accent  mb-2">95%</h2>
                    <p className="font-semibold text-muted-foreground">Student Satisfaction</p>
                </div>
            </div>
        </div>
    </section>
    </>
    )
}
