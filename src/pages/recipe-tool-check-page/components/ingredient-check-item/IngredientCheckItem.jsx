import './IngredientCheckItem.css'

export default function IngredientCheckItem({
  name,
  amount,
  isChecked,
  hasSubstitute = false,
  onToggle,
}) {
  return (
    <button type='button' className='ingredient-check-item' onClick={onToggle}>
      <div
        className={`ingredient-check-item__checkbox ${isChecked ? 'ingredient-check-item__checkbox--checked' : ''}`}
      >
        {isChecked && <span className='ingredient-check-item__check-mark'>✓</span>}
      </div>

      <p className='ingredient-check-item__name'>{name}</p>

      {hasSubstitute && <span className='ingredient-check-item__badge'>대체</span>}

      <div className='ingredient-check-item__spacer' />

      <p className='ingredient-check-item__amount'>{amount}</p>
    </button>
  )
}
