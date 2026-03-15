import { useEffect, useState } from "react";
import axios from "axios";

import { Bar, Pie } from "react-chartjs-2";

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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard(){

  const [expenses,setExpenses] = useState([]);
  const [summary,setSummary] = useState({total:0,count:0,average:0});
  const [monthly,setMonthly] = useState({labels:[],values:[]});
  const [category,setCategory] = useState({labels:[],values:[]});

  const token = localStorage.getItem("token");

  const authHeader = {
    headers:{
      Authorization:`Bearer ${token}`
    }
  };

  useEffect(()=>{

    if(!token){
      window.location.href="/";
      return;
    }

    fetchExpenses();
    fetchSummary();
    fetchMonthly();

  },[]);

  const fetchExpenses = async()=>{

    const res = await axios.get(
      "http://127.0.0.1:8000/expenses",
      authHeader
    );

    setExpenses(res.data);

  };

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

  const fetchMonthly = async()=>{

    const res = await axios.get(
      "http://127.0.0.1:8000/analytics/monthly",
      authHeader
    );

    const labels = res.data.map(item => "Month " + item.month)
    const values = res.data.map(item => item.total)

    setMonthly({
      labels: labels,
      values: values
    })

  };


  const barData={
    labels:monthly.labels,
    datasets:[
      {
        label:"Expenses",
        data:monthly.values,
        backgroundColor:"#4f46e5"
      }
    ]
  };

  const pieData={
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

      <h1 className="page-title">Dashboard</h1>

      <div className="stats-grid">

        <div className="stat-card">
          <h3>Total Expenses</h3>
          <p>£{summary.total_expenses || 0}</p>
        </div>

        <div className="stat-card">
          <h3>Transactions</h3>
          <p>{summary.total_transactions || 0}</p>
        </div>

        <div className="stat-card">
          <h3>Average Expense</h3>
          <p>£{summary.average_expense || 0}</p>
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

      <div className="table-card">

        <h2>Recent Expenses</h2>

        <table className="expense-table">

          <thead>
            <tr>
              <th>Amount</th>
              <th>Description</th>
              <th>Category</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>

            {expenses.map((exp)=>(
              <tr key={exp.id}>
                <td>£{exp.amount}</td>
                <td>{exp.description}</td>
                <td>{exp.category}</td>
                <td>{exp.date}</td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default Dashboard;