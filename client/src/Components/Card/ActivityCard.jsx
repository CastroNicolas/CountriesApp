/* eslint-disable react/prop-types */
import './ActivityCard.css'
const ActivityCard = ({ activity }) => {
  const { name, difficulty, duration, season, countries } = activity;
  
  return (
    <div className='ActivityConteiner'>
      <div className="ActivityCard">
      <h2>{name}</h2>
      <h3>Difficulty: {difficulty}</h3>
      <h3>Duration: {duration}</h3>
      <h3>Season: {season}</h3>
      <h3>Countries:</h3>
      <ul>
        {countries?.map((country, index) => (
          <li key={index}>{country.name}</li>
        ))}
      </ul>
      </div>
    </div>
  );
};

 export default ActivityCard;