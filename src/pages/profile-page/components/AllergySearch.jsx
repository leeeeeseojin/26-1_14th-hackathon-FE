import { useState } from 'react';

import searchIcon from "../../../assets/icon/search-icon.svg";
import { ALLERGY_OPTIONS } from '../constants/AllergyOptions';

import './AllergySearch.css';

const AllergySearch = ({
  selectedAllergies,
  onChange,
}) => {
  const [keyword, setKeyword] =
    useState('');

  const trimmedKeyword = keyword.trim();

  const filteredAllergies =
    ALLERGY_OPTIONS.filter(
      (allergy) =>
        allergy.includes(trimmedKeyword) &&
        !selectedAllergies.includes(allergy),
    );

  const isSearching =
    trimmedKeyword.length > 0;

  const handleSelect = (allergy) => {
    onChange([
      ...selectedAllergies,
      allergy,
    ]);

    setKeyword('');
  };

  const handleRemove = (allergy) => {
    onChange(
      selectedAllergies.filter(
        (item) => item !== allergy,
      ),
    );
  };

  return (
    <div className="allergy-search">
      <div className="allergy-search__input-wrapper">
        <span className="allergy-search__icon">
          <img src={searchIcon} alt="검색" />
        </span>

        <input
          type="text"
          className="allergy-search__input"
          placeholder="음식 이름으로 검색 (예: 땅콩, 유제품)"
          value={keyword}
          onChange={(event) =>
            setKeyword(event.target.value)
          }
        />
      </div>

      <div className="allergy-search__tags">
        {selectedAllergies.map((allergy) => (
          <button
            key={allergy}
            type="button"
            className="allergy-search__tag"
            onClick={() =>
              handleRemove(allergy)
            }
          >
            {allergy}

            <span>×</span>
          </button>
        ))}
      </div>

      {isSearching && (
        <div className="allergy-search__result">
          <p className="allergy-search__result-title">
            검색 결과
          </p>

          {filteredAllergies.length > 0 ? (
            <ul className="allergy-search__list">
              {filteredAllergies.map(
                (allergy) => (
                  <li
                    key={allergy}
                    className="allergy-search__list-item"
                  >
                    <button
                      type="button"
                      className="allergy-search__result-button"
                      onClick={() =>
                        handleSelect(allergy)
                      }
                    >
                      {allergy}
                    </button>
                  </li>
                ),
              )}
            </ul>
          ) : (
            <p className="allergy-search__empty">
              검색 결과가 없습니다.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AllergySearch;