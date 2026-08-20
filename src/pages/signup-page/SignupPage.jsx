import AuthPage from "../../components/auth/AuthPage";

const SignupPage = () => {
  const handleSignup = (userId) => {
    console.log("회원가입 아이디:", userId);

    // 추후 회원가입 API 연결
  };

  return (
    <AuthPage
      type="signup"
      onSubmit={handleSignup}
    />
  );
};

export default SignupPage;