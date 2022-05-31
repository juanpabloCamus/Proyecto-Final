import {Routes,Route} from "react-router-dom"
import { AppRouter } from "./routes/AppRouter";


import { LandinPageRoute } from "./routes/LandinPageRoute";


import './App.css'
import { LandinPage } from "./components/landin_page/LandinPage";
import { RequireAuth } from "./components/require_auth/RequireAuth";
import { Company } from "./components/Home/Company/Company";
import { Admin } from "./components/admin/Admin";
import Home from "./components/Home/Home";

const ROLES ={
  developer: "develop",
  company: "company",
  admin: "admin"
}


function App() {

  return <div className="app__container">
    <Routes>
      {/* <Route path="/" element={<AppRouter />}> */}

        {/* Public Routes*/}
        <Route path="/" element={ <LandinPage /> } />

        {/* Private Routes */}
        <Route 
        path="home"
        element={
          <RequireAuth  allowedRole={["develop"]} >
            <Home />
          </ RequireAuth>
        }
        />

        <Route 
        path="company"
        element={
          <RequireAuth  allowedRole={["company"]} >
            <Company />
          </ RequireAuth>
        }
        />
           
       
        <Route
        path="admin"
         element={
          <RequireAuth  allowedRole={["admin"]} >
            <Admin/>
          </ RequireAuth>
        }
        />

      {/* </Route> */}
    </Routes>
    </div>
}

export default App;
