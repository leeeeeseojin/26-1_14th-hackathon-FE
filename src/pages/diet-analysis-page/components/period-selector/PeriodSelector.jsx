import { ANALYSIS_PERIOD_OPTIONS } from '../../mocks/dietAnalysisMock'

import './PeriodSelector.css'

const PeriodSelector = ({ value, onChange }) => {
  return (
    <div className='period-selector'>
      <p className='period-selector__label'>분석 기간</p>

      <div className='period-selector__list' role='tablist'>
        {ANALYSIS_PERIOD_OPTIONS.map((option) => {
          const isActive = option.id === value

          return (
            <button
              key={option.id}
              type='button'
              role='tab'
              aria-selected={isActive}
              className={`period-selector__item ${
                isActive ? 'period-selector__item--active' : ''
              }`}
              onClick={() => onChange(option.id)}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default PeriodSelector
