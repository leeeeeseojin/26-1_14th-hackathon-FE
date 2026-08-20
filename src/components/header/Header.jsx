import './Header.css'
import chevronLeft from '../../assets/icon/chevron-left.svg'

const Header = ({
  title,
  subtitle,
  titleSize = 20,
  showBackButton = true,
  onBack,
  rightContent,
}) => {
  const handleBack = () => {
    if (onBack) {
      onBack()
      return
    }
    window.history.back()
  }

  return (
    <header className={`header ${subtitle ? 'header--with-subtitle' : ''}`}>
      <div className='header__side'>
        {showBackButton && (
          <button
            type='button'
            className='header__back-button'
            onClick={handleBack}
            aria-label='뒤로가기'
          >
            <img src={chevronLeft} alt='' className='header__back-icon' />
          </button>
        )}
      </div>

      <div className='header__title-group'>
        <h1 className='header__title' style={{ fontSize: `${titleSize}px` }}>
          {title}
        </h1>
        {subtitle && <p className='header__subtitle'>{subtitle}</p>}
      </div>

      <div className='header__side'>{rightContent}</div>
    </header>
  )
}

export default Header
