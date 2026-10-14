import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, CheckCircle2, ArrowRight, X } from 'lucide-react';
import { SectionHeading } from '../../components/common/SectionHeading';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { MOCK_COURSES } from '../../data/mockCourses';

export const CoursesPreviewSection = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <section id="courses" className="py-16 sm:py-24 bg-[#FBFBF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Academic Curriculum"
          title="Structured Organic Agronomy Courses"
          description="Progress through ordered learning units, analyze biological case studies, and complete objective quizzes to unlock practical simulator scenarios."
        />

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_COURSES.map((course) => (
            <Card
              key={course.id}
              interactive
              className="flex flex-col justify-between h-full p-6 sm:p-7 border border-[#E5EAE5] bg-white shadow-xs"
            >
              <div>
                {/* Course Header Badges */}
                <div className="flex items-center justify-between gap-2 mb-4">
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

                {/* Course Title & Tagline */}
                <h3 className="text-xl font-bold text-[#0E2A1E] font-['Plus_Jakarta_Sans',sans-serif] mb-2 leading-snug">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  {course.tagline}
                </p>

                {/* Learning Objectives Preview */}
                <div className="space-y-2.5 mb-6 pt-4 border-t border-gray-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-2">
                    Key Competencies:
                  </span>
                  {course.learningObjectives.slice(0, 2).map((objective, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                      <span className="line-clamp-2 leading-snug">{objective}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Card Actions */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500">
                  {course.lessonsCount} Structured Lessons
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedCourse(course)}
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  View Syllabus
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Global Catalog Footer Link */}
        <div className="text-center mt-12">
          <Link to="/courses">
            <Button variant="secondary" size="md" icon={BookOpen} iconPosition="left">
              Browse Full Course Catalog & Quizzes
            </Button>
          </Link>
        </div>
      </div>

      {/* Course Syllabus Modal Preview */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#D5DDD5] max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-md inline-block mb-2"
                  style={{
                    backgroundColor: `${selectedCourse.difficultyColor}15`,
                    color: selectedCourse.difficultyColor,
                  }}
                >
                  {selectedCourse.difficulty} Level
                </span>
                <h3 className="text-xl font-extrabold text-[#0E2A1E] font-['Plus_Jakarta_Sans',sans-serif]">
                  {selectedCourse.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCourse(null)}
                className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-6">
              {selectedCourse.tagline}
            </p>

            {/* Syllabus Lessons List */}
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
              Included Lessons:
            </h4>
            <div className="space-y-2 mb-6">
              {selectedCourse.lessons.map((lesson, index) => (
                <div key={lesson.id} className="flex items-center justify-between p-3 rounded-xl bg-[#FBFBF9] border border-[#EAEFEA] text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-md bg-[#10B981]/15 text-[#065F46] font-bold flex items-center justify-center">
                      {index + 1}
                    </span>
                    <span className="font-semibold text-[#0E2A1E]">{lesson.title}</span>
                  </div>
                  <span className="text-gray-500 font-medium">{lesson.duration}</span>
                </div>
              ))}
            </div>

            {/* Modal Bottom CTA */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="md"
                onClick={() => setSelectedCourse(null)}
                className="flex-1"
              >
                Close
              </Button>
              <Link to={`/courses/${selectedCourse.id}`} className="flex-1">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full"
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Start Course
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
