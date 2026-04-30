import { useState } from "react";
import { loginApi, registerApi } from "../../api/authAPI";
import { saveToken } from "../../utils/storage";
import { useNavigate } from "react-router-dom";
import "./auth.css";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    fullname: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      const res = await loginApi(form);

      if (res.status === "success") {
        saveToken(res.data);
        navigate("/dashboard");
      } else {
        alert("Login gagal");
      }
    } else {
      const res = await registerApi(form);

      if (res.status === "success") {
        alert("Register berhasil");
        setIsLogin(true);
      } else {
        alert("Register gagal");
      }
    }
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        <div className="col-md-7 d-none d-md-flex left-side align-items-center justify-content-center">
          <h4 className="fw-bold">Setia Abadi</h4>
        </div>

        <div className="col-md-5 d-flex align-items-center justify-content-center">
          <div className="auth-card slide-once">
            <div className="auth-tabs mb-4">
              <div className={`slider ${isLogin ? "login-active" : "register-active"}`}></div>

              <button
                className={`tab ${isLogin ? "active" : ""}`}
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>

              <button
                className={`tab ${!isLogin ? "active" : ""}`}
                onClick={() => setIsLogin(false)}
              >
                Register
              </button>
            </div>

            <h3 className="fw-bold">
              {isLogin ? "Selamat Datang" : "Buat Akun"}
            </h3>

            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <input
                  className="form-control mb-3"
                  placeholder="Nama Lengkap"
                  onChange={(e) =>
                    setForm({ ...form, fullname: e.target.value })
                  }
                />
              )}

              <input
                className="form-control mb-3"
                placeholder="Username"
                onChange={(e) =>
                  setForm({ ...form, username: e.target.value })
                }
              />

              <input
                type="password"
                className="form-control mb-4"
                placeholder="Password"
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />

              <button className="btn btn-primary w-100">
                {isLogin ? "Masuk" : "Daftar"}
              </button>

            </form>

          </div>
        </div>

      </div>
    </div>
  );
}