import CommonButton from '../common-button/CommonButton';
import modi from "../../assets/icon/modi.svg";
import close from "../../assets/icon/close.svg";


import "./SaveSuccessModal.css";

const SaveSuccessModal = ({
  isOpen,
  onClose,
  onView,
}) => {
  if (!isOpen) return null;

  return (
    <div className="save-success-modal">
      <div className="save-success-modal__content">
        <button
          type="button"
          className="save-success-modal__close-button"
          onClick={onClose}
        >
          <img  src={close} alt="닫기 버튼"/>
        </button>

        <img className="save-success-modal__image" src={modi} alt="저장 완료"/>

        <p className="save-success-modal__message">
          레시피가 저장되었습니다! :)
        </p>

        <CommonButton
          className="save-success-modal__view-button"
          onClick={onView}
        >
          보러가기
        </CommonButton>
      </div>
    </div>
  );
};

export default SaveSuccessModal;