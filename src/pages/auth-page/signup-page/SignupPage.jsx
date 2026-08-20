import { useNavigate } from "react-router-dom";

import AuthPage from "../../../components/auth/AuthPage";

const SignupPage = () => {
  const navigate = useNavigate();

  const handleSignup = (userId) => {
    navigate("/", {
      state: {
        loginId: userId,
      },
    });
  };

  return (
    <AuthPage
      type="signup"
      onSubmit={handleSignup}
    />
  );
};

export default SignupPage;