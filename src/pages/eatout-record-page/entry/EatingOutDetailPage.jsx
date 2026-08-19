import { useLocation, useNavigate } from "react-router-dom";

import Header from "../../../components/header/Header";
import CommonButton from "../../../components/common-button/CommonButton";

import NutritionCard from "../components/NutritionCard";
import RecordInputCard from "../components/RecordInputCard";

import "./EatingOutDetailPage.css";

const EatingOutDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const foodName = location.state?.foodName || "비빔밥";


  const handleSave = () => {
    console.log("외식 기록 저장");
  };

  return (
    <div className="eating-out-detail-page">
      <Header
        title="외식 기록"
        onBack={() => navigate(-1)}
      />

      <main className="eating-out-detail-page__main">
        <NutritionCard
          foodName={foodName}
          time="12:00"
          amount="300g"
          carbohydrate="82g"
          sugar="6g"
          calorie="560kcal"
        />

        <RecordInputCard />
      </main>

      <div className="eating-out-detail-page__bottom">
        <CommonButton onClick={handleSave}>
          기록 저장
        </CommonButton>
      </div>
    </div>
  );
};

export default EatingOutDetailPage;