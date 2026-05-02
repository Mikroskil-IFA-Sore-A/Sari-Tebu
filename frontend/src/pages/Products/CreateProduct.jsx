import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../api/productAPI";

export default function CreateProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', price: '', stock: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await createProduct({
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      });
      if (res.status === 'success') {
        navigate('/products');
      } else {
        alert(res.message || 'Gagal tambah produk');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card-box">
      <h4>Tambah Produk</h4>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          placeholder="Nama Produk"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="number"
          className="form-control mb-3"
          placeholder="Harga"
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <input
          type="number"
          className="form-control mb-3"
          placeholder="Stok"
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
        />
        <button className="btn btn-primary" disabled={loading}>
          {loading ? 'Menyimpan...' : 'Simpan'}
        </button>
        <button
          type="button"
          className="btn btn-danger ms-2"
          onClick={() => navigate('/products')}
        >
          Kembali
        </button>
      </form>
    </div>
  );
}