import { AppContext } from "../../context/AppContext";
import { useContext, useEffect } from "react";
import { fetchBudget, updateBudget } from "../../utils/budget-utils";

const Budget = () => {
  //const context = useContext(AppContext);
  const { expenses, setExpenses, budget, setBudget } = useContext(AppContext);

  useEffect(() => {
    loadBudget();
  }, []);

  const loadBudget = async () => {
    try {
      const budget = await fetchBudget();
      setBudget(budget);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const handleClick = async (diff: number) => {
    try {
        const newBudget = await updateBudget(budget + diff);
        setBudget(newBudget);
    } catch (err: any) {
        console.log(err.message);
    }
  }

  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
      <div> Budget:  ${budget} </div>
      <div>
        <button onClick={() => handleClick(100)}>+</button>
        <button onClick={() => handleClick(-100)}>&ndash;</button>
      </div>
    </div>
  );
};

export default Budget;
