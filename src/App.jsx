import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import RecipeLinkPage from "./pages/recipe-input-page/entry/RecipeLinkPage";
import RecipeInputPage from "./pages/recipe-input-page/entry/RecipeInputPage";
import ProfilePage from './pages/profile-page/entry/ProfilePage';
import EatingOutUploadPage from "./pages/eatout-record-page/entry/EatingOutUploadPage";
import EatingOutDetailPage from "./pages/eatout-record-page/entry/EatingOutDetailPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProfilePage />} />
        <Route path="/recipe/input" element={<RecipeInputPage />}/>
        <Route path="/recipe/link" element={<RecipeLinkPage />}/>
        <Route path="/eatout" element={<EatingOutUploadPage />}/>
        <Route path="/eatout/detail" element={<EatingOutDetailPage />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;