import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers, deleteUser } from "../../api/userAPI";
import "./Users.css";

export default function Users() {
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
        const res = await getUsers();
        setUsers(res?.data?.users || []);
    } catch (err) {
        console.log(err);
    } finally {
        setLoading(false);
    }
    }, []);

    useEffect(() => {
    fetchUsers();
    }, [fetchUsers]);

  const handleDelete = async (id) => {
    if (!window.confirm("Hapus pengguna ini?")) return;
    await deleteUser(id);
    fetchUsers();
  };

  return (
    <div className="users-page">

      <div className="users-header">
        <h4>Daftar Pengguna</h4>
        <p>Beranda • Pengguna</p>
      </div>

      <div className="card-box mt-3">

        <div className="users-actions">
          <button
            className="btn btn-primary ms-auto"
            onClick={() => navigate("/users/create")}
          >
            + Tambah Pengguna
          </button>
        </div>

        {loading ? (
          <div className="text-center mt-4">Loading...</div>
        ) : users.length === 0 ? (
          <div className="text-center mt-4 text-muted">Data tidak ditemukan</div>
        ) : (
          <table className="table mt-3">
            <thead>
              <tr>
                <th>Username</th>
                <th>Nama</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.fullname}</td>
                  <td>
                    <button className="btn-action" onClick={() => handleDelete(user.id)}> X </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div>
    </div>
  );
}