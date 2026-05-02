import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, updateProduct } from "../../api/productAPI";

export default function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({ name: '', price: '', stock: '', discount: 0 });
  const [loading, setLoading] = useState(false);

    useEffect(() => {
    const fetchProduct = async () => {
        const res = await getProductById(id);
        if (res?.data?.product) setForm(res.data.product);
    };
    fetchProduct();
    }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await updateProduct(id, {
        name: form.name,
        price: Number(form.price),
        stock: Number(form.stock),
      });
      if (res.status === 'success') {
        navigate('/products');
      } else {
        alert(res.message || 'Gagal update produk');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card-box">
      <h4>Edit Produk</h4>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          placeholder="Nama Produk"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="number"
          className="form-control mb-3"
          placeholder="Harga"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <input
          type="number"
          className="form-control mb-3"
          placeholder="Stok"
          value={form.stock}
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