import { useEffect, useState } from 'react'

import Header from '../../../components/header/Header'
import BottomNav from '../../../components/bottom-nav/BottomNav'
import Section from '../../../components/section/Section'

import PeriodSelector from '../components/period-selector/PeriodSelector'
import DateRangeField from '../components/date-range-field/DateRangeField'
import SummaryMetricsCard from '../components/summary-metrics-card/SummaryMetricsCard'
import MealSourceCard from '../components/meal-source-card/MealSourceCard'
import GlucoseTrendCard from '../components/glucose-trend-card/GlucoseTrendCard'

import {
  ANALYSIS_PERIOD,
  getDayCount,
  getDietAnalysis,
  getPeriodCaption,
  getRangeByPeriod,
} from '../mocks/dietAnalysisMock'

import './DietAnalysisPage.css'

const INITIAL_RANGE = getRangeByPeriod(ANALYSIS_PERIOD.WEEK)

const DietAnalysisPage = () => {
  const [period, setPeriod] = useState(ANALYSIS_PERIOD.WEEK)
  const [startDate, setStartDate] = useState(INITIAL_RANGE.startDate)
  const [endDate, setEndDate] = useState(INITIAL_RANGE.endDate)
  const [analysis, setAnalysis] = useState(null)

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const data = await getDietAnalysis({
          period,
          startDate,
          endDate,
        })

        setAnalysis(data)
      } catch (error) {
        console.error('식단·혈당 분석 조회 실패:', error)
      }
    }

    fetchAnalysis()
  }, [period, startDate, endDate])

  const handlePeriodChange = (nextPeriod) => {
    setPeriod(nextPeriod)

    if (nextPeriod === ANALYSIS_PERIOD.CUSTOM) {
      return
    }

    const nextRange = getRangeByPeriod(nextPeriod)

    setStartDate(nextRange.startDate)
    setEndDate(nextRange.endDate)
  }

  const handleChangeStart = (nextStartDate) => {
    setStartDate(nextStartDate)

    if (nextStartDate > endDate) {
      setEndDate(nextStartDate)
    }
  }

  const handleChangeEnd = (nextEndDate) => {
    setEndDate(nextEndDate)

    if (nextEndDate < startDate) {
      setStartDate(nextEndDate)
    }
  }

  const totalDays = getDayCount(startDate, endDate)

  return (
    <div className='diet-analysis-page'>
      <Header title='식단·혈당 분석' showBackButton={false} />

      <main className='diet-analysis-page__content'>
        <Section title='식단·혈당 분석'>
          <div className='diet-analysis-page__controls'>
            <PeriodSelector value={period} onChange={handlePeriodChange} />

            <DateRangeField
              startDate={startDate}
              endDate={endDate}
              disabled={period !== ANALYSIS_PERIOD.CUSTOM}
              onChangeStart={handleChangeStart}
              onChangeEnd={handleChangeEnd}
            />
          </div>
        </Section>

        {analysis ? (
          <div className='diet-analysis-page__cards'>
            <SummaryMetricsCard
              startDate={analysis.startDate}
              endDate={analysis.endDate}
              summary={analysis.summary}
            />

            <MealSourceCard
              homeMealRate={analysis.mealSourceRatio.homeMealRate}
              eatOutDays={analysis.mealSourceRatio.eatOutDays}
              totalDays={totalDays}
            />

            <GlucoseTrendCard
              periodCaption={getPeriodCaption(analysis.period)}
              points={analysis.glucoseTrend}
            />
          </div>
        ) : null}
      </main>

      <BottomNav />
    </div>
  )
}

export default DietAnalysisPage
