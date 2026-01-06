import "./App.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";
import SidebarHome from "./sidebar/SidebarHome";
import SidebarAdd from "./sidebar/SidebarAdd";
import Gallery from "./layouts/GalleryLayout";

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        {/* routes that SHOULD have sidebar/map layout */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<SidebarHome />} />
          <Route path="/add" element={<SidebarAdd />} />
        </Route>

        {/* route that should be its OWN page */}
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </BrowserRouter>
  );
}
