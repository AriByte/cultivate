import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Sparkles, CheckCircle2, Droplets, HeartPulse, DollarSign, Calendar, Sprout } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 lg:pt-16 lg:pb-28">
      {/* Subtle organic background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none -z-10">
        <div className="absolute top-[-15%] right-[-5%] w-96 h-96 rounded-full bg-[#10B981]/5 blur-3xl" />
        <div className="absolute top-[20%] left-[-10%] w-96 h-96 rounded-full bg-[#8B5A2B]/5 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46] text-xs sm:text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4 text-[#10B981]" />
              <span>Interactive LMS + 2D Virtual Farm Simulator</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-[#0E2A1E] font-['Plus_Jakarta_Sans',sans-serif] tracking-tight leading-[1.12] mb-6">
              Master Organic Agriculture. <br className="hidden sm:inline" />
              <span className="text-[#143D2B] bg-linear-to-r from-[#143D2B] via-[#1B4D36] to-[#10B981] bg-clip-text text-transparent">
                From Soil Science to Virtual Harvest.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8 max-w-2xl font-normal">
              Learn regenerative biological principles through structured courses, then test your decisions in our deterministic, turn-based 2D farm simulator. Manage soil microorganisms, water schedules, and pest risks—risk-free.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-10">
              <Link to="/simulator">
                <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-md" icon={ArrowRight} iconPosition="right">
                  Launch Virtual Farm
                </Button>
              </Link>
              <a href="#courses">
                <Button variant="outline" size="lg" className="w-full sm:w-auto" icon={BookOpen} iconPosition="left">
                  Explore Courses
                </Button>
              </a>
            </div>

            {/* Key Trust Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-[#E5EAE5] w-full text-xs sm:text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                <span>5 Core Food Crops</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                <span>Turn-Based 'Next Day'</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                <span>Zero Synthetic Chemicals</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Simulator Preview Showcase Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative shadow glow */}
              <div className="absolute -inset-1 bg-linear-to-r from-[#10B981]/20 to-[#8B5A2B]/20 rounded-3xl blur-xl opacity-70" />

              {/* Main Card Shell */}
              <div className="relative bg-white rounded-3xl border border-[#DCE4DC] shadow-xl overflow-hidden">
                {/* Simulator Card Top HUD */}
                <div className="bg-[#0E2A1E] text-white px-5 py-4 flex items-center justify-between border-b border-[#1B4D36]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">Live Virtual Plot</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1 bg-[#143D2B] px-2.5 py-1 rounded-md border border-[#1F4A37]">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      <strong>Day 14</strong> / 60
                    </span>
                    <span className="flex items-center gap-1 bg-[#143D2B] px-2.5 py-1 rounded-md border border-[#1F4A37]">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                      <strong>$920</strong>
                    </span>
                  </div>
                </div>

                {/* Simulated 2D Crop Plot Visualizer */}
                <div className="p-6 bg-[#FBFBF9] border-b border-[#EAEFEA]">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-sm font-bold text-[#0E2A1E]">Heritage Beefsteak Tomato</h4>
                      <p className="text-xs text-gray-500">Stage: Vegetative Foliage</p>
                    </div>
                    <Badge variant="emerald" size="sm">Optimal Condition</Badge>
                  </div>

                  {/* 2D Soil Plot Visualization Bed */}
                  <div className="relative h-44 rounded-2xl bg-linear-to-b from-[#78350F]/15 via-[#8B5A2B]/20 to-[#451A03]/30 border-2 border-dashed border-[#8B5A2B]/40 flex flex-col items-center justify-center p-4 overflow-hidden">
                    {/* Simulated Plants in Row */}
                    <div className="flex items-end justify-center gap-6 z-10">
                      {[1, 2, 3].map((plantIndex) => (
                        <div key={plantIndex} className="flex flex-col items-center">
                          <div className="w-10 h-10 rounded-full bg-[#10B981]/20 flex items-center justify-center text-[#143D2B] border border-[#10B981]/40 shadow-xs mb-1">
                            <Sprout className="w-6 h-6 text-[#10B981]" />
                          </div>
                          <div className="w-3 h-1 bg-[#8B5A2B] rounded-full" />
                        </div>
                      ))}
                    </div>
                    
                    {/* Soil Texture Floor Indicator */}
                    <div className="absolute bottom-0 inset-x-0 h-10 bg-[#78350F]/20 flex items-center justify-center text-[11px] font-semibold text-[#78350F] tracking-wide">
                      Rich Living Loam • Active Worm Casting
                    </div>
                  </div>
                </div>

                {/* Real-time Metric Gauges */}
                <div className="p-5 grid grid-cols-3 gap-3 bg-white">
                  <div className="bg-[#F0FDF4] p-3 rounded-xl border border-[#DCFCE7] text-center">
                    <span className="text-[11px] font-semibold text-gray-600 block mb-1">Soil Health</span>
                    <span className="text-base font-extrabold text-[#065F46] flex items-center justify-center gap-1">
                      <HeartPulse className="w-3.5 h-3.5 text-[#10B981]" /> 82%
                    </span>
                  </div>

                  <div className="bg-[#F0F9FF] p-3 rounded-xl border border-[#E0F2FE] text-center">
                    <span className="text-[11px] font-semibold text-gray-600 block mb-1">Moisture</span>
                    <span className="text-base font-extrabold text-[#0369A1] flex items-center justify-center gap-1">
                      <Droplets className="w-3.5 h-3.5 text-[#0284C7]" /> 65%
                    </span>
                  </div>

                  <div className="bg-[#FEFCE8] p-3 rounded-xl border border-[#FEF08A] text-center">
                    <span className="text-[11px] font-semibold text-gray-600 block mb-1">Pest Hazard</span>
                    <span className="text-base font-extrabold text-[#A16207]">Low (15%)</span>
                  </div>
                </div>

                {/* Interactive Simulation Action Preview Footer */}
                <div className="px-5 py-3.5 bg-[#F9FAF8] border-t border-[#EAEFEA] flex items-center justify-between text-xs text-gray-600">
                  <span className="text-gray-500">Action: Apply Organic Compost</span>
                  <Link to="/simulator" className="text-[#10B981] font-bold hover:underline inline-flex items-center gap-1">
                    Try Simulation <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
