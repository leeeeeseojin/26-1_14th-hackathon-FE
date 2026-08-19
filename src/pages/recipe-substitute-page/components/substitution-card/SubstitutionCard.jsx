import { useState } from 'react'
import InlineTag from '../inline-tag/InlineTag'

import './SubstitutionCard.css'

export default function SubstitutionCard({
  title,
  reason,
  tags,
  isActionVisible = false,
  hasNoSuggestion = false,
  onAccept,
  onReject,
  onDelete,
}) {
  const [isRejected, setIsRejected] = useState(hasNoSuggestion)
  const [customInput, setCustomInput] = useState('')

  const handleReject = () => {
    setIsRejected(true)
    onReject?.()
  }

  return (
    <div className='substitution-card'>
      <div className='substitution-card__content'>
        <p className='substitution-card__title'>{title}</p>

        {!hasNoSuggestion && (
          <>
            <p className='substitution-card__reason'>{reason}</p>
            <div className='substitution-card__tags'>
              {tags.map((tag) => (
                <InlineTag key={tag.label} label={tag.label} variant={tag.variant} />
              ))}
            </div>
          </>
        )}

        {isRejected && (
          <div className='substitution-card__reject-expand'>
            <input
              type='text'
              className='substitution-card__custom-input'
              placeholder='직접 입력하기'
              value={customInput}
              onChange={(event) => setCustomInput(event.target.value)}
            />
            <button type='button' className='substitution-card__delete-button' onClick={onDelete}>
              삭제
            </button>
          </div>
        )}
      </div>

      {isActionVisible && !isRejected && (
        <div className='substitution-card__actions'>
          <button type='button' className='substitution-card__accept-button' onClick={onAccept}>
            수락
          </button>
          <button type='button' className='substitution-card__reject-button' onClick={handleReject}>
            거절
          </button>
        </div>
      )}
    </div>
  )
}
