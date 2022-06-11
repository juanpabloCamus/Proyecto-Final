import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../../../../redux/jobs/jobs";
import style from "./FilterBar.module.css";
import { customStyles } from "./StyleSelect";
import {
  optionsTime,
  optionsSeniority,
  optionsLevel,
  optionsSalary,
} from "./Options";
import { fetchTechs } from "../../../../redux/techs/techs";
 

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

  const techs = useSelector((state)=>state.techs.techs)
  
  let optionsTech = [{value: "", label:"Technologies"}]

  for(let i=0;i<techs.length;i++){
    let option = { value: techs[i].name, label: techs[i].name === 'Cplus' ? 'C+' : techs[i].name === 'Cplusplus' ? 'C++' : techs[i].name === 'CSharp' ? 'C#' : techs[i].name}
    optionsTech.push(option)
  }

  useEffect(() => {
    dispatch(fetchJobs({ tech, seniority, time, eLevel, salary, search }));
    dispatch(fetchTechs())
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
