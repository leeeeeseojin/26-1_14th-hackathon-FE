import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Header from '../../../components/header/Header'
import BottomNav from '../../../components/bottom-nav/BottomNav'

import RecordCoachBanner from '../components/record-coach-banner/RecordCoachBanner'
import MonthCalendar from '../components/month-calendar/MonthCalendar'
import MealRecordCard from '../components/meal-record-card/MealRecordCard'

import { getMealRecord, MEAL_TYPE_ORDER } from '../mocks/mealRecordMock'

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

  const [recordData, setRecordData] = useState(null)
  const [currentMonth, setCurrentMonth] = useState('2026-07')
  const [selectedDate, setSelectedDate] = useState('2026-07-15')
  const [isCalendarCollapsed, setIsCalendarCollapsed] = useState(false)

  useEffect(() => {
    const fetchMealRecord = async () => {
      try {
        const data = await getMealRecord()

        setRecordData(data)
        setCurrentMonth(data.currentMonth)
        setSelectedDate(data.selectedDate)
      } catch (error) {
        console.error('식사 기록 조회 실패:', error)
      }
    }

    fetchMealRecord()
  }, [])

  const selectedMeals = useMemo(() => {
    if (!recordData) {
      return []
    }

    return recordData.meals
      .filter((meal) => meal.date === selectedDate)
      .sort(
        (left, right) =>
          MEAL_TYPE_ORDER[left.mealType] - MEAL_TYPE_ORDER[right.mealType],
      )
  }, [recordData, selectedDate])

  const handleChangeMonth = (offset) => {
    const monthDate = parseMonthKey(currentMonth)
    const nextMonth = new Date(
      monthDate.getFullYear(),
      monthDate.getMonth() + offset,
      1,
    )

    setCurrentMonth(toMonthKey(nextMonth))
  }

  const handleSelectDate = (dateKey) => {
    setSelectedDate(dateKey)
    setCurrentMonth(dateKey.slice(0, 7))
  }

  const handleViewRecipe = (recipeId) => {
    navigate(`/recipe/review?recipeId=${recipeId}`)
  }

  return (
    <div className='meal-record-page'>
      <Header title='식사 기록' showBackButton={false} />

      <div className='meal-record-page__top'>
        <RecordCoachBanner
          title={recordData?.coachTitle ?? ''}
          subtitle={recordData?.coachSubtitle ?? ''}
        />

        <MonthCalendar
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          completedDates={recordData?.completedDates ?? []}
          recordRate={recordData?.recordRate ?? 0}
          changeFromLastWeek={recordData?.changeFromLastWeek ?? 0}
          isCollapsed={isCalendarCollapsed}
          onToggleCollapse={() =>
            setIsCalendarCollapsed((prev) => !prev)
          }
          onChangeMonth={handleChangeMonth}
          onSelectDate={handleSelectDate}
        />
      </div>

      <main className='meal-record-page__meals'>
        <h2 className='meal-record-page__meals-title'>오늘의 식사</h2>

        {selectedMeals.length > 0 ? (
          selectedMeals.map((meal) => (
            <MealRecordCard
              key={meal.id}
              meal={meal}
              onViewRecipe={handleViewRecipe}
            />
          ))
        ) : (
          <p className='meal-record-page__empty'>
            이 날짜에 기록된 식사가 없습니다.
          </p>
        )}
      </main>

      <BottomNav />
    </div>
  )
}

export default MealRecordPage
