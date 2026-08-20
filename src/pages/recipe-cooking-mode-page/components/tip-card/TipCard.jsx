import './TipCard.css'

export default function TipCard({ illustration, label, content }) {
  return (
    <div className='tip-card'>
      <div className='tip-card__row'>
        <div className='tip-card__illustration-wrapper'>
          <img src={illustration} alt='' className='tip-card__illustration' />
        </div>

        <div className='tip-card__text-group'>
          <img src={label} alt='MODI TIP' className='tip-card__label' />
          <p className='tip-card__content'>{content}</p>
        </div>
      </div>
    </div>
  )
}
