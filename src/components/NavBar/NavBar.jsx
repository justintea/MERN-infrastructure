import { NavLink } from "react-router-dom";
import * as userService from '../../utilities/users-service';

export default function NavBar({ user }) {
  
  function handleLogout() {
    //? do 2 things: remove the token from localStorage, and set User state = null. 
    userService.logOut();
    setUser(null);
  }


  return (
    <>
      <nav>
        {/* NavBar */}

        {/* <ul>
        <li>
          <NavLink to="/orders">Orders History</NavLink>
        </li>
        <li>
          <NavLink to="/orders/new">New Order</NavLink>
        </li>
      </ul> */}
        {/* 
        <Link to="/orders">Order History</Link>
        &nbsp; | &nbsp;
        <Link to="/orders/new">New Order</Link> */}


        <NavLink to="/orders">Order History</NavLink>
        &nbsp; | &nbsp;
        <NavLink to="/orders/new">New Order</NavLink>
        &nbsp; | &nbsp;
        <span>Welcome, {user.name} </span>
        &nbsp;&nbsp;
        <NavLink to='' onClick={handleLogout} > Log Out </NavLink> 
      </nav>
    </>
  );
}
