import { SignUp } from '@clerk/clerk-react';


function SignUpPage() {
  return (
    <div className="flex justify-center  my-20 items-center">
      <SignUp fallbackRedirectUrl="/login-options" />
    </div>
  );
}

export default SignUpPage;
