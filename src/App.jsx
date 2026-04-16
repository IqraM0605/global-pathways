import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider, useApp } from './context/AppContext'   // 👈 add useApp here
import LandingPage from './pages/LandingPage'
import AuthPage from './pages/AuthPage'
import OnboardingPage from './pages/OnboardingPage'
import DashboardPage from './pages/DashboardPage'
import ResultsPage from './pages/ResultsPage'
import CareersPage from "./pages/CareerPage"

// 👇 Add this component
function ProtectedRoute({ children }) {
  const { user } = useApp()
  return user ? children : <Navigate to="/auth?mode=login" replace />
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/careers" element={             // 👇 wrap this
            <ProtectedRoute>
              <CareersPage />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}