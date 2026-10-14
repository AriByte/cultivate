import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, DollarSign, Scale, RefreshCw } from 'lucide-react';
import { Button } from '../../../components/common/Button';

export const HarvestModal = ({
  isOpen,
  harvestData,
  onClose
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

  if (!isOpen || !harvestData) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="bg-white rounded-3xl max-w-lg w-full border-2 border-emerald-500/30 shadow-2xl overflow-hidden text-center"
        >
          {/* Header Graphic */}
          <div className="bg-linear-to-b from-[#0E2A1E] to-[#143D2B] text-white p-6 relative overflow-hidden">
            <div className="w-16 h-16 rounded-3xl bg-amber-400/20 border border-amber-400/40 text-amber-300 mx-auto flex items-center justify-center text-3xl mb-3 shadow-inner">
              🌾
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2 border border-emerald-400/30">
              <Sparkles className="w-3.5 h-3.5" /> Successful Organic Harvest
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              {harvestData.cropName} Harvested!
            </h3>
            <p className="text-xs text-gray-300 mt-1">
              Plot {harvestData.plotLabel} yield calculated per SRS SIM-REQ-12.
            </p>
          </div>

          {/* Revenue & Yield Breakdown */}
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#F0FDF4] border border-[#BBF7D0] p-3.5 rounded-2xl text-left">
                <span className="text-[11px] font-semibold text-gray-600 flex items-center gap-1">
                  <Scale className="w-3.5 h-3.5 text-emerald-600" /> Total Yield
                </span>
                <span className="text-xl font-extrabold text-[#065F46] mt-0.5 block">
                  {harvestData.yieldKg} kg
                </span>
                <span className="text-[10px] text-gray-500">
                  Organic Grade A
                </span>
              </div>

              <div className="bg-[#FEFCE8] border border-[#FEF08A] p-3.5 rounded-2xl text-left">
                <span className="text-[11px] font-semibold text-gray-600 flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5 text-amber-600" /> Revenue Earned
                </span>
                <span className="text-xl font-extrabold text-[#78350F] mt-0.5 block">
                  +${harvestData.grossRevenue.toFixed(2)}
                </span>
                <span className="text-[10px] text-gray-500">
                  ${harvestData.marketPrice.toFixed(2)} / kg
                </span>
              </div>
            </div>

            {/* Biological Crop Rotation Tip */}
            <div className="bg-[#F9FAF8] border border-[#E5EAE5] rounded-2xl p-4 text-left text-xs text-gray-700">
              <div className="flex items-center gap-2 font-bold text-[#0E2A1E] mb-1">
                <RefreshCw className="w-3.5 h-3.5 text-[#10B981]" />
                <span>Regenerative Crop Rotation Insight:</span>
              </div>
              <p className="leading-relaxed text-gray-600">
                {harvestData.rotationTip}
              </p>
            </div>

            {/* Action */}
            <Button
              variant="primary"
              size="lg"
              onClick={onClose}
              className="w-full shadow-md font-bold mt-2"
            >
              Collect ${harvestData.grossRevenue.toFixed(2)} & Continue Farming
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
