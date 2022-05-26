import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTechs } from "../../../../redux/techs/techs";

function FilterBar() {
  const techs = useSelector((state) => state.techs.techs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTechs());
  }, [dispatch]);
  return (
    <div>
      <div>
      
           
           {techs.length>0 ? techs.map(e=>
           <div>
           <label>{e.name}</label>
           <input>{e.name}</input>
           </div>           
           ): <input>NO hay nada</input>}
    
    
      </div>
    </div>
  );
}

export default FilterBar;
