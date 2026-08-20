export const ANALYSIS_PERIOD = {
  WEEK: 'WEEK',
  TWO_WEEKS: 'TWO_WEEKS',
  MONTH: 'MONTH',
  CUSTOM: 'CUSTOM',
}

export const ANALYSIS_PERIOD_OPTIONS = [
  { id: ANALYSIS_PERIOD.WEEK, label: '1주' },
  { id: ANALYSIS_PERIOD.TWO_WEEKS, label: '2주' },
  { id: ANALYSIS_PERIOD.MONTH, label: '1개월' },
  { id: ANALYSIS_PERIOD.CUSTOM, label: '직접 입력' },
]

export const TARGET_GLUCOSE_MIN = 70
export const TARGET_GLUCOSE_MAX = 140

export const GLUCOSE_TREND_SERIES = [
  { key: 'breakfast', label: '아침', color: '#55b89a' },
  { key: 'lunch', label: '점심', color: '#3d8f76' },
  { key: 'dinner', label: '저녁', color: '#ffb56b' },
]

const REFERENCE_END_DATE = '2026-07-15'

const parseDateKey = (dateKey) => {
  const [year, month, day] = dateKey.split('-').map(Number)

  return new Date(year, month - 1, day)
}

const toDateKey = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

const addDays = (dateKey, amount) => {
  const date = parseDateKey(dateKey)
  date.setDate(date.getDate() + amount)

  return toDateKey(date)
}

export const getDayCount = (startDate, endDate) => {
  const start = parseDateKey(startDate)
  const end = parseDateKey(endDate)
  const diff = Math.round((end.getTime() - start.getTime()) / 86400000)

  return Math.max(1, diff + 1)
}

export const formatDisplayDate = (dateKey) => {
  const [year, month, day] = dateKey.split('-').map(Number)

  return `${year}.${month}.${day}`
}

export const formatDisplayRange = (startDate, endDate) => {
  return `${formatDisplayDate(startDate)}. ~ ${formatDisplayDate(endDate)}`
}

export const getRangeByPeriod = (period, customStartDate, customEndDate) => {
  if (period === ANALYSIS_PERIOD.WEEK) {
    return {
      startDate: addDays(REFERENCE_END_DATE, -6),
      endDate: REFERENCE_END_DATE,
    }
  }

  if (period === ANALYSIS_PERIOD.TWO_WEEKS) {
    return {
      startDate: addDays(REFERENCE_END_DATE, -13),
      endDate: REFERENCE_END_DATE,
    }
  }

  if (period === ANALYSIS_PERIOD.MONTH) {
    return {
      startDate: addDays(REFERENCE_END_DATE, -29),
      endDate: REFERENCE_END_DATE,
    }
  }

  return {
    startDate: customStartDate ?? addDays(REFERENCE_END_DATE, -6),
    endDate: customEndDate ?? REFERENCE_END_DATE,
  }
}

export const getPeriodCaption = (period) => {
  if (period === ANALYSIS_PERIOD.WEEK) {
    return '최근 7일'
  }

  if (period === ANALYSIS_PERIOD.TWO_WEEKS) {
    return '최근 14일'
  }

  if (period === ANALYSIS_PERIOD.MONTH) {
    return '최근 1개월'
  }

  return '직접 입력'
}
