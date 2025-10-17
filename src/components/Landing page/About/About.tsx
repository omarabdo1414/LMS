import React from 'react';
import { Target, Eye } from 'lucide-react';
import Image from 'next/image';

const teamMembers = [
  { name: 'Jane Doe', role: 'Founder & CEO', image: '/Images/student1.png' },
  { name: 'John Smith', role: 'Lead Instructor', image: '/Images/student2.png' },
  { name: 'Emily White', role: 'Community Manager', image: '/Images/student3.png' },
];

export default function About() {
  return (
    <div className="bg-[rgba(255,255,255,0.95)] min-h-screen text-[var(--main-hero)]" id="about">
      {/* Hero Section */}
      <header className="border-b border-border text-center py-16 px-6">
        <h1 className="text-5xl font-bold text-[var(--hover)]">About Us</h1>
        <p className="text-xl text-[oklch(0.45_0.03_250)] mt-4 max-w-3xl mx-auto">
          We are a team of passionate educators and technologists dedicated to making quality education accessible to everyone.
        </p>
      </header>

      <main>
        <section className="py-20">
          <div className="container mx-auto px-6 cursor-pointer">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Our Mission */}
              <div className="bg-card p-8 rounded-lg border border-border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="flex items-center mb-4">
                  <Target className="w-10 h-10 text-[var(--accent)] mr-4" />
                  <h2 className="text-2xl font-bold text-[var(--hover)]">Our Mission</h2>
                </div>
                <p className="text-[oklch(0.45_0.03_250)] text-lg">
                  To empower individuals with the knowledge and skills they need to succeed in a rapidly changing world, regardless of their background or location.
                </p>
              </div>

              {/* Our Vision */}
              <div className="bg-card p-8 rounded-lg border border-border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="flex items-center mb-4">
                  <Eye className="w-10 h-10 text-[var(--accent)] mr-4" />
                  <h2 className="text-2xl font-bold text-[var(--hover)]">Our Vision</h2>
                </div>
                <p className="text-[oklch(0.45_0.03_250)] text-lg">
                  To become the leading global platform for accessible, engaging, and effective online education, creating a community of lifelong learners.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-card border-t border-border">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[var(--hover)]">Meet The Team</h2>
              <p className="text-lg text-[oklch(0.45_0.03_250)] mt-2">The people behind the vision.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer"
                >
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="rounded-full object-cover border-4 border-[var(--main-hero)]"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--hover)]">{member.name}</h3>
                  <p className="text-[var(--accent)]">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
