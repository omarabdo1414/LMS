import React from 'react';
import { BookOpen, Video, Users, Award } from 'lucide-react';
const features = [
  {
    icon: <BookOpen className="w-10 h-10 text-accent" />,
    title: 'High-Quality Content',
    description: 'Access courses and materials prepared by industry experts.',
  },
  {
    icon: <Video className="w-10 h-10 text-accent" />,
    title: 'Interactive Learning',
    description: 'Engage with interactive videos, quizzes, and hands-on projects.',
  },
  {
    icon: <Users className="w-10 h-10 text-accent" />,
    title: 'Community Support',
    description: 'Join a vibrant community of learners and mentors for support.',
  },
  {
    icon: <Award className="w-10 h-10 text-accent" />,
    title: 'Verified Certificates',
    description: 'Earn certificates upon completion to showcase your new skills.',
  },
];
export default function BenefitsSection() {
  return (
    <>
    <section className="py-20 bg-background" id='benefits'>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground">Why Choose Us?</h2>
          <p className="text-lg text-muted-foreground mt-2">The best features to help you learn and grow.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 cursor-pointer">
          {features.map((feature, index) => (
            <div key={index} className="bg-card p-8 rounded-lg border border-border text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ">
              <div className="flex justify-center items-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  )
}
