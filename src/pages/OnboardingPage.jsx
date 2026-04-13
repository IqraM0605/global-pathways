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

const COUNTRIES = ['India', 'United States', 'Canada', 'Germany', 'United Kingdom', 'Australia', 'Singapore', 'Netherlands', 'Ireland', 'New Zealand', 'UAE', 'Japan', 'France', 'Sweden', 'Denmark']
const SKILLS_LIST = ['Python', 'Data Analysis', 'Project Management', 'Communication', 'Leadership', 'JavaScript', 'Machine Learning', 'Marketing', 'Finance', 'Product Management', 'Design', 'Research', 'Sales', 'Operations', 'HR', 'Writing', 'Java', 'SQL', 'Strategy', 'Business Development']
const UNIVERSITIES = ['IIT Bombay', 'IIT Delhi', 'MIT', 'Stanford', 'Oxford', 'Cambridge', 'NUS Singapore', 'TU Munich', 'University of Toronto', 'University of Melbourne', 'ETH Zurich', 'Imperial College London']
const LIFESTYLE_OPTS = ['Safety first (low crime)', 'High happiness index', 'Good work-life balance', 'Outdoor lifestyle', 'Urban city life', 'Close-knit community', 'Cultural diversity', 'English-speaking country', 'Warm climate', 'Social healthcare']
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
                        <input className="input-field mt-1" value={localData.educationalDetails?.degree || ''} onChange={e => set('educationalDetails', {...localData.educationalDetails, degree: e.target.value})} />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-navy-500 font-body">Field of Study</label>
                        <input className="input-field mt-1" value={localData.educationalDetails?.field || ''} onChange={e => set('educationalDetails', {...localData.educationalDetails, field: e.target.value})} />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-navy-500 font-body">Institution</label>
                        <input className="input-field mt-1" value={localData.educationalDetails?.institution || ''} onChange={e => set('educationalDetails', {...localData.educationalDetails, institution: e.target.value})} />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-navy-500 font-body">Graduation Year</label>
                        <input className="input-field mt-1" value={localData.educationalDetails?.year || ''} onChange={e => set('educationalDetails', {...localData.educationalDetails, year: e.target.value})} />
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
                  <select className="input-field" value={localData.educationalDetails?.degree || ''} onChange={e => set('educationalDetails', {...localData.educationalDetails, degree: e.target.value})}>
                    <option value="">Select degree</option>
                    {["High School", "Diploma", "Bachelor's", "Master's", "MBA", "PhD", "Other"].map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-navy-700 mb-1.5 block font-body">Field of Study *</label>
                  <input className="input-field" placeholder="e.g. Computer Science" value={localData.educationalDetails?.field || ''} onChange={e => set('educationalDetails', {...localData.educationalDetails, field: e.target.value})} />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-navy-700 mb-1.5 block font-body">Institution Name</label>
                <input className="input-field" placeholder="e.g. IIT Bombay" value={localData.educationalDetails?.institution || ''} onChange={e => set('educationalDetails', {...localData.educationalDetails, institution: e.target.value})} />
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
                <div className="flex flex-wrap gap-2">
                  {SKILLS_LIST.map(s => (
                    <Tag key={s} label={s} selected={(localData.skills || []).includes(s)} onClick={() => toggleArray('skills', s)} />
                  ))}
                </div>
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
                  options={['Work only', 'Study only', 'Work + Study', 'Flexible']}
                  value={localData.preferWorkOrStudy}
                  onChange={v => set('preferWorkOrStudy', v)}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-navy-700 mb-2 block font-body">Time Availability <span className="text-navy-400 font-normal">— how much time do you have to make this move?</span></label>
                <RadioGroup
                  options={['< 6 months', '6–12 months', '1–2 years', '2–3 years', 'Flexible']}
                  value={localData.timeAvailability}
                  onChange={v => set('timeAvailability', v)}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-navy-700 mb-2 block font-body">Preferred Universities <span className="text-navy-400 font-normal">(optional)</span></label>
                <div className="flex flex-wrap gap-2">
                  {UNIVERSITIES.map(u => (
                    <Tag key={u} label={u} selected={(localData.preferredUniversities || []).includes(u)} onClick={() => toggleArray('preferredUniversities', u)} />
                  ))}
                </div>
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
                <label className="text-xs font-semibold text-navy-700 mb-2 block font-body">Current Financial Status *</label>
                <RadioGroup
                  options={['No savings', 'Some savings (<6 months)', 'Stable (6–12 months)', 'Good savings (1+ yr)', 'High income / investments']}
                  value={localData.financialStatus}
                  onChange={v => set('financialStatus', v)}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-navy-700 mb-2 block font-body">Loan Taking Capacity *</label>
                <RadioGroup
                  options={['No loan', 'Small loan OK', 'Moderate loan OK', 'Open to large loan']}
                  value={localData.loanCapacity}
                  onChange={v => set('loanCapacity', v)}
                />
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
                <label className="text-xs font-semibold text-navy-700 mb-2 block font-body">Family / Dependants Situation</label>
                <RadioGroup
                  options={['Single, no dependants', 'Single, with dependants', 'Partnered, no kids', 'Partnered, with kids', 'Other']}
                  value={localData.familySituation}
                  onChange={v => set('familySituation', v)}
                />
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
                <div className="flex flex-wrap gap-2">
                  {COUNTRIES.map(c => (
                    <Tag key={c} label={c}
                      selected={(localData.preferredCountries || []).includes(c)}
                      onClick={() => {
                        const arr = localData.preferredCountries || []
                        if (arr.includes(c)) toggleArray('preferredCountries', c)
                        else if (arr.length < 5) toggleArray('preferredCountries', c)
                      }}
                    />
                  ))}
                </div>
                {(localData.preferredCountries || []).length > 0 && (
                  <p className="text-xs text-navy-400 mt-2 font-body">Selected: {localData.preferredCountries.join(', ')}</p>
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
              {selected.length < 3 && <span className="text-navy-400"> — please select at least 3</span>}
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

            <div className="mt-6 bg-navy-50 rounded-xl p-4 flex items-start gap-3">
              <CheckCircle2 size={18} className="text-navy-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-navy-600 font-body leading-relaxed">
                Your data is used only to generate your personalised pathways. We evaluate all 8 stay local + move abroad options and surface your top 3.
              </p>
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
