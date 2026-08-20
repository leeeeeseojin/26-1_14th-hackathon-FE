import FormCard from '../../../../components/form-card/FormCard'

import GlucoseLineChart from '../glucose-line-chart/GlucoseLineChart'

import {
  GLUCOSE_TREND_SERIES,
  TARGET_GLUCOSE_MAX,
  TARGET_GLUCOSE_MIN,
} from '../../mocks/dietAnalysisMock'

import './GlucoseTrendCard.css'

const GlucoseTrendCard = ({ periodCaption, points }) => {
  return (
    <FormCard>
      <h3 className='glucose-trend-card__title'>식사별 혈당 추이</h3>

      <div className='glucose-trend-card__chart'>
        <GlucoseLineChart points={points} />

        <div className='glucose-trend-card__meta'>
          <p className='glucose-trend-card__meta-text'>
            목표 범위: {TARGET_GLUCOSE_MIN}–{TARGET_GLUCOSE_MAX} mg/dL
          </p>
          <p className='glucose-trend-card__meta-text'>{periodCaption}</p>
        </div>

        <div className='glucose-trend-card__legend'>
          {GLUCOSE_TREND_SERIES.map((series) => (
            <span key={series.key} className='glucose-trend-card__legend-item'>
              <span
                className='glucose-trend-card__legend-dot'
                style={{ backgroundColor: series.color }}
              />
              {series.label}
            </span>
          ))}
        </div>
      </div>

      <p className='glucose-trend-card__note'>
        ※ 차트는 참고용이며 의료 진단을 대체하지 않습니다.
      </p>
    </FormCard>
  )
}

export default GlucoseTrendCard
