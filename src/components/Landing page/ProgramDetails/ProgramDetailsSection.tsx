import React from 'react';

const steps = [
  {
    number: '01',
    title: 'Register an Account',
    description: 'Create your free account in just a few minutes to get started.',
  },
  {
    number: '02',
    title: 'Choose Your Program',
    description: 'Browse our wide range of courses and select the one that fits your goals.',
  },
  {
    number: '03',
    title: 'Start Learning',
    description: 'Dive into the material, complete assignments, and track your progress.',
  },
];

export default function ProgramDetailsSection() {
  return (
    <section className="py-20 bg-[rgba(255,255,255,0.95)] border-t border-border" id="details">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[var(--hover)] mb-2">
            How It Works
          </h2>
          <p className="text-lg text-[oklch(0.45_0.03_250)] mt-2">
            A simple and clear path to success.
          </p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {steps.map((step, index) => (
              <div key={index} className="text-center bg-[rgba(255,255,255,0.95)] p-6 rounded-lg border border-border">
                <div className="text-5xl font-bold text-[var(--main-hero)] mb-4">{step.number}</div>
                <h3 className="text-xl font-bold text-[var(--hover)] mb-2">{step.title}</h3>
                <p className="text-[oklch(0.45_0.03_250)]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
