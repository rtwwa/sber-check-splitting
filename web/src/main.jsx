import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./css/index.css";
import InitialPage from "./pages/InitialPage.jsx";
import FormedCheckPage from "./pages/FormedCheck.jsx";
import MainLayout from "./layout/MainLayout.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<InitialPage />} />
        <Route path="/check/:checkHash" element={<FormedCheckPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
