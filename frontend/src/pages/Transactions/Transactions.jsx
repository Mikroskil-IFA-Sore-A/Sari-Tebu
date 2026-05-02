import { useEffect, useState, useCallback } from "react";
import { getTransactions, getTransaction } from "../../api/transactionAPI";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [detail, setDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getTransactions();
      setTransactions(res?.data?.transactions || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const handleSelect = async (id) => {
    if (selected === id) {
      setSelected(null);
      setDetail(null);
      return;
    }
    setSelected(id);
    setDetailLoading(true);
    try {
      const res = await getTransaction(id);
      setDetail(res?.data?.transaction || null);
    } catch (err) {
      console.log(err);
    } finally {
      setDetailLoading(false);
    }
  };

  return (
    <div className="users-page">
      <div className="users-header">
        <h4>Riwayat Transaksi</h4>
      </div>

      <div style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>

        {/* Transaction List */}
        <div className="card-box mt-3" style={{ flex: 1 }}>
          {loading ? (
            <div className="text-center mt-4">Loading...</div>
          ) : transactions.length === 0 ? (
            <div className="text-center mt-4 text-muted">Belum ada transaksi</div>
          ) : (
            <table className="table mt-3">
              <thead>
                <tr>
                  <th>ID Transaksi</th>
                  <th>Total</th>
                  <th>Tunai</th>
                  <th>Kembalian</th>
                  <th>Waktu</th>
                  <th>Detail</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((trx) => (
                  <tr
                    key={trx.id}
                    style={{ background: selected === trx.id ? "#f1f8f1" : "inherit" }}
                  >
                    <td style={{ fontSize: "12px", color: "#888" }}>{trx.id}</td>
                    <td>Rp {Number(trx.total).toLocaleString("id-ID")}</td>
                    <td>Rp {Number(trx.cash).toLocaleString("id-ID")}</td>
                    <td>Rp {Number(trx.change).toLocaleString("id-ID")}</td>
                    <td style={{ fontSize: "13px" }}>
                      {new Date(trx.created_at).toLocaleString("id-ID")}
                    </td>
                    <td>
                      <button
                        className="btn btn-light btn-sm"
                        onClick={() => handleSelect(trx.id)}
                      >
                        {selected === trx.id ? "Tutup" : "..."}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {selected && (
          <div className="card-box mt-3" style={{ width: "300px", flexShrink: 0 }}>
            <h6 style={{ fontWeight: 700, marginBottom: "12px" }}>Detail Transaksi</h6>

            {detailLoading ? (
              <div className="text-center">Loading...</div>
            ) : detail ? (
              <>
                <div style={{ fontSize: "12px", color: "#888", marginBottom: "12px" }}>
                  {detail.id}
                </div>

                <table style={{ width: "100%", fontSize: "13px", marginBottom: "12px" }}>
                  <tbody>
                    {detail.items?.map((item) => (
                      <tr key={item.id}>
                        <td style={{ paddingBottom: "6px" }}>
                          <div style={{ fontWeight: 600 }}>{item.product_name}</div>
                          <div style={{ color: "#888" }}>
                            {item.quantity} x Rp {Number(item.product_price).toLocaleString("id-ID")}
                          </div>
                        </td>
                        <td style={{ textAlign: "right", paddingBottom: "6px" }}>
                          Rp {Number(item.subtotal).toLocaleString("id-ID")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div style={{ borderTop: "1px solid #eee", paddingTop: "10px", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                    <span>Total</span>
                    <span>Rp {Number(detail.total).toLocaleString("id-ID")}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                    <span>Tunai</span>
                    <span>Rp {Number(detail.cash).toLocaleString("id-ID")}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", fontWeight: 700 }}>
                    <span>Kembalian</span>
                    <span>Rp {Number(detail.change).toLocaleString("id-ID")}</span>
                  </div>
                </div>

                <div style={{ fontSize: "12px", color: "#aaa", marginTop: "10px" }}>
                  {new Date(detail.created_at).toLocaleString("id-ID")}
                </div>
              </>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}