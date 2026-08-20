import RecordMemoBar from '../record-memo-bar/RecordMemoBar'

import './MonthCalendar.css'

const WEEK_DAYS = ['일', '월', '화', '수', '목', '금', '토']

const toDateKey = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

const parseDateKey = (dateKey) => {
  const [year, month, day] = dateKey.split('-').map(Number)

  return new Date(year, month - 1, day)
}

const getCalendarCells = (year, month) => {
  const firstDay = new Date(year, month, 1).getDay()
  const lastDate = new Date(year, month + 1, 0).getDate()
  const prevLastDate = new Date(year, month, 0).getDate()

  const cells = []

  for (let index = 0; index < firstDay; index += 1) {
    const day = prevLastDate - firstDay + 1 + index
    const date = new Date(year, month - 1, day)

    cells.push({
      key: toDateKey(date),
      day,
      isCurrentMonth: false,
    })
  }

  for (let day = 1; day <= lastDate; day += 1) {
    const date = new Date(year, month, day)

    cells.push({
      key: toDateKey(date),
      day,
      isCurrentMonth: true,
    })
  }

  const nextDays = 42 - cells.length

  for (let day = 1; day <= nextDays; day += 1) {
    const date = new Date(year, month + 1, day)

    cells.push({
      key: toDateKey(date),
      day,
      isCurrentMonth: false,
    })
  }

  return cells
}

const MonthCalendar = ({
  currentMonth,
  selectedDate,
  completedDates,
  recordRate,
  changeFromLastWeek,
  isCollapsed,
  onToggleCollapse,
  onChangeMonth,
  onSelectDate,
}) => {
  const monthDate = parseDateKey(`${currentMonth}-01`)
  const year = monthDate.getFullYear()
  const month = monthDate.getMonth()
  const cells = getCalendarCells(year, month)
  const completedDateSet = new Set(completedDates)

  const selectedWeekStart = cells.findIndex((cell) => cell.key === selectedDate)
  const collapsedWeekStart =
    selectedWeekStart >= 0 ? Math.floor(selectedWeekStart / 7) * 7 : 0
  const visibleCells = isCollapsed
    ? cells.slice(collapsedWeekStart, collapsedWeekStart + 7)
    : cells

  return (
    <section className='month-calendar'>
      <div className='month-calendar__header'>
        <div className='month-calendar__month'>
          <button
            type='button'
            className='month-calendar__nav'
            onClick={() => onChangeMonth(-1)}
            aria-label='이전 달'
          >
            ‹
          </button>

          <p className='month-calendar__month-label'>
            {year}년 {month + 1}월
          </p>

          <button
            type='button'
            className='month-calendar__nav'
            onClick={() => onChangeMonth(1)}
            aria-label='다음 달'
          >
            ›
          </button>
        </div>

        <button
          type='button'
          className='month-calendar__toggle'
          onClick={onToggleCollapse}
        >
          {isCollapsed ? '달력 펼치기' : '달력 접기'}
        </button>
      </div>

      <div className='month-calendar__body'>
        <div className='month-calendar__weekdays'>
          {WEEK_DAYS.map((weekday) => (
            <span
              key={weekday}
              className={`month-calendar__weekday ${
                weekday === '일' ? 'month-calendar__weekday--sunday' : ''
              }`}
            >
              {weekday}
            </span>
          ))}
        </div>

        <div className='month-calendar__grid'>
          {visibleCells.map((cell) => {
            const isSelected = cell.key === selectedDate
            const isCompleted = completedDateSet.has(cell.key)

            return (
              <button
                key={cell.key}
                type='button'
                className={`month-calendar__day ${
                  cell.isCurrentMonth
                    ? ''
                    : 'month-calendar__day--outside'
                } ${isSelected ? 'month-calendar__day--selected' : ''}`}
                aria-current={isSelected ? 'date' : undefined}
                onClick={() => onSelectDate(cell.key)}
              >
                <span className='month-calendar__day-number'>{cell.day}</span>
                {isCompleted ? <span className='month-calendar__dot' /> : null}
              </button>
            )
          })}
        </div>
      </div>

      <div className='month-calendar__footer'>
        <div className='month-calendar__legend'>
          <span className='month-calendar__legend-dot' />
          <span className='month-calendar__legend-label'>식사 기록 완료</span>
        </div>

        <RecordMemoBar
          recordRate={recordRate}
          changeFromLastWeek={changeFromLastWeek}
        />
      </div>
    </section>
  )
}

export default MonthCalendar
