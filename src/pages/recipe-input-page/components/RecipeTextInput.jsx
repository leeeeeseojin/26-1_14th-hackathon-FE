import "./RecipeTextInput.css";

const RecipeTextInput = ({
  value,
  onChange,
}) => {
  return (
    <div className="recipe-text-input">
      <h2 className="recipe-text-input__title">
        직접 입력하기
      </h2>

      <p className="recipe-text-input__description">
        텍스트를 통해 레시피를 공유해주세요
      </p>

      <textarea
        className="recipe-text-input__textarea"
        placeholder="입력하기"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default RecipeTextInput;