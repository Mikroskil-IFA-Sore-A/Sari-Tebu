import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar/Topbar";
import "./MainLayout.css";

export default function MainLayout() {
  return (
    <div className="layout">

      <Sidebar />

      <div className="layout-main">
        <Topbar />

        <div className="layout-content">
          <Outlet />
        </div>
      </div>

    </div>
  );
}