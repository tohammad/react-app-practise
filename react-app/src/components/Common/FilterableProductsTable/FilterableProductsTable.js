import { useEffect, useState } from "react";
import ProductsTable from "./ProductsTable";
import SearchBar from "./SearchBar";
const FilterableProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [state, setState] = useState(false);
  
  const initialize = async () => {
    setProducts([
      {
        category: "Stationery Items",
        data: [
          { qty: "150", name: "Notebook" },
          { qty: "100", name: "Paper" },
          { qty: "50", name: "Pen" },
        ],
      },
      {
        category: "Sports Items",
        data: [
          { qty: "5", name: "Bat" },
          { qty: "15", name: "Gloves" },
          { qty: "5", name: "BasketBall" },
        ],
      },
    ]);
  };
  useEffect(() => {
    initialize();
  }, []);
  useEffect(() => {
    setInterval(() => setState(!state), 3000);
  }, [state]);
  return (
    <div>
      <SearchBar />
      <ProductsTable products={products} />
    </div>
  );
};

export default FilterableProductsTable;
