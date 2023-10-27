import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./assets/layouts/Header";
import Create_equip from "./assets/pages/Create_equip";
import Welcome from "./assets/pages/welcome";
import View_equip from "./assets/pages/View_equip";
import ViewAllEquip from "./assets/pages/ViewAllEquip";
import Add from "./assets/components/add";
import Create_event from "./assets/pages/events/Create_event";
import Register from "./authViews/register";
import Login from "./authViews/login";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./authViews/ProtectedRoute";
function App() {
  return (
    <>
      <AuthProvider>
        <div className="d-flex flex-row">
          {/* <div className="sideBar">
              <div style={{height:"100%", background:"black", width:"150px"}} ></div>
          </div> */}
          {/* This will go on a component to make the sidebar */}
          <BrowserRouter>
            <div className="w-100">
              <Header />
              <Routes>
                <Route path="/" element={<h1>Bienvenido</h1>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/create" element={<Create_equip />} />
                  <Route path="/equipments" element={<ViewAllEquip />} />
                  <Route path="/edit/:id" element={<View_equip />} />
                  <Route path="/events" element={<h1>eventos</h1>} />
                  <Route path="/create_event/:id" element={<Create_event />} />
                  <Route path="/edit_event/:id" element={<h1>Editar </h1>} />
                </Route>
              </Routes>
            </div>
          </BrowserRouter>
        </div>
      </AuthProvider>
    </>
  );
}

export default App;
