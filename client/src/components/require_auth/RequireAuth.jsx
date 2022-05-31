import { useSelector } from "react-redux"
import { useLocation, Navigate, Outlet } from "react-router"


export const RequireAuth = ({allowedRoles}) => {

const location = useLocation()
const { isLogged } = useSelector(state => state.auth)


// console.log(isLogged.profileType)
console.log(allowedRoles)
 

  return (
    ["develop"].find(item => allowedRoles.includes(item))
    ?
    <Outlet/>
    :
    <Navigate to="/" state={{from: location}} replace/>
  )
}
