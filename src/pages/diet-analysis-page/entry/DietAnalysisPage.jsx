import { useEffect, useState } from 'react'

import Header from '../../../components/header/Header'
import BottomNav from '../../../components/bottom-nav/BottomNav'
import Section from '../../../components/section/Section'

import PeriodSelector from '../components/period-selector/PeriodSelector'
import DateRangeField from '../components/date-range-field/DateRangeField'
import SummaryMetricsCard from '../components/summary-metrics-card/SummaryMetricsCard'
import MealSourceCard from '../components/meal-source-card/MealSourceCard'
import GlucoseTrendCard from '../components/glucose-trend-card/GlucoseTrendCard'

import getApiErrorMessage from '../../../apis/getApiErrorMessage'
import { getDietAnalysis } from '../apis/DietAnalysisApi'
import {
  ANALYSIS_PERIOD,
  getDayCount,
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
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const fetchAnalysis = async () => {
      setIsLoading(true)
      setErrorMessage('')

      try {
        const data = await getDietAnalysis({
          from: startDate,
          to: endDate,
        })

        setAnalysis(data)
      } catch (error) {
        console.error('식단·혈당 분석 조회 실패:', error)
        setAnalysis(null)
        setErrorMessage(getApiErrorMessage(error))
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnalysis()
  }, [startDate, endDate])

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

  const totalDays = analysis?.period?.days ?? getDayCount(startDate, endDate)

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

        {isLoading ? <p className='diet-analysis-page__status'>분석 결과를 불러오는 중입니다.</p> : null}

        {errorMessage ? <p className='diet-analysis-page__status'>{errorMessage}</p> : null}

        {analysis && !isLoading && !errorMessage ? (
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
              periodCaption={getPeriodCaption(period)}
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
