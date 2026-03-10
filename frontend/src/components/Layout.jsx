import { Link } from "react-router-dom";

function Layout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>

      <div style={{
        width: "200px",
        background: "#1f2937",
        color: "white",
        padding: "20px"
      }}>
        <h2>Finance SaaS</h2>

        <nav style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
          <Link to="/dashboard" style={{ color: "white" }}>Dashboard</Link>
          <Link to="/expenses" style={{ color: "white" }}>Expenses</Link>
        </nav>
      </div>

          <li>
              <Link to="/analytics">Analytics</Link>
          </li>

      <div style={{ flex: 1, padding: "30px" }}>
        {children}
      </div>

    </div>
  );
}

export default Layout;