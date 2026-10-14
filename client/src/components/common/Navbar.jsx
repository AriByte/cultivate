import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sprout, Menu, X, ArrowRight, BookOpen, Layers, Trophy, Sparkles } from 'lucide-react';
import { Button } from './Button';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle ESC key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { label: 'Courses', to: '/courses', icon: BookOpen },
    { label: 'Simulator', to: '/simulator', icon: Layers },
    { label: 'The 5 Crops', href: '#crops', icon: Sprout },
    { label: 'How It Works', href: '#how-it-works', icon: Sparkles },
    { label: 'Leaderboard', to: '/leaderboard', icon: Trophy },
  ];

  const handleNavClick = (e, href) => {
    setMobileMenuOpen(false);
    if (href.startsWith('#')) {
      if (location.pathname !== '/') {
        return;
      }
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-[#E5EAE5] shadow-2xs py-3'
          : 'bg-[#FBFBF9] border-b border-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 text-[#0E2A1E] font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-xl tracking-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981] rounded-lg p-1"
            aria-label="TerraLearn Home"
          >
            <div className="w-9 h-9 rounded-xl bg-linear-to-br from-[#10B981] to-[#059669] flex items-center justify-center text-white shadow-xs">
              <Sprout className="w-5 h-5" aria-hidden="true" />
            </div>
            <div className="flex flex-col">
              <span className="leading-none text-lg text-[#0E2A1E]">TerraLearn</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#10B981]">Organic Academy</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main Navigation">
            {navLinks.map((item) => (
              item.to ? (
                <Link
                  key={item.label}
                  to={item.to}
                  className="px-3.5 py-2 text-sm font-semibold text-gray-700 hover:text-[#0E2A1E] hover:bg-[#143D2B]/5 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981]"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="px-3.5 py-2 text-sm font-semibold text-gray-700 hover:text-[#0E2A1E] hover:bg-[#143D2B]/5 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981]"
                >
                  {item.label}
                </a>
              )
            ))}
          </nav>

          {/* Desktop Auth CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link to="/simulator">
              <Button variant="primary" size="sm" icon={ArrowRight} iconPosition="right">
                Launch Simulator
              </Button>
            </Link>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-xl text-gray-700 hover:text-[#0E2A1E] hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981] cursor-pointer"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Framer Motion) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-white border-b border-[#E5EAE5] px-4 pt-3 pb-6 shadow-lg"
          >
            <div className="flex flex-col gap-1.5 pt-2">
              {navLinks.map((item) => {
                const IconComponent = item.icon;
                return item.to ? (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-800 hover:bg-[#F0FDF4] hover:text-[#0E2A1E] transition-colors"
                  >
                    <IconComponent className="w-4 h-4 text-[#10B981]" />
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-800 hover:bg-[#F0FDF4] hover:text-[#0E2A1E] transition-colors"
                  >
                    <IconComponent className="w-4 h-4 text-[#10B981]" />
                    {item.label}
                  </a>
                );
              })}

              <div className="border-t border-gray-100 my-2 pt-3 flex flex-col gap-2.5">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" size="md" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link to="/simulator" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" size="md" className="w-full" icon={ArrowRight} iconPosition="right">
                    Launch Simulator
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
