import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

function Dashboard() {

  const [summary, setSummary] = useState(null);
  const [recentExpenses, setRecentExpenses] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {

      const summaryRes = await API.get("/analytics/summary");
      const expensesRes = await API.get("/expenses");

      setSummary(summaryRes.data);

      // show only latest 5 expenses
      setRecentExpenses(expensesRes.data.slice(0, 5));

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>

      <h1>Dashboard</h1>

      {/* Summary Cards */}

      {summary && (
        <div
          style={{
            display: "flex",
            gap: "25px",
            marginBottom: "40px"
          }}
        >
          <div className="dashboard-card" style={cardStyle}>
            <h3>Total Expenses</h3>
            <p style={amountStyle}>£{summary.total_expenses}</p>
          </div>

          <div className="dashboard-card" style={cardStyle}>
            <h3>Transactions</h3>
            <p style={amountStyle}>{summary.total_transactions}</p>
          </div>

          <div className="dashboard-card" style={cardStyle}>
            <h3>Average Expense</h3>
            <p style={amountStyle}>
              £{summary.average_expense
                ? summary.average_expense.toFixed(2)
                : 0}
            </p>
          </div>
        </div>
      )}

      {/* Recent Expenses */}

      <h2>Recent Expenses</h2>

      <table>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Description</th>
          </tr>
        </thead>

        <tbody>
          {recentExpenses.map((expense) => (
            <tr key={expense.id}>
              <td>£{expense.amount}</td>
              <td>{expense.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </Layout>
  );
}


/* Card Style */

const cardStyle = {
  padding: "28px",
  background: "white",
  borderRadius: "14px",
  width: "230px",
  textAlign: "center",
  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
  transition: "all 0.2s ease"
};

const amountStyle = {
  fontSize: "22px",
  fontWeight: "600",
  marginTop: "10px"
};

export default Dashboard;