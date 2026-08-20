import './NextStepPreview.css'

export default function NextStepPreview({ className = '', stepNumber, title, description }) {
  return (
    <div className={`next-step-preview ${className}`}>
      <div className='next-step-preview__num'>{stepNumber}</div>

      <div className='next-step-preview__label-group'>
        <p className='next-step-preview__label'>다음 단계</p>
      </div>

      <div className='next-step-preview__info'>
        <p className='next-step-preview__title'>{title}</p>
        <p className='next-step-preview__description'>{description}</p>
      </div>
    </div>
  )
}
