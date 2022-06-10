import {Routes,Route} from "react-router-dom"
import { useSelector } from "react-redux"
import { LandinPage } from "./components/landin_page/LandinPage";
import { RequireAuth } from "./components/require_auth/RequireAuth";
import { Admin } from "./components/admin/Admin";
import Home from "./components/Home/Home";
import PostDetail from "./components/Home/User/Post/PostDetail/PostDeatail";
import CreateJob from "./components/Home/Company/CreateJob/CreateJob";
import { Navbar } from "./components/navbar/Navbar";
import { NotFound } from "./components/not_found/NotFound";
import CompanyHome from "./components/Home/Company/CompanyHome";
import ComProfile from "./components/Profiles/ComProfile";
import DevProfile from "./components/Profiles/DevProfile";
import EditDevProfileForm from "./components/Profiles/EditDevProfileForm";
import EditComProfileForm from "./components/Profiles/EditComProfile";
import Favorites from "./components/Home/User/Favorites/Favorites";
import PostJobOfferDetail from "./components/Home/Company/PostJobOfferDetail/PostJobOfferDetail";


import { Notifications } from "./components/notifications/Notifications";
import './App.css'
import Meeting from "./components/Meeting/Meeting";
import DevProfileDetail from "./components/Home/Company/PostJobOfferDetail/DevProfileDetail";
import Applications from "./components/Home/User/UserApplications/Applications";
import { Footer } from "./components/footer/Footer";


function App() {

  const { isLogged } = useSelector(state => state.auth)

  return <div className="app">
    <Navbar/>
    <div className="app__container">
        <Routes>
        

            {/* Public Routes*/}
            <Route path="/" element={ <LandinPage /> } />
            <Route path="/meet" element={ <Meeting /> } />
            {/* Private Routes */}
            
            <Route element={<RequireAuth allowedRoles={["develop"]} />}>
              <Route path="home" element={<Home />} />
              <Route path="home/post/:id" element={<PostDetail />} />
              <Route path="home/favorites" element={<Favorites/>}/>
              <Route path="home/profile/:id" element={<DevProfile />} />
              <Route path="editdevprofile/:id" element={<EditDevProfileForm />} />
              <Route path="home/myapplications/:id" element={<Applications />} />
              <Route path="home/notifications" element={<Notifications />} />
              <Route path="home/company/:id" element={<ComProfile />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={["company"]} />}>
              <Route path="company" element={<CompanyHome />} />
              <Route path="company/createjob" element={<CreateJob />} />
              <Route path="company/profile/:id" element={<ComProfile />} />
              <Route path="company/offers/:id" element={<PostJobOfferDetail />} />
              <Route path="editcomprofile/:id" element={<EditComProfileForm />} />
              <Route path="company/companyjob/:id" element={<PostDetail />} />
              <Route path="company/user/:id" element={<DevProfile/>}/>
              <Route path="company/offers/:id_job/dev/:id_dev" element={<DevProfileDetail/>}/>
              <Route path="company/notifications" element={<Notifications />} />
            </Route>
              
          
            <Route element={<RequireAuth allowedRoles={["admin"]} />}>
              <Route path="admin" element={<Admin />} />
            </Route>

            <Route path="*" element={<NotFound/>}/>
        </Routes>
    </div>
    <Footer />
    </div>
}

export default App;
