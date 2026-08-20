import arrowRightIcon from '../../../../assets/icon/arrow-right.svg'

import SourceBadge from '../source-badge/SourceBadge'

import './RecipeListItem.css'

const RecipeListItem = ({ recipe, onClick }) => {
  return (
    <button
      type='button'
      className='recipe-list-item'
      onClick={() => onClick(recipe)}
    >
      {recipe.thumbnailUrl ? (
        <img
          className='recipe-list-item__thumbnail'
          src={recipe.thumbnailUrl}
          alt=''
          width={58}
          height={58}
        />
      ) : (
        <span className='recipe-list-item__thumbnail recipe-list-item__thumbnail--placeholder' />
      )}

      <span className='recipe-list-item__content'>
        <span className='recipe-list-item__title-row'>
          <span className='recipe-list-item__title'>{recipe.title}</span>
          <SourceBadge sourceType={recipe.sourceType} />
        </span>

        <span className='recipe-list-item__meta'>
          조리 시간 약 {recipe.cookTime}분 · 약 {recipe.calories}kcal
        </span>
      </span>

      <span className='recipe-list-item__action'>
        <img
          className='recipe-list-item__arrow'
          src={arrowRightIcon}
          alt=''
          width={11}
          height={8}
        />
      </span>
    </button>
  )
}

export default RecipeListItem
