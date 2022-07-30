const ProductsRow = ({ name, qty }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{qty}</td>
    </tr>
  );
};

export default ProductsRow;
