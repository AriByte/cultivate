import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Droplets, Calendar, DollarSign, Activity, ArrowRight } from 'lucide-react';
import { SectionHeading } from '../../components/common/SectionHeading';
import { Button } from '../../components/common/Button';
import { MOCK_CROPS } from '../../data/mockCrops';

export const CropsShowcaseSection = () => {
  const [activeCropId, setActiveCropId] = useState(MOCK_CROPS[0].id);
  const activeCrop = MOCK_CROPS.find((c) => c.id === activeCropId) || MOCK_CROPS[0];

  return (
    <section id="crops" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Configured Botanical Catalog"
          title="The 5 Core Food Crops (SRS SIM-REQ-09)"
          description="Every crop features biologically calibrated parameters: distinct water consumption, soil vitality tolerances, pest pressures, and market values."
        />

        {/* Crop Selection Pill Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 max-w-3xl mx-auto">
          {MOCK_CROPS.map((crop) => (
            <button
              key={crop.id}
              onClick={() => setActiveCropId(crop.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-150 cursor-pointer flex items-center gap-2 border ${
                activeCropId === crop.id
                  ? 'bg-[#143D2B] text-white border-[#143D2B] shadow-sm'
                  : 'bg-[#FBFBF9] text-gray-700 hover:bg-[#F0FDF4] border-[#DCE4DC]'
              }`}
            >
              <Sprout className={`w-4 h-4 ${activeCropId === crop.id ? 'text-[#10B981]' : 'text-gray-400'}`} />
              <span>{crop.name}</span>
            </button>
          ))}
        </div>

        {/* Active Crop Detail Showcase Card */}
        <div className="bg-[#FBFBF9] rounded-3xl border border-[#D5DDD5] p-6 sm:p-10 shadow-xs max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Crop Identity & Stages */}
            <div className="md:col-span-7 flex flex-col">
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-md"
                  style={{ backgroundColor: activeCrop.bgColor, color: activeCrop.color }}
                >
                  {activeCrop.category}
                </span>
                <span className="text-xs italic text-gray-500 font-serif">
                  {activeCrop.scientificName}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0E2A1E] font-['Plus_Jakarta_Sans',sans-serif] mb-3">
                {activeCrop.name}
              </h3>

              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                {activeCrop.description}
              </p>

              {/* Lifecycle Growth Stages */}
              <div className="pt-4 border-t border-gray-200">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-2.5">
                  5 Lifecycle Stages:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeCrop.growthStages.map((stage, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-semibold bg-white border border-[#DCE4DC] text-[#143D2B] px-2.5 py-1 rounded-lg"
                    >
                      {i + 1}. {stage}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Agronomic Parameters Box */}
            <div className="md:col-span-5 bg-white rounded-2xl border border-[#D5DDD5] p-5 sm:p-6 shadow-2xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#143D2B] mb-4 pb-2 border-b border-gray-100 flex items-center justify-between">
                <span>Simulation Physics</span>
                <Activity className="w-3.5 h-3.5 text-[#10B981]" />
              </h4>

              <div className="space-y-3.5 text-xs">
                <div className="flex items-center justify-between py-1 border-b border-gray-50">
                  <span className="text-gray-500 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-amber-600" /> Full Growth Duration:
                  </span>
                  <strong className="text-[#0E2A1E] text-sm">{activeCrop.baseGrowthDays} Days</strong>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-gray-50">
                  <span className="text-gray-500 flex items-center gap-1.5">
                    <Droplets className="w-4 h-4 text-sky-600" /> Daily Water Need:
                  </span>
                  <strong className="text-[#0E2A1E] text-sm">{activeCrop.dailyWaterNeed}% / Day</strong>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-gray-50">
                  <span className="text-gray-500 flex items-center gap-1.5">
                    <Sprout className="w-4 h-4 text-emerald-600" /> Min. Soil Health:
                  </span>
                  <strong className="text-[#0E2A1E] text-sm">{activeCrop.optimalSoilHealthMin}%</strong>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-gray-50">
                  <span className="text-gray-500">Pest Hazard Susceptibility:</span>
                  <strong className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-bold">
                    {activeCrop.pestSusceptibility}
                  </strong>
                </div>

                <div className="flex items-center justify-between py-1">
                  <span className="text-gray-500 flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 text-emerald-600" /> Est. Market Value:
                  </span>
                  <strong className="text-emerald-700 text-sm font-bold">
                    ${activeCrop.marketPricePerKg.toFixed(2)} / kg
                  </strong>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-gray-100">
                <Link to="/simulator" className="w-full block">
                  <Button variant="primary" size="sm" className="w-full" icon={ArrowRight} iconPosition="right">
                    Plant {activeCrop.name}
                  </Button>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
