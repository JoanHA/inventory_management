import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./assets/layouts/header";
import Create_equip from "./assets/pages/Create_equip";
import Welcome from "./assets/pages/welcome";
import View_equip from "./assets/pages/View_equip";
import ViewAllEquip from "./assets/pages/ViewAllEquip";
import Add from "./assets/components/add";
import Create_event from "./assets/pages/events/Create_event";
import Register from "./authViews/register";
import Login from "./authViews/login";
function App() {
  return (
    <>
      <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={"/"} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/create" element={<Create_equip />} />
          <Route path="/equipments" element={<ViewAllEquip/>} />
          <Route path="/edit/:id" element={<View_equip/>} />
          <Route path="/events" element={<h1>eventos</h1>} />
          <Route path="/create_event/:id" element={<Create_event/>} />
          <Route path="/edit_event/:id" element={<h1>Editar </h1>} />
        </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
