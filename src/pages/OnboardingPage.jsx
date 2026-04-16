import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import Logo from '../components/Logo'
import {
  Upload, CheckCircle2, AlertCircle, ChevronRight, ChevronLeft,
  Briefcase, GraduationCap, Target, DollarSign, Clock, Shield,
  Heart, Globe, Star, Users, FileText, Edit3, X, Plus, Check
} from 'lucide-react'

// ── helpers ───────────────────────────────────────────────────────────────────
const Tag = ({ label, selected, onClick }) => (
  <button type="button" onClick={onClick}
    className={`tag-pill ${selected ? 'selected' : ''}`}>
    {selected && <Check size={11} />} {label}
  </button>
)

const SliderField = ({ label, value, onChange, min = 1, max = 10, leftLabel, rightLabel }) => (
  <div>
    <div className="flex justify-between items-center mb-1">
      <label className="text-xs font-semibold text-navy-700 font-body">{label}</label>
      <span className="text-xs font-bold text-navy-800 font-display bg-navy-50 px-2 py-0.5 rounded-full">{value}/10</span>
    </div>
    <input type="range" min={min} max={max} value={value} onChange={e => onChange(Number(e.target.value))} className="w-full" />
    <div className="flex justify-between text-xs text-navy-400 mt-1 font-body">
      <span>{leftLabel}</span><span>{rightLabel}</span>
    </div>
  </div>
)

const RadioGroup = ({ options, value, onChange }) => (
  <div className="flex flex-wrap gap-2">
    {options.map(opt => (
      <button key={opt} type="button"
        onClick={() => onChange(opt)}
        className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all font-body
          ${value === opt ? 'bg-navy-800 border-navy-800 text-white' : 'border-gray-200 text-navy-700 hover:border-navy-300'}`}>
        {opt}
      </button>
    ))}
  </div>
)

// ── Step configs ───────────────────────────────────────────────────────────────
const STEPS = [
  { id: 'resume', label: 'Resume', icon: FileText },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'career', label: 'Career', icon: Briefcase },
  { id: 'financial', label: 'Financial', icon: DollarSign },
  { id: 'lifestyle', label: 'Lifestyle', icon: Heart },
  { id: 'preferences', label: 'Preferences', icon: Globe },
  { id: 'priorities', label: 'Priorities', icon: Star },
  { id: 'review', label: 'Review', icon: CheckCircle2 },
]

const ALL_COUNTRIES = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria',
  'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan',
  'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia',
  'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica',
  'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt',
  'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon',
  'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana',
  'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel',
  'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kosovo', 'Kuwait', 'Kyrgyzstan',
  'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar',
  'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia',
  'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal',
  'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Norway', 'Oman', 'Pakistan',
  'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar',
  'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Saudi Arabia', 'Senegal',
  'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Korea',
  'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan',
  'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu',
  'UAE', 'Uganda', 'Ukraine', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela',
  'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
]
const SKILLS_LIST = ['Python', 'Data Analysis', 'Project Management', 'Communication', 'Leadership', 'JavaScript', 'Machine Learning', 'Marketing', 'Finance', 'Product Management', 'Design', 'Research', 'Sales', 'Operations', 'HR', 'Writing', 'Java', 'SQL', 'Strategy', 'Business Development']
const UNIVERSITIES = ['IIT Bombay', 'IIT Delhi', 'MIT', 'Stanford', 'Oxford', 'Cambridge', 'NUS Singapore', 'TU Munich', 'University of Toronto', 'University of Melbourne', 'ETH Zurich', 'Imperial College London']
const LIFESTYLE_OPTS = ['Safety first (low crime)', 'High happiness index', 'Good work-life balance', 'Outdoor lifestyle', 'Urban City', 'Cultural diversity', 'English-speaking country', 'Warm climate', 'Social healthcare', 'Networking', 'Public Transport']
const PRIORITY_OPTIONS = [
  { id: 'preferred_country', label: 'Preferred Country' },
  { id: 'changing_career', label: 'Changing Careers' },
  { id: 'lifestyle', label: 'Life Style / Happiness Index' },
  { id: 'crime_rates', label: 'Safety / Crime Rates' },
  { id: 'work_life_balance', label: 'Work Life Balance' },
  { id: 'financial_goals', label: 'Financial Goals (ROI / NPV)' },
  { id: 'time_budget', label: 'Staying in My Timeline' },
  { id: 'financial_budget', label: 'Staying in My Financial Budget' },
]

export default function OnboardingPage() {
  const navigate = useNavigate()
  const { formData, updateForm, user } = useApp()
  const [currentStep, setCurrentStep] = useState(0)
  const [localData, setLocalData] = useState({ ...formData })
  const [resumeDragging, setResumeDragging] = useState(false)
  const [resumeParsed, setResumeParsed] = useState(false)
  const fileRef = useRef()

  const set = (k, v) => setLocalData(prev => ({ ...prev, [k]: v }))

  const toggleArray = (key, val) => {
    const arr = localData[key] || []
    set(key, arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val])
  }

  const handleResumeUpload = (file) => {
    if (!file) return
    set('resumeFile', file.name)
    // Simulate parsing
    setTimeout(() => {
      setResumeParsed(true)
      set('skills', ['Python', 'Data Analysis', 'Project Management'])
      set('educationalDetails', { degree: "Bachelor's", institution: 'University of Mumbai', year: '2022', field: 'Computer Science' })
      set('currentStatus', 'Employed')
      set('currentRole', 'Data Analyst')
      set('preferredCareer', 'Upskill in current field')
      set('preferWorkOrStudy', 'Work + Study')
    }, 2500)
  }

  const next = () => {
    if (currentStep < STEPS.length - 1) setCurrentStep(s => s + 1)
    else {
      updateForm(localData)
      navigate('/results')
    }
  }
  const back = () => setCurrentStep(s => s - 1)

  const progress = ((currentStep) / (STEPS.length - 1)) * 100

  const renderStep = () => {
    switch (STEPS[currentStep].id) {

      // ── Step 0: Resume ──────────────────────────────────────────────────────
      case 'resume':
        return (
          <div className="stagger">
            <p className="section-label mb-2">Step 1 of 8</p>
            <h2 className="font-display text-3xl font-bold text-navy-900 mb-2">Upload your resume</h2>
            <p className="text-navy-500 text-sm mb-8 font-body">We'll extract your skills, education, and experience automatically.</p>

            {!localData.resumeFile ? (
              <div
                className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer ${resumeDragging ? 'border-navy-500 bg-navy-50' : 'border-gray-200 hover:border-navy-300 hover:bg-gray-50'}`}
                onClick={() => fileRef.current?.click()}
                onDragOver={e => { e.preventDefault(); setResumeDragging(true) }}
                onDragLeave={() => setResumeDragging(false)}
                onDrop={e => { e.preventDefault(); setResumeDragging(false); handleResumeUpload(e.dataTransfer.files[0]) }}
              >
                <Upload size={36} className="text-navy-300 mx-auto mb-4" />
                <p className="font-semibold text-navy-700 font-display mb-1">Drop your resume here</p>
                <p className="text-sm text-navy-400 font-body">or click to browse · PDF, DOC, DOCX</p>
                <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" className="hidden"
                  onChange={e => handleResumeUpload(e.target.files[0])} />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3 bg-navy-50 rounded-xl p-4 border border-navy-100">
                  <FileText size={20} className="text-navy-600" />
                  <div className="flex-1">
                    <p className="font-semibold text-navy-800 text-sm font-body">{localData.resumeFile}</p>
                    <p className="text-xs text-navy-400 font-body">{resumeParsed ? 'Parsed successfully' : 'Parsing...'}</p>
                  </div>
                  {resumeParsed
                    ? <CheckCircle2 size={20} className="text-green-500" />
                    : <div className="w-5 h-5 border-2 border-navy-300 border-t-navy-700 rounded-full animate-spin"></div>
                  }
                </div>

                {resumeParsed && (
                  <div className="card p-5 stagger">
                    <div className="flex items-center justify-between mb-4">
                      <p className="font-semibold text-navy-800 font-display text-sm">Extracted Information</p>
                      <span className="text-xs text-gold-500 font-semibold font-body flex items-center gap-1"><Edit3 size={11} /> Editable</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div>
                        <label className="text-xs font-semibold text-navy-500 font-body">Degree</label>
                        <input className="input-field mt-1" value={localData.educationalDetails?.degree || ''} onChange={e => set('educationalDetails', { ...localData.educationalDetails, degree: e.target.value })} />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-navy-500 font-body">Field of Study</label>
                        <input className="input-field mt-1" value={localData.educationalDetails?.field || ''} onChange={e => set('educationalDetails', { ...localData.educationalDetails, field: e.target.value })} />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-navy-500 font-body">Institution</label>
                        <input className="input-field mt-1" value={localData.educationalDetails?.institution || ''} onChange={e => set('educationalDetails', { ...localData.educationalDetails, institution: e.target.value })} />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-navy-500 font-body">Graduation Year</label>
                        <input className="input-field mt-1" value={localData.educationalDetails?.year || ''} onChange={e => set('educationalDetails', { ...localData.educationalDetails, year: e.target.value })} />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-navy-500 font-body mb-2 block">Detected Skills</label>
                      <div className="flex flex-wrap gap-2">
                        {(localData.skills || []).map(s => (
                          <span key={s} className="tag-pill selected">
                            {s} <button onClick={() => toggleArray('skills', s)}><X size={10} /></button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            <p className="text-xs text-navy-400 mt-4 font-body text-center">
              Don't have a resume ready? <button className="text-navy-700 underline" onClick={next}>Skip and enter manually →</button>
            </p>
          </div>
        )

      // ── Step 1: Education ────────────────────────────────────────────────────
      case 'education':
        return (
          <div className="stagger">
            <p className="section-label mb-2">Step 2 of 8</p>
            <h2 className="font-display text-3xl font-bold text-navy-900 mb-2">Educational details</h2>
            <p className="text-navy-500 text-sm mb-8 font-body">Tell us about your academic background.</p>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-navy-700 mb-1.5 block font-body">Highest Degree *</label>
                  <select className="input-field" value={localData.educationalDetails?.degree || ''} onChange={e => set('educationalDetails', { ...localData.educationalDetails, degree: e.target.value })}>
                    <option value="">Select degree</option>
                    {["High School", "Diploma", "Bachelor's", "Master's", "MBA", "PhD", "Other"].map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-navy-700 mb-1.5 block font-body">Field of Study *</label>
                  <input className="input-field" placeholder="e.g. Computer Science" value={localData.educationalDetails?.field || ''} onChange={e => set('educationalDetails', { ...localData.educationalDetails, field: e.target.value })} />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-navy-700 mb-1.5 block font-body">Institution Name</label>
                <input className="input-field" placeholder="e.g. IIT Bombay" value={localData.educationalDetails?.institution || ''} onChange={e => set('educationalDetails', { ...localData.educationalDetails, institution: e.target.value })} />
              </div>

              <div>
                <label className="text-xs font-semibold text-navy-700 mb-1.5 block font-body">Current Status *</label>
                <RadioGroup
                  options={['Studying', 'Recently Graduated', 'Employed', 'Self-employed', 'Looking for work']}
                  value={localData.currentStatus}
                  onChange={v => set('currentStatus', v)}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-navy-700 mb-2 block font-body">Your Skills <span className="text-navy-400 font-normal">(select all that apply)</span></label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {SKILLS_LIST.map(s => (
                    <Tag key={s} label={s} selected={(localData.skills || []).includes(s)} onClick={() => toggleArray('skills', s)} />
                  ))}
                  {(localData.skills || []).filter(s => !SKILLS_LIST.includes(s)).map(s => (
                    <span key={s} className="tag-pill selected">
                      {s} <button type="button" onClick={() => toggleArray('skills', s)}><X size={10} /></button>
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl border-2 border-dashed border-navy-200 text-xs font-semibold text-navy-600 hover:border-navy-400 transition-all font-body"
                  onClick={() => {
                    const val = prompt('Enter a skill:')
                    if (val && val.trim() && !(localData.skills || []).includes(val.trim())) {
                      set('skills', [...(localData.skills || []), val.trim()])
                    }
                  }}
                >
                  <Plus size={12} /> Add New
                </button>
              </div>
            </div>
          </div>
        )

      // ── Step 2: Career ───────────────────────────────────────────────────────
      case 'career':
        return (
          <div className="stagger">
            <p className="section-label mb-2">Step 3 of 8</p>
            <h2 className="font-display text-3xl font-bold text-navy-900 mb-2">Career preferences</h2>
            <p className="text-navy-500 text-sm mb-8 font-body">What are you looking for in your next chapter?</p>

            <div className="space-y-6">
              <div>
                <label className="text-xs font-semibold text-navy-700 mb-1.5 block font-body">Current Job Title / Role</label>
                <input className="input-field" placeholder="e.g. Software Engineer" value={localData.currentRole || ''} onChange={e => set('currentRole', e.target.value)} />
              </div>

              <div>
                <label className="text-xs font-semibold text-navy-700 mb-2 block font-body">Preferred Career Direction *</label>
                <RadioGroup
                  options={['Stay in current career', 'Transition to new career', 'Upskill in current field', 'Complete career pivot']}
                  value={localData.preferredCareer}
                  onChange={v => set('preferredCareer', v)}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-navy-700 mb-2 block font-body">Prefer Work or Study? *</label>
                <RadioGroup
                  options={['Work', 'Study', 'Work + Study', 'Flexible']}
                  value={localData.preferWorkOrStudy}
                  onChange={v => set('preferWorkOrStudy', v)}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-navy-700 mb-2 block font-body">Time Availability <span className="text-navy-400 font-normal">(how much time do you have to make this move?)</span></label>
                <RadioGroup
                  options={['< 6 months', '6–12 months', '1–2 years', '2–3 years', 'Flexible']}
                  value={localData.timeAvailability}
                  onChange={v => set('timeAvailability', v)}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-navy-700 mb-2 block font-body">Preferred Universities <span className="text-navy-400 font-normal">(optional)</span></label>
                <div className="flex gap-2 mb-2">
                  <select
                    className="input-field flex-1"
                    onChange={e => {
                      const val = e.target.value
                      if (val && !(localData.preferredUniversities || []).includes(val)) {
                        toggleArray('preferredUniversities', val)
                      }
                      e.target.value = ''
                    }}
                  >
                    <option value="">Select a university…</option>
                    {['IIT Bombay', 'IIT Delhi', 'IIM Ahmedabad', 'MIT', 'Stanford', 'Harvard', 'Oxford', 'Cambridge', 'NUS Singapore', 'TU Munich', 'University of Toronto', 'University of Melbourne', 'ETH Zurich', 'Imperial College London', 'University of Amsterdam', 'McGill University'].map(u => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="flex items-center gap-1 px-3 py-2 rounded-xl border-2 border-dashed border-navy-200 text-xs font-semibold text-navy-600 hover:border-navy-400 transition-all font-body whitespace-nowrap"
                    onClick={() => {
                      const val = prompt('Enter university name:')
                      if (val && val.trim() && !(localData.preferredUniversities || []).includes(val.trim())) {
                        toggleArray('preferredUniversities', val.trim())
                      }
                    }}
                  >
                    <Plus size={12} /> Add New
                  </button>
                </div>
                {(localData.preferredUniversities || []).length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {(localData.preferredUniversities || []).map(u => (
                      <span key={u} className="tag-pill selected">
                        {u} <button type="button" onClick={() => toggleArray('preferredUniversities', u)}><X size={10} /></button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )

      // ── Step 3: Financial ────────────────────────────────────────────────────
      case 'financial':
        return (
          <div className="stagger">
            <p className="section-label mb-2">Step 4 of 8</p>
            <h2 className="font-display text-3xl font-bold text-navy-900 mb-2">Financial picture</h2>
            <p className="text-navy-500 text-sm mb-8 font-body">This helps us calculate ROI and NPV for each pathway.</p>

            <div className="space-y-6">
              <div>
                <label className="text-xs font-semibold text-navy-700 mb-2 block font-body">Financial Goal *</label>
                <RadioGroup
                  options={['Maximise earnings', 'Financial stability', 'Debt-free journey', 'Quick ROI', 'Long-term wealth']}
                  value={localData.financialGoals}
                  onChange={v => set('financialGoals', v)}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-navy-700 mb-2 block font-body">Current Savings *</label>
                <select className="input-field" value={localData.financialStatus || ''} onChange={e => set('financialStatus', e.target.value)}>
                  <option value="">Select savings range…</option>
                  <option value="$0 – $1,000">$0 – $1,000 (No savings)</option>
                  <option value="$1,000 – $5,000">$1,000 – $5,000 (Minimal)</option>
                  <option value="$5,000 – $10,000">$5,000 – $10,000 (Some savings)</option>
                  <option value="$10,000 – $25,000">$10,000 – $25,000 (Stable)</option>
                  <option value="$25,000 – $50,000">$25,000 – $50,000 (Good savings)</option>
                  <option value="$50,000 – $100,000">$50,000 – $100,000 (Strong savings)</option>
                  <option value="$100,000+">$100,000+ (High savings / investments)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-navy-700 mb-2 block font-body">Loan Capacity *</label>
                <select className="input-field" value={localData.loanCapacity || ''} onChange={e => set('loanCapacity', e.target.value)}>
                  <option value="">Select loan range…</option>
                  <option value="No loan">No loan ($0)</option>
                  <option value="$0 – $10,000">$0 – $10,000 (Small loan)</option>
                  <option value="$10,000 – $30,000">$10,000 – $30,000 (Moderate loan)</option>
                  <option value="$30,000 – $60,000">$30,000 – $60,000 (Significant loan)</option>
                  <option value="$60,000 – $100,000">$60,000 – $100,000 (Large loan)</option>
                  <option value="$100,000+">$100,000+ (Open to large loan)</option>
                </select>
              </div>

              <SliderField
                label="Risk Tolerance"
                value={localData.riskTolerance || 5}
                onChange={v => set('riskTolerance', v)}
                leftLabel="Very conservative"
                rightLabel="High risk appetite"
              />
            </div>
          </div>
        )

      // ── Step 4: Lifestyle ────────────────────────────────────────────────────
      case 'lifestyle':
        return (
          <div className="stagger">
            <p className="section-label mb-2">Step 5 of 8</p>
            <h2 className="font-display text-3xl font-bold text-navy-900 mb-2">Lifestyle & wellbeing</h2>
            <p className="text-navy-500 text-sm mb-8 font-body">We use happiness index and crime rate data to match your ideal environment.</p>

            <div className="space-y-6">
              <SliderField
                label="Work-Life Balance Importance"
                value={localData.workLifeBalance || 5}
                onChange={v => set('workLifeBalance', v)}
                leftLabel="Career-focused"
                rightLabel="Balance-focused"
              />

              <div>
                <label className="text-xs font-semibold text-navy-700 mb-2 block font-body">Lifestyle Preferences <span className="text-navy-400 font-normal">(select all that apply)</span></label>
                <div className="flex flex-wrap gap-2">
                  {LIFESTYLE_OPTS.map(l => (
                    <Tag key={l} label={l} selected={(localData.lifestyle || []).includes(l)} onClick={() => toggleArray('lifestyle', l)} />
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-navy-700 mb-3 block font-body">Family & Dependants</label>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-navy-500 font-body mb-2">Marital Status</p>
                    <RadioGroup
                      options={['Single', 'Married']}
                      value={localData.maritalStatus}
                      onChange={v => set('maritalStatus', v)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-navy-500 font-body mb-2">Dependants under 18</p>
                      <RadioGroup
                        options={['No', 'Yes']}
                        value={localData.dependantsUnder18 !== undefined ? (localData.dependantsUnder18 ? 'Yes' : 'No') : undefined}
                        onChange={v => set('dependantsUnder18', v === 'Yes')}
                      />
                      {localData.dependantsUnder18 && (
                        <input
                          type="number" min="1" max="10"
                          className="input-field mt-2"
                          placeholder="How many?"
                          value={localData.dependantsUnder18Count || ''}
                          onChange={e => set('dependantsUnder18Count', e.target.value)}
                        />
                      )}
                    </div>
                    <div>
                      <p className="text-xs text-navy-500 font-body mb-2">Dependants over 18</p>
                      <RadioGroup
                        options={['No', 'Yes']}
                        value={localData.dependantsOver18 !== undefined ? (localData.dependantsOver18 ? 'Yes' : 'No') : undefined}
                        onChange={v => set('dependantsOver18', v === 'Yes')}
                      />
                      {localData.dependantsOver18 && (
                        <input
                          type="number" min="1" max="10"
                          className="input-field mt-2"
                          placeholder="How many?"
                          value={localData.dependantsOver18Count || ''}
                          onChange={e => set('dependantsOver18Count', e.target.value)}
                        />
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-navy-500 font-body mb-2">Financial Dependency</p>
                    <RadioGroup
                      options={['Dependent', 'Not Dependent']}
                      value={localData.financialDependency}
                      onChange={v => set('financialDependency', v)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      // ── Step 5: Preferences ──────────────────────────────────────────────────
      case 'preferences':
        return (
          <div className="stagger">
            <p className="section-label mb-2">Step 6 of 8</p>
            <h2 className="font-display text-3xl font-bold text-navy-900 mb-2">Country & study preferences</h2>
            <p className="text-navy-500 text-sm mb-8 font-body">Select the countries you'd consider moving to or studying in.</p>

            <div className="space-y-6">
              <div>
                <label className="text-xs font-semibold text-navy-700 mb-2 block font-body">Preferred Countries <span className="text-navy-400 font-normal">(select up to 5)</span></label>
                <select
                  className="input-field mb-2"
                  onChange={e => {
                    const val = e.target.value
                    if (!val) return
                    const arr = localData.preferredCountries || []
                    if (!arr.includes(val) && arr.length < 5) {
                      set('preferredCountries', [...arr, val])
                    }
                    e.target.value = ''
                  }}
                >
                  <option value="">Select a country…</option>
                  {ALL_COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                {(localData.preferredCountries || []).length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {(localData.preferredCountries || []).map(c => (
                      <span key={c} className="tag-pill selected">
                        {c} <button type="button" onClick={() => set('preferredCountries', (localData.preferredCountries || []).filter(x => x !== c))}><X size={10} /></button>
                      </span>
                    ))}
                  </div>
                )}
                {(localData.preferredCountries || []).length >= 5 && (
                  <p className="text-xs text-gold-600 font-body mt-1">Maximum 5 countries selected</p>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-navy-700 mb-2 block font-body">Open to Countries Not Listed?</label>
                <RadioGroup
                  options={['Yes, suggest any', 'Only from my list', 'Suggest but flag alternatives']}
                  value={localData.openToOtherCountries}
                  onChange={v => set('openToOtherCountries', v)}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-navy-700 mb-1.5 block font-body">Any specific notes? <span className="text-navy-400 font-normal">(optional)</span></label>
                <textarea
                  className="input-field resize-none h-20"
                  placeholder='e.g. "I really want to pursue data science in Germany"'
                  value={localData.preferenceNotes || ''}
                  onChange={e => set('preferenceNotes', e.target.value)}
                />
              </div>
            </div>
          </div>
        )

      // ── Step 6: Priorities ───────────────────────────────────────────────────
      case 'priorities':
        const selected = localData.priorities || []
        return (
          <div className="stagger">
            <p className="section-label mb-2">Step 7 of 8</p>
            <h2 className="font-display text-3xl font-bold text-navy-900 mb-2">Your top priorities</h2>
            <p className="text-navy-500 text-sm mb-8 font-body">Choose <strong>3 to 5</strong> things that matter most. These will weight your final recommendations.</p>

            <div className="grid grid-cols-1 gap-3">
              {PRIORITY_OPTIONS.map(({ id, label }) => {
                const isSelected = selected.includes(id)
                const rank = selected.indexOf(id) + 1
                return (
                  <button key={id} type="button"
                    onClick={() => {
                      if (isSelected) set('priorities', selected.filter(x => x !== id))
                      else if (selected.length < 5) set('priorities', [...selected, id])
                    }}
                    className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all text-left ${isSelected ? 'step-active bg-navy-50' : 'border-gray-100 hover:border-navy-200 bg-white'}`}
                  >
                    <span className={`font-medium text-sm font-body ${isSelected ? 'text-navy-900' : 'text-navy-600'}`}>{label}</span>
                    {isSelected
                      ? <div className="w-6 h-6 rounded-full bg-navy-800 text-white text-xs flex items-center justify-center font-bold font-display">{rank}</div>
                      : <div className="w-6 h-6 rounded-full border-2 border-gray-200"></div>
                    }
                  </button>
                )
              })}
            </div>

            <p className="text-xs text-center mt-4 font-body">
              <span className={`font-semibold ${selected.length >= 3 ? 'text-green-600' : 'text-gold-500'}`}>
                {selected.length} / 5 selected
              </span>
              {selected.length < 3 && <span className="text-navy-400"> (please select at least 3)</span>}
            </p>
          </div>
        )

      // ── Step 7: Review ───────────────────────────────────────────────────────
      case 'review':
        return (
          <div className="stagger">
            <p className="section-label mb-2">Step 8 of 8</p>
            <h2 className="font-display text-3xl font-bold text-navy-900 mb-2">Review your profile</h2>
            <p className="text-navy-500 text-sm mb-8 font-body">Everything looks right? Click <em>Generate My Pathways</em> to see your top 3 results.</p>

            <div className="space-y-3">
              {localData.resumeFile && (
                <div className="mb-4 bg-navy-50 border border-navy-100 rounded-xl p-4 flex items-center gap-3">
                  <FileText size={18} className="text-navy-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-navy-700 font-body">Resume uploaded</p>
                    <p className="text-xs text-navy-400 font-body">{localData.resumeFile}</p>
                  </div>
                  <CheckCircle2 size={16} className="text-green-500 ml-auto flex-shrink-0" />
                </div>
              )}
              {[
                { label: 'Name', value: `${localData.firstName} ${localData.lastName}` },
                { label: 'Email', value: localData.email },
                { label: 'Country', value: localData.country },
                { label: 'Degree', value: localData.educationalDetails?.degree },
                { label: 'Status', value: localData.currentStatus },
                { label: 'Skills', value: (localData.skills || []).join(', ') || '—' },
                { label: 'Career Direction', value: localData.preferredCareer || '—' },
                { label: 'Prefers', value: localData.preferWorkOrStudy || '—' },
                { label: 'Financial Goal', value: localData.financialGoals || '—' },
                { label: 'Risk Tolerance', value: `${localData.riskTolerance || 5}/10` },
                { label: 'Work-Life Balance', value: `${localData.workLifeBalance || 5}/10` },
                { label: 'Countries', value: (localData.preferredCountries || []).join(', ') || '—' },
                { label: 'Top Priorities', value: (localData.priorities || []).map(p => PRIORITY_OPTIONS.find(x => x.id === p)?.label).join(', ') || '—' },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-start justify-between py-2.5 border-b border-gray-50">
                  <span className="text-xs text-navy-400 font-body w-32 flex-shrink-0">{label}</span>
                  <span className="text-sm text-navy-800 font-medium font-body text-right flex-1">{value || '—'}</span>
                </div>
              ))}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const canProceed = () => {
    if (STEPS[currentStep].id === 'priorities') return (localData.priorities || []).length >= 3
    return true
  }

  return (
    <div className="min-h-screen bg-gray-50 font-body">
      {/* Top bar */}
      <div className="glass-nav shadow-sm px-6 py-4 flex items-center justify-between">
        <Logo size="sm" />
        <div className="flex items-center gap-3">
          <span className="text-xs text-navy-500 font-body hidden sm:block">
            Step {currentStep + 1} of {STEPS.length}
          </span>
          <button onClick={() => navigate('/')} className="text-xs text-navy-400 hover:text-navy-700 transition-colors font-body">
            Save & exit
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-gray-100">
        <div className="progress-bar h-full" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">
        {/* Step indicators */}
        <div className="flex items-center justify-between mb-10 overflow-x-auto pb-2">
          {STEPS.map((s, i) => {
            const Icon = s.icon
            const done = i < currentStep
            const active = i === currentStep
            return (
              <div key={s.id} className="flex flex-col items-center gap-1 flex-shrink-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all
                  ${done ? 'bg-navy-800' : active ? 'bg-white border-2 border-navy-800' : 'bg-gray-100'}`}>
                  {done
                    ? <Check size={14} className="text-white" />
                    : <Icon size={14} className={active ? 'text-navy-800' : 'text-gray-400'} />
                  }
                </div>
                <span className={`text-xs font-body hidden sm:block ${active ? 'text-navy-800 font-semibold' : done ? 'text-navy-500' : 'text-gray-400'}`}>
                  {s.label}
                </span>
              </div>
            )
          })}
        </div>

        {/* Step content */}
        <div className="card p-8 mb-6">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={back}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all font-body
              ${currentStep === 0 ? 'opacity-30 cursor-not-allowed text-navy-400' : 'text-navy-700 hover:bg-navy-50'}`}
          >
            <ChevronLeft size={16} /> Back
          </button>

          <button
            onClick={next}
            disabled={!canProceed()}
            className={`flex items-center gap-2 px-7 py-3 rounded-xl font-semibold text-sm transition-all font-body
              ${canProceed()
                ? currentStep === STEPS.length - 1
                  ? 'btn-gold'
                  : 'btn-primary'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
          >
            {currentStep === STEPS.length - 1 ? 'Generate My Pathways ✨' : 'Continue'}
            {currentStep < STEPS.length - 1 && <ChevronRight size={16} />}
          </button>
        </div>
      </div>
    </div>
  )
}