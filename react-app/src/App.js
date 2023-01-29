import { useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";

import {sendCartData} from "./store/cart-slice";
import { useSelector, useDispatch } from "react-redux";
function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    // const sendData = async () => {
    //   await fetch("https://localhost:3000/api/", {
    //     method: "PUT",
    //     body: JSON.stringify(cart),
    //   });
    // };
    // sendData();
    dispatch(sendCartData(cart));
  }, [cart, dispatch]);
  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
