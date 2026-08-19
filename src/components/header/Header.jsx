import './Header.css';

const Header = ({
  title,
  showBackButton = true,
  onBack,
  rightContent,
}) => {
  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }

    window.history.back();
  };

  return (
    <header className="header">
      <div className="header__side">
        {showBackButton && (
          <button
            type="button"
            className="header__back-button"
            onClick={handleBack}
            aria-label="뒤로가기"
          >
            ‹
          </button>
        )}
      </div>

      <h1 className="header__title">
        {title}
      </h1>

      <div className="header__side">
        {rightContent}
      </div>
    </header>
  );
};

export default Header;