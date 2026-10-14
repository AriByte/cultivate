import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Trophy,
  Award,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Droplets,
  HeartPulse,
  ShieldCheck,
  HelpCircle,
  User,
  GraduationCap
} from 'lucide-react';
import { gamificationService } from '../../services/gamificationService';
import { Badge } from '../../components/common/Badge';

export const LeaderboardPage = () => {
  // Pure state initializer
  const [data] = useState(() => gamificationService.getLeaderboardData());
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'top3', 'me'

  const { ranked, userRank, userStats, totalLearners } = data;

  // Filtered rows based on active tab
  const displayedLearners = ranked.filter((learner) => {
    if (activeTab === 'top3') return learner.rank <= 3;
    if (activeTab === 'me') return learner.isCurrentUser;
    return true;
  });

  const top3 = ranked.slice(0, 3);

  // Map icon strings to Lucide components
  const getBadgeIcon = (iconName) => {
    switch (iconName) {
      case 'Droplets':
        return Droplets;
      case 'HeartPulse':
        return HeartPulse;
      case 'ShieldCheck':
        return ShieldCheck;
      case 'Sparkles':
        return Sparkles;
      case 'BookOpen':
        return BookOpen;
      case 'Trophy':
        return Trophy;
      default:
        return Award;
    }
  };

  return (
    <div className="py-10 sm:py-16 bg-[#FBFBF9] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Page Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46] text-xs font-semibold mb-3">
            <Trophy className="w-3.5 h-3.5 text-[#10B981]" />
            <span>Academic Gamification (SRS GAME-REQ-01 to 06)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0E2A1E] font-['Plus_Jakarta_Sans',sans-serif] tracking-tight">
            Academic Leaderboard & Achievements
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2 leading-relaxed">
            Rankings and recognition are derived deterministically from your verified curriculum study, quiz assessments, and biological harvests in the 2D farm simulator.
          </p>
        </div>

        {/* Personal Progress & Analytics Banner (SRS ANALYTICS-REQ-01 to 03) */}
        <div className="bg-white rounded-3xl border border-[#D5DDD5] p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-[#E5EAE5]">
            
            {/* User Level & Title */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-[#10B981] to-[#059669] flex items-center justify-center text-3xl shadow-sm text-white shrink-0">
                {userStats.badgeSymbol}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Level {userStats.level}
                  </span>
                  <span className="text-xs font-semibold text-gray-500">
                    Rank #{userRank} of {totalLearners}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0E2A1E] mt-0.5">
                  {userStats.title}
                </h2>
                <p className="text-xs text-gray-500">
                  Active Learner Profile • Local Session Progress
                </p>
              </div>
            </div>

            {/* Total XP Score Pill */}
            <div className="flex items-center gap-3 bg-[#F4F6F3] p-3.5 rounded-2xl border border-[#E5EAE5] self-stretch sm:self-auto justify-between sm:justify-start">
              <div>
                <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block">
                  Accumulated Experience
                </span>
                <span className="text-2xl font-extrabold text-[#0E2A1E] flex items-center gap-1.5">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  {userStats.totalXp} <span className="text-xs font-semibold text-gray-500">XP</span>
                </span>
              </div>
              <div className="text-right pl-4 border-l border-gray-200 text-[11px] text-gray-500">
                <div>Lessons: +{userStats.breakdown.lessonXp} XP</div>
                <div>Quizzes: +{userStats.breakdown.quizXp} XP</div>
                <div>Farm: +{userStats.breakdown.simulationXp} XP</div>
              </div>
            </div>
          </div>

          {/* Progress to Next Tier */}
          <div className="mt-6">
            <div className="flex items-center justify-between text-xs font-semibold text-gray-600 mb-1.5">
              <span>Progress to {userStats.nextTier ? userStats.nextTier.title : 'Max Tier'}</span>
              <span>
                {userStats.nextTier
                  ? `${userStats.totalXp} / ${userStats.nextTier.minXp} XP (${userStats.levelProgressPct}%)`
                  : 'Mastery Tier Achieved'}
              </span>
            </div>
            <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${userStats.levelProgressPct}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="bg-linear-to-r from-[#10B981] to-[#059669] h-full rounded-full"
              />
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-[#E5EAE5] text-xs">
            <div className="bg-[#FAFBF9] p-3 rounded-xl border border-[#E5EAE5]">
              <span className="text-gray-500 block mb-0.5">Lessons Completed</span>
              <span className="text-base font-bold text-[#0E2A1E] flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                {userStats.completedLessonCount} Lessons
              </span>
            </div>

            <div className="bg-[#FAFBF9] p-3 rounded-xl border border-[#E5EAE5]">
              <span className="text-gray-500 block mb-0.5">Quizzes Passed</span>
              <span className="text-base font-bold text-[#0E2A1E] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                {userStats.quizzesPassed} Quizzes
              </span>
            </div>

            <div className="bg-[#FAFBF9] p-3 rounded-xl border border-[#E5EAE5]">
              <span className="text-gray-500 block mb-0.5">Crops Harvested</span>
              <span className="text-base font-bold text-[#0E2A1E] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                {userStats.cropsHarvested} Harvests
              </span>
            </div>

            <div className="bg-[#FAFBF9] p-3 rounded-xl border border-[#E5EAE5]">
              <span className="text-gray-500 block mb-0.5">Badges Earned</span>
              <span className="text-base font-bold text-[#0E2A1E] flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-purple-600" />
                {userStats.unlockedBadgesCount} / {userStats.badges.length}
              </span>
            </div>
          </div>
        </div>

        {/* Achievements & Badges Showcase (SRS GAME-REQ-05) */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-[#0E2A1E]">
                Organic Agriculture Mastery Badges
              </h2>
              <p className="text-xs text-gray-500">
                Demonstrate proficiency across soil microbiology, integrated pest management, and water stewardship.
              </p>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {userStats.unlockedBadgesCount} Unlocked
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {userStats.badges.map((badge) => {
              const IconComp = getBadgeIcon(badge.icon);

              return (
                <div
                  key={badge.id}
                  className={`rounded-2xl border p-4.5 transition-all flex flex-col justify-between ${
                    badge.unlocked
                      ? 'bg-white border-[#10B981]/50 shadow-xs'
                      : 'bg-gray-50/70 border-gray-200 opacity-70'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border ${
                        badge.unlocked
                          ? 'bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0]'
                          : 'bg-gray-100 text-gray-400 border-gray-200'
                      }`}
                    >
                      <IconComp className="w-5 h-5" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-[#0E2A1E]">
                          {badge.title}
                        </h3>
                      </div>
                      <span className="text-[10px] font-semibold text-emerald-700 uppercase tracking-wider block mt-0.5">
                        {badge.category} • {badge.tier}
                      </span>
                      <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                        {badge.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between text-[11px]">
                    <span
                      className={`font-semibold ${
                        badge.unlocked ? 'text-emerald-700' : 'text-gray-500'
                      }`}
                    >
                      {badge.progressText}
                    </span>
                    <span
                      className="text-gray-400 hover:text-gray-600 cursor-help"
                      title={badge.hint}
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top 3 Podium Showcase (SRS GAME-REQ-06) */}
        <div>
          <h2 className="text-xl font-bold text-[#0E2A1E] mb-1">
            Top Scholar Podium
          </h2>
          <p className="text-xs text-gray-500 mb-6">
            Leading researchers and learners recognized for academic rigor and regenerative simulation outcomes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 items-end">
            
            {/* Rank 2 - Silver (Left) */}
            {top3[1] && (
              <div className="bg-white rounded-3xl border-2 border-slate-300 p-5 shadow-sm order-2 md:order-1 text-center flex flex-col items-center">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 border border-slate-300 flex items-center justify-center font-extrabold text-base mb-2 shadow-inner">
                  🥈 #2
                </div>
                <h3 className="text-base font-bold text-[#0E2A1E]">
                  {top3[1].displayName}
                </h3>
                <span className="text-xs text-gray-500">{top3[1].institution}</span>
                <div className="mt-3 px-3 py-1 bg-slate-50 border border-slate-200 rounded-full text-xs font-extrabold text-slate-800">
                  {top3[1].baseXp} XP
                </div>
              </div>
            )}

            {/* Rank 1 - Gold (Center, Elevated) */}
            {top3[0] && (
              <div className="bg-linear-to-b from-[#FFFBEB] to-white rounded-3xl border-2 border-amber-400 p-6 shadow-md order-1 md:order-2 text-center flex flex-col items-center relative -translate-y-2">
                <div className="absolute -top-3 px-3 py-0.5 rounded-full bg-amber-500 text-white font-extrabold text-[10px] tracking-wider uppercase shadow-xs">
                  Cohort Champion
                </div>
                <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 border border-amber-300 flex items-center justify-center font-extrabold text-xl mb-2 shadow-inner">
                  🥇 #1
                </div>
                <h3 className="text-lg font-extrabold text-[#0E2A1E]">
                  {top3[0].displayName}
                </h3>
                <span className="text-xs text-gray-500">{top3[0].institution}</span>
                <div className="mt-3 px-3.5 py-1 bg-amber-100 border border-amber-300 rounded-full text-xs font-extrabold text-amber-900">
                  {top3[0].baseXp} XP
                </div>
              </div>
            )}

            {/* Rank 3 - Bronze (Right) */}
            {top3[2] && (
              <div className="bg-white rounded-3xl border-2 border-amber-700/30 p-5 shadow-sm order-3 md:order-3 text-center flex flex-col items-center">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-900 border border-amber-300 flex items-center justify-center font-extrabold text-base mb-2 shadow-inner">
                  🥉 #3
                </div>
                <h3 className="text-base font-bold text-[#0E2A1E]">
                  {top3[2].displayName}
                </h3>
                <span className="text-xs text-gray-500">{top3[2].institution}</span>
                <div className="mt-3 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-xs font-extrabold text-amber-900">
                  {top3[2].baseXp} XP
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Complete Leaderboard Table (SRS GAME-REQ-06) */}
        <div className="bg-white rounded-3xl border border-[#D5DDD5] overflow-hidden shadow-sm">
          
          {/* Table Controls */}
          <div className="p-4 sm:p-5 border-b border-[#E5EAE5] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-[#10B981]" />
              <h3 className="text-base font-bold text-[#0E2A1E]">
                Cohort Standings
              </h3>
            </div>

            {/* Tab Filter Pills */}
            <div className="flex items-center gap-1.5 bg-[#F4F6F3] p-1 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-white text-[#0E2A1E] shadow-2xs font-bold'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                All Scholars ({totalLearners})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('top3')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'top3'
                    ? 'bg-white text-[#0E2A1E] shadow-2xs font-bold'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Podium Top 3
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('me')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'me'
                    ? 'bg-white text-[#0E2A1E] shadow-2xs font-bold'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                My Position (#{userRank})
              </button>
            </div>
          </div>

          {/* Table Component */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#FAFBF9] border-b border-[#E5EAE5] text-gray-500 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4 sm:px-6">Rank</th>
                  <th className="py-3 px-4 sm:px-6">Scholar</th>
                  <th className="py-3 px-4 hidden sm:table-cell">Institution</th>
                  <th className="py-3 px-4 text-center">Quizzes</th>
                  <th className="py-3 px-4 text-center">Harvests</th>
                  <th className="py-3 px-4 sm:px-6 text-right">Total XP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5EAE5]">
                {displayedLearners.map((learner) => {
                  const isCurrent = learner.isCurrentUser;

                  return (
                    <tr
                      key={learner.id}
                      className={`transition-colors ${
                        isCurrent
                          ? 'bg-[#F0FDF4] hover:bg-[#DCFCE7]/70 font-semibold'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      {/* Rank Position */}
                      <td className="py-3.5 px-4 sm:px-6">
                        <span
                          className={`inline-flex items-center justify-center w-7 h-7 rounded-xl font-mono text-xs font-bold ${
                            learner.rank === 1
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : learner.rank === 2
                              ? 'bg-slate-100 text-slate-800 border border-slate-300'
                              : learner.rank === 3
                              ? 'bg-amber-50 text-amber-800 border border-amber-200'
                              : 'text-gray-600 bg-gray-100'
                          }`}
                        >
                          {learner.rank}
                        </span>
                      </td>

                      {/* Display Name & Distinction */}
                      <td className="py-3.5 px-4 sm:px-6">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                              isCurrent
                                ? 'bg-[#10B981] text-white'
                                : 'bg-gray-200 text-gray-700'
                            }`}
                          >
                            {isCurrent ? <User className="w-4 h-4" /> : learner.avatar}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-[#0E2A1E]">
                                {learner.displayName}
                              </span>
                              {isCurrent && (
                                <Badge variant="emerald" size="sm">
                                  You
                                </Badge>
                              )}
                              {learner.isSample && (
                                <span className="text-[10px] text-gray-400">
                                  Sample Peer
                                </span>
                              )}
                            </div>
                            <span className="sm:hidden text-xs text-gray-500 block">
                              {learner.institution}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Institution */}
                      <td className="py-3.5 px-4 hidden sm:table-cell text-gray-600 text-xs">
                        {learner.institution}
                      </td>

                      {/* Quizzes Passed */}
                      <td className="py-3.5 px-4 text-center font-semibold text-gray-700">
                        {learner.quizzesPassed}
                      </td>

                      {/* Crops Harvested */}
                      <td className="py-3.5 px-4 text-center font-semibold text-gray-700">
                        {learner.cropsHarvested}
                      </td>

                      {/* Total XP */}
                      <td className="py-3.5 px-4 sm:px-6 text-right">
                        <span className="font-extrabold text-[#0E2A1E] font-mono text-sm">
                          {learner.baseXp}
                        </span>
                        <span className="text-xs text-gray-400 ml-1">XP</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table Footer / Disclaimers */}
          <div className="bg-[#FAFBF9] p-4 border-t border-[#E5EAE5] text-[11px] text-gray-500 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <span>
              ℹ️ Tie-breaking logic: Sorted by Total XP, then Quizzes Passed, then Simulator Harvests (SRS GAME-REQ-02).
            </span>
            <span>
              Academic Integrity: Cohort participants are demonstration peer benchmarks.
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
