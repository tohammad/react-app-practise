import { useState, useEffect, useTransition } from "react";
const MyComponent = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isPending, startTransition] = useTransition();

  const getUsers = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const usersRes = await response.json();
    setUsers(usersRes);
    setFilteredUsers(usersRes);
  };

  const handleSearch = (event) => {
    startTransition(() => {
      setSearchText(event.target.value);
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    const filteredUsers = users.filter((user) =>
      user.name.includes(searchText)
    );
    setFilteredUsers(filteredUsers);
  }, [searchText]);

  return (
    <>
      <div className="row">
        <div className="column">
          <h2>Search User</h2>
          <input type="text" placeholder="user name" onChange={handleSearch} />
          {isPending && <p>Updating List...</p>}
        </div>
      </div>

      <div class="listItems col-12">
        <ul class="todo">
          {filteredUsers.map((user, index) => {
            return <li key={index}>{user.name}</li>;
          })}
        </ul>
      </div>
    </>
  );
};

export default MyComponent;
