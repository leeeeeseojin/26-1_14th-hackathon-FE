import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../../components/header/Header";
import CommonButton from "../../../components/common-button/CommonButton";

import ImageUploader from "../components/ImageUploader";
import RecipeTextInput from "../components/RecipeTextInput";

import SaveSuccessModal from "../../../components/save-sucess-modal/SaveSuccessModal";

import "./RecipeInputPage.css";

const RecipeInputPage = () => {
  const [file, setFile] = useState(null);
  const [recipeText, setRecipeText] = useState("");
  const [recipeUrl, setRecipeUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSave = () => {
    console.log("선택한 파일:", file);
    console.log("입력한 레시피:", recipeText);
    console.log("입력한 링크:", recipeUrl);

    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleViewRecipe = () => {
    setIsModalOpen(false);
    navigate("/recipes");
  };

  return (
    <div className="recipe-input-page">
      <Header
        title="레시피 입력"
        onBack={() => navigate(-1)}
      />

      <main className="recipe-input-page__main">
        <section className="recipe-input-page__section">
          <h2 className="recipe-input-page__title">
            이미지로 공유하기
          </h2>

          <ImageUploader
            onChange={handleFileChange}
          />
        </section>

        <div className="recipe-input-page__divider" />

        {/* 직접 입력 */}
        <section className="recipe-input-page__section">
          <RecipeTextInput
            value={recipeText}
            onChange={(event) =>
              setRecipeText(event.target.value)
            }
          />
        </section>

        {/* 링크 입력 - 같은 컴포넌트 재사용 */}
        <section className="recipe-input-page__link-section">
          <RecipeTextInput
            title="링크 입력하기"
            description="링크를 통해 레시피를 공유해주세요"
            placeholder="입력하기"
            value={recipeUrl}
            onChange={(event) =>
              setRecipeUrl(event.target.value)
            }
          />
        </section>
      </main>

      <div className="recipe-input-page__bottom">
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

export default RecipeInputPage;