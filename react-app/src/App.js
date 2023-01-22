import "./App.css";
import Counter from "./components/Counter";
import Header from "./components/Header";
import Auth from "./components/Auth";
import { useSelector } from "react-redux";
function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        {!isAuthenticated && <Auth />}
        {isAuthenticated && <Counter></Counter>}
      </header>
    </div>
  );
}

export default App;
