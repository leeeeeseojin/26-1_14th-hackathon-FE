import { useNavigate } from "react-router-dom";

import "./RecordSelectModal.css";

const RecordSelectModal = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();

  if (!isOpen) {
    return null;
  }

  const handleNavigate = (path) => {
    onClose();
    navigate(path);
  };

  return (
    <div
      className="record-select-modal"
      onClick={onClose}
    >
      <div
        className="record-select-modal__content"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="record-select-modal__button"
          onClick={() =>
            handleNavigate("/blood-sugar")
          }
        >
          혈당 입력하기
        </button>

        <button
          type="button"
          className="record-select-modal__button"
          onClick={() =>
            handleNavigate("/eatout")
          }
        >
          외식 기록
        </button>

        <button
          type="button"
          className="record-select-modal__button"
          onClick={() =>
            handleNavigate("/recipe/input")
          }
        >
          레시피
        </button>
      </div>
    </div>
  );
};

export default RecordSelectModal;