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
      
       <div className={style.filterSet}>

          <select className={style.filter} onChange={(e) => handleTechs(e)}>
            <option value="" default>Technologies</option>
            {techs.map((e) => e.name==='Cplus'?(
                <option key={e.id} value={e.name}>C+</option>
                  ): e.name==='Cplusplus'?(
                    <option key={e.id} value={e.name}>C++</option>
                      ) : e.name==='CSharp'? 
                      <option key={e.id} value={e.name}>C#</option>
                      : (
                <option key={e.id} value={e.name}>{e.name}</option>
                  ))}
          </select>
         
            <select className={style.filter} onChange={(e) => handleSeniorF(e)}>
             
             <option value="" default>Seniority</option>
              <option value='Not Specified'>Not Specified</option>
              <option value="Senior">Senior</option>
              <option value="Semi-Senior">Semi-Senior</option>
              <option value="Junior">Junior</option>
            </select>
          

         
            <select className={style.filter} onChange={(e) => handleTimeF(e)}>
            <option value="" default>Time</option>
              <option value='Not Specified'>Not Specified</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Full-Time">Full-Time</option>
            </select>
         
         
            <select className={style.filter} onChange={(e) => handleELevelF(e)}>
            <option value="" default>English Level</option>
              <option value="Not required">Not required</option>
              <option value="Basic">Basic</option>
              <option value="Conversational">Conversational</option>
              <option value="Advanced or Native">Advanced or Native</option>
            </select>
         

         
            <select className={style.filter}  onChange={(e) => handleSalaryF(e)}>
            <option value="" default>Salary</option>
              <option value='Not Specified'>Not Specified</option>
              <option value="0$ - 1000$">0$ - 1000$</option>
              <option value="1000$ - 3000$">1000$ - 3000$</option>
              <option value="3000$ - 6000$">3000$ - 6000$</option>
              <option value="6000$ - 10000$">6000$ - 10000$</option>
              <option value="10000$">+ 10000$</option>
            </select>
          
        
        </div>
      </div>
    </div>
  );
}

export default FilterBar;

