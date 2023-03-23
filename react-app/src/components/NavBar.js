import { NavLink } from 'react-router-dom';

const NavBar = () => {
 return (
    <nav>
       <ul>
          <li>
             <NavLink to="/">Home</NavLink>
          </li>
          <li>
             <NavLink to="/login">Login</NavLink>
          </li>
          <li>
             <NavLink to="/about">About</NavLink>
          </li>
          <li>
             <NavLink to="/contact">Contact</NavLink>
          </li>
       </ul>
    </nav>
 );
};

export default NavBar;