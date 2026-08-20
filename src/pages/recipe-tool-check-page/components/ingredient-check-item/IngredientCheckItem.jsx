import './IngredientCheckItem.css'

export default function IngredientCheckItem({ name, amount, isChecked, hasSubstitute = false }) {
  return (
    <div className='ingredient-check-item'>
      <div
        className={`ingredient-check-item__checkbox ${isChecked ? 'ingredient-check-item__checkbox--checked' : ''}`}
      >
        {isChecked && <span className='ingredient-check-item__check-mark'>✓</span>}
      </div>

      <p className='ingredient-check-item__name'>{name}</p>

      {hasSubstitute && <span className='ingredient-check-item__badge'>대체</span>}

      <div className='ingredient-check-item__spacer' />

      <p className='ingredient-check-item__amount'>{amount}</p>
    </div>
  )
}
