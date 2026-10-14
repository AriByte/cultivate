import { MOCK_CROPS } from '../data/mockCrops';

const STORAGE_KEY = 'terralearn_farm_simulator_v1';

// Initial 12-tile farm grid (3 rows x 4 columns)
export const INITIAL_TILES = [
  {
    id: 'tile-A1',
    row: 0,
    col: 0,
    label: 'A1',
    soilHealth: 84,
    moisture: 60,
    nitrogenLevel: 80,
    pestRisk: 18,
    plantedCrop: {
      cropId: 'crop-tomato',
      name: 'Heritage Tomato',
      daysPlanted: 16,
      stageIndex: 1, // 'Vegetative'
      health: 92,
      companion: {
        name: 'French Marigold',
        type: 'marigold',
        label: 'Pest Barrier'
      },
      isWaterStressed: false,
      isPestAfflicted: false,
      readyToHarvest: false
    },
    previousCrop: null
  },
  {
    id: 'tile-A2',
    row: 0,
    col: 1,
    label: 'A2',
    soilHealth: 76,
    moisture: 45,
    nitrogenLevel: 70,
    pestRisk: 22,
    plantedCrop: {
      cropId: 'crop-wheat',
      name: 'Organic Durum Wheat',
      daysPlanted: 10,
      stageIndex: 1, // 'Stem Elongation'
      health: 88,
      companion: null,
      isWaterStressed: false,
      isPestAfflicted: false,
      readyToHarvest: false
    },
    previousCrop: null
  },
  {
    id: 'tile-A3',
    row: 0,
    col: 2,
    label: 'A3',
    soilHealth: 88,
    moisture: 65,
    nitrogenLevel: 85,
    pestRisk: 10,
    plantedCrop: null, // Ready for learner to plant
    previousCrop: 'Legume Cover'
  },
  {
    id: 'tile-A4',
    row: 0,
    col: 3,
    label: 'A4',
    soilHealth: 82,
    moisture: 58,
    nitrogenLevel: 78,
    pestRisk: 12,
    plantedCrop: null,
    previousCrop: null
  },
  {
    id: 'tile-B1',
    row: 1,
    col: 0,
    label: 'B1',
    soilHealth: 79,
    moisture: 52,
    nitrogenLevel: 74,
    pestRisk: 15,
    plantedCrop: null,
    previousCrop: null
  },
  {
    id: 'tile-B2',
    row: 1,
    col: 1,
    label: 'B2',
    soilHealth: 85,
    moisture: 70,
    nitrogenLevel: 82,
    pestRisk: 14,
    plantedCrop: null,
    previousCrop: null
  },
  {
    id: 'tile-B3',
    row: 1,
    col: 2,
    label: 'B3',
    soilHealth: 75,
    moisture: 40,
    nitrogenLevel: 68,
    pestRisk: 20,
    plantedCrop: null,
    previousCrop: null
  },
  {
    id: 'tile-B4',
    row: 1,
    col: 3,
    label: 'B4',
    soilHealth: 90,
    moisture: 62,
    nitrogenLevel: 88,
    pestRisk: 8,
    plantedCrop: null,
    previousCrop: null
  },
  {
    id: 'tile-C1',
    row: 2,
    col: 0,
    label: 'C1',
    soilHealth: 81,
    moisture: 55,
    nitrogenLevel: 75,
    pestRisk: 16,
    plantedCrop: null,
    previousCrop: null
  },
  {
    id: 'tile-C2',
    row: 2,
    col: 1,
    label: 'C2',
    soilHealth: 83,
    moisture: 58,
    nitrogenLevel: 79,
    pestRisk: 12,
    plantedCrop: null,
    previousCrop: null
  },
  {
    id: 'tile-C3',
    row: 2,
    col: 2,
    label: 'C3',
    soilHealth: 86,
    moisture: 60,
    nitrogenLevel: 84,
    pestRisk: 11,
    plantedCrop: null,
    previousCrop: null
  },
  {
    id: 'tile-C4',
    row: 2,
    col: 3,
    label: 'C4',
    soilHealth: 80,
    moisture: 50,
    nitrogenLevel: 72,
    pestRisk: 18,
    plantedCrop: null,
    previousCrop: null
  }
];

export const INITIAL_FARM_STATE = {
  day: 16,
  budget: 650.00,
  season: 'Spring (Active Growth)',
  weather: {
    condition: 'Sunny',
    temperatureC: 24,
    rainfallMm: 0,
    label: 'Sunny & Moderate • 24°C'
  },
  totalHarvestRevenue: 0,
  totalCropsHarvested: 0,
  tiles: INITIAL_TILES,
  logs: [
    {
      id: 'log-init-1',
      day: 16,
      type: 'info',
      message: 'Farm initialized on Day 16. Plots A1 (Tomato) and A2 (Wheat) are actively growing. 10 fertile plots are ready for planting.'
    },
    {
      id: 'log-init-2',
      day: 16,
      type: 'bio',
      message: 'Biological advisory: Plot A1 has French Marigolds planted as companion shields, actively repelling root-knot pests.'
    }
  ]
};

// Seed costs per crop
export const SEED_PRICES = {
  'crop-tomato': 20,
  'crop-wheat': 15,
  'crop-corn': 25,
  'crop-carrot': 15,
  'crop-rice': 25
};

// Costs for farming operations
export const ACTION_COSTS = {
  irrigation: 10,
  compost: 25,
  neemSpray: 20,
  companionMarigold: 15,
  companionClover: 15,
  clearPlow: 5
};

export const farmSimulationService = {
  // Load state from local storage or return pristine initial state
  loadFarmState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed.tiles) && parsed.tiles.length === 12) {
          return parsed;
        }
      }
    } catch {
      // Fallback to initial
    }
    return JSON.parse(JSON.stringify(INITIAL_FARM_STATE));
  },

  // Save state
  saveFarmState(farm) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(farm));
    } catch {
      // ignore storage errors
    }
  },

  // Reset state
  resetFarmState() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    return JSON.parse(JSON.stringify(INITIAL_FARM_STATE));
  },

  // Plant a crop on an empty tile
  plantCrop(farm, tileId, cropId) {
    const tile = farm.tiles.find((t) => t.id === tileId);
    if (!tile) {
      return { success: false, reason: 'Tile not found.' };
    }
    if (tile.plantedCrop) {
      return { success: false, reason: `Tile ${tile.label} is already planted with ${tile.plantedCrop.name}. Clear or harvest first.` };
    }

    const crop = MOCK_CROPS.find((c) => c.id === cropId);
    if (!crop) {
      return { success: false, reason: 'Invalid crop selection.' };
    }

    const seedCost = SEED_PRICES[cropId] || 20;
    if (farm.budget < seedCost) {
      return { success: false, reason: `Insufficient budget. Planting ${crop.name} requires $${seedCost.toFixed(2)}, but you only have $${farm.budget.toFixed(2)}.` };
    }

    // Organic Soil Vigor bonus: if soil health is high, seedling starts with higher health
    const initialHealth = Math.min(100, Math.max(75, 88 + Math.round((tile.soilHealth - 75) / 3)));

    const newTiles = farm.tiles.map((t) => {
      if (t.id === tileId) {
        return {
          ...t,
          plantedCrop: {
            cropId: crop.id,
            name: crop.name,
            daysPlanted: 0,
            stageIndex: 0,
            health: initialHealth,
            companion: null,
            isWaterStressed: false,
            isPestAfflicted: false,
            readyToHarvest: false
          }
        };
      }
      return t;
    });

    const newLogs = [
      {
        id: `log-${Date.now()}`,
        day: farm.day,
        type: 'action',
        message: `Planted ${crop.name} seeds in Plot ${tile.label}. (-$${seedCost.toFixed(2)}). Soil health (${tile.soilHealth}%) provides initial seedling vitality.`
      },
      ...farm.logs.slice(0, 30)
    ];

    const updated = {
      ...farm,
      budget: farm.budget - seedCost,
      tiles: newTiles,
      logs: newLogs
    };

    this.saveFarmState(updated);
    return {
      success: true,
      farm: updated,
      message: `Successfully planted ${crop.name} in Plot ${tile.label}!`
    };
  },

  // Water/irrigate a specific tile
  irrigateTile(farm, tileId) {
    const tile = farm.tiles.find((t) => t.id === tileId);
    if (!tile) return { success: false, reason: 'Tile not found.' };

    const cost = ACTION_COSTS.irrigation;
    if (farm.budget < cost) {
      return { success: false, reason: `Insufficient budget for precision drip irrigation ($${cost.toFixed(2)}).` };
    }

    if (tile.moisture >= 95) {
      return { success: false, reason: `Plot ${tile.label} soil is already fully saturated (${tile.moisture}%). Overwatering causes root anaerobic rot.` };
    }

    const newMoisture = Math.min(100, tile.moisture + 35);
    const newTiles = farm.tiles.map((t) => {
      if (t.id === tileId) {
        let updatedCrop = t.plantedCrop;
        if (updatedCrop) {
          const healthBoost = updatedCrop.isWaterStressed ? 6 : 2;
          updatedCrop = {
            ...updatedCrop,
            health: Math.min(100, updatedCrop.health + healthBoost),
            isWaterStressed: false
          };
        }
        return {
          ...t,
          moisture: newMoisture,
          plantedCrop: updatedCrop
        };
      }
      return t;
    });

    const newLogs = [
      {
        id: `log-${Date.now()}`,
        day: farm.day,
        type: 'action',
        message: `Applied precision drip irrigation to Plot ${tile.label}. Soil moisture raised from ${tile.moisture}% to ${newMoisture}%. (-$${cost.toFixed(2)})`
      },
      ...farm.logs.slice(0, 30)
    ];

    const updated = {
      ...farm,
      budget: farm.budget - cost,
      tiles: newTiles,
      logs: newLogs
    };

    this.saveFarmState(updated);
    return { success: true, farm: updated, message: `Drip irrigation completed on Plot ${tile.label}. (+35% Moisture)` };
  },

  // Apply rich vermicompost
  applyCompost(farm, tileId) {
    const tile = farm.tiles.find((t) => t.id === tileId);
    if (!tile) return { success: false, reason: 'Tile not found.' };

    const cost = ACTION_COSTS.compost;
    if (farm.budget < cost) {
      return { success: false, reason: `Insufficient budget for vermicompost application ($${cost.toFixed(2)}).` };
    }

    const newSoilHealth = Math.min(100, tile.soilHealth + 16);
    const newNitrogen = Math.min(100, tile.nitrogenLevel + 22);

    const newTiles = farm.tiles.map((t) => {
      if (t.id === tileId) {
        let updatedCrop = t.plantedCrop;
        if (updatedCrop) {
          updatedCrop = {
            ...updatedCrop,
            health: Math.min(100, updatedCrop.health + 5)
          };
        }
        return {
          ...t,
          soilHealth: newSoilHealth,
          nitrogenLevel: newNitrogen,
          plantedCrop: updatedCrop
        };
      }
      return t;
    });

    const newLogs = [
      {
        id: `log-${Date.now()}`,
        day: farm.day,
        type: 'action',
        message: `Applied humic vermicompost to Plot ${tile.label}. Microbes boosted soil vitality to ${newSoilHealth}% and organic nitrogen to ${newNitrogen}%. (-$${cost.toFixed(2)})`
      },
      ...farm.logs.slice(0, 30)
    ];

    const updated = {
      ...farm,
      budget: farm.budget - cost,
      tiles: newTiles,
      logs: newLogs
    };

    this.saveFarmState(updated);
    return { success: true, farm: updated, message: `Vermicompost enriched Plot ${tile.label}! (+16% Soil Vitality, +22% N)` };
  },

  // Apply cold-pressed neem biopesticide spray
  applyNeemSpray(farm, tileId) {
    const tile = farm.tiles.find((t) => t.id === tileId);
    if (!tile) return { success: false, reason: 'Tile not found.' };

    const cost = ACTION_COSTS.neemSpray;
    if (farm.budget < cost) {
      return { success: false, reason: `Insufficient budget for neem biopesticide spray ($${cost.toFixed(2)}).` };
    }

    const newPestRisk = Math.max(5, tile.pestRisk - 30);
    const newTiles = farm.tiles.map((t) => {
      if (t.id === tileId) {
        let updatedCrop = t.plantedCrop;
        if (updatedCrop) {
          updatedCrop = {
            ...updatedCrop,
            isPestAfflicted: false,
            health: Math.min(100, updatedCrop.health + 4)
          };
        }
        return {
          ...t,
          pestRisk: newPestRisk,
          plantedCrop: updatedCrop
        };
      }
      return t;
    });

    const newLogs = [
      {
        id: `log-${Date.now()}`,
        day: farm.day,
        type: 'action',
        message: `Sprayed cold-pressed neem seed oil on Plot ${tile.label}. Azadirachtin organic bio-repellent lowered pest hazard from ${tile.pestRisk}% to ${newPestRisk}%. (-$${cost.toFixed(2)})`
      },
      ...farm.logs.slice(0, 30)
    ];

    const updated = {
      ...farm,
      budget: farm.budget - cost,
      tiles: newTiles,
      logs: newLogs
    };

    this.saveFarmState(updated);
    return { success: true, farm: updated, message: `Neem bio-spray applied to Plot ${tile.label}! (-30% Pest Hazard)` };
  },

  // Add Companion Plant (French Marigold or White Clover)
  addCompanion(farm, tileId, companionType) {
    const tile = farm.tiles.find((t) => t.id === tileId);
    if (!tile) return { success: false, reason: 'Tile not found.' };

    if (!tile.plantedCrop) {
      return { success: false, reason: `Cannot add a companion plant to an empty plot. Plant a primary crop first.` };
    }

    if (tile.plantedCrop.companion) {
      return { success: false, reason: `Plot ${tile.label} already has companion ${tile.plantedCrop.companion.name}.` };
    }

    const cost = companionType === 'clover' ? ACTION_COSTS.companionClover : ACTION_COSTS.companionMarigold;
    if (farm.budget < cost) {
      return { success: false, reason: `Insufficient budget for companion planting ($${cost.toFixed(2)}).` };
    }

    const companionData = companionType === 'clover'
      ? { name: 'White Clover', type: 'clover', label: 'Rhizobium N-Fixer' }
      : { name: 'French Marigold', type: 'marigold', label: 'Pest Repellent Shield' };

    const newPestRisk = companionType === 'marigold' ? Math.max(5, tile.pestRisk - 20) : tile.pestRisk;
    const newNitrogen = companionType === 'clover' ? Math.min(100, tile.nitrogenLevel + 15) : tile.nitrogenLevel;

    const newTiles = farm.tiles.map((t) => {
      if (t.id === tileId) {
        return {
          ...t,
          pestRisk: newPestRisk,
          nitrogenLevel: newNitrogen,
          plantedCrop: {
            ...t.plantedCrop,
            companion: companionData
          }
        };
      }
      return t;
    });

    const newLogs = [
      {
        id: `log-${Date.now()}`,
        day: farm.day,
        type: 'action',
        message: `Intercropped ${companionData.name} alongside ${tile.plantedCrop.name} in Plot ${tile.label}. ${companionType === 'marigold' ? 'Natural terpenes repel destructive insects.' : 'Root nodules actively fix atmospheric nitrogen.'} (-$${cost.toFixed(2)})`
      },
      ...farm.logs.slice(0, 30)
    ];

    const updated = {
      ...farm,
      budget: farm.budget - cost,
      tiles: newTiles,
      logs: newLogs
    };

    this.saveFarmState(updated);
    return { success: true, farm: updated, message: `Intercropped ${companionData.name} in Plot ${tile.label}!` };
  },

  // Harvest a mature crop
  harvestCrop(farm, tileId) {
    const tile = farm.tiles.find((t) => t.id === tileId);
    if (!tile || !tile.plantedCrop) {
      return { success: false, reason: 'No crop to harvest.' };
    }

    const crop = MOCK_CROPS.find((c) => c.id === tile.plantedCrop.cropId);
    if (!crop) return { success: false, reason: 'Crop definition missing.' };

    if (!tile.plantedCrop.readyToHarvest && tile.plantedCrop.daysPlanted < crop.minHarvestDay) {
      return {
        success: false,
        reason: `${crop.name} is only at Day ${tile.plantedCrop.daysPlanted}. Harvesting requires at least Day ${crop.minHarvestDay} (SRS SIM-REQ-11 prevents premature harvesting).`
      };
    }

    // Calculate yield based on plant health and soil quality
    const healthFactor = tile.plantedCrop.health / 100;
    const soilFactor = tile.soilHealth / 85;
    // Single tile yield is proportional to baseYieldKg (~1/4 of total farm acre output)
    const yieldKg = Math.max(15, Math.round(crop.baseYieldKg * 0.28 * healthFactor * soilFactor));
    const grossRevenue = Math.round(yieldKg * crop.marketPricePerKg * 100) / 100;

    // Rotation advisory based on harvested crop
    let rotationTip = 'Follow up with a nitrogen-fixing legume cover crop (clover or beans) to restore depleted organic matter.';
    if (crop.category === 'Cereal Grain') {
      rotationTip = 'Deep fibrous roots broke up subsoil compaction. Excellent time to plant root vegetables like carrots.';
    } else if (crop.id === 'crop-tomato') {
      rotationTip = 'Avoid planting other Solanaceae (peppers, potatoes) here next season to prevent disease carryover.';
    }

    const newTiles = farm.tiles.map((t) => {
      if (t.id === tileId) {
        return {
          ...t,
          plantedCrop: null,
          previousCrop: crop.name,
          // Soil loses a small amount of nutrients from harvest
          nitrogenLevel: Math.max(40, t.nitrogenLevel - 15)
        };
      }
      return t;
    });

    const newLogs = [
      {
        id: `log-${Date.now()}`,
        day: farm.day,
        type: 'harvest',
        message: `Harvested Plot ${tile.label} (${crop.name})! Produced ${yieldKg} kg of organic produce at $${crop.marketPricePerKg.toFixed(2)}/kg, earning +$${grossRevenue.toFixed(2)} revenue.`
      },
      ...farm.logs.slice(0, 30)
    ];

    const updated = {
      ...farm,
      budget: farm.budget + grossRevenue,
      totalHarvestRevenue: farm.totalHarvestRevenue + grossRevenue,
      totalCropsHarvested: farm.totalCropsHarvested + 1,
      tiles: newTiles,
      logs: newLogs
    };

    this.saveFarmState(updated);
    return {
      success: true,
      farm: updated,
      harvestData: {
        cropName: crop.name,
        yieldKg,
        marketPrice: crop.marketPricePerKg,
        grossRevenue,
        plotLabel: tile.label,
        rotationTip
      },
      message: `Harvested ${crop.name}! Earned +$${grossRevenue.toFixed(2)}.`
    };
  },

  // Clear/plow an unhealthy or unwanted crop
  clearCrop(farm, tileId) {
    const tile = farm.tiles.find((t) => t.id === tileId);
    if (!tile || !tile.plantedCrop) {
      return { success: false, reason: 'No crop on this tile.' };
    }

    const cost = ACTION_COSTS.clearPlow;
    if (farm.budget < cost) {
      return { success: false, reason: `Insufficient budget to clear plot ($${cost.toFixed(2)}).` };
    }

    const cropName = tile.plantedCrop.name;
    const newTiles = farm.tiles.map((t) => {
      if (t.id === tileId) {
        return {
          ...t,
          plantedCrop: null,
          previousCrop: `${cropName} (Plowed Fallow)`
        };
      }
      return t;
    });

    const newLogs = [
      {
        id: `log-${Date.now()}`,
        day: farm.day,
        type: 'action',
        message: `Plowed under ${cropName} on Plot ${tile.label} to establish fallow rest. (-$${cost.toFixed(2)})`
      },
      ...farm.logs.slice(0, 30)
    ];

    const updated = {
      ...farm,
      budget: farm.budget - cost,
      tiles: newTiles,
      logs: newLogs
    };

    this.saveFarmState(updated);
    return { success: true, farm: updated, message: `Plowed and cleared Plot ${tile.label}.` };
  },

  // Advance simulation by 1 day
  advanceDay(farm) {
    const newDay = farm.day + 1;

    // Environmental / Weather cycle simulation
    const weatherPatterns = [
      { condition: 'Sunny & Warm', temperatureC: 25, rainfallMm: 0, label: 'Sunny • 25°C • Low Humidity' },
      { condition: 'Partly Cloudy', temperatureC: 22, rainfallMm: 0, label: 'Partly Cloudy • 22°C • Gentle Breeze' },
      { condition: 'Gentle Rain', temperatureC: 19, rainfallMm: 12, label: 'Gentle Rain • 19°C • Free Natural Hydration' },
      { condition: 'Warm & Humid', temperatureC: 27, rainfallMm: 0, label: 'Warm & Humid • 27°C • Moderate Pest Drift' }
    ];
    const weatherIndex = (newDay + 1) % weatherPatterns.length;
    const currentWeather = weatherPatterns[weatherIndex];
    const isRainy = currentWeather.rainfallMm > 0;

    const warnings = [];

    const newTiles = farm.tiles.map((tile) => {
      // 1. Natural Moisture changes
      let moistureDelta = isRainy ? 18 : -6; // baseline evaporation or rain
      let updatedSoilHealth = tile.soilHealth;
      let updatedNitrogen = tile.nitrogenLevel;
      let updatedPestRisk = tile.pestRisk;
      let updatedCrop = tile.plantedCrop ? { ...tile.plantedCrop } : null;

      if (!updatedCrop) {
        // Fallow soil biological rest
        updatedSoilHealth = Math.min(95, updatedSoilHealth + 0.5);
        const finalMoisture = Math.max(10, Math.min(100, tile.moisture + moistureDelta));
        return {
          ...tile,
          soilHealth: Math.round(updatedSoilHealth * 10) / 10,
          moisture: Math.round(finalMoisture)
        };
      }

      // 2. Crop is planted: consume water according to crop profile
      const cropDef = MOCK_CROPS.find((c) => c.id === updatedCrop.cropId);
      const dailyWaterUse = cropDef ? Math.round(cropDef.dailyWaterNeed * 0.7) : 10;
      
      // High soil health (organic humus) has superior water retention
      const retentionBonus = tile.soilHealth > 80 ? 0.8 : 1.0;
      const netWaterChange = isRainy ? (18 - dailyWaterUse * 0.5) : (-dailyWaterUse * retentionBonus);

      const finalMoisture = Math.max(0, Math.min(100, tile.moisture + netWaterChange));

      // 3. Pest drift and companion protection
      const hasMarigold = updatedCrop.companion?.type === 'marigold';
      const pestDrift = hasMarigold ? 1 : 3;
      updatedPestRisk = Math.min(90, Math.max(5, tile.pestRisk + pestDrift));

      // 4. Nitrogen dynamics (Clover fixes nitrogen; Corn consumes heavily)
      const hasClover = updatedCrop.companion?.type === 'clover';
      if (hasClover) {
        updatedNitrogen = Math.min(100, updatedNitrogen + 2.5);
      } else if (cropDef?.id === 'crop-corn') {
        updatedNitrogen = Math.max(25, updatedNitrogen - 2);
      } else {
        updatedNitrogen = Math.max(30, updatedNitrogen - 1);
      }

      // 5. Crop Age & Growth Stage
      const daysPlanted = updatedCrop.daysPlanted + 1;
      const totalGrowthDays = cropDef ? cropDef.baseGrowthDays : 60;
      const stages = cropDef ? cropDef.growthStages : ['Seedling', 'Vegetative', 'Flowering', 'Harvest'];
      const stageProgress = daysPlanted / totalGrowthDays;
      const stageIndex = Math.min(stages.length - 1, Math.floor(stageProgress * stages.length));
      const readyToHarvest = daysPlanted >= (cropDef?.minHarvestDay || 50);

      // 6. Biological Health Evaluation
      let health = updatedCrop.health;
      let isWaterStressed = false;
      let isPestAfflicted = false;

      // Water stress check
      if (finalMoisture < 20) {
        health = Math.max(15, health - 8);
        isWaterStressed = true;
        warnings.push(`Plot ${tile.label} (${updatedCrop.name}): Severe dehydration! Root turgor pressure dropping.`);
      } else if (finalMoisture > 90 && cropDef?.id !== 'crop-rice') {
        health = Math.max(25, health - 5);
        warnings.push(`Plot ${tile.label} (${updatedCrop.name}): Root waterlogging detected.`);
      }

      // Pest pressure check
      if (updatedPestRisk > 50) {
        health = Math.max(15, health - 6);
        isPestAfflicted = true;
        warnings.push(`Plot ${tile.label} (${updatedCrop.name}): Aphid & insect infestation pressure.`);
      }

      // Soil vitality boost: rich soil helps plants thrive
      if (tile.soilHealth > 80 && !isWaterStressed && !isPestAfflicted) {
        health = Math.min(100, health + 2);
      }

      if (readyToHarvest && !updatedCrop.readyToHarvest) {
        warnings.push(`🌾 Plot ${tile.label} (${updatedCrop.name}) reached optimal harvest maturity!`);
      }

      updatedCrop = {
        ...updatedCrop,
        daysPlanted,
        stageIndex,
        health: Math.round(health),
        isWaterStressed,
        isPestAfflicted,
        readyToHarvest
      };

      return {
        ...tile,
        moisture: Math.round(finalMoisture),
        soilHealth: Math.round(updatedSoilHealth),
        nitrogenLevel: Math.round(updatedNitrogen),
        pestRisk: Math.round(updatedPestRisk),
        plantedCrop: updatedCrop
      };
    });

    // Build log message
    let logSummary = `Advanced to Day ${newDay}. Weather: ${currentWeather.label}.`;
    if (isRainy) {
      logSummary += ` Free natural rainfall hydrated all farm plots (+18% moisture).`;
    }
    if (warnings.length > 0) {
      logSummary += ` ${warnings.length} advisory alert(s) logged.`;
    }

    const newLogs = [
      {
        id: `log-${Date.now()}`,
        day: newDay,
        type: 'next-day',
        message: logSummary
      },
      ...farm.logs.slice(0, 30)
    ];

    const updated = {
      ...farm,
      day: newDay,
      weather: currentWeather,
      tiles: newTiles,
      logs: newLogs
    };

    this.saveFarmState(updated);
    return {
      success: true,
      farm: updated,
      warnings
    };
  }
};
