import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import Logo from '../components/Logo'
import { Eye, EyeOff, ArrowLeft, Mail, Phone, User, Calendar, CheckCircle2, AlertCircle } from 'lucide-react'

// Country codes list (sample)
const COUNTRY_CODES = [
  { code: '+91', country: 'IN', name: 'India' },
  { code: '+1', country: 'US', name: 'United States' },
  { code: '+44', country: 'GB', name: 'United Kingdom' },
  { code: '+61', country: 'AU', name: 'Australia' },
  { code: '+49', country: 'DE', name: 'Germany' },
  { code: '+33', country: 'FR', name: 'France' },
  { code: '+1', country: 'CA', name: 'Canada' },
  { code: '+971', country: 'AE', name: 'UAE' },
  { code: '+65', country: 'SG', name: 'Singapore' },
  { code: '+81', country: 'JP', name: 'Japan' },
]

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" />
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853" />
      <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335" />
    </svg>
  )
}

export default function AuthPage() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const { setUser, updateForm } = useApp()

  const redirectTo = params.get('redirect') || null
  const [mode, setMode] = useState(params.get('mode') === 'signup' ? 'signup' : 'login')
  const [stage, setStage] = useState('form') // 'form' | 'verify'
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [fields, setFields] = useState({
    firstName: '', lastName: '', mobile: '', countryCode: '+91',
    email: '', dob: '', password: '', confirmPassword: '',
  })
  const [verifyCode, setVerifyCode] = useState('')
  const [detectedCountry, setDetectedCountry] = useState('India')

  // Auto-detect location on load
  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if (data && data.country_calling_code) {
          set('countryCode', data.country_calling_code);
          const found = COUNTRY_CODES.find(c => c.code === data.country_calling_code);
          if (found) setDetectedCountry(found.name);
          else if (data.country_name) setDetectedCountry(data.country_name);
        }
      })
      .catch(err => console.error('Failed to detect location:', err));
  }, []);

  // Update country name when code changes
  useEffect(() => {
    const found = COUNTRY_CODES.find(c => c.code === fields.countryCode)
    if (found) setDetectedCountry(found.name)
  }, [fields.countryCode])

  const set = (k, v) => {
    setFields(prev => ({ ...prev, [k]: v }))
    setError('')
  }

  const handleGoogleAuth = () => {
    // Static demo: simulate Google auth
    setLoading(true)
    setTimeout(() => {
      setUser({ name: 'Demo User', email: 'demo@gmail.com' })
      navigate(redirectTo || '/onboarding')
    }, 1500)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (mode === 'login') {
      if (!fields.email || !fields.password) { setError('Please fill all fields.'); return }
      setLoading(true)
      setTimeout(() => {
        setUser({ name: 'User', email: fields.email })
        navigate(redirectTo || '/onboarding')
      }, 1200)
      return
    }

    // Signup validation
    if (!fields.firstName || !fields.lastName || !fields.email || !fields.mobile || !fields.dob) {
      setError('Please fill all required fields.')
      return
    }
    if (fields.password !== fields.confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (fields.password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStage('verify')
    }, 1000)
  }

  const handleVerify = (e) => {
    e.preventDefault()
    if (verifyCode.length < 4) { setError('Enter the verification code.'); return }
    setLoading(true)
    setTimeout(() => {
      updateForm({
        firstName: fields.firstName, lastName: fields.lastName,
        mobile: fields.mobile, email: fields.email,
        dob: fields.dob, country: detectedCountry,
      })
      setUser({ name: fields.firstName, email: fields.email })
      navigate(redirectTo || '/onboarding')
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      {/* Back button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 flex items-center gap-2 text-sm text-navy-600 hover:text-navy-900 transition-colors font-body"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <Logo size="lg" />
          </div>
          <h2 className="font-display text-2xl font-bold text-navy-900">
            {stage === 'verify' ? 'Verify your email' : mode === 'login' ? 'Welcome back' : 'Create your account'}
          </h2>
          <p className="text-sm text-navy-500 mt-1 font-body">
            {stage === 'verify'
              ? `We sent a verification link to ${fields.email}`
              : mode === 'login' ? 'Log in to continue your journey' : 'Start finding your best pathway'}
          </p>
        </div>

        <div className="card p-8">
          {stage === 'verify' ? (
            /* Verification stage */
            <form onSubmit={handleVerify} className="stagger">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-navy-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail size={28} className="text-navy-700" />
                </div>
                <p className="text-sm text-navy-600 font-body">
                  Check your inbox at <strong>{fields.email}</strong> for the verification link, or enter the OTP sent to your mobile.
                </p>
              </div>
              <div className="mb-4">
                <label className="block text-xs font-semibold text-navy-700 mb-1.5 font-body">Verification Code</label>
                <input
                  type="text"
                  className="input-field text-center text-2xl tracking-widest font-display"
                  placeholder="- - - - - -"
                  maxLength={6}
                  value={verifyCode}
                  onChange={e => setVerifyCode(e.target.value.replace(/\D/g, ''))}
                />
              </div>
              {error && <p className="text-red-500 text-xs mb-4 flex items-center gap-1"><AlertCircle size={14} />{error}</p>}
              <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 text-sm">
                {loading ? 'Verifying...' : 'Verify & Continue'}
              </button>
              <button type="button" onClick={() => setStage('form')} className="w-full text-center text-xs text-navy-400 mt-3 hover:text-navy-700 transition-colors font-body">
                ← Back to sign up
              </button>
            </form>
          ) : (
            <>
              {/* Google auth */}
              <button
                type="button"
                onClick={handleGoogleAuth}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 border-2 border-gray-200 rounded-xl py-3 text-sm font-semibold text-navy-800 hover:bg-gray-50 transition-all font-body mb-5"
              >
                <GoogleIcon />
                Continue with Google
              </button>

              <div className="relative mb-5">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
                <div className="relative flex justify-center"><span className="bg-white px-3 text-xs text-gray-400 font-body">or continue with email</span></div>
              </div>

              <form onSubmit={handleSubmit} className="stagger">
                {/* Signup fields */}
                {mode === 'signup' && (
                  <>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-xs font-semibold text-navy-700 mb-1.5 font-body">First Name *</label>
                        <div className="relative">
                          <User size={14} className="absolute left-3 top-3.5 text-gray-400" />
                          <input className="input-field pl-8" placeholder="Aarav" value={fields.firstName} onChange={e => set('firstName', e.target.value)} />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-navy-700 mb-1.5 font-body">Last Name *</label>
                        <input className="input-field" placeholder="Sharma" value={fields.lastName} onChange={e => set('lastName', e.target.value)} />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="block text-xs font-semibold text-navy-700 mb-1.5 font-body">Mobile Number *</label>
                      <div className="flex gap-2">
                        <select
                          className="input-field w-28 flex-shrink-0"
                          value={fields.countryCode}
                          onChange={e => set('countryCode', e.target.value)}
                        >
                          {COUNTRY_CODES.map(c => (
                            <option key={c.country + c.code} value={c.code}>{c.code} {c.country}</option>
                          ))}
                        </select>
                        <div className="relative flex-1">
                          <Phone size={14} className="absolute left-3 top-3.5 text-gray-400" />
                          <input className="input-field pl-8" placeholder="9876543210" value={fields.mobile} onChange={e => set('mobile', e.target.value)} type="tel" />
                        </div>
                      </div>
                      <p className="text-xs text-navy-400 mt-1 font-body flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block"></span>
                        Auto-detected country: <strong>{detectedCountry}</strong>
                      </p>
                    </div>

                    <div className="mb-3">
                      <label className="block text-xs font-semibold text-navy-700 mb-1.5 font-body">Date of Birth *</label>
                      <div className="relative">
                        <Calendar size={14} className="absolute left-3 top-3.5 text-gray-400" />
                        <input className="input-field pl-8" type="date" value={fields.dob} onChange={e => set('dob', e.target.value)} />
                      </div>
                    </div>
                  </>
                )}

                {/* Email */}
                <div className="mb-3">
                  <label className="block text-xs font-semibold text-navy-700 mb-1.5 font-body">Email *</label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3 top-3.5 text-gray-400" />
                    <input className="input-field pl-8" type="email" placeholder="you@email.com" value={fields.email} onChange={e => set('email', e.target.value)} />
                  </div>
                </div>

                {/* Password */}
                <div className={`mb-${mode === 'signup' ? '3' : '5'}`}>
                  <label className="block text-xs font-semibold text-navy-700 mb-1.5 font-body">Password *</label>
                  <div className="relative">
                    <input
                      className="input-field pr-10"
                      type={showPass ? 'text' : 'password'}
                      placeholder="Min 8 characters"
                      value={fields.password}
                      onChange={e => set('password', e.target.value)}
                    />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-3.5 text-gray-400 hover:text-navy-700">
                      {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {mode === 'signup' && (
                  <div className="mb-5">
                    <label className="block text-xs font-semibold text-navy-700 mb-1.5 font-body">Confirm Password *</label>
                    <input
                      className="input-field"
                      type="password"
                      placeholder="Re-enter password"
                      value={fields.confirmPassword}
                      onChange={e => set('confirmPassword', e.target.value)}
                    />
                  </div>
                )}

                {mode === 'login' && (
                  <div className="flex justify-end mb-4">
                    <button type="button" className="text-xs text-navy-500 hover:text-navy-800 font-body transition-colors">Forgot password?</button>
                  </div>
                )}

                {error && (
                  <div className="mb-4 flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                    <AlertCircle size={14} className="text-red-500 flex-shrink-0" />
                    <p className="text-xs text-red-600 font-body">{error}</p>
                  </div>
                )}

                <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 text-sm">
                  {loading ? 'Please wait...' : mode === 'login' ? 'Log In' : 'Create Account'}
                </button>
              </form>

              {/* Toggle mode */}
              <p className="text-center text-xs text-navy-500 mt-5 font-body">
                {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError('') }}
                  className="text-navy-800 font-semibold hover:underline"
                >
                  {mode === 'login' ? 'Sign up' : 'Log in'}
                </button>
              </p>
            </>
          )}
        </div>

        <p className="text-center text-xs text-gray-400 mt-6 font-body">
          By continuing, you agree to our <a href="#" className="underline">Terms</a> and <a href="#" className="underline">Privacy Policy</a>.
        </p>
      </div>
    </div>
  )
}
