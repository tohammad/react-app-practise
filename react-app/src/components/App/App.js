import "./App.css";
// import Todos from "../Todos/Todos";
// import Avatar from "../Common/Avatar/Avatar";
import CountryForm from "../Country/CountryForm";
import FilterableProductsTable from "../Common/FilterableProductsTable/FilterableProductsTable";
const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        {/* <Todos /> */}
        {/* <Avatar imageURL="https://picsum.photos/200/300"/> */}
        {/* <CountryForm/> */}
        <FilterableProductsTable/>
      </header>
    </div>
  );
};

export default App;
