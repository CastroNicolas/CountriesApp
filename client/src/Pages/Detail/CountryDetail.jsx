import axios from "axios";
import { useEffect, useState } from "react";
import './detail.css'
import { useNavigate, useParams } from "react-router-dom";

function formatNumber(number) {
  return number
    ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    : "N/A";
}

export const CountryDetail = () => {
  const { id } = useParams();
  const [country, setCountry] = useState({});
  const navigate = useNavigate();
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

      <button className="FormButton" onClick={() => navigate("/home")}> ◀ BACK</button>
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
        <h2>Area: {formatNumber(country.area)}km² </h2>
        <h2>Population: {formatNumber(country.population)} </h2>

        <h2>
          {country.activities && country.activities.length > 0 ? (
            <li>activities: {country.activities.map(activity => activity.name).join(', ')}</li>
          ) : (
            <li>No activities done yet</li>
          )}
        </h2>

      </div>
    </div>

  );
}