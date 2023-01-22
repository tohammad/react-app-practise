import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/index";
const Header = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(authActions.logout());
  };  
  return (
    <header>
      <h1>Redux</h1>
      {isAuthenticated && (
        <nav>
          <ul>
            <li>
              <a href="/">My Tasks</a>
            </li>
            <li>
              <a href="/">Team Tasks</a>
            </li>
            <li>
              <a onClick={handleLogout} href="/">Logout</a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};
export default Header;
