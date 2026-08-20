import { useLocation, useNavigate } from 'react-router-dom'

// 아이콘 import
import HomeDefault from '../../assets/nav/home-default.svg'
import HomeActive from '../../assets/nav/home-active.svg'
import RecipeDefault from '../../assets/nav/recipe-default.svg'
import RecipeActive from '../../assets/nav/recipe-active.svg'
import RecordDefault from '../../assets/nav/record-default.svg'
import RecordActive from '../../assets/nav/record-active.svg'
import AnalysisDefault from '../../assets/nav/analysis-default.svg'
import AnalysisActive from '../../assets/nav/analysis-active.svg'
import MyPageDefault from '../../assets/nav/mypage-default.svg'
import MyPageActive from '../../assets/nav/mypage-active.svg'

import './BottomNav.css'

const BottomNavBar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    { label: '홈', path: '/main', defaultIcon: HomeDefault, activeIcon: HomeActive },
    { label: '레시피', path: '/recipe', defaultIcon: RecipeDefault, activeIcon: RecipeActive },
    { label: '기록', path: '/record', defaultIcon: RecordDefault, activeIcon: RecordActive },
    { label: '분석', path: '/analysis', defaultIcon: AnalysisDefault, activeIcon: AnalysisActive },
    { label: '마이페이지', path: '/mypage', defaultIcon: MyPageDefault, activeIcon: MyPageActive },
  ]

  return (
    <nav className='bottom-nav-bar'>
      {navItems.map((item) => {
        const isActive = location.pathname.startsWith(item.path)

        return (
          <button
            key={item.path}
            type='button'
            className={`bottom-nav-bar__item ${isActive ? 'bottom-nav-bar__item--active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <img
              className='bottom-nav-bar__icon'
              src={isActive ? item.activeIcon : item.defaultIcon}
              alt={item.label}
            />
            <span className='bottom-nav-bar__label'>{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}

export default BottomNavBar
