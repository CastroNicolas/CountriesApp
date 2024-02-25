import { NavLink } from "react-router-dom";
import { Searchbar } from "../Search/searchbar"
import './Navbar.css'
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar">
       <NavLink
        to="/home"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }
      >
        <h2>HOME</h2>
      </NavLink>
      <NavLink
        to="/activities"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }
      >
        <h2>ACTIVITIES</h2>
      </NavLink>
      
      <NavLink
        to="/activity"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }
      >
        <h2>NEW ACTIVITY</h2>
      </NavLink>
      
      <Searchbar/>
      <button className="logout-button" 
       onClick={() => navigate("/")}
      >LogOut</button>
    </div>
  );
};
