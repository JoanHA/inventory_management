import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./assets/layouts/Header";
import Create_equip from "./assets/pages/Create_equip";
import Welcome from "./assets/pages/Welcome";
import View_equip from "./assets/pages/View_equip";
import ViewAllEquip from "./assets/pages/ViewAllEquip";
import Create_event from "./assets/pages/events/Create_event";
import Register from "./authViews/register";
import Login from "./authViews/login";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./authViews/ProtectedRoute";
import View_events from "./assets/pages/events/View_events";
import View_one_event from "./assets/pages/events/view_one_event";
import UserManagement from "./UsersPages/UserManagement";
import EditUser from "./UsersPages/EditUser";
import NewUser from "./UsersPages/NewUser";
import Table from "./components/Table";
import { IsAdmin } from "./components/IsAdmin";
import  AllEventsOneEquip from "./assets/pages/events/AllEventsOneEquip"
function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Header>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/table" element={<Table editType="editUser"/>} />

              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Welcome />} />
                <Route path="/create" element={<Create_equip />} />
                <Route path="/equipments" element={<ViewAllEquip />} />
                <Route path="/edit/:id" element={<View_equip />} />
                <Route path="/events" element={<View_events />} />
                <Route path="/create_event/:id" element={<Create_event />} />
                <Route path="/view_event/:id" element={<View_one_event />} />
                <Route path="/AllEvents/:id" element={<AllEventsOneEquip/>}/>
                <Route path="/editUser/:id" element={<EditUser />} />
                <Route element={<IsAdmin/>}>
                  <Route path="/userManagement" element={<UserManagement />} />
                  <Route path="/createUser" element={<NewUser />} />
                </Route>
              </Route>
            </Routes>
          </Header>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
