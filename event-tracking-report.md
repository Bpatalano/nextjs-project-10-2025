# Event tracking report

This document lists all PostHog events that have been automatically added to your Next.js application.

## Events by File

### app/components/PasswordStep.tsx

- **forgot_password_clicked**: User clicked the 'Forgot password?' button on the password step.
- **password_step_navigated_back**: User clicked the 'Back' button on the password entry step.
- **password_step_submitted**: User clicked the 'Sign In' button to submit their password.

### app/components/ReferralStep.tsx

- **referral_code_copied**: Fired when a user clicks the 'Copy Code' button to copy their referral code.
- **referral_flow_completed**: Fired when a user clicks the 'Done' button, completing the referral step.

### app/components/SignupStep.tsx

- **signup_form_submitted**: Fired when a user clicks the 'Sign Up' button on the signup form.
- **signup_step_signin_link_clicked**: Fired when a user clicks the 'Sign in' link, indicating they already have an account.

### app/components/SuccessStep.tsx

- **refer_friend_clicked**: User clicked the 'Refer a Friend' button on the success step.
- **start_over_clicked**: User clicked the 'Start Over' button on the success step.
- **back_from_success_clicked**: User clicked the 'Back' button on the success step.

### app/components/WelcomeStep.tsx

- **welcome_step_continue_clicked**: User clicked the 'Continue' button on the welcome step to proceed with sign-in.
- **welcome_step_signup_clicked**: User clicked the 'Sign up' link on the welcome step to navigate to the registration flow.

### app/page.tsx

- **onboarding_flow_reset**: Fired when the user resets the multi-step onboarding or signup flow.
- **signup_initiated**: Fired when the user clicks the button to start the signup process from the welcome step.
- **signup_completed**: Fired when the user successfully completes the signup step.
- **referral_initiated**: Fired when the user clicks the 'Refer a Friend' button on the success step.


## Events still awaiting implementation
- (human: you can fill these in)
---

## Next Steps

1. Review the changes made to your files
2. Test that events are being captured correctly
3. Create insights and dashboards in PostHog
4. Make a list of events we missed above. Knock them out yourself, or give this file to an agent.

Learn more about what to measure with PostHog and why: https://posthog.com/docs/new-to-posthog/getting-hogpilled
