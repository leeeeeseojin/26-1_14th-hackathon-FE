import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ProfileBasicPage from './ProfileBasicPage';
import ProfileHealthPage from './ProfileHealthPage';

import useProfileForm from '../hooks/useProfileForm';

const ProfilePage = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const {
    profileForm,
    handleChange,
  } = useProfileForm();

  const handleNext = () => {
    setStep(2);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      window.scrollTo(0, 0);
      return;
    }

    window.history.back();
  };

  const handleSubmit = () => {
    const profileData = {
      birthDate: profileForm.birthDate,
      height: Number(profileForm.height),
      weight: Number(profileForm.weight),
      gender: profileForm.gender,
      healthGoal: profileForm.healthGoal?.id,
      dailyCarbohydrate: Number(
        profileForm.dailyCarbohydrate,
      ),
      allergies: profileForm.allergies,
      glucoseDevice: profileForm.glucoseDevice,
      vegetarianType:
        profileForm.vegetarianType,
      otherDietRestriction:
        profileForm.otherDietRestriction,
    };

    console.log('프로필 데이터:', profileData);

    navigate('/main');
  };

  if (step === 1) {
    return (
      <ProfileBasicPage
        profileForm={profileForm}
        onChange={handleChange}
        onNext={handleNext}
        onBack={handleBack}
      />
    );
  }

  return (
    <ProfileHealthPage
      profileForm={profileForm}
      onChange={handleChange}
      onBack={handleBack}
      onSubmit={handleSubmit}
    />
  );
};

export default ProfilePage;