import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerApi } from "../../api/authAPI";

export default function CreateUser() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        fullname: "",
        username: "",
        password: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await registerApi(form);

        if (res.status === "success") {
            navigate("/users");
        } else {
            alert("Gagal tambah user");
        }
    }

    return (
        <div className="card-box">
            <h4>Tambah Pengguna</h4>

            <form onSubmit={handleSubmit}>
                <input
                className="form-control mb-3"
                placeholder="Full Name"
                onChange={(e) => setForm({ ...form, fullname: e.target.value })}
                />

                <input
                className="form-control mb-3"
                placeholder="Username"
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                />

                <input
                type="password"
                className="form-control mb-3"
                placeholder="Password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                />

                <button className="btn btn-primary">Kirim</button>
                <button
                type="button"
                className="btn btn-danger ms-2"
                onClick={() => navigate("/users")}
                >
                Kembali
                </button>
            </form>
        </div>
  );
}
