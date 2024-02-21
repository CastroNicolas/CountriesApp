/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from 'react-redux';
import { CountriesCards } from "../../Components/Cards/CountriesCards"
import { useEffect, useState } from "react";
import { filterByContinent, getAllCountries, sortCountries } from "../../Redux/actions";
import './Home.css'


export const HomePage = () => {
  const [continent, setContinent] = useState('');
  const [order, setOrder] = useState('');


  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries.allCountries) || [];
  const searchResults = useSelector((state) => state.countries.searchResults) || [];
  const filteredResults = useSelector((state) => state.countries.filteredResults) || [];
  const toShow = filteredResults.length > 0 ? filteredResults : searchResults.length > 0 ? searchResults : countries 

  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);

  useEffect(() => {
    if (filteredResults.length === 0) {
      setOrder('')
      setContinent('')
    }
  }, [filteredResults]);
  
  const handleContinentFilter = (e) => {
    dispatch(filterByContinent(e.target.value));
    setContinent(e.target.value)
  };
  const handleSortCountries = (e) => {
    dispatch(sortCountries(e.target.value));
    setOrder(e.target.value)
  };
  return (
    <div className="HomeBody">
      <div className="HomeContainer">
          <select value={continent} onChange={handleContinentFilter}>
            <optgroup label='Filter by Continent:'>
            <option value="All">All Continents</option>
            <option value="Antarctic">Antarctic</option>
            <option value="Americas">America</option>
            <option value="Asia">Asia</option>
            <option value="Africa">Africa</option>
            <option value="Oceania">Oceania</option>
            </optgroup>
          </select>
          <select value={order} onChange={handleSortCountries}>
            <optgroup label='Order by Name:'>
            <option value="Ascending">Ascending</option>
            <option value="Descending">Descending</option>
            </optgroup>
          </select>
        
        <CountriesCards countries={toShow}/>
      </div>
    </div>
  );
}
