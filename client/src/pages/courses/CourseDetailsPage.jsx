import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Clock, CheckCircle2, Award, ArrowRight, Play, RefreshCw } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { MOCK_COURSES } from '../../data/mockCourses';
import { progressService } from '../../services/progressService';

export const CourseDetailsPage = () => {
  const { id } = useParams();

  // Match by id or slug
  const course = MOCK_COURSES.find((c) => c.id === id || c.slug === id);

  const [completedLessonIds, setCompletedLessonIds] = useState(() =>
    course ? progressService.getCompletedLessons(course.id) : []
  );
  const [quizRecord, setQuizRecord] = useState(() =>
    course ? progressService.getQuizResult(course.id) : null
  );

  // Invalid Course ID handling
  if (!course) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 bg-[#FBFBF9]">
        <div className="max-w-md w-full bg-white rounded-3xl border border-[#D5DDD5] p-8 text-center shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4 border border-red-100">
            <BookOpen className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-[#0E2A1E] font-['Plus_Jakarta_Sans',sans-serif] mb-2">
            Course Not Found
          </h2>
          <p className="text-sm text-gray-600 mb-6 leading-relaxed">
            The course identifier <code className="bg-gray-100 px-2 py-0.5 rounded text-red-700">{id}</code> does not match any curriculum in our active database.
          </p>
          <Link to="/courses">
            <Button variant="primary" size="md" icon={ArrowLeft} iconPosition="left">
              Return to Course Catalog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const totalLessons = course.lessons.length;
  const progressPct = progressService.getCourseProgressPercentage(course.id, totalLessons);

  // Find next uncompleted lesson to recommend
  const nextLesson = course.lessons.find((l) => !completedLessonIds.includes(l.id)) || course.lessons[0];

  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset your progress for this course?')) {
      progressService.resetCourseProgress(course.id);
      setCompletedLessonIds([]);
      setQuizRecord(null);
    }
  };

  return (
    <div className="py-8 sm:py-12 bg-[#FBFBF9] min-h-[90vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs font-semibold text-gray-500">
          <Link to="/courses" className="hover:text-[#10B981] flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Course Catalog</span>
          </Link>
          <span>/</span>
          <span className="text-gray-400">{course.category}</span>
          <span>/</span>
          <span className="text-gray-800 font-bold truncate max-w-xs">{course.title}</span>
        </div>

        {/* Main Grid: Content & Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Course Description & Syllabus (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            
            {/* Course Header Banner Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5EAE5] shadow-xs">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span
                  className="text-xs font-bold px-3 py-1 rounded-md"
                  style={{
                    backgroundColor: `${course.difficultyColor}15`,
                    color: course.difficultyColor,
                  }}
                >
                  {course.difficulty} Level
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-[#10B981] bg-[#ECFDF5] px-3 py-1 rounded-md border border-[#A7F3D0]">
                  {course.category}
                </span>
                <div className="ml-auto flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  <span>{course.estimatedHours} Total Duration</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0E2A1E] font-['Plus_Jakarta_Sans',sans-serif] tracking-tight mb-4 leading-tight">
                {course.title}
              </h1>

              <p className="text-base text-gray-600 leading-relaxed mb-6">
                {course.description}
              </p>

              {/* Instructor Bio Bar */}
              <div className="flex items-center gap-3 pt-5 border-t border-gray-100 text-xs">
                <div className="w-10 h-10 rounded-full bg-[#143D2B] text-white flex items-center justify-center font-bold text-sm">
                  {course.instructor.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <div className="font-bold text-[#0E2A1E]">{course.instructor.name}</div>
                  <div className="text-gray-500">{course.instructor.role}</div>
                </div>
              </div>
            </div>

            {/* Learning Objectives */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5EAE5] shadow-xs">
              <h2 className="text-lg font-bold text-[#0E2A1E] font-['Plus_Jakarta_Sans',sans-serif] mb-4">
                What You Will Master (Learning Objectives)
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {course.learningObjectives.map((objective, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FBFBF9] border border-[#EAEFEA] text-xs text-gray-700 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                    <span>{objective}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Syllabus / Lessons List */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5EAE5] shadow-xs">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-[#0E2A1E] font-['Plus_Jakarta_Sans',sans-serif]">
                    Course Syllabus ({totalLessons} Ordered Lessons)
                  </h2>
                  <p className="text-xs text-gray-500">Read lessons in sequence to prepare for the assessment quiz.</p>
                </div>
                <span className="text-xs font-bold text-emerald-800 bg-[#ECFDF5] px-3 py-1 rounded-full border border-[#A7F3D0]">
                  {completedLessonIds.length} / {totalLessons} Completed
                </span>
              </div>

              {/* Ordered Lessons List */}
              <div className="space-y-3">
                {course.lessons.map((lesson, index) => {
                  const isDone = completedLessonIds.includes(lesson.id);
                  return (
                    <div
                      key={lesson.id}
                      className={`p-4 sm:p-5 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                        isDone
                          ? 'bg-[#F0FDF4]/60 border-[#BBF7D0]'
                          : 'bg-white hover:bg-[#FBFBF9] border-[#E5EAE5]'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                            isDone
                              ? 'bg-[#10B981] text-white shadow-xs'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {isDone ? <CheckCircle2 className="w-5 h-5" /> : index + 1}
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-[#0E2A1E]">
                            <Link
                              to={`/courses/${course.id}/lessons/${lesson.id}`}
                              className="hover:text-[#10B981] transition-colors"
                            >
                              {lesson.title}
                            </Link>
                          </h3>
                          <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
                            <span>{lesson.duration}</span>
                            <span>•</span>
                            <span className={isDone ? 'text-emerald-700 font-semibold' : 'text-gray-400'}>
                              {isDone ? 'Completed' : 'Not Started'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <Link to={`/courses/${course.id}/lessons/${lesson.id}`}>
                        <Button
                          variant={isDone ? 'outline' : 'secondary'}
                          size="sm"
                          icon={Play}
                          iconPosition="right"
                        >
                          {isDone ? 'Review' : 'Read'}
                        </Button>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Assessment Quiz Box */}
            <div className="bg-linear-to-br from-[#0E2A1E] to-[#1B4D36] rounded-3xl p-6 sm:p-8 text-white shadow-md border border-[#1F4A37]">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#10B981]/20 text-emerald-300 border border-[#10B981]/30 mb-3">
                    <Award className="w-3.5 h-3.5 text-[#10B981]" />
                    <span>Module Assessment (SRS LEARN-REQ-04)</span>
                  </div>
                  <h3 className="text-xl font-bold font-['Plus_Jakarta_Sans',sans-serif] mb-2">
                    {course.quiz.title}
                  </h3>
                  <p className="text-xs text-emerald-100/80 max-w-xl leading-relaxed mb-4">
                    5 multiple-choice objective questions. Passing threshold: {course.quiz.passingScore}%. Earn +{course.quiz.xpReward} XP upon mastery.
                  </p>

                  {quizRecord && (
                    <div className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-lg bg-black/30 text-white border border-white/10">
                      <span>Last Score: {quizRecord.score}%</span>
                      <span>•</span>
                      <span className={quizRecord.passed ? 'text-[#34D399]' : 'text-amber-400'}>
                        {quizRecord.passed ? 'Status: PASSED' : 'Status: RETRY NEEDED'}
                      </span>
                    </div>
                  )}
                </div>

                <Link to={`/courses/${course.id}/quiz`} className="shrink-0 w-full sm:w-auto">
                  <Button
                    variant="secondary"
                    size="md"
                    className="w-full sm:w-auto shadow-md font-bold"
                    icon={ArrowRight}
                    iconPosition="right"
                  >
                    {quizRecord ? 'Retake Quiz' : 'Start Quiz'}
                  </Button>
                </Link>
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Progress & Quick Action Card (4 cols) */}
          <div className="lg:col-span-4 sticky top-24 flex flex-col gap-6">
            
            {/* Enrollment / Progress Card */}
            <div className="bg-white rounded-3xl p-6 border border-[#E5EAE5] shadow-xs">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">
                Your Learning Status
              </h3>

              {/* Progress Bar / Percentage */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs font-bold mb-2">
                  <span className="text-gray-600">Syllabus Completion</span>
                  <span className="text-[#0E2A1E] text-base">{progressPct}%</span>
                </div>
                <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300 bg-[#10B981]"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>

              {/* Primary Action Button */}
              <div className="space-y-3">
                <Link to={`/courses/${course.id}/lessons/${nextLesson.id}`} className="block w-full">
                  <Button variant="primary" size="lg" className="w-full shadow-md font-bold" icon={ArrowRight} iconPosition="right">
                    {progressPct === 0
                      ? 'Begin First Lesson'
                      : progressPct === 100
                      ? 'Review Lesson 1'
                      : `Continue: ${nextLesson.title}`}
                  </Button>
                </Link>

                <Link to={`/courses/${course.id}/quiz`} className="block w-full">
                  <Button variant="outline" size="md" className="w-full">
                    Take Course Quiz
                  </Button>
                </Link>
              </div>

              {/* Reset Progress Helper for testing */}
              {completedLessonIds.length > 0 && (
                <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                  <button
                    onClick={handleResetProgress}
                    className="text-xs text-gray-400 hover:text-red-600 flex items-center justify-center gap-1 mx-auto cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Reset Course Progress (Testing)</span>
                  </button>
                </div>
              )}
            </div>

            {/* Course Information Metadata Box */}
            <div className="bg-white rounded-3xl p-6 border border-[#E5EAE5] shadow-xs text-xs space-y-3.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 pb-2 border-b border-gray-100">
                Course Highlights
              </h3>
              <div className="flex items-center justify-between text-gray-600">
                <span>Domain</span>
                <strong className="text-gray-900">{course.category}</strong>
              </div>
              <div className="flex items-center justify-between text-gray-600">
                <span>Skill Level</span>
                <strong className="text-gray-900">{course.difficulty}</strong>
              </div>
              <div className="flex items-center justify-between text-gray-600">
                <span>Instruction Mode</span>
                <strong className="text-gray-900">Self-Paced Interactive</strong>
              </div>
              <div className="flex items-center justify-between text-gray-600">
                <span>Sim Integration</span>
                <strong className="text-emerald-700 font-bold">Unlocks Simulator Rules</strong>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
