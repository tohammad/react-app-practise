import { useState, useEffect, useMemo } from "react";
const Parent = () => {
  console.log("Parent Renders");
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [todos, setTodos] = useState([]);
  const [currentUserId, setCurrentUserId] = useState("");
  const increment = () => {
    setCount(count + 1);
  };
  const getUsers = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const usersRes = await response.json();
    setUsers(usersRes);
  };
  const getToDos = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const todoRes = await response.json();
    setTodos(todoRes);
  };

  const getToDoDetail = (userId) => {
    setCurrentUserId(userId);
  };

  const getBonus = (userId) => {
    let bonus = 0;
    const result = todos.filter(
      (todo) => todo.userId === userId && todo.completed === true
    );
    if (result) {
      if (result.length > 10) {
        bonus = 50;
      } else if (result.length >= 1 && result.length < 10) {
        bonus = 25;
      }
    }
    console.log("Calculating Bonus...");
    return bonus;
  };
  const bonus = useMemo(() => getBonus(currentUserId), [currentUserId]);

  useEffect(() => {
    getUsers();
    getToDos();
  }, []);
  return (
    <>
      <div className="row">
        <div className="column">
          <h2>Count: {count}</h2>
          <button onClick={() => increment()}>Increment Count</button>
        </div>

        <div className="column">
          <h2>Bonus: {bonus}</h2>
        </div>
      </div>
      <div class="listItems col-12">
        <ul class="todo">
          {users.map((user, index) => {
            return (
              <li key={index}>
                {user.name}
                <div class="buttons">
                  <button onClick={() => getToDoDetail(user.id)}>
                    Calculate Bonus
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Parent;
