import { useNavigate } from "react-router-dom";

import AuthPage from "../../components/auth/AuthPage";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (userId) => {
    console.log("로그인 아이디:", userId);

    // 추후 로그인 API 연결
  };

  return (
    <AuthPage
      type="login"
      onSubmit={handleLogin}
      onMovePage={() => navigate("/signup")}
    />
  );
};

export default LoginPage;