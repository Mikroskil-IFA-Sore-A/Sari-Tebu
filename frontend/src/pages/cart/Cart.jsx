import { useEffect, useState } from "react";
import { getProducts } from "../../api/productAPI";
import "./Cart.css";

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(delay);
  }, [search]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await getProducts(search);
      setProducts(res.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product) => {
    const exist = cart.find((item) => item.id === product.id);

    if (exist) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const updateQty = (id, type) => {
    setCart(
      cart.map((item) => {
        if (item.id === id) {
          const newQty =
            type === "inc" ? item.qty + 1 : item.qty - 1;
          return { ...item, qty: newQty < 1 ? 1 : newQty };
        }
        return item;
      })
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const discount = subtotal > 50000 ? 20000 : 0;
  const total = subtotal - discount;

  return (
    <div className="cart-container">

      <div className="products">

        <input
          className="search"
          placeholder="Cari Produk"
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="product-grid">
            {products.map((p) => (
              <div key={p.id} className="card">

                <div className="img"></div>

                <h5>{p.name}</h5>
                <p>Rp {Number(p.sell_price).toLocaleString()}</p>
                <span className="stock">Stok: {p.stock}</span>

                <button
                  disabled={p.stock === 0}
                  onClick={() => addToCart(p)}
                >
                  {p.stock === 0 ? "Stock Habis" : "Tambahkan"}
                </button>

              </div>
            ))}
          </div>
        )}
      </div>

      <div className="cart">

        <h4>Keranjang</h4>

        {cart.map((item) => (
          <div key={item.id} className="cart-item">

            <div>
              <p>{item.name}</p>
              <small>Rp {item.price}</small>
            </div>

            <div className="qty">
              <button onClick={() => updateQty(item.id, "dec")}>-</button>
              <span>{item.qty}</span>
              <button onClick={() => updateQty(item.id, "inc")}>+</button>
            </div>

            <button onClick={() => removeItem(item.id)}>🗑</button>
          </div>
        ))}

        <hr />

        <div className="summary">
          <p>Subtotal <span>Rp {subtotal.toLocaleString()}</span></p>
          <p>Diskon <span>Rp {discount.toLocaleString()}</span></p>
          <h4>Total <span>Rp {total.toLocaleString()}</span></h4>
        </div>

        <button className="pay">Bayar</button>

      </div>

    </div>
  );
}