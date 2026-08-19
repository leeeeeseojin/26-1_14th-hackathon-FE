import { useState } from "react";

import CommonButton from "../../../components/common-button/CommonButton";
import BottomNav from "../../../components/bottom-nav/BottomNav";
import FoodExample from "../../../assets/dummy/recipe-review-hero.svg";

import NutritionSummary from "../components/NutritionSummary";
import RecordSelectModal from "../components/RecordSelectModal";

import "./MainPage.css";

const MainPage = () => {
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);

  return (
    <div className="main-page">
      <main className="main-page__content">
        <section className="main-page__greeting">
          <p className="main-page__date">
            7월 15일 화요일
          </p>

          <p className="main-page__welcome">
            안녕하세요 00님,
          </p>

          <h1 className="main-page__title">
            오늘도 잘 챙겨 먹어볼까요?
          </h1>

          <div className="main-page__speech">
            연속 8일차!
          </div>
        </section>

        <section className="main-page__calendar">
          {[7, 8, 9, 10, 11, 12, 13].map((day) => (
            <div
              key={day}
              className={`main-page__day ${
                day === 7 || day === 8
                  ? "main-page__day--completed"
                  : ""
              }`}
            >
              {day}
            </div>
          ))}
        </section>

        <NutritionSummary />

        <div className="main-page__record-button">
          <CommonButton
            onClick={() => setIsRecordModalOpen(true)}
          >
            기록하기
          </CommonButton>
        </div>

        <section className="main-page__recommendation">
          <div className="main-page__recommendation-content">
            <div className="main-page__recommendation-image">
              <img src={FoodExample} alt="음식 사진" />
            </div>

            <div>
              <p className="main-page__recommendation-title">
                저녁 식사 탄수화물 40g 이하를
                <br />
                권장합니다.
              </p>

              <p className="main-page__recommendation-description">
                현재 혈당 추세를 고려한 개인화 제안입니다. (참고용)
              </p>
            </div>
          </div>

          <button
            type="button"
            className="main-page__recipe-button"
          >
            추천 레시피 보러가기
          </button>
        </section>
      </main>

      <BottomNav />

      <RecordSelectModal
        isOpen={isRecordModalOpen}
        onClose={() => setIsRecordModalOpen(false)}
      />
    </div>
  );
};

export default MainPage;