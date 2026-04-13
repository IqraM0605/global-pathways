import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import {
  User, Mail, Phone, Calendar, MapPin, Briefcase, GraduationCap,
  Edit3, Save, X, ChevronLeft, CheckCircle2, Camera
} from 'lucide-react'

const SKILLS_LIST = [
  'Python', 'Data Analysis', 'Project Management', 'Communication', 'Leadership',
  'JavaScript', 'Machine Learning', 'Marketing', 'Finance', 'Product Management',
  'Design', 'Research', 'Sales', 'Operations', 'HR', 'Writing', 'Java', 'SQL',
  'Strategy', 'Business Development', 'Excel', 'Tableau', 'React', 'Node.js'
]

function FieldRow({ label, value, editing, onChange, type = 'text', options = null }) {
  return (
    <div className="flex items-start gap-4 py-3.5 border-b border-gray-50">
      <span className="text-xs text-navy-400 font-body w-36 flex-shrink-0 pt-1">{label}</span>
      {editing ? (
        options ? (
          <select
            className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-navy-800 font-body focus:outline-none focus:ring-2 focus:ring-navy-200 bg-white"
            value={value}
            onChange={e => onChange(e.target.value)}
          >
            {options.map(o => <option key={o}>{o}</option>)}
          </select>
        ) : (
          <input
            type={type}
            className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-navy-800 font-body focus:outline-none focus:ring-2 focus:ring-navy-200"
            value={value || ''}
            onChange={e => onChange(e.target.value)}
          />
        )
      ) : (
        <span className="text-sm text-navy-800 font-body flex-1">{value || <span className="text-gray-300">—</span>}</span>
      )}
    </div>
  )
}

export default function ProfilePage({ onBack }) {
  const { formData, updateForm, user } = useApp()
  const [editing, setEditing] = useState(false)
  const [local, setLocal] = useState({ ...formData })
  const [saved, setSaved] = useState(false)

  const set = (k, v) => setLocal(prev => ({ ...prev, [k]: v }))
  const setEdu = (k, v) => setLocal(prev => ({ ...prev, educationalDetails: { ...prev.educationalDetails, [k]: v } }))

  const toggleSkill = (s) => {
    const arr = local.skills || []
    set('skills', arr.includes(s) ? arr.filter(x => x !== s) : [...arr, s])
  }

  const handleSave = () => {
    updateForm(local)
    setEditing(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const handleCancel = () => {
    setLocal({ ...formData })
    setEditing(false)
  }

  const name = `${local.firstName || ''} ${local.lastName || ''}`.trim() || user?.name || 'User'
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          {onBack && (
            <button onClick={onBack} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
              <ChevronLeft size={18} className="text-navy-600" />
            </button>
          )}
          <h1 className="font-display font-bold text-navy-900 text-lg">My Profile</h1>
        </div>
        <div className="flex items-center gap-2">
          {saved && (
            <span className="flex items-center gap-1.5 text-xs text-green-600 font-semibold font-body animate-fade-in">
              <CheckCircle2 size={14} /> Saved
            </span>
          )}
          {editing ? (
            <>
              <button onClick={handleCancel} className="flex items-center gap-1.5 text-xs font-semibold text-navy-500 hover:text-navy-800 border border-gray-200 rounded-lg px-3 py-2 font-body transition-all">
                <X size={13} /> Cancel
              </button>
              <button onClick={handleSave} className="flex items-center gap-1.5 text-xs font-semibold text-white bg-navy-800 hover:bg-navy-700 rounded-lg px-3 py-2 font-body transition-all">
                <Save size={13} /> Save Changes
              </button>
            </>
          ) : (
            <button onClick={() => setEditing(true)} className="flex items-center gap-1.5 text-xs font-semibold text-navy-700 hover:text-navy-900 border border-gray-200 rounded-lg px-3 py-2 font-body transition-all hover:border-navy-300">
              <Edit3 size={13} /> Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">
        {/* Avatar + name hero */}
        <div className="card p-6 flex items-center gap-5">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-navy-800 text-white flex items-center justify-center font-display font-black text-xl flex-shrink-0">
              {initials}
            </div>
            {editing && (
              <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-gold-400 rounded-full flex items-center justify-center shadow">
                <Camera size={11} className="text-white" />
              </button>
            )}
          </div>
          <div>
            <h2 className="font-display font-bold text-xl text-navy-900">{name}</h2>
            <p className="text-sm text-navy-500 font-body">{local.email || user?.email || '—'}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-medium bg-navy-50 text-navy-600 px-2.5 py-0.5 rounded-full font-body">
                {local.country || 'Country not set'}
              </span>
              {local.currentStatus && (
                <span className="text-xs font-medium bg-gold-400/10 text-gold-600 px-2.5 py-0.5 rounded-full font-body">
                  {local.currentStatus}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Personal Details */}
        <div className="card p-6">
          <h3 className="font-display font-semibold text-navy-900 mb-1 flex items-center gap-2">
            <User size={16} className="text-navy-500" /> Personal Details
          </h3>
          <p className="text-xs text-navy-400 font-body mb-4">Basic information linked to your account</p>
          <FieldRow label="First Name" value={local.firstName} editing={editing} onChange={v => set('firstName', v)} />
          <FieldRow label="Last Name" value={local.lastName} editing={editing} onChange={v => set('lastName', v)} />
          <FieldRow label="Email" value={local.email} editing={editing} onChange={v => set('email', v)} type="email" />
          <FieldRow label="Mobile" value={`${local.countryCode || ''} ${local.mobile || ''}`.trim()} editing={false} onChange={() => {}} />
          <FieldRow label="Date of Birth" value={local.dob} editing={editing} onChange={v => set('dob', v)} type="date" />
          <FieldRow label="Country" value={local.country} editing={editing} onChange={v => set('country', v)} />
        </div>

        {/* Education */}
        <div className="card p-6">
          <h3 className="font-display font-semibold text-navy-900 mb-1 flex items-center gap-2">
            <GraduationCap size={16} className="text-navy-500" /> Education
          </h3>
          <p className="text-xs text-navy-400 font-body mb-4">Academic background and qualifications</p>
          <FieldRow label="Degree" value={local.educationalDetails?.degree} editing={editing} onChange={v => setEdu('degree', v)}
            options={["High School", "Diploma", "Bachelor's", "Master's", "MBA", "PhD", "Other"]} />
          <FieldRow label="Field of Study" value={local.educationalDetails?.field} editing={editing} onChange={v => setEdu('field', v)} />
          <FieldRow label="Institution" value={local.educationalDetails?.institution} editing={editing} onChange={v => setEdu('institution', v)} />
          <FieldRow label="Graduation Year" value={local.educationalDetails?.year} editing={editing} onChange={v => setEdu('year', v)} />
          <FieldRow label="Current Status" value={local.currentStatus} editing={editing} onChange={v => set('currentStatus', v)}
            options={['Studying', 'Recently Graduated', 'Employed', 'Self-employed', 'Looking for work']} />
        </div>

        {/* Skills */}
        <div className="card p-6">
          <h3 className="font-display font-semibold text-navy-900 mb-1 flex items-center gap-2">
            <Briefcase size={16} className="text-navy-500" /> Skills
          </h3>
          <p className="text-xs text-navy-400 font-body mb-4">Your professional and technical skills</p>
          <div className="flex flex-wrap gap-2">
            {editing ? (
              SKILLS_LIST.map(s => {
                const sel = (local.skills || []).includes(s)
                return (
                  <button key={s} type="button" onClick={() => toggleSkill(s)}
                    className={`tag-pill ${sel ? 'selected' : ''}`}>
                    {sel && <span className="text-xs">✓ </span>}{s}
                  </button>
                )
              })
            ) : (
              (local.skills || []).length > 0
                ? (local.skills || []).map(s => (
                  <span key={s} className="tag-pill selected">{s}</span>
                ))
                : <span className="text-sm text-gray-300 font-body">No skills added yet</span>
            )}
          </div>
        </div>

        {/* Career Preferences */}
        <div className="card p-6">
          <h3 className="font-display font-semibold text-navy-900 mb-1 flex items-center gap-2">
            <MapPin size={16} className="text-navy-500" /> Career & Location Preferences
          </h3>
          <p className="text-xs text-navy-400 font-body mb-4">Drives your pathway recommendations</p>
          <FieldRow label="Career Direction" value={local.preferredCareer} editing={editing} onChange={v => set('preferredCareer', v)}
            options={['Stay in current career', 'Transition to new career', 'Upskill in current field', 'Complete career pivot']} />
          <FieldRow label="Work or Study?" value={local.preferWorkOrStudy} editing={editing} onChange={v => set('preferWorkOrStudy', v)}
            options={['Work only', 'Study only', 'Work + Study', 'Flexible']} />
          <FieldRow label="Time Available" value={local.timeAvailability} editing={editing} onChange={v => set('timeAvailability', v)}
            options={['< 6 months', '6–12 months', '1–2 years', '2–3 years', 'Flexible']} />
          <FieldRow label="Financial Goal" value={local.financialGoals} editing={editing} onChange={v => set('financialGoals', v)}
            options={['Maximise earnings', 'Financial stability', 'Debt-free journey', 'Quick ROI', 'Long-term wealth']} />
          <div className="py-3.5 border-b border-gray-50">
            <span className="text-xs text-navy-400 font-body block mb-1">Preferred Countries</span>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {(local.preferredCountries || []).map(c => (
                <span key={c} className="text-xs font-medium bg-navy-50 border border-navy-100 text-navy-700 px-2.5 py-1 rounded-full font-body">
                  {c}
                </span>
              ))}
              {(!local.preferredCountries || local.preferredCountries.length === 0) && (
                <span className="text-sm text-gray-300 font-body">None selected</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
