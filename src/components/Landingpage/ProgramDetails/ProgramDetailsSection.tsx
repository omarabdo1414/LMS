
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

export default function ProgramDetailsSection (){
  return (
    <section className="py-20 bg-card border-t border-border w-[95%] mx-auto" id='details'>
      <div className=" px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground">How It Works</h2>
          <p className="text-lg text-muted-foreground mt-2">A simple and clear path to success.</p>
        </div>
        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative ">
            {steps.map((step, index) => (
              <div key={index} className="text-center bg-background p-6 rounded-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                <div className="text-5xl font-bold text-accent  mb-4">{step.number}</div>
                <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
