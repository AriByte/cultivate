import React from 'react';
import { Calendar, DollarSign, CloudSun, Sprout, HeartPulse, RefreshCw, ArrowRight } from 'lucide-react';
import { Button } from '../../../components/common/Button';

export const FarmStatusHUD = ({
  farm,
  onAdvanceDay,
  onReset,
  isAdvancing = false
}) => {
  const plantedCount = farm.tiles.filter((t) => t.plantedCrop !== null).length;
  const readyToHarvestCount = farm.tiles.filter(
    (t) => t.plantedCrop && t.plantedCrop.readyToHarvest
  ).length;

  const avgSoil = Math.round(
    farm.tiles.reduce((acc, t) => acc + t.soilHealth, 0) / farm.tiles.length
  );

  const plantedTiles = farm.tiles.filter((t) => t.plantedCrop !== null);
  const avgHealth = plantedTiles.length > 0
    ? Math.round(plantedTiles.reduce((acc, t) => acc + t.plantedCrop.health, 0) / plantedTiles.length)
    : 100;

  return (
    <div className="bg-[#0E2A1E] text-white rounded-2xl border border-[#1B4D36] shadow-lg p-4 sm:p-5 mb-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        {/* Farm Title & Environment */}
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-linear-to-br from-[#10B981] to-[#059669] flex items-center justify-center text-white shadow-xs shrink-0">
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-extrabold text-white font-['Plus_Jakarta_Sans',sans-serif]">
                TerraLearn Organic Farm Studio
              </h1>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#143D2B] text-emerald-300 border border-[#1F4A37]">
                Live 2D Engine
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-300 mt-0.5">
              <CloudSun className="w-3.5 h-3.5 text-amber-400" />
              <span>{farm.weather.label}</span>
              <span className="text-gray-500">•</span>
              <span className="text-emerald-400 font-medium">{farm.season}</span>
            </div>
          </div>
        </div>

        {/* Central Key Gauges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full lg:w-auto text-xs">
          {/* Day Counter */}
          <div className="bg-[#143D2B] border border-[#1F4A37] rounded-xl px-3 py-2 flex flex-col justify-center">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold flex items-center gap-1">
              <Calendar className="w-3 h-3 text-amber-400" /> Timeline
            </span>
            <span className="text-sm font-bold text-white mt-0.5">
              Day {farm.day}
            </span>
          </div>

          {/* Budget */}
          <div className="bg-[#143D2B] border border-[#1F4A37] rounded-xl px-3 py-2 flex flex-col justify-center">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold flex items-center gap-1">
              <DollarSign className="w-3 h-3 text-emerald-400" /> Treasury
            </span>
            <span className="text-sm font-extrabold text-emerald-300 mt-0.5">
              ${farm.budget.toFixed(2)}
            </span>
          </div>

          {/* Planted Plots */}
          <div className="bg-[#143D2B] border border-[#1F4A37] rounded-xl px-3 py-2 flex flex-col justify-center">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
              Field Density
            </span>
            <span className="text-sm font-bold text-gray-200 mt-0.5">
              {plantedCount} / 12 Plots
              {readyToHarvestCount > 0 && (
                <span className="ml-1 text-[11px] text-amber-400 font-extrabold animate-pulse">
                  ({readyToHarvestCount} 🌾)
                </span>
              )}
            </span>
          </div>

          {/* Average Health / Soil */}
          <div className="bg-[#143D2B] border border-[#1F4A37] rounded-xl px-3 py-2 flex flex-col justify-center">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold flex items-center gap-1">
              <HeartPulse className="w-3 h-3 text-emerald-400" /> Vigor
            </span>
            <span className="text-sm font-bold text-white mt-0.5">
              {avgHealth}% <span className="text-[11px] text-gray-400 font-normal">(Soil {avgSoil}%)</span>
            </span>
          </div>
        </div>

        {/* Global Turn & Reset Actions */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={onReset}
            title="Reset Simulation to Initial Day 16 Baseline"
            className="p-2.5 rounded-xl bg-[#143D2B] hover:bg-[#1B4D36] text-gray-300 hover:text-white border border-[#1F4A37] transition-colors cursor-pointer text-xs font-semibold flex items-center gap-1.5 shrink-0"
            aria-label="Reset simulation"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <Button
            variant="primary"
            size="md"
            onClick={onAdvanceDay}
            disabled={isAdvancing}
            icon={ArrowRight}
            iconPosition="right"
            className="flex-1 sm:flex-initial shadow-md font-bold py-2.5 px-4 text-xs sm:text-sm"
          >
            {isAdvancing ? 'Advancing 24h...' : `Advance Day ⏩`}
          </Button>
        </div>
      </div>
    </div>
  );
};
