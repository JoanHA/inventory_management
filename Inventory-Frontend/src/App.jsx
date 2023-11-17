import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./authViews/ProtectedRoute";
import { IsAdmin } from "./components/IsAdmin";
import Spinner from "./components/Spinner";
//Lazy imports

const Header = lazy(() => import("./layouts/Header"));
// const Spinner = lazy(() => import("./components/Spinner"));
const Create_equip = lazy(() => import("./pages/Create_equip"));
const Welcome = lazy(() => import("./pages/Welcome"));
const View_equip = lazy(() => import("./pages/View_equip"));
const ViewAllEquip = lazy(() => import("./pages/ViewAllEquip"));
const Create_event = lazy(() => import("./pages/events/Create_event"));
const Register = lazy(() => import("./authViews/Register"));
const Login = lazy(() => import("./authViews/Login"));
const View_events = lazy(() => import("./pages/events/View_events"));
const View_one_event = lazy(() =>
  import("./pages/events/View_one_event")
);
const UserManagement = lazy(() => import("./UsersPages/UserManagement"));
const EditUser = lazy(() => import("./UsersPages/EditUser"));
const NewUser = lazy(() => import("./UsersPages/NewUser"));
const Table = lazy(() => import("./components/Table"));

const AllEventsOneEquip = lazy(() =>
  import("./pages/events/AllEventsOneEquip")
);

function App() {
  return (
    <>
      <Suspense fallback={<Spinner/>}>
        <AuthProvider>
          <BrowserRouter>
            <Header>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/table" element={<Table editType="editUser" />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/" element={<Welcome />} />
                  <Route path="/create" element={<Create_equip />} />
                  <Route path="/equipments" element={<ViewAllEquip />} />
                  <Route path="/edit/:id" element={<View_equip />} />
                  <Route path="/events" element={<View_events />} />
                  <Route path="/create_event/:id" element={<Create_event />} />
                  <Route path="/view_event/:id" element={<View_one_event />} />
                  <Route
                    path="/AllEvents/:id"
                    element={<AllEventsOneEquip />}
                  />
                  <Route path="/editUser/:id" element={<EditUser />} />
                  <Route element={<IsAdmin />}>
                    <Route
                      path="/userManagement"
                      element={<UserManagement />}
                    />
                    <Route path="/createUser" element={<NewUser />} />
                  </Route>
                </Route>
              </Routes>
            </Header>
          </BrowserRouter>
        </AuthProvider>
      </Suspense>
    </>
  );
}

export default App;
