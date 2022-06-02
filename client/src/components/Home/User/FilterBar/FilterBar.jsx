import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTechs } from "../../../../redux/techs/techs";
import { fetchJobs } from "../../../../redux/jobs/jobs";
import style from "./FilterBar.module.css"
import SearchBar from "../SearchBar/SearchBar";
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
    <div className="animate__animated animate__fadeIn">  
     <div className={style.filterBar}>   
    
       <div className={style.filterSet}>
       <SearchBar />

       <div className={style.filterSet_menu}>
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
    </div>
  );
}

export default FilterBar;



// import React, {Component, useEffect, useState } from "react";
// import Select from 'react-select';
// import { useDispatch, useSelector } from "react-redux";
// import { fetchTechs } from "../../../../redux/techs/techs";
// import { fetchJobs } from "../../../../redux/jobs/jobs";
// import style from "./FilterBar.module.css"
// import SearchBar from "../SearchBar/SearchBar";
// import {customStyles} from './StyleSelect'
// import {optionsTech, optionsTime, optionsSeniority, optionsLevel, optionsSalary} from './Options'



// function FilterBar() {
//   const techs = useSelector((state) => state.techs.techs);
//   const [tech, setTech] = useState("");
//   const [seniority, setSeniority] = useState("");
//   const [time, setTime] = useState("");
//   const [eLevel, setELevel] = useState("");
//   const [salary, setSalary] = useState("");

//   const dispatch = useDispatch();

//   const handleChangeSelectTech = (e) => {
//     let {value} = e
//     setTech(value);
//   }

//   const handleChangeSeniority = (e) =>{
//     let {value} = e
//     setSeniority(value)   
//   }

//   const handleChangeTime = (e) => {
//     let {value} = e
//     setTime(value)
//   }
  
//   const handleChangeLevel = (e) => {
//     let {value} = e
//     setELevel(value)
//   }

//   const handleChangeSalary = (e) => {
//     let {value} = e
//     setSalary(value)
//   }
//   useEffect(() => {
//     dispatch(fetchTechs());
   
//     dispatch(fetchJobs({tech, seniority, time, eLevel, salary}));
    
//   }, [dispatch, tech, seniority, time, eLevel, salary]);
//   return (
//     <div className="animate__animated animate__fadeIn">  
//      <div className={style.filterBar}>   
    
//        <div className={style.filterSet}>
//        <SearchBar />

//        <div className={style.filterSet_menu}>
//            <Select
//             styles={customStyles}
//             options={optionsTech} 
//             defaultValue={optionsTech[0]} 
//             onChange={handleChangeSelectTech}/>
            
           
            
//             <Select
//             styles={customStyles}
//             options={optionsSeniority} 
//             defaultValue={optionsSeniority[0]} 
//             onChange={handleChangeSeniority}/>
            

//           <Select
//             styles={customStyles}
//             options={optionsTime} 
//             defaultValue={optionsTime[0]} 
//             onChange={handleChangeTime}/>


//             <Select
//             styles={customStyles}
//             options={optionsLevel} 
//             defaultValue={optionsLevel[0]} 
//             onChange={handleChangeLevel}/>



//             <Select
//             styles={customStyles}
//             options={optionsSalary}
//             defaultValue={optionsSalary[0]}
//             onChange={handleChangeSalary}/>


//             </div>

//         </div>
//       </div>
//     </div>
//   );
// }

// export default FilterBar;

