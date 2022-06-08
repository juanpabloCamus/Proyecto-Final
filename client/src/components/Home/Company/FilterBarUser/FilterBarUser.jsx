import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useDispatch } from "react-redux";
import style from "../../User/FilterBar/FilterBar.module.css";
import { customStyles } from "../../User/FilterBar/StyleSelect";
import {
  optionsSeniority,
  optionsLevel,
  optionsStack
} from "../../User/FilterBar/Options";
 

function FilterBar() {

 const [stack, setStack] = useState("");
  const [seniority, setSeniority] = useState("");
  const [eLevel, setELevel] = useState("");
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  const handleChangeStack = (e) => {
    let { value } = e;
    setStack(value);
  };
  const handleChangeSeniority = (e) => {
    let { value } = e;
    setSeniority(value);
  };



  const handleChangeLevel = (e) => {
    let { value } = e;
    setELevel(value);
  };


  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  useEffect(() => {
    // dispatch(fetchJobs({stack, seniority, time, eLevel, search }));
  }, [dispatch, stack,seniority, eLevel, search]);

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
                placeholder="Search developers.."
              />
            </form>
          </div>

          <div className={style.filterSet_menu}>
 
          <Select
              styles={customStyles}
              options={optionsStack}
              defaultValue={optionsStack[0]}
              onChange={handleChangeStack}
            />
            <Select
              styles={customStyles}
              options={optionsSeniority}
              defaultValue={optionsSeniority[0]}
              onChange={handleChangeSeniority}
            />
            

            <Select
              styles={customStyles}
              options={optionsLevel}
              defaultValue={optionsLevel[0]}
              onChange={handleChangeLevel}
            />

          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
