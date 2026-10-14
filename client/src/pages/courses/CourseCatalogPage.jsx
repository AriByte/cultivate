import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, Clock, ArrowRight, Filter, Award } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { MOCK_COURSES } from '../../data/mockCourses';
import { progressService } from '../../services/progressService';

export const CourseCatalogPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  // Categories extracted dynamically from course data
  const categories = useMemo(() => {
    const set = new Set(MOCK_COURSES.map((c) => c.category));
    return ['All', ...Array.from(set)];
  }, []);

  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  // Combined filtering logic
  const filteredCourses = useMemo(() => {
    return MOCK_COURSES.filter((course) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.learningObjectives.some((obj) => obj.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === 'All' || course.category === selectedCategory;

      const matchesDifficulty =
        selectedDifficulty === 'All' || course.difficulty === selectedDifficulty;

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [searchQuery, selectedCategory, selectedDifficulty]);

  const hasActiveFilters = searchQuery !== '' || selectedCategory !== 'All' || selectedDifficulty !== 'All';

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedDifficulty('All');
  };

  return (
    <div className="py-10 sm:py-16 bg-[#FBFBF9] min-h-[85vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Breadcrumbs & Title */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0] mb-3">
            Academic Curriculum
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0E2A1E] font-['Plus_Jakarta_Sans',sans-serif] tracking-tight mb-4">
            Organic Agronomy Courses
          </h1>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            Gain mastery in living soil biology, biological pest defense, water stewardship, and crop rotation through structured lessons and self-testing quizzes.
          </p>
        </div>

        {/* Search & Filter Controls Toolbar */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E5EAE5] shadow-xs mb-10">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by topic, e.g. 'composting', 'neem', 'irrigation'..."
                className="w-full pl-11 pr-10 py-3 rounded-xl border border-[#D5DDD5] focus:outline-none focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/20 text-sm placeholder:text-gray-400 bg-[#FBFBF9] transition-all"
                aria-label="Search courses"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
                  aria-label="Clear search text"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Difficulty Dropdown */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500 shrink-0 hidden sm:inline" />
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full sm:w-auto px-4 py-3 rounded-xl border border-[#D5DDD5] text-sm font-semibold text-gray-700 bg-[#FBFBF9] focus:outline-none focus:border-[#10B981] cursor-pointer"
                aria-label="Filter by difficulty"
              >
                {difficulties.map((diff) => (
                  <option key={diff} value={diff}>
                    {diff === 'All' ? 'All Difficulties' : `${diff} Level`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Filter Pills Bar */}
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-100">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 mr-1">
              Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#143D2B] text-white shadow-2xs'
                    : 'bg-[#F4F6F3] text-gray-600 hover:bg-[#EAEFEA]'
                }`}
              >
                {cat}
              </button>
            ))}

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="ml-auto text-xs font-bold text-red-600 hover:text-red-700 hover:underline cursor-pointer flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs font-semibold text-gray-500 mb-6 px-1">
          <span>Showing {filteredCourses.length} of {MOCK_COURSES.length} courses</span>
          {hasActiveFilters && <span className="text-emerald-700 font-bold">Filtered View Active</span>}
        </div>

        {/* Courses Grid or Empty State */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => {
              const progressPct = progressService.getCourseProgressPercentage(course.id, course.lessonsCount);
              const quizRecord = progressService.getQuizResult(course.id);
              const isFinished = progressPct === 100 && quizRecord?.passed;

              return (
                <Card
                  key={course.id}
                  interactive
                  className="flex flex-col justify-between h-full p-6 sm:p-7 border border-[#E5EAE5] bg-white shadow-xs"
                >
                  <div>
                    {/* Header: Difficulty & Duration */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span
                        className="text-xs font-bold px-2.5 py-1 rounded-md"
                        style={{
                          backgroundColor: `${course.difficultyColor}15`,
                          color: course.difficultyColor,
                        }}
                      >
                        {course.difficulty}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        <span>{course.estimatedHours}</span>
                      </div>
                    </div>

                    {/* Category Label */}
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#10B981] mb-1.5 block">
                      {course.category}
                    </span>

                    {/* Title */}
                    <h2 className="text-xl font-bold text-[#0E2A1E] font-['Plus_Jakarta_Sans',sans-serif] mb-2 leading-snug">
                      <Link to={`/courses/${course.id}`} className="hover:text-[#10B981] transition-colors">
                        {course.title}
                      </Link>
                    </h2>

                    {/* Tagline / Description */}
                    <p className="text-sm text-gray-600 mb-5 leading-relaxed line-clamp-3">
                      {course.description}
                    </p>

                    {/* Progress Indicator */}
                    <div className="mb-5 pt-3 border-t border-gray-100">
                      <div className="flex items-center justify-between text-xs mb-1.5 font-semibold">
                        <span className="text-gray-500">Course Progress</span>
                        <span className={isFinished ? 'text-emerald-700 font-bold' : 'text-gray-700'}>
                          {progressPct}% Completed
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-300"
                          style={{
                            width: `${progressPct}%`,
                            backgroundColor: isFinished ? '#059669' : '#10B981',
                          }}
                        />
                      </div>
                    </div>

                    {/* Quiz Passed Badge if applicable */}
                    {quizRecord?.passed && (
                      <div className="mb-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#065F46] bg-[#ECFDF5] px-2.5 py-1 rounded-md border border-[#A7F3D0]">
                        <Award className="w-3.5 h-3.5 text-[#10B981]" />
                        <span>Quiz Mastered (Best: {quizRecord.highestScore}%)</span>
                      </div>
                    )}
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-500">
                      {course.lessonsCount} Lessons • Quiz
                    </span>
                    <Link to={`/courses/${course.id}`}>
                      <Button
                        variant={progressPct > 0 ? 'secondary' : 'primary'}
                        size="sm"
                        icon={ArrowRight}
                        iconPosition="right"
                      >
                        {progressPct === 0 ? 'Start Course' : progressPct === 100 ? 'Review Course' : 'Continue'}
                      </Button>
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          /* Empty Search / Filter State */
          <div className="bg-white rounded-3xl border border-[#D5DDD5] p-12 text-center max-w-xl mx-auto shadow-2xs">
            <div className="w-14 h-14 rounded-2xl bg-[#FEF3C7] text-[#92400E] flex items-center justify-center mx-auto mb-4 border border-[#FDE68A]">
              <Search className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-[#0E2A1E] font-['Plus_Jakarta_Sans',sans-serif] mb-2">
              No matching courses found
            </h3>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              We couldn't find any courses matching your search "{searchQuery}" under the selected filters.
            </p>
            <Button variant="outline" size="md" onClick={resetFilters}>
              Reset All Filters
            </Button>
          </div>
        )}

      </div>
    </div>
  );
};
