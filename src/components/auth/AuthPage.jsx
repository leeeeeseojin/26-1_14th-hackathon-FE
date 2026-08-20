import { useState } from "react";

import CommonButton from "../common-button/CommonButton";
import Login from "../../assets/icon/login.svg";
import Logo from "../../assets/icon/logo.svg";

import "./AuthPage.css";

const AuthPage = ({
  type = "login",
  onSubmit,
  onMovePage,
}) => {
  const [userId, setUserId] = useState("");

  const isLogin = type === "login";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userId.trim()) {
      alert("아이디를 입력해주세요.");
      return;
    }

    onSubmit?.(userId);
  };

  return (
    <div className="auth-page">
      <div className="auth-page__container">
        <section className="auth-page__logo-section">
          <img
            src={Logo}
            alt="MODI"
            className="auth-page__logo"
          />

          <p className="auth-page__description">
            먹고 싶은 음식을, 나에게 맞게, Modify.
          </p>
        </section>

        <form
          className="auth-page__form"
          onSubmit={handleSubmit}
        >
          <div className="auth-page__input-group">
            <label
              htmlFor="userId"
              className="auth-page__label"
            >
              아이디
            </label>

            <input
              id="userId"
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="아이디를 입력해 주세요"
              className="auth-page__input"
            />
          </div>

          <div className="auth-page__buttons">
            <CommonButton type="submit">
              {isLogin ? "로그인" : "회원가입"}
            </CommonButton>

            {isLogin && (
              <CommonButton
                type="button"
                variant="outline"
                onClick={onMovePage}
              >
                회원가입
              </CommonButton>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;