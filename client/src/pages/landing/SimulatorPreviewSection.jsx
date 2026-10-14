import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sprout, DollarSign, Calendar, RefreshCw, Check, Sun } from 'lucide-react';
import { SectionHeading } from '../../components/common/SectionHeading';
import { Button } from '../../components/common/Button';

export const SimulatorPreviewSection = () => {
  // Interactive state simulating client-side preview
  const initialState = {
    day: 14,
    stage: 'Vegetative Growth',
    budget: 920,
    soilHealth: 78,
    moisture: 42,
    cropHealth: 90,
    pestRisk: 30,
    actionLog: 'Initialized Day 14. Soil is slightly dry. Consider irrigation or organic compost before advancing.',
    lastAction: null,
  };

  const [farm, setFarm] = useState(initialState);
  const [notification, setNotification] = useState(null);

  const applyAction = (type) => {
    if (type === 'compost') {
      if (farm.budget < 35) return;
      setFarm((prev) => ({
        ...prev,
        soilHealth: Math.min(100, prev.soilHealth + 12),
        cropHealth: Math.min(100, prev.cropHealth + 4),
        budget: prev.budget - 35,
        lastAction: 'compost',
        actionLog: 'Applied aerated vermicompost: Active bacteria and humic acids elevated soil health by +12%. (-$35)',
      }));
      showNotification('Soil enriched with organic compost! (+12% Soil Health)', 'success');
    } else if (type === 'irrigate') {
      if (farm.budget < 15) return;
      setFarm((prev) => ({
        ...prev,
        moisture: Math.min(100, prev.moisture + 30),
        cropHealth: Math.min(100, prev.cropHealth + 5),
        budget: prev.budget - 15,
        lastAction: 'irrigate',
        actionLog: 'Precision drip irrigation delivered: Root hydration restored to optimal level (+30% Moisture). (-$15)',
      }));
      showNotification('Drip irrigation applied! (+30% Moisture)', 'success');
    } else if (type === 'neem') {
      if (farm.budget < 25) return;
      setFarm((prev) => ({
        ...prev,
        pestRisk: Math.max(5, prev.pestRisk - 20),
        budget: prev.budget - 25,
        lastAction: 'neem',
        actionLog: 'Applied cold-pressed neem seed oil: Repelled soft-bodied leaf pests with zero synthetic toxicity (-20% Pest Risk). (-$25)',
      }));
      showNotification('Neem bio-spray applied! (-20% Pest Risk)', 'success');
    } else if (type === 'next-day') {
      const newDay = farm.day + 1;
      const newMoisture = Math.max(5, farm.moisture - 14);
      let newHealth = farm.cropHealth;
      let alertMessage = null;

      if (newMoisture < 20) {
        newHealth = Math.max(30, newHealth - 8);
        alertMessage = 'Water deficit stress! Leaves are slightly wilting due to low soil moisture.';
      }

      const newStage = newDay >= 25 ? 'Flowering Stage' : newDay >= 15 ? 'Vegetative Bush' : 'Seedling';

      setFarm((prev) => ({
        ...prev,
        day: newDay,
        stage: newStage,
        moisture: newMoisture,
        cropHealth: newHealth,
        pestRisk: Math.min(85, prev.pestRisk + 3),
        lastAction: 'next-day',
        actionLog: `Advanced to Day ${newDay}. Crops consumed 14% water. ${alertMessage || 'Growth continues normally.'}`,
      }));

      showNotification(`Advanced to Day ${newDay}! Plant growth updated.`, 'info');
    }
  };

  const showNotification = (msg, type) => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3500);
  };

  const resetSimulator = () => {
    setFarm(initialState);
    setNotification(null);
  };

  return (
    <section id="simulator" className="py-16 sm:py-24 bg-[#F4F6F3] border-y border-[#E5EAE5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Interactive 2D Simulation"
          title="Try the Turn-Based Farm Engine"
          description="Test your agricultural decision-making right now. Take real organic farming actions below and watch how our deterministic rules instantly update the virtual farm state."
        />

        {/* Simulator Studio Box */}
        <div className="bg-white rounded-3xl border border-[#D5DDD5] shadow-lg overflow-hidden max-w-5xl mx-auto">
          {/* Top HUD Bar */}
          <div className="bg-[#0E2A1E] text-white px-5 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-3 border-b border-[#1B4D36]">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-[#10B981] animate-pulse" />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white tracking-wide">Plot #1 • Heritage Tomato</span>
                <span className="text-xs text-emerald-400 font-medium">{farm.stage}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4 text-xs font-semibold">
              <div className="flex items-center gap-1.5 bg-[#143D2B] px-3 py-1.5 rounded-lg border border-[#1F4A37]">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>Day {farm.day}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#143D2B] px-3 py-1.5 rounded-lg border border-[#1F4A37]">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <span>${farm.budget.toFixed(2)}</span>
              </div>
              <button
                onClick={resetSimulator}
                title="Reset Simulation"
                className="p-1.5 rounded-lg bg-[#143D2B] hover:bg-[#1B4D36] text-gray-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Reset simulation preview"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Farm Body */}
          <div className="p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Visual 2D Canvas */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              {/* Visual Plot Surface */}
              <div className="relative rounded-2xl bg-linear-to-b from-[#8B5A2B]/15 via-[#78350F]/25 to-[#451A03]/35 border-2 border-dashed border-[#8B5A2B]/40 p-6 flex flex-col items-center justify-between min-h-[220px] overflow-hidden">
                {/* Weather condition tag */}
                <div className="w-full flex items-center justify-between text-xs z-10">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/90 text-amber-800 font-medium backdrop-blur-xs">
                    <Sun className="w-3.5 h-3.5 text-amber-500" /> Sunny • 26°C
                  </span>
                  <span className="text-xs font-semibold text-[#5C2406] bg-white/80 px-2.5 py-1 rounded-md">
                    Target Harvest: Day 50
                  </span>
                </div>

                {/* Simulated Plants in Row */}
                <div className="flex items-end justify-center gap-6 sm:gap-8 my-auto z-10">
                  {[1, 2, 3].map((idx) => (
                    <motion.div
                      key={idx}
                      animate={farm.lastAction ? { scale: [1, 1.08, 1] } : {}}
                      transition={{ duration: 0.35 }}
                      className="flex flex-col items-center"
                    >
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#10B981]/25 border border-[#10B981]/40 flex items-center justify-center text-[#143D2B] shadow-sm mb-1.5">
                        <Sprout className="w-7 h-7 sm:w-8 sm:h-8 text-[#10B981]" />
                      </div>
                      <span className="text-[11px] font-bold text-[#451A03]">Tomato #{idx}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Dynamic Soil Status Bar */}
                <div className="w-full text-center text-xs font-medium text-[#78350F] bg-white/90 py-1.5 px-3 rounded-lg z-10 flex items-center justify-between">
                  <span>Soil Moisture: {farm.moisture}%</span>
                  <span className={farm.moisture < 25 ? 'text-red-600 font-bold' : 'text-emerald-700'}>
                    {farm.moisture < 25 ? '⚠️ High Dehydration' : 'Moisture Adequate'}
                  </span>
                </div>
              </div>

              {/* Dynamic Action Log Message */}
              <div className="bg-[#FBFBF9] border border-[#E5EAE5] rounded-xl p-3.5 text-xs text-gray-700 flex items-start gap-2.5">
                <span className="font-bold text-[#0E2A1E] shrink-0 mt-0.5">Educational Insight:</span>
                <p className="leading-relaxed">{farm.actionLog}</p>
              </div>
            </div>

            {/* Right Column: Gauges & Command Deck */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              {/* Gauges Grid */}
              <div className="grid grid-cols-2 gap-3">
                {/* Soil Health */}
                <div className="bg-[#F0FDF4] border border-[#DCFCE7] p-3 rounded-xl">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-gray-600">Soil Vitality</span>
                    <span className="font-bold text-[#065F46]">{farm.soilHealth}%</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#10B981] h-full rounded-full transition-all duration-300" style={{ width: `${farm.soilHealth}%` }} />
                  </div>
                </div>

                {/* Moisture */}
                <div className="bg-[#F0F9FF] border border-[#E0F2FE] p-3 rounded-xl">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-gray-600">Moisture</span>
                    <span className="font-bold text-[#0369A1]">{farm.moisture}%</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#0284C7] h-full rounded-full transition-all duration-300" style={{ width: `${farm.moisture}%` }} />
                  </div>
                </div>

                {/* Crop Health */}
                <div className="bg-[#FAF5FF] border border-[#F3E8FF] p-3 rounded-xl">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-gray-600">Crop Health</span>
                    <span className="font-bold text-[#6B21A8]">{farm.cropHealth}%</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#9333EA] h-full rounded-full transition-all duration-300" style={{ width: `${farm.cropHealth}%` }} />
                  </div>
                </div>

                {/* Pest Risk */}
                <div className="bg-[#FFFBEB] border border-[#FEF3C7] p-3 rounded-xl">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-gray-600">Pest Hazard</span>
                    <span className="font-bold text-[#92400E]">{farm.pestRisk}%</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#F59E0B] h-full rounded-full transition-all duration-300" style={{ width: `${farm.pestRisk}%` }} />
                  </div>
                </div>
              </div>

              {/* Action Buttons Deck */}
              <div className="flex flex-col gap-2 pt-1">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Select Organic Action
                </span>

                <button
                  type="button"
                  onClick={() => applyAction('compost')}
                  className="w-full flex items-center justify-between p-3 rounded-xl border border-[#D5DDD5] hover:border-[#10B981] hover:bg-[#F0FDF4] transition-all text-left cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#FEF3C7] text-[#92400E] flex items-center justify-center font-bold text-xs shrink-0">
                      🌱
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0E2A1E]">Apply Vermicompost</div>
                      <div className="text-[11px] text-gray-500">+12% Soil Health • Microbe Boost</div>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-[#78350F] bg-[#FEF3C7] px-2 py-1 rounded-md">$35</span>
                </button>

                <button
                  type="button"
                  onClick={() => applyAction('irrigate')}
                  className="w-full flex items-center justify-between p-3 rounded-xl border border-[#D5DDD5] hover:border-[#0284C7] hover:bg-[#F0F9FF] transition-all text-left cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#E0F2FE] text-[#0369A1] flex items-center justify-center font-bold text-xs shrink-0">
                      💧
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0E2A1E]">Drip Irrigation Run</div>
                      <div className="text-[11px] text-gray-500">+30% Root Hydration</div>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-[#0369A1] bg-[#E0F2FE] px-2 py-1 rounded-md">$15</span>
                </button>

                <button
                  type="button"
                  onClick={() => applyAction('neem')}
                  className="w-full flex items-center justify-between p-3 rounded-xl border border-[#D5DDD5] hover:border-[#F59E0B] hover:bg-[#FFFBEB] transition-all text-left cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#FEF3C7] text-[#B45309] flex items-center justify-center font-bold text-xs shrink-0">
                      🐞
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0E2A1E]">Cold-Pressed Neem Spray</div>
                      <div className="text-[11px] text-gray-500">-20% Aphid & Pest Hazard</div>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-[#B45309] bg-[#FEF3C7] px-2 py-1 rounded-md">$25</span>
                </button>

                {/* Primary CTA: "Advance to Next Day" button */}
                <div className="mt-2 pt-2 border-t border-gray-100">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => applyAction('next-day')}
                    className="w-full shadow-md py-3 font-bold"
                  >
                    ⏩ Advance to Next Day (Day {farm.day + 1})
                  </Button>
                  <p className="text-[11px] text-center text-gray-500 mt-1.5">
                    Simulates 24-hr biological cycle, water evaporation, and plant growth.
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Interactive Floating Notification */}
          <AnimatePresence>
            {notification && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="bg-[#0E2A1E] text-white text-xs px-4 py-2.5 text-center font-semibold flex items-center justify-center gap-2 border-t border-[#1B4D36]"
              >
                <Check className="w-4 h-4 text-[#10B981]" />
                <span>{notification.msg}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
