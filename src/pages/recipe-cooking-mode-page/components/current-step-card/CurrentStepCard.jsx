import './CurrentStepCard.css'

export default function CurrentStepCard({ stepNumber, stepName, title, description }) {
  return (
    <div className='current-step-card'>
      <div className='current-step-card__header'>
        <p className='current-step-card__step-label'>
          STEP {stepNumber} · {stepName}
        </p>
        <h2 className='current-step-card__title'>{title}</h2>
      </div>
      <p className='current-step-card__description'>
        {description.split('\n').map((line, index) => (
          <span key={index}>
            {line}
            {index < description.split('\n').length - 1 && <br />}
          </span>
        ))}
      </p>
    </div>
  )
}
