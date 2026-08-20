import FormCard from '../../../../components/form-card/FormCard'

import './MealSourceCard.css'

const MealSourceCard = ({ homeMealRate, eatOutDays, totalDays }) => {
  const clampedRate = Math.min(100, Math.max(0, homeMealRate))
  const message =
    clampedRate >= 50 ? '집밥 비중이 높아요!' : '외식 비중이 높아요!'

  return (
    <FormCard>
      <h3 className='meal-source-card__title'>외식 빈도</h3>
      <p className='meal-source-card__message'>{message}</p>

      <div
        className='meal-source-card__bar'
        role='img'
        aria-label={`집밥 ${clampedRate}%`}
      >
        <span
          className={`meal-source-card__bar-fill ${
            clampedRate === 100 ? 'meal-source-card__bar-fill--full' : ''
          }`}
          style={{ width: `${clampedRate}%` }}
        />
      </div>

      <div className='meal-source-card__legend'>
        <div className='meal-source-card__stat'>
          <p className='meal-source-card__stat-label'>집밥</p>
          <p className='meal-source-card__stat-value'>
            {totalDays}일 중 {clampedRate}%
          </p>
        </div>

        <div className='meal-source-card__stat meal-source-card__stat--end'>
          <p className='meal-source-card__stat-label'>외식</p>
          <p className='meal-source-card__stat-value'>
            {totalDays}일 중 {eatOutDays}일
          </p>
        </div>
      </div>
    </FormCard>
  )
}

export default MealSourceCard
