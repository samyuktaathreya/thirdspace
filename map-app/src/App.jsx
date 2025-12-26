import "./App.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";
import SidebarHome from "./pages/SidebarHome";
import SidebarAdd from "./pages/SidebarAdd";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<SidebarHome />} />
          <Route path="/add" element={<SidebarAdd />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
