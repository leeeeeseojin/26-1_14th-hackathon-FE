import './CommonButton.css';

const CommonButton = ({
  children,
  type = 'button',
  onClick,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      className="common-button"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default CommonButton;