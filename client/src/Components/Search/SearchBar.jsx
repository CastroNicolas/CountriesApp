import { useDispatch } from "react-redux";
import { searchCountry } from "../../Redux/actions";
import { useState } from "react";
import '../NavBar/Navbar.css'
// eslint-disable-next-line react/prop-types
export const Searchbar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (searchTerm) => {
    dispatch(searchCountry(searchTerm));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch(searchTerm);
  };

  const onChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <form className="search-container " onSubmit={handleSubmit}>
      <input
        className="inputSearch"
        type="search"
        placeholder="Search Country"
        value={searchTerm}
        onChange={onChange}
      />
      <button
        className="buttonSearch"
        type="submit">Search</button>
    </form>
  );
};
