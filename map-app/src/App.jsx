import "./App.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";
import SidebarHome from "./pages/SidebarHome";
import SidebarAdd from "./pages/SidebarAdd";
import GalleryPage from "./Components/GalleryPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* routes that SHOULD have sidebar/map layout */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<SidebarHome />} />
          <Route path="/add" element={<SidebarAdd />} />
        </Route>

        {/* route that should be its OWN page */}
        <Route path="/gallery" element={<GalleryPage />} />
      </Routes>
    </BrowserRouter>
  );
}
