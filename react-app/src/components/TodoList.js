import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
const todoListState = atom({
  key: 'TodoList',
  default: [],
});

const TodoList= () => {
  const todoList = useRecoilValue(todoListState);

  return (
    <>
      {todoList.map((todoItem) => (
        <TodoItem key={todoItem.id} item={todoItem} />
      ))}
    </>
  );
}
export default TodoList;
