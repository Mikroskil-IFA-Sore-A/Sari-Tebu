import "./Topbar.css";

export default function Topbar() {
  return (
    <div className="topbar">

      <div className="topbar-left">
        <h5 className="brand">Setia Abadi</h5>
      </div>

      <div className="topbar-right">
        <img
          src="https://i.pravatar.cc/40"
          alt="avatar"
          className="avatar"
        />
      </div>

    </div>
  );
}