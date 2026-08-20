import AxiosInstance from '../../../apis/axiosInstance'

const mapGlucoseTrend = (point) => {
  return {
    date: point.date,
    breakfast: point.breakfastMgDl ?? null,
    lunch: point.lunchMgDl ?? null,
    dinner: point.dinnerMgDl ?? null,
  }
}

export const getDietAnalysis = async ({ from, to }) => {
  const response = await AxiosInstance.get('/api/meal-logs/analysis', {
    params: { from, to },
  })

  const data = response.data ?? {}
  const summary = data.summary ?? {}
  const eatingPattern = data.eatingPattern ?? {}

  return {
    period: data.period ?? { from, to, days: null },
    startDate: data.period?.from ?? from,
    endDate: data.period?.to ?? to,
    summary: {
      averageGlucose: summary.averageGlucoseMgDl ?? null,
      targetRangeRate: summary.targetRangeRatePercent ?? null,
      averageCarb: summary.averageDailyCarbsG ?? null,
      averageCalories: summary.averageDailyCaloriesKcal ?? null,
    },
    mealSourceRatio: {
      homeMealRate: eatingPattern.homeCookedRatePercent ?? 0,
      eatOutDays: eatingPattern.diningOutCount ?? 0,
      diningOutRatePercent: eatingPattern.diningOutRatePercent ?? null,
    },
    glucoseTrend: (data.glucoseTrends ?? []).map(mapGlucoseTrend),
  }
}
