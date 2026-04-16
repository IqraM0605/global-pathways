import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import Logo from '../components/Logo'
import {
  Eye, EyeOff, ArrowLeft, Mail, Phone, User,
  Calendar, AlertCircle, Globe, Briefcase, ArrowRight
} from 'lucide-react'

// ─── Country codes ────────────────────────────────────────────────────────────
const COUNTRY_CODES = [
  { code: '+91',  country: 'IN', name: 'India' },
  { code: '+1',   country: 'US', name: 'United States' },
  { code: '+44',  country: 'GB', name: 'United Kingdom' },
  { code: '+61',  country: 'AU', name: 'Australia' },
  { code: '+49',  country: 'DE', name: 'Germany' },
  { code: '+33',  country: 'FR', name: 'France' },
  { code: '+1',   country: 'CA', name: 'Canada' },
  { code: '+971', country: 'AE', name: 'UAE' },
  { code: '+65',  country: 'SG', name: 'Singapore' },
  { code: '+81',  country: 'JP', name: 'Japan' },
]

// ─── Google SVG icon ──────────────────────────────────────────────────────────
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  )
}

// ─── Animated background orbs ─────────────────────────────────────────────────
function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div style={{
        position: 'absolute', top: '-10%', right: '-5%',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(15,23,42,0.08) 0%, transparent 70%)',
        animation: 'float 8s ease-in-out infinite',
      }}/>
      <div style={{
        position: 'absolute', bottom: '10%', left: '-8%',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)',
        animation: 'float 10s ease-in-out infinite reverse',
      }}/>
      <div style={{
        position: 'absolute', top: '40%', left: '30%',
        width: '300px', height: '300px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(15,23,42,0.04) 0%, transparent 70%)',
        animation: 'float 12s ease-in-out infinite 2s',
      }}/>
    </div>
  )
}

// ─── Career mode intent banner ────────────────────────────────────────────────
function IntentBanner({ careerMode }) {
  if (!careerMode) return null
  const isEmployer = careerMode === 'employer'
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '10px',
      background: 'linear-gradient(135deg, rgba(15,23,42,0.06), rgba(212,175,55,0.08))',
      border: '1px solid rgba(212,175,55,0.25)',
      borderRadius: '12px', padding: '12px 16px', marginBottom: '24px',
    }}>
      <div style={{
        width: '32px', height: '32px', borderRadius: '8px',
        background: 'rgba(15,23,42,0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        {isEmployer
          ? <Globe size={15} style={{ color: '#0f172a' }}/>
          : <Briefcase size={15} style={{ color: '#0f172a' }}/>
        }
      </div>
      <div>
        <p style={{ fontSize: '11px', fontWeight: 700, color: '#0f172a', fontFamily: 'inherit', letterSpacing: '0.02em', textTransform: 'uppercase', marginBottom: '1px' }}>
          {isEmployer ? 'Post Job Opportunities' : 'Browse Opportunities'}
        </p>
        <p style={{ fontSize: '11px', color: '#64748b', fontFamily: 'inherit' }}>
          Sign in to continue to the {isEmployer ? 'Employer Portal' : 'Job Listings'}
        </p>
      </div>
      <ArrowRight size={13} style={{ color: '#94a3b8', marginLeft: 'auto', flexShrink: 0 }}/>
    </div>
  )
}

// ─── Input field component ─────────────────────────────────────────────────────
function Field({ label, icon: Icon, required, error, children, hint }) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={{
        display: 'block', fontSize: '11px', fontWeight: 700,
        color: '#334155', marginBottom: '6px', letterSpacing: '0.04em',
        textTransform: 'uppercase', fontFamily: 'inherit',
      }}>
        {label}{required && <span style={{ color: '#d4af37', marginLeft: '3px' }}>*</span>}
      </label>
      <div style={{ position: 'relative' }}>
        {Icon && (
          <Icon size={14} style={{
            position: 'absolute', left: '12px', top: '50%',
            transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none',
          }}/>
        )}
        {children}
      </div>
      {hint && <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px', fontFamily: 'inherit' }}>{hint}</p>}
    </div>
  )
}

const inputStyle = (hasIcon = false, extra = {}) => ({
  width: '100%', boxSizing: 'border-box',
  padding: `11px 14px 11px ${hasIcon ? '36px' : '14px'}`,
  fontSize: '13px', fontFamily: 'inherit', color: '#0f172a',
  background: '#f8fafc', border: '1.5px solid #e2e8f0',
  borderRadius: '10px', outline: 'none',
  transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s',
  ...extra,
})

// ─── Main AuthPage ─────────────────────────────────────────────────────────────
export default function AuthPage() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const { setUser, updateForm } = useApp()

  const redirectTo  = params.get('redirect')    || null
  const careerMode  = params.get('careerMode')  || null   // ✅ 'seeker' | 'employer'
  const [mode, setMode]   = useState(params.get('mode') === 'signup' ? 'signup' : 'login')
  const [stage, setStage] = useState('form')  // 'form' | 'verify'
  const [showPass, setShowPass]   = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState('')
  const [focusedField, setFocusedField] = useState(null)

  const [fields, setFields] = useState({
    firstName: '', lastName: '', mobile: '', countryCode: '+91',
    email: '', dob: '', password: '', confirmPassword: '',
  })
  const [verifyCode, setVerifyCode]     = useState('')
  const [detectedCountry, setDetectedCountry] = useState('India')

  // ── Auto-detect country on mount ─────────────────────────────────────────
  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(r => r.json())
      .then(data => {
        if (data?.country_calling_code) {
          set('countryCode', data.country_calling_code)
          const found = COUNTRY_CODES.find(c => c.code === data.country_calling_code)
          setDetectedCountry(found ? found.name : data.country_name || 'Unknown')
        }
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    const found = COUNTRY_CODES.find(c => c.code === fields.countryCode)
    if (found) setDetectedCountry(found.name)
  }, [fields.countryCode])

  const set = (k, v) => {
    setFields(prev => ({ ...prev, [k]: v }))
    setError('')
  }

  // ── Redirect helper — ✅ FIXED: uses careerMode= not mode= ──────────────
  const redirectAfterAuth = () => {
    if (redirectTo === '/careers' && careerMode) {
      navigate(`/careers?careerMode=${careerMode}`)  // ✅ FIXED
    } else {
      navigate(redirectTo || '/onboarding')
    }
  }

  // ── Google auth ───────────────────────────────────────────────────────────
  const handleGoogleAuth = () => {
    setLoading(true)
    setTimeout(() => {
      setUser({ name: 'Demo User', email: 'demo@gmail.com' })
      redirectAfterAuth()
    }, 1500)
  }

  // ── Email / password submit ───────────────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (mode === 'login') {
      if (!fields.email || !fields.password) { setError('Please fill in all fields.'); return }
      setLoading(true)
      setTimeout(() => {
        setUser({ name: 'User', email: fields.email })
        redirectAfterAuth()   // ✅ FIXED
      }, 1200)
      return
    }

    // Signup validation
    if (!fields.firstName || !fields.lastName || !fields.email || !fields.mobile || !fields.dob) {
      setError('Please fill in all required fields.'); return
    }
    if (fields.password !== fields.confirmPassword) {
      setError('Passwords do not match.'); return
    }
    if (fields.password.length < 8) {
      setError('Password must be at least 8 characters.'); return
    }
    setLoading(true)
    setTimeout(() => { setLoading(false); setStage('verify') }, 1000)
  }

  // ── OTP verify ────────────────────────────────────────────────────────────
  const handleVerify = (e) => {
    e.preventDefault()
    if (verifyCode.length < 4) { setError('Enter the verification code.'); return }
    setLoading(true)
    setTimeout(() => {
      updateForm?.({
        firstName: fields.firstName, lastName: fields.lastName,
        mobile: fields.mobile, email: fields.email,
        dob: fields.dob, country: detectedCountry,
      })
      setUser({ name: fields.firstName, email: fields.email })
      redirectAfterAuth()   // ✅ FIXED
    }, 1200)
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Styles
  // ─────────────────────────────────────────────────────────────────────────
  const pageStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(160deg, #f0f4ff 0%, #fafaf7 40%, #fff9ed 100%)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '48px 16px', fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
    position: 'relative',
  }

  const cardStyle = {
    background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(20px)',
    border: '1px solid rgba(226,232,240,0.8)',
    borderRadius: '20px', padding: '36px',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.04), 0 20px 60px -10px rgba(15,23,42,0.10)',
  }

  const googleBtnStyle = {
    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
    gap: '10px', padding: '12px', background: '#fff',
    border: '1.5px solid #e2e8f0', borderRadius: '12px', cursor: 'pointer',
    fontSize: '13px', fontWeight: 600, color: '#1e293b', fontFamily: 'inherit',
    transition: 'all 0.2s', marginBottom: '20px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
  }

  const submitBtnStyle = {
    width: '100%', padding: '13px', borderRadius: '12px', border: 'none',
    background: loading ? '#64748b' : 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    color: '#fff', fontSize: '13px', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
    fontFamily: 'inherit', letterSpacing: '0.04em', textTransform: 'uppercase',
    transition: 'all 0.2s', boxShadow: loading ? 'none' : '0 4px 14px rgba(15,23,42,0.25)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
  }

  const dividerStyle = {
    display: 'flex', alignItems: 'center', gap: '12px', margin: '20px 0',
    color: '#94a3b8', fontSize: '11px', fontWeight: 600,
    textTransform: 'uppercase', letterSpacing: '0.08em',
  }

  const getFocusStyle = (name) => focusedField === name
    ? { borderColor: '#d4af37', background: '#fff', boxShadow: '0 0 0 3px rgba(212,175,55,0.1)' }
    : {}

  // ─────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap');
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50%       { transform: translateY(-20px) scale(1.03); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .auth-card { animation: fadeSlideUp 0.5s ease both; }
        .auth-input:focus {
          border-color: #d4af37 !important;
          background: #fff !important;
          box-shadow: 0 0 0 3px rgba(212,175,55,0.1) !important;
          outline: none;
        }
        .google-btn:hover { background: #f8fafc !important; border-color: #cbd5e1 !important; }
        .submit-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, #1e293b 0%, #334155 100%) !important;
          box-shadow: 0 6px 20px rgba(15,23,42,0.35) !important;
          transform: translateY(-1px);
        }
        .toggle-link { color: #0f172a; font-weight: 700; cursor: pointer; text-decoration: none; }
        .toggle-link:hover { text-decoration: underline; }
        .back-btn:hover { color: #0f172a; }
        .otp-input { text-align: center; font-size: 28px; letter-spacing: 0.3em; font-weight: 700; font-family: 'DM Serif Display', serif; }
        .mode-indicator { display: inline-flex; align-items: center; gap: 6px; background: rgba(212,175,55,0.12); border: 1px solid rgba(212,175,55,0.3); border-radius: 100px; padding: 4px 12px; margin-bottom: 16px; }
        .spinner { width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: spin 0.7s linear infinite; }
      `}</style>

      <div style={pageStyle}>
        <BackgroundOrbs/>

        {/* Back button */}
        <button
          className="back-btn"
          onClick={() => navigate('/')}
          style={{
            position: 'fixed', top: '20px', left: '20px',
            display: 'flex', alignItems: 'center', gap: '6px',
            fontSize: '13px', color: '#64748b', background: 'rgba(255,255,255,0.8)',
            border: '1px solid #e2e8f0', borderRadius: '10px', padding: '8px 14px',
            cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600,
            backdropFilter: 'blur(8px)', transition: 'color 0.2s',
          }}
        >
          <ArrowLeft size={14}/> Back
        </button>

        <div className="auth-card" style={{ width: '100%', maxWidth: '440px' }}>

          {/* Logo + heading */}
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{ marginBottom: '16px' }}>
              {/* Inline logo mark if Logo component not available */}
              <span style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: '22px', fontWeight: 400, color: '#0f172a',
                letterSpacing: '-0.02em',
              }}>
                Global<span style={{ color: '#d4af37' }}>Pathways</span>
              </span>
            </div>

            {careerMode && (
              <div className="mode-indicator">
                {careerMode === 'employer'
                  ? <Globe size={11} style={{ color: '#b8962e' }}/>
                  : <Briefcase size={11} style={{ color: '#b8962e' }}/>
                }
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#b8962e', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  {careerMode === 'employer' ? 'Employer Portal' : 'Job Seeker'}
                </span>
              </div>
            )}

            <h1 style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: stage === 'verify' ? '26px' : '30px',
              fontWeight: 400, color: '#0f172a', marginBottom: '6px',
              letterSpacing: '-0.02em', lineHeight: 1.2,
            }}>
              {stage === 'verify'
                ? 'Check your inbox'
                : mode === 'login'
                  ? 'Welcome back'
                  : 'Create account'
              }
            </h1>
            <p style={{ fontSize: '13px', color: '#64748b', fontFamily: 'inherit', lineHeight: 1.5 }}>
              {stage === 'verify'
                ? <>We sent a code to <strong style={{ color: '#0f172a' }}>{fields.email}</strong></>
                : mode === 'login'
                  ? 'Sign in to continue your journey'
                  : 'Start finding your best path forward'
              }
            </p>
          </div>

          <div style={cardStyle}>

            {/* ── Verify stage ──────────────────────────────────────────── */}
            {stage === 'verify' ? (
              <form onSubmit={handleVerify}>
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                  <div style={{
                    width: '64px', height: '64px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #f0f4ff, #fff9ed)',
                    border: '1.5px solid #e2e8f0',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 16px',
                  }}>
                    <Mail size={26} style={{ color: '#0f172a' }}/>
                  </div>
                  <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.6, fontFamily: 'inherit' }}>
                    Enter the 6-digit OTP sent to your mobile or click the link in your email.
                  </p>
                </div>

                <Field label="Verification Code" required>
                  <input
                    className="auth-input otp-input"
                    style={{ ...inputStyle(false), textAlign: 'center', fontSize: '28px', letterSpacing: '0.3em', fontFamily: "'DM Serif Display', serif" }}
                    placeholder="· · · · · ·"
                    maxLength={6}
                    value={verifyCode}
                    onChange={e => { setVerifyCode(e.target.value.replace(/\D/g, '')); setError('') }}
                  />
                </Field>

                {error && <ErrorBanner msg={error}/>}

                <button type="submit" disabled={loading} className="submit-btn" style={submitBtnStyle}>
                  {loading ? <><div className="spinner"/> Verifying…</> : <>Verify & Continue <ArrowRight size={14}/></>}
                </button>

                <button type="button" onClick={() => setStage('form')}
                  style={{ width: '100%', textAlign: 'center', fontSize: '12px', color: '#94a3b8', marginTop: '12px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                  ← Back to sign up
                </button>
              </form>

            ) : (
              <>
                {/* ── Intent banner ───────────────────────────────────── */}
                <IntentBanner careerMode={careerMode}/>

                {/* ── Google button ───────────────────────────────────── */}
                <button
                  type="button"
                  onClick={handleGoogleAuth}
                  disabled={loading}
                  className="google-btn"
                  style={googleBtnStyle}
                >
                  <GoogleIcon/>
                  Continue with Google
                </button>

                {/* ── Divider ─────────────────────────────────────────── */}
                <div style={dividerStyle}>
                  <div style={{ flex: 1, height: '1px', background: '#f1f5f9' }}/>
                  or
                  <div style={{ flex: 1, height: '1px', background: '#f1f5f9' }}/>
                </div>

                {/* ── Form ────────────────────────────────────────────── */}
                <form onSubmit={handleSubmit}>

                  {mode === 'signup' && (
                    <>
                      {/* Name row */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <Field label="First Name" required>
                          <input
                            className="auth-input"
                            style={{ ...inputStyle(true) }}
                            placeholder="Aarav"
                            value={fields.firstName}
                            onChange={e => set('firstName', e.target.value)}
                          />
                          <User size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }}/>
                        </Field>
                        <Field label="Last Name" required>
                          <input
                            className="auth-input"
                            style={inputStyle()}
                            placeholder="Sharma"
                            value={fields.lastName}
                            onChange={e => set('lastName', e.target.value)}
                          />
                        </Field>
                      </div>

                      {/* Mobile */}
                      <Field label="Mobile Number" required
                        hint={<>
                          <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', marginRight: '5px', verticalAlign: 'middle' }}/>
                          Auto-detected: <strong>{detectedCountry}</strong>
                        </>}
                      >
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <select
                            className="auth-input"
                            style={{ ...inputStyle(), width: '100px', flexShrink: 0, paddingRight: '6px' }}
                            value={fields.countryCode}
                            onChange={e => set('countryCode', e.target.value)}
                          >
                            {COUNTRY_CODES.map(c => (
                              <option key={c.country + c.code} value={c.code}>{c.code} {c.country}</option>
                            ))}
                          </select>
                          <div style={{ position: 'relative', flex: 1 }}>
                            <Phone size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }}/>
                            <input
                              className="auth-input"
                              style={inputStyle(true)}
                              placeholder="9876543210"
                              type="tel"
                              value={fields.mobile}
                              onChange={e => set('mobile', e.target.value)}
                            />
                          </div>
                        </div>
                      </Field>

                      {/* DOB */}
                      <Field label="Date of Birth" required>
                        <Calendar size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }}/>
                        <input
                          className="auth-input"
                          style={inputStyle(true)}
                          type="date"
                          value={fields.dob}
                          onChange={e => set('dob', e.target.value)}
                        />
                      </Field>
                    </>
                  )}

                  {/* Email */}
                  <Field label="Email" required>
                    <Mail size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }}/>
                    <input
                      className="auth-input"
                      style={inputStyle(true)}
                      type="email"
                      placeholder="you@email.com"
                      value={fields.email}
                      onChange={e => set('email', e.target.value)}
                    />
                  </Field>

                  {/* Password */}
                  <Field label="Password" required>
                    <input
                      className="auth-input"
                      style={{ ...inputStyle(false, { paddingRight: '44px' }) }}
                      type={showPass ? 'text' : 'password'}
                      placeholder={mode === 'signup' ? 'Min 8 characters' : 'Enter password'}
                      value={fields.password}
                      onChange={e => set('password', e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: 0 }}
                    >
                      {showPass ? <EyeOff size={15}/> : <Eye size={15}/>}
                    </button>
                  </Field>

                  {mode === 'signup' && (
                    <Field label="Confirm Password" required>
                      <input
                        className="auth-input"
                        style={{ ...inputStyle(false, { paddingRight: '44px' }) }}
                        type={showConfirm ? 'text' : 'password'}
                        placeholder="Re-enter password"
                        value={fields.confirmPassword}
                        onChange={e => set('confirmPassword', e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: 0 }}
                      >
                        {showConfirm ? <EyeOff size={15}/> : <Eye size={15}/>}
                      </button>
                    </Field>
                  )}

                  {mode === 'login' && (
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px', marginTop: '-8px' }}>
                      <button type="button" style={{ fontSize: '12px', color: '#64748b', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600 }}>
                        Forgot password?
                      </button>
                    </div>
                  )}

                  {error && <ErrorBanner msg={error}/>}

                  <button type="submit" disabled={loading} className="submit-btn" style={{ ...submitBtnStyle, marginTop: '4px' }}>
                    {loading
                      ? <><div className="spinner"/> Please wait…</>
                      : mode === 'login'
                        ? <>Sign In <ArrowRight size={14}/></>
                        : <>Create Account <ArrowRight size={14}/></>
                    }
                  </button>
                </form>

                {/* Toggle */}
                <p style={{ textAlign: 'center', fontSize: '12px', color: '#94a3b8', marginTop: '20px', fontFamily: 'inherit' }}>
                  {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                  <span
                    className="toggle-link"
                    onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError('') }}
                  >
                    {mode === 'login' ? 'Sign up' : 'Log in'}
                  </span>
                </p>
              </>
            )}
          </div>

          {/* Legal */}
          <p style={{ textAlign: 'center', fontSize: '11px', color: '#cbd5e1', marginTop: '20px', fontFamily: 'inherit', lineHeight: 1.6 }}>
            By continuing, you agree to our{' '}
            <a href="#" style={{ color: '#94a3b8', textDecoration: 'underline' }}>Terms</a>
            {' '}and{' '}
            <a href="#" style={{ color: '#94a3b8', textDecoration: 'underline' }}>Privacy Policy</a>.
          </p>
        </div>
      </div>
    </>
  )
}

// ─── Error banner ─────────────────────────────────────────────────────────────
function ErrorBanner({ msg }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '8px',
      background: '#fef2f2', border: '1px solid #fecaca',
      borderRadius: '10px', padding: '10px 14px', marginBottom: '16px',
    }}>
      <AlertCircle size={14} style={{ color: '#ef4444', flexShrink: 0 }}/>
      <p style={{ fontSize: '12px', color: '#b91c1c', fontFamily: 'inherit' }}>{msg}</p>
    </div>
  )
}