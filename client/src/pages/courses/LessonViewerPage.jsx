import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, Award, Check, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { MOCK_COURSES } from '../../data/mockCourses';
import { progressService } from '../../services/progressService';

export const LessonViewerPage = () => {
  const { id: courseId, lessonId } = useParams();

  const course = MOCK_COURSES.find((c) => c.id === courseId || c.slug === courseId);
  const [completedIds, setCompletedIds] = useState(() =>
    course ? progressService.getCompletedLessons(course.id) : []
  );

  // Invalid Course Handling
  if (!course) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 bg-[#FBFBF9]">
        <div className="max-w-md w-full bg-white rounded-3xl border border-[#D5DDD5] p-8 text-center">
          <h2 className="text-xl font-bold text-red-700 mb-2">Course Not Found</h2>
          <p className="text-sm text-gray-600 mb-6">Could not locate course with ID {courseId}.</p>
          <Link to="/courses">
            <Button variant="primary" size="md">Return to Catalog</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Find the target lesson
  const currentLessonIndex = course.lessons.findIndex((l) => l.id === lessonId);
  const currentLesson = course.lessons[currentLessonIndex];

  // Invalid Lesson Handling
  if (!currentLesson) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 bg-[#FBFBF9]">
        <div className="max-w-md w-full bg-white rounded-3xl border border-[#D5DDD5] p-8 text-center">
          <h2 className="text-xl font-bold text-red-700 mb-2">Lesson Not Found</h2>
          <p className="text-sm text-gray-600 mb-6">Lesson ID "{lessonId}" does not exist in this course.</p>
          <Link to={`/courses/${course.id}`}>
            <Button variant="primary" size="md">Back to Course Details</Button>
          </Link>
        </div>
      </div>
    );
  }

  const isCompleted = completedIds.includes(currentLesson.id);
  const hasPrevious = currentLessonIndex > 0;
  const hasNext = currentLessonIndex < course.lessons.length - 1;
  const previousLesson = hasPrevious ? course.lessons[currentLessonIndex - 1] : null;
  const nextLesson = hasNext ? course.lessons[currentLessonIndex + 1] : null;

  const totalLessons = course.lessons.length;
  const progressPct = progressService.getCourseProgressPercentage(course.id, totalLessons);

  const toggleComplete = () => {
    progressService.toggleLessonCompletion(course.id, currentLesson.id);
    setCompletedIds(progressService.getCompletedLessons(course.id));
  };

  return (
    <div className="py-8 bg-[#FBFBF9] min-h-[90vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Navigation Strip */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-xs pb-4 border-b border-[#E5EAE5]">
          <Link
            to={`/courses/${course.id}`}
            className="flex items-center gap-1.5 font-bold text-gray-600 hover:text-[#0E2A1E] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#10B981]" />
            <span>Back to Course: {course.title}</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-gray-500 font-medium">
              Lesson {currentLessonIndex + 1} of {totalLessons}
            </span>
            <div className="w-24 bg-gray-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#10B981] h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <span className="font-bold text-[#0E2A1E]">{progressPct}%</span>
          </div>
        </div>

        {/* 2-Column Classroom Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Column: Reading Canvas (8 cols) */}
          <main className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Lesson Title & Header Bar */}
            <article className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E5EAE5] shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#10B981] bg-[#ECFDF5] px-3 py-1 rounded-full border border-[#A7F3D0]">
                  Unit {currentLessonIndex + 1} • {currentLesson.duration}
                </span>

                {/* Mark as Complete Toggle Button */}
                <button
                  type="button"
                  onClick={toggleComplete}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    isCompleted
                      ? 'bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0]'
                      : 'bg-[#FBFBF9] hover:bg-[#F0FDF4] text-gray-700 border-[#D5DDD5]'
                  }`}
                  aria-pressed={isCompleted}
                >
                  <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-[#10B981]' : 'text-gray-400'}`} />
                  <span>{isCompleted ? 'Marked Complete' : 'Mark as Complete'}</span>
                </button>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0E2A1E] font-['Plus_Jakarta_Sans',sans-serif] tracking-tight mb-4">
                {currentLesson.title}
              </h1>

              <p className="text-base text-gray-500 italic mb-8 pb-6 border-b border-gray-100">
                {currentLesson.summary}
              </p>

              {/* Render Structured Sections */}
              <div className="space-y-6 text-gray-800 leading-relaxed text-base">
                {currentLesson.sections.map((sec, idx) => {
                  if (sec.type === 'paragraph') {
                    return (
                      <p key={idx} className="leading-relaxed text-gray-700">
                        {sec.content}
                      </p>
                    );
                  }

                  if (sec.type === 'callout') {
                    const calloutThemes = {
                      tip: 'bg-[#F0FDF4] border-[#86EFAC] text-[#14532D]',
                      warning: 'bg-[#FFFBEB] border-[#FDE68A] text-[#78350F]',
                      info: 'bg-[#F0F9FF] border-[#BAE6FD] text-[#0C4A6E]',
                    };

                    return (
                      <div
                        key={idx}
                        className={`p-5 rounded-2xl border ${calloutThemes[sec.variant] || calloutThemes.tip} my-6 shadow-2xs`}
                      >
                        <h4 className="text-xs font-extrabold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>{sec.title}</span>
                        </h4>
                        <p className="text-sm leading-relaxed">{sec.content}</p>
                      </div>
                    );
                  }

                  if (sec.type === 'key_takeaways') {
                    return (
                      <div key={idx} className="bg-[#FBFBF9] p-6 rounded-2xl border border-[#EAEFEA] my-6">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#0E2A1E] mb-3">
                          Key Agronomic Takeaways:
                        </h4>
                        <ul className="space-y-2.5">
                          {sec.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                              <Check className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  }

                  return null;
                })}
              </div>

              {/* Bottom Complete & Navigation Bar */}
              <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={toggleComplete}
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer border ${
                    isCompleted
                      ? 'bg-[#10B981] text-white border-[#10B981] shadow-xs'
                      : 'bg-white hover:bg-[#F0FDF4] text-[#143D2B] border-[#143D2B]/30'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isCompleted ? 'Completed ✓' : 'Mark Lesson as Complete'}</span>
                </button>

                {/* Next Action Link */}
                {hasNext ? (
                  <Link
                    to={`/courses/${course.id}/lessons/${nextLesson.id}`}
                    className="w-full sm:w-auto"
                  >
                    <Button variant="primary" size="md" className="w-full sm:w-auto" icon={ArrowRight} iconPosition="right">
                      Next: {nextLesson.title}
                    </Button>
                  </Link>
                ) : (
                  <Link
                    to={`/courses/${course.id}/quiz`}
                    className="w-full sm:w-auto"
                  >
                    <Button variant="secondary" size="md" className="w-full sm:w-auto font-bold" icon={Award} iconPosition="right">
                      Take Final Assessment Quiz
                    </Button>
                  </Link>
                )}
              </div>
            </article>

            {/* Previous / Next Lesson Footer Pager */}
            <div className="flex items-center justify-between gap-4 text-xs font-bold">
              {hasPrevious ? (
                <Link
                  to={`/courses/${course.id}/lessons/${previousLesson.id}`}
                  className="flex items-center gap-1.5 text-gray-600 hover:text-[#0E2A1E] p-2 rounded-lg hover:bg-white transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Prev: {previousLesson.title}</span>
                </Link>
              ) : <div />}

              {hasNext && (
                <Link
                  to={`/courses/${course.id}/lessons/${nextLesson.id}`}
                  className="flex items-center gap-1.5 text-gray-600 hover:text-[#0E2A1E] p-2 rounded-lg hover:bg-white transition-colors ml-auto"
                >
                  <span>Next: {nextLesson.title}</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              )}
            </div>

          </main>

          {/* Sidebar Column: Course Module Syllabus (4 cols) */}
          <aside className="lg:col-span-4 sticky top-24 space-y-5">
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E5EAE5] shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4 pb-2 border-b border-gray-100">
                Course Syllabus Units
              </h3>

              <div className="space-y-2">
                {course.lessons.map((lesson, idx) => {
                  const isDone = completedIds.includes(lesson.id);
                  const isCurrent = lesson.id === currentLesson.id;

                  return (
                    <Link
                      key={lesson.id}
                      to={`/courses/${course.id}/lessons/${lesson.id}`}
                      className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-between gap-2.5 transition-all block ${
                        isCurrent
                          ? 'bg-[#143D2B] text-white border-[#143D2B] shadow-2xs'
                          : isDone
                          ? 'bg-[#F0FDF4] text-emerald-900 border-[#DCFCE7] hover:bg-[#DCFCE7]'
                          : 'bg-white hover:bg-gray-50 text-gray-700 border-[#E5EAE5]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <span
                          className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-[10px] shrink-0 ${
                            isCurrent
                              ? 'bg-[#10B981] text-white'
                              : isDone
                              ? 'bg-[#10B981] text-white'
                              : 'bg-gray-200 text-gray-700'
                          }`}
                        >
                          {isDone ? '✓' : idx + 1}
                        </span>
                        <span className="truncate">{lesson.title}</span>
                      </div>
                      <span className={`text-[10px] shrink-0 ${isCurrent ? 'text-emerald-300' : 'text-gray-400'}`}>
                        {lesson.duration}
                      </span>
                    </Link>
                  );
                })}
              </div>

              {/* Assessment Quiz Link Card */}
              <div className="mt-5 pt-4 border-t border-gray-100">
                <Link
                  to={`/courses/${course.id}/quiz`}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-linear-to-r from-[#FEF3C7] to-[#FEF08A] border border-[#FDE68A] text-xs font-bold text-[#78350F] hover:shadow-xs transition-shadow"
                >
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-600" />
                    <span>Assessment Quiz</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </aside>

        </div>

      </div>
    </div>
  );
};
