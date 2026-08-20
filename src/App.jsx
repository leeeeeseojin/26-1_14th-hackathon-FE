import { BrowserRouter, Routes, Route, useLocation, matchPath } from 'react-router-dom'

import BottomNavBar from './components/bottom-nav/BottomNav'
import RecipeLinkPage from './pages/recipe-input-page/entry/RecipeLinkPage'
import RecipeInputPage from './pages/recipe-input-page/entry/RecipeInputPage'
import ProfilePage from './pages/profile-page/entry/ProfilePage'
import EatingOutUploadPage from './pages/eatout-record-page/entry/EatingOutUploadPage'
import EatingOutDetailPage from './pages/eatout-record-page/entry/EatingOutDetailPage'
import RecipeReviewPage from './pages/recipe-review-page/entry/RecipeReviewPage'
import RecipeSuggestPage from './pages/recipe-suggest-page/entry/RecipeSuggestPage'
import RecipeSubstitutePage from './pages/recipe-substitute-page/entry/RecipeSubstitutePage'
import ScrollToTop from './components/scroll-to-top/ScrollToTop'
import MainPage from './pages/main-page/entry/MainPage'
import RecipeSavedListPage from './pages/recipe-saved-list-page/entry/RecipeSavedListPage'
import RecipeToolCheckPage from './pages/recipe-tool-check-page/entry/RecipeToolCheckPage'
import MealRecordPage from './pages/meal-record-page/entry/MealRecordPage'
import DietAnalysisPage from './pages/diet-analysis-page/entry/DietAnalysisPage'
import RecipeCookingModePage from './pages/recipe-cooking-mode-page/entry/RecipeCookingModePage'
import LoginPage from "./pages/auth-page/login-page/LoginPage";
import SignupPage from "./pages/auth-page/signup-page/SignupPage";
const NavigationWrapper = () => {
  const { pathname } = useLocation()

  const hiddenPatterns = [
    '/',
    '/login',
    '/signup',
    '/recipe/input',
    '/recipe/link',
    '/eatout',
    '/eatout/detail',
    '/recipe/review/:recipeId',
    '/recipe/suggest/:recipeId',
    '/recipe/substitute/:recipeId',
    '/recipe/tool-check/:recipeId',
    '/recipe/cooking-mode/:recipeId',
  ]

  const isHidden = hiddenPatterns.some((pattern) => matchPath(pattern, pathname))

  if (isHidden) return null

  return <BottomNavBar />
}

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<ProfilePage />} />
        <Route path='/recipe/input' element={<RecipeInputPage />} />
        <Route path='/recipe/link' element={<RecipeLinkPage />} />
        <Route path='/eatout' element={<EatingOutUploadPage />} />
        <Route path='/eatout/detail' element={<EatingOutDetailPage />} />
        <Route path='/recipe/review/:recipeId' element={<RecipeReviewPage />} />
        <Route path='/recipe/suggest/:recipeId' element={<RecipeSuggestPage />} />
        <Route path='/recipe/substitute/:recipeId' element={<RecipeSubstitutePage />} />
        <Route path='/main' element={<MainPage />} />
        <Route path='/recipe' element={<RecipeSavedListPage />} />
        <Route path='/recipe/saved-list' element={<RecipeSavedListPage />} />
        <Route path='/recipe/tool-check/:recipeId' element={<RecipeToolCheckPage />} />
        <Route path='/record' element={<MealRecordPage />} />
        <Route path='/analysis' element={<DietAnalysisPage />} />
        <Route path='/recipe/cooking-mode/:recipeId' element={<RecipeCookingModePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
      </Routes>
      <NavigationWrapper />
    </BrowserRouter>
  )
}

export default App
