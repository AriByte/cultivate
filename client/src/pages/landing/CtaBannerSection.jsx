import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sprout, BookOpen, ShieldCheck } from 'lucide-react';
import { Button } from '../../components/common/Button';

export const CtaBannerSection = () => {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-linear-to-br from-[#0E2A1E] via-[#143D2B] to-[#1B4D36] text-white p-8 sm:p-14 lg:p-16 overflow-hidden shadow-xl border border-[#1F4A37]">
          {/* Subtle botanical glow backdrop */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#10B981]/15 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#8B5A2B]/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/20 border border-[#10B981]/30 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-6">
              <Sprout className="w-3.5 h-3.5 text-[#10B981]" />
              <span>Begin Your Ecological Apprenticeship</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Plus_Jakarta_Sans',sans-serif] tracking-tight leading-tight mb-5">
              Ready to Cultivate Your First Virtual Organic Plot?
            </h2>

            <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed mb-8 max-w-2xl">
              Choose between Heritage Tomatoes, Durum Wheat, or Sweet Corn. Experience how organic stewardship protects biodiversity while generating viable crop harvests.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link to="/simulator">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto shadow-md" icon={ArrowRight} iconPosition="right">
                  Launch Free Simulator
                </Button>
              </Link>
              <Link to="/courses">
                <Button variant="white" size="lg" className="w-full sm:w-auto" icon={BookOpen} iconPosition="left">
                  Browse Courses
                </Button>
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t border-[#1F4A37] flex items-center gap-2 text-xs text-emerald-300/80">
              <ShieldCheck className="w-4 h-4 text-[#10B981]" />
              <span>Free Academic Platform • Zero Synthetic Additives • Deterministic Engine</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
