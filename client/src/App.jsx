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

// Scroll-to-top handler on route changes
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#FBFBF9] text-[#1A221D]">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            
            {/* Interactive Learning Management Routes (SRS LEARN-REQ-01 to 07) */}
            <Route path="/courses" element={<CourseCatalogPage />} />
            <Route path="/courses/:id" element={<CourseDetailsPage />} />
            <Route path="/courses/:id/lessons/:lessonId" element={<LessonViewerPage />} />
            <Route path="/courses/:id/quiz" element={<QuizPage />} />

            <Route
              path="/simulator"
              element={
                <PlaceholderPage
                  title="2D Farm Simulator Studio"
                  moduleName="Simulation"
                  step="Phase 1 • Step 4"
                  description="The full multi-day virtual farm setup with 5x5 crop plots, dynamic pest events, and harvest calculations is scheduled in Step 4. You can test the interactive mini-engine on the home page."
                />
              }
            />
            <Route
              path="/leaderboard"
              element={
                <PlaceholderPage
                  title="Academic Leaderboard"
                  moduleName="Gamification"
                  step="Phase 1 • Step 5"
                  description="Global XP rankings, course completion streaks, and sustainability achievement badges will populate here."
                />
              }
            />
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
  );
}
