/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from 'react-redux';
import { CountriesCards } from "../../Components/Cards/CountriesCards"
import { useEffect, useState } from "react";
import { filterByContinent, filterByPopulation, getAllCountries, sortCountries } from "../../Redux/actions";
import './Home.css'
import { Navbar } from '../../Components/NavBar/Navbar';


export const HomePage = () => {
  const [continent, setContinent] = useState('');
  const [order, setOrder] = useState('');
  const [orderPopulation, setOrderPopulation] = useState('');

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
      setOrderPopulation('')
    }
  }, [filteredResults]);
  
  const handleResetFilters = () => {
  
    dispatch(filterByContinent('All'));
    dispatch(sortCountries('All'));
  }; 

  const handleContinentFilter = (e) => {
    dispatch(filterByContinent(e.target.value));
    setContinent(e.target.value)
  };
  const handleSortCountries = (e) => {
    dispatch(sortCountries(e.target.value));
    setOrder(e.target.value)
  };
  const handleSortPopulation = (e) => {
    dispatch(filterByPopulation(e.target.value));
    setOrderPopulation(e.target.value)
  };
  return (
    <div className="HomeBody">
      <Navbar />
      <div className='FiltersContainer'>

          <select value={continent} onChange={handleContinentFilter}>
            <optgroup label='Filter by Continent:'>
            <option value="All">All Continents</option>
            <option value="Antarctic">Antarctic</option>
            <option value="Americas">America</option>
            <option value="Asia">Asia</option>
            <option value="Africa">Africa</option>
            <option value="Oceania">Oceania</option>
            <option value="Europe">Europe</option>
            </optgroup>
          </select>
          <select value={order} onChange={handleSortCountries}>
            <optgroup label='Order by Name:'>
            <option value="Ascending">Ascending</option>
            <option value="Descending">Descending</option>
            </optgroup>
          </select> <select value={orderPopulation} onChange={handleSortPopulation}>
            <optgroup label='Order by Population:'>
            <option value="Ascending">Ascending</option>
            <option value="Descending">Descending</option>
            </optgroup>
          </select>
         <button onClick={handleResetFilters}>Reset Filters</button>
      </div>
      <div className="HomeContainer">
        <CountriesCards countries={toShow}/>
      </div>
    </div>
  );
}
