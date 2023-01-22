import { useDispatch } from "react-redux";
import { authActions } from "../store/index";
const Auth = () => {
  const dispatch = useDispatch();
  const handleLogin = () => {
    dispatch(authActions.login());
  };
  return (
    <div>
      username: <input type="text" />
      password: <input type="password" />
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
};
export default Auth;
