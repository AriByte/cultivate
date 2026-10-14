import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Award, CheckCircle2, XCircle, RefreshCw, AlertCircle } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { MOCK_COURSES } from '../../data/mockCourses';
import { progressService } from '../../services/progressService';

export const QuizPage = () => {
  const { id: courseId } = useParams();

  const course = MOCK_COURSES.find((c) => c.id === courseId || c.slug === courseId);

  // Pure initialization from stored result if previously taken
  const [selectedAnswers, setSelectedAnswers] = useState(() => {
    if (!course) return {};
    const past = progressService.getQuizResult(course.id);
    return past?.answers || {};
  });

  const [submitted, setSubmitted] = useState(() => {
    if (!course) return false;
    const past = progressService.getQuizResult(course.id);
    return Boolean(past);
  });

  const [scoreData, setScoreData] = useState(() => {
    if (!course) return null;
    const past = progressService.getQuizResult(course.id);
    if (!past) return null;
    return {
      score: past.score,
      passed: past.passed,
      correctCount: Math.round((past.score / 100) * course.quiz.questions.length),
      totalQuestions: course.quiz.questions.length,
      answers: past.answers || {},
    };
  });

  const [validationError, setValidationError] = useState('');

  if (!course || !course.quiz) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 bg-[#FBFBF9]">
        <div className="max-w-md w-full bg-white rounded-3xl border border-[#D5DDD5] p-8 text-center">
          <h2 className="text-xl font-bold text-red-700 mb-2">Quiz Not Found</h2>
          <p className="text-sm text-gray-600 mb-6">No assessment quiz is linked with ID "{courseId}".</p>
          <Link to="/courses">
            <Button variant="primary" size="md">Return to Catalog</Button>
          </Link>
        </div>
      </div>
    );
  }

  const quiz = course.quiz;
  const questions = quiz.questions;
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(selectedAnswers).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  const handleSelectOption = (questionId, optionIndex) => {
    if (submitted) return; // Prevent changing after submission
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
    setValidationError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check that all questions have been answered
    const unanswered = questions.filter((q) => selectedAnswers[q.id] === undefined);
    if (unanswered.length > 0) {
      setValidationError(`Please answer all questions before submitting. (${unanswered.length} question${unanswered.length > 1 ? 's' : ''} remaining)`);
      const element = document.getElementById(`question-${unanswered[0].id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Calculate score
    let correctCount = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount += 1;
      }
    });

    const calculatedScore = Math.round((correctCount / totalQuestions) * 100);
    const hasPassed = calculatedScore >= quiz.passingScore;

    const result = {
      score: calculatedScore,
      passed: hasPassed,
      correctCount,
      totalQuestions,
      answers: selectedAnswers,
    };

    setScoreData(result);
    setSubmitted(true);
    setValidationError('');

    // Persist to service
    progressService.saveQuizResult(course.id, result);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setScoreData(null);
    setValidationError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="py-8 sm:py-12 bg-[#FBFBF9] min-h-[90vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between gap-3 text-xs">
          <Link
            to={`/courses/${course.id}`}
            className="flex items-center gap-1.5 font-bold text-gray-600 hover:text-[#0E2A1E] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#10B981]" />
            <span>Back to Course: {course.title}</span>
          </Link>
          <span className="text-gray-400 font-semibold">{course.category}</span>
        </div>

        {/* Quiz Title Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5EAE5] shadow-xs mb-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]">
              <Award className="w-3.5 h-3.5 text-[#10B981]" />
              <span>Assessment Quiz (SRS LEARN-REQ-04)</span>
            </span>

            <div className="text-xs font-semibold text-gray-500">
              Pass Threshold: <strong className="text-gray-800">{quiz.passingScore}%</strong> • XP Reward: <strong className="text-amber-700">+{quiz.xpReward} XP</strong>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0E2A1E] font-['Plus_Jakarta_Sans',sans-serif] tracking-tight mb-2">
            {quiz.title}
          </h1>

          <p className="text-sm text-gray-600 mb-6">
            Test your knowledge of organic farming biology, biological pest barriers, and nutrient cycling. You must score at least {quiz.passingScore}% to earn certification XP.
          </p>

          {/* Progress Indicator */}
          {!submitted && (
            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs font-semibold text-gray-600 mb-1.5">
                <span>Progress: {answeredCount} of {totalQuestions} answered</span>
                <span className="font-bold text-[#143D2B]">{progressPercent}%</span>
              </div>
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#10B981] h-full rounded-full transition-all duration-200"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Quiz Results Banner when Submitted */}
        <AnimatePresence>
          {submitted && scoreData && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-3xl p-6 sm:p-8 mb-8 border text-white shadow-md ${
                scoreData.passed
                  ? 'bg-linear-to-br from-[#065F46] to-[#047857] border-[#059669]'
                  : 'bg-linear-to-br from-[#78350F] to-[#92400E] border-[#B45309]'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 text-white mb-2">
                    {scoreData.passed ? '✓ Passing Score Achieved' : '⚠️ Additional Study Needed'}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-['Plus_Jakarta_Sans',sans-serif]">
                    Your Score: {scoreData.score}% ({scoreData.correctCount} / {scoreData.totalQuestions} Correct)
                  </h2>
                  <p className="text-xs sm:text-sm text-white/90 mt-1 max-w-xl">
                    {scoreData.passed
                      ? `Congratulations! You mastered the biological principles for this module and unlocked +${quiz.xpReward} XP for your profile.`
                      : `You scored ${scoreData.score}%, which is below the ${quiz.passingScore}% passing threshold. Review the explanations below and retry whenever you're ready.`}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto shrink-0">
                  <Button
                    variant="white"
                    size="md"
                    onClick={handleRetake}
                    icon={RefreshCw}
                    iconPosition="left"
                    className="w-full sm:w-auto font-bold"
                  >
                    Retake Quiz
                  </Button>
                  <Link to={`/courses/${course.id}`} className="w-full sm:w-auto">
                    <Button variant="outline" size="md" className="w-full sm:w-auto bg-white/10 text-white border-white/30 hover:bg-white/20">
                      Back to Course
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Validation Error Alert if incomplete */}
        {validationError && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Questions Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {questions.map((question, qIndex) => {
            const selectedOpt = selectedAnswers[question.id];
            const isAnswered = selectedOpt !== undefined;
            const isCorrect = submitted && selectedOpt === question.correctIndex;

            return (
              <div
                key={question.id}
                id={`question-${question.id}`}
                className={`bg-white rounded-3xl p-6 sm:p-8 border transition-all ${
                  submitted
                    ? isCorrect
                      ? 'border-[#86EFAC] bg-[#F0FDF4]/30'
                      : 'border-red-200 bg-red-50/20'
                    : isAnswered
                    ? 'border-[#10B981]/50 shadow-2xs'
                    : 'border-[#E5EAE5]'
                }`}
              >
                {/* Question Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-[#143D2B] text-white flex items-center justify-center font-bold text-xs shrink-0">
                      {qIndex + 1}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                      Question {qIndex + 1} of {totalQuestions}
                    </span>
                  </div>

                  {submitted && (
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-md ${
                        isCorrect
                          ? 'bg-[#DCFCE7] text-[#14532D]'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" /> Correct (+1 Pt)
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5 text-red-600" /> Incorrect (0 Pts)
                        </>
                      )}
                    </span>
                  )}
                </div>

                {/* Question Prompt */}
                <h3 className="text-base sm:text-lg font-bold text-[#0E2A1E] font-['Plus_Jakarta_Sans',sans-serif] mb-5 leading-snug">
                  {question.text}
                </h3>

                {/* 4 Multiple Choice Options */}
                <div className="space-y-2.5">
                  {question.options.map((optionText, optIndex) => {
                    const isSelected = selectedOpt === optIndex;
                    const isTheCorrectOne = submitted && optIndex === question.correctIndex;

                    let optionStyle = 'border-[#E5EAE5] bg-[#FBFBF9] hover:bg-gray-100 text-gray-800';

                    if (submitted) {
                      if (isTheCorrectOne) {
                        optionStyle = 'border-[#10B981] bg-[#DCFCE7] text-[#065F46] font-bold shadow-2xs';
                      } else if (isSelected && !isTheCorrectOne) {
                        optionStyle = 'border-red-400 bg-red-100 text-red-900 font-bold';
                      } else {
                        optionStyle = 'border-gray-200 bg-gray-50 text-gray-400 opacity-60';
                      }
                    } else if (isSelected) {
                      optionStyle = 'border-[#10B981] bg-[#ECFDF5] text-[#065F46] font-bold shadow-2xs ring-2 ring-[#10B981]/20';
                    }

                    return (
                      <button
                        key={optIndex}
                        type="button"
                        disabled={submitted}
                        onClick={() => handleSelectOption(question.id, optIndex)}
                        className={`w-full p-4 rounded-2xl border text-left text-sm transition-all flex items-center justify-between gap-3 cursor-pointer ${optionStyle}`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold shrink-0 ${
                              isSelected
                                ? 'border-[#10B981] bg-[#10B981] text-white'
                                : 'border-gray-300 text-gray-500 bg-white'
                            }`}
                          >
                            {String.fromCharCode(65 + optIndex)}
                          </span>
                          <span>{optionText}</span>
                        </div>

                        {submitted && isTheCorrectOne && (
                          <span className="text-xs text-emerald-800 font-extrabold bg-white/80 px-2 py-0.5 rounded shrink-0">
                            Correct Answer
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Educational Explanation Box (Shown After Submission) */}
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-5 p-4 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] text-xs text-[#14532D]"
                  >
                    <span className="font-bold block mb-1 uppercase tracking-wider text-[10px] text-[#059669]">
                      Biological Explanation:
                    </span>
                    <p className="leading-relaxed">{question.explanation}</p>
                  </motion.div>
                )}
              </div>
            );
          })}

          {/* Submission Bar */}
          {!submitted ? (
            <div className="bg-white rounded-3xl p-6 border border-[#E5EAE5] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-gray-500 text-center sm:text-left">
                <span>{answeredCount} of {totalQuestions} answered.</span>{' '}
                {answeredCount < totalQuestions && (
                  <span className="text-amber-700 font-semibold">
                    Complete all questions to enable grading.
                  </span>
                )}
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full sm:w-auto font-bold px-8"
              >
                Submit Answers for Grading
              </Button>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-6 border border-[#E5EAE5] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-gray-600 font-semibold">
                Completed assessment for {course.title}.
              </span>
              <div className="flex gap-3 w-full sm:w-auto">
                <Button variant="outline" size="md" onClick={handleRetake} className="flex-1 sm:flex-none">
                  Retake Quiz
                </Button>
                <Link to="/courses" className="flex-1 sm:flex-none">
                  <Button variant="primary" size="md" className="w-full sm:w-auto">
                    Back to Catalog
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </form>

      </div>
    </div>
  );
};
