import './IngredientToggle.css'

export default function IngredientToggle({ name, status = 'default', onToggle }) {
  return (
    <button
      type='button'
      className={`ingredient-toggle ingredient-toggle--${status}`}
      onClick={onToggle}
    >
      <span className='ingredient-toggle__checkbox' />
      <span className='ingredient-toggle__name'>{name}</span>
    </button>
  )
}
