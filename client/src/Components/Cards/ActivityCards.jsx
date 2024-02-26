import { usePagination } from "../../Hooks/UsePagination";
import ActivityCard from "../Card/activityCard";
import { useState } from "react";
import './ActivityCard.css'; // Import your CSS file for styles
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const ActivityCards = ({ activities }) => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    name: "",
    difficulty: "",
  });

  const [sortOrder, setSortOrder] = useState("asc");

  const filteredActivities = activities
    .filter((activity) => {
      const nameMatches = activity.name.toLowerCase().includes(filters.name.toLowerCase());
      const difficultyMatches =
        filters.difficulty === "" || parseInt(activity.difficulty, 10) === parseInt(filters.difficulty, 10);
      return nameMatches && difficultyMatches;
    })
    .sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      const compareResult = sortOrder === "asc" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
      return compareResult;
    });

  const { currentPage, currentItems, nextPage, prevPage, totalPages } =
    usePagination(filteredActivities, 10);

  const handleFilterChange = (filterName, value) => {
    setFilters({
      ...filters,
      [filterName]: value,
    });
  };

  const handleSortOrderChange = (value) => {
    setSortOrder(value);
  };

  return (
    <div className="ActivitiesContainer">
      <button className="FormButton" onClick={() => navigate("/home")}> ◀ BACK</button>
      <h2>THESE ARE THE ACTIVITIES CREATED SO FAR:</h2>
      <div className="FiltersContainer">
        <input
          className="inputSearch"
          type="text"
          placeholder="Filter by Name"
          value={filters.name}
          onChange={(e) => handleFilterChange("name", e.target.value)}
        />
        <select
          value={filters.difficulty}
          onChange={(e) => handleFilterChange("difficulty", e.target.value)}
        >
          <option value="">Filter by Difficulty</option>
          <option value="1">1 (Easy)</option>
          <option value="2">2 (Easy - Medium)</option>
          <option value="3">3 (Medium)</option>
          <option value="4">4 (Medium - Hard)</option>
          <option value="5">5 (Hard)</option>
        </select>
        <select value={sortOrder} onChange={(e) => handleSortOrderChange(e.target.value)}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <button onClick={() => navigate("/activity")}>
          Do you want to create another activity?
        </button>
      </div>
      <div className="ActivityCardsList">
        {currentItems.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
      <div className="ActivityCardsControls">
        <button className="ActivityCardsButton" onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span className="ActivityCardsSpan">Page {currentPage} of {totalPages}</span>
        <button
          className="ActivityCardsButton"
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ActivityCards;
