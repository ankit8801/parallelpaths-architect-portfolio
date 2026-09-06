import React, { useState, useEffect, memo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import logoImage from '../assets/LOGO.jpeg'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'About', path: '/about' },
  { label: 'Gallery', path: '/gallery' },
]

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    document.body.style.overflow = ''
  }, [location.pathname])

  const toggleMobile = () => {
    setMobileOpen(prev => {
      document.body.style.overflow = !prev ? 'hidden' : ''
      return !prev
    })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`nav-glass fixed z-[100] transition-all duration-500 mx-auto left-0 right-0 rounded-full flex items-center ${
          scrolled ? 'top-4 w-[90%] max-w-5xl' : 'top-6 w-[95%] max-w-6xl'
        } ${scrolled ? 'nav-glass-scrolled' : ''}`}
      >
        <div className={`flex justify-between items-center w-full transition-all duration-500 ${scrolled ? 'px-4 md:px-8 py-3' : 'px-6 md:px-10 py-4'}`}>
          <Link to="/" className="flex items-center gap-3 text-lg md:text-xl font-bold tracking-[0.1em] text-primary-text font-headline" aria-label="Jadhav Architects Home">
            <img src={logoImage} alt="Jadhav Architects Logo" className="h-10 w-10 md:h-11 md:w-11 object-cover rounded-full" />
            <span className="hidden sm:inline">Jadhav Architects</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10 font-headline tracking-[0.05em] uppercase text-xs font-medium">
            {navLinks.map(link => (
              <motion.div key={link.path} whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                <Link
                  to={link.path}
                  className={`transition-colors duration-300 ${
                    location.pathname === link.path
                      ? 'text-accent border-b border-accent pb-1'
                      : 'text-primary-text hover:text-accent'
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="hidden md:block">
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(200, 169, 107, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/contact"
                className="bg-primary-text text-background px-6 py-2.5 rounded-full font-headline text-[11px] font-bold uppercase tracking-wider hover:bg-accent hover:text-on-accent transition-all duration-300 shadow-lg inline-block"
              >
                Get Started
              </Link>
            </motion.div>
          </div>

          {/* Mobile Hamburger inside pill */}
          <div className="md:hidden flex items-center justify-center">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center p-1 text-white hover:text-accent transition-colors active:scale-95 transition-all duration-200"
              onClick={toggleMobile}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
            >
              <span className="material-symbols-outlined text-2xl">{mobileOpen ? 'close' : 'menu'}</span>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] flex flex-col items-center justify-center pointer-events-auto"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(20px)' }}
          >
            <div className="flex flex-col items-center gap-10 font-headline tracking-widest text-2xl md:text-3xl font-medium uppercase">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                >
                  <Link
                    to={link.path}
                    className={`transition-all duration-300 ${
                      location.pathname === link.path
                        ? 'text-accent'
                        : 'text-primary-text hover:text-accent'
                    }`}
                    onClick={toggleMobile}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1, duration: 0.4 }}
              >
                <Link
                  to="/contact"
                  className="mt-6 bg-accent text-background px-12 py-4 rounded-full font-headline text-sm font-bold uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all duration-300 shadow-2xl"
                  onClick={toggleMobile}
                >
                  Get Started
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default memo(Navbar)
