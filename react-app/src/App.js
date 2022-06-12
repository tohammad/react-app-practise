import "./App.css";
import ExpenseItem from "./components/Expenses/ExpenseItem";
const App = () => {
  const expenses = [
    {
      title: "Vehicle Insurance",
      amount: 280.12,
      date: new Date(2022, 6, 12),
    },
    {
      title: "Home Insurance",
      amount: 250.12,
      date: new Date(2022, 6, 13),
    },
    {
      title: "Health Insurance",
      amount: 210.12,
      date: new Date(2022, 6, 14),
    },
  ];
  return (
    <div className="App">
      <header className="App-header">
        <ExpenseItem expense={expenses[0]}></ExpenseItem>
        <ExpenseItem expense={expenses[1]}></ExpenseItem>
        <ExpenseItem expense={expenses[2]}></ExpenseItem>
      </header>
    </div>
  );
}

export default App;
