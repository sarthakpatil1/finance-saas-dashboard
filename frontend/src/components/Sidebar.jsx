import { Link } from "react-router-dom"

function Sidebar(){

return(

<div className="sidebar">

  <h2 className="logo">Finance SaaS</h2>

  <nav>

    <Link to="/dashboard">📊 Dashboard</Link>

    <Link to="/expenses">💰 Expenses</Link>

    <Link to="/analytics">📈 Analytics</Link>

  </nav>

</div>

)

}

export default Sidebar
