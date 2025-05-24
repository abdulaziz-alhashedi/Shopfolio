# 🛍️ Shopfolio – E-commerce Demo (Next.js + Firebase)

**Shopfolio** is a modern, bilingual (English & Arabic) e-commerce demo built using **Next.js**, **Firebase**, and **TailwindCSS**.  
It showcases frontend skills, design practices, and internationalization — designed as a portfolio piece to demonstrate readiness for roles in the Gulf tech market.

---

## 🚀 Features

- 🔐 Firebase Authentication (Google & Email with OTP)
- 🔄 Dynamic language switching (English / Arabic) with full RTL support
- 🌗 Light / Dark mode toggle (saved in Firestore and localStorage)
- 🛒 Product listing & details using `https://dummyjson.com/products`
- ❤️ Favorite products (user-specific, stored in Firestore)
- 🎨 Fully responsive UI with TailwindCSS
- 🧠 Global state management with Zustand
- 🌍 Dynamic translation with `next-i18next`
- ⚡ Optimized for performance (SSR + SPA mixed strategy)

---

## 🧱 Tech Stack

- [Next.js 15 (App Router)](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Firebase (Auth + Firestore)](https://firebase.google.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [next-i18next](https://github.com/i18next/next-i18next)
- [Zustand](https://github.com/pmndrs/zustand)
- [Axios](https://axios-http.com/)

---

## 📁 Project Structure

```
/app → App Router pages
/components → Reusable UI components
/hooks → Custom React hooks
/store → Zustand global state
/lib → Firebase config, API clients
/public/locales → i18n translation files (en/ar)
```

---

## 🔧 Setup Instructions

1. **Clone this repo**
2. Run `npm install`
3. Add your `.env.local` with Firebase config and API base URL
4. Run `npm run dev`

---

## 🗂 Firestore Schema (users collection)

```json
{
  "uid": "string",
  "email": "string",
  "name": "string",
  "preferredLanguage": "ar" | "en",
  "theme": "light" | "dark",
  "favorites": ["productId"],
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}


```

📦 Status
✅ MVP in progress
🚫 No real payment or checkout (demo-only)

📄 License
MIT – Free to use for learning and portfolios.

👨‍💻 Author
Made with ❤️ by [Your Name] – Frontend Developer targeting Gulf market opportunities.

---

Let me know if you'd like this exported as a file (`README.md`) or inserted into a repo for you!
