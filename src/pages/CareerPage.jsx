import { useApp } from '../context/AppContext'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import {
    Briefcase, MapPin, Clock, ArrowRight, Globe, TrendingUp,
    Users, Star, ChevronDown, ChevronUp, Mail, ExternalLink
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

function JobCard({ job }) {
    const [open, setOpen] = useState(false)

    return (
        <div className={`card overflow-hidden transition-all duration-300 ${open ? 'ring-2 ring-navy-200' : ''}`}>
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
                    <div className="mt-5 pt-5 border-t border-gray-100 grid md:grid-cols-2 gap-6 stagger">
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
                )}
            </div>
        </div>
    )
}

export default function CareersPage() {
    const navigate = useNavigate()
    const { user } = useApp()
    if (!user) { navigate('/auth?mode=login'); return null }
    const [filterTeam, setFilterTeam] = useState('All')
    const teams = ['All', ...Array.from(new Set(OPENINGS.map(j => j.team)))]
    const filtered = filterTeam === 'All' ? OPENINGS : OPENINGS.filter(j => j.team === filterTeam)

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

            {/* Job Listings */}
            <section className="py-16 px-6">
                <div className="max-w-4xl mx-auto">
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
                        {filtered.map(job => <JobCard key={job.id} job={job} />)}
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