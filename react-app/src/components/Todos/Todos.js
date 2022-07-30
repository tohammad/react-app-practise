import React, { useEffect, useState } from "react";
import { getTodos } from "../../services/Todo";

const Todos = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [todos, setToDos] = useState([]);
  const initialize = async () => {
    const todoList = await getTodos();
    setToDos(todoList);
    setIsLoading(false);
  };
  useEffect(() => {
    initialize();
  }, []);
  return isLoading ? (
    <p> Loading...</p>
  ) : (
    <>
      <div>{todos.map((todo) => todo.title)}</div>{" "}
    </>
  );
};

export default Todos;
