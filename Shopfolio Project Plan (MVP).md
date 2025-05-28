# 📋 Shopfolio Project Plan (MVP)

This plan breaks down the development of the Shopfolio e-commerce app into **8 focused steps**, each with clear tasks.

---

## ✅ Step 1: Project Initialization

- [ ] Create Next.js 15 app using TypeScript and App Router
- [ ] Install required packages:
  - `firebase`, `zustand`, `next-i18next`, `i18next`, `tailwindcss`, `axios`
- [ ] Set up ESLint and Prettier
- [ ] Initialize TailwindCSS with RTL support
- [ ] Set up basic folder structure:
  - `/app`, `/components`, `/store`, `/lib`, `/hooks`, `/public/locales`

---

## ✅ Step 2: Firebase Integration

- [x] Create Firebase project (see FIREBASE_SETUP.md)
- [x] Enable:
  - Google Sign-in
  - Email/Password with OTP (Email Link)
- [x] Add Firebase SDK config (`app/lib/firebase.ts`)
- [x] Create auth listener (`app/hooks/useAuth.ts`)
- [x] Set up Firestore and write security rules (`firestore.rules`)
- [x] Define user document schema (`app/lib/types.ts`)
- [x] Create Firestore utilities (`app/lib/firestore.ts`)
- [x] Create API client (`app/lib/api.ts`)
- [x] Environment variables template (`.env.local.example`)

---

## ✅ Step 3: Internationalization (i18n)

- [x] Configure `next-i18next.config.js`
- [x] Add `en.json` and `ar.json` translation files
- [x] Build language switcher component (`app/components/LanguageSwitcher.tsx`)
- [x] Store language preference in localStorage and Zustand store
- [x] Enable automatic RTL switching for Arabic
- [x] Create i18n utilities and hooks (`app/lib/i18n.ts`, `app/hooks/useTranslation.ts`)
- [x] Create i18n provider and wrapper components
- [x] Update layout for dynamic language support
- [x] Install additional i18n dependencies

---

## 🔓 Step 4: Authentication Pages

- [ ] Create login page:
  - Google Sign-In button
  - Email field to request magic link (OTP)
- [ ] On login success:
  - Create new user doc in Firestore if not exists
  - Save language and theme preferences
- [ ] Add route guard or session provider

---

## 🛍️ Step 5: Product UI (from dummyjson)

- [ ] Fetch product data from `https://dummyjson.com/products`
- [ ] Create:
  - Product list page with filters/search
  - Product details page
- [ ] Create loading and error states

---

## ❤️ Step 6: User Preferences

- [ ] Theme toggle (light/dark)
- [ ] Favorites feature (save/remove product ID in Firestore)
- [ ] Settings page:
  - Language selector
  - Theme selector
- [ ] Sync preferences with Firestore

---

## 📱 Step 7: Responsiveness & Performance

- [ ] Optimize layout for mobile/tablet
- [ ] Use `next/image` where needed
- [ ] Enable SSR for product detail page
- [ ] Use dynamic imports and lazy loading

---

## 🚀 Step 8: Deployment

- [ ] Configure `.env.local` with Firebase and API keys
- [ ] Deploy to Vercel (connect GitHub repo)
- [ ] Add custom domain (optional)
- [ ] Verify performance with Lighthouse

---

## 🎯 BONUS (after MVP)

- [ ] Add onboarding experience (first time user tour)
- [ ] Add E2E testing with Playwright or Cypress
- [ ] Integrate analytics or error tracking (e.g. LogRocket)
