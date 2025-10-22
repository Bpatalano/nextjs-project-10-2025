import posthog from 'posthog-js';

interface PasswordStepProps {
  onNext: () => void;
  onBack: () => void;
}

export default function PasswordStep({ onNext, onBack }: PasswordStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Enter Password
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Please enter your password to continue
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500"
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

        <div className="flex gap-3">
          <button
            onClick={() => {
              posthog.capture('password_step_navigated_back');
              onBack();
            }}
            className="w-full rounded-lg border border-gray-300 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Back
          </button>
          <button
            onClick={() => {
              posthog.capture('password_step_submitted');
              onNext();
            }}
            className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
