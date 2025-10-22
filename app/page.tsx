"use client";

import { useState } from "react";
import posthog from 'posthog-js';
import WelcomeStep from "@/app/components/WelcomeStep";
import SignupStep from "@/app/components/SignupStep";
import SuccessStep from "@/app/components/SuccessStep";
import ReferralStep from "@/app/components/ReferralStep";

export default function Home() {
  const [step, setStep] = useState(1);

  const handleSignIn = () => {
    posthog.capture('signin_completed');
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleReset = () => {
    posthog.capture('onboarding_flow_reset', { from_step: step });
    setStep(1);
  };

  const handleSignup = () => {
    posthog.capture('signup_initiated');
    setStep(3);
  };

  const handleSignupComplete = () => {
    posthog.capture('signup_completed');
    setStep(2);
  };

  const handleReferFriend = () => {
    posthog.capture('referral_initiated');
    setStep(4);
  };

  const handleBackFromReferral = () => {
    setStep(2);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-800">
          {step === 1 && (
            <WelcomeStep onNext={handleSignIn} onSignup={handleSignup} />
          )}
          {step === 2 && (
            <SuccessStep
              onReset={handleReset}
              onBack={handleBack}
              onReferFriend={handleReferFriend}
            />
          )}
          {step === 3 && (
            <SignupStep onNext={handleSignupComplete} onBack={handleReset} />
          )}
          {step === 4 && (
            <ReferralStep onBack={handleBackFromReferral} onReset={handleReset} />
          )}
        </div>
      </div>
    </div>
  );
}
