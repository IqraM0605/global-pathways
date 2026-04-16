import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import Logo from '../components/Logo'
import {
  MapPin, Briefcase, GraduationCap, TrendingUp, ChevronDown, ChevronUp,
  ArrowRight, Star, Globe, Home, Shield, DollarSign, Share2, Download,
  CheckCircle2, Info, X, Clock, Wallet, BarChart2
} from 'lucide-react'

const PRIORITY_TOOLTIPS = {
  'Preferred Country': 'The specific countries you\'ve listed as your preferred destinations.',
  'Changing Careers': 'How well the pathway supports a transition to a new field or role.',
  'Life Style / Happiness Index': 'Country-level happiness scores, quality of life, and lifestyle fit.',
  'Safety / Crime Rates': 'Crime index and personal safety data for each country.',
  'Work Life Balance': 'Average working hours, leave policies, and work culture.',
  'Financial Goals (ROI / NPV)': 'Return on investment and net present value of each pathway.',
  'Staying in My Timeline': 'How well the path fits within your stated time availability.',
  'Staying in My Financial Budget': 'Whether the total cost stays within your financial constraints.',
}

const METRIC_INFO = {
  ROI: {
    title: 'Return on Investment (ROI)',
    description: 'The percentage gain on your total investment over the pathway duration. A 340% ROI means for every ₹1 you spend, you get ₹3.40 back in additional lifetime earnings compared to staying on your current path.',
    color: 'text-green-600',
    bg: 'bg-green-50',
    border: 'border-green-200',
  },
  NPV: {
    title: 'Net Present Value (NPV)',
    description: 'The total value of all future earnings from this pathway, discounted to today\'s money. A higher NPV means more real wealth created. It accounts for study costs, salary increases, and time.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
  },
  Timeline: {
    title: 'Time to Get There',
    description: 'How long until you are fully set up and earning in this pathway, including study duration, visa processing, and settling-in period. Shorter timelines suit people who need results fast.',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
  },
  Cost: {
    title: 'Total Upfront Cost',
    description: 'Your estimated all-in cost: tuition fees, visa applications, travel, initial living expenses, and setup costs. This is what you\'ll need to budget or finance before you start earning.',
    color: 'text-yellow-600',
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
  },
}

const ALT_DETAILS = {
  'Netherlands': {
    costOfLiving: '~₹1.1L/mo', avgSalary: '₹55–80L/yr', jobMarket: 'Very Strong',
    visa: 'Highly Skilled Migrant', visaTime: '2–4 weeks', happinessIndex: '7.8/10',
    description: 'The Netherlands has a booming tech sector centered in Amsterdam and Eindhoven. English is widely spoken and the country ranks among Europe\'s top destinations for international professionals.',
  },
  'Canada': {
    costOfLiving: '~₹1.3L/mo', avgSalary: '₹60–95L/yr', jobMarket: 'Strong',
    visa: 'Express Entry / Study Permit', visaTime: '3–6 months', happinessIndex: '7.6/10',
    description: 'Canada\'s Express Entry system is one of the most accessible skilled-worker immigration paths. Tech hubs in Toronto, Vancouver, and Montreal are actively hiring international talent.',
  },
  'Ireland': {
    costOfLiving: '~₹1.2L/mo', avgSalary: '₹55–85L/yr', jobMarket: 'Strong',
    visa: 'Critical Skills Work Permit', visaTime: '4–8 weeks', happinessIndex: '7.3/10',
    description: 'Ireland is home to European HQs of Google, Meta, and Apple. English-speaking, EU-based, with a straightforward work permit process for tech professionals.',
  },
  'India': {
    costOfLiving: '~₹35–60K/mo', avgSalary: '₹12–40L/yr', jobMarket: 'Competitive',
    visa: 'N/A (local)', visaTime: 'Immediate', happinessIndex: '4.4/10',
    description: 'India\'s domestic tech sector is growing rapidly with major hubs in Bengaluru, Hyderabad, and Pune. Staying local eliminates relocation risk and lets you build savings before any future move.',
  },
  'Australia': {
    costOfLiving: '~₹1.4L/mo', avgSalary: '₹65–100L/yr', jobMarket: 'Strong',
    visa: 'Skilled Independent (189)', visaTime: '6–12 months', happinessIndex: '7.3/10',
    description: 'Australia\'s points-based immigration rewards tech professionals. Sydney and Melbourne have thriving startup and enterprise tech scenes with strong demand for analytical roles.',
  },
  'UK': {
    costOfLiving: '~₹1.5L/mo', avgSalary: '₹60–90L/yr', jobMarket: 'Strong',
    visa: 'Skilled Worker Visa', visaTime: '3–8 weeks', happinessIndex: '7.1/10',
    description: 'London is one of Europe\'s top tech and fintech hubs. The UK Skilled Worker visa is employer-sponsored and relatively fast. Strong demand for product, engineering, and data roles.',
  },
  'Singapore': {
    costOfLiving: '~₹1.6L/mo', avgSalary: '₹70–110L/yr', jobMarket: 'Very Strong',
    visa: 'Employment Pass', visaTime: '3–8 weeks', happinessIndex: '6.8/10',
    description: 'Singapore is Asia\'s financial and tech capital. Low taxes, world-class infrastructure, and a multicultural environment make it a top destination for qualified candidates.',
  },
}

const RESULTS = [
  {
    rank: 1, category: 'Move Abroad', type: 'Study + New Career based on transferable skills',
    country: 'Germany', role: 'Data Scientist', university: 'TU Munich',
    matchScore: 94, tag: 'Top Pick', tagColor: 'gold',
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
    rank: 2, category: 'Stay Local', type: 'Study + Current Career',
    country: 'India', role: 'Senior Software Engineer', university: 'IIT / Online (Coursera)',
    matchScore: 87, tag: 'Safe Path', tagColor: 'navy',
    summary: 'Upskill with a part-time Master\'s or certification while continuing current employment. Lower risk, steady career growth, and strong domestic tech demand.',
    financials: { roi: '210%', npv: '₹65L', timeline: '1–2 years', cost: '₹4L' },
    lifestyle: { happiness: 6.4, safety: 'Moderate', wlb: 'Good' },
    alternatives: [
      { country: 'India', role: 'Product Manager', university: 'IIM (Part-time)', match: '83%' },
      { country: 'India', role: 'ML Engineer', university: 'Online Masters', match: '80%' },
      { country: 'India', role: 'Tech Lead', university: 'No study needed', match: '77%' },
    ],
    futurePath: {
      advice: 'After 2 years, you would be well-positioned to move abroad, especially to Canada or Germany, with enhanced credentials and savings.',
      abroad: 'Study + New Career', abCountry: 'Canada',
    },
  },
  {
    rank: 3, category: 'Move Abroad', type: 'New Career based on transferable skills',
    country: 'Canada', role: 'Product Manager', university: null,
    matchScore: 81, tag: 'High Growth', tagColor: 'green',
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

function MetricCard({ label, value }) {
  const [open, setOpen] = useState(false)
  const info = METRIC_INFO[label]
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full text-center rounded-xl p-3 transition-all border-2 group
          ${open ? `${info.bg} ${info.border}` : 'bg-gray-50 border-transparent hover:border-gray-200'}`}
      >
        <p className="text-xs text-navy-400 font-body mb-0.5 flex items-center justify-center gap-1">
          {label}
          <Info size={10} className={`transition-colors ${open ? info.color : 'text-gray-300 group-hover:text-navy-400'}`} />
        </p>
        <p className={`font-display font-bold text-sm transition-colors ${open ? info.color : 'text-navy-900'}`}>{value}</p>
      </button>
      {open && (
        <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 z-30 w-64 rounded-2xl border shadow-xl p-4 ${info.bg} ${info.border}`}>
          <div className="flex items-start justify-between gap-2 mb-2">
            <p className={`text-xs font-bold font-display ${info.color}`}>{info.title}</p>
            <button onClick={(e) => { e.stopPropagation(); setOpen(false) }} className="text-gray-400 hover:text-gray-600 flex-shrink-0">
              <X size={12} />
            </button>
          </div>
          <p className="text-xs text-navy-600 font-body leading-relaxed">{info.description}</p>
          <div className={`absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border-l border-t ${info.border} ${info.bg}`}></div>
        </div>
      )}
    </div>
  )
}

function AltCard({ alt, index, isOpen, onToggle }) {
  const details = ALT_DETAILS[alt.country]
  return (
    <div className={`rounded-xl border-2 transition-all duration-200 overflow-hidden
      ${isOpen ? 'border-navy-300 bg-white shadow-sm' : 'border-transparent bg-gray-50 hover:border-navy-100 hover:bg-white'}`}>
      <button type="button" className="w-full flex items-center justify-between py-3 px-4 text-left" onClick={onToggle}>
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-navy-400 font-display w-4">{index + 1}</span>
          <div>
            <p className="text-sm font-semibold text-navy-800 font-body">{alt.role} · {alt.country}</p>
            {alt.university && <p className="text-xs text-navy-400 font-body">{alt.university}</p>}
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xs font-bold text-navy-600 font-display">{alt.match}</span>
          <span className="text-navy-300">{isOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}</span>
        </div>
      </button>
      {isOpen && (
        <div className="px-4 pb-4 border-t border-gray-100">
          {details ? (
            <>
              <div className="grid grid-cols-2 gap-2 my-3">
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-navy-400 font-body mb-1 flex items-center gap-1"><Wallet size={10} /> Cost of Living</p>
                  <p className="font-display font-bold text-sm text-navy-900">{details.costOfLiving}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-navy-400 font-body mb-1 flex items-center gap-1"><BarChart2 size={10} /> Avg Salary</p>
                  <p className="font-display font-bold text-sm text-navy-900">{details.avgSalary}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-navy-400 font-body mb-1 flex items-center gap-1"><Globe size={10} /> Visa Type</p>
                  <p className="font-display font-bold text-xs text-navy-900">{details.visa}</p>
                  <p className="text-xs text-navy-400 font-body">~{details.visaTime}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-navy-400 font-body mb-1 flex items-center gap-1"><Star size={10} /> Happiness Index</p>
                  <p className="font-display font-bold text-sm text-navy-900">{details.happinessIndex}</p>
                  <p className="text-xs text-navy-400 font-body">Job market: {details.jobMarket}</p>
                </div>
              </div>
              <p className="text-xs text-navy-600 font-body leading-relaxed">{details.description}</p>
            </>
          ) : (
            <p className="text-xs text-navy-500 font-body leading-relaxed pt-2">
              {alt.country} offers strong opportunities for {alt.role} professionals with competitive compensation and a clear path for skilled international workers.
            </p>
          )}
        </div>
      )}
    </div>
  )
}

function PathwayCard({ result, isTop }) {
  const [expanded, setExpanded] = useState(isTop)
  const [selectedAlt, setSelectedAlt] = useState(null)
  const Icon = categoryIcon[result.category] || Globe

  return (
    <div className={`card overflow-hidden transition-all duration-300 ${isTop ? 'ring-2 ring-gold-400/50 shadow-lg' : ''}`}>
      {isTop && (
        <div className="bg-gold-400 text-white text-xs font-bold font-body text-center py-1.5 tracking-wide">
          ✨ YOUR BEST MATCH
        </div>
      )}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${result.category === 'Move Abroad' ? 'bg-navy-100' : 'bg-blue-50'}`}>
              <Icon size={20} className={result.category === 'Move Abroad' ? 'text-navy-700' : 'text-blue-600'} />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="font-display font-bold text-lg text-navy-900">#{result.rank} {result.category}</span>
                <span className={`text-xs font-semibold border rounded-full px-2.5 py-0.5 font-body ${tagStyles[result.tagColor]}`}>{result.tag}</span>
              </div>
              <p className="text-sm text-navy-500 font-body">{result.type}</p>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="font-display font-black text-2xl text-navy-900">{result.matchScore}%</p>
            <p className="text-xs text-navy-400 font-body">match</p>
          </div>
        </div>

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

        <p className="text-sm text-navy-600 font-body leading-relaxed mb-3">{result.summary}</p>

        <p className="text-xs text-navy-400 font-body mb-2">Tap any metric to understand what it means →</p>
        <div className="grid grid-cols-4 gap-3 mb-4">
          <MetricCard label="ROI" value={result.financials.roi} />
          <MetricCard label="NPV" value={result.financials.npv} />
          <MetricCard label="Timeline" value={result.financials.timeline} />
          <MetricCard label="Cost" value={result.financials.cost} />
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-xs font-semibold text-navy-600 hover:text-navy-900 transition-colors font-body"
        >
          {expanded ? 'Show less' : 'See alternatives & details'}
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        {expanded && (
          <div className="mt-5 pt-5 border-t border-gray-100 stagger">
            <div className="grid grid-cols-3 gap-3 mb-5">
              <div className="card p-3 text-center">
                <p className="text-xs text-navy-400 font-body mb-0.5">Happiness Index</p>
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

            <div>
              <p className="text-xs font-semibold text-navy-700 mb-3 font-body">
                3 Alternative Countries / Paths <span className="font-normal text-navy-400">(tap to explore)</span>
              </p>
              <div className="space-y-2">
                {result.alternatives.map((alt, i) => (
                  <AltCard
                    key={i} alt={alt} index={i}
                    isOpen={selectedAlt === i}
                    onToggle={() => setSelectedAlt(selectedAlt === i ? null : i)}
                  />
                ))}
              </div>
            </div>

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
  const firstName = user?.name?.split(' ')[0]

  return (
    <div className="min-h-screen bg-gray-50 font-body">
      <div className="glass-nav shadow-sm px-6 py-4 flex items-center justify-between">
        <Logo size="sm" />
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 text-xs text-navy-600 hover:text-navy-900 border border-gray-200 rounded-lg px-3 py-2 transition-all font-body">
            <Share2 size={13} /> Share
          </button>
          <button className="flex items-center gap-1.5 text-xs text-navy-600 hover:text-navy-900 border border-gray-200 rounded-lg px-3 py-2 transition-all font-body">
            <Download size={13} /> Export
          </button>
          <button onClick={() => navigate('/dashboard')} className="btn-primary text-xs py-2 px-4">Dashboard</button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="mb-8 stagger">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 size={18} className="text-green-500" />
            <span className="text-sm text-green-600 font-semibold font-body">Analysis complete</span>
          </div>
          <h1 className="font-display text-4xl font-bold text-navy-900 mb-3">
            {firstName ? `${firstName}, here are your` : 'Here are your'} top 3 pathways
          </h1>
          <p className="text-navy-500 font-body text-base leading-relaxed max-w-xl">
            Every path is ranked by how well it fits <span className="font-semibold text-navy-700">your skills, goals, and priorities</span>, not generic rankings. Explore each one and tap the metrics to understand the numbers.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="card p-4 text-center">
            <p className="font-display font-black text-2xl text-navy-900 mb-0.5">8</p>
            <p className="text-xs text-navy-500 font-body leading-relaxed">paths modelled across<br />local & abroad options</p>
          </div>
          <div className="card p-4 text-center">
            <p className="font-display font-black text-2xl text-navy-900 mb-0.5">12+</p>
            <p className="text-xs text-navy-500 font-body leading-relaxed">data signals used per<br />country & pathway</p>
          </div>
          <div className="card p-4 text-center">
            <p className="font-display font-black text-2xl text-navy-900 mb-0.5">3</p>
            <p className="text-xs text-navy-500 font-body leading-relaxed">best-fit recommendations<br />ranked just for you</p>
          </div>
        </div>

        <div className="space-y-5">
          {RESULTS.map(r => (
            <PathwayCard key={r.rank} result={r} isTop={r.rank === 1} />
          ))}
        </div>

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