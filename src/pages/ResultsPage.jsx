import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import Logo from '../components/Logo'
import {
  MapPin, Briefcase, GraduationCap, TrendingUp, ChevronDown, ChevronUp,
  ArrowRight, Star, Globe, Home, Shield, DollarSign, Share2, Download,
  CheckCircle2, AlertCircle, Info
} from 'lucide-react'

// ── Static demo results (replace with backend) ───────────────────────────────
const RESULTS = [
  {
    rank: 1,
    category: 'Move Abroad',
    type: 'Study + New Career based on transferable skills',
    country: 'Germany',
    role: 'Data Scientist',
    university: 'TU Munich',
    matchScore: 94,
    tag: 'Top Pick',
    tagColor: 'gold',
    summary: 'Your Python and data analysis skills transfer directly. Germany\'s thriving tech scene, low tuition, and post-study work permit make this a high-ROI path.',
    financials: { roi: '340%', npv: '₹1.2Cr', timeline: '2 years', cost: '₹18L' },
    lifestyle: { happiness: 8.2, safety: 'Very Safe', wlb: 'Excellent' },
    alternatives: [
      { country: 'Netherlands', role: 'Data Engineer', university: 'TU Delft', match: '89%' },
      { country: 'Canada', role: 'ML Engineer', university: 'University of Toronto', match: '86%' },
      { country: 'Ireland', role: 'Data Analyst', university: 'UCD Dublin', match: '82%' },
    ],
    futurePath: null,
  },
  {
    rank: 2,
    category: 'Stay Local',
    type: 'Study + Current Career',
    country: 'India',
    role: 'Senior Software Engineer',
    university: 'IIT / Online (Coursera)',
    matchScore: 87,
    tag: 'Safe Path',
    tagColor: 'navy',
    summary: 'Upskill with a part-time Master\'s or certification while continuing current employment. Lower risk, steady career growth, and strong domestic tech demand.',
    financials: { roi: '210%', npv: '₹65L', timeline: '1–2 years', cost: '₹4L' },
    lifestyle: { happiness: 6.4, safety: 'Moderate', wlb: 'Good' },
    alternatives: [
      { country: 'India', role: 'Product Manager', university: 'IIM (Part-time)', match: '83%' },
      { country: 'India', role: 'ML Engineer', university: 'Online Masters', match: '80%' },
      { country: 'India', role: 'Tech Lead', university: 'No study needed', match: '77%' },
    ],
    futurePath: {
      advice: 'After 2 years, you\'d be well-positioned to move abroad — especially to Canada or Germany — with enhanced credentials and savings.',
      abroad: 'Study + New Career',
      abCountry: 'Canada',
    },
  },
  {
    rank: 3,
    category: 'Move Abroad',
    type: 'New Career based on transferable skills',
    country: 'Canada',
    role: 'Product Manager',
    university: null,
    matchScore: 81,
    tag: 'High Growth',
    tagColor: 'green',
    summary: 'Your project management and communication skills qualify you for PM roles. Canada\'s Express Entry and tech-friendly immigration make this a direct transition.',
    financials: { roi: '290%', npv: '₹95L', timeline: '1 year', cost: '₹8L' },
    lifestyle: { happiness: 7.6, safety: 'Very Safe', wlb: 'Very Good' },
    alternatives: [
      { country: 'Australia', role: 'Business Analyst', university: null, match: '78%' },
      { country: 'UK', role: 'Product Owner', university: null, match: '75%' },
      { country: 'Singapore', role: 'Scrum Master', university: null, match: '72%' },
    ],
    futurePath: null,
  },
]

const tagStyles = {
  gold: 'bg-gold-400/10 text-gold-600 border-gold-400/30',
  navy: 'bg-navy-50 text-navy-700 border-navy-200',
  green: 'bg-green-50 text-green-700 border-green-200',
}

const categoryIcon = { 'Move Abroad': Globe, 'Stay Local': Home }

function PathwayCard({ result, isTop }) {
  const [expanded, setExpanded] = useState(isTop)
  const Icon = categoryIcon[result.category] || Globe

  return (
    <div className={`card overflow-hidden transition-all duration-300 ${isTop ? 'ring-2 ring-gold-400/50 shadow-lg' : ''}`}>
      {isTop && (
        <div className="bg-gold-400 text-white text-xs font-bold font-body text-center py-1.5 tracking-wide">
          ✨ YOUR BEST MATCH
        </div>
      )}

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${result.category === 'Move Abroad' ? 'bg-navy-100' : 'bg-blue-50'}`}>
              <Icon size={20} className={result.category === 'Move Abroad' ? 'text-navy-700' : 'text-blue-600'} />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="font-display font-bold text-lg text-navy-900">#{result.rank} {result.category}</span>
                <span className={`text-xs font-semibold border rounded-full px-2.5 py-0.5 font-body ${tagStyles[result.tagColor]}`}>
                  {result.tag}
                </span>
              </div>
              <p className="text-sm text-navy-500 font-body">{result.type}</p>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="font-display font-black text-2xl text-navy-900">{result.matchScore}%</p>
            <p className="text-xs text-navy-400 font-body">match</p>
          </div>
        </div>

        {/* Key info */}
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex items-center gap-1.5 text-xs text-navy-600 font-body bg-gray-50 rounded-lg px-3 py-1.5">
            <MapPin size={12} className="text-navy-400" /> {result.country}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-navy-600 font-body bg-gray-50 rounded-lg px-3 py-1.5">
            <Briefcase size={12} className="text-navy-400" /> {result.role}
          </div>
          {result.university && (
            <div className="flex items-center gap-1.5 text-xs text-navy-600 font-body bg-gray-50 rounded-lg px-3 py-1.5">
              <GraduationCap size={12} className="text-navy-400" /> {result.university}
            </div>
          )}
        </div>

        <p className="text-sm text-navy-600 font-body leading-relaxed mb-4">{result.summary}</p>

        {/* Financial snapshot */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          {[
            { icon: TrendingUp, label: 'ROI', value: result.financials.roi },
            { icon: DollarSign, label: 'NPV', value: result.financials.npv },
            { icon: Star, label: 'Timeline', value: result.financials.timeline },
            { icon: Shield, label: 'Cost', value: result.financials.cost },
          ].map(({ icon: I, label, value }) => (
            <div key={label} className="text-center bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-navy-400 font-body mb-0.5">{label}</p>
              <p className="font-display font-bold text-sm text-navy-900">{value}</p>
            </div>
          ))}
        </div>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-xs font-semibold text-navy-600 hover:text-navy-900 transition-colors font-body"
        >
          {expanded ? 'Show less' : 'See alternatives & details'}
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        {/* Expanded section */}
        {expanded && (
          <div className="mt-5 pt-5 border-t border-gray-100 stagger">
            {/* Lifestyle metrics */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              <div className="card p-3 text-center">
                <p className="text-xs text-navy-400 font-body mb-0.5">Happiness</p>
                <p className="font-display font-bold text-navy-900">{result.lifestyle.happiness}/10</p>
              </div>
              <div className="card p-3 text-center">
                <p className="text-xs text-navy-400 font-body mb-0.5">Safety</p>
                <p className="font-display font-bold text-xs text-navy-900">{result.lifestyle.safety}</p>
              </div>
              <div className="card p-3 text-center">
                <p className="text-xs text-navy-400 font-body mb-0.5">Work-Life</p>
                <p className="font-display font-bold text-xs text-navy-900">{result.lifestyle.wlb}</p>
              </div>
            </div>

            {/* 3 alternative options */}
            <div>
              <p className="text-xs font-semibold text-navy-700 mb-3 font-body">3 Alternative Countries / Paths</p>
              <div className="space-y-2">
                {result.alternatives.map((alt, i) => (
                  <div key={i} className="flex items-center justify-between py-2.5 px-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-navy-400 font-display w-4">{i + 1}</span>
                      <div>
                        <p className="text-sm font-medium text-navy-800 font-body">{alt.role} · {alt.country}</p>
                        {alt.university && <p className="text-xs text-navy-400 font-body">{alt.university}</p>}
                      </div>
                    </div>
                    <span className="text-xs font-bold text-navy-600 font-display">{alt.match}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Future path (for Stay Local) */}
            {result.futurePath && (
              <div className="mt-5 bg-navy-50 border border-navy-100 rounded-xl p-4">
                <p className="text-xs font-bold text-navy-700 mb-2 font-display flex items-center gap-1.5">
                  <Info size={13} /> Future Pathway Suggestion
                </p>
                <p className="text-xs text-navy-600 font-body leading-relaxed mb-2">{result.futurePath.advice}</p>
                <div className="flex items-center gap-2">
                  <ArrowRight size={12} className="text-gold-500" />
                  <span className="text-xs font-semibold text-navy-700 font-body">
                    Recommended abroad path: <span className="text-gold-600">{result.futurePath.abroad} · {result.futurePath.abCountry}</span>
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default function ResultsPage() {
  const navigate = useNavigate()
  const { user } = useApp()

  return (
    <div className="min-h-screen bg-gray-50 font-body">
      {/* Topbar */}
      <div className="glass-nav shadow-sm px-6 py-4 flex items-center justify-between">
        <Logo size="sm" />
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 text-xs text-navy-600 hover:text-navy-900 border border-gray-200 rounded-lg px-3 py-2 transition-all font-body">
            <Share2 size={13} /> Share
          </button>
          <button className="flex items-center gap-1.5 text-xs text-navy-600 hover:text-navy-900 border border-gray-200 rounded-lg px-3 py-2 transition-all font-body">
            <Download size={13} /> Export
          </button>
          <button onClick={() => navigate('/dashboard')} className="btn-primary text-xs py-2 px-4">
            Dashboard
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8 stagger">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 size={18} className="text-green-500" />
            <span className="text-sm text-green-600 font-semibold font-body">Analysis complete</span>
          </div>
          <h1 className="font-display text-4xl font-bold text-navy-900 mb-2">
            Your top 3 pathways{user?.name ? `, ${user.name.split(' ')[0]}` : ''}
          </h1>
          <p className="text-navy-500 font-body">
            We evaluated all 8 options across Stay Local and Move Abroad — here are the best fits based on your priorities and profile.
          </p>
        </div>

        {/* Summary badges */}
        <div className="flex flex-wrap gap-2 mb-8">
          {['8 options evaluated', '2 categories', 'Personalised to your priorities'].map(b => (
            <span key={b} className="text-xs font-medium bg-white border border-gray-100 rounded-full px-3 py-1.5 text-navy-600 shadow-sm font-body">
              {b}
            </span>
          ))}
        </div>

        {/* Results */}
        <div className="space-y-5">
          {RESULTS.map(r => (
            <PathwayCard key={r.rank} result={r} isTop={r.rank === 1} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 card p-6 text-center">
          <p className="font-display font-semibold text-navy-900 mb-1">Ready to take action?</p>
          <p className="text-sm text-navy-500 font-body mb-4">Save your results and continue in your dashboard to track applications and next steps.</p>
          <button onClick={() => navigate('/dashboard')} className="btn-primary inline-flex items-center gap-2">
            Go to Dashboard <ArrowRight size={16} />
          </button>
        </div>

        <p className="text-xs text-center text-gray-400 mt-6 font-body">
          Results are based on the information you provided and are for guidance only. Actual outcomes may vary.
        </p>
      </div>
    </div>
  )
}
