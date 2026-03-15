import { useEffect, useState } from "react";
import axios from "axios";

function Expenses() {

  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const token = localStorage.getItem("token");

  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  useEffect(() => {

    fetchExpenses();
    fetchCategories();

  }, []);

  const fetchExpenses = async () => {

    try {

      const res = await axios.get(
        "http://127.0.0.1:8000/expenses",
        authHeader
      );

      setExpenses(res.data.expenses || res.data);

    } catch (error) {

      console.error("Error fetching expenses", error);

    }

  };

  const fetchCategories = async () => {

    try {

      const res = await axios.get(
        "http://127.0.0.1:8000/categories",
        authHeader
      );

      setCategories(res.data);

    } catch (error) {

      console.error("Error fetching categories", error);

    }

  };

  const addExpense = async () => {

    try {

      await axios.post(
        "http://127.0.0.1:8000/expenses",
        {
          amount: Number(amount),
          description: description,
          category_id: Number(category),
          date: date
        },
        authHeader
      )

      setAmount("");
      setDescription("");
      setCategory("");
      setDate("");

      fetchExpenses();

    } catch (error) {

      console.error("Error adding expense", error);

    }

  };

  const deleteExpense = async (id) => {

    try {

      await axios.delete(
        `http://127.0.0.1:8000/expenses/${id}`,
        authHeader
      );

      fetchExpenses();

    } catch (error) {

      console.error("Error deleting expense", error);

    }

  };

  return (

    <div className="dashboard-container">

      <h1 className="page-title">Expenses</h1>

      <div className="expense-form">

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>

          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}

        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button onClick={addExpense}>
          Add
        </button>

      </div>

      <table className="expense-table">

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

          {expenses.map((expense) => (

            <tr key={expense.id}>

              <td>£{expense.amount}</td>
              <td>{expense.description}</td>
              <td>{expense.category}</td>
              <td>{expense.date}</td>

              <td>

                <button
                  onClick={() => deleteExpense(expense.id)}
                >
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