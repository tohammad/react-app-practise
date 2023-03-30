import { NavLink, Outlet  } from "react-router-dom";
const Contact = () => {
  return (
    <>
      <nav>
        <div>
          <NavLink to="profile">Profile</NavLink>
        </div>
        <div>
          <NavLink to="location">Location</NavLink>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Contact;
