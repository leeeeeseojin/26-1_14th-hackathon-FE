import CommonButton from '../../../../components/common-button/CommonButton'

import { MEAL_TYPE_LABEL } from '../../mocks/mealRecordMock'

import './MealRecordCard.css'

const MealRecordCard = ({ meal, onViewRecipe }) => {
  const hasRecipe = Boolean(meal.recipeId)

  return (
    <article className='meal-record-card'>
      <div className='meal-record-card__image-wrap'>
        <img
          className='meal-record-card__image'
          src={meal.imageUrl}
          alt={meal.mealName}
        />
      </div>

      <div className='meal-record-card__info'>
        <div className='meal-record-card__summary'>
          <p className='meal-record-card__type'>
            {MEAL_TYPE_LABEL[meal.mealType]}
          </p>
          <p className='meal-record-card__name'>{meal.mealName}</p>
        </div>

        <div className='meal-record-card__stats'>
          {meal.glucose != null ? (
            <p className='meal-record-card__glucose'>혈당 2h {meal.glucose} mg/dL</p>
          ) : null}
          <p className='meal-record-card__macros'>
            탄수화물 {meal.carb ?? '-'}g · 당류 {meal.sugar ?? '-'}g
          </p>
        </div>
      </div>

      {hasRecipe ? (
        <CommonButton
          weight='regular'
          className='meal-record-card__button'
          onClick={() => onViewRecipe(meal.recipeId)}
        >
          레시피 보기
        </CommonButton>
      ) : null}
    </article>
  )
}

export default MealRecordCard
