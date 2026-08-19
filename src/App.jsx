import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import RecipeLinkPage from "./pages/recipe-input-page/entry/RecipeLinkPage";
import RecipeInputPage from "./pages/recipe-input-page/entry/RecipeInputPage";
import ProfilePage from './pages/profile-page/entry/ProfilePage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProfilePage />} />
        <Route path="/recipe/input" element={<RecipeInputPage />}/>
        <Route path="/recipe/link" element={<RecipeLinkPage />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;