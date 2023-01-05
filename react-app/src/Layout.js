import useFetch from "./useFetch";
const Layout = () => {
  const [users, error] = useFetch("https://jsonplaceholder.typicode.com/users");

  return (
    <>
      {users && users.length > 0 && (
        <div class="listItems col-12">
          <ul class="todo">
            {users.map((user, index) => {
              return <li key={index}>{user.name}</li>;
            })}
          </ul>
        </div>
      )}
      {error && <h2>No record found</h2>}
    </>
  );
};

export default Layout;
