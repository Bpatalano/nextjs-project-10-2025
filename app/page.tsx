"use client";

import { useEffect, useState, use } from "react";
import posthog from 'posthog-js';
import WelcomeStep from "@/app/components/WelcomeStep";
import SignupStep from "@/app/components/SignupStep";
import SuccessStep from "@/app/components/SuccessStep";
import ReferralStep from "@/app/components/ReferralStep";

const REFERRAL_CODE_KEY = 'referral-code';

interface User {
  email: string;
  password: string;
  referral_code: string;
  id: number;
}

export default function Home({
  searchParams,
}: {
  searchParams: Promise<{ [REFERRAL_CODE_KEY]: string | undefined }>
}) {
  const [step, setStep] = useState(1);
  const [referralCode, setReferralCode] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const {[REFERRAL_CODE_KEY]: referralCodeParam} = use(searchParams)
  const handleSignIn = () => {
    posthog.capture('signin_completed');
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleReset = () => {
    posthog.capture('onboarding_flow_reset', { from_step: step });
    setUser(null)
    setStep(1);
  };

  const handleSignup = (referralCodeArg?: string) => {
    posthog.capture('signup_initiated', { referral_code: referralCodeArg });
    setStep(3);
  };

  const handleSignupComplete = () => {
    posthog.capture('signup_completed', { referral_code: referralCode });
    setStep(2);
  };

  const handleReferFriend = () => {
    posthog.capture('referral_initiated');
    setStep(4);
  };

  const handleBackFromReferral = () => {
    setStep(2);
  };

  useEffect(() => {
    if (referralCodeParam) {
      setReferralCode(referralCodeParam);
      handleSignup(referralCodeParam);
    }
  }, [referralCodeParam]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-800">
          {step === 1 && (
            <WelcomeStep onNext={handleSignIn} onSignup={handleSignup} setUser={setUser} />
          )}
          {step === 2 && (
            <SuccessStep
              onReset={handleReset}
              onBack={handleBack}
              onReferFriend={handleReferFriend}
            />
          )}
          {step === 3 && (
            <SignupStep onNext={handleSignupComplete} onBack={handleReset} referralCode={referralCode} setReferralCode={setReferralCode} setUser={setUser} />
          )}
          {step === 4 && user != null && (
            <ReferralStep onBack={handleBackFromReferral} onReset={handleReset} referralCode={user.referral_code} />
          )}
        </div>
      </div>
    </div>
  );
}
