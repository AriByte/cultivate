import { progressService } from './progressService';
import { farmSimulationService } from './farmSimulationService';
import { MOCK_COURSES } from '../data/mockCourses';

// Level progression thresholds (SRS GAME-REQ-04)
export const LEVEL_TIERS = [
  { level: 1, title: 'Soil Apprentice', minXp: 0, maxXp: 249, badge: '🌱' },
  { level: 2, title: 'Junior Agronomist', minXp: 250, maxXp: 599, badge: '🌿' },
  { level: 3, title: 'Ecological Cultivator', minXp: 600, maxXp: 1099, badge: '🌾' },
  { level: 4, title: 'Regenerative Farmer', minXp: 1100, maxXp: 1799, badge: '🚜' },
  { level: 5, title: 'Master Soil Steward', minXp: 1800, maxXp: 99999, badge: '👑' }
];

// Badge definitions (SRS GAME-REQ-05)
export const BADGE_DEFINITIONS = [
  {
    id: 'water-master',
    title: 'Water Efficiency Master',
    category: 'Water Stewardship',
    icon: 'Droplets',
    description: 'Maintained optimal root hydration using drip irrigation without moisture stress or saturation.',
    hint: 'Keep soil moisture between 25% and 85% on all cultivated plots in the simulator.',
    tier: 'Gold'
  },
  {
    id: 'soil-steward',
    title: 'Soil Steward',
    category: 'Soil Health',
    icon: 'HeartPulse',
    description: 'Elevated soil microbial vitality to 90%+ utilizing rich organic vermicompost.',
    hint: 'Apply aerated vermicompost to any plot until soil vitality reaches at least 90%.',
    tier: 'Platinum'
  },
  {
    id: 'ipm-specialist',
    title: 'Organic IPM Specialist',
    category: 'Pest Management',
    icon: 'ShieldCheck',
    description: 'Suppressed insect pressure organically using neem seed oil or companion plant shields.',
    hint: 'Intercrop French Marigolds or apply cold-pressed neem spray to maintain pest hazard under 20%.',
    tier: 'Gold'
  },
  {
    id: 'heritage-harvester',
    title: 'Heritage Harvester',
    category: 'Farm Production',
    icon: 'Sparkles',
    description: 'Harvested mature organic food crops at peak physiological maturity.',
    hint: 'Grow any of the 5 approved crops past its minimum harvest day and reap the yield in the 2D studio.',
    tier: 'Diamond'
  },
  {
    id: 'eco-scholar',
    title: 'Ecological Scholar',
    category: 'Curriculum Mastery',
    icon: 'BookOpen',
    description: 'Completed at least 3 structured organic farming educational lesson modules.',
    hint: 'Study and mark at least 3 lessons complete in the Course Catalog.',
    tier: 'Silver'
  },
  {
    id: 'quiz-champion',
    title: 'Quiz Champion',
    category: 'Assessment Excellence',
    icon: 'Trophy',
    description: 'Achieved a perfect 100% mastery score on an organic agriculture assessment.',
    hint: 'Answer all 5 questions correctly on any course assessment quiz.',
    tier: 'Gold'
  }
];

// Peer academic cohort for demonstration (clearly identified sample learners)
export const SAMPLE_LEARNERS = [
  {
    id: 'learner-elena',
    displayName: 'Elena Rostova',
    institution: 'Wageningen Organic Agri',
    avatar: 'ER',
    baseXp: 1420,
    lessonsCompleted: 11,
    quizzesPassed: 3,
    cropsHarvested: 5,
    topBadge: 'Heritage Harvester',
    isSample: true
  },
  {
    id: 'learner-marcus',
    displayName: 'Marcus Vance',
    institution: 'Cornell Agroecology',
    avatar: 'MV',
    baseXp: 1280,
    lessonsCompleted: 9,
    quizzesPassed: 3,
    cropsHarvested: 4,
    topBadge: 'Soil Steward',
    isSample: true
  },
  {
    id: 'learner-priya',
    displayName: 'Priya Sharma',
    institution: 'Punjab Agricultural Univ',
    avatar: 'PS',
    baseXp: 980,
    lessonsCompleted: 7,
    quizzesPassed: 2,
    cropsHarvested: 3,
    topBadge: 'Water Efficiency Master',
    isSample: true
  },
  {
    id: 'learner-liam',
    displayName: 'Liam O’Connor',
    institution: 'UC Davis Sustainable Ag',
    avatar: 'LO',
    baseXp: 740,
    lessonsCompleted: 5,
    quizzesPassed: 2,
    cropsHarvested: 2,
    topBadge: 'Organic IPM Specialist',
    isSample: true
  },
  {
    id: 'learner-amara',
    displayName: 'Amara Diallo',
    institution: 'Makerere Agroforestry',
    avatar: 'AD',
    baseXp: 510,
    lessonsCompleted: 4,
    quizzesPassed: 1,
    cropsHarvested: 1,
    topBadge: 'Ecological Scholar',
    isSample: true
  },
  {
    id: 'learner-kai',
    displayName: 'Kai Takahashi',
    institution: 'Kyoto Bio-Farming Inst.',
    avatar: 'KT',
    baseXp: 350,
    lessonsCompleted: 3,
    quizzesPassed: 1,
    cropsHarvested: 0,
    topBadge: 'Soil Apprentice',
    isSample: true
  },
  {
    id: 'learner-sofia',
    displayName: 'Sofia Morales',
    institution: 'Chapingo Agroecology',
    avatar: 'SM',
    baseXp: 210,
    lessonsCompleted: 2,
    quizzesPassed: 0,
    cropsHarvested: 0,
    topBadge: 'Soil Apprentice',
    isSample: true
  }
];

export const gamificationService = {
  // Compute user's real XP from verified actions
  getUserStats() {
    const progress = progressService.getAllProgress();
    const farm = farmSimulationService.loadFarmState();

    let totalLessonXp = 0;
    let completedLessonCount = 0;
    let completedCourseCount = 0;

    // 1. Lesson XP: +50 XP per completed lesson
    Object.keys(progress.completedLessons || {}).forEach((courseId) => {
      const lessons = progress.completedLessons[courseId] || [];
      completedLessonCount += lessons.length;
      totalLessonXp += lessons.length * 50;

      // Course completion bonus (+150 XP if all lessons done)
      const courseDef = MOCK_COURSES.find((c) => c.id === courseId);
      if (courseDef && courseDef.lessons && lessons.length >= courseDef.lessons.length) {
        completedCourseCount += 1;
        totalLessonXp += 150;
      }
    });

    // 2. Quiz XP: +100 XP per passed quiz, +50 XP bonus for perfect 100% score
    let quizXp = 0;
    let quizzesPassed = 0;
    let perfectQuizzes = 0;

    Object.keys(progress.quizAttempts || {}).forEach((courseId) => {
      const attempt = progress.quizAttempts[courseId];
      if (attempt?.passed) {
        quizzesPassed += 1;
        quizXp += 100;
        if (attempt.highestScore === 100 || attempt.score === 100) {
          perfectQuizzes += 1;
          quizXp += 50;
        }
      }
    });

    // 3. Farm Simulator Milestones
    let simulationXp = 0;
    const cropsHarvested = farm.totalCropsHarvested || 0;
    simulationXp += cropsHarvested * 75; // 75 XP per harvest

    // Day 20+ milestone bonus
    if (farm.day >= 20) {
      simulationXp += 100;
    }

    // Companion planting bonus
    const hasCompanion = farm.tiles.some(
      (t) => t.plantedCrop && t.plantedCrop.companion !== null
    );
    if (hasCompanion) {
      simulationXp += 60;
    }

    const totalXp = totalLessonXp + quizXp + simulationXp;

    // Derive current level
    const currentTier =
      LEVEL_TIERS.slice().reverse().find((t) => totalXp >= t.minXp) || LEVEL_TIERS[0];
    const nextTier = LEVEL_TIERS.find((t) => t.level === currentTier.level + 1) || null;

    let levelProgressPct = 100;
    if (nextTier) {
      const range = nextTier.minXp - currentTier.minXp;
      const progressIntoLevel = totalXp - currentTier.minXp;
      levelProgressPct = Math.min(100, Math.max(0, Math.round((progressIntoLevel / range) * 100)));
    }

    // Evaluate Badges
    const badges = this.evaluateBadges({
      completedLessonCount,
      quizzesPassed,
      perfectQuizzes,
      cropsHarvested,
      farm
    });

    return {
      totalXp,
      level: currentTier.level,
      title: currentTier.title,
      badgeSymbol: currentTier.badge,
      nextTier,
      levelProgressPct,
      completedLessonCount,
      completedCourseCount,
      quizzesPassed,
      cropsHarvested,
      totalHarvestRevenue: farm.totalHarvestRevenue || 0,
      badges,
      unlockedBadgesCount: badges.filter((b) => b.unlocked).length,
      breakdown: {
        lessonXp: totalLessonXp,
        quizXp,
        simulationXp
      }
    };
  },

  // Calculate unlocked vs locked badges based on actual state
  evaluateBadges({ completedLessonCount, perfectQuizzes, cropsHarvested, farm }) {
    const hasOptimalHydration = farm.tiles
      .filter((t) => t.plantedCrop !== null)
      .every((t) => t.moisture >= 25 && t.moisture <= 85);

    const hasRichSoil = farm.tiles.some((t) => t.soilHealth >= 90);

    const hasLowPestWithCompanion = farm.tiles.some(
      (t) => t.plantedCrop && (t.plantedCrop.companion !== null || t.pestRisk <= 15)
    );

    return BADGE_DEFINITIONS.map((badge) => {
      let unlocked = false;
      let progressText = 'Locked';

      switch (badge.id) {
        case 'water-master':
          unlocked = hasOptimalHydration && farm.tiles.some((t) => t.plantedCrop !== null);
          progressText = unlocked ? 'Unlocked • Moisture In Range' : 'Needs all active plots in 25-85% zone';
          break;
        case 'soil-steward':
          unlocked = hasRichSoil;
          progressText = unlocked ? 'Unlocked • Microbes Flourishing' : 'Enrich any plot to 90%+ health';
          break;
        case 'ipm-specialist':
          unlocked = hasLowPestWithCompanion;
          progressText = unlocked ? 'Unlocked • Pest Shield Active' : 'Add companion plant or reduce pests < 20%';
          break;
        case 'heritage-harvester':
          unlocked = cropsHarvested >= 1;
          progressText = unlocked ? `Unlocked • ${cropsHarvested} Harvests` : 'Harvest at least 1 mature crop';
          break;
        case 'eco-scholar':
          unlocked = completedLessonCount >= 3;
          progressText = unlocked ? `Unlocked • ${completedLessonCount} Lessons` : `${completedLessonCount}/3 Lessons Completed`;
          break;
        case 'quiz-champion':
          unlocked = perfectQuizzes >= 1;
          progressText = unlocked ? 'Unlocked • 100% Assessment Score' : 'Score 100% on any course quiz';
          break;
        default:
          unlocked = false;
      }

      return {
        ...badge,
        unlocked,
        progressText
      };
    });
  },

  // Build sorted leaderboard merging user and academic sample learners (SRS GAME-REQ-06)
  getLeaderboardData() {
    const userStats = this.getUserStats();

    const activeUser = {
      id: 'active-user-current',
      displayName: 'You (Active Learner)',
      institution: 'Independent Scholar • Local Session',
      avatar: 'YOU',
      baseXp: userStats.totalXp,
      lessonsCompleted: userStats.completedLessonCount,
      quizzesPassed: userStats.quizzesPassed,
      cropsHarvested: userStats.cropsHarvested,
      topBadge: userStats.title,
      isCurrentUser: true,
      isSample: false
    };

    const combined = [...SAMPLE_LEARNERS, activeUser];

    // Sorting by XP DESC, then Quizzes Passed DESC, then Crops Harvested DESC
    combined.sort((a, b) => {
      if (b.baseXp !== a.baseXp) {
        return b.baseXp - a.baseXp;
      }
      if (b.quizzesPassed !== a.quizzesPassed) {
        return b.quizzesPassed - a.quizzesPassed;
      }
      return b.cropsHarvested - a.cropsHarvested;
    });

    const ranked = combined.map((learner, idx) => ({
      ...learner,
      rank: idx + 1
    }));

    const userRank = ranked.find((l) => l.isCurrentUser)?.rank || ranked.length;

    return {
      ranked,
      userRank,
      userStats,
      totalLearners: ranked.length
    };
  }
};
