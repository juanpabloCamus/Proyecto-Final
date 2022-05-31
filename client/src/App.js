import {Routes,Route} from "react-router-dom"
import { AppRouter } from "./routes/AppRouter";


import { LandinPageRoute } from "./routes/LandinPageRoute";


import './App.css'
import { LandinPage } from "./components/landin_page/LandinPage";
import { RequireAuth } from "./components/require_auth/RequireAuth";
import { Company } from "./components/Home/Company/Company";
import { Admin } from "./components/admin/Admin";
import Home from "./components/Home/Home";
import PostDetail from "./components/Home/User/Post/PostDetail/PostDeatail";
import CreateJob from "./components/Home/Company/CreateJob/CreateJob";

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
        <Route element={<RequireAuth allowedRoles={["develop"]} />}>
          <Route path="home" element={<Home />} />
          <Route path="home/post/:id" element={<PostDetail />} />
          <Route path="home/createjob" element={<CreateJob />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={["company"]} />}>
          <Route path="company" element={<Company />} />
        </Route>
           
       
        <Route element={<RequireAuth allowedRoles={["admin"]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>

      {/* </Route> */}
    </Routes>
    </div>
}

export default App;
