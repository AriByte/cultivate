import React, { useState } from 'react';
import { Sprout, Droplets, HeartPulse, Bug, Sparkles, RefreshCw } from 'lucide-react';
import { MOCK_CROPS } from '../../../data/mockCrops';
import { ACTION_COSTS } from '../../../services/farmSimulationService';
import { Button } from '../../../components/common/Button';

export const TileInspector = ({
  tile,
  budget,
  onOpenPlantModal,
  onIrrigate,
  onCompost,
  onNeemSpray,
  onAddCompanion,
  onHarvest,
  onClearCrop
}) => {
  const [showCompanionOptions, setShowCompanionOptions] = useState(false);

  if (!tile) {
    return (
      <div className="bg-white rounded-3xl border border-[#D5DDD5] p-6 shadow-sm text-center flex flex-col items-center justify-center min-h-[350px]">
        <div className="w-12 h-12 rounded-2xl bg-[#F4F6F3] flex items-center justify-center text-gray-400 mb-3">
          <Sprout className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-[#0E2A1E]">No Plot Selected</h3>
        <p className="text-xs text-gray-500 max-w-xs mt-1">
          Select any farm plot on the 2D grid to inspect soil conditions, plant crops, or apply organic amendments.
        </p>
      </div>
    );
  }

  const crop = tile.plantedCrop
    ? MOCK_CROPS.find((c) => c.id === tile.plantedCrop.cropId)
    : null;

  return (
    <div className="bg-white rounded-3xl border border-[#D5DDD5] p-5 sm:p-6 shadow-sm flex flex-col gap-5">
      {/* Inspector Header */}
      <div className="flex items-start justify-between border-b border-[#E5EAE5] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-md bg-[#0E2A1E] text-white font-mono text-xs font-bold">
              Plot {tile.label}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-[#0E2A1E]">
              {tile.plantedCrop ? tile.plantedCrop.name : 'Fallow Loam Bed'}
            </h3>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            {tile.plantedCrop && crop
              ? `${crop.category} • Day ${tile.plantedCrop.daysPlanted} of ${crop.baseGrowthDays}`
              : tile.previousCrop
              ? `Previous harvest: ${tile.previousCrop}`
              : 'Untilled fertile organic soil bed ready for seeding.'}
          </p>
        </div>

        {tile.plantedCrop && tile.plantedCrop.readyToHarvest && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-extrabold bg-amber-100 text-amber-800 border border-amber-300 animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Mature
          </span>
        )}
      </div>

      {/* Plant Condition Card (if planted) */}
      {tile.plantedCrop && crop && (
        <div className="bg-[#FAFBF9] border border-[#E5EAE5] rounded-2xl p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-gray-700">Growth Stage</span>
            <span className="font-bold text-[#0E2A1E]">
              {crop.growthStages[tile.plantedCrop.stageIndex] || 'Growing'} (Stage {tile.plantedCrop.stageIndex + 1}/{crop.growthStages.length})
            </span>
          </div>

          {/* Plant Health Bar */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-gray-600 font-medium flex items-center gap-1">
                <HeartPulse className="w-3.5 h-3.5 text-emerald-600" /> Plant Vigor
              </span>
              <span
                className={`font-bold ${
                  tile.plantedCrop.health > 70
                    ? 'text-emerald-700'
                    : tile.plantedCrop.health > 40
                    ? 'text-amber-700'
                    : 'text-red-700'
                }`}
              >
                {tile.plantedCrop.health}%
              </span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  tile.plantedCrop.health > 70
                    ? 'bg-emerald-500'
                    : tile.plantedCrop.health > 40
                    ? 'bg-amber-500'
                    : 'bg-red-500'
                }`}
                style={{ width: `${tile.plantedCrop.health}%` }}
              />
            </div>
          </div>

          {/* Companion Plant Status */}
          <div className="flex items-center justify-between text-xs pt-1 border-t border-gray-100">
            <span className="text-gray-600">Companion System:</span>
            <span className="font-semibold text-[#0E2A1E]">
              {tile.plantedCrop.companion ? (
                <span className="text-emerald-700">
                  {tile.plantedCrop.companion.name} ({tile.plantedCrop.companion.label})
                </span>
              ) : (
                <span className="text-gray-400">None intercropped</span>
              )}
            </span>
          </div>
        </div>
      )}

      {/* Soil Chemistry & Environmental Meters */}
      <div className="grid grid-cols-2 gap-3">
        {/* Moisture */}
        <div className="bg-[#F0F9FF] border border-[#BAE6FD] p-3 rounded-2xl">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-semibold text-gray-700 flex items-center gap-1">
              <Droplets className="w-3.5 h-3.5 text-blue-600" /> Moisture
            </span>
            <span className="font-extrabold text-[#0369A1]">{tile.moisture}%</span>
          </div>
          <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${
                tile.moisture < 20 ? 'bg-red-500' : 'bg-[#0284C7]'
              }`}
              style={{ width: `${tile.moisture}%` }}
            />
          </div>
          <span className="text-[10px] text-gray-500 mt-1 block">
            {tile.moisture < 20 ? '⚠️ High Dehydration' : tile.moisture > 85 ? 'Saturated' : 'Optimal'}
          </span>
        </div>

        {/* Soil Health */}
        <div className="bg-[#F0FDF4] border border-[#BBF7D0] p-3 rounded-2xl">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-semibold text-gray-700 flex items-center gap-1">
              <Sprout className="w-3.5 h-3.5 text-emerald-600" /> Soil Vitality
            </span>
            <span className="font-extrabold text-[#065F46]">{tile.soilHealth}%</span>
          </div>
          <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-[#10B981]" style={{ width: `${tile.soilHealth}%` }} />
          </div>
          <span className="text-[10px] text-gray-500 mt-1 block">
            {tile.soilHealth > 80 ? 'Living Microbe Loam' : 'Moderate Fertility'}
          </span>
        </div>

        {/* Organic Nitrogen */}
        <div className="bg-[#FEFCE8] border border-[#FEF08A] p-3 rounded-2xl">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-semibold text-gray-700 flex items-center gap-1">
              🌱 Nitrogen (N)
            </span>
            <span className="font-extrabold text-[#854D0E]">{tile.nitrogenLevel}%</span>
          </div>
          <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-amber-500" style={{ width: `${tile.nitrogenLevel}%` }} />
          </div>
          <span className="text-[10px] text-gray-500 mt-1 block">
            {tile.nitrogenLevel < 40 ? 'Depleted' : 'Balanced Foliage N'}
          </span>
        </div>

        {/* Pest Risk */}
        <div className="bg-[#FFF7ED] border border-[#FFEDD5] p-3 rounded-2xl">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-semibold text-gray-700 flex items-center gap-1">
              <Bug className="w-3.5 h-3.5 text-orange-600" /> Pest Hazard
            </span>
            <span className="font-extrabold text-[#C2410C]">{tile.pestRisk}%</span>
          </div>
          <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${
                tile.pestRisk > 50 ? 'bg-red-500' : 'bg-orange-400'
              }`}
              style={{ width: `${tile.pestRisk}%` }}
            />
          </div>
          <span className="text-[10px] text-gray-500 mt-1 block">
            {tile.pestRisk > 50 ? '⚠️ High Aphid Threat' : 'Protected Buffer'}
          </span>
        </div>
      </div>

      {/* Contextual Action Deck */}
      <div className="flex flex-col gap-2.5 pt-2 border-t border-[#E5EAE5]">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Available Organic Operations
          </span>
          <span className="text-xs font-bold text-emerald-700">
            Treasury: ${budget.toFixed(2)}
          </span>
        </div>

        {/* If plot is empty: show Plant Seeds button */}
        {!tile.plantedCrop && (
          <Button
            variant="primary"
            size="md"
            onClick={onOpenPlantModal}
            icon={Sprout}
            className="w-full shadow-sm font-bold justify-between"
          >
            <span>Plant Crop Seeds</span>
            <span className="text-xs bg-emerald-800/60 px-2 py-0.5 rounded-md">$15 - $25</span>
          </Button>
        )}

        {/* If ready to harvest: prominent harvest button */}
        {tile.plantedCrop && tile.plantedCrop.readyToHarvest && (
          <Button
            variant="nature"
            size="md"
            onClick={() => onHarvest(tile.id)}
            icon={Sparkles}
            className="w-full bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-extrabold shadow-md justify-between"
          >
            <span>🌾 Harvest Crop Now</span>
            <span className="text-xs bg-amber-800/40 px-2 py-0.5 rounded-md">Collect Cash</span>
          </Button>
        )}

        {/* Irrigation Action */}
        <button
          type="button"
          onClick={() => onIrrigate(tile.id)}
          disabled={budget < ACTION_COSTS.irrigation || tile.moisture >= 95}
          className={`w-full flex items-center justify-between p-2.5 rounded-xl border transition-all text-left text-xs ${
            budget < ACTION_COSTS.irrigation || tile.moisture >= 95
              ? 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed'
              : 'border-[#D5DDD5] hover:border-[#0284C7] hover:bg-[#F0F9FF] text-gray-800 cursor-pointer'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-base">💧</span>
            <div>
              <div className="font-bold text-[#0E2A1E]">Drip Irrigation Run</div>
              <div className="text-[10px] text-gray-500">
                {tile.moisture >= 95 ? 'Soil Saturated (95%+)' : '+35% Root Hydration'}
              </div>
            </div>
          </div>
          <span className="font-extrabold text-[#0369A1] bg-[#E0F2FE] px-2 py-0.5 rounded-md">
            ${ACTION_COSTS.irrigation}
          </span>
        </button>

        {/* Vermicompost Action */}
        <button
          type="button"
          onClick={() => onCompost(tile.id)}
          disabled={budget < ACTION_COSTS.compost}
          className={`w-full flex items-center justify-between p-2.5 rounded-xl border transition-all text-left text-xs ${
            budget < ACTION_COSTS.compost
              ? 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed'
              : 'border-[#D5DDD5] hover:border-[#10B981] hover:bg-[#F0FDF4] text-gray-800 cursor-pointer'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-base">🌱</span>
            <div>
              <div className="font-bold text-[#0E2A1E]">Apply Vermicompost</div>
              <div className="text-[10px] text-gray-500">+16% Vitality • +22% N Microbes</div>
            </div>
          </div>
          <span className="font-extrabold text-[#065F46] bg-[#ECFDF5] px-2 py-0.5 rounded-md">
            ${ACTION_COSTS.compost}
          </span>
        </button>

        {/* If planted: Neem Biopesticide and Companion Actions */}
        {tile.plantedCrop && (
          <>
            <button
              type="button"
              onClick={() => onNeemSpray(tile.id)}
              disabled={budget < ACTION_COSTS.neemSpray}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl border transition-all text-left text-xs ${
                budget < ACTION_COSTS.neemSpray
                  ? 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed'
                  : 'border-[#D5DDD5] hover:border-[#F59E0B] hover:bg-[#FFFBEB] text-gray-800 cursor-pointer'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-base">🐞</span>
                <div>
                  <div className="font-bold text-[#0E2A1E]">Cold-Pressed Neem Spray</div>
                  <div className="text-[10px] text-gray-500">-30% Aphid & Mite Hazard</div>
                </div>
              </div>
              <span className="font-extrabold text-[#B45309] bg-[#FEF3C7] px-2 py-0.5 rounded-md">
                ${ACTION_COSTS.neemSpray}
              </span>
            </button>

            {/* Companion Planting Toggle */}
            {!tile.plantedCrop.companion && (
              <div className="border border-emerald-100 rounded-xl p-2.5 bg-emerald-50/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-emerald-900 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-emerald-600" /> Intercrop Companion
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowCompanionOptions(!showCompanionOptions)}
                    className="text-[11px] text-emerald-700 font-semibold hover:underline cursor-pointer"
                  >
                    {showCompanionOptions ? 'Hide' : 'Select Companion'}
                  </button>
                </div>

                {showCompanionOptions && (
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <button
                      type="button"
                      onClick={() => onAddCompanion(tile.id, 'marigold')}
                      disabled={budget < ACTION_COSTS.companionMarigold}
                      className="p-2 rounded-lg bg-white border border-amber-200 hover:border-amber-400 text-left cursor-pointer text-[10px]"
                    >
                      <div className="font-bold text-amber-900">🌼 French Marigold</div>
                      <div className="text-gray-500">Pest Shield (-$15)</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => onAddCompanion(tile.id, 'clover')}
                      disabled={budget < ACTION_COSTS.companionClover}
                      className="p-2 rounded-lg bg-white border border-emerald-200 hover:border-emerald-400 text-left cursor-pointer text-[10px]"
                    >
                      <div className="font-bold text-emerald-900">🍀 White Clover</div>
                      <div className="text-gray-500">Fix Nitrogen (-$15)</div>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Plow / Clear Crop Action */}
            <button
              type="button"
              onClick={() => onClearCrop(tile.id)}
              disabled={budget < ACTION_COSTS.clearPlow}
              className="text-[11px] text-gray-500 hover:text-red-700 transition-colors flex items-center justify-center gap-1 py-1 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Plow under & clear plot to fallow (-${ACTION_COSTS.clearPlow})</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};
