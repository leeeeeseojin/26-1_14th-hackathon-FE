import { useNavigate } from "react-router-dom";

import AuthPage from "../../../components/auth/AuthPage";
import { login } from "../authApi";
const LoginPage = () => {
  const navigate = useNavigate();

 
  const handleLogin = async (userId) => {
    try {
      const data = await login(userId);

      if (!data?.accessToken) {
        throw new Error(
          "Access Token이 응답에 없습니다."
        );
      }

      localStorage.setItem(
        "accessToken",
        data.accessToken
      );

      navigate("/main");
    } catch (error) {
      console.error("로그인 실패:", error);

      if (error.status === 401) {
        alert("등록되지 않은 아이디입니다.");
        return;
      }

      alert(
        error.message ||
          "로그인 중 오류가 발생했습니다."
      );
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