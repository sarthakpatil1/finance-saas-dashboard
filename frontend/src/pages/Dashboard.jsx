import { useEffect, useState } from "react"
import axios from "axios"
import { Bar, Pie } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend)

function Dashboard(){

  const [expenses,setExpenses] = useState([])

  useEffect(()=>{
    fetchExpenses()
  },[])

  const fetchExpenses = async () => {

    try{

      const token = localStorage.getItem("token")

      const res = await axios.get("http://127.0.0.1:8000/expenses",{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })

      setExpenses(res.data)

    }catch(error){
      console.error(error)
    }

  }

  const total = expenses.reduce((sum,e)=>sum + e.amount,0)
  const transactions = expenses.length
  const average = transactions ? (total/transactions).toFixed(2) : 0

  const categoryTotals = {}

  expenses.forEach(e=>{
    if(categoryTotals[e.category]){
      categoryTotals[e.category] += e.amount
    }else{
      categoryTotals[e.category] = e.amount
    }
  })

  const pieData = {
    labels:Object.keys(categoryTotals),
    datasets:[
      {
        data:Object.values(categoryTotals),
        backgroundColor:[
          "#4f46e5",
          "#22c55e",
          "#f59e0b",
          "#ef4444",
          "#3b82f6"
        ]
      }
    ]
  }

  const barData = {
    labels:["Expenses"],
    datasets:[
      {
        label:"Total",
        data:[total],
        backgroundColor:"#4f46e5"
      }
    ]
  }

  return(

    <div className="dashboard-container">

      <h1 className="page-title">Dashboard</h1>

      {/* KPI CARDS */}

      <div className="cards-grid">

        <div className="card">
          <h3>Total Expenses</h3>
          <p>£{total}</p>
        </div>

        <div className="card">
          <h3>Transactions</h3>
          <p>{transactions}</p>
        </div>

        <div className="card">
          <h3>Average Expense</h3>
          <p>£{average}</p>
        </div>

      </div>

      {/* CHARTS */}

      <div className="charts-grid">

        <div className="chart-card">
          <h3>Monthly Expenses</h3>
          <Bar
            data={barData}
            options={{
              maintainAspectRatio: false,
              plugins: { legend: { display: false } }
            }}
          />
        </div>

        <div className="chart-card">
          <h3>Expenses by Category</h3>
          <Pie
            data={pieData}
            options={{
              maintainAspectRatio: false
            }}
          />
        </div>

      </div>

      {/* RECENT EXPENSES */}

      <h2 className="section-title">Recent Expenses</h2>

      <div className="table-card">

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

            {expenses.length === 0 ?(

              <tr>
                <td colSpan="4">No expenses yet</td>
              </tr>

            ):(
              expenses.slice(0,5).map((exp)=>(
                <tr key={exp.id}>
                  <td>£{exp.amount}</td>
                  <td>{exp.description}</td>
                  <td>{exp.category}</td>
                  <td>{exp.date}</td>
                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>

  )

}

export default Dashboard