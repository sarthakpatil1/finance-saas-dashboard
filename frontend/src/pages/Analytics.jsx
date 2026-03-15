import { useEffect, useState } from "react";
import axios from "axios";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function Analytics() {

  const [summary,setSummary] = useState({});
  const [monthly,setMonthly] = useState({labels:[],values:[]});
  const [category,setCategory] = useState({labels:[],values:[]});

  const token = localStorage.getItem("token");

  const authHeader = {
    headers:{
      Authorization:`Bearer ${token}`
    }
  };

  useEffect(()=>{

    fetchSummary();
    fetchMonthly();

  },[]);

  const fetchSummary = async () => {

  const res = await axios.get(
    "http://127.0.0.1:8000/analytics/summary",
    authHeader
  )

  setSummary(res.data)

  const categoryLabels = Object.keys(res.data.categories)
  const categoryValues = Object.values(res.data.categories)

  setCategory({
    labels: categoryLabels,
    values: categoryValues
  })
}

const fetchMonthly = async () => {

  const res = await axios.get(
    "http://127.0.0.1:8000/analytics/monthly",
    authHeader
  )

  const labels = res.data.map(item => "Month " + item.month)
  const values = res.data.map(item => item.total)

  setMonthly({
    labels: labels,
    values: values
  })

}


  const barData = {
    labels: monthly.labels,
    datasets:[
      {
        label:"Expenses",
        data:monthly.values,
        backgroundColor:"#4f46e5"
      }
    ]
  };

  const pieData = {
    labels:category.labels,
    datasets:[
      {
        data:category.values,
        backgroundColor:["#4f46e5","#22c55e","#f59e0b"]
      }
    ]
  };

  return(

    <div className="dashboard-container">

      <h1 className="page-title">Analytics</h1>

      <div className="stats-grid">

        <div className="stat-card">
          <h3>Total Expenses</h3>
          <p>£{summary.total_expenses}</p>
        </div>

        <div className="stat-card">
          <h3>Transactions</h3>
          <p>{summary.total_transactions}</p>
        </div>

        <div className="stat-card">
          <h3>Average Expense</h3>
          <p>£{summary.average_expense}</p>
        </div>

      </div>

      <div className="charts-grid">

        <div className="chart-card">
          <h3>Monthly Expenses</h3>
          <Bar data={barData}/>
        </div>

        <div className="chart-card">
          <h3>Expenses by Category</h3>
          <Pie data={pieData}/>
        </div>

      </div>

    </div>

  );

}

export default Analytics;