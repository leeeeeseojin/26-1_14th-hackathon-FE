import './NutrientTag.css'

export default function NutrientTag({ label, value, variant = 'neutral' }) {
  return (
    <div className={`nutrient-tag nutrient-tag--${variant}`}>
      <span className='nutrient-tag__label'>{label}</span>
      <span className='nutrient-tag__value'>{value}</span>
    </div>
  )
}
