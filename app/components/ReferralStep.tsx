"use client";

import { useState, useEffect } from "react";
import posthog from 'posthog-js';

interface ReferralStepProps {
  onBack: () => void;
  onReset: () => void;
  referralCode: string;
}

export default function ReferralStep({ onBack, onReset, referralCode }: ReferralStepProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    posthog.capture('referral_code_copied', { referral_code: referralCode });
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
          <svg
            className="h-8 w-8 text-purple-600 dark:text-purple-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Refer a Friend
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Share your unique referral code with friends
        </p>
      </div>

      <div className="space-y-4">
        <div className="rounded-lg bg-gradient-to-r from-purple-50 to-indigo-50 p-6 dark:from-purple-900/20 dark:to-indigo-900/20">
          <p className="mb-2 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
            Your Referral Code
          </p>
          <div className="mb-4 text-center">
            <span className="text-4xl font-bold tracking-wider text-purple-600 dark:text-purple-400">
              {referralCode}
            </span>
          </div>
          <button
            onClick={handleCopy}
            className="w-full rounded-lg border border-purple-300 bg-white py-2 text-sm font-semibold text-purple-600 transition-colors hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:border-purple-600 dark:bg-gray-800 dark:text-purple-400 dark:hover:bg-gray-700"
          >
            {copied ? "Copied!" : "Copy Code"}
          </button>
        </div>

        <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Share this code with your friends so they can sign up and enjoy the
            benefits of our platform!
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <button
            onClick={onBack}
            className="w-full rounded-lg border border-gray-300 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Back
          </button>
          <button
            onClick={() => {
              posthog.capture('referral_flow_completed');
              onReset();
            }}
            className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
