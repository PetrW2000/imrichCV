# MASTER PROJECT SPECIFICATION: AI Career Hub (The "Pro" MVP)

## 1. Role & Objective
You are an **Expert Full-Stack Engineer and UI/UX Designer**.
Your goal is to build a high-end, production-ready MVP for a monetized "Career Hub" application.

**The Core Product:** An interactive **CV Builder** where users select a visual template first, fill in mandatory data (split-screen view), and watch their CV build itself in real-time. The app also includes AI Cover Letter generation and LinkedIn Auditing.

**Monetization (Strict):** The system operates on a **Credit-Based Economy**. High-value AI actions are gated. No credits = No generation.

### Core Tech Stack
- **Framework:** Next.js 14+ (App Router, TypeScript).
- **Styling:** Tailwind CSS + Shadcn/UI (Components) + Lucide Icons.
- **Animations:** Framer Motion (Premium feel).
- **State Management:** Zustand (Complex form state).
- **Backend/Auth:** Supabase (Auth + PostgreSQL + RLS).
- **AI Integration:** OpenAI API (GPT-4o via Vercel AI SDK).
- **PDF Engine:** `react-to-print` (Export) & `pdf-parse` (Import).

---

## 2. Design System & UX
The design must be **Ultra-Modern, Clean, and "Bento-Grid" style** (inspired by Linear.app or Raycast).
- **Dark/Light Mode:** Support both, default to a clean, professional look.
- **Feedback:** Use `sonner` (Toasts) for every action (especially credit usage).
- **Layout:**
    - **Dashboard:** Bento Grid showing Profile Score, Credits, and Recent Documents.
    - **Builder:** **Split-Screen**. Left = Data Inputs/Forms. Right = Live A4 Template Preview.

---

## 3. Business Logic & Economy ("The Law")
1.  **Currency:** 1 Credit = 1 CZK (Mock currency for MVP).
2.  **Pricing Tiers (Server-Enforced):**
    - **Magic Text Improvement (Micro-action):** 2 Credits per click.
    - **Cover Letter Generation:** 10 Credits.
    - **Full CV Export / PDF Download:** 50 Credits.
    - **LinkedIn Audit:** Free (Teaser).
3.  **The Gatekeeper:** Users cannot access the Builder or Generators until their **Master Profile** (Base Info) is completed during onboarding.

---

## 4. Database Schema (Supabase SQL)
Create a robust schema handling users, profiles, content, and money.

1.  `profiles`:
    - `id`, `user_id` (FK), `full_name`, `email`, `phone`, `job_title`, `linkedin_url`.
    - `credits` (int, default: 10).
    - `is_onboarding_complete` (bool, default: false).
2.  `experiences`:
    - `id`, `user_id`, `company`, `role`, `start_date`, `end_date`, `description` (text), `is_current`.
3.  `educations`:
    - `id`, `user_id`, `school`, `degree`, `year`.
4.  `documents`:
    - `id`, `user_id`, `type` ('cv', 'cover_letter'), `template_id` (string), `content` (JSON snapshot of data), `created_at`.
5.  `transactions`:
    - `id`, `user_id`, `amount` (e.g., -10, +100), `type` ('deposit', 'usage'), `description` (e.g. "AI Text Improvement"), `created_at`.

---

## 5. Functional Workflow (Step-by-Step)

**Note:** Phases must be implemented sequentially. Complete and test each phase fully before proceeding to the next to ensure stability and proper integration.

### Phase 1: Onboarding & The "Gate"
1.  **Signup:** Email/Password or Google (Supabase Auth).
2.  **Mandatory Form:** If `is_onboarding_complete` is false, redirect to `/onboarding`.
3.  **Data:** User MUST fill: Full Name, Job Title, Email, Phone. This creates the "Master Profile" that is reused everywhere.

### Phase 2: The CV Builder (Core Feature)
This is the heart of the app.

**Step 1: Template Selection**
- User enters the "Builder".
- Display a gallery of 2 high-quality templates:
    - *Template A (Minimalist):* Clean typography, black & white, simple layout.
    - *Template B (Bold):* Accent header, sidebar for skills, modern fonts.
- User clicks "Use This Template".

**Step 2: The Editor (Split View)**
- **Left Panel (Inputs):** Tabs for "Personal", "Experience", "Education", "Skills".
- **Right Panel (Preview):** A live, pixel-perfect React component rendering the selected template with the user's data. It updates instantly as they type.

**Step 3: The "Magic" AI Button (Strict Logic)**
- In the **Experience** section, next to the "Description" textarea, place a button: `✨ AI Enhance (2 Credits)`.
- **Action:** When clicked:
    1.  Check `user.credits >= 2`.
    2.  Deduct 2 credits via Server Action.
    3.  Send current text to OpenAI with prompt: *"Rewrite this job description to be action-oriented, result-driven, and professional. Use strong verbs. (e.g., 'Sold stuff' -> 'Spearheaded sales operations resulting in 20% growth'). Keep it concise."*
    4.  Stream the result back into the textarea.

**Step 4: Export**
- Button "Download PDF (50 Credits)".
- Checks balance -> Deducts 50 credits -> Triggers `react-to-print`.

### Phase 3: AI Features - Cover Letter and LinkedIn Audit
1.  User pastes a **Job Description (JD)**.
2.  Button: "Generate Letter (10 Credits)".
3.  **AI Logic:** Combine [User Master Profile] + [JD Text].
     - *Prompt:* "Write a specific, enthusiastic cover letter connecting this candidate's experience to these job requirements."
4.  Result is editable before download.

#### LinkedIn Audit (Free Teaser)
1.  User provides LinkedIn profile URL.
2.  Button: "Audit Profile (Free)".
3.  **AI Logic:** Analyze profile for completeness, keyword optimization, engagement suggestions.
     - *Prompt:* "Audit this LinkedIn profile for career advancement. Provide a score out of 100 and actionable recommendations."
4.  Display report with Profile Strength score, key insights, and suggestions. Include teaser for premium audit features.

### Phase 4: Wallet System
1.  Top-right corner shows `Wallet: {credits} CZK`.
2.  "Top Up" button opens a modal to simulate payment (add 100 credits).
3.  **Backend Security:** All credit deductions happen in a database transaction (RPC function) to prevent race conditions.

---

## 6. Error Handling and Edge Cases
- **AI API Failures:** If OpenAI request fails (rate limit, timeout), show error toast with "Retry" option. Log errors for monitoring.
- **Insufficient Credits:** Block gated actions, display toast prompting top-up. Redirect to wallet if needed.
- **Network Issues:** Implement offline detection; cache forms locally if possible, sync on reconnect.
- **Validation Errors:** Use Zod for client/server validation; display specific error messages in forms.
- **Authentication Errors:** Handle session expiry with automatic redirect to login.
- **PDF Export Issues:** Fallback to alternative export method if `react-to-print` fails.

---

## 7. Implementation Goals & Definition of Done
1.  **Structure:** Organized code (`@/components`, `@/lib`, `@/actions`). Use Server Actions for all mutations.
2.  **Validation:** Use Zod for all forms.
3.  **Security:** Row Level Security (RLS) enabled on Supabase.
4.  **UX:** The CV Builder must feel "app-like" (no page reloads when typing).
5.  **Completion:**
     - User signs up -> Fills Onboarding.
     - Selects "Bold Template".
     - Adds experience -> Uses "Magic Button" to improve text.
     - Downloads PDF.
     - Wallet balance updates correctly throughout.
6.  **Testing:** Implement unit tests for key components and logic (e.g., credit calculations, form validations). Add integration tests for database interactions and Supabase queries. Include E2E tests for critical user flows (onboarding, CV creation, export).

---

## 8. Deployment and Launch
- **Platform:** Deploy to Vercel for seamless Next.js integration.
- **Environment Variables:** Securely set OPENAI_API_KEY, SUPABASE_URL, SUPABASE_ANON_KEY, NEXT_PUBLIC_SUPABASE_URL.
- **Database Setup:** Enable RLS policies on Supabase; create initial migration for schema.
- **Auth Configuration:** Set up Google OAuth if used.
- **Monitoring:** Integrate Vercel Analytics for usage tracking; add error logging (e.g., Sentry) for production issues.
- **Launch Checklist:** Test all features in production environment, verify credit transactions, ensure mobile responsiveness.

**ACTION:**
Start by setting up the Next.js project, installing dependencies (shadcn, zustand, openai, supabase-js), and writing the SQL migration for the Database Schema including the credit system.