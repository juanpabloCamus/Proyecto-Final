import { useSelector } from "react-redux"
import { useLocation, Navigate, Outlet } from "react-router"


export const RequireAuth = ({allowedRoles}) => {

const storage = JSON.parse(localStorage.getItem("userData"))
const { isLogged } = useSelector(state => state.auth)



 

  return (
    storage?.profileType?.find(item => allowedRoles.includes(item))
    ?
    <Outlet/>
    :
    <Navigate to="/"/>
  )
}
