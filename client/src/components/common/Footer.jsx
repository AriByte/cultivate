import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, ShieldCheck, ExternalLink } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#0E2A1E] text-gray-300 pt-16 pb-12 border-t border-[#1B4D36]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[#1F4A37]">
          {/* Brand Info */}
          <div className="lg:col-span-2 flex flex-col">
            <Link to="/" className="flex items-center gap-2.5 text-white font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-xl tracking-tight mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#10B981] flex items-center justify-center text-white">
                <Sprout className="w-5 h-5" />
              </div>
              <span>TerraLearn</span>
            </Link>
            <p className="text-sm text-gray-300 leading-relaxed max-w-sm mb-6">
              A dedicated academic learning management and 2D virtual simulation platform teaching sustainable, chemical-free agriculture through science-backed practice.
            </p>
            <div className="inline-flex items-center gap-2 text-xs text-[#34D399] bg-[#143D2B] px-3 py-1.5 rounded-lg border border-[#1B4D36] w-fit">
              <ShieldCheck className="w-4 h-4 shrink-0 text-[#10B981]" />
              <span>Aligned with IEEE Academic SRS v1.0</span>
            </div>
          </div>

          {/* Learning Pillars */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4 font-['Plus_Jakarta_Sans',sans-serif]">
              Curriculum
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#courses" className="hover:text-white transition-colors">Living Soil Systems</a>
              </li>
              <li>
                <a href="#courses" className="hover:text-white transition-colors">Organic Pest Defense</a>
              </li>
              <li>
                <a href="#courses" className="hover:text-white transition-colors">Water & Drip Stewardship</a>
              </li>
              <li>
                <a href="#courses" className="hover:text-white transition-colors">Crop Rotation Science</a>
              </li>
            </ul>
          </div>

          {/* Virtual Simulator */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4 font-['Plus_Jakarta_Sans',sans-serif]">
              2D Simulator
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/simulator" className="hover:text-white transition-colors">Active Virtual Farm</Link>
              </li>
              <li>
                <a href="#crops" className="hover:text-white transition-colors">The 5 Approved Crops</a>
              </li>
              <li>
                <a href="#simulator" className="hover:text-white transition-colors">Day-by-Day Turn Engine</a>
              </li>
              <li>
                <Link to="/leaderboard" className="hover:text-white transition-colors">Quiz & Course Rankings</Link>
              </li>
            </ul>
          </div>

          {/* Academic Architecture */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4 font-['Plus_Jakarta_Sans',sans-serif]">
              System Info
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <span className="text-gray-400">Stack: MERN Full-Stack</span>
              </li>
              <li>
                <span className="text-gray-400">Engine: Deterministic 2D</span>
              </li>
              <li>
                <Link to="/admin" className="hover:text-white transition-colors inline-flex items-center gap-1 text-[#34D399]">
                  <span>Admin Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>
            © 2026 TerraLearn. Academic Educational & Simulation Project.
          </p>
          <p className="text-center md:text-right max-w-xl text-gray-400">
            <strong>Educational Disclaimer (SRS 5.2):</strong> All simulation metrics, financial returns, and crop yields are instructional estimates for practice and do not replace professional on-site agricultural agronomy.
          </p>
        </div>
      </div>
    </footer>
  );
};
