const formatBirthDate = (value) => {
  if (!value) {
    return null
  }

  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value
  }

  const date = value instanceof Date ? value : new Date(value)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

const getAllergenIds = (allergies) => {
  if (!Array.isArray(allergies)) {
    return []
  }

  return allergies
    .map((allergy) => {
      if (typeof allergy === 'number') {
        return allergy
      }

      return allergy.allergenId ?? allergy.allergen_id ?? allergy.id
    })
    .filter((allergenId) => allergenId != null)
}

export const mapSignupProfile = (profileForm) => {
  const dietaryRestrictionNote = profileForm.otherDietRestriction?.trim()

  return {
    birthDate: formatBirthDate(profileForm.birthDate),
    height: Number(profileForm.height),
    weight: Number(profileForm.weight),
    sex: profileForm.gender,
    healthGoal: profileForm.healthGoal?.id,
    dailyCarbsTarget: Number(profileForm.dailyCarbohydrate),
    glucoseDeviceConnected: Boolean(profileForm.glucoseDevice),
    vegetarianType: profileForm.vegetarianType || 'NONE',
    allergenIds: getAllergenIds(profileForm.allergies),
    dietaryRestrictionNote: dietaryRestrictionNote || undefined,
  }
}
