import "./RecipeTextInput.css";

const RecipeTextInput = ({
  value,
  onChange,
  title = "직접 입력하기",
  description = "텍스트를 통해 레시피를 공유해주세요",
  placeholder = "입력하기",
}) => {
  return (
    <div className="recipe-text-input">
      <h2 className="recipe-text-input__title">
        {title}
      </h2>

      <p className="recipe-text-input__description">
        {description}
      </p>

      <textarea
        className="recipe-text-input__textarea"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default RecipeTextInput;