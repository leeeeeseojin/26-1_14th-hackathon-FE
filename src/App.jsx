import { BrowserRouter, Routes, Route } from 'react-router-dom'

import RecipeLinkPage from './pages/recipe-input-page/entry/RecipeLinkPage'
import RecipeInputPage from './pages/recipe-input-page/entry/RecipeInputPage'
import ProfilePage from './pages/profile-page/entry/ProfilePage'
import EatingOutUploadPage from './pages/eatout-record-page/entry/EatingOutUploadPage'
import EatingOutDetailPage from './pages/eatout-record-page/entry/EatingOutDetailPage'
import RecipeReviewPage from './pages/recipe-review-page/entry/RecipeReviewPage'
import RecipeSuggestPage from './pages/recipe-suggest-page/entry/RecipeSuggestPage'
import RecipeSubstitutePage from './pages/recipe-substitute-page/entry/RecipeSubstitutePage'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProfilePage />} />
        <Route path='/recipe/input' element={<RecipeInputPage />} />
        <Route path='/recipe/link' element={<RecipeLinkPage />} />
        <Route path='/eatout' element={<EatingOutUploadPage />} />
        <Route path='/eatout/detail' element={<EatingOutDetailPage />} />
        <Route path='/recipe/review' element={<RecipeReviewPage />} />
        <Route path='/recipe/suggest' element={<RecipeSuggestPage />} />
        <Route path='/recipe/substitute' element={<RecipeSubstitutePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
