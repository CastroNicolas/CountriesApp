import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import validateField from "./validate";
import { getAllCountries, selectCountry } from "../../../Redux/actions";
import { useNavigate } from "react-router-dom";
import './ActivityForm.css'

const URL = "http://localhost:3001/activities";

export const ActivityForm = () => {
  const navigate = useNavigate();
  const [activityValues, setActivityValues] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countriesId: [],
  });

  const [errors, setErrors] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countriesId: "",
  });


  const allCountries = useSelector((state) => state.countries.allCountries);
  const [countriesCopied, setCountriesCopied] = useState([]);

  useEffect(() => {
    setCountriesCopied(allCountries)
  }, [allCountries])

  const dispatch = useDispatch();

  const createActivity = async (formValues) => {
    const { name, countriesId, difficulty, duration, season } = errors
    if (name || countriesId || difficulty || duration || season) {
      alert('Please use valid data.')
      return
    }
    try {
      const { data } = await axios.post(URL, formValues);

      if (data.name) {
        dispatch(getAllCountries());
      }
      alert("Activity created successfully");
    } catch (error) {
      error.response && error.response.data
        ? alert(JSON.stringify(error.response.data, null, 2))
        : alert("Error creating activity. Please check the console for details.");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, countriesId, difficulty, duration, season } = activityValues
    if (!name || !countriesId.length || !difficulty || !duration || !season) {
      alert('All fields are required.')
      return
    }
    createActivity(activityValues);
    setActivityValues({
      name: "",
      difficulty: "",
      duration: "",
      season: "",
      countriesId: [],
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target

    setActivityValues({
      ...activityValues,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: validateField(name, value),
    })
  };

  const handleChangeCountries = (event) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    dispatch(selectCountry(selectedOptions));
    setActivityValues({
      ...activityValues,
      countriesId: selectedOptions,
    });
    setErrors(
      {
        ...errors,
        countriesId: validateField("countriesId", selectedOptions),
      }
    );
  };

  return (
    <div className="Formbody">
      <button className="FormButton" onClick={() => navigate("/home")}> ◀ BACK</button>
      <div className="FormContainer">

        <form className="formC" onSubmit={handleSubmit}>
          <div>
            <label htmlFor='name'>Name:</label>
            <input
              type='text'
              name='name'
              value={activityValues.name}
              onChange={handleChange}
            />
            {errors.name && <span>{errors.name}</span>}
          </div>
          <div>
            <label htmlFor='difficulty'>Select difficulty:</label>
            <select
              name='difficulty'
              value={activityValues.difficulty}
              onChange={handleChange}
            >
              <option value='' disabled>
                Select difficulty
              </option>
              <option value='1'>Difficulty 1</option>
              <option value='2'>Difficulty 2</option>
              <option value='3'>Difficulty 3</option>
              <option value='4'>Difficulty 4</option>
              <option value='5'>Difficulty 5</option>
            </select>
            {errors.difficulty && (
              <span>{errors.difficulty}</span>
            )}
          </div>
          <div>
            <label htmlFor='duration'>Duration (hr):</label>
            <input
              type='number'
              name='duration'
              value={activityValues.duration}
              onChange={handleChange}
            />
            {errors.duration && <span>{errors.duration}</span>}
          </div>
          <div>
            <label htmlFor='season'>Select season:</label>
            <select
              name='season'
              value={activityValues.season}
              onChange={handleChange}
            >
              <option value='' disabled>
                Select season
              </option>
              <option value='Summer'>Summer</option>
              <option value='Autumn'>Autumn</option>
              <option value='Winter'>Winter</option>
              <option value='Spring'>Spring</option>
            </select>
            {errors.season && <span>{errors.season}</span>}
          </div>
          <div>
            <label htmlFor='countries'>Select country/es: </label>
            <select
              className="formCSelectMultiple"
              name='countries'
              value={activityValues.countriesId}
              onChange={handleChangeCountries}
              multiple
            >
              <option value='' disabled>
                Select country/es
              </option>
              {countriesCopied.map((country) => (
                <option
                  value={country.id} key={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
            {errors.countriesId && (
              <span>{errors.countriesId}</span>
            )}
          </div>
          <button className="FormButtonSubmit" type='submit'>Create</button>
        </form>
      </div>
      <button className="FormButton" onClick={() => navigate("/activities")}>
        Do you want to see all the activities created so far?
      </button>
    </div>
  );
};