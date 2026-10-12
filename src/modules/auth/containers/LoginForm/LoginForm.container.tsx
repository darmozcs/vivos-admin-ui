import { LoginForm, LoginLayout, MockCredentialsHint, VerifyEmailStep } from "../../components";
import { LOGIN_STEP } from "../../const/auth.const";
import { useLoginForm } from "../../hooks";

export const LoginFormContainer = () => {
  const login = useLoginForm();
  const { verifyEmail } = login;

  return (
    <LoginLayout>
      {login.step === LOGIN_STEP.VERIFY_EMAIL ? (
        <VerifyEmailStep
          email={verifyEmail.email}
          form={verifyEmail.form}
          onSubmit={verifyEmail.onSubmit}
          isConfirming={verifyEmail.isConfirming}
          onResend={verifyEmail.onResend}
          isResending={verifyEmail.isResending}
          resendSecondsLeft={verifyEmail.resendSecondsLeft}
          onBack={verifyEmail.onBack}
        />
      ) : (
        <LoginForm
          form={login.form}
          onSubmit={login.onSubmit}
          isLoading={login.isLoading}
          errorMessage={login.errorMessage}
        />
      )}
      {login.mockCredentials && (
        <MockCredentialsHint
          credentials={login.mockCredentials}
          verificationCode={login.mockVerificationCode}
        />
      )}
    </LoginLayout>
  );
};
