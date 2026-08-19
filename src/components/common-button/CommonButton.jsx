import './CommonButton.css'

const CommonButton = ({
  children,
  type = 'button',
  weight = 'bold',
  onClick,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      className={`common-button common-button--${weight}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default CommonButton
