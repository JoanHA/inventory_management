import { BrowserRouter,Routes,Route } from "react-router-dom";
import Header from "./assets/layouts/header";
import Create_equip from "./assets/pages/Create_equip"
import Welcome from "./assets/pages/welcome";
function App() {
  return (
  <>
      <BrowserRouter>
      <Header/>
          <Routes>
            <Route path="/" element={<Welcome/>}/>
          </Routes>
        </BrowserRouter>
  </>
  
  )
}

export default App