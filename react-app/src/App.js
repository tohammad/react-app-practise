import "./App.css";
import ComponentMultipleRendering from "./ComponentMultipleRendering";
import ComponentUseRef from "./ComponentUseRef";
import ComponentUsingLocalVar from "./ComponentUsingLocalVar";
import ComponentUseRefShallowRendering from "./ComponentUseRefShallowRendering";
import ComponentUseRef2 from "./ComponentUseRef2";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <ComponentMultipleRendering /> */}
         {/* <ComponentUseRef /> */}
        {/* <ComponentUsingLocalVar /> */}
        <ComponentUseRefShallowRendering/>
        <ComponentUseRef2 />
      </header>
    </div>
  );
}

export default App;
