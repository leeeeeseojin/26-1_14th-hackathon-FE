import './DonutChart.css'

const SIZE = 163
const STROKE_WIDTH = 28
const RADIUS = (SIZE - STROKE_WIDTH) / 2
const CENTER = SIZE / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

const DonutChart = ({ rate }) => {
  const clampedRate = Math.min(100, Math.max(0, rate))
  const dashOffset = CIRCUMFERENCE * (1 - clampedRate / 100)

  return (
    <div className='donut-chart'>
      <svg
        className='donut-chart__svg'
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        aria-hidden='true'
      >
        <circle
          className='donut-chart__track'
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill='none'
          strokeWidth={STROKE_WIDTH}
        />
        <circle
          className='donut-chart__value'
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill='none'
          strokeWidth={STROKE_WIDTH}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
          transform={`rotate(-90 ${CENTER} ${CENTER})`}
        />
      </svg>

      <div className='donut-chart__center'>
        <p className='donut-chart__percent'>{clampedRate}%</p>
        <p className='donut-chart__caption'>목표 범위 내</p>
      </div>
    </div>
  )
}

export default DonutChart
