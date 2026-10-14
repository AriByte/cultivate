// LocalStorage-backed progress management service for Phase 1
// Clean abstraction that can be swapped for REST API endpoints in Phase 2

const STORAGE_KEY = 'terralearn_learning_progress';

const getStoredData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { completedLessons: {}, quizAttempts: {} };
  } catch (err) {
    console.warn('LocalStorage unavailable, using ephemeral memory state.', err);
    return { completedLessons: {}, quizAttempts: {} };
  }
};

const saveStoredData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.warn('Failed to save progress to LocalStorage.', err);
  }
};

export const progressService = {
  // Get completed lesson IDs for a specific course
  getCompletedLessons(courseId) {
    const data = getStoredData();
    return data.completedLessons[courseId] || [];
  },

  // Check if a specific lesson is completed
  isLessonCompleted(courseId, lessonId) {
    const lessons = this.getCompletedLessons(courseId);
    return lessons.includes(lessonId);
  },

  // Toggle completion status of a lesson
  toggleLessonCompletion(courseId, lessonId) {
    const data = getStoredData();
    if (!data.completedLessons[courseId]) {
      data.completedLessons[courseId] = [];
    }
    const current = data.completedLessons[courseId];
    const exists = current.includes(lessonId);

    if (exists) {
      data.completedLessons[courseId] = current.filter((id) => id !== lessonId);
    } else {
      data.completedLessons[courseId] = [...current, lessonId];
    }

    saveStoredData(data);
    return !exists;
  },

  // Calculate course completion percentage based on completed lessons
  getCourseProgressPercentage(courseId, totalLessons) {
    if (!totalLessons || totalLessons <= 0) return 0;
    const completed = this.getCompletedLessons(courseId);
    return Math.min(100, Math.round((completed.length / totalLessons) * 100));
  },

  // Get quiz result record for a course
  getQuizResult(courseId) {
    const data = getStoredData();
    return data.quizAttempts[courseId] || null;
  },

  // Save a quiz attempt and update best score
  saveQuizResult(courseId, { score, passed, answers }) {
    const data = getStoredData();
    const existing = data.quizAttempts[courseId];
    const highestScore = existing ? Math.max(existing.highestScore || 0, score) : score;

    data.quizAttempts[courseId] = {
      score,
      passed,
      highestScore,
      answers,
      lastAttemptAt: new Date().toISOString(),
      attemptsCount: (existing?.attemptsCount || 0) + 1,
    };

    saveStoredData(data);
    return data.quizAttempts[courseId];
  },

  // Reset progress for a course (useful for testing and retrying)
  resetCourseProgress(courseId) {
    const data = getStoredData();
    delete data.completedLessons[courseId];
    delete data.quizAttempts[courseId];
    saveStoredData(data);
  },

  // Retrieve global summary across all courses
  getAllProgress() {
    return getStoredData();
  }
};
