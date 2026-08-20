import { BrowserRouter, Routes, Route } from 'react-router-dom'

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
import RecipeCookingModePage from './pages/recipe-cooking-mode-page/entry/RecipeCookingModePage'

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
        <Route path='/recipe/review' element={<RecipeReviewPage />} />
        <Route path='/recipe/suggest' element={<RecipeSuggestPage />} />
        <Route path='/recipe/substitute' element={<RecipeSubstitutePage />} />
        <Route path='/main' element={<MainPage />} />
        <Route path='/recipe/saved-list' element={<RecipeSavedListPage />} />
        <Route path='/recipe/tool-check' element={<RecipeToolCheckPage />} />
        <Route path='/recipe/cooking-mode' element={<RecipeCookingModePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
