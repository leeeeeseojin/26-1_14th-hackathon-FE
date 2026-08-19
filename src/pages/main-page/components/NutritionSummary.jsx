import "./NutritionSummary.css";

const NutritionSummary = () => {
  return (
    <section className="nutrition-summary">
      <div className="nutrition-summary__intake">
        <div className="nutrition-summary__intake-header">
          <span className="nutrition-summary__label">
            현재 섭취량
          </span>

          <div>
            <strong className="nutrition-summary__calorie">
              1,840
            </strong>

            <span className="nutrition-summary__unit">
              kcal
            </span>
          </div>
        </div>

        <div className="nutrition-summary__goal">
          <span>탄수화물 목표</span>

          <span>
            <strong>1,840</strong> / 2,400 kcal
          </span>
        </div>

        <div className="nutrition-summary__progress">
          <div className="nutrition-summary__progress-value" />
        </div>
      </div>

      <div className="nutrition-summary__balance">
        <div className="nutrition-summary__balance-header">
          <span>오늘의 영양 밸런스</span>

          <strong>78점</strong>
        </div>

        <div className="nutrition-summary__balance-progress">
          <div className="nutrition-summary__balance-value" />
        </div>

        <div className="nutrition-summary__nutrients">
          <div className="nutrition-summary__nutrient">
            <span>탄수화물</span>
            <strong>47%</strong>
          </div>

          <div className="nutrition-summary__nutrient">
            <span>단백질</span>
            <strong>35%</strong>
          </div>

          <div className="nutrition-summary__nutrient">
            <span>지방</span>
            <strong>18%</strong>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NutritionSummary;