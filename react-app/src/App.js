import './App.css';
import StyledComponent from'./StyledComponent';
import ReactComponent from'./ReactComponent';
import StyledComponentWithProps from'./StyledComponentWithProps';
import StyledComponentWithInheritance from'./StyledComponentWithInheritance';
import StyledComponentWithSCSS from'./StyledComponentWithSCSS';
import StyledComponentWithAnimation from'./StyledComponentWithAnimation';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <StyledComponent/>
        <ReactComponent/>
        <StyledComponentWithProps/>
        <StyledComponentWithInheritance/>
        <StyledComponentWithSCSS/>
        <StyledComponentWithAnimation/>
      </header>
      
    </div>
  );
}

export default App;
