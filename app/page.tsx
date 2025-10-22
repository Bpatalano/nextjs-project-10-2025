"use client";

import { useState } from "react";
import ProgressIndicator from "@/app/components/ProgressIndicator";
import WelcomeStep from "@/app/components/WelcomeStep";
import PasswordStep from "@/app/components/PasswordStep";
import SignupStep from "@/app/components/SignupStep";
import SuccessStep from "@/app/components/SuccessStep";
import ReferralStep from "@/app/components/ReferralStep";

export default function Home() {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleReset = () => {
    setStep(1);
  };

  const handleSignup = () => {
    setStep(4);
  };

  const handleSignupComplete = () => {
    setStep(3); // Go to success step
  };

  const handleReferFriend = () => {
    setStep(5); // Go to referral step
  };

  const handleBackFromReferral = () => {
    setStep(3); // Go back to success step
  };

  const getStepForProgress = () => {
    if (step === 4) return 1; // Signup is step 1 in progress
    if (step === 5) return 3; // Referral shows as complete in progress
    return step;
  };

  const getTotalSteps = () => {
    if (step === 4) return 2; // Signup flow: signup + success
    return 3; // Login flow: welcome + password + success
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md">
        <ProgressIndicator
          currentStep={getStepForProgress()}
          totalSteps={getTotalSteps()}
        />

        <div className="rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-800">
          {step === 1 && (
            <WelcomeStep onNext={handleNext} onSignup={handleSignup} />
          )}
          {step === 2 && (
            <PasswordStep onNext={handleNext} onBack={handleBack} />
          )}
          {step === 3 && (
            <SuccessStep
              onReset={handleReset}
              onBack={handleBack}
              onReferFriend={handleReferFriend}
            />
          )}
          {step === 4 && (
            <SignupStep onNext={handleSignupComplete} onBack={handleReset} />
          )}
          {step === 5 && (
            <ReferralStep onBack={handleBackFromReferral} onReset={handleReset} />
          )}
        </div>

        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          {step === 4 && "Step 1 of 2"}
          {step === 5 && "Referral"}
          {step <= 3 && `Step ${step} of 3`}
        </p>
      </div>
    </div>
  );
}
