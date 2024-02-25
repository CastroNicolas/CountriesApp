import { useEffect, useState } from "react";
import ActivityCards from "../../components/Cards/activityCards";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const URL = "http://localhost:3001/activities";

const Activities = () => {
  const [activities, setActivities] = useState([]);

  const navigate = useNavigate();

  const getAllActivities = async () => {
    try {
      const { data } = await axios(URL);
      setActivities(data);
    } catch (error) {
      error.response && error.response.data
        ? alert(error.response.data)
        : alert(error.message);
    }
  };
  useEffect(() => {
    getAllActivities();
  }, []);

  return (
    <div>
      <button onClick={() => navigate("/home")}>◀ BACK</button>
      <ActivityCards activities={activities} />
    </div>
  );
};

export default Activities;