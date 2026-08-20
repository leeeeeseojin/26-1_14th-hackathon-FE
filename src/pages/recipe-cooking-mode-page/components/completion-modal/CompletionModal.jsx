import { useNavigate } from 'react-router-dom'

import completionIllustration from '../../../../assets/cooking-flow/completion-illustration.svg'
import closeIcon from '../../../../assets/cooking-flow/close-icon.svg'

import './CompletionModal.css'

export default function CompletionModal({ onClose }) {
  const navigate = useNavigate()

  const handleRecordMeal = () => {
    navigate('/record')
  }

  const handleGoHome = () => {
    navigate('/main')
  }

  return (
    <div className='completion-modal-overlay'>
      <div className='completion-modal'>
        <button
          type='button'
          className='completion-modal__close'
          onClick={onClose}
          aria-label='닫기'
        >
          <img src={closeIcon} alt='' className='completion-modal__close-icon' />
        </button>

        <img src={completionIllustration} alt='' className='completion-modal__illustration' />

        <p className='completion-modal__title'>식사를 완성하였어요!</p>
        <p className='completion-modal__subtitle'>맛있는 식사 시간 되세요!</p>

        <div className='completion-modal__actions'>
          <button
            type='button'
            className='completion-modal__record-button'
            onClick={handleRecordMeal}
          >
            식사 기록하기
          </button>
          <button type='button' className='completion-modal__home-button' onClick={handleGoHome}>
            홈으로
          </button>
        </div>
      </div>
    </div>
  )
}
