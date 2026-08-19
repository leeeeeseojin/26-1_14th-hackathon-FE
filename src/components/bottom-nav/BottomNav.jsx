import { useLocation, useNavigate } from "react-router-dom";

import HomeIcon from "../../assets/icon/home-icon.svg";
import RecipeIcon from "../../assets/icon/recipe-icon.svg";
import RecordIcon from "../../assets/icon/record-icon.svg";
import AnalysisIcon from "../../assets/icon/analysis-icon.svg";
import MyPageIcon from "../../assets/icon/mypage-icon.svg";

import "./BottomNav.css";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      label: "홈",
      path: "/main",
      icon: HomeIcon,
    },
    {
      label: "레시피",
      path: "/recipe",
      icon: RecipeIcon,
    },
    {
      label: "기록",
      path: "/record",
      icon: RecordIcon,
    },
    {
      label: "분석",
      path: "/analysis",
      icon: AnalysisIcon,
    },
    {
      label: "마이페이지",
      path: "/mypage",
      icon: MyPageIcon,
    },
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;

        return (
          <button
            key={item.path}
            type="button"
            className={`bottom-nav__item ${
              isActive ? "bottom-nav__item--active" : ""
            }`}
            onClick={() => navigate(item.path)}
          >
            <img
              className="bottom-nav__icon"
              src={item.icon}
              alt=""
            />

            <span className="bottom-nav__label">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;