import { Expense } from "../../types/types";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";

const ExpenseItem = (currentExpense: Expense) => {
  // Exercise: Consume the AppContext here

  const context = useContext(AppContext);
  const handleDeleteExpense = (currentExpense: Expense) => {
      console.log("trying to delete expense " + currentExpense.name)
      context.setExpenses(context.expenses.filter(e => e.id != currentExpense.id));
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>{currentExpense.name}</div>
      <div>${currentExpense.cost}</div>
      <div>
        <button onClick={() => handleDeleteExpense(currentExpense)}>x</button>
      </div>
    </li>
  );
};

export default ExpenseItem;
