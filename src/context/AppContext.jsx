import React, { createContext, useContext, useState } from 'react'

const AppContext = createContext(null)

export const useApp = () => useContext(AppContext)

export function AppProvider({ children }) {
  const [user, setUser] = useState(null)
  const [step, setStep] = useState(0) // onboarding step
  const [formData, setFormData] = useState({
    // Login/signup
    firstName: '', lastName: '', mobile: '', email: '', dob: '',
    country: '', // auto-detected from phone
    // Resume
    resumeFile: null, resumeParsed: null,
    educationalDetails: { degree: '', institution: '', year: '', field: '' },
    skills: [],
    currentStatus: '',
    // Preferences
    preferredCountries: [],
    preferWorkOrStudy: '',
    financialGoals: '',
    loanCapacity: '',
    financialStatus: '',
    timeAvailability: '',
    riskTolerance: 5,
    workLifeBalance: 5,
    lifestyle: [],
    preferredUniversities: [],
    preferredCareer: '',
    // Priorities
    priorities: [],
  })

  const updateForm = (fields) => setFormData(prev => ({ ...prev, ...fields }))

  return (
    <AppContext.Provider value={{ user, setUser, step, setStep, formData, updateForm }}>
      {children}
    </AppContext.Provider>
  )
}
