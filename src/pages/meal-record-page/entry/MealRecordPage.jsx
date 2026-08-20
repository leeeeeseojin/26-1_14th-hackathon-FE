import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Header from '../../../components/header/Header'
import BottomNav from '../../../components/bottom-nav/BottomNav'

import RecordCoachBanner from '../components/record-coach-banner/RecordCoachBanner'
import MonthCalendar from '../components/month-calendar/MonthCalendar'
import MealRecordCard from '../components/meal-record-card/MealRecordCard'

import getApiErrorMessage from '../../../apis/getApiErrorMessage'
import { getMealLogsByDate } from '../apis/MealRecordApi'
import { MEAL_TYPE_ORDER, MOCK_MEAL_RECORD_UI } from '../mocks/mealRecordMock'

import './MealRecordPage.css'

const toMonthKey = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')

  return `${year}-${month}`
}

const parseMonthKey = (monthKey) => {
  const [year, month] = monthKey.split('-').map(Number)

  return new Date(year, month - 1, 1)
}

const MealRecordPage = () => {
  const navigate = useNavigate()

  const [currentMonth, setCurrentMonth] = useState(MOCK_MEAL_RECORD_UI.currentMonth)
  const [selectedDate, setSelectedDate] = useState(MOCK_MEAL_RECORD_UI.selectedDate)
  const [isCalendarCollapsed, setIsCalendarCollapsed] = useState(false)
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const fetchMealLogs = async () => {
      setIsLoading(true)
      setErrorMessage('')

      try {
        const data = await getMealLogsByDate(selectedDate)
        setMeals(data.meals ?? [])
      } catch (error) {
        console.error('식사 기록 조회 실패:', error)
        setMeals([])
        setErrorMessage(getApiErrorMessage(error))
      } finally {
        setIsLoading(false)
      }
    }

    fetchMealLogs()
  }, [selectedDate])

  const selectedMeals = useMemo(() => {
    return [...meals].sort(
      (left, right) => MEAL_TYPE_ORDER[left.mealType] - MEAL_TYPE_ORDER[right.mealType],
    )
  }, [meals])

  const handleChangeMonth = (offset) => {
    const monthDate = parseMonthKey(currentMonth)
    const nextMonth = new Date(monthDate.getFullYear(), monthDate.getMonth() + offset, 1)

    setCurrentMonth(toMonthKey(nextMonth))
  }

  const handleSelectDate = (dateKey) => {
    setSelectedDate(dateKey)
    setCurrentMonth(dateKey.slice(0, 7))
  }

  const handleViewRecipe = (recipeId) => {
    navigate(`/recipe/review?recipeId=${recipeId}`)
  }

  const renderMeals = () => {
    if (isLoading) {
      return <p className='meal-record-page__empty'>식사 기록을 불러오는 중입니다.</p>
    }

    if (errorMessage) {
      return <p className='meal-record-page__empty'>{errorMessage}</p>
    }

    if (selectedMeals.length === 0) {
      return <p className='meal-record-page__empty'>이 날짜에 기록된 식사가 없습니다.</p>
    }

    return selectedMeals.map((meal) => (
      <MealRecordCard key={meal.id} meal={meal} onViewRecipe={handleViewRecipe} />
    ))
  }

  return (
    <div className='meal-record-page'>
      <Header title='식사 기록' showBackButton={false} />

      <div className='meal-record-page__top'>
        <RecordCoachBanner
          title={MOCK_MEAL_RECORD_UI.coachTitle}
          subtitle={MOCK_MEAL_RECORD_UI.coachSubtitle}
        />

        <MonthCalendar
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          completedDates={MOCK_MEAL_RECORD_UI.completedDates}
          recordRate={MOCK_MEAL_RECORD_UI.recordRate}
          changeFromLastWeek={MOCK_MEAL_RECORD_UI.changeFromLastWeek}
          isCollapsed={isCalendarCollapsed}
          onToggleCollapse={() => setIsCalendarCollapsed((prev) => !prev)}
          onChangeMonth={handleChangeMonth}
          onSelectDate={handleSelectDate}
        />
      </div>

      <main className='meal-record-page__meals'>
        <h2 className='meal-record-page__meals-title'>오늘의 식사</h2>
        {renderMeals()}
      </main>

      <BottomNav />
    </div>
  )
}

export default MealRecordPage
