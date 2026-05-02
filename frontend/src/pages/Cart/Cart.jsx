import { useEffect, useState, useCallback } from "react";
import { getProducts } from "../../api/productAPI";
import { getCart, addToCart, updateCartItem, removeFromCart, checkout } from "../../api/cartAPI";
import "./Cart.css";

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [cash, setCash] = useState("");
  const [receipt, setReceipt] = useState(null);

  const fetchProducts = useCallback(async () => {
    const res = await getProducts();
    setProducts(res?.data?.products || []);
  }, []);

  const fetchCart = useCallback(async () => {
    const res = await getCart();
    setCartItems(res?.data?.items || []);
    setTotal(res?.data?.total || 0);
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, [fetchProducts, fetchCart]);

  const handleAddToCart = async (product) => {
    if (product.stock === 0) return;
    await addToCart(product.id, 1);
    fetchCart();
  };

  const handleQuantity = async (id, quantity) => {
    if (quantity < 1) {
      await removeFromCart(id);
    } else {
      await updateCartItem(id, quantity);
    }
    fetchCart();
  };

  const handleRemove = async (id) => {
    await removeFromCart(id);
    fetchCart();
  };

  const handleCheckout = async () => {
    const cashAmount = Number(cash);
    if (!cashAmount || cashAmount < total) {
      alert("Uang tidak cukup");
      return;
    }
    const res = await checkout(cashAmount);
    if (res.status === "success") {
      setReceipt(res.data);
      fetchCart();
      setCash("");
    } else {
      alert(res.message || "Checkout gagal");
    }
  };

  const change = Number(cash) - total;

  return (
    <div className="cart-container">

      <div className="cart-left">

        <div className="cart-product-list">
          {products.map((product) => {
            const inCart = cartItems.find((i) => i.product_id === product.id);
            const outOfStock = product.stock === 0;

            return (
              <div
                key={product.id}
                className={`cart-product-item ${inCart ? "in-cart" : ""} ${outOfStock ? "out-of-stock" : ""}`}
              >
                <div className="cart-product-info">
                  <span className="cart-product-name">{product.name}</span>
                  <span className="cart-product-price">
                    Rp {Number(product.price).toLocaleString("id-ID")}
                    {product.discount > 0 && (
                      <span className="cart-product-original">
                        Rp {Number(product.price).toLocaleString("id-ID")}
                      </span>
                    )}
                  </span>
                  <span className={`cart-stock-badge ${outOfStock ? "empty" : ""}`}>
                    Stok: {product.stock}
                  </span>
                </div>
                {inCart && (
                  <span className="cart-qty-badge">{inCart.quantity}</span>
                )}
                <button
                  className="cart-add-btn"
                  onClick={() => handleAddToCart(product)}
                  disabled={outOfStock}
                >
                  {outOfStock ? "Stok Habis" : "Tambahkan"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="cart-right">
        <h5 className="cart-title">Keranjang</h5>

        {receipt ? (
          <div className="cart-receipt">
            <div className="cart-receipt-icon">✓</div>
            <h6>Transaksi Berhasil</h6>
            <div className="cart-receipt-row">
              <span>Total</span>
              <span>Rp {Number(receipt.total).toLocaleString("id-ID")}</span>
            </div>
            <div className="cart-receipt-row">
              <span>Tunai</span>
              <span>Rp {Number(receipt.cash).toLocaleString("id-ID")}</span>
            </div>
            <div className="cart-receipt-row bold">
              <span>Kembalian</span>
              <span>Rp {Number(receipt.change).toLocaleString("id-ID")}</span>
            </div>
            <button className="cart-checkout-btn" onClick={() => setReceipt(null)}>
              Transaksi Baru
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.length === 0 ? (
                <p className="cart-empty">Keranjang kosong</p>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-info">
                      <span className="cart-item-name">{item.name}</span>
                      <span className="cart-item-price">
                        Rp {Number(item.price).toLocaleString("id-ID")}
                      </span>
                    </div>
                    <div className="cart-item-controls">
                      <button onClick={() => handleRemove(item.id)} className="cart-ctrl-del">🗑</button>
                      <button onClick={() => handleQuantity(item.id, item.quantity - 1)} className="cart-ctrl">−</button>
                      <span className="cart-ctrl-qty">{item.quantity}</span>
                      <button onClick={() => handleQuantity(item.id, item.quantity + 1)} className="cart-ctrl">+</button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="cart-summary">
              <div className="cart-summary-row">
                <span>Subtotal</span>
                <span>Rp {Number(total).toLocaleString("id-ID")}</span>
              </div>
              <div className="cart-summary-row total">
                <span>Total Bayar</span>
                <span>Rp {Number(total).toLocaleString("id-ID")}</span>
              </div>
            </div>

            <input
              type="number"
              className="cart-cash-input"
              placeholder="Jumlah uang tunai"
              value={cash}
              onChange={(e) => setCash(e.target.value)}
            />

            {cash && Number(cash) >= total && total > 0 && (
              <div className="cart-change">
                Kembalian: <strong>Rp {Number(change).toLocaleString("id-ID")}</strong>
              </div>
            )}

            <button
              className="cart-checkout-btn"
              onClick={handleCheckout}
              disabled={cartItems.length === 0}
            >
              Bayar
            </button>
          </>
        )}
      </div>
    </div>
  );
}