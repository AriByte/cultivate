import React from 'react';
import { motion } from 'framer-motion';
import { Sprout, AlertTriangle, Sparkles, CheckCircle2 } from 'lucide-react';
import { MOCK_CROPS } from '../../../data/mockCrops';

export const FarmTile = ({
  tile,
  isSelected,
  onSelect
}) => {
  const cropDef = tile.plantedCrop
    ? MOCK_CROPS.find((c) => c.id === tile.plantedCrop.cropId)
    : null;

  // Derive soil moisture visual tone
  const getSoilBgClass = () => {
    if (tile.moisture < 25) {
      return 'from-[#B58A63]/30 via-[#9A6D48]/35 to-[#8A5F3B]/45 border-[#A57850]/40';
    }
    if (tile.moisture > 80) {
      return 'from-[#4D2813]/40 via-[#3B1E0E]/50 to-[#2A1408]/60 border-[#5A3119]/50';
    }
    return 'from-[#783E1B]/30 via-[#613013]/40 to-[#4E240B]/50 border-[#8B4C24]/40';
  };

  // Render crop botanical graphic based on growth stage
  const renderCropGraphic = () => {
    if (!tile.plantedCrop || !cropDef) {
      return (
        <div className="flex flex-col items-center justify-center py-5 text-gray-400 group-hover:text-emerald-700 transition-colors">
          <div className="w-9 h-9 rounded-full border border-dashed border-[#8B5A2B]/40 flex items-center justify-center text-xs text-[#8B5A2B]/60 mb-1 group-hover:border-emerald-600 group-hover:text-emerald-700">
            +
          </div>
          <span className="text-[11px] font-semibold text-[#78350F]/70">Fallow Loam</span>
          {tile.previousCrop && (
            <span className="text-[9px] text-[#78350F]/50">Prev: {tile.previousCrop}</span>
          )}
        </div>
      );
    }

    const { stageIndex, readyToHarvest } = tile.plantedCrop;
    const stages = cropDef.growthStages;
    const currentStageName = stages[stageIndex] || stages[0];

    // Crop color accents
    const cropColor = cropDef.color;

    return (
      <div className="flex flex-col items-center justify-center py-2 relative w-full">
        {/* Companion Plant Icon (if any) */}
        {tile.plantedCrop.companion && (
          <div
            className="absolute top-0 right-1 text-xs"
            title={`Companion: ${tile.plantedCrop.companion.name}`}
          >
            {tile.plantedCrop.companion.type === 'marigold' ? '🌼' : '🍀'}
          </div>
        )}

        {/* Botanical Plant Representation */}
        <motion.div
          animate={readyToHarvest ? { y: [0, -3, 0] } : {}}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="relative flex items-center justify-center my-1"
        >
          {/* Base Pot/Bed */}
          <div
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shadow-xs border transition-transform duration-200"
            style={{
              backgroundColor: `${cropColor}18`,
              borderColor: `${cropColor}40`
            }}
          >
            {stageIndex === 0 && <Sprout className="w-6 h-6 text-emerald-600" />}
            {stageIndex === 1 && <Sprout className="w-8 h-8 text-emerald-700" />}
            {stageIndex === 2 && (
              <span className="text-2xl" role="img" aria-label="flowering stage">
                {cropDef.id === 'crop-tomato' ? '🌸' : cropDef.id === 'crop-corn' ? '🌽' : '🌿'}
              </span>
            )}
            {stageIndex === 3 && (
              <span className="text-2xl" role="img" aria-label="fruiting stage">
                {cropDef.id === 'crop-tomato' ? '🍅' : cropDef.id === 'crop-carrot' ? '🥕' : '🌾'}
              </span>
            )}
            {stageIndex >= 4 && (
              <span className="text-3xl filter drop-shadow-xs" role="img" aria-label="harvest ready">
                {cropDef.id === 'crop-tomato'
                  ? '🍅'
                  : cropDef.id === 'crop-wheat'
                  ? '🌾'
                  : cropDef.id === 'crop-corn'
                  ? '🌽'
                  : cropDef.id === 'crop-carrot'
                  ? '🥕'
                  : '🍚'}
              </span>
            )}
          </div>
        </motion.div>

        {/* Crop Name & Stage Indicator */}
        <div className="text-center w-full px-1">
          <div className="text-xs font-bold text-[#0E2A1E] truncate">
            {cropDef.name.replace('Organic ', '').replace('Heritage ', '').replace('Jasmine Paddy ', '')}
          </div>
          <div className="text-[10px] font-medium text-gray-600 truncate">
            {readyToHarvest ? (
              <span className="text-amber-800 font-extrabold flex items-center justify-center gap-0.5">
                <Sparkles className="w-2.5 h-2.5 text-amber-600" /> Ready to Harvest!
              </span>
            ) : (
              <span>{currentStageName}</span>
            )}
          </div>
        </div>

        {/* Micro Health Bar */}
        <div className="w-4/5 mt-1.5 bg-gray-200 h-1.5 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              tile.plantedCrop.health > 70
                ? 'bg-[#10B981]'
                : tile.plantedCrop.health > 40
                ? 'bg-amber-500'
                : 'bg-red-500'
            }`}
            style={{ width: `${tile.plantedCrop.health}%` }}
          />
        </div>
      </div>
    );
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(tile)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(tile);
        }
      }}
      aria-label={`Plot ${tile.label}, ${tile.plantedCrop ? tile.plantedCrop.name : 'Fallow'}`}
      className={`group relative rounded-2xl p-2.5 sm:p-3 transition-all duration-200 cursor-pointer select-none border-2 bg-linear-to-b ${getSoilBgClass()} ${
        isSelected
          ? 'ring-4 ring-[#10B981] ring-offset-2 border-[#10B981] shadow-lg -translate-y-1 bg-white/95'
          : 'hover:border-[#10B981]/60 hover:shadow-md'
      }`}
    >
      {/* Top Header: Tile Coordinate and Moisture */}
      <div className="flex items-center justify-between text-[11px] font-bold mb-1">
        <span
          className={`px-1.5 py-0.5 rounded-md font-mono text-xs ${
            isSelected ? 'bg-[#0E2A1E] text-white' : 'bg-white/80 text-gray-800'
          }`}
        >
          {tile.label}
        </span>

        {/* Moisture Tag */}
        <span
          className={`px-1.5 py-0.5 rounded-md text-[10px] font-semibold flex items-center gap-0.5 ${
            tile.moisture < 20
              ? 'bg-red-100 text-red-700 animate-pulse'
              : 'bg-blue-50/90 text-blue-800'
          }`}
        >
          💧 {tile.moisture}%
        </span>
      </div>

      {/* Main Plot Content Graphic */}
      <div className="min-h-[110px] flex items-center justify-center bg-white/70 rounded-xl border border-white/50 backdrop-blur-2xs shadow-2xs">
        {renderCropGraphic()}
      </div>

      {/* Bottom Alert Flags */}
      <div className="mt-1.5 flex items-center justify-between text-[10px] px-1">
        {/* Soil Health Metric */}
        <span className="text-gray-600 font-medium">
          🌱 Soil {tile.soilHealth}%
        </span>

        {/* Pest or Dehydration Warning */}
        {tile.plantedCrop && tile.plantedCrop.isWaterStressed ? (
          <span className="text-red-600 font-bold flex items-center gap-0.5">
            <AlertTriangle className="w-3 h-3 text-red-500" /> Thirsty
          </span>
        ) : tile.plantedCrop && tile.plantedCrop.isPestAfflicted ? (
          <span className="text-amber-700 font-bold flex items-center gap-0.5">
            🐞 Pests
          </span>
        ) : tile.plantedCrop && tile.plantedCrop.readyToHarvest ? (
          <span className="text-amber-800 font-bold flex items-center gap-0.5">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Mature
          </span>
        ) : null}
      </div>
    </div>
  );
};
