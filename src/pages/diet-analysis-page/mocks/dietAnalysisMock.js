// 식단·혈당 분석 더미 데이터
// 추후 API 연동 시 getDietAnalysis 내부만 실제 응답으로 교체

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

const GLUCOSE_PATTERN = [
  { breakfast: 108, lunch: 121, dinner: 115 },
  { breakfast: 110, lunch: 118, dinner: 122 },
  { breakfast: 105, lunch: 126, dinner: 119 },
  { breakfast: 112, lunch: 120, dinner: 116 },
  { breakfast: 109, lunch: 124, dinner: 113 },
  { breakfast: 111, lunch: 117, dinner: 121 },
  { breakfast: 108, lunch: 121, dinner: 115 },
]

const PRESETS = {
  WEEK: {
    summary: {
      averageGlucose: 112,
      targetRangeRate: 74,
      averageCarb: 58,
      averageCalories: 1840,
    },
    mealSourceRatio: {
      homeMealRate: 86,
      eatOutDays: 1,
    },
    patternOffset: 0,
  },
  TWO_WEEKS: {
    summary: {
      averageGlucose: 116,
      targetRangeRate: 68,
      averageCarb: 61,
      averageCalories: 1910,
    },
    mealSourceRatio: {
      homeMealRate: 79,
      eatOutDays: 3,
    },
    patternOffset: 2,
  },
  MONTH: {
    summary: {
      averageGlucose: 118,
      targetRangeRate: 71,
      averageCarb: 60,
      averageCalories: 1880,
    },
    mealSourceRatio: {
      homeMealRate: 80,
      eatOutDays: 6,
    },
    patternOffset: 4,
  },
}

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

export const getRangeByPeriod = (
  period,
  customStartDate,
  customEndDate,
) => {
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

const enumerateDays = (startDate, endDate) => {
  const days = []
  let cursor = startDate

  while (cursor <= endDate) {
    days.push(cursor)
    cursor = addDays(cursor, 1)
  }

  return days
}

const buildGlucoseTrend = (startDate, endDate, offset) => {
  return enumerateDays(startDate, endDate).map((date, index) => {
    const pattern =
      GLUCOSE_PATTERN[(index + offset) % GLUCOSE_PATTERN.length]

    return {
      date,
      breakfast: pattern.breakfast,
      lunch: pattern.lunch,
      dinner: pattern.dinner,
    }
  })
}

const resolvePresetKey = (period, startDate, endDate) => {
  if (period !== ANALYSIS_PERIOD.CUSTOM) {
    return period
  }

  const dayCount = getDayCount(startDate, endDate)

  if (dayCount <= 7) {
    return ANALYSIS_PERIOD.WEEK
  }

  if (dayCount <= 14) {
    return ANALYSIS_PERIOD.TWO_WEEKS
  }

  return ANALYSIS_PERIOD.MONTH
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

export const getDietAnalysis = async ({
  period = ANALYSIS_PERIOD.WEEK,
  startDate,
  endDate,
} = {}) => {
  const range = getRangeByPeriod(period, startDate, endDate)
  const presetKey = resolvePresetKey(
    period,
    range.startDate,
    range.endDate,
  )
  const preset = PRESETS[presetKey]

  return {
    period,
    startDate: range.startDate,
    endDate: range.endDate,
    summary: preset.summary,
    mealSourceRatio: preset.mealSourceRatio,
    glucoseTrend: buildGlucoseTrend(
      range.startDate,
      range.endDate,
      preset.patternOffset,
    ),
  }
}
