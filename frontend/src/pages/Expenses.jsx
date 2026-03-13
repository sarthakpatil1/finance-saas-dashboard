import { useEffect, useState } from "react";
import axios from "axios";

function Expenses() {

  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [date, setDate] = useState("");

  const token = localStorage.getItem("token");


  const fetchExpenses = async () => {
    const res = await axios.get("http://127.0.0.1:8000/expenses", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setExpenses(res.data);
  };


  const fetchCategories = async () => {
    const res = await axios.get("http://127.0.0.1:8000/categories");
    setCategories(res.data);
  };


  useEffect(() => {
    fetchExpenses();
    fetchCategories();
  }, []);


  const addExpense = async () => {

    if (!amount || !categoryId || !date) {
      alert("Please fill all fields");
      return;
    }

    await axios.post(
      "http://127.0.0.1:8000/expenses",
      {
        amount: parseFloat(amount),
        description,
        category_id: parseInt(categoryId),
        date: date
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    setAmount("");
    setDescription("");
    setCategoryId("");
    setDate("");

    fetchExpenses();
  };


  const deleteExpense = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/expenses/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    fetchExpenses();
  };


  return (
    <div>

      <h1>Expenses</h1>

      {/* FORM */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>

        <input
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">Select Category</option>

          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}

        </select>


        {/* DATE PICKER */}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />


        <button onClick={addExpense}>Add</button>

      </div>


      {/* TABLE */}
      <table>

        <thead>
          <tr>
            <th>Amount</th>
            <th>Description</th>
            <th>Category</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {expenses.map((exp) => (
            <tr key={exp.id}>
              <td>£{exp.amount}</td>
              <td>{exp.description}</td>
              <td>{exp.category?.name}</td>
              <td>{exp.date}</td>

              <td>
                <button onClick={() => deleteExpense(exp.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Expenses;