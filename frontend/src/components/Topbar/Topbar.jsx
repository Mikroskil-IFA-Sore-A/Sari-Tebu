import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { clearTokens } from "../../utils/storage";
import { logoutApi } from "../../api/authAPI";
import "./Topbar.css";

export default function Topbar({ toggleSidebar }) {
  const [open, setOpen] = useState(false);
  const avatarRef = useRef(null);
  const dropdownRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (
        dropdownRef.current?.contains(e.target) ||
        avatarRef.current?.contains(e.target)
      ) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    await logoutApi(refreshToken);
    clearTokens();
    window.location.href = "/auth";
  };

  const rect = avatarRef.current?.getBoundingClientRect();

  return (
    <div className="topbar" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", padding: "15px 25px", backgroundColor: "#fff", borderBottom: "1px solid #eaeaea" }}>
      <div className="topbar-left" style={{ display: "flex", alignItems: "center" }}>
        <button
          onClick={toggleSidebar}
          style={{ background: "none", border: "none", cursor: "pointer", color: "#1b5e20", marginRight: "15px", display: "flex" }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>

      <div className="topbar-right">
        <img
          ref={avatarRef}
          src="https://i.pravatar.cc/40"
          alt="avatar"
          onClick={() => setOpen((p) => !p)}
          style={{ borderRadius: "50%", cursor: "pointer" }}
        />

        {open && rect && createPortal(
          <div
            ref={dropdownRef}
            style={{
              position: "fixed",
              top: rect.bottom + 8,
              right: window.innerWidth - rect.right,
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
              zIndex: 9999,
              overflow: "hidden",
            }}
          >
            <button
              onClick={handleLogout}
              style={{ display: "block", width: "100%", padding: "10px 20px", background: "none", border: "none", cursor: "pointer", color: "#1b5e20", fontSize: "14px", textAlign: "left" }}
            >
              Logout
            </button>
          </div>,
          document.body
        )}
      </div>
    </div>
  );
}