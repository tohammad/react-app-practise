import ProductsCategoryRow from "./ProductsCategoryRow";
import ProductsRow from "./ProductsRow";

const ProductsTable = ({ products }) => {
  console.log('ProductsTable')
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => {
          return (
            <>
              <ProductsCategoryRow
                key={product.category}
                category={product.category}
              />
              {product.data.map((productData) => {
                return <ProductsRow key={productData.name} {...productData} />;
              })}
            </>
          );
        })}
      </tbody>
    </table>
  );
};

export default ProductsTable;
