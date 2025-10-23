import { useState } from 'react';
import posthog from 'posthog-js';
import { getUserByEmail } from '../db';

interface WelcomeStepProps {
  onNext: () => void;
  onSignup: () => void;
  setUser: (user: any) => void;
}

export default function WelcomeStep({ onNext, onSignup, setUser }: WelcomeStepProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    posthog.capture('signin_submitted');
    console.log(`SELECT * FROM users WHERE email = ${email}`)
    const user = await getUserByEmail(email)
    console.log(user)
    if (user && user.password === password) {
      setUser(user)
      onNext()
    } else {
      // Handle invalid credentials
      alert('Invalid email or password')
    }
  }
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome Back
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Sign in to continue to your account
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email Address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => posthog.capture('forgot_password_clicked')}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
          >
            Forgot password?
          </button>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-600"
        >
          Sign In
        </button>
      </div>

      <div className="text-center text-sm text-gray-600 dark:text-gray-400">
        Don't have an account?{" "}
        <button
          onClick={() => {
            posthog.capture('welcome_step_signup_clicked');
            onSignup();
          }}
          className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
        >
          Sign up
        </button>
      </div>
    </div>
  );
}
