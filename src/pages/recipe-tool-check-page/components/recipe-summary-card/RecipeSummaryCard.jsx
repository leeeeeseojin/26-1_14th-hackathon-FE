import './RecipeSummaryCard.css'

export default function RecipeSummaryCard({ thumbnail, title, description, tags = [] }) {
  return (
    <div className='recipe-summary-card'>
      <div className='recipe-summary-card__thumbnail'>
        <img src={thumbnail} alt='' />
      </div>

      <div className='recipe-summary-card__info'>
        <p className='recipe-summary-card__title'>{title}</p>
        <p className='recipe-summary-card__description'>{description}</p>
        {tags.length > 0 && (
          <div className='recipe-summary-card__tags'>
            {tags.map((tag) => (
              <span key={tag} className='recipe-summary-card__tag'>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
