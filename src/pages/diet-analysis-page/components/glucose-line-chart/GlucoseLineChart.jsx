import {
  GLUCOSE_TREND_SERIES,
  TARGET_GLUCOSE_MAX,
  TARGET_GLUCOSE_MIN,
} from '../../mocks/dietAnalysisMock'

import './GlucoseLineChart.css'

const VIEW_WIDTH = 320
const VIEW_HEIGHT = 180
const PADDING = {
  top: 16,
  right: 8,
  bottom: 16,
  left: 8,
}

const Y_MIN = 50
const Y_MAX = 170

const getX = (index, count) => {
  if (count <= 1) {
    return PADDING.left
  }

  const chartWidth = VIEW_WIDTH - PADDING.left - PADDING.right

  return PADDING.left + (index / (count - 1)) * chartWidth
}

const getY = (value) => {
  const chartHeight = VIEW_HEIGHT - PADDING.top - PADDING.bottom
  const ratio = (value - Y_MIN) / (Y_MAX - Y_MIN)

  return PADDING.top + (1 - ratio) * chartHeight
}

const toSegmentStrings = (values) => {
  const segments = []
  let current = []

  values.forEach((value, index) => {
    if (value == null) {
      if (current.length > 0) {
        segments.push(current)
        current = []
      }
      return
    }

    current.push(`${getX(index, values.length)},${getY(value)}`)
  })

  if (current.length > 0) {
    segments.push(current)
  }

  return segments.map((segment) => segment.join(' '))
}

const GlucoseLineChart = ({ points }) => {
  if (!points.length) {
    return (
      <div className='glucose-line-chart glucose-line-chart--empty'>
        표시할 혈당 데이터가 없습니다.
      </div>
    )
  }

  const bandY = getY(TARGET_GLUCOSE_MAX)
  const bandHeight = getY(TARGET_GLUCOSE_MIN) - bandY

  return (
    <div className='glucose-line-chart'>
      <svg
        className='glucose-line-chart__svg'
        viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
        preserveAspectRatio='none'
        role='img'
        aria-label='식사별 혈당 추이 라인 차트'
      >
        <rect
          className='glucose-line-chart__band'
          x={PADDING.left}
          y={bandY}
          width={VIEW_WIDTH - PADDING.left - PADDING.right}
          height={bandHeight}
        />

        {GLUCOSE_TREND_SERIES.map((series) => {
          const values = points.map((point) => point[series.key])

          return toSegmentStrings(values).map((segment, index) => (
            <polyline
              key={`${series.key}-${index}`}
              className='glucose-line-chart__line'
              fill='none'
              stroke={series.color}
              points={segment}
            />
          ))
        })}
      </svg>
    </div>
  )
}

export default GlucoseLineChart
