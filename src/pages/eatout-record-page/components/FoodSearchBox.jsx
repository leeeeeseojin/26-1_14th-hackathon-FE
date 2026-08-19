import { useState } from "react";

import "./FoodSearchBox.css";
import searchIcon from "../../../assets/icon/search-icon.svg";

const FoodSearchBox = ({ onSelectFood }) => {
  const [keyword, setKeyword] = useState("");

  const foods = ["땅콩", "우유", "버터"];

  const filteredFoods = foods.filter((food) =>
    food.includes(keyword)
  );

  return (
    <div className="food-search-box">
      <div className="food-search-box__input-wrapper">
        <span className="food-search-box__icon">
          <img src={searchIcon} alt="검색" />
        </span>

        <input
          className="food-search-box__input"
          type="text"
          placeholder="음식 이름으로 검색 (예: 땅콩, 유제품)"
          value={keyword}
          onChange={(event) =>
            setKeyword(event.target.value)
          }
        />
      </div>

      <p className="food-search-box__label">
        검색 결과
      </p>

      <div className="food-search-box__results">
        {filteredFoods.map((food) => (
          <button
            key={food}
            type="button"
            className="food-search-box__item"
            onClick={() => onSelectFood(food)}
          >
            {food}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FoodSearchBox;