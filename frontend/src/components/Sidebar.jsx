import { useNavigate, useLocation } from "react-router-dom";
import { menuItems } from "../config/menu";
import "./Sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="sidebar">

      <div className="sidebar-header">
        <h4 className="logo">Setia Abadi</h4>
      </div>

      <div className="sidebar-menu">
        {menuItems.map((section, i) => (
          <div key={i} className="menu-section">

            <p className="menu-title">{section.title}</p>

            {section.items.map((item, j) => {
              const isActive = location.pathname === item.path;

              return (
                <div
                  key={j}
                  className={`menu-item ${isActive ? "active" : ""}`}
                  onClick={() => navigate(item.path)}
                >
                  <span className="menu-text">{item.name}</span>
                </div>
              );
            })}

          </div>
        ))}
      </div>

    </div>
  );
}