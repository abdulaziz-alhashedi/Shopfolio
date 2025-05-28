# 🔥 Firebase Setup Guide for Shopfolio

This guide will help you set up Firebase for the Shopfolio project.

## 📋 Prerequisites

- Google account
- Firebase CLI (optional, for deployment)

## 🚀 Step-by-Step Setup

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `shopfolio-demo` (or your preferred name)
4. Enable Google Analytics (optional)
5. Click "Create project"

### 2. Enable Authentication

1. In Firebase Console, go to **Authentication** > **Sign-in method**
2. Enable the following providers:
   - **Google**: Click "Google" > "Enable" > Add your email as test user
   - **Email/Password**: Click "Email/Password" > Enable both options
   - **Email link (passwordless sign-in)**: Enable this option

### 3. Set up Firestore Database

1. Go to **Firestore Database** > **Create database**
2. Choose **Start in test mode** (we'll add security rules later)
3. Select your preferred location (choose closest to your users)
4. Click "Done"

### 4. Deploy Security Rules

1. In Firestore, go to **Rules** tab
2. Replace the default rules with the content from `firestore.rules` file
3. Click "Publish"

### 5. Get Firebase Configuration

1. Go to **Project Settings** (gear icon)
2. Scroll down to "Your apps" section
3. Click "Add app" > Web app icon (`</>`)
4. Enter app nickname: `shopfolio-web`
5. Check "Also set up Firebase Hosting" (optional)
6. Click "Register app"
7. Copy the configuration object

### 6. Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`
2. Fill in the Firebase configuration values:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 7. Test Authentication

1. Start your development server: `pnpm dev`
2. The authentication should now work with:
   - Google Sign-in
   - Email link sign-in

## 🔒 Security Rules Explanation

The `firestore.rules` file contains security rules that:

- Allow users to read/write only their own user document
- Validate the structure of user documents
- Prevent unauthorized access to other users' data
- Ensure required fields are present

## 🧪 Testing

### Test Google Sign-in
1. Click the Google sign-in button
2. Select your Google account
3. Check if user document is created in Firestore

### Test Email Link Sign-in
1. Enter your email address
2. Check your email for the sign-in link
3. Click the link to complete sign-in
4. Check if user document is created in Firestore

## 🚨 Important Notes

- **Never commit `.env.local`** to version control
- The current rules are for development; review them before production
- Consider enabling App Check for additional security
- Set up proper error handling for production use

## 🔧 Optional: Firebase CLI Setup

If you want to deploy rules via CLI:

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init firestore

# Deploy rules
firebase deploy --only firestore:rules
```

## 📚 Next Steps

After completing this setup:

1. ✅ Firebase project created
2. ✅ Authentication enabled (Google + Email Link)
3. ✅ Firestore database set up
4. ✅ Security rules deployed
5. ✅ Environment variables configured

You can now proceed with Step 3: Internationalization setup!
