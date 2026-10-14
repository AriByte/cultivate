import React from 'react';
import { BookOpen, Layers, Award } from 'lucide-react';
import { SectionHeading } from '../../components/common/SectionHeading';

export const HowItWorksSection = () => {
  const steps = [
    {
      step: '01',
      title: 'Study the Biological Foundations',
      description: 'Explore curated lessons covering aerobic composting, microbial root guilds, water evaporation curves, and non-toxic pest barriers.',
      icon: BookOpen,
      badge: 'LMS Curriculum'
    },
    {
      step: '02',
      title: 'Make Daily Farm Decisions',
      description: 'Initialize a virtual plot, select your crop, and manage daily water and nutrient applications using the turn-based "Next Day" simulator.',
      icon: Layers,
      badge: '2D Virtual Simulator'
    },
    {
      step: '03',
      title: 'Harvest & Analyze Outcomes',
      description: 'Harvest mature crops, evaluate final yield kg vs. economic profit, and receive a comprehensive sustainability scorecard and XP.',
      icon: Award,
      badge: 'Gamification & Reports'
    }
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-[#F4F6F3] border-t border-[#E5EAE5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Structured Learning Flow"
          title="From Ecological Theory to Virtual Harvest"
          description="A continuous cycle of study, simulation, and reflection designed to build genuine agricultural intuition."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bg-white rounded-3xl p-7 sm:p-8 border border-[#D5DDD5] shadow-xs flex flex-col justify-between relative"
              >
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-[#10B981] font-['Plus_Jakarta_Sans',sans-serif] opacity-80">
                      {item.step}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#065F46] bg-[#ECFDF5] px-3 py-1 rounded-full border border-[#A7F3D0]">
                      {item.badge}
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-[#143D2B] text-white flex items-center justify-center mb-5 shadow-xs">
                    <Icon className="w-6 h-6 text-[#10B981]" />
                  </div>

                  <h3 className="text-lg font-bold text-[#0E2A1E] font-['Plus_Jakarta_Sans',sans-serif] mb-3">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-gray-100 text-xs font-semibold text-gray-500">
                  Step {index + 1} of 3 in Core Progression
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
