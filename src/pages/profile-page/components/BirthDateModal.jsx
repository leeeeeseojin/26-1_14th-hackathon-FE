import { useState } from 'react';

import './BirthDateModal.css';

const WEEK_DAYS = [
  '일',
  '월',
  '화',
  '수',
  '목',
  '금',
  '토',
];

const BirthDateModal = ({
  value,
  onSelect,
  onClose,
}) => {
  const initialDate = value
    ? new Date(value)
    : new Date(2026, 7, 1);

  const [currentDate, setCurrentDate] =
    useState(initialDate);

  const [selectedDate, setSelectedDate] =
    useState(initialDate);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(
    year,
    month,
    1,
  ).getDay();

  const lastDate = new Date(
    year,
    month + 1,
    0,
  ).getDate();

  const days = [
    ...Array(firstDay).fill(null),
    ...Array.from(
      { length: lastDate },
      (_, index) => index + 1,
    ),
  ];

  const handlePreviousMonth = () => {
    setCurrentDate(
      new Date(year, month - 1, 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(year, month + 1, 1),
    );
  };

  const handleSelectDate = (day) => {
    setSelectedDate(
      new Date(year, month, day),
    );
  };

  const isSelected = (day) => {
    if (!day) {
      return false;
    }

    return (
      selectedDate.getFullYear() === year &&
      selectedDate.getMonth() === month &&
      selectedDate.getDate() === day
    );
  };

  const handleConfirm = () => {
    onSelect(selectedDate);
    onClose();
  };

  return (
    <div
      className="birth-date-modal"
      onClick={onClose}
    >
      <div
        className="birth-date-modal__content"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        <div className="birth-date-modal__handle" />

        <div className="birth-date-modal__header">
          <button
            type="button"
            className="birth-date-modal__arrow"
            onClick={handlePreviousMonth}
          >
            ‹
          </button>

          <h2 className="birth-date-modal__title">
            {year}년 {month + 1}월
          </h2>

          <button
            type="button"
            className="birth-date-modal__arrow"
            onClick={handleNextMonth}
          >
            ›
          </button>
        </div>

        <div className="birth-date-modal__week">
          {WEEK_DAYS.map((day) => (
            <span key={day}>
              {day}
            </span>
          ))}
        </div>

        <div className="birth-date-modal__calendar">
          {days.map((day, index) => (
            <button
              key={`${day}-${index}`}
              type="button"
              disabled={!day}
              className={`birth-date-modal__day ${
                isSelected(day)
                  ? 'birth-date-modal__day--selected'
                  : ''
              }`}
              onClick={() => {
                if (day) {
                  handleSelectDate(day);
                }
              }}
            >
              {day}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="birth-date-modal__confirm"
          onClick={handleConfirm}
        >
          {selectedDate.getMonth() + 1}월{' '}
          {selectedDate.getDate()}일 선택
        </button>
      </div>
    </div>
  );
};

export default BirthDateModal;