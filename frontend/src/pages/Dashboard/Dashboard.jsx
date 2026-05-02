import { useEffect, useState } from "react";
import { getDashboard } from "../../api/dashboardAPI";
import TransactionChart from "../../components/Chart/TransactionChart";
import "./Dashboard.css";

export default function Dashboard() {
  const [data, setData] = useState({
    customersDebt: [],
    suppliersDebt: [],
    transactions: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getDashboard();
      setData(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="dashboard-content">
      <div className="card-box mt-4">
        <h5>Ringkasan Transaksi</h5>

        <div className="chart-placeholder">
          {data.transactions.length > 0 ? (
            <TransactionChart data={data.transactions} />
          ) : (
            "Tidak ada data"
          )}
        </div>
      </div>

    </div>
  );
}