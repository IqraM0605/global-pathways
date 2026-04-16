import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import Logo from './Logo'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useApp()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleCareers = () => {
    if (user) {
      navigate('/careers')
    } else {
      navigate('/auth?mode=login&redirect=/careers')
    }
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isLanding = location.pathname === '/'

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || !isLanding ? 'glass-nav shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <button onClick={() => navigate('/')} className="focus:outline-none">
          <Logo size="md" dark={false} />
        </button>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#how" className="text-sm font-medium text-navy-600 hover:text-navy-900 transition-colors font-body">How it works</a>
          <a href="#about" className="text-sm font-medium text-navy-600 hover:text-navy-900 transition-colors font-body">About</a>
          <button onClick={handleCareers} className="text-sm font-medium text-navy-600 hover:text-navy-900 transition-colors font-body">Careers</button>
          <button
            onClick={() => navigate('/auth?mode=login')}
            className="text-sm font-semibold text-navy-800 hover:text-navy-600 transition-colors font-body"
          >
            Log in
          </button>
          <button
            onClick={() => navigate('/auth?mode=signup')}
            className="btn-primary text-sm py-2.5 px-5"
          >
            Get Started
          </button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-navy-800" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
          <a href="#how" className="text-sm font-medium text-navy-700 font-body" onClick={() => setMobileOpen(false)}>How it works</a>
          <a href="#about" className="text-sm font-medium text-navy-700 font-body" onClick={() => setMobileOpen(false)}>About</a>
          <button onClick={() => { handleCareers(); setMobileOpen(false) }} className="text-sm font-medium text-navy-700 text-left font-body">Careers</button>
          <button onClick={() => { navigate('/auth?mode=login'); setMobileOpen(false) }} className="text-sm font-semibold text-navy-800 text-left font-body">Log in</button>
          <button onClick={() => { navigate('/auth?mode=signup'); setMobileOpen(false) }} className="btn-primary text-sm text-center">Get Started</button>
        </div>
      )}
    </nav>
  )
}
