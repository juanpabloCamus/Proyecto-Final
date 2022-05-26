import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../../redux/users/users";

function FilterBar() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers({}));
  }, [dispatch]);
  return (
    <div>
      <div>

           {/* <div>      
           {techs.length>0 ? techs.map(e=>
          <>
           <label>{e.name}</label>
           <input value={e.name}>{e.name}</input>
           </>        
           ): <label>NO hay nada</label>} 
    
     </div>  */}

      </div>
    </div>
  );
}

export default FilterBar;
