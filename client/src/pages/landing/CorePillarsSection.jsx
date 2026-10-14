import React from 'react';
import { BarChart3, Award, Sprout, Layers } from 'lucide-react';
import { SectionHeading } from '../../components/common/SectionHeading';
import { Card } from '../../components/common/Card';

export const CorePillarsSection = () => {
  const pillars = [
    {
      icon: Sprout,
      color: '#10B981',
      bgColor: '#ECFDF5',
      title: 'Living Soil Regeneration',
      description: 'Move beyond synthetic fertilizers. Master aerobic composting, mycorrhizal fungi colonization, and green manures to cultivate long-term soil vitality.',
      metric: '100% Synthetic-Free'
    },
    {
      icon: Layers,
      color: '#8B5A2B',
      bgColor: '#FEFCE8',
      title: 'Deterministic Turn Engine',
      description: 'Experience real consequences without losing an entire season. Our rule engine updates water, soil nitrogen, and pest vulnerability with every daily tick.',
      metric: 'Turn-Based Day Engine'
    },
    {
      icon: BarChart3,
      color: '#0284C7',
      bgColor: '#F0F9FF',
      title: 'Holistic Farm Economics',
      description: 'Balance inputs against harvested yield. Evaluate working capital, input costs, and projected organic market revenues to build viable farming operations.',
      metric: 'Cost vs. Yield Modeling'
    },
    {
      icon: Award,
      color: '#F59E0B',
      bgColor: '#FFFBEB',
      title: 'Gamified Academic Progression',
      description: 'Solidify theoretical knowledge with objective quizzes, unlock sustainability badges, and climb the class leaderboard as your agronomic mastery grows.',
      metric: 'XP, Levels & Badges'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Pedagogical Philosophy"
          title="Bridging Agricultural Science & Virtual Practice"
          description="TerraLearn is designed from the ground up to make complex ecological relationships intuitive, memorable, and measurable for modern learners."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <Card
                key={pillar.title}
                interactive
                className="flex flex-col justify-between h-full p-6 sm:p-7 border border-[#E5EAE5] bg-[#FBFBF9]"
              >
                <div>
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 shadow-2xs"
                    style={{ backgroundColor: pillar.bgColor, color: pillar.color }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-[#0E2A1E] font-['Plus_Jakarta_Sans',sans-serif] mb-2.5">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-gray-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200/80 flex items-center justify-between text-xs font-semibold text-gray-500">
                  <span>Feature</span>
                  <span className="text-[#143D2B] font-bold">{pillar.metric}</span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
