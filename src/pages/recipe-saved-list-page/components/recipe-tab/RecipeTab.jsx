import './RecipeTab.css'

const RecipeTab = ({ activeTab, onChange, tabs }) => {
  return (
    <div className='recipe-tab' role='tablist'>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab

        return (
          <button
            key={tab.id}
            type='button'
            role='tab'
            aria-selected={isActive}
            className={`recipe-tab__item ${
              isActive ? 'recipe-tab__item--active' : ''
            }`}
            onClick={() => onChange(tab.id)}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}

export default RecipeTab
