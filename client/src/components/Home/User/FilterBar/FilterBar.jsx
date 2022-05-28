import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTechs } from "../../../../redux/techs/techs";
import { fetchJobs } from "../../../../redux/jobs/jobs";
import style from "./FilterBar.module.css"
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
    setTech(e.target.value);
  };

  const handleSeniorF = (e) => {
    e.preventDefault();
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
   
    dispatch(fetchJobs({tech, seniority, time, eLevel, salary}));
    
  }, [dispatch, tech, seniority, time, eLevel, salary]);
  return (
    <div>  
     <div className={style.filterBar}>   
<<<<<<< HEAD
       <label>All Filter</label>
=======
      
>>>>>>> 41a05aabbeadea649c79184afd8332542b776dae
       <div className={style.filterSet}>

          <select className={style.filter} onChange={(e) => handleTechs(e)}>
            <option value="" default>Technologies</option>
<<<<<<< HEAD
            {techs.map((e, i) => (
              <option key={i} value={e.name}>{e.name}</option>
=======
            {techs.map((e) => (
              <option key={e.id} value={e.name}>{e.name}</option>
>>>>>>> 41a05aabbeadea649c79184afd8332542b776dae
              
            ))}
          </select>
         
            <select className={style.filter} onChange={(e) => handleSeniorF(e)}>
             
             <option value="" default>Seniority</option>
              <option value="No Especificado">No Especificado</option>
              <option value="Senior">Senior</option>
              <option value="Semi-Senior">Semi-Senior</option>
              <option value="Junior">Junior</option>
            </select>
          

         
            <select className={style.filter} onChange={(e) => handleTimeF(e)}>
<<<<<<< HEAD
            <option value="" default>Time</option>
=======
            <option value="" default>Horario</option>
>>>>>>> 41a05aabbeadea649c79184afd8332542b776dae
              <option value="No Especificado">No Especificado</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Full-Time">Full-Time</option>
            </select>
         
         
            <select className={style.filter} onChange={(e) => handleELevelF(e)}>
            <option value="" default>English Level</option>
              <option value="No Especificado">No Especificado</option>
              <option value="No Requerido">No Requerido</option>
              <option value="Basic">Basic</option>
              <option value="Conversational">Conversational</option>
              <option value="Advanced or Native">Advanced or Native</option>
            </select>
         

         
            <select className={style.filter}  onChange={(e) => handleSalaryF(e)}>
            <option value="" default>Salary</option>
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
  );
}

export default FilterBar;

