import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Header from '../../../components/header/Header'
import BottomNav from '../../../components/bottom-nav/BottomNav'

import RecipeTab from '../components/recipe-tab/RecipeTab'
import RecipeSearchField from '../components/recipe-search-field/RecipeSearchField'
import RecipeListItem from '../components/recipe-list-item/RecipeListItem'

import {
  RECIPE_STATUS,
  getRecipeSavedList,
} from '../mocks/recipeSavedListMock'

import './RecipeSavedListPage.css'

const TABS = [
  {
    id: RECIPE_STATUS.ORIGINAL,
    label: '레시피',
    title: '저장된 레시피',
    description: '저장된 원본 레시피입니다',
  },
  {
    id: RECIPE_STATUS.COMPLETED,
    label: '완료',
    title: '완료된 레시피',
    description: '완료된 개인화 레시피입니다',
  },
]

const RecipeSavedListPage = () => {
  const navigate = useNavigate()

  const [recipes, setRecipes] = useState([])
  const [activeTab, setActiveTab] = useState(RECIPE_STATUS.ORIGINAL)
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getRecipeSavedList()
        setRecipes(data?.items ?? [])
      } catch (error) {
        console.error('레시피 저장 리스트 조회 실패:', error)
      }
    }

    fetchRecipes()
  }, [])

  const activeTabInfo = TABS.find((tab) => tab.id === activeTab) ?? TABS[0]

  const filteredRecipes = useMemo(() => {
    const trimmedKeyword = keyword.trim()

    return recipes.filter((recipe) => {
      const isCurrentTab = recipe.status === activeTab

      if (!isCurrentTab) {
        return false
      }

      if (!trimmedKeyword) {
        return true
      }

      return recipe.title.includes(trimmedKeyword)
    })
  }, [activeTab, keyword, recipes])

  const handleRecipeClick = (recipe) => {
    if (recipe.status === RECIPE_STATUS.COMPLETED) {
      navigate(`/recipe/suggest?recipeId=${recipe.id}`)
      return
    }

    navigate(`/recipe/review?recipeId=${recipe.id}`)
  }

  return (
    <div className='recipe-saved-list-page'>
      <Header title='레시피' showBackButton={false} />

      <RecipeTab
        tabs={TABS}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      <RecipeSearchField value={keyword} onChange={setKeyword} />

      <main className='recipe-saved-list-page__content'>
        <section className='recipe-saved-list-page__list-card'>
          <div className='recipe-saved-list-page__list-head'>
            <h2 className='recipe-saved-list-page__list-title'>
              {activeTabInfo.title}
            </h2>
            <p className='recipe-saved-list-page__list-description'>
              {activeTabInfo.description}
            </p>
          </div>

          {filteredRecipes.length > 0 ? (
            <div className='recipe-saved-list-page__list'>
              {filteredRecipes.map((recipe) => (
                <RecipeListItem
                  key={recipe.id}
                  recipe={recipe}
                  onClick={handleRecipeClick}
                />
              ))}
            </div>
          ) : (
            <p className='recipe-saved-list-page__empty'>
              검색 결과가 없습니다.
            </p>
          )}
        </section>
      </main>

      <BottomNav />
    </div>
  )
}

export default RecipeSavedListPage
