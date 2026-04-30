import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar/Topbar";
import "./MainLayout.css";

export default function MainLayout({ children }) {
  return (
    <div className="layout">

      <Sidebar />

      <div className="layout-main">
        <Topbar />

        <div className="layout-content">
          {children}
        </div>
      </div>

    </div>
  );
}