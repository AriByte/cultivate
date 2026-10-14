import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { LandingPage } from './pages/landing/LandingPage';
import { PlaceholderPage } from './pages/PlaceholderPage';

import { CourseCatalogPage } from './pages/courses/CourseCatalogPage';
import { CourseDetailsPage } from './pages/courses/CourseDetailsPage';
import { LessonViewerPage } from './pages/courses/LessonViewerPage';
import { QuizPage } from './pages/courses/QuizPage';
import { FarmSimulatorPage } from './pages/simulator/FarmSimulatorPage';
import { LeaderboardPage } from './pages/leaderboard/LeaderboardPage';
import { ThemeProvider } from './context/ThemeContext';

// Scroll-to-top handler on route changes with hash navigation support
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      } else {
        const timer = setTimeout(() => {
          const el = document.querySelector(hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
        return () => clearTimeout(timer);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#FBFBF9] dark:bg-[#0B1510] text-[#1A221D] dark:text-[#E5EAE6] transition-colors duration-200">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              
              {/* Interactive Learning Management Routes (SRS LEARN-REQ-01 to 07) */}
              <Route path="/courses" element={<CourseCatalogPage />} />
              <Route path="/courses/:id" element={<CourseDetailsPage />} />
              <Route path="/courses/:id/lessons/:lessonId" element={<LessonViewerPage />} />
              <Route path="/courses/:id/quiz" element={<QuizPage />} />

              {/* Interactive 2D Farm Simulator Studio (SRS SIM-REQ-01 to 12) */}
              <Route path="/simulator" element={<FarmSimulatorPage />} />

              {/* Academic Leaderboard & Gamification (SRS GAME-REQ-01 to 06) */}
              <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route
              path="/login"
              element={
                <PlaceholderPage
                  title="Learner Sign In"
                  moduleName="Authentication"
                  step="Phase 1 • Step 6"
                  description="Student and Administrator login portals with persistent JWT sessions."
                />
              }
            />
            <Route
              path="/admin"
              element={
                <PlaceholderPage
                  title="Administration Portal"
                  moduleName="Admin"
                  step="Phase 1 • Step 7"
                  description="Restricted management console for editing course units, crop coefficients, and simulation rules."
                />
              }
            />

            {/* Fallback route */}
            <Route
              path="*"
              element={
                <PlaceholderPage
                  title="Page Not Found"
                  description="The page you are looking for does not exist or has moved."
                  step="404 Error"
                />
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  </ThemeProvider>
  );
}
