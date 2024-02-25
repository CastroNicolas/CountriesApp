/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import './CountryCard.css'

export const CountryCard = ({ country }) => {
  return (
    <div className="CountryCardConteiner">
      <div className="CountryCard">

      <img className="CountryCardImg" src={country.imageFlag} alt={country.name} />
      <h3 className="CountryCardh3">{country.name}</h3>
      <h3 className="CountryCardh3">{country.continent}</h3>
      <Link className="CountryCardLink" to={`/country/${country.id}`}>More...</Link>
      </div>
    </div>
  )
}
