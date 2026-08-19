import './IngredientToggle.css'

export default function IngredientToggle({ name, isSelected, onToggle }) {
  return (
    <button
      type='button'
      className={`ingredient-toggle ${isSelected ? 'ingredient-toggle--selected' : ''}`}
      onClick={onToggle}
    >
      <span className='ingredient-toggle__checkbox' />
      <span className='ingredient-toggle__name'>{name}</span>
    </button>
  )
}
