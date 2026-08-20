import { useState } from 'react';

import calendarIcon from '../../../assets/icon/calendar.svg';
import Header from '../../../components/header/Header';
import CommonButton from '../../../components/common-button/CommonButton';
import FormField from '../../../components/form-field/FormField';
import FormCard from '../../../components/form-card/FormCard';
import Section from '../../../components/section/Section';
import NoticeBox from '../../../components/notice-box/NoticeBox';

import BirthDateModal from '../components/BirthDateModal';
import HealthGoalModal from '../components/HealthGoalModal';

import {
  GENDER_OPTIONS,
} from '../constants/ProfileOptions';

import './ProfileBasicPage.css';

const ProfileBasicPage = ({
  profileForm,
  onChange,
  onNext,
  onBack,
}) => {
  const [
    isBirthDateModalOpen,
    setIsBirthDateModalOpen,
  ] = useState(false);

  const [
    isHealthGoalModalOpen,
    setIsHealthGoalModalOpen,
  ] = useState(false);

  const formatBirthDate = (date) => {
    if (!date) {
      return '2026.08.01';
    }

    const targetDate = new Date(date);

    const year = targetDate.getFullYear();
    const month = String(
      targetDate.getMonth() + 1,
    ).padStart(2, '0');
    const day = String(
      targetDate.getDate(),
    ).padStart(2, '0');

    return `${year}.${month}.${day}`;
  };

  return (
    <main className="profile-basic-page">
      <Header
        title="기본정보 입력"
        onBack={onBack}
      />

      <div className="profile-basic-page__content">
        <Section title="기본 신체 정보">
          <FormCard>
            <FormField label="생년월일">
              <button
                type="button"
                className="profile-basic-page__input-button"
                onClick={() =>
                  setIsBirthDateModalOpen(true)
                }
              >
                <span>
                  {formatBirthDate(
                    profileForm.birthDate,
                  )}
                </span>

                <img src={calendarIcon} alt="달력" className="profile-basic-page__calendar-icon"/>
              </button>
            </FormField>

            <div className="profile-basic-page__row">
              <FormField
                label="키 (cm)"
                htmlFor="height"
              >
                <input
                  id="height"
                  type="number"
                  className="profile-basic-page__input"
                  placeholder="164"
                  value={profileForm.height}
                  onChange={(event) =>
                    onChange(
                      'height',
                      event.target.value,
                    )
                  }
                />
              </FormField>

              <FormField
                label="체중 (kg)"
                htmlFor="weight"
              >
                <input
                  id="weight"
                  type="number"
                  className="profile-basic-page__input"
                  placeholder="57"
                  value={profileForm.weight}
                  onChange={(event) =>
                    onChange(
                      'weight',
                      event.target.value,
                    )
                  }
                />
              </FormField>
            </div>

            <FormField label="성별">
              <div className="profile-basic-page__gender-list">
                {GENDER_OPTIONS.map((gender) => (
                  <button
                    key={gender.id}
                    type="button"
                    className={`profile-basic-page__gender-button ${
                      profileForm.gender === gender.id
                        ? 'profile-basic-page__gender-button--selected'
                        : ''
                    }`}
                    onClick={() =>
                      onChange(
                        'gender',
                        gender.id,
                      )
                    }
                  >
                    {gender.label}
                  </button>
                ))}
              </div>
            </FormField>
          </FormCard>
        </Section>

        <Section title="건강 목표">
          <FormCard>
            <FormField label="주요 건강 목표">
              <button
                type="button"
                className="profile-basic-page__input-button"
                onClick={() =>
                  setIsHealthGoalModalOpen(true)
                }
              >
                {profileForm.healthGoal?.label ??
                  '혈당 안정'}
              </button>
            </FormField>

            <FormField
              label="하루 목표 탄수화물 (g)"
              htmlFor="daily-carbohydrate"
            >
              <input
                id="daily-carbohydrate"
                type="number"
                className="profile-basic-page__input"
                placeholder="180"
                value={
                  profileForm.dailyCarbohydrate
                }
                onChange={(event) =>
                  onChange(
                    'dailyCarbohydrate',
                    event.target.value,
                  )
                }
              />
            </FormField>
          </FormCard>
        </Section>

        <NoticeBox>
          입력하신 정보는 맞춤 식단 제안에만 활용되며, 의료적 진단이나 처방
을 대체하지 않습니다. 정확한 건강 관리는 의료진과 상담하세요.
        </NoticeBox>
      </div>

      <div className="profile-basic-page__bottom">
        <CommonButton onClick={onNext}>
          다음
        </CommonButton>
      </div>

      {isBirthDateModalOpen && (
        <BirthDateModal
          value={profileForm.birthDate}
          onSelect={(date) =>
            onChange('birthDate', date)
          }
          onClose={() =>
            setIsBirthDateModalOpen(false)
          }
        />
      )}

      {isHealthGoalModalOpen && (
        <HealthGoalModal
          value={profileForm.healthGoal}
          onSelect={(goal) =>
            onChange('healthGoal', goal)
          }
          onClose={() =>
            setIsHealthGoalModalOpen(false)
          }
        />
      )}
    </main>
  );
};

export default ProfileBasicPage;