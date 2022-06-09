import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { fetchJobs } from "../../../../redux/jobs/jobs";
import style from "./FilterBar.module.css";
import { customStyles } from "./StyleSelect";
import {
  optionsTech,
  optionsTime,
  optionsSeniority,
  optionsLevel,
  optionsSalary,
} from "./Options";
 

function FilterBar() {
  const [tech, setTech] = useState("");
  const [seniority, setSeniority] = useState("");
  const [time, setTime] = useState("");
  const [eLevel, setELevel] = useState("");
  const [salary, setSalary] = useState("");
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  const handleChangeSelectTech = (e) => {
    let { value } = e;
    setTech(value);
  };

  const handleChangeSeniority = (e) => {
    let { value } = e;
    setSeniority(value);
  };

  const handleChangeTime = (e) => {
    let { value } = e;
    setTime(value);
  };

  const handleChangeLevel = (e) => {
    let { value } = e;
    setELevel(value);
  };

  const handleChangeSalary = (e) => {
    let { value } = e;
    setSalary(value);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  useEffect(() => {
    dispatch(fetchJobs({ tech, seniority, time, eLevel, salary, search }));
  }, [dispatch, tech, seniority, time, eLevel, salary, search]);

  return (
    <div className="animate__animated animate__fadeIn">
      <div className={style.filterBar}>
        <div className={style.filterSet}>
          <div className={style.searchBar}>
            <form>
              <input
                className={style.searchTerm}
                onChange={(e) => handleChange(e)}
                type="search"
                placeholder="Search company or position.."
              />
            </form>
          </div>

          <div className={style.filterSet_menu}>
            <Select
              styles={customStyles}
              options={optionsTech}
              defaultValue={optionsTech[0]}
              onChange={handleChangeSelectTech}
            />

            <Select
              styles={customStyles}
              options={optionsSeniority}
              defaultValue={optionsSeniority[0]}
              onChange={handleChangeSeniority}
            />

            <Select
              styles={customStyles}
              options={optionsTime}
              defaultValue={optionsTime[0]}
              onChange={handleChangeTime}
            />

            <Select
              styles={customStyles}
              options={optionsLevel}
              defaultValue={optionsLevel[0]}
              onChange={handleChangeLevel}
            />

            <Select
              styles={customStyles}
              options={optionsSalary}
              defaultValue={optionsSalary[0]}
              onChange={handleChangeSalary}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
