import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { ArrowRight, Globe, TrendingUp, Shield, Star, ChevronRight } from 'lucide-react'

const steps = [
  { num: '01', title: 'Create your profile', desc: 'Sign up and upload your resume. We extract your skills and experience automatically.' },
  { num: '02', title: 'Set your preferences', desc: 'Tell us your financial goals, lifestyle priorities, risk tolerance, and what matters most.' },
  { num: '03', title: 'Get your top 3 paths', desc: 'Our AI evaluates Stay Local vs. Move Abroad options and shows your top 3 personalised pathways.' },
]

const features = [
  { icon: Globe, title: 'Country-aware', desc: 'Auto-detects your location. Evaluates real happiness index, crime rates, and cost of living data.' },
  { icon: TrendingUp, title: 'Financial modelling', desc: 'ROI and NPV calculations for each pathway based on your actual financial situation and goals.' },
  { icon: Shield, title: 'Risk calibrated', desc: 'Paths ranked by your personal risk tolerance — from safe, steady to bold career pivots.' },
  { icon: Star, title: 'Skills-first matching', desc: 'Your transferable skills unlock career options you haven\'t considered yet.' },
]

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white font-body">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div className="stagger">
              <div className="inline-flex items-center gap-2 bg-navy-50 border border-navy-100 rounded-full px-4 py-1.5 mb-6 stagger-item animate-fade-in-up">
                <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse-soft"></span>
                <span className="text-xs font-semibold text-navy-700 tracking-wide font-body">AI-Powered Career Intelligence</span>
              </div>
              <h1 className="font-display text-5xl lg:text-6xl font-bold text-navy-900 leading-[1.1] mb-6 stagger-item animate-fade-in-up">
                Career decisions<br />
                shouldn't feel<br />
                like a <span className="text-gold-400 animate-text-reveal">gamble.</span>
              </h1>
              <p className="text-lg text-navy-500 leading-relaxed mb-8 max-w-lg font-body stagger-item animate-blur-in-up">
                We guide you through data-backed insights and personalised recommendations — whether you stay local or move abroad.
              </p>
              <div className="flex flex-wrap gap-3 stagger-item">
                <button onClick={() => navigate('/auth?mode=signup')} className="btn-gold flex items-center gap-2 text-base px-7 py-3.5 hover:animate-smooth-bounce">
                  Find My Path <ArrowRight size={18} />
                </button>
                <button onClick={() => navigate('/auth?mode=login')} className="btn-secondary text-base px-7 py-3.5">
                  Log In
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-4 font-body">No credit card required · Takes about 10 minutes</p>
            </div>

            {/* Right — visual card */}
            <div className="relative animate-side-slide">
              <div className="bg-navy-900 rounded-3xl p-8 text-white shadow-2xl hover:shadow-3xl transition-all duration-500 card-hover">
                <div className="flex items-center gap-3 mb-6 animate-fade-in-down">
                  <div className="w-10 h-10 rounded-full bg-gold-400 flex items-center justify-center font-bold font-display text-navy-900 animate-heartbeat">AI</div>
                  <div>
                    <p className="font-semibold font-display text-sm">Your Top Pathways</p>
                    <p className="text-navy-300 text-xs font-body">Based on your profile</p>
                  </div>
                </div>

                {[
                  { rank: '01', label: 'Move Abroad', sub: 'Study + New Career · Germany', match: '94%', tag: 'Top Pick' },
                  { rank: '02', label: 'Stay Local', sub: 'Current Career + Upskill · India', match: '87%', tag: 'Safe Path' },
                  { rank: '03', label: 'Move Abroad', sub: 'New Career · Canada', match: '81%', tag: 'High Growth' },
                ].map((p, i) => (
                  <div key={i} className={`rounded-xl p-4 mb-3 flex items-center justify-between stagger-item transition-all duration-300 hover:scale-105 ${i === 0 ? 'bg-navy-700 border border-gold-400/30 animate-glow' : 'bg-navy-800 hover:bg-navy-700'}`} style={{ animationDelay: `${i * 0.1}s` }}>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold font-display text-navy-400">#{p.rank}</span>
                      <div>
                        <p className="font-semibold text-sm font-display">{p.label}</p>
                        <p className="text-navy-400 text-xs font-body">{p.sub}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-gold-400 font-bold text-sm font-display">{p.match}</p>
                      <span className="text-xs text-navy-400 font-body">{p.tag}</span>
                    </div>
                  </div>
                ))}

                <div className="mt-4 pt-4 border-t border-navy-700 flex items-center justify-between">
                  <span className="text-xs text-navy-400 font-body">8 options evaluated</span>
                  <button className="flex items-center gap-1 text-xs text-gold-400 font-semibold font-body hover:text-gold-300 transition-colors">
                    View full report <ChevronRight size={14} />
                  </button>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl px-4 py-3 border border-gray-100">
                <p className="text-xs text-gray-500 font-body">Profile match</p>
                <p className="text-2xl font-bold text-navy-900 font-display">94%</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-24 bg-gray-50 px-6 section-reveal">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="section-label mb-3 animate-fade-in-down">The Process</p>
            <h2 className="font-display text-4xl font-bold text-navy-900 animate-blur-in-up">
              Choose with <span className="text-navy-600 animate-text-reveal">clarity.</span><br />Not guesswork.
            </h2>
            <p className="text-navy-500 mt-4 max-w-md mx-auto font-body animate-fade-in-up">Three simple steps to your most informed career decision yet.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((s) => (
              <div key={s.num} className="step-card stagger-item relative number-card">
                <span className="font-display text-6xl font-black text-navy-50 absolute top-4 right-4 leading-none">{s.num}</span>
                <div className="relative">
                  <p className="font-display font-bold text-xl text-navy-900 mb-2">{s.title}</p>
                  <p className="text-navy-500 text-sm leading-relaxed font-body">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="about" className="py-24 px-6 section-reveal">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="section-label mb-3 animate-fade-in-down">Why GlobalPathways</p>
            <h2 className="font-display text-4xl font-bold text-navy-900 animate-blur-in-up">Built for real decisions</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc }, idx) => (
              <div key={title} className="step-card stagger-item text-center number-card hover:animate-smooth-bounce" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="w-12 h-12 bg-navy-50 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-smooth-bounce">
                  <Icon size={22} className="text-navy-700" />
                </div>
                <h3 className="font-display font-semibold text-navy-900 mb-2">{title}</h3>
                <p className="text-sm text-navy-500 font-body leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-6 bg-navy-900 section-reveal">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl font-bold text-white mb-4 animate-blur-in-down">
            Your next chapter starts with <span className="text-gold-400 animate-text-reveal">clarity.</span>
          </h2>
          <p className="text-navy-300 text-lg mb-8 font-body animate-fade-in-up">Join thousands of students and professionals making confident life decisions.</p>
          <button
            onClick={() => navigate('/auth?mode=signup')}
            className="btn-gold text-base px-8 py-4 inline-flex items-center gap-2 hover:scale-105 transition-transform animate-smooth-bounce"
          >
            Start Your Journey <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-navy-900">Global<span className="text-gold-400">Pathways</span></span>
          </div>
          <p className="text-xs text-gray-400 font-body">© 2026 GlobalPathways AI. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-gray-400 hover:text-navy-700 transition-colors font-body">Privacy</a>
            <a href="#" className="text-xs text-gray-400 hover:text-navy-700 transition-colors font-body">Terms</a>
            <a href="#" className="text-xs text-gray-400 hover:text-navy-700 transition-colors font-body">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
