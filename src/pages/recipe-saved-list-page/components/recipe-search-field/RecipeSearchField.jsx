import searchIcon from '../../../../assets/icon/search-icon.svg'

import './RecipeSearchField.css'

const RecipeSearchField = ({ value, onChange }) => {
  return (
    <div className='recipe-search-field'>
      <label
        className='recipe-search-field__label'
        htmlFor='recipe-saved-list-search'
      >
        키워드 검색
      </label>

      <div className='recipe-search-field__input-wrapper'>
        <img
          className='recipe-search-field__icon'
          src={searchIcon}
          alt=''
          width={16}
          height={16}
        />

        <input
          id='recipe-saved-list-search'
          className='recipe-search-field__input'
          type='text'
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder='음식 이름으로 검색 (예: 땅콩, 유제품)'
        />
      </div>
    </div>
  )
}

export default RecipeSearchField
