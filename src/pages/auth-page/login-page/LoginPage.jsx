import { useNavigate } from "react-router-dom";

import AuthPage from "../../../components/auth/AuthPage";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (userId) => {
    console.log("임시 로그인:", userId);

    localStorage.setItem(
      "accessToken",
      "dev-access-token"
    );

    navigate("/main");
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