import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PRODUCTS = [
  {
    itemId: 1,
    price: 10,
    name: "React",
    quantity: 1,
    description: "React is awesome",
  },
  {
    itemId: 2,
    price: 15,
    name: "Angular",
    quantity: 1,
    description: "Angular is awesome",
  },
];
const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product) => (
          <ProductItem
            key={product.itemId}
            itemId={product.itemId}
            name={product.name}
            quantity={product.quantity}
            price={product.price}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
