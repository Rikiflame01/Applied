import { Route, Routes } from "react-router";
import { Layout } from "./components/Layout";
import { ApplicationPage } from "./pages/ApplicationPage";
import { ApplicationsPage } from "./pages/ApplicationsPage";
import { NewApplicationPage } from "./pages/NewApplicationPage";
import { NotFoundPage } from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<ApplicationsPage />} />
        <Route path="/applications/:id" element={<ApplicationPage />} />
        <Route path="/new" element={<NewApplicationPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
