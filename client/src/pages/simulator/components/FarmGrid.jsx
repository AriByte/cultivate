import React from 'react';
import { FarmTile } from './FarmTile';

export const FarmGrid = ({
  tiles,
  selectedTileId,
  onSelectTile
}) => {
  return (
    <div className="bg-[#FAF7F2] rounded-3xl border-2 border-[#D8C9B4] p-4 sm:p-6 shadow-sm">
      {/* Grid Header Info */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E8DEC9]">
        <div>
          <h2 className="text-sm sm:text-base font-extrabold text-[#0E2A1E]">
            2D Cultivation Field (3 × 4 Plot Grid)
          </h2>
          <p className="text-xs text-gray-600">
            Click any plot to inspect soil chemistry, plant seeds, hydrate roots, or apply organic inputs.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-xs font-semibold text-[#78350F]">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" /> Growing
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Mature
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#A27B5C]" /> Fallow Loam
          </span>
        </div>
      </div>

      {/* Grid of 12 Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {tiles.map((tile) => (
          <FarmTile
            key={tile.id}
            tile={tile}
            isSelected={tile.id === selectedTileId}
            onSelect={onSelectTile}
          />
        ))}
      </div>

      {/* Grid Legend & Footer Tips */}
      <div className="mt-4 pt-3 border-t border-[#E8DEC9] flex flex-wrap items-center justify-between gap-2 text-[11px] text-gray-500">
        <span>💡 Keyboard Accessible: Tab through plots and press Space or Enter to inspect.</span>
        <span>Soil moisture dynamically influences microbial respiration and root nutrient absorption.</span>
      </div>
    </div>
  );
};
