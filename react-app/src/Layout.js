import { useLayoutEffect, useState } from "react";
const Layout = () => {
  const [value, setValue] = useState(0);
  useLayoutEffect(() => {
    for (let i = 0; i < 9000; i++) {
      console.log(i);
    }
    if (value === 0) {
      setValue(10 + Math.random() * 200);
    }
  }, [value]);
  return (
    <>
      <div>
        <h2>useLayoutEffect: {value}</h2>
        <button onClick={() => setValue(0)}>Change Value</button>
      </div>
    </>
  );
};

export default Layout;
