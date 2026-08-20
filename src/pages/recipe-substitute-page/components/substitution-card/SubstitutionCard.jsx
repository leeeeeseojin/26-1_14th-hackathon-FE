import { useState, useRef } from 'react'
import InlineTag from '../inline-tag/InlineTag'

import './SubstitutionCard.css'

const SWIPE_THRESHOLD = 60

export default function SubstitutionCard({
  title,
  reason,
  tags,
  hasNoSuggestion = false,
  onAccept,
  onReject,
  onDelete,
}) {
  const [isSwiped, setIsSwiped] = useState(false)
  const [isRejected, setIsRejected] = useState(hasNoSuggestion)
  const [customInput, setCustomInput] = useState('')
  const startX = useRef(0)

  const handleDragStart = (clientX) => {
    startX.current = clientX
  }

  const handleDragEnd = (clientX) => {
    const deltaX = startX.current - clientX
    if (deltaX > SWIPE_THRESHOLD) {
      setIsSwiped(true)
    } else if (deltaX < -SWIPE_THRESHOLD) {
      setIsSwiped(false)
      setIsRejected(false)
    }
  }

  const handleTouchStart = (event) => {
    handleDragStart(event.touches[0].clientX)
  }

  const handleTouchEnd = (event) => {
    handleDragEnd(event.changedTouches[0].clientX)
  }

  const handleMouseDown = (event) => {
    handleDragStart(event.clientX)
  }

  const handleMouseUp = (event) => {
    handleDragEnd(event.clientX)
  }

  const handleAccept = () => {
    onAccept?.()
  }

  const handleReject = () => {
    setIsRejected(true)
    setIsSwiped(false)
    onReject?.()
  }

  const isActionVisible = hasNoSuggestion ? false : isSwiped && !isRejected

  return (
    <div
      className='substitution-card'
      onTouchStart={hasNoSuggestion ? undefined : handleTouchStart}
      onTouchEnd={hasNoSuggestion ? undefined : handleTouchEnd}
      onMouseDown={hasNoSuggestion ? undefined : handleMouseDown}
      onMouseUp={hasNoSuggestion ? undefined : handleMouseUp}
    >
      <div
        className={`substitution-card__content ${isSwiped ? 'substitution-card__content--swiped' : ''}`}
      >
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

      {isActionVisible && (
        <div className='substitution-card__actions'>
          <button type='button' className='substitution-card__accept-button' onClick={handleAccept}>
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
