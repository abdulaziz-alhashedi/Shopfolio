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

## ✅ Step 4: Authentication Pages

- [x] Create login page (`app/auth/login/page.tsx`):
  - Google Sign-In button
  - Email field to request magic link (OTP)
- [x] Email link completion page (`app/auth/complete/page.tsx`)
- [x] On login success:
  - Create new user doc in Firestore if not exists
  - Save language and theme preferences
- [x] Add route guard or session provider (`app/components/RouteGuard.tsx`)
- [x] Authentication context provider (`app/components/AuthProvider.tsx`)
- [x] User profile management (`app/profile/page.tsx`)
- [x] User menu component (`app/components/UserMenu.tsx`)
- [x] Protected pages (favorites, settings)
- [x] Language preference sync with Firebase
- [x] Session persistence and redirect handling

---

## ✅ Step 5: Product UI (from dummyjson)

- [x] Fetch product data from `https://dummyjson.com/products`
- [x] Create:
  - Product list page with filters/search (`app/products/page.tsx`)
  - Product details page (`app/products/[id]/page.tsx`)
- [x] Create loading and error states
- [x] Create product store with Zustand (`app/store/productStore.ts`)
- [x] Create product components (`app/components/ProductCard.tsx`)
- [x] Add search functionality (`app/components/ProductSearch.tsx`)
- [x] Add category filtering (`app/components/ProductFilters.tsx`)
- [x] Add favorites toggle (save to Firestore) (`app/hooks/useFavorites.ts`)
- [x] Update favorites page with real product data
- [x] Integrate with authentication and i18n systems

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
