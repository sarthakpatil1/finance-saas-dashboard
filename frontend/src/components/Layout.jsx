import { Link, useLocation } from "react-router-dom";

function Layout({ children }) {
  const location = useLocation();

  const navItem = (path, label) => {
    const active = location.pathname === path;

    return (
      <Link
        to={path}
        style={{
          padding: "12px 16px",
          borderRadius: "8px",
          textDecoration: "none",
          color: active ? "white" : "#cbd5f5",
          background: active ? "#3b82f6" : "transparent",
          fontWeight: "500",
          transition: "all 0.2s"
        }}
      >
        {label}
      </Link>
    );
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>

      {/* Sidebar */}

      <div
        style={{
          width: "220px",
          background: "#1e293b",
          color: "white",
          padding: "25px"
        }}
      >
        <h2 style={{ marginBottom: "30px" }}>Finance SaaS</h2>

        <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {navItem("/dashboard", "📊 Dashboard")}
          {navItem("/expenses", "💰 Expenses")}
          {navItem("/analytics", "📈 Analytics")}
        </nav>
      </div>

      {/* Page Content */}

      <div
        style={{
          flex: 1,
          padding: "40px",
          background: "#f4f6f9"
        }}
      >
        {children}
      </div>

    </div>
  );
}

export default Layout;