import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts, deleteProduct } from "../../api/productAPI";

export default function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getProducts();
      setProducts(res?.data?.products || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = async (id) => {
    if (!window.confirm("Hapus produk ini?")) return;
    await deleteProduct(id);
    fetchProducts();
  };

  return (
    <div className="users-page">
      <div className="users-header">
        <h4>Daftar Produk</h4>
      </div>

      <div className="card-box mt-3">
        <div className="users-actions">
          <button
            className="btn btn-primary ms-auto"
            onClick={() => navigate("/products/create")}
          >
            + Tambah Produk
          </button>
        </div>

        {loading ? (
          <div className="text-center mt-4">Loading...</div>
        ) : products.length === 0 ? (
          <div className="text-center mt-4 text-muted">Data tidak ditemukan</div>
        ) : (
          <table className="table mt-3">
            <thead>
              <tr>
                <th>Nama</th>
                <th>Harga</th>
                <th>Stok</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                return (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>Rp {Number(product.price).toLocaleString('id-ID')}</td>
                    <td>
                      <span style={{ color: product.stock <= 5 ? 'red' : 'inherit' }}>
                        {product.stock}
                      </span>
                    </td>
                    <td style={{ display: 'flex', gap: '8px' }}>
                      <button
                        className="btn-action"
                        onClick={() => navigate(`/products/edit/${product.id}`)}
                      >
                        ...
                      </button>
                      <button
                        className="btn-action"
                        onClick={() => handleDelete(product.id)}
                      >
                        X
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}