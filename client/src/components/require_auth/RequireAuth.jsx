import { Navigate, Outlet } from "react-router"


export const RequireAuth = ({allowedRoles}) => {

const storage = JSON.parse(localStorage.getItem("userData"))



 

  return (
    storage?.profileType?.find(item => allowedRoles.includes(item))
    ?
    <Outlet/>
    :
    <Navigate to="/"/>
  )
}
