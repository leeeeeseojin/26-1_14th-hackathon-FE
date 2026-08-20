import { useEffect, useState } from "react";

import CommonButton from "../../../components/common-button/CommonButton";
import BottomNav from "../../../components/bottom-nav/BottomNav";

import FoodExample from "../../../assets/dummy/recipe-review-hero.svg";
import Modi from "../../../assets/icon/modi.svg";
import Comment from "../../../assets/icon/comment.svg";
import AttendanceFace from "../../../assets/icon/attendance-face.svg";
import Leaf from "../../../assets/icon/leaf.svg";

import NutritionSummary from "../components/NutritionSummary";
import RecordSelectModal from "../components/RecordSelectModal";

import { getDashboard, getRecommendedRecipes, } from "../apis/homeApi";

import "./MainPage.css";

const MainPage = () => {
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);

  const [dashboard, setDashboard] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const attendanceDays = [
    { day: 7, completed: true },
    { day: 8, completed: true },
    { day: 9, completed: false },
    { day: 10, completed: false },
    { day: 11, completed: false },
    { day: 12, completed: false },
    { day: 13, completed: false },
  ];

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [dashboardData, recommendationData] =
          await Promise.all([
            getDashboard(),
            getRecommendedRecipes(),
          ]);

        setDashboard(dashboardData);
        setRecommendation(recommendationData);

        console.log(
          "대시보드 조회 성공:",
          dashboardData
        );

        console.log(
          "추천 레시피 조회 성공:",
          recommendationData
        );
      } catch (error) {
        console.error(
          "홈 데이터 조회 실패:",
          error
        );

        const status = error.response?.status;
        const message =
          error.response?.data?.message;

        if (status === 409) {
          alert(
            message ||
              "식사 관리 목표가 설정되지 않았습니다."
          );
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) {
      return "";
    }

    const date = new Date(
      `${dateString}T00:00:00`
    );

    return date.toLocaleDateString("ko-KR", {
      month: "long",
      day: "numeric",
      weekday: "long",
    });
  };

  const firstRecipe =
    recommendation?.items?.[0];

  return (
    <div className="main-page">
      <main className="main-page__content">

        <section className="main-page__greeting">
          <div className="main-page__greeting-text">
            <p className="main-page__date">
              {formatDate(dashboard?.date)}
            </p>

            <p className="main-page__welcome">
              안녕하세요 00님,
            </p>

            <h1 className="main-page__title">
              오늘도 잘 챙겨 먹어볼까요?
            </h1>
          </div>

          <div className="main-page__character-area">
            <div className="main-page__speech-wrap">
              <img src={Comment} alt="" className="main-page__speech-image"/>

              <span className="main-page__speech-text">
                연속 8일차!
              </span>
            </div>

            <img
              src={Modi}
              alt="MODI 캐릭터"
              className="main-page__character"
            />
          </div>
        </section>

        <section className="main-page__calendar">
          <div className="main-page__calendar-list">
            {attendanceDays.map(
              ({ day, completed }) => (
                <div
                  key={day}
                  className={`main-page__day ${
                    completed
                      ? "main-page__day--completed"
                      : ""
                  }`}
                >
                  {completed && (
                    <img
                      src={Leaf}
                      alt=""
                      className="main-page__day-leaf"
                    />
                  )}

                  <span className="main-page__day-number">
                    {day}
                  </span>

                  {completed && (
                    <img
                      src={AttendanceFace}
                      alt=""
                      className="main-page__day-face"
                    />
                  )}
                </div>
              )
            )}
          </div>

          <div className="main-page__calendar-indicator" />
        </section>


        <NutritionSummary
          summary={dashboard?.summary}
          goal={dashboard?.goal}
          isLoading={isLoading}
        />


        <div className="main-page__record-button">
          <CommonButton
            onClick={() =>
              setIsRecordModalOpen(true)
            }
          >
            기록하기
          </CommonButton>
        </div>


        <section className="main-page__recommendation">
          <div className="main-page__recommendation-content">
            <div className="main-page__recommendation-image">
              <img
                src={
                  firstRecipe?.thumbnail_url ||
                  FoodExample
                }
                alt={
                  firstRecipe?.title ||
                  "음식 사진"
                }
              />
            </div>

            <div>
              <p className="main-page__recommendation-title">
                {recommendation
                  ?.recommendation_message ||
                  "추천 식단을 준비하고 있습니다."}
              </p>

              <p className="main-page__recommendation-description">
                {recommendation?.disclaimer ||
                  "현재 혈당 추세를 고려한 개인화 제안입니다. (참고용)"}
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
        onClose={() =>
          setIsRecordModalOpen(false)
        }
      />
    </div>
  );
};

export default MainPage;