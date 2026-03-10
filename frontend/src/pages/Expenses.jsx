import { useEffect, useState } from "react"
import API from "../services/api"
import Layout from "../components/Layout"

function Expenses() {

  const [expenses, setExpenses] = useState([])
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")

  const loadExpenses = async () => {
    try {
      const res = await API.get("/expenses")
      setExpenses(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    loadExpenses()
  }, [])

  const addExpense = async (e) => {
    e.preventDefault()

    try {
      await API.post("/expenses", {
        amount: Number(amount),
        description: description,
        category_id: 1
      })

      setAmount("")
      setDescription("")

      loadExpenses()

    } catch (err) {
      console.log(err)
    }
  }

  const deleteExpense = async (id) => {
    try {
      await API.delete(`/expenses/${id}`)
      loadExpenses()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Layout>

      <h1>Expenses</h1>

      <form onSubmit={addExpense} style={{marginBottom: "20px"}}>
        <input
          placeholder="Amount"
          value={amount}
          onChange={(e)=>setAmount(e.target.value)}
        />

        <input
          placeholder="Description"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
        />

        <button type="submit">Add</button>
      </form>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {expenses.map((exp)=>(
            <tr key={exp.id}>
              <td>{exp.amount}</td>
              <td>{exp.description}</td>
              <td>
                <button onClick={()=>deleteExpense(exp.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>

    </Layout>
  )
}

export default Expenses