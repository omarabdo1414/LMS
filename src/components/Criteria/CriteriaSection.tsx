// src/components/CriteriaSection.tsx
import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const criteria = [
  'Strong passion for learning and self-development.',
  'Basic understanding of the field you are applying for.',
  'Commitment to complete the program and assignments.',
  'Ability to collaborate and work in a team environment.',
];
export default function CriteriaSection () {
  return (
    <section className="py-20 bg-background" id='criteria'>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-4">Selection Criteria</h2>
            <p className="text-lg text-muted-foreground mb-6">
              We are looking for dedicated and motivated individuals. Here are the key criteria we consider for admission into our programs.
            </p>
          </div>
          <div className="space-y-4">
            {criteria.map((item, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1 mr-3" />
                <span className="text-foreground text-lg">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
