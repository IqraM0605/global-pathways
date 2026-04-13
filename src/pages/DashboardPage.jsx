import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import Logo from '../components/Logo'
import ProfilePage from './ProfilePage'
import {
  LayoutDashboard, User, Globe, TrendingUp, Star, Settings, FileText,
  Bell, ChevronRight, ArrowRight, Zap, Menu,
  CheckCircle2, Clock, MapPin, Briefcase, GraduationCap,
  LogOut, X
} from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────────
// Dashboard Home
// ─────────────────────────────────────────────────────────────────────────────
function DashboardHome({ navigate, user, formData, setActivePage }) {
  const name = user?.name || formData?.firstName || 'there'
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
      <div className="stagger">
        <h1 className="font-display text-3xl font-bold text-navy-900">{greeting}, {name.split(' ')[0]}!</h1>
        <p className="text-navy-500 mt-1 font-body text-sm">Here's what's happening with your Global Pathways journey.</p>
      </div>

      {/* Profile completion */}
      <div className="card p-5 flex items-center gap-4">
        <div className="w-10 h-10 bg-navy-50 rounded-xl flex items-center justify-center flex-shrink-0">
          <User size={18} className="text-navy-600" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1.5">
            <p className="font-semibold text-navy-800 text-sm font-body">Profile Completion</p>
            <span className="font-display font-bold text-navy-900">72%</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="progress-bar h-full rounded-full" style={{ width: '72%' }}></div>
          </div>
          <p className="text-xs text-navy-400 mt-1.5 font-body">Complete your profile to get better recommendations</p>
        </div>
        <button onClick={() => navigate('/onboarding')}
          className="flex-shrink-0 text-xs font-semibold text-navy-700 hover:text-navy-900 flex items-center gap-1 font-body border border-gray-200 hover:border-navy-300 px-3 py-2 rounded-lg transition-all">
          Complete <ChevronRight size={13} />
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 stagger">
        {[
          { label: 'Pathways Generated', value: '3', sub: 'Top matches for you' },
          { label: 'Profile Completion', value: '72%', sub: '3 sections left' },
          { label: 'Countries Evaluated', value: '15', sub: 'Across 8 paths' },
          { label: 'Applications', value: '0', sub: 'Start applying' },
        ].map(s => (
          <div key={s.label} className="card p-5">
            <p className="text-xs text-navy-400 font-body mb-1">{s.label}</p>
            <p className="font-display font-black text-2xl text-navy-900">{s.value}</p>
            <p className="text-xs text-navy-400 font-body mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Pathways preview */}
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display font-semibold text-navy-900">Your Top Pathways</h2>
            <button onClick={() => navigate('/results')} className="text-xs text-navy-500 hover:text-navy-800 flex items-center gap-1 font-body transition-colors">
              Full report <ArrowRight size={12} />
            </button>
          </div>
          <div className="space-y-1">
            {[
              { rank: 1, label: 'Move Abroad · Germany', sub: 'Study + New Career · Data Scientist', score: '94%', dot: 'bg-gold-400' },
              { rank: 2, label: 'Stay Local · India', sub: 'Study + Current Career · Sr. Engineer', score: '87%', dot: 'bg-navy-400' },
              { rank: 3, label: 'Move Abroad · Canada', sub: 'New Career · Product Manager', score: '81%', dot: 'bg-green-400' },
            ].map(p => (
              <button key={p.rank} onClick={() => setActivePage('pathways')}
                className="w-full flex items-center justify-between py-3 border-b border-gray-50 last:border-0 group hover:bg-gray-50 -mx-2 px-2 rounded-xl transition-all">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${p.dot} flex-shrink-0`}></div>
                  <div className="text-left">
                    <p className="font-medium text-sm text-navy-800 font-body">{p.label}</p>
                    <p className="text-xs text-navy-400 font-body">{p.sub}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-navy-900 text-sm">{p.score}</span>
                  <ChevronRight size={13} className="text-gray-200 group-hover:text-navy-400 transition-colors" />
                </div>
              </button>
            ))}
          </div>
          <button onClick={() => navigate('/results')} className="mt-5 btn-primary w-full text-sm py-3 flex items-center justify-center gap-2">
            View Full Report <ArrowRight size={15} />
          </button>
        </div>

        {/* Quick actions */}
        <div className="card p-6">
          <h2 className="font-display font-semibold text-navy-900 mb-4">Quick Actions</h2>
          <div className="space-y-1">
            {[
              { icon: Zap, label: 'Re-run Analysis', sub: 'Update preferences', action: () => navigate('/onboarding'), accent: 'text-gold-500 bg-gold-400/10' },
              { icon: User, label: 'Complete Profile', sub: '3 sections left', action: () => setActivePage('profile'), accent: 'text-navy-600 bg-navy-50' },
              { icon: Globe, label: 'Explore Countries', sub: 'Compare destinations', action: () => setActivePage('pathways'), accent: 'text-blue-600 bg-blue-50' },
              { icon: FileText, label: 'Start Application', sub: 'Apply for path #1', action: () => {}, accent: 'text-green-600 bg-green-50' },
            ].map(a => (
              <button key={a.label} onClick={a.action}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all text-left group">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${a.accent}`}>
                  <a.icon size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-navy-800 font-body">{a.label}</p>
                  <p className="text-xs text-navy-400 font-body">{a.sub}</p>
                </div>
                <ChevronRight size={12} className="text-gray-200 group-hover:text-navy-400 transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Next steps */}
      <div className="card p-6">
        <h2 className="font-display font-semibold text-navy-900 mb-5">Recommended Next Steps</h2>
        <div className="grid md:grid-cols-3 gap-5 stagger">
          {[
            { icon: CheckCircle2, cls: 'text-green-600 bg-green-50', title: 'Review your top path', desc: 'Explore Germany Data Scientist in full detail, including ROI and visa options.' },
            { icon: Clock, cls: 'text-gold-500 bg-gold-400/10', title: 'Set your timeline', desc: 'Define milestones for your 2-year Germany pathway to stay on track.' },
            { icon: FileText, cls: 'text-navy-700 bg-navy-50', title: 'Prepare documents', desc: 'Gather transcripts, CV, and SOP for university applications.' },
          ].map(s => (
            <div key={s.title} className="flex gap-3">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${s.cls}`}>
                <s.icon size={15} />
              </div>
              <div>
                <p className="font-semibold text-sm text-navy-800 font-body">{s.title}</p>
                <p className="text-xs text-navy-500 font-body mt-0.5 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Pathways sub-page
// ─────────────────────────────────────────────────────────────────────────────
function PathwaysPage({ navigate }) {
  const [expanded, setExpanded] = useState(1)

  const pathways = [
    {
      rank: 1, category: 'Move Abroad', country: 'Germany', role: 'Data Scientist',
      university: 'TU Munich', score: 94, tag: 'Top Pick', tagStyle: 'bg-gold-400/10 text-gold-600 border-gold-400/30',
      roi: '340%', npv: '₹1.2Cr', timeline: '2 years', cost: '₹18L',
      happiness: '8.2/10', safety: 'Very Safe', wlb: 'Excellent',
      summary: 'Your Python and data analysis skills transfer directly. Germany\'s thriving tech scene, low tuition fees, and post-study work permit make this a high-ROI path.',
      alts: ['Netherlands · Data Engineer · TU Delft · 89%', 'Canada · ML Engineer · UofT · 86%', 'Ireland · Data Analyst · UCD · 82%'],
      futurePath: null,
    },
    {
      rank: 2, category: 'Stay Local', country: 'India', role: 'Senior Software Engineer',
      university: 'IIT / Online', score: 87, tag: 'Safe Path', tagStyle: 'bg-navy-50 text-navy-700 border-navy-200',
      roi: '210%', npv: '₹65L', timeline: '1–2 years', cost: '₹4L',
      happiness: '6.4/10', safety: 'Moderate', wlb: 'Good',
      summary: 'Upskill with a part-time Master\'s or certification while continuing current employment. Lower risk, steady career growth.',
      alts: ['India · Product Manager · IIM · 83%', 'India · ML Engineer · Online · 80%', 'India · Tech Lead · No study · 77%'],
      futurePath: 'After 2 years, you\'d be well-positioned to move abroad — especially Canada or Germany — with enhanced credentials and savings.',
    },
    {
      rank: 3, category: 'Move Abroad', country: 'Canada', role: 'Product Manager',
      university: null, score: 81, tag: 'High Growth', tagStyle: 'bg-green-50 text-green-700 border-green-200',
      roi: '290%', npv: '₹95L', timeline: '1 year', cost: '₹8L',
      happiness: '7.6/10', safety: 'Very Safe', wlb: 'Very Good',
      summary: 'Your project management and communication skills qualify you for PM roles. Canada\'s Express Entry and tech-friendly immigration make this a direct transition.',
      alts: ['Australia · Business Analyst · 78%', 'UK · Product Owner · 75%', 'Singapore · Scrum Master · 72%'],
      futurePath: null,
    },
  ]

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-navy-900">My Pathways</h1>
          <p className="text-sm text-navy-500 font-body mt-0.5">8 options evaluated · Top 3 shown</p>
        </div>
        <button onClick={() => navigate('/onboarding')} className="btn-primary text-xs py-2.5 px-4 flex items-center gap-1.5">
          <Zap size={13} /> Re-analyse
        </button>
      </div>

      <div className="space-y-4">
        {pathways.map(p => (
          <div key={p.rank} className={`card overflow-hidden ${p.rank === 1 ? 'ring-2 ring-gold-400/40' : ''}`}>
            {p.rank === 1 && <div className="bg-gold-400 text-white text-xs font-bold text-center py-1.5 tracking-wide font-body">✨ YOUR BEST MATCH</div>}
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1.5">
                    <span className="font-display font-bold text-navy-900">#{p.rank} {p.category}</span>
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border font-body ${p.tagStyle}`}>{p.tag}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs text-navy-500 font-body">
                    <span className="flex items-center gap-1"><MapPin size={10} />{p.country}</span>
                    <span className="flex items-center gap-1"><Briefcase size={10} />{p.role}</span>
                    {p.university && <span className="flex items-center gap-1"><GraduationCap size={10} />{p.university}</span>}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-display font-black text-2xl text-navy-900">{p.score}%</p>
                  <p className="text-xs text-navy-400 font-body">match</p>
                </div>
              </div>

              <p className="text-sm text-navy-600 font-body leading-relaxed mb-4">{p.summary}</p>

              <div className="grid grid-cols-4 gap-2 mb-4">
                {[['ROI', p.roi], ['NPV', p.npv], ['Timeline', p.timeline], ['Cost', p.cost]].map(([l, v]) => (
                  <div key={l} className="text-center bg-gray-50 rounded-xl p-2.5">
                    <p className="text-xs text-navy-400 font-body">{l}</p>
                    <p className="font-display font-bold text-xs text-navy-900 mt-0.5">{v}</p>
                  </div>
                ))}
              </div>

              <button onClick={() => setExpanded(expanded === p.rank ? null : p.rank)}
                className="text-xs font-semibold text-navy-600 hover:text-navy-900 transition-colors font-body">
                {expanded === p.rank ? '▲ Hide details' : '▼ Show alternatives & details'}
              </button>

              {expanded === p.rank && (
                <div className="mt-4 pt-4 border-t border-gray-50 space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    {[['Happiness', p.happiness], ['Safety', p.safety], ['Work-Life', p.wlb]].map(([l, v]) => (
                      <div key={l} className="card p-3 text-center">
                        <p className="text-xs text-navy-400 font-body">{l}</p>
                        <p className="font-display font-bold text-xs text-navy-900 mt-0.5">{v}</p>
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-navy-700 mb-2 font-body">3 Alternative Paths</p>
                    <div className="space-y-1">
                      {p.alts.map((a, i) => (
                        <div key={i} className="flex items-center gap-2 py-2 border-b border-gray-50 last:border-0">
                          <span className="text-xs font-bold text-navy-300 font-display w-4">{i + 1}</span>
                          <p className="text-xs text-navy-700 font-body">{a}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  {p.futurePath && (
                    <div className="bg-navy-50 rounded-xl p-4">
                      <p className="text-xs font-bold text-navy-700 font-display mb-1.5">💡 Future Path Suggestion</p>
                      <p className="text-xs text-navy-600 font-body leading-relaxed">{p.futurePath}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Settings sub-page
// ─────────────────────────────────────────────────────────────────────────────
function SettingsPage({ user, navigate }) {
  const [notifications, setNotifications] = useState({ email: true, sms: false, updates: true })
  const [saved, setSaved] = useState(false)

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }
  const toggle = (k) => setNotifications(prev => ({ ...prev, [k]: !prev[k] }))

  return (
    <div className="max-w-2xl mx-auto px-6 py-8 space-y-5">
      <h1 className="font-display text-2xl font-bold text-navy-900">Settings</h1>

      <div className="card p-6 space-y-4">
        <h2 className="font-display font-semibold text-navy-800 text-sm">Account</h2>
        {[
          { label: 'Email address', sub: user?.email || 'Not set', action: 'Change' },
          { label: 'Password', sub: 'Last changed —', action: 'Update' },
          { label: 'Connected accounts', sub: 'Google — connected', action: 'Disconnect', danger: true },
        ].map(({ label, sub, action, danger }) => (
          <div key={label} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
            <div>
              <p className="text-sm font-medium text-navy-800 font-body">{label}</p>
              <p className="text-xs text-navy-400 font-body">{sub}</p>
            </div>
            <button className={`text-xs underline font-body ${danger ? 'text-red-500' : 'text-navy-600'}`}>{action}</button>
          </div>
        ))}
      </div>

      <div className="card p-6 space-y-4">
        <h2 className="font-display font-semibold text-navy-800 text-sm">Notifications</h2>
        {[
          { key: 'email', label: 'Email notifications', sub: 'Pathway updates, new matches' },
          { key: 'sms', label: 'SMS / WhatsApp alerts', sub: 'Important reminders only' },
          { key: 'updates', label: 'Product updates', sub: 'New features and improvements' },
        ].map(({ key, label, sub }) => (
          <div key={key} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
            <div>
              <p className="text-sm font-medium text-navy-800 font-body">{label}</p>
              <p className="text-xs text-navy-400 font-body">{sub}</p>
            </div>
            <button onClick={() => toggle(key)}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${notifications[key] ? 'bg-navy-800' : 'bg-gray-200'}`}>
              <span className="inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform"
                style={{ transform: notifications[key] ? 'translateX(18px)' : 'translateX(2px)' }} />
            </button>
          </div>
        ))}
      </div>

      <div className="card p-6">
        <h2 className="font-display font-semibold text-red-600 mb-3 text-sm">Danger Zone</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-navy-800 font-body">Delete account</p>
            <p className="text-xs text-navy-400 font-body">Permanently delete your profile and all data</p>
          </div>
          <button className="text-xs font-semibold text-red-500 border border-red-200 hover:bg-red-50 px-3 py-1.5 rounded-lg font-body transition-all">
            Delete
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-sm text-navy-400 hover:text-red-500 transition-colors font-body">
          <LogOut size={15} /> Sign out
        </button>
        <button onClick={save} className="btn-primary text-sm px-5 py-2.5 flex items-center gap-1.5">
          {saved ? <><CheckCircle2 size={14} /> Saved!</> : 'Save Settings'}
        </button>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Dashboard Shell
// ─────────────────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: 'home', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'profile', icon: User, label: 'My Profile' },
  { id: 'pathways', icon: Globe, label: 'My Pathways' },
  { id: 'settings', icon: Settings, label: 'Settings' },
]

export default function DashboardPage() {
  const navigate = useNavigate()
  const { user, formData } = useApp()
  const [activePage, setActivePage] = useState('home')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const name = user?.name || formData?.firstName || 'User'
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  const pageLabel = NAV_ITEMS.find(n => n.id === activePage)?.label || 'Dashboard'

  const renderPage = () => {
    switch (activePage) {
      case 'home':     return <DashboardHome navigate={navigate} user={user} formData={formData} setActivePage={setActivePage} />
      case 'profile':  return <ProfilePage />
      case 'pathways': return <PathwaysPage navigate={navigate} />
      case 'settings': return <SettingsPage user={user} navigate={navigate} />
      default:         return <DashboardHome navigate={navigate} user={user} formData={formData} setActivePage={setActivePage} />
    }
  }

  return (
    <div className="flex font-body" style={{ height: '100vh', overflow: 'hidden' }}>
      {/* Desktop sidebar */}
      <aside className="w-60 bg-white border-r border-gray-100 hidden lg:flex flex-col py-6 px-4 flex-shrink-0 h-screen">
        <div className="mb-8 px-2"><Logo size="sm" /></div>

        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest px-2 mb-2 font-body">Navigation</p>
        <nav className="space-y-0.5 flex-1">
          {NAV_ITEMS.map(({ id, icon: Icon, label }) => (
            <button key={id} onClick={() => setActivePage(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all font-body
                ${activePage === id ? 'bg-navy-900 text-white font-semibold' : 'text-gray-500 hover:bg-gray-50 hover:text-navy-700'}`}>
              <Icon size={16} />{label}
            </button>
          ))}
          <div className="pt-2 border-t border-gray-50 mt-2">
            {[
              { icon: TrendingUp, label: 'Results Report', action: () => navigate('/results') },
              { icon: FileText, label: 'Edit Preferences', action: () => navigate('/onboarding') },
            ].map(({ icon: Icon, label, action }) => (
              <button key={label} onClick={action}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-navy-700 transition-all font-body">
                <Icon size={16} />{label}
              </button>
            ))}
          </div>
        </nav>

        {/* User chip */}
        <div className="border-t border-gray-100 pt-4 mt-4">
          <button onClick={() => setActivePage('profile')}
            className="w-full flex items-center gap-3 px-2 hover:bg-gray-50 rounded-xl p-2 transition-all group">
            <div className="w-8 h-8 rounded-full bg-navy-900 text-white flex items-center justify-center text-xs font-bold font-display flex-shrink-0">
              {initials}
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-xs font-semibold text-navy-800 font-body truncate">{name}</p>
              <p className="text-xs text-gray-400 font-body truncate">{user?.email || ''}</p>
            </div>
            <LogOut size={13} className="text-gray-300 group-hover:text-red-400 transition-colors"
              onClick={(e) => { e.stopPropagation(); navigate('/') }} />
          </button>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)}></div>
          <aside className="relative w-64 h-full bg-white flex flex-col py-6 px-4 z-10">
            <div className="flex items-center justify-between mb-6 px-2">
              <Logo size="sm" />
              <button onClick={() => setSidebarOpen(false)}><X size={18} className="text-navy-600" /></button>
            </div>
            <nav className="space-y-0.5 flex-1">
              {NAV_ITEMS.map(({ id, icon: Icon, label }) => (
                <button key={id} onClick={() => { setActivePage(id); setSidebarOpen(false) }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all font-body
                    ${activePage === id ? 'bg-navy-900 text-white' : 'text-gray-500 hover:bg-gray-50 hover:text-navy-700'}`}>
                  <Icon size={16} />{label}
                </button>
              ))}
              <div className="pt-2 border-t border-gray-50 mt-2">
                <button onClick={() => { navigate('/results'); setSidebarOpen(false) }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:bg-gray-50 hover:text-navy-700 transition-all font-body">
                  <TrendingUp size={16} /> Results Report
                </button>
              </div>
            </nav>
            <div className="border-t border-gray-100 pt-4 mt-4 px-2">
              <button onClick={() => navigate('/')} className="flex items-center gap-2 text-xs text-navy-400 hover:text-red-500 transition-colors font-body">
                <LogOut size={13} /> Sign out
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0" style={{ overflow: 'hidden' }}>
        {/* Topbar */}
        <div className="glass-nav border-b border-gray-100 px-4 lg:px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <button className="lg:hidden text-navy-800 p-1" onClick={() => setSidebarOpen(true)}>
              <Menu size={20} />
            </button>
            <p className="font-display font-semibold text-navy-900">{pageLabel}</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
              <Bell size={17} className="text-navy-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gold-400 rounded-full"></span>
            </button>
            <button onClick={() => navigate('/results')} className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5">
              <Zap size={13} /> Results
            </button>
          </div>
        </div>

        {/* Page content */}
        <div className="flex-1 overflow-auto bg-gray-50">
          {renderPage()}
        </div>
      </div>
    </div>
  )
}
