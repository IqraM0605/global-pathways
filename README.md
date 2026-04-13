# 🌐 GlobalPathways AI

**Career & Life Decision Platform** — Helps users decide whether to Stay Local or Move Abroad based on their profile, finances, and priorities.

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+ (v22 recommended)
- npm v9+

### Install & Run
```bash
npm install
npm run dev
```
Open: http://localhost:5173

### Build for Production
```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── App.jsx                  # Root with React Router
├── main.jsx                 # Entry point
├── index.css                # Tailwind + custom styles
├── context/
│   └── AppContext.jsx        # Global state (user, formData, step)
├── components/
│   ├── Logo.jsx             # Brand logo
│   └── Navbar.jsx           # Landing page navbar
└── pages/
    ├── LandingPage.jsx       # Public homepage
    ├── AuthPage.jsx          # Login + Signup + Email Verification
    ├── OnboardingPage.jsx    # 8-step data collection form
    ├── DashboardPage.jsx     # Main app shell (sidebar + sub-pages)
    ├── ProfilePage.jsx       # Editable user profile
    └── ResultsPage.jsx       # Top 3 pathway results
```

---

## 🗺 Pages & Flow

```
Landing (/)
  └── Auth (/auth?mode=signup | login)
        └── Email Verification
              └── Onboarding (/onboarding)   ← 8-step form
                    └── Results (/results)
                          └── Dashboard (/dashboard)
                                ├── Home
                                ├── My Profile
                                ├── My Pathways
                                └── Settings
```

---

## 🎨 Design System

| Token       | Value         | Usage                     |
|-------------|---------------|---------------------------|
| `navy-900`  | `#0a1a42`     | Primary text, buttons     |
| `navy-800`  | `#0f265a`     | CTAs, sidebar active      |
| `gold-400`  | `#f5a623`     | Accents, top pick badge   |
| White       | `#ffffff`     | Backgrounds               |
| Gray-50     | `#f9fafb`     | Page backgrounds          |

**Fonts:**
- Display: `Sora` (headings)
- Body: `DM Sans` (text, labels)

---

## 📋 Onboarding Steps

| Step | Section        | Key Inputs |
|------|----------------|------------|
| 1    | Resume         | Upload + auto-parse (editable) |
| 2    | Education      | Degree, field, institution, status, skills |
| 3    | Career         | Direction, work/study, timeline, universities |
| 4    | Financial      | Goals, status, loan capacity, risk tolerance |
| 5    | Lifestyle      | Work-life balance, lifestyle preferences |
| 6    | Preferences    | Countries (up to 5), notes |
| 7    | Priorities     | Choose 3–5 from 8 options |
| 8    | Review         | Editable summary before submit |

---

## 📊 Output Logic (static demo — replace with backend)

### 8 Options Evaluated:
**Stay Local:**
1. Study + Current Career
2. Current Career only
3. Study + New Career (transferable skills)
4. New Career (transferable skills)

**Move Abroad:**
5. Study + Current Career
6. Current Career only
7. Study + New Career (transferable skills)
8. New Career (transferable skills)

### Output:
- Top 3 paths (can mix categories)
- Each with: match %, ROI, NPV, timeline, cost
- Lifestyle metrics: happiness index, safety, work-life balance
- 3 alternative countries/paths per result
- Future path suggestion (for Stay Local results)

---

## 🔧 Backend Integration Points

Replace static data in:
- `ResultsPage.jsx` → `RESULTS` array
- `DashboardPage.jsx` → Pathways data
- `AuthPage.jsx` → `handleSubmit`, `handleGoogleAuth`, `handleVerify`
- `OnboardingPage.jsx` → `handleResumeUpload` (resume parser API)

### Auth (to integrate):
- Google OAuth: Replace `handleGoogleAuth` with real OAuth flow
- Email verification: Replace OTP simulation with real email service
- Phone OTP: Add SMS API (Twilio, MSG91, etc.)

### API shape expected:
```js
POST /api/auth/signup      → { token, user }
POST /api/auth/verify      → { verified: true }
POST /api/resume/parse     → { skills, education, status }
POST /api/pathways/analyse → { results: [{ rank, category, ... }] }
```

---

## 🌐 Environment Variables (for backend)

Create `.env`:
```
VITE_API_URL=http://localhost:3001
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
```

---

## 📦 Dependencies

| Package          | Purpose                  |
|------------------|--------------------------|
| react            | UI framework             |
| react-dom        | DOM rendering            |
| react-router-dom | Client-side routing      |
| lucide-react     | Icons                    |
| tailwindcss      | Utility CSS              |
| vite             | Build tool / dev server  |
