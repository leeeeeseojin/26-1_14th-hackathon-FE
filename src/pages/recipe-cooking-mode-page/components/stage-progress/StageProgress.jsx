import './StageProgress.css'

const STATUS = {
  DONE: 'done',
  ACTIVE: 'active',
  UPCOMING: 'upcoming',
}

function getStageStatus(stepIndex, currentIndex) {
  if (stepIndex < currentIndex) return STATUS.DONE
  if (stepIndex === currentIndex) return STATUS.ACTIVE
  return STATUS.UPCOMING
}

export default function StageProgress({ steps, currentIndex, remainingMinutes }) {
  const progressPercent = steps.length <= 1 ? 0 : (currentIndex / (steps.length - 1)) * 100

  return (
    <div className='stage-progress'>
      <div className='stage-progress__header'>
        <p className='stage-progress__label'>
          {currentIndex + 1}/{steps.length} 단계
        </p>
        <p className='stage-progress__remaining'>약 {remainingMinutes}분 남음</p>
      </div>

      <div className='stage-progress__track'>
        <div className='stage-progress__fill' style={{ width: `${progressPercent}%` }} />
      </div>

      <div className='stage-progress__stages'>
        {steps.map((step, index) => {
          const status = getStageStatus(index, currentIndex)
          return (
            <div key={step.id} className={`stage-progress__stage stage-progress__stage--${status}`}>
              <div className='stage-progress__num'>{status === STATUS.DONE ? '✓' : index + 1}</div>
              <p className='stage-progress__name'>{step.name}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
