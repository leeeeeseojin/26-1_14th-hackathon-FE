import { useRef } from 'react'
import InlineTag from '../inline-tag/InlineTag'

import './SubstitutionCard.css'

const SWIPE_THRESHOLD = 60

export default function SubstitutionCard({
  originalPart,
  suggestedPart,
  reason,
  tags,
  hasNoSuggestion = false,
  status,
  onStatusChange,
  customValue,
  onCustomValueChange,
  onDelete,
}) {
  const startX = useRef(0)
  const hasDraggedRef = useRef(false)

  const isSwiped = status === 'swiped'
  const isRejected = status === 'rejected'
  const isAccepted = status === 'accepted'
  const isCustomConfirmed = status === 'custom-confirmed'
  const isHighlighted = isAccepted || isCustomConfirmed
  const isEditable = isRejected || hasNoSuggestion

  const handleDragStart = (clientX) => {
    startX.current = clientX
    hasDraggedRef.current = false
  }

  const handleDragEnd = (clientX) => {
    const deltaX = startX.current - clientX

    if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
      hasDraggedRef.current = true
    }

    if (deltaX > SWIPE_THRESHOLD && status === 'pending') {
      onStatusChange('swiped')
      return
    }

    if (deltaX < -SWIPE_THRESHOLD) {
      if (status === 'swiped' || status === 'rejected') {
        onStatusChange('pending')
      } else if (status === 'accepted') {
        onStatusChange('pending')
      } else if (status === 'custom-confirmed') {
        onStatusChange(hasNoSuggestion ? 'pending' : 'rejected')
      }
    }
  }

  const handleTouchStart = (event) => {
    handleDragStart(event.touches[0].clientX)
  }

  const handleTouchEnd = (event) => {
    handleDragEnd(event.changedTouches[0].clientX)
  }

  const handleMouseDown = (event) => {
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'BUTTON') {
      handleDragStart(event.clientX)
      return
    }
    event.preventDefault()
    handleDragStart(event.clientX)
  }

  const handleMouseUp = (event) => {
    handleDragEnd(event.clientX)
  }

  const handleAccept = () => {
    onStatusChange('accepted')
  }

  const handleReject = () => {
    onStatusChange('rejected')
  }

  const handleCustomInputKeyDown = (event) => {
    if (event.key === 'Enter' && customValue.trim().length > 0) {
      onStatusChange('custom-confirmed')
    }
  }

  // 확정된(수락/직접입력확정) 카드 클릭 시 수정 모드로 전환
  const handleCardClick = () => {
    if (hasDraggedRef.current) return // 스와이프 직후 클릭 이벤트는 무시

    if (isAccepted) {
      onStatusChange('pending')
    } else if (isCustomConfirmed) {
      onStatusChange(hasNoSuggestion ? 'pending' : 'rejected')
    }
  }

  const isActionVisible = hasNoSuggestion ? false : isSwiped

  const displayTitle = isCustomConfirmed
    ? `${originalPart} → ${customValue}`
    : `${originalPart} → ${suggestedPart}`

  const showReasonAndTags = !hasNoSuggestion && !isCustomConfirmed

  return (
    <div
      className='substitution-card'
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div
        className={`substitution-card__content ${isSwiped ? 'substitution-card__content--swiped' : ''} ${isHighlighted ? 'substitution-card__content--accepted' : ''} ${isHighlighted ? 'substitution-card__content--clickable' : ''}`}
        onClick={isHighlighted ? handleCardClick : undefined}
      >
        <p className='substitution-card__title'>{displayTitle}</p>

        {showReasonAndTags && (
          <>
            <p className='substitution-card__reason'>{reason}</p>
            <div className='substitution-card__tags'>
              {tags.map((tag) => (
                <InlineTag key={tag.label} label={tag.label} variant={tag.variant} />
              ))}
            </div>
          </>
        )}

        {isEditable && !isCustomConfirmed && (
          <div className='substitution-card__reject-expand'>
            <input
              type='text'
              className='substitution-card__custom-input'
              placeholder='직접 입력하기'
              value={customValue}
              onChange={(event) => onCustomValueChange(event.target.value)}
              onKeyDown={handleCustomInputKeyDown}
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
