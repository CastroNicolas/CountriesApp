/* eslint-disable react/prop-types */
import { CountryCard } from "../Card/CountryCard";
import './CountryCards.css'
import { usePagination } from "../../Hooks/UsePagination";

export const CountriesCards = ({countries}) => {
  const { currentPage, currentItems, nextPage, prevPage, totalPages } =
  usePagination(countries, 10);

  return (
    <div className="CountriesCardsContainer">
      {currentItems.map((country) => (
        <CountryCard key={country.id} country={country} />
      ))}
      <div className="CountryCardsControls">
        <button className="CountryCardsButton" onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span className="CountryCardsSpan">Page {currentPage} of {totalPages}</span>
        <button className="CountryCardsButton" onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};
