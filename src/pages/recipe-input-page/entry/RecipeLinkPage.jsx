import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../../components/Header/Header";
import CommonButton from "../../../components/common-button/CommonButton";

import SaveSuccessModal from "../components/SaveSuccessModal";

import "./RecipeLinkPage.css";

const RecipeLinkPage = () => {
  const [link, setLink] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleSave = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleViewRecipe = () => {
    setIsModalOpen(false);

    // 나중에 실제 저장된 레시피 페이지 경로로 변경
    navigate("/recipes");
  };

  return (
    <div className="recipe-link-page">
      <Header
        title="레시피 입력"
        onBack={() => navigate(-1)}
      />

      <main className="recipe-link-page__main">
        <section className="recipe-link-page__section">
          <h2 className="recipe-link-page__title">
            링크 입력하기
          </h2>

          <p className="recipe-link-page__description">
            링크를 통해 레시피를 공유해주세요
          </p>

          <textarea
            className="recipe-link-page__textarea"
            placeholder="링크 붙여넣기"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </section>
      </main>

      <div className="recipe-link-page__bottom">
        <CommonButton onClick={handleSave}>
          저장하기
        </CommonButton>
      </div>

      <SaveSuccessModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onView={handleViewRecipe}
      />
    </div>
  );
};

export default RecipeLinkPage;