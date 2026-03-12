import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

const COLORS = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#14b8a6"
];

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

      {/* Summary Cards */}

      {summary && (
        <div
          style={{
            display: "flex",
            gap: "25px",
            marginBottom: "40px"
          }}
        >
          <div style={cardStyle}>
            <h3>Total Expenses</h3>
            <p style={amountStyle}>£{summary.total_expenses}</p>
          </div>

          <div style={cardStyle}>
            <h3>Transactions</h3>
            <p style={amountStyle}>{summary.total_transactions}</p>
          </div>

          <div style={cardStyle}>
            <h3>Average Expense</h3>
            <p style={amountStyle}>
              £{summary.average_expense
                ? summary.average_expense.toFixed(2)
                : 0}
            </p>
          </div>
        </div>
      )}

      {/* Charts */}

      <div
        style={{
          display: "flex",
          gap: "40px",
          alignItems: "flex-start"
        }}
      >

        {/* Monthly Bar Chart */}

        <div style={chartCard}>
          <h3>Monthly Expenses</h3>

          <BarChart width={450} height={300} data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#3b82f6" />
          </BarChart>
        </div>


        {/* Category Pie Chart */}

        {summary && summary.categories && (
          <div style={chartCard}>
            <h3>Expenses by Category</h3>

            <PieChart width={350} height={300}>
              <Pie
                data={Object.entries(summary.categories).map(([name, value]) => ({
                  name,
                  value
                }))}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                label
              >
                {Object.entries(summary.categories).map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
              <Legend />

            </PieChart>

          </div>
        )}

      </div>

    </Layout>
  );
}


/* Card Styling */

const cardStyle = {
  padding: "28px",
  background: "white",
  borderRadius: "14px",
  width: "230px",
  textAlign: "center",
  boxShadow: "0 8px 24px rgba(0,0,0,0.08)"
};

const amountStyle = {
  fontSize: "22px",
  fontWeight: "600",
  marginTop: "10px"
};

const chartCard = {
  background: "white",
  padding: "25px",
  borderRadius: "14px",
  boxShadow: "0 6px 18px rgba(0,0,0,0.06)"
};

export default Analytics;