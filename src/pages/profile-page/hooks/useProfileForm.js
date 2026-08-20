import { useState } from 'react';

const initialProfileForm = {
  birthDate: null,
  height: '',
  weight: '',
  gender: '',
  healthGoal: null,
  dailyCarbohydrate: '',
  allergies: [],
  glucoseDevice: false,
  vegetarianType: 'NONE',
  otherDietRestriction: '',
};

const useProfileForm = () => {
  const [profileForm, setProfileForm] = useState(initialProfileForm);

  const handleChange = (name, value) => {
    setProfileForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return {
    profileForm,
    handleChange,
  };
};

export default useProfileForm;