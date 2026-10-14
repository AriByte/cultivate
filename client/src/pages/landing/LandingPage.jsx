import React from 'react';
import { HeroSection } from './HeroSection';
import { SimulatorPreviewSection } from './SimulatorPreviewSection';
import { CorePillarsSection } from './CorePillarsSection';
import { CoursesPreviewSection } from './CoursesPreviewSection';
import { CropsShowcaseSection } from './CropsShowcaseSection';
import { HowItWorksSection } from './HowItWorksSection';
import { CtaBannerSection } from './CtaBannerSection';

export const LandingPage = () => {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <SimulatorPreviewSection />
      <CorePillarsSection />
      <CoursesPreviewSection />
      <CropsShowcaseSection />
      <HowItWorksSection />
      <CtaBannerSection />
    </div>
  );
};
