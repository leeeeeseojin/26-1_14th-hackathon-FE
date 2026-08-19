import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../../components/header/Header";
import CommonButton from "../../../components/common-button/CommonButton";
import ImageUploader from "../../recipe-input-page/components/ImageUploader";
import FoodSearchBox from "../components/FoodSearchBox";

import "./EatingOutUploadPage.css";

const EatingOutUploadPage = () => {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = () => {
  if (!file) {
    return;
  }

  navigate("/eatout/detail", {
    state: {
      type: "image",
      fileName: file.name,
    },
  });
};

  const handleSelectFood = (foodName) => {
    navigate("/eatout/detail", {
       state: {
       type: "search",
       foodName,
       },
    });
  };

  return (
    <div className="eating-out-upload-page">
      <Header
        title="외식 기록"
        onBack={() => navigate(-1)}
      />

      <main className="eating-out-upload-page__main">
        <section className="eating-out-upload-page__section">
          <h2 className="eating-out-upload-page__section-title">
            이미지로 공유하기
          </h2>

          <ImageUploader onChange={handleFileChange} />

          <div className="eating-out-upload-page__upload-button">
            <CommonButton
              onClick={handleUpload}
              disabled={!file}
          >
              업로드
            </CommonButton>
          </div>
        </section>

        <div className="eating-out-upload-page__divider" />

        <section className="eating-out-upload-page__section">
          <h2 className="eating-out-upload-page__section-title">
            검색
          </h2>

          <FoodSearchBox
            onSelectFood={handleSelectFood}
          />
        </section>
      </main>
    </div>
  );
};

export default EatingOutUploadPage;