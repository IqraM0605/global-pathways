import { useApp } from '../context/AppContext'
import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import {
    Briefcase, MapPin, Clock, ArrowRight, Globe, TrendingUp,
    Users, Star, ChevronDown, ChevronUp, Mail, ExternalLink,
    CheckCircle, Shield, Plus, Trash2, Edit, X
} from 'lucide-react'

const OPENINGS = [
    {
        id: 1,
        title: 'Senior Full-Stack Engineer',
        team: 'Engineering',
        location: 'Remote (India / Europe)',
        type: 'Full-time',
        level: 'Senior',
        description: 'Build and scale the core GlobalPathways platform. You\'ll work on AI-powered recommendation systems, data pipelines, and the web application that helps thousands of people make life-changing decisions.',
        responsibilities: [
            'Architect and develop features across the full stack (React, Node.js, Python)',
            'Collaborate with AI/ML team on integrating recommendation models',
            'Improve platform performance, reliability, and scalability',
            'Mentor junior engineers and contribute to engineering culture',
        ],
        requirements: [
            '5+ years full-stack experience (React + Node.js or Python)',
            'Experience with AI/ML API integrations',
            'Strong system design and problem-solving skills',
            'Passion for products that create real-world impact',
        ],
    },
    {
        id: 2,
        title: 'AI / ML Engineer',
        team: 'AI & Data',
        location: 'Remote',
        type: 'Full-time',
        level: 'Mid–Senior',
        description: 'Design and improve the AI models that power our career pathway recommendations. This role combines NLP, career data modelling, and LLM fine-tuning to deliver personalised, accurate results.',
        responsibilities: [
            'Build and fine-tune LLM-based recommendation models',
            'Develop NLP pipelines for resume parsing and skill extraction',
            'Analyse pathway outcomes and improve model accuracy',
            'Research new approaches to career matching and financial modelling',
        ],
        requirements: [
            '3+ years in ML/AI engineering (NLP experience preferred)',
            'Proficiency in Python, PyTorch or TensorFlow',
            'Experience with LLMs, embeddings, and RAG pipelines',
            'Strong analytical mindset and attention to model fairness',
        ],
    },
    {
        id: 3,
        title: 'Product Designer (UX/UI)',
        team: 'Design',
        location: 'Remote',
        type: 'Full-time',
        level: 'Mid-level',
        description: 'Own the end-to-end design of the GlobalPathways experience, from onboarding flows and results pages to our mobile apps. You will work closely with product and engineering to create intuitive, beautiful interfaces.',
        responsibilities: [
            'Design user flows, wireframes, and high-fidelity prototypes',
            'Conduct user research and usability testing',
            'Maintain and evolve the design system',
            'Collaborate cross-functionally with engineering and product',
        ],
        requirements: [
            '3+ years product design experience (B2C preferred)',
            'Proficiency in Figma and design systems',
            'Strong portfolio showcasing UX thinking and visual polish',
            'Experience designing for mobile and web',
        ],
    },
    {
        id: 4,
        title: 'Growth & Marketing Manager',
        team: 'Growth',
        location: 'Remote (India preferred)',
        type: 'Full-time',
        level: 'Mid-level',
        description: 'Drive user acquisition and growth for GlobalPathways. You\'ll lead campaigns, partnerships, and content initiatives that help us reach students and professionals considering international opportunities.',
        responsibilities: [
            'Plan and execute digital marketing campaigns (SEO, social, paid)',
            'Build and manage university and community partnerships',
            'Analyse funnel metrics and run growth experiments',
            'Create content strategy and oversee brand voice',
        ],
        requirements: [
            '3+ years in growth, performance, or content marketing',
            'Data-driven with experience in analytics tools',
            'Experience marketing to student or young professional audiences',
            'Excellent communication and creative instincts',
        ],
    },
    {
        id: 5,
        title: 'Country & Visa Research Analyst',
        team: 'Content & Research',
        location: 'Remote',
        type: 'Contract / Full-time',
        level: 'Junior–Mid',
        description: 'Keep our country data accurate and up-to-date. You\'ll research visa requirements, cost of living, job markets, and quality of life metrics to power the data behind GlobalPathways recommendations.',
        responsibilities: [
            'Research and maintain data on 50+ countries (visas, jobs, lifestyle)',
            'Monitor changes to immigration policies and work permits',
            'Collaborate with AI team to structure data for models',
            'Write summaries and country profiles for the platform',
        ],
        requirements: [
            'Research background (academic, journalism, or policy)',
            'Strong attention to detail and comfort with structured data',
            'Interest in global mobility, immigration, or international careers',
            'Excellent writing skills',
        ],
    },
]

const PERKS = [
    { icon: Globe, label: 'Fully Remote', desc: 'Work from anywhere in the world' },
    { icon: TrendingUp, label: 'Equity', desc: 'Early-stage equity for all full-time roles' },
    { icon: Users, label: 'Small Team', desc: 'High ownership and direct impact from day one' },
    { icon: Star, label: 'Mission-driven', desc: 'Help people make their biggest life decisions' },
]

const teamColors = {
    'Engineering': 'bg-blue-50 text-blue-700',
    'AI & Data': 'bg-purple-50 text-purple-700',
    'Design': 'bg-pink-50 text-pink-700',
    'Growth': 'bg-green-50 text-green-700',
    'Content & Research': 'bg-gold-400/10 text-gold-600',
}

const VERIFIERS = [
    { name: 'Sarah Chen', role: 'HR Director', avatar: 'SC' },
    { name: 'Marcus Johnson', role: 'Engineering Lead', avatar: 'MJ' },
    { name: 'Priya Patel', role: 'Operations Manager', avatar: 'PP' },
]

// Helper to manage list fields (responsibilities/requirements)
function ListField({ label, items, onChange }) {
    const addItem = () => onChange([...items, ''])
    const updateItem = (index, value) => {
        const newItems = [...items]
        newItems[index] = value
        onChange(newItems)
    }
    const removeItem = (index) => onChange(items.filter((_, i) => i !== index))

    return (
        <div>
            <label className="block text-xs font-semibold text-navy-700 mb-2 font-body">{label}</label>
            <div className="space-y-2 mb-2">
                {items.map((item, i) => (
                    <div key={i} className="flex gap-2">
                        <input
                            className="input-field flex-1 text-sm"
                            value={item}
                            onChange={(e) => updateItem(i, e.target.value)}
                            placeholder={`Enter ${label.toLowerCase()} item`}
                        />
                        <button
                            type="button"
                            onClick={() => removeItem(i)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </div>
                ))}
            </div>
            <button type="button" onClick={addItem} className="text-xs text-navy-600 hover:text-navy-800 flex items-center gap-1 font-body">
                <Plus size={12} /> Add {label.toLowerCase()} item
            </button>
        </div>
    )
}

function JobCard({ job, isExternal }) {
    const [open, setOpen] = useState(false)

    return (
        <div className={`card overflow-hidden transition-all duration-300 ${open ? 'ring-2 ring-navy-200' : ''}`}>
            {/* Verification Badge - Only for company jobs */}
            {!isExternal && (
                <div className="bg-green-50 border-b border-green-100 px-6 py-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Shield size={12} className="text-green-600" />
                        <span className="text-xs font-semibold text-green-700 font-body">Verified Position</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <CheckCircle size={12} className="text-green-600" />
                        <span className="text-xs text-green-600 font-body">Approved by {VERIFIERS.length} team members</span>
                    </div>
                </div>
            )}

            {isExternal && (
                <div className="bg-blue-50 border-b border-blue-100 px-6 py-2.5 flex items-center gap-2">
                    <Globe size={12} className="text-blue-600" />
                    <span className="text-xs font-semibold text-blue-700 font-body">External Employer</span>
                </div>
            )}

            <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full font-body ${teamColors[job.team] || 'bg-gray-100 text-gray-600'}`}>
                                {job.team}
                            </span>
                            <span className="text-xs font-medium bg-gray-50 text-navy-600 px-2.5 py-0.5 rounded-full font-body border border-gray-100">
                                {job.level}
                            </span>
                        </div>
                        <h3 className="font-display font-bold text-lg text-navy-900 mb-2">{job.title}</h3>
                        <div className="flex flex-wrap gap-3 mb-3">
                            <span className="flex items-center gap-1.5 text-xs text-navy-500 font-body">
                                <MapPin size={12} className="text-navy-400" /> {job.location}
                            </span>
                            <span className="flex items-center gap-1.5 text-xs text-navy-500 font-body">
                                <Clock size={12} className="text-navy-400" /> {job.type}
                            </span>
                        </div>
                        <p className="text-sm text-navy-600 font-body leading-relaxed">{job.description}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 mt-5">
                    <button
                        onClick={() => setOpen(!open)}
                        className="flex items-center gap-1.5 text-xs font-semibold text-navy-600 hover:text-navy-900 transition-colors font-body"
                    >
                        {open ? 'Show less' : 'View full details'}
                        {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                    <a
                        href={`mailto:careers@globalpathways.ai?subject=Application: ${encodeURIComponent(job.title)}`}
                        className="ml-auto flex items-center gap-1.5 btn-primary text-xs py-2 px-4"
                    >
                        Apply Now <ArrowRight size={13} />
                    </a>
                </div>

                {open && (
                    <div className="mt-5 pt-5 border-t border-gray-100 space-y-6">
                        <div className="grid md:grid-cols-2 gap-6 stagger">
                            <div>
                                <p className="text-xs font-bold text-navy-700 mb-3 font-display">Responsibilities</p>
                                <ul className="space-y-2">
                                    {job.responsibilities.map((r, i) => (
                                        <li key={i} className="flex items-start gap-2 text-xs text-navy-600 font-body leading-relaxed">
                                            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 flex-shrink-0 mt-1.5"></span>
                                            {r}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-navy-700 mb-3 font-display">Requirements</p>
                                <ul className="space-y-2">
                                    {job.requirements.map((r, i) => (
                                        <li key={i} className="flex items-start gap-2 text-xs text-navy-600 font-body leading-relaxed">
                                            <span className="w-1.5 h-1.5 rounded-full bg-navy-300 flex-shrink-0 mt-1.5"></span>
                                            {r}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Verification Details */}
                        <div className="pt-5 border-t border-gray-100">
                            <p className="text-xs font-bold text-navy-700 mb-3 font-display flex items-center gap-2">
                                <Shield size={14} className="text-green-600" />
                                Job Verified By
                            </p>
                            <div className="grid sm:grid-cols-3 gap-3">
                                {VERIFIERS.map((verifier, i) => (
                                    <div key={i} className="flex items-center gap-3 bg-navy-50 rounded-xl p-3">
                                        <div className="w-9 h-9 rounded-full bg-navy-900 text-white flex items-center justify-center text-xs font-bold font-display flex-shrink-0">
                                            {verifier.avatar}
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-navy-800 font-body">{verifier.name}</p>
                                            <p className="text-xs text-navy-500 font-body">{verifier.role}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

// ─────────────────────────────────────────────────────────────────────────────
// Employer Portal
// ─────────────────────────────────────────────────────────────────────────────
function EmployerPortal() {
    const [activeTab, setActiveTab] = useState('post') // 'post' | 'listings' | 'applications'
    const [formData, setFormData] = useState({
        title: '', company: '', team: '', location: '', type: 'Full-time',
        level: 'Junior', salaryRange: '', applicationDeadline: '',
        description: '', responsibilities: [''], requirements: [''],
        companyWebsite: ''
    })
    const [success, setSuccess] = useState(false)

    const set = (k, v) => setFormData(prev => ({ ...prev, [k]: v }))

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!formData.title || !formData.company || !formData.description) {
            alert('Please fill in all required fields')
            return
        }

        const newJob = {
            ...formData,
            id: Date.now(),
            postedDate: new Date().toISOString(),
            applications: [],
            isExternal: true
        }

        const existingJobs = JSON.parse(localStorage.getItem('employerJobs') || '[]')
        localStorage.setItem('employerJobs', JSON.stringify([...existingJobs, newJob]))

        setSuccess(true)
        setTimeout(() => {
            setSuccess(false)
            setFormData({
                title: '', company: '', team: '', location: '', type: 'Full-time',
                level: 'Junior', salaryRange: '', applicationDeadline: '',
                description: '', responsibilities: [''], requirements: [''],
                companyWebsite: ''
            })
        }, 2000)
    }

    const deleteJob = (id) => {
        if (!confirm('Are you sure you want to delete this job posting?')) return
        const existingJobs = JSON.parse(localStorage.getItem('employerJobs') || '[]')
        localStorage.setItem('employerJobs', JSON.stringify(existingJobs.filter(j => j.id !== id)))
    }

    const employerJobs = JSON.parse(localStorage.getItem('employerJobs') || '[]')

    return (
        <div className="max-w-4xl mx-auto">
            {/* Tab Navigation */}
            <div className="flex gap-2 mb-6 border-b border-gray-200">
                {[
                    { id: 'post', label: 'Post New Job', icon: Plus },
                    { id: 'listings', label: 'My Listings', icon: Briefcase },
                    { id: 'applications', label: 'Applications', icon: Mail },
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all font-body
                            ${activeTab === tab.id ? 'border-navy-900 text-navy-900' : 'border-transparent text-navy-500 hover:text-navy-700'}`}
                    >
                        <tab.icon size={14} /> {tab.label}
                    </button>
                ))}
            </div>

            {success && (
                <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                    <CheckCircle size={18} className="text-green-600" />
                    <p className="text-sm text-green-700 font-body">Job posted successfully!</p>
                </div>
            )}

            {/* Post New Job */}
            {activeTab === 'post' && (
                <div className="card p-6">
                    <h2 className="font-display font-bold text-xl text-navy-900 mb-6">Post a New Job Opportunity</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Company Information */}
                        <div>
                            <h3 className="text-sm font-bold text-navy-700 mb-3 font-display">Company Information</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-navy-700 mb-1.5 font-body">Company Name *</label>
                                    <input className="input-field" value={formData.company} onChange={e => set('company', e.target.value)} required />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-navy-700 mb-1.5 font-body">Company Website</label>
                                    <input className="input-field" type="url" placeholder="https://example.com" value={formData.companyWebsite} onChange={e => set('companyWebsite', e.target.value)} />
                                </div>
                            </div>
                        </div>

                        {/* Job Details */}
                        <div>
                            <h3 className="text-sm font-bold text-navy-700 mb-3 font-display">Job Details</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-navy-700 mb-1.5 font-body">Job Title *</label>
                                    <input className="input-field" value={formData.title} onChange={e => set('title', e.target.value)} required />
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-navy-700 mb-1.5 font-body">Team/Department</label>
                                        <input className="input-field" value={formData.team} onChange={e => set('team', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-navy-700 mb-1.5 font-body">Location</label>
                                        <input className="input-field" value={formData.location} onChange={e => set('location', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-navy-700 mb-1.5 font-body">Job Type</label>
                                        <select className="input-field" value={formData.type} onChange={e => set('type', e.target.value)}>
                                            <option>Full-time</option>
                                            <option>Part-time</option>
                                            <option>Contract</option>
                                            <option>Internship</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-navy-700 mb-1.5 font-body">Experience Level</label>
                                        <select className="input-field" value={formData.level} onChange={e => set('level', e.target.value)}>
                                            <option>Junior</option>
                                            <option>Mid</option>
                                            <option>Senior</option>
                                            <option>Lead</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-navy-700 mb-1.5 font-body">Salary Range</label>
                                        <input className="input-field" placeholder="e.g., ₹5-8L/yr" value={formData.salaryRange} onChange={e => set('salaryRange', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-navy-700 mb-1.5 font-body">Application Deadline</label>
                                        <input className="input-field" type="date" value={formData.applicationDeadline} onChange={e => set('applicationDeadline', e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Job Description */}
                        <div>
                            <h3 className="text-sm font-bold text-navy-700 mb-3 font-display">Job Description</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-navy-700 mb-1.5 font-body">Description *</label>
                                    <textarea className="input-field" rows="4" value={formData.description} onChange={e => set('description', e.target.value)} required />
                                </div>
                                <ListField label="Responsibilities" items={formData.responsibilities} onChange={items => set('responsibilities', items)} />
                                <ListField label="Requirements" items={formData.requirements} onChange={items => set('requirements', items)} />
                            </div>
                        </div>

                        <button type="submit" className="btn-primary w-full py-3.5 flex items-center justify-center gap-2">
                            <Plus size={16} /> Post Job Opportunity
                        </button>
                    </form>
                </div>
            )}

            {/* My Listings */}
            {activeTab === 'listings' && (
                <div className="space-y-4">
                    {employerJobs.length === 0 ? (
                        <div className="card p-12 text-center">
                            <Briefcase size={48} className="text-gray-300 mx-auto mb-4" />
                            <p className="text-navy-500 font-body">No job postings yet. Create your first job listing!</p>
                            <button onClick={() => setActiveTab('post')} className="btn-primary mt-4 text-sm">Post a Job</button>
                        </div>
                    ) : (
                        employerJobs.map(job => (
                            <div key={job.id} className="card p-6">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <h3 className="font-display font-bold text-lg text-navy-900">{job.title}</h3>
                                        <p className="text-sm text-navy-500 font-body mt-1">{job.company} · {job.location}</p>
                                        <div className="flex gap-2 mt-2">
                                            <span className="text-xs bg-gray-100 text-navy-600 px-2 py-0.5 rounded-full font-body">{job.type}</span>
                                            <span className="text-xs bg-gray-100 text-navy-600 px-2 py-0.5 rounded-full font-body">{job.level}</span>
                                        </div>
                                    </div>
                                    <button onClick={() => deleteJob(job.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                                <p className="text-xs text-gray-400 font-body mt-4">
                                    Posted {new Date(job.postedDate).toLocaleDateString()} · {job.applications.length} applications
                                </p>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* Applications */}
            {activeTab === 'applications' && (
                <div className="space-y-6">
                    {employerJobs.length === 0 ? (
                        <div className="card p-12 text-center">
                            <Mail size={48} className="text-gray-300 mx-auto mb-4" />
                            <p className="text-navy-500 font-body">No applications yet. Post a job to start receiving applications!</p>
                        </div>
                    ) : (
                        employerJobs.map(job => (
                            <div key={job.id} className="card p-6">
                                <h3 className="font-display font-bold text-lg text-navy-900 mb-1">{job.title}</h3>
                                <p className="text-sm text-navy-500 font-body mb-4">{job.company}</p>
                                {job.applications.length > 0 ? (
                                    <div className="space-y-3">
                                        {job.applications.map((app, i) => (
                                            <div key={i} className="bg-gray-50 rounded-xl p-4">
                                                <p className="font-semibold text-sm text-navy-800 font-body">{app.name}</p>
                                                <p className="text-xs text-navy-500 font-body">{app.email}</p>
                                                <a href={`mailto:${app.email}`} className="text-xs text-navy-600 hover:text-navy-800 font-body mt-2 inline-block">
                                                    Contact Applicant
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-400 font-body">No applications yet</p>
                                )}
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    )
}

export default function CareersPage() {
    const navigate = useNavigate()
    const [params] = useSearchParams()
    const { user, setUser } = useApp()

    const [mode, setMode] = useState(params.get('careerMode') || params.get('mode') || null) // 'seeker' | 'employer' | null
    const [filterTeam, setFilterTeam] = useState('All')

    // When mode is selected, check if user is authenticated
    const handleModeSelect = (selectedMode) => {
        if (!user) {
            // Redirect to auth with the selected mode as redirect target
            navigate(`/auth?mode=login&redirect=/careers&careerMode=${selectedMode}`)
        } else {
            setMode(selectedMode)
        }
    }

    // Merge company jobs with employer-posted jobs
    const employerJobs = JSON.parse(localStorage.getItem('employerJobs') || '[]')
    const allJobs = [...OPENINGS, ...employerJobs]

    const teams = ['All', ...Array.from(new Set(allJobs.map(j => j.team).filter(Boolean)))]
    const filtered = filterTeam === 'All' ? allJobs : allJobs.filter(j => j.team === filterTeam)

    return (
        <div className="min-h-screen bg-white font-body">
            <Navbar />

            {/* Hero */}
            <section className="pt-28 pb-20 px-6 bg-navy-900">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 bg-navy-800 border border-navy-700 rounded-full px-4 py-1.5 mb-6">
                        <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse-soft"></span>
                        <span className="text-xs font-semibold text-navy-200 tracking-wide font-body">We're Hiring</span>
                    </div>
                    <h1 className="font-display text-5xl font-bold text-white leading-tight mb-6">
                        Help people find their<br /><span className="text-gold-400">best path forward.</span>
                    </h1>
                    <p className="text-navy-300 text-lg leading-relaxed max-w-2xl mx-auto font-body">
                        GlobalPathways is building the world's most personalised career and relocation intelligence platform. Join our small, mission-driven team and make a direct impact.
                    </p>
                </div>
            </section>

            {/* Perks */}
            <section className="py-16 px-6 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {PERKS.map(({ icon: Icon, label, desc }) => (
                            <div key={label} className="card p-5 text-center">
                                <div className="w-10 h-10 bg-navy-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                                    <Icon size={20} className="text-navy-700" />
                                </div>
                                <p className="font-display font-semibold text-navy-900 mb-1 text-sm">{label}</p>
                                <p className="text-xs text-navy-500 font-body">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Role Selection */}
            {!mode && (
                <section className="py-16 px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="font-display text-3xl font-bold text-navy-900 mb-3">How would you like to use Careers?</h2>
                            <p className="text-navy-500 font-body">Choose your path to get started</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Job Seeker Card */}
                            <button
                                onClick={() => handleModeSelect('seeker')}
                                className="card p-8 text-left hover:ring-2 hover:ring-navy-200 transition-all group"
                            >
                                <div className="w-14 h-14 bg-navy-50 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-navy-100 transition-colors">
                                    <Briefcase size={28} className="text-navy-700" />
                                </div>
                                <h3 className="font-display font-bold text-xl mb-2 text-navy-900">Looking for Opportunities</h3>
                                <p className="text-sm text-navy-500 font-body leading-relaxed mb-4">
                                    Browse open positions at GlobalPathways and external companies. Find your next career move and apply directly.
                                </p>
                                <div className="flex items-center gap-2 text-navy-700 font-semibold text-sm font-body">
                                    Browse Jobs <ArrowRight size={16} />
                                </div>
                            </button>

                            {/* Employer Card */}
                            <button
                                onClick={() => handleModeSelect('employer')}
                                className="card p-8 text-left hover:ring-2 hover:ring-navy-200 transition-all group"
                            >
                                <div className="w-14 h-14 bg-navy-50 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-navy-100 transition-colors">
                                    <Globe size={28} className="text-navy-700" />
                                </div>
                                <h3 className="font-display font-bold text-xl mb-2 text-navy-900">Post Job Opportunities</h3>
                                <p className="text-sm text-navy-500 font-body leading-relaxed mb-4">
                                    Share your company's open roles with talented candidates. Post jobs, manage listings, and review applications.
                                </p>
                                <div className="flex items-center gap-2 text-navy-700 font-semibold text-sm font-body">
                                    Post Jobs <ArrowRight size={16} />
                                </div>
                            </button>
                        </div>
                    </div>
                </section>
            )}

            {/* Job Listings */}
            {mode === 'seeker' && (
                <section className="py-16 px-6">
                    <div className="max-w-4xl mx-auto">
                        <button
                            onClick={() => setMode(null)}
                            className="text-sm text-navy-600 hover:text-navy-800 flex items-center gap-2 mb-6 font-body transition-colors"
                        >
                            ← Back to selection
                        </button>

                        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                            <div>
                                <p className="section-label mb-1">Open Roles</p>
                                <h2 className="font-display text-3xl font-bold text-navy-900">
                                    {filtered.length} open position{filtered.length !== 1 ? 's' : ''}
                                </h2>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {teams.map(t => (
                                    <button
                                        key={t}
                                        onClick={() => setFilterTeam(t)}
                                        className={`px-3 py-1.5 rounded-full text-xs font-semibold border-2 transition-all font-body
                            ${filterTeam === t ? 'bg-navy-800 border-navy-800 text-white' : 'border-gray-200 text-navy-600 hover:border-navy-300'}`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            {filtered.map(job => <JobCard key={job.id} job={job} isExternal={job.isExternal} />)}
                        </div>

                        {/* General Application */}
                        <div className="mt-10 card p-6 text-center bg-navy-50 border border-navy-100">
                            <p className="font-display font-semibold text-navy-900 mb-1">Don't see a fit?</p>
                            <p className="text-sm text-navy-500 font-body mb-4">We're always open to exceptional people. Send us a note and tell us how you'd contribute.</p>
                            <a
                                href="mailto:careers@globalpathways.ai?subject=General Application"
                                className="btn-primary inline-flex items-center gap-2 text-sm"
                            >
                                <Mail size={15} /> Send a General Application
                            </a>
                        </div>
                    </div>
                </section>
            )}

            {/* Employer Portal */}
            {mode === 'employer' && (
                <section className="py-16 px-6">
                    <div className="max-w-4xl mx-auto mb-6">
                        <button
                            onClick={() => setMode(null)}
                            className="text-sm text-navy-600 hover:text-navy-800 flex items-center gap-2 font-body transition-colors"
                        >
                            ← Back to selection
                        </button>
                    </div>
                    <EmployerPortal />
                </section>
            )}

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