import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sprout, Droplets, Calendar, DollarSign, Check } from 'lucide-react';
import { MOCK_CROPS } from '../../../data/mockCrops';
import { SEED_PRICES } from '../../../services/farmSimulationService';
import { Button } from '../../../components/common/Button';

export const PlantingModal = ({
  isOpen,
  tile,
  budget,
  onClose,
  onConfirmPlant
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !tile) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-3xl max-w-2xl w-full border border-[#D5DDD5] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        >
          {/* Modal Header */}
          <div className="bg-[#0E2A1E] text-white px-6 py-4 flex items-center justify-between border-b border-[#1B4D36]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#10B981]/20 flex items-center justify-center text-[#10B981] border border-[#10B981]/30">
                <Sprout className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  Plant Seeds in Plot {tile.label}
                </h3>
                <p className="text-xs text-gray-300">
                  Select an approved organic crop from the SRS SIM-REQ-09 catalog.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close planting dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Current Plot Context Bar */}
          <div className="bg-[#F4F6F3] px-6 py-2.5 border-b border-[#E5EAE5] flex items-center justify-between text-xs text-gray-700">
            <span>
              Soil Vitality: <strong>{tile.soilHealth}%</strong> • Moisture: <strong>{tile.moisture}%</strong>
            </span>
            <span>
              Treasury: <strong className="text-emerald-700">${budget.toFixed(2)}</strong>
            </span>
          </div>

          {/* Crop Catalog Cards */}
          <div className="p-6 overflow-y-auto space-y-3.5 flex-1">
            {MOCK_CROPS.map((crop) => {
              const seedCost = SEED_PRICES[crop.id] || 20;
              const canAfford = budget >= seedCost;

              return (
                <div
                  key={crop.id}
                  className="rounded-2xl border border-[#E5EAE5] hover:border-[#10B981] p-4 transition-all bg-white hover:shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 border"
                      style={{
                        backgroundColor: `${crop.color}15`,
                        borderColor: `${crop.color}35`
                      }}
                    >
                      {crop.id === 'crop-tomato'
                        ? '🍅'
                        : crop.id === 'crop-wheat'
                        ? '🌾'
                        : crop.id === 'crop-corn'
                        ? '🌽'
                        : crop.id === 'crop-carrot'
                        ? '🥕'
                        : '🍚'}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-[#0E2A1E]">{crop.name}</h4>
                        <span className="text-[10px] font-semibold text-gray-500 italic">
                          ({crop.scientificName})
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 line-clamp-2 mt-0.5 max-w-md">
                        {crop.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 mt-2 text-[11px] text-gray-600">
                        <span className="flex items-center gap-1 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-amber-600" />
                          {crop.baseGrowthDays} Days (Harvest from Day {crop.minHarvestDay})
                        </span>
                        <span className="flex items-center gap-1 font-medium">
                          <Droplets className="w-3.5 h-3.5 text-blue-600" />
                          {crop.dailyWaterNeed}% Daily Water
                        </span>
                        <span className="flex items-center gap-1 font-semibold text-emerald-700">
                          <DollarSign className="w-3.5 h-3.5" />
                          ${crop.marketPricePerKg.toFixed(2)}/kg
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="w-full sm:w-auto flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                    <div className="text-xs font-bold text-gray-700">
                      Seed Cost: <span className="text-[#0E2A1E]">${seedCost.toFixed(2)}</span>
                    </div>

                    <Button
                      variant={canAfford ? 'primary' : 'outline'}
                      size="sm"
                      disabled={!canAfford}
                      onClick={() => onConfirmPlant(tile.id, crop.id)}
                      icon={Check}
                      className="w-full sm:w-auto"
                    >
                      {canAfford ? 'Plant Now' : 'Low Funds'}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Modal Footer */}
          <div className="bg-[#FAFBF9] px-6 py-3 border-t border-[#E5EAE5] flex items-center justify-between text-xs text-gray-500">
            <span>Seeds germinate into seedlings immediately upon planting.</span>
            <Button variant="ghost" size="sm" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
