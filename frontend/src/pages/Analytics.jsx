import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

function Analytics() {
  const [monthlyData, setMonthlyData] = useState([]);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const monthly = await API.get("/analytics/monthly");
      const summary = await API.get("/analytics/summary");

      setMonthlyData(monthly.data);
      setSummary(summary.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <h1>Analytics</h1>

      {summary && (
        <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
          <div style={cardStyle}>
            <h3>Total Expenses</h3>
            <p>£{summary.total_expenses}</p>
          </div>

          <div style={cardStyle}>
            <h3>Transactions</h3>
            <p>{summary.total_transactions}</p>
          </div>

          <div style={cardStyle}>
            <h3>Average Expense</h3>
            <p>£{summary.average_expense ? summary.average_expense.toFixed(2) : 0}</p>
          </div>
        </div>
      )}

      <BarChart width={600} height={300} data={monthlyData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="total" fill="#8884d8" />
      </BarChart>
    </Layout>
  );
}

const cardStyle = {
  padding: "20px",
  background: "#f5f5f5",
  borderRadius: "8px",
  width: "180px",
  textAlign: "center"
};

export default Analytics;