import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTechs } from "../../../../redux/techs/techs";
import { fetchJobs } from "../../../../redux/jobs/jobs";


function FilterBar() {
    const techs=useSelector(state=>state.techs.techs)
    const [tech, setTech] = useState("")
  const dispatch = useDispatch();

  const handleTechs = (e) => {
    e.preventDefault();
    console.log(e.target.value)
    setTech(e.target.value)
}

  useEffect(() => {
      dispatch(fetchTechs())
    dispatch(fetchJobs(tech));
  }, [dispatch,tech]);
  return (
    <div>
      <div>
      <div  >
        
       <select onChange={(e) => handleTechs(e)}>
          {techs.map((e) => (
            <option value={e.name}>{e.name}</option> 
            ))}
        </select >
       
       </div>
 
     </div>
    </div>
  );
}

export default FilterBar;
