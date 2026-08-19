import {
  HEALTH_GOAL_OPTIONS,
} from '../constants/ProfileOptions';

import './HealthGoalModal.css';

const HealthGoalModal = ({
  value,
  onSelect,
  onClose,
}) => {
  const handleSelect = (goal) => {
    onSelect(goal);
    onClose();
  };

  return (
    <div
      className="health-goal-modal"
      onClick={onClose}
    >
      <div
        className="health-goal-modal__content"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        {HEALTH_GOAL_OPTIONS.map((goal) => (
          <button
            key={goal.id}
            type="button"
            className={`health-goal-modal__item ${
              value?.id === goal.id
                ? 'health-goal-modal__item--selected'
                : ''
            }`}
            onClick={() =>
              handleSelect(goal)
            }
          >
            {goal.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HealthGoalModal;