# Login & Referral Flow App

A modern authentication application built with Next.js featuring user login, signup, and a referral system with shareable codes.

## What This App Does

This is a simple login application that demonstrates a complete user authentication flow with the following features:

- **User Authentication**: Sign in with email and password
- **User Registration**: Create new accounts with referral code support
- **Referral System**:
  - Generate unique referral codes for each user
  - Share codes with friends via URL parameters (`?referral-code=ABC123`)
  - Track referrals during signup
- **Multi-step Flow**: Clean UX with progressive steps from login → success → referral sharing
- **Analytics Tracking**: Track user interactions and conversion funnel

## Tech Stack

### Frontend & Framework
- **[Next.js 16.0.0](https://nextjs.org)** - React framework with App Router architecture
- **[React 19.2.0](https://react.dev)** - UI library
- **[TypeScript](https://www.typescriptlang.org)** - Type-safe development
- **[Tailwind CSS v4](https://tailwindcss.com)** - Utility-first CSS framework

### Backend & Database
- **[Neon Database](https://neon.tech)** - Serverless Postgres for user data persistence
- **[@neondatabase/serverless](https://www.npmjs.com/package/@neondatabase/serverless)** - Neon's serverless driver

### Analytics
- **[PostHog](https://posthog.com)** - Product analytics and event tracking for:
  - Signup/signin events
  - Referral tracking
  - User flow analysis
  - Conversion funnel monitoring

### Deployment
- **[Vercel](https://vercel.com)** - Deployment platform optimized for Next.js

### Development
- **[Claude](https://claude.ai)** - AI assistant used for initial code generation and bulk development work

## Getting Started

### Prerequisites

1. **Environment Variables**: Create a `.env.local` file with:
   ```bash
   DATABASE_URL=your_neon_database_url
   NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
   NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
   ```

2. **Database Setup**: Ensure your Neon database has a `users` table:
   ```sql
   CREATE TABLE users (
     id SERIAL PRIMARY KEY,
     email TEXT UNIQUE NOT NULL,
     password TEXT NOT NULL,
     referral_code TEXT UNIQUE NOT NULL,
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm start` - Run production build
- `npm run lint` - Run ESLint

## Project Structure

```
app/
├── components/          # React components
│   ├── WelcomeStep.tsx  # Login form
│   ├── SignupStep.tsx   # Registration form
│   ├── SuccessStep.tsx  # Success confirmation
│   └── ReferralStep.tsx # Referral code display
├── db.ts               # Database functions
├── utils.ts            # Utility functions (referral code generation)
├── page.tsx            # Main page component
└── layout.tsx          # Root layout
```

## User Flow

1. **Login Path**: Enter email/password → Success screen
2. **Signup Path**: Click "Sign up" → Fill form with optional referral code → Success screen
3. **Referral Path**: Click "Refer a Friend" on success → View/copy unique referral code
4. **Referral Link**: Share URL with code (`?referral-code=ABC123`) → Auto-fills signup form

## Analytics Events

PostHog tracks the following events:
- `signin_submitted` - User attempts login
- `signin_completed` - Successful login
- `signup_initiated` - User starts signup process
- `signup_completed` - User completes signup
- `referral_initiated` - User clicks "Refer a Friend"
- `referral_code_copied` - User copies their referral code
- `forgot_password_clicked` - User clicks forgot password

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Neon Documentation](https://neon.tech/docs)
- [PostHog Documentation](https://posthog.com/docs)

## Deploy on Vercel

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/your-repo)

Make sure to add your environment variables in the Vercel project settings.
