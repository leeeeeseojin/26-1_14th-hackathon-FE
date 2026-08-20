import FormCard from '../../../../components/form-card/FormCard'

import DonutChart from '../donut-chart/DonutChart'

import { formatDisplayRange } from '../../mocks/dietAnalysisMock'

import './SummaryMetricsCard.css'

const formatCalories = (value) => {
  return value.toLocaleString('ko-KR')
}

const SummaryMetricsCard = ({ startDate, endDate, summary }) => {
  const metrics = [
    {
      label: '평균 혈당',
      value: `${summary.averageGlucose} mg/dL`,
    },
    {
      label: '목표 범위 내',
      value: `${summary.targetRangeRate}%`,
    },
    {
      label: '평균 탄수화물',
      value: `${summary.averageCarb}g`,
    },
    {
      label: '평균 칼로리',
      value: `${formatCalories(summary.averageCalories)} kcal`,
    },
  ]

  return (
    <FormCard>
      <div className='summary-metrics-card__head'>
        <h3 className='summary-metrics-card__title'>핵심 지표 요약</h3>
        <p className='summary-metrics-card__range'>
          {formatDisplayRange(startDate, endDate)}
        </p>
      </div>

      <DonutChart rate={summary.targetRangeRate} />

      <div className='summary-metrics-card__metrics'>
        {metrics.map((metric) => (
          <div key={metric.label} className='summary-metrics-card__metric'>
            <p className='summary-metrics-card__metric-label'>{metric.label}</p>
            <p className='summary-metrics-card__metric-value'>{metric.value}</p>
          </div>
        ))}
      </div>

      <p className='summary-metrics-card__note'>
        ※ 이 수치는 참고용입니다. 정확한 혈당 해석은 의료진과 상담하세요.
      </p>
    </FormCard>
  )
}

export default SummaryMetricsCard
