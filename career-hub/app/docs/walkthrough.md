# Walkthrough - Phase 2 Continuation

I have implemented the requested features for Phase 2 of the CV Builder.

## 1. PDF Export Implementation
- **Feature:** Added a "Download PDF" button to the CV Builder header.
- **Logic:**
    - Checks if the user has at least 50 credits.
    - Deducts 50 credits via server action `downloadPdf`.
    - Triggers the browser print dialog using `react-to-print`.
- **Components:**
    - Updated `CVEditor` to include the header and print logic.
    - Created `downloadPdf` server action in `app/builder/actions.ts`.

## 2. Education Form
- **Feature:** Users can now add, edit, and remove education entries.
- **Components:**
    - Created `components/cv-builder/editor/forms/education-form.tsx`.
    - Integrated into `CVEditor` tabs.

## 3. Skills Form
- **Feature:** Users can add skills as tags/badges.
- **Components:**
    - Created `components/cv-builder/editor/forms/skills-form.tsx`.
    - Integrated into `CVEditor` tabs.
    - Updated `CVStore` to include `addSkill` and `removeSkill` actions.

## 4. UI Updates
- **Header:** Moved the header from `BuilderPage` (server) to `CVEditor` (client) to handle client-side print logic and credit updates.
- **Credits:** Real-time credit updates in the UI when downloading PDF (optimistic update).

## Verification
Ran `npm run build` and it completed successfully.

```bash
> career-hub@0.1.0 build
> next build
...
○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
```
