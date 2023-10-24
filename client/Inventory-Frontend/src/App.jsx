import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./assets/layouts/header";
import Create_equip from "./assets/pages/Create_equip";
import Welcome from "./assets/pages/welcome";
import View_equip from "./assets/pages/View_equip";
import ViewAllEquip from "./assets/pages/ViewAllEquip";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<h1>Welcome</h1>} />
          <Route path="/login" element={<h1>login</h1>} />
          <Route path="/register" element={<h1>register</h1>} />
          <Route path="/create" element={<Create_equip />} />
          <Route path="/equipments" element={<ViewAllEquip/>} />
          <Route path="/edit/:id" element={<View_equip/>} />
          <Route path="/events" element={<h1>eventos</h1>} />
          <Route path="/create_event" element={<h1>crear evento</h1>} />
          <Route path="/edit_event/:id" element={<h1>editar evento</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
