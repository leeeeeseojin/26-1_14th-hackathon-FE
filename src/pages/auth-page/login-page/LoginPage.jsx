import { useNavigate } from "react-router-dom";

import AuthPage from "../../../components/auth/AuthPage";
import { login } from "../authApi";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = async (userId) => {
    try {
      const data = await login(userId);

      if (!data?.accessToken) {
        throw new Error("Access Token이 응답에 없습니다.");
      }

      localStorage.setItem(
        "accessToken",
        data.accessToken
      );

      navigate("/");
    } catch (error) {
      console.error("로그인 실패:", error);

      alert("로그인에 실패했습니다. 아이디를 확인해주세요.");
    }
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