import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './detail.css'

// function formatNumber(number) {
//   return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
// }

export const CountryDetail = () => {
  const { id } = useParams();
  const [country, setCountry] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3001/countries/id/${id}`)
      .then(({ data }) => {
        if (data.name) {
          setCountry(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching country:", error);
        setCountry({});
      });
  }, [id]);

  return (
    <div className="detailBody">
      <div className="detailContainer">
      <div className="detailImage">
        {country.imageFlag && <img src={country.imageFlag} alt={country.name} />}
      </div>
      </div>

      <div className="detailData">
          <h1>{country.id}</h1>
          <h2>{country.name} </h2>
        <h2>Capital: {country.capital} </h2>
        <h2>Continent: {country.continent} </h2>
        <h2>Subregion: {country.subregion} </h2>
        <h2>Area: {country.area}km² </h2>
        <h2>Population: {country.population} </h2> 
        {/* <h2>Area: {formatNumber(country.area)}km² </h2>
        <h2>Population: {formatNumber(country.population)} </h2>  */}
      </div>
    </div>

  );
}