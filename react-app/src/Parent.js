import { useState } from "react";
import Child1 from "./Child1";
const Parent = () => {
    const [name, setName] = useState("Hammad");
    return (
        <div>
        <Child1 name={name}/>
        </div>
    )
}

export default Parent;