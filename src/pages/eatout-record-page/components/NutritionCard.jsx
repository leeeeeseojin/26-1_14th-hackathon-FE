import { useState } from "react";

import FormCard from "../../../components/form-card/FormCard";
import CommonButton from "../../../components/common-button/CommonButton";

import "./NutritionCard.css";

const NutritionCard = ({
  foodName,
  time,
  amount,
  carbohydrate,
  sugar,
  calorie,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const [nutrition, setNutrition] = useState({
    time,
    amount,
    carbohydrate,
    sugar,
    calorie,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setNutrition((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleComplete = () => {
    setIsEditing(false);

    console.log("수정된 영양 정보:", nutrition);

    // 나중에 수정 API 연결
  };

  return (
    <FormCard>
      <div className="nutrition-card">
        <div className="nutrition-card__header">
          <h2 className="nutrition-card__food-name">
            {foodName}
          </h2>

          <span className="nutrition-card__standard">
            1인분 기준
          </span>
        </div>

        <div className="nutrition-card__summary">
          <div className="nutrition-card__summary-item">
            <span className="nutrition-card__summary-label">
              섭취 시각
            </span>

            {isEditing ? (
              <input
                className="nutrition-card__edit-input nutrition-card__edit-input--time"
                type="time"
                name="time"
                value={nutrition.time}
                onChange={handleChange}
              />
            ) : (
              <strong className="nutrition-card__summary-value">
                {nutrition.time}
              </strong>
            )}
          </div>

          <div className="nutrition-card__summary-item">
            <span className="nutrition-card__summary-label">
              섭취량
            </span>

            {isEditing ? (
              <div className="nutrition-card__input-unit">
                <input
                  className="nutrition-card__edit-input"
                  type="number"
                  name="amount"
                  value={nutrition.amount}
                  onChange={handleChange}
                />

                <span>g</span>
              </div>
            ) : (
              <strong className="nutrition-card__summary-value">
                {nutrition.amount}g
              </strong>
            )}
          </div>
        </div>

        <div className="nutrition-card__divider" />

        <div className="nutrition-card__nutrition">
          <div className="nutrition-card__nutrition-row">
            <span>탄수화물</span>

            {isEditing ? (
              <div className="nutrition-card__input-unit">
                <input
                  className="nutrition-card__edit-input"
                  type="number"
                  name="carbohydrate"
                  value={nutrition.carbohydrate}
                  onChange={handleChange}
                />

                <span>g</span>
              </div>
            ) : (
              <strong>
                {nutrition.carbohydrate}g
              </strong>
            )}
          </div>

          <div className="nutrition-card__nutrition-row">
            <span>당류</span>

            {isEditing ? (
              <div className="nutrition-card__input-unit">
                <input
                  className="nutrition-card__edit-input"
                  type="number"
                  name="sugar"
                  value={nutrition.sugar}
                  onChange={handleChange}
                />

                <span>g</span>
              </div>
            ) : (
              <strong>
                {nutrition.sugar}g
              </strong>
            )}
          </div>

          <div className="nutrition-card__nutrition-row">
            <span>열량</span>

            {isEditing ? (
              <div className="nutrition-card__input-unit">
                <input
                  className="nutrition-card__edit-input"
                  type="number"
                  name="calorie"
                  value={nutrition.calorie}
                  onChange={handleChange}
                />

                <span>kcal</span>
              </div>
            ) : (
              <strong>
                {nutrition.calorie}kcal
              </strong>
            )}
          </div>
        </div>

        <div className="nutrition-card__button">
          <CommonButton
            onClick={
              isEditing
                ? handleComplete
                : handleEdit
            }
          >
            {isEditing ? "수정 완료" : "수정하기"}
          </CommonButton>
        </div>

        <p className="nutrition-card__notice">
          * 영양 정보는 참고용이며 실제 조리 방식에 따라 다를 수 있습니다.
          <br />
          건강 상태에 따른 판단은 의료진과 상담하세요.
        </p>
      </div>
    </FormCard>
  );
};

export default NutritionCard;