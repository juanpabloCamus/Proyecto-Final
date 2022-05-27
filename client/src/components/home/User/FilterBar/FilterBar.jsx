import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTechs } from "../../../../redux/techs/techs";
import { fetchJobs } from "../../../../redux/jobs/jobs";

function FilterBar() {
  const techs = useSelector((state) => state.techs.techs);
  const [tech, setTech] = useState("");
  const [seniority, setSeniority] = useState("");
  const [time, setTime] = useState("");
  const [eLevel, setELevel] = useState("");
  const [salary, setSalary] = useState("");

  const dispatch = useDispatch();

  const handleTechs = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setTech(e.target.value);
  };

  const handleSeniorF = (e) => {
    e.preventDefault();
    console.log(e.target.value)
    setSeniority(e.target.value);
  };
  const handleTimeF = (e) => {
    e.preventDefault();
    setTime(e.target.value);
  };
  const handleELevelF = (e) => {
    e.preventDefault();
    setELevel(e.target.value);
  };

  const handleSalaryF = (e) => {
    e.preventDefault();
    setSalary(e.target.value);
  };
  useEffect(() => {
    dispatch(fetchTechs());
    
    dispatch(fetchJobs(tech, seniority, time, eLevel, salary));
  }, [dispatch, tech, seniority, time, eLevel, salary]);
  return (
    <div>
      <div>
        <div>
          <select onChange={(e) => handleTechs(e)}>
            {techs.map((e) => (
              <option value={e.name}>{e.name}</option>
            ))}
          </select>
          <div>
            <select onChange={(e) => handleSeniorF(e)}>
             
             <option value="" default>All</option>
              <option value="No Especificado">No Especificado</option>
              <option value="Senior">Senior</option>
              <option value="Semi-Senior">Semi-Senior</option>
              <option value="Junior">Junior</option>
            </select>
          </div>

          <div>
            <select onChange={(e) => handleTimeF(e)}>
            <option value="" default>All</option>
              <option value="No Especificado">No Especificado</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Full-Time">Full-Time</option>
            </select>
          </div>

          <div>
            <select onChange={(e) => handleELevelF(e)}>
            <option value="" default>All</option>
              <option value="No Especificado">No Especificado</option>
              <option value="No Requerido">No Requerido</option>
              <option value="Basic">Basic</option>
              <option value="Conversational">Conversational</option>
              <option value="Advanced or Native">Advanced or Native</option>
            </select>
          </div>

          <div>
            <select onChange={(e) => handleSalaryF(e)}>
            <option value="" default>All</option>
              <option value="No Especificado">No Especificado</option>
              <option value="0$ - 1000$">0$ - 1000$</option>
              <option value="1000$ - 3000$">1000$ - 3000$</option>
              <option value="3000$ - 6000$">3000$ - 6000$</option>
              <option value="6000$ - 10000$">6000$ - 10000$</option>
              <option value="+ 10000$">+ 10000$</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
