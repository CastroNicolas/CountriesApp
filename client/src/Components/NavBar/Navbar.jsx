import { Searchbar } from "../Search/searchbar"
import './Navbar.css'
// eslint-disable-next-line react/prop-types
export const Navbar = () => {
  return (
    <div className="navbar">
      <Searchbar/>
      <button className="logout-button ">LogOut</button>
    </div>
  );
};
