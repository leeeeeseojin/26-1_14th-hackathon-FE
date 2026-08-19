import './CookingStepItem.css'

export default function CookingStepItem({ number, children }) {
  return (
    <div className='cooking-step-item'>
      <div className='cooking-step-item__badge'>{number}</div>
      <p className='cooking-step-item__text'>{children}</p>
    </div>
  )
}
