const MultiSelect = (props) => {
  const onAddItem = (itemToAdd) => {
    props.onChange([...props.countries, itemToAdd]);
  };

  const onRemoveItem = (itemToRemove) => {
    const updatedItems = props.countries.filter(
      (item) => item !== itemToRemove
    );
    props.onChange(updatedItems);
  };

  const onClickClearAll = () => {
    props.onChange([]);
  };

  return (
    <div>
      <select name="select">
        {props.value.map((n) => {
          return (
            <option value={n}>
              {n}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default MultiSelect;
