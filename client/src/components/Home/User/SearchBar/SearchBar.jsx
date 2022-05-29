import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { jobsSearchBar } from "../../../../redux/jobs/jobsSearchBar";
import style from "./SearchBar.module.css";

function SearchBar() {
  const [tech, setTech] = useState("");

  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    setTech(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(jobsSearchBar(tech));
  };
  return (
    <div>
      <div className={style.SearchBar}>
        <form>
            <input
            className={style.searchTerm}
              onChange={(e)=> handleChange(e)}        
              type="search"
              placeholder="Search Technologies..."
            />
            <button
            className={style.BtnSearch}
            onClick={(e) => handleSubmit(e)}
              type="submit"
            >
              <span className="material-symbols-outlined">search</span>
             
            </button>
            </form>
          </div>

    </div>
  );
}

export default SearchBar;
