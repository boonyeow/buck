import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import SupabasePage from "./pages/SupabasePage";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<HomePage />} />
      <Route path="supabase" element={<SupabasePage />} />
    </Route>
  )
);

export default router;
