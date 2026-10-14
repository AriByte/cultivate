import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, ArrowLeft, Clock } from 'lucide-react';
import { Button } from '../components/common/Button';

export const PlaceholderPage = ({
  title = 'Module In Development',
  moduleName = 'Feature',
  description = 'This section is currently queued for implementation in the next step of Phase 1.',
  step = 'Next Step in Phase 1',
}) => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full bg-white rounded-3xl border border-[#D5DDD5] p-8 sm:p-10 text-center shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-[#ECFDF5] text-[#065F46] flex items-center justify-center mx-auto mb-6 border border-[#A7F3D0]">
          <Sprout className="w-8 h-8 text-[#10B981]" />
        </div>

        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#065F46] bg-[#ECFDF5] px-3 py-1 rounded-full border border-[#A7F3D0]">
            {step}
          </span>
          <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
            {moduleName}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0E2A1E] font-['Plus_Jakarta_Sans',sans-serif] mb-3">
          {title}
        </h1>

        <p className="text-sm text-gray-600 leading-relaxed mb-6">
          {description}
        </p>

        <div className="p-4 rounded-xl bg-[#FBFBF9] border border-[#EAEFEA] text-xs text-gray-500 mb-8 flex items-center justify-center gap-2">
          <Clock className="w-4 h-4 text-amber-500 shrink-0" />
          <span>Scheduled for incremental delivery per our Phase 1 development roadmap.</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/" className="flex-1">
            <Button variant="outline" size="md" className="w-full" icon={ArrowLeft} iconPosition="left">
              Return Home
            </Button>
          </Link>
          <a href="/#simulator" className="flex-1">
            <Button variant="primary" size="md" className="w-full">
              Try Simulator Demo
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};
